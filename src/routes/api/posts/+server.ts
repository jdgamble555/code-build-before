import { read_post } from '$lib/database';
import type { sortFields } from '$lib/post.model';
import type { RequestHandler } from './$types';

const { getPosts, searchPost } = read_post;

export const GET: RequestHandler = async ({ url }) => {

    const params = Object.fromEntries(url.searchParams);
    const { page, sortField, tag, search } = params;

    const { data, count, error } = search
        ? await searchPost(search)
        : await getPosts({
            sortField: sortField as sortFields,
            page: page ? Number(page) : undefined,
            tag
        });
    if (error) {
        console.error(error);
    }
    return new Response(JSON.stringify({ data, count }), {
        headers: {
            'content-type': 'application/json'
        }
    });
};
