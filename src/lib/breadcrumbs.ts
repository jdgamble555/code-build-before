import { writable } from "svelte/store";

interface Link {
    name: string;
    location: string;
};

const { set, update, subscribe } = writable<Link[]>([]);

export const breadcrumbs = () => {


    let directories: Link[] = [];

    // reset bread crumb
    const resetBC = () => {
        directories = [];
        set([]);
    };

    // set bread crumb
    const setBC = (name: string, location?: string) => {
        resetBC();
        addBC(name, location);
    };

    // add bread crumb
    const addBC = (name: string, location?: string) => {
        if (!location) {
            location = '';
        }
        const data: Link = {
            name,
            location
        };
        directories.push(data);
        set(directories);
    };

    return {
        crumbs: {
            set,
            update,
            subscribe,
        },
        setBC,
        addBC,
        resetBC
    };
};