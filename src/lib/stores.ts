import { writable } from "svelte/store";
import type Snackbar from '@smui/snackbar';
import type { Optional } from "./post.model";

export const darkMode = writable<boolean>(false);
export const loading = writable<boolean>(false);

// nav
export const showLeft = writable<boolean>(true);
export const showRight = writable<boolean>(true);
export const showSearch = writable<boolean>(false);

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
};

// posts
export const imageUploads = writable<string[]>([]);

export type dialogType = {
    show: boolean,
    confirmed: boolean,
    id: Optional<string>,
    imageURL: Optional<string>,
    imageUploads: Optional<string[]>
};

// dialog
export const dialogStore = (() => {
    const { set, update, subscribe } = writable<dialogType>({
        show: false,
        confirmed: false,
        id: null,
        imageURL: null,
        imageUploads: null
    });
    return {
        set,
        update,
        subscribe,
        show: (id: string, imageURL?: Optional<string>, imageUploads?: Optional<string[]>) => update(v => ({ ...v, show: true, id, imageURL, imageUploads })),
        confirm: () => update(v => ({ ...v, confirmed: true })),
        reject: () => update(v => ({ ...v, confirmed: false })),
        toggle: () => update(v => ({ ...v, show: !v.show }))
    }
})();
