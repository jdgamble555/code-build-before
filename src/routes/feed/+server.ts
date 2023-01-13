/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from './$types';
import { encode } from 'j-supabase';
import { settings } from '$lib/settings';
import { supabase } from '$lib/supabase/supabase';
import { error as sk_error } from '@sveltejs/kit';
//import { Feed } from "feed";

export const GET: RequestHandler = async () => {

    return new Response("testing 1,2.3...");

    /*const feed = new Feed({
        title: settings.meta_title,
        description: settings.meta_description,
        id: "https://code.build",
        link: "https://code.build",
        language: "en",
        favicon: "https://code.build/favicon.ico",
        copyright: "©2022 Code.Build",
        feedLinks: {
            atom: "https://code.build/feed"
        },
        author: {
            name: "Jonathan Gamble",
            link: "https://code.build/u/86qJ3nXSvhBPUbmdaMwUeb/jdgamble555"
        }
    });

    // post pages
    const { data: posts, error } = await supabase.from('posts_hearts_tags').select('*, author(*)').lte('published_at', new Date().toISOString());;
    if (error) {
        console.error(error);
    }

    posts?.forEach(post => {
        const tags: string[] = JSON.parse(JSON.stringify(post.tags));
        feed.addItem({
            title: post.title,
            id: encode(post.id),
            link: `https://code.build/p/${encode(post.id)}/${post.slug}`,
            // description: post.description,
            content: post.content,
            date: new Date(post['published_at']),
            image: post.image,
            category: tags.map((t) => ({ name: t })) as any,
            author: [{
                name: post.author.display_name,
                link: "https://code.build/u/" + encode(post.author.id) + '/' + post.author.username
            }]
        });
    });

    try {

        return new Response(feed.atom1(), {
            headers: {
                "Content-Type": "application/xml"
            }
        });

    } catch (e: any) {
        console.error(e);
        throw sk_error(500, e);
    }*/

    return new Response();
};
