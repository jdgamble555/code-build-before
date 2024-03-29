import { writable } from "svelte/store";
import type { Optional, Post } from "./post.model";

export const postList = writable<Post[]>([]);
export const postDetail = writable<Optional<Post>>();

export const currentPage = writable(1);