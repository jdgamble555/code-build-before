import type  Snackbar  from '@smui/snackbar';
import { writable } from "svelte/store";

export const darkMode = writable<boolean>(false);
export const loading = writable<boolean>(false);



// snackbar
const _snackStore = writable<{
    opened: Snackbar | null,
    msg: string | null
}>({
    opened: null,
    msg: null
});

export const snackStore = {
    subscribe: _snackStore.subscribe,
    set: _snackStore.set,
    update: _snackStore.update,
    showMsg: (msg: string) => {
        _snackStore.update(self => {
            self.msg = msg;
            //self.opened?.open();
            return self;
        });
    }
};