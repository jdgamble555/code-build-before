import { error, redirect } from '@sveltejs/kit';
import { read_post } from '$lib/database';
import type { LayoutLoad } from './$types';
import type { Optional, Post } from '$lib/post.model';

const { getPostById, getRelated, getRedirect } = read_post;

export const load = (async ({ params, setHeaders }) => {

    // check for pre-loaded post
    // todo - move preloaded post and postdetail out of load function

    // cache for 3 days
    setHeaders({
        'cache-control': 'public, max-age=259200, stale-while-revalidate=86400'
    });

    const slug = params.slug;
    const id = params.id;
    let post: Optional<Post>;
    if (slug && id) {
        if (!post) {
            // otherwise grab post info
            const { data, error: e } = await getPostById(id);
            if (e || !data) {
                const { data: r_data } = await getRedirect(id);
                if (r_data) {
                    throw redirect(301, `/p/${r_data.id}/${r_data.slug}`);
                }
                throw error(404, 'Not found');
            }
            post = data;
        }
        // redirect if slug is changed
        if (post.slug !== slug) {
            throw redirect(301, `/p/${id}/${post.slug}`);
        }

        // get related posts
        const { data, error: r_error } = await getRelated(id);
        if (r_error) {
            console.error(r_error);
        }
        return {
            post,
            related: data
        };
    }
}) satisfies LayoutLoad;