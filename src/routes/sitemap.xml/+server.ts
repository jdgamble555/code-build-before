/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from './$types';
import { encode } from 'j-supabase';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import { settings } from '$lib/settings';
import { supabase } from '$lib/supabase/supabase';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {

  try {
    const sitemapStream = new SitemapStream({
      hostname: settings.domain,
      xmlns: {
        news: false,
        xhtml: true,
        image: true,
        video: false
      },
      xslUrl: 'sitemap.xsl'
    });
    //const pipeline = sitemapStream.pipe(createGzip());

    let lastmod = new Date(1 - 1 - 2000);

    // todo - separate into different files
    // todo - put supabase code into separate file

    // post pages
    const { data, error } = await supabase.from('posts').select('*').lte('published_at', new Date().toISOString());
    if (error) {
      console.error(error);
    }
    data?.forEach((doc) => {
      
      const date = new Date(doc['updated_at'] ?? doc['published_at']);
      const pid = encode(doc.id);

      // set date for site last updated
      if (lastmod < date) {
        lastmod = date;
      }

      sitemapStream.write({
        lastmod: date.toISOString(),
        url: `p/${pid}/${doc.slug}`,
        img: doc.image
      });

    });

    // user pages
    const { data: d3, error: e3 } = await supabase.from('profiles').select('*');
    if (e3) {
      console.error(e3);
    }
    if (d3) {
      for (const doc of d3) {
        const uid = encode(doc.id);
        const { data: d4, error: e4 } = await supabase.from('posts').select('updated_at').eq('author', doc.id).order('updated_at', { ascending: false }).limit(1);
        if (e4) {
          console.error(d4);
        }
        const date = d4 && d4.length ? new Date(d4[0]['updated_at']) : new Date(doc['updated_at']);
        sitemapStream.write({
          lastmod: date.toISOString(),
          url: `u/${uid}/${doc.username}`,
          img: doc['photo_url']
        });
      }
    }

    // tag pages
    const { data: d2, error: e2 } = await supabase.from('tags_latest').select('*');
    if (e2) {
      console.error(e2);
    }
    if (d2) {
      for (const doc of d2) {

        const date = new Date(doc['updated_at']);

        sitemapStream.write({
          lastmod: date.toISOString(),
          url: `t/${doc.name}`
        });
      }
    }

    // homepage
    sitemapStream.write({
      lastmod,
      url: settings.domain
    });

    sitemapStream.end();

    const _stream = await streamToPromise(sitemapStream)
      .catch((e) => {
        throw e;
      });

      console.log(_stream);

    return new Response(_stream, {
      headers: {
        "Content-Type": "application/xml",
        //"Content-Encoding": "gzip"
      }
    });

  } catch (e: any) {
    console.error(e);
    throw error(500, e);
  }
};
