import { read_post } from '$lib/database';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const { getUsernameFromId } = read_post;

export const GET: RequestHandler = async ({ params }) => {

    const uid = params.uid;

    // get username from uid
    const { data: _username, error: _e } = await getUsernameFromId(uid);
    if (_e) {
        throw error(404, { message: _e });
    }

    // no username
    if (!_username) {
        throw redirect(301, '/');
    }

    // redirect to correct location
    throw redirect(301, `/u/${uid}/${_username}`);
};