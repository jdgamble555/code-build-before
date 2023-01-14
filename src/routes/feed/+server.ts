import type { RequestHandler } from './$types';
import { encode } from 'j-supabase';
import { settings } from '$lib/settings';
import { supabase } from '$lib/supabase/supabase';
import { generateAtomFeed } from '$lib/seo/generate-feed';
import { encodeXML } from '$lib/seo/xml-utils';
import { marked } from 'marked';

export const GET: RequestHandler = async ({ url }) => {

    const feed = new generateAtomFeed({
        hostname: url.origin,
        title: settings.meta_title,
        description: settings.meta_description,
        link: settings.domain,
        atomLink: settings.domain + '/feed',
        language: 'en'
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
            link: `p/${encode(post.id)}/${post.slug}`,
            description: encodeXML(marked.parse(post.content)),
            published: new Date(post['published_at']).toISOString(),
            category: tags,
            creator: post.author.display_name
        });
    });

    return new Response(feed.generate(), {
        headers: { "content-type": "application/xml" }
    });
};
