import { error } from '@sveltejs/kit';
import { read_post } from '$lib/database';
import type { LayoutLoad } from './$types';

const { getPosts } = read_post;

export const load: LayoutLoad = async ({ params }) => {

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