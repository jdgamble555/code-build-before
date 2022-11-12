import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ params }) => {
    if (params.tag) {
        // get captial version
        return {
            tag: params.tag
        };
    }

    throw error(404, 'Not found');
}