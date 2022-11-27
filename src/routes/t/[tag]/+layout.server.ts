import { error } from '@sveltejs/kit';
import { read_post } from '$lib/database';
import type { LayoutServerLoad } from './$types';

const { getPosts } = read_post;

export const load: LayoutServerLoad = async ({ params }) => {

    // cache for 3 days
    /*setHeaders({
        'cache-control': 'public, max-age=259200, stale-while-revalidate=86400'
    });*/

    console.log("tag ran...");

    const tag = params.tag;
    if (tag) {
        const { data: posts, count: total } = await getPosts({ tag });
        if (total === 0) {
            throw error(404, 'Not found');
        }
        return {
            total,
            posts,
            tag
        };
    }
};