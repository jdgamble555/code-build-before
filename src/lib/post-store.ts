import { writable } from "svelte/store";
import type { Post, sortFields } from "./post.model";
import { loading } from "./stores";
import { api } from "./utils";

export const posts = writable<Post[]>([]);

export const getPosts = async ({ sortField, page, tag }: { sortField: sortFields; page?: number, tag?: string }) => {
    loading.set(true);
    const r = await api('/api/posts', {
        sortField,
        tag: tag ?? '',
        page: page ? page.toString() : ''
    });
    loading.set(false);
    posts.set(r.data);
};