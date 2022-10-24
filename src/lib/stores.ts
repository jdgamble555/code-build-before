import { writable } from "svelte/store";

export const darkMode = writable<boolean>(false);
export const loading = writable<boolean>(false);