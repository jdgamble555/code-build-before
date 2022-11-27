import { error, redirect } from '@sveltejs/kit';
import { read_post } from '$lib/database';
import type { PageServerLoad } from './$types';

const { getPostById } = read_post;

export const load: PageServerLoad = async ({ params }) => {

    // cache for 3 days
    /*setHeaders({
        'cache-control': 'public, max-age=259200, stale-while-revalidate=86400'
    });*/

    console.log("server load slug...");

    const slug = params.slug;
    const id = params.id;
    if (slug && id) {
        const { data: post } = await getPostById(id);
        if (!post) {
            throw error(404, 'Not found');
        } else {
            if (post.slug !== slug) {
                redirect(301, `/p/${id}/${slug}`);
            } else {
                return {
                    post
                };
            }
        }
    }
};