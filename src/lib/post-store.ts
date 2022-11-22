import { writable, type Writable } from "svelte/store";
import { read_post } from "./database";
import type { Optional, Post } from "./post.model";
import { loading } from "./stores";

const { getPosts } = read_post;

export type postsType = 'top' | 'updated' | 'tag' | 'new' | 'drafts' | 'author' | 'unpublished';

class _loadPosts {

    private _page: number;
    private _author: Optional<string>;
    private _tag: Optional<string>;
    private _type: postsType;
    private _cache: Map<string, Optional<Post[]>>;
    private _posts: Writable<Optional<Post[]>>;
    constructor() {
        this._page = 1;
        this._type = 'new';
        this._cache = new Map();
        this._posts = writable<Optional<Post[]>>();
    }

    set page(p: number) {
        this._page = p;
    }

    get page() {
        return this._page;
    }

    set type(t: postsType) {
        this._page = 1;
        this._type = t;
    }

    set current(posts: Optional<Post[]>) {
        this._posts.set(posts);
        this._saveCache(posts);
    }

    set tag(tag: Optional<string>) {
        this._tag = tag;
        this._type = 'tag';
    }

    get tag() {
        return this._tag;
    }

    get posts() {
        return this._posts;
    }

    refresh() {
        const _posts = this._cache.get(this._cacheName());
        if (_posts) {
            console.log('exists...');
            this._posts.set(_posts);
        } else {
            // get posts sort
            let sortF: Optional<string>;
            const type = this._type;

            if (type === 'top') {
                sortF = 'heartsCount';
            } else if (type === 'updated') {
                sortF = 'updatedAt';
            } else {
                sortF = undefined;
            }
            loading.set(true);
            console.log('fetching...');
            getPosts({ sortField: sortF, tag: this._tag, page: this._page }).then(({ error, data: newR }) => {
                if (error) {
                    console.error(error);
                } else {
                    // save cache
                    this._posts.set(newR);
                    this._saveCache(newR);
                }
                loading.set(false);
            });
        }
    }

    private _saveCache(posts: Optional<Post[]>) {
        this._cache.set(this._cacheName(), posts);
    }

    private _cacheName() {
        const t = this._type;
        const p = this._page.toString();
        const a = this._author;
        const tag = this._tag;

        let cacheName: string;
        if (a) {
            cacheName = t + '_' + a + '_' + p;
        } else if (tag) {
            cacheName = t + '_' + tag + '_' + p;
        } else {
            cacheName = t + '_' + p;
        }
        return cacheName;
    }
};

export const loadPosts = new _loadPosts();
