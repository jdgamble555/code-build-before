import { error, redirect } from '@sveltejs/kit';
import { read_post } from '$lib/database';
import type { LayoutLoad } from './$types';

const { getPosts, getUsernameFromId } = read_post;

export const load: LayoutLoad = async ({ params }) => {

    const uid = params.uid;
    const username = params.username;
    if (uid && username) {

        // get username from uid
        const { data: _username, error: _e } = await getUsernameFromId(uid);
        if (_e) {
            throw error(404, _e);
        }

        // make sure uid matches username
        if (_username !== username) {
            throw redirect(301, `/u/${uid}/${_username}`);
        }

        // get posts list
        const { data: posts, count: total } = await getPosts({ type: 'author', filter: uid });
        if (total === 0) {
            throw error(404, 'Not found');
        }
        return {
            total,
            posts,
            uid,
            username
        };
    }
};