import { read_post } from '$lib/database';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const { getPostById } = read_post;

export const load: PageLoad = async ({ params }) => {

    // check for valid id, and redirect

    const id = params.id;
    if (id) {
        const { data: post } = await getPostById(id);
        if (!post) {
            throw error(404, 'Not found');
        } else {
            throw redirect(301, `/p/${id}/${post.slug}`);
        }
    }
};
