import { writable } from "svelte/store";
import type Snackbar from '@smui/snackbar';

export const darkMode = writable<boolean>(false);
export const loading = writable<boolean>(false);

// snackbar
export const snackbar = writable<Snackbar | null>(null);
export const snackmsg = writable<string>('');

export const showMsg = (text: string) => {
    snackbar.update(self => {
        if (self) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const k = self as any;
            k.open();
            snackmsg.set(text);
        }
        return self;
    });
}

