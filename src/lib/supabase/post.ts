import type { Optional, Post, PostInput, PostListRequest, PostRequest, UsernameRequest } from "$lib/post.model";
import { decode, range } from "j-supabase";
import { supabase_to_post, type supabase_post } from "./auth.types";
import { supabase } from "./supabase";

export const supabase_post_read_adapter = {

    async getRelated(id: string): Promise<PostListRequest> {
        const pid = decode(id);
        const { data, error } = await supabase.rpc('get_related_posts', { post_id: pid }).limit(3)
        if (error) {
            console.error(error);
        }
        return { data: data ? data?.map((_p: supabase_post) => supabase_to_post(_p)) : null, error: error?.message };
    },

    async getRedirect(id: string): Promise<PostRequest> {
        const pid = decode(id);
        const { data, error } = await supabase.from('posts_redirect').select('*, new_id!inner(*, author!inner(*))').eq('id', pid).single();
        if (error) {
            console.error(error);
        }
        const new_data = data ? data.new_id : undefined;
        return { data: new_data ? supabase_to_post(new_data as supabase_post) : undefined, error: error?.message };
    },

    async getPostById(id: string, published = true): Promise<PostRequest> {
        const pid = decode(id);
        let error;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let data: any;

        const x = (pub: boolean) => {
            if (!pub) {
                return supabase.from('drafts')
                    .select('*, author!inner(*)').eq('id', pid).single();
            }
            return supabase.rpc('get_posts_hearts_tags').eq('id', pid).single();
        }

        // draft
        if (!published) {
            ({ data, error } = await x(false));
            if (error) {
                console.error(error);
            }
        }

        // published
        if (!data) {
            ({ data, error } = await x(true));
            if (error) {
                console.error(error);
            }
        }

        return { data: data ? supabase_to_post(data as supabase_post) : undefined, error: error?.message };
    },

    async getUsernameFromId(uid: string): Promise<UsernameRequest> {
        const id = decode(uid);
        const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
        return { data: data?.username, error: error?.message };
    },

    async searchPost(phrase: string): Promise<PostListRequest> {

        //const { data, error } = await this.sb.supabase.rpc('search_posts', { phrase });
        const { data, error } = await supabase.from('posts_hearts_tags').select('*, author!inner(*)')//.textSearch('content', phrase, { type: 'phrase', config: 'english' });
            .or(`title.phfts.${phrase},content.phfts.${phrase}`);
        if (error) {
            console.error(error);
        }
        const p = data ? data?.map((_p) => supabase_to_post(_p as supabase_post)) : null;
        return { data: p, error: error?.message };
    },

    async getTotal(col: string): Promise<PostRequest> {
        let q = supabase.from(col)
            .select('*', { count: 'estimated' });
        if (col === 'posts') {
            q = q.lte('published_at', new Date().toISOString())
        }
        const { error, count } = await q;
        return { error: error?.message, count: count };
    },

    async getPosts({
        type = 'latest',
        filter,
        page = 1,
        size = 5,
    }: PostInput = {
            type: 'latest',
            page: 1,
            size: 5
        }): Promise<PostListRequest> {

        // get sort field
        const _sorts: { [key: string]: string } = {
            'updated': 'updated_at',
            'latest': 'created_at',
            'likes': 'hearts_count'
        };

        const sortField = type && Object.keys(_sorts).includes(type)
            ? _sorts[type as string]
            : 'created_at';

        const error = null;
        let count = null;
        let data: unknown = null;

        let q;

        if (type === 'bookmarks') {
            q = supabase.rpc('post_bookmarks', undefined, { count: 'exact' });
        } else {
            if (type === 'drafts') {
                q = supabase.from('drafts')
                .select('*, author!inner(*)', { count: 'exact' });
            } else {
                q = supabase.rpc('get_posts_hearts_tags', undefined, { count: 'exact' });
            }


            if (type === 'unpublished') {
                q = q.gt('published_at', new Date().toISOString());
            }

            if (type !== 'drafts' && type !== 'unpublished') {
                q = q.lt('published_at', new Date().toISOString());
            }
            if (filter) {
                if (type === 'tag') {

                    // tag query
                    q = q.contains('tags', [filter]);

                } else if (type === 'author') {

                    // author query
                    //q = q.eq('author.id', decode(filter));
                }
            }
        }

        const { to, from } = range({ page, size });

        // get results
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ data, count } = await q.order(sortField, { ascending: false } as any).range(from, to));


        if (count && count > 0) {

            // translate results
            data = (data as supabase_post[])?.map((_p) => supabase_to_post(_p as supabase_post));
        }
        return { error, data: (data as Optional<Post[]>), count };
    }
};