import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const post = 'test';

    if (post) {
        return post;
    }

    throw error(404, 'Not found');
}