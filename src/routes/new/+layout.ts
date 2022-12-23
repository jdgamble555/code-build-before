import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { auth } from '$lib/database';
import { redirect } from '@sveltejs/kit';
import type { UserRec } from '$lib/user.model';
import type { Post } from '$lib/post.model';

const { user } = auth;

export const load: LayoutLoad = async () => {

    // make sure user logged in
    const _user = get(user) as UserRec;
    const loggedIn = !!_user;
    if (!loggedIn) {
        throw redirect(301, '/login');
    }

    return {
        post: {
            id: '0x0',
            title: '',
            content: '',
            slug: '',
            minutes: '',
            author: {
                id: _user.id,
                email: _user.email,
                role: _user.role,
                createdAt: _user.createdAt,
                providers: _user.providers
            },
            createdAt: new Date(),
            publishedAt: new Date(),
            heartsCount: 0,
            tags: []
        } as Post
    };
};