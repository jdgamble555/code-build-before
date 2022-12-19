import { postDetail } from '$lib/post-store';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { read_post } from '$lib/database';

export const load: LayoutLoad = async ({ params }) => {

    const pid = params.pid;
    const { getPostById } = read_post;

    // grab post or get passed post
    let post = get(postDetail);
    if (!post) {
        const { data, error } = await getPostById(pid);
        if (error) {
            console.error(error);
        }
        if (data) {
            post = data;
        }
    }
    return {
        post
    };
};