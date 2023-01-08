import { read_post } from '$lib/database';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const { getPostById } = read_post;

export const GET: RequestHandler = async ({ params }) => {

    const id = params.id;

    // check for valid id, and redirect
    const { data: post } = await getPostById(id);
    if (!post) {
        throw error(404, 'Not found');
    }
    throw redirect(301, `/p/${id}/${post.slug}`);
};
