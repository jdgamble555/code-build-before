import { writable } from "svelte/store";
import type { Post } from "./post.model";

export const postList = writable<Post[]>([]);
export const postDetail = writable<Post>();

export const currentPage = writable(1);