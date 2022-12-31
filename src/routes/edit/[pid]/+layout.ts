import { postDetail } from '$lib/post-store';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { auth, read_post } from '$lib/database';
import { redirect } from '@sveltejs/kit';
import type { Post } from '$lib/post.model';
import { browser } from '$app/environment';

const { user } = auth;

export const load: LayoutLoad = async ({ params }) => {

    let post: Post | undefined;

    if (browser) {
        // make sure user logged in
        const loggedIn = !!get(user);
        if (!loggedIn) {
            throw redirect(301, '/login');
        }

        const pid = params.pid;
        const { getPostById } = read_post;

        // grab post or get passed post
        post = get(postDetail) as Post;
        if (!post) {
            const { data, error } = await getPostById(pid);
            if (error) {
                console.error(error);
            }
            if (data) {
                post = data;
            }
        }
    }
    return {
        post
    };
};