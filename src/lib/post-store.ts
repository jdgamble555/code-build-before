import { get, writable } from "svelte/store";
import { read_post } from "./database";
import type { Optional, Post } from "./post.model";

const { getPosts } = read_post;

export const postsCache = writable<Map<string, Optional<Post[]>>>(new Map<string, Optional<Post[]>>());

export const loadPosts = async ({ page, type }: { page: number; type: string }) => {

    // save posts cache
    const cacheName = type + '_' + page.toString();
    const r = get(postsCache).get(cacheName);
    if (r) {
        return r;
    }

    // get posts sort
    let sortF: Optional<string>;
    if (type === 'Top') {
        sortF = 'heartsCount';
    } else if (type === 'Updated') {
        sortF = 'updatedAt';
    } else {
        sortF = undefined;
    }

    // get posts
    const { error, data: newR } = await getPosts({ sortField: sortF, page });
    if (error) {
        console.error(error);
        return [];
    } else {
        // save cache
        postsCache.update(updater => updater.set(cacheName, newR));
        return newR;
    }
};