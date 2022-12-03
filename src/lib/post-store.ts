import { writable } from "svelte/store";
import type { Post } from "./post.model";

export const posts = writable<Post[]>([]);
