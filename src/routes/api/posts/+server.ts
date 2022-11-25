import { read_post } from '$lib/database';
import type { RequestHandler } from './$types';

const { getPosts } = read_post;

export const GET: RequestHandler = async ({ request, params, route }) => {
    const { data, count, error } = await getPosts();
    if (error) {
        console.error(error);
    }
    return new Response(JSON.stringify({ data, count }), {
        headers: {
            'content-type': 'application/json'
        }
    });
};
