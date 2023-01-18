import { error, redirect } from '@sveltejs/kit';
import { read_post } from '$lib/database';
import type { LayoutLoad } from './$types';
import { get } from 'svelte/store';
import { postDetail } from '$lib/post-store';
import { browser } from '$app/environment';
import type { Optional, Post } from '$lib/post.model';

const { getPostById } = read_post;

export const load: LayoutLoad = async ({ params, setHeaders }) => {

    // cache for 3 days
    setHeaders({
        'cache-control': 'public, max-age=259200, stale-while-revalidate=86400'
    });

    const slug = params.slug;
    const id = params.id;
    let post: Optional<Post>;
    if (slug && id) {
        // check for pre-loaded post
        if (browser) {
            //post = get(postDetail);
        }
        if (!post) {
            // otherwise grab post info
            const { data, error: e } = await getPostById(id);
            if (e) {
                throw error(404, e);
            }
            post = data;
        }
        if (!post) {
            throw error(404, 'Not found');
        }
        // redirect if slug is changed
        if (post.slug !== slug) {
            redirect(301, `/p/${id}/${slug}`);
            return;
        }
        return {
            post
        };
    }
};