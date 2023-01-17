import type { Optional, PostInput, PostListRequest, PostRequest, UsernameRequest } from "$lib/post.model";
import { decode, range } from "j-supabase";
import { supabase_to_post, type supabase_post } from "./auth.types";
import { supabase } from "./supabase";

export const supabase_post_read_adapter = {

    async getPostById(id: string, published = true): Promise<PostRequest> {
        const pid = decode(id);
        let error;
        let data: Optional<supabase_post>;

        const x = (pub: boolean) => supabase.from(pub ? 'posts_hearts_tags' : 'drafts')
            .select('*, author!inner(*)').eq('id', pid).single();

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
        return { data: data ? supabase_to_post(data) : undefined, error: error?.message };
    },

    async getUsernameFromId(uid: string): Promise<UsernameRequest> {
        const id = decode(uid);
        const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
        return { data: data?.username, error: error?.message };
    },

    async searchPost(phrase: string): Promise<PostListRequest> {

        //const { data, error } = await this.sb.supabase.rpc('search_posts', { phrase });
        const { data, error } = await supabase.from('posts_hearts_tags').select('*')//.textSearch('content', phrase, { type: 'phrase', config: 'english' });
            .or(`title.phfts.${phrase},content.phfts.${phrase}`);
        if (error) {
            console.error(error);
        }
        const p = data ? data?.map((_p: supabase_post) => supabase_to_post(_p)) : null;
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
        let data = null;

        let q;

        if (type === 'bookmarks') {
            q = supabase.rpc('post_bookmarks', undefined, { count: 'exact' })
                .select('*, author!inner(*)')
        } else {
            q = supabase.from(type === 'drafts' ? 'drafts' : 'posts_hearts_tags')
                .select('*, author!inner(*)', { count: 'exact' });

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
                    q = q.eq('author.id', decode(filter));
                }
            }
        }

        const { to, from } = range({ page, size });

        // get results
        ({ data, count } = await q.order(sortField, { ascending: false }).range(from, to));


        if (count && count > 0) {

            // translate results
            data = data?.map((_p: supabase_post) => supabase_to_post(_p));
        }
        return { error, data, count };
    }
};