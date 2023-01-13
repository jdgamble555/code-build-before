import type { RequestHandler } from './$types';
import { encode } from 'j-supabase';
import { settings } from '$lib/settings';
import { supabase } from '$lib/supabase/supabase';
import { generateSitemap } from '$lib/seo/generate-sitemap';


export const GET: RequestHandler = async ({ url }) => {

  const sitemap = new generateSitemap({
    xsl: 'sitemap.xsl',
    hostname: url.origin
  });

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

    sitemap.addLink({
      lastmod: date.toISOString(),
      loc: `p/${pid}/${doc.slug}`,
      image: doc.image
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
      sitemap.addLink({
        lastmod: date.toISOString(),
        loc: `u/${uid}/${doc.username}`,
        image: doc['photo_url']
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

      sitemap.addLink({
        lastmod: date.toISOString(),
        loc: `t/${doc.name}`
      });
    }
  }

  // homepage
  sitemap.addLink({
    lastmod: lastmod.toISOString(),
    loc: settings.domain
  });


  return new Response(sitemap.generate(), {
    headers: { "content-type": "application/xml" }
  });

};
