import type { Post, PostInput, PostRequest } from "$lib/post.model";
import { decode, encode, range } from "j-supabase";
import { supabase_to_post, type supabase_post } from "./auth.types";
import { supabase } from "./supabase";

export const supabase_post_read_adapter = {

    async searchPost(phrase: string): Promise<PostRequest> {

        //const { data, error } = await this.sb.supabase.rpc('search_posts', { phrase });
        const { data, error } = await supabase.from('search_posts').select('*')//.textSearch('content', phrase, { type: 'phrase', config: 'english' });
            .or(`title.phfts.${phrase},content.phfts.${phrase},tags.phfts.${phrase}`);
        if (error) {
            console.error(error);
        }
        const p = data ? data.map((p) => ({ ...p, id: encode(p.id) })) as Post[] : null;
        return { data: p, error: error?.message };
    },

    async getTotal(col: string): Promise<PostRequest> {
        let q = supabase.from(col)
            .select(undefined, { count: 'exact' });
        if (col === 'posts') {
            q = q.lte('published_at', new Date().toISOString())
        }
        const { error, count } = await q;
        return { error: error?.message, count: count };
    },

    async getPosts({
        authorId,
        tag,
        sortField = 'created_at',
        sortDirection = 'desc',
        pageSize = 5,
        page = 1,
        drafts = false
    }: PostInput = {}): Promise<PostRequest> {

        const _sorts: { [key: string]: string } = {
            'updatedAt': 'updated_at',
            'createdAt': 'created_at',
            'heartsCount': 'hearts_count'
        };

        sortField = _sorts[sortField] ?? sortField;

        const error = null;
        let count = null;
        let data = null;

        let q = supabase.from(drafts ? 'drafts' : 'posts_hearts_tags')
            .select('*, author!inner(*)', { count: 'exact' });

        if (!drafts) {
            q = q.lt('published_at', new Date().toISOString());
        }

        if (tag) {

            // tag query
            q = q.contains('tags', [tag]);

        } else if (authorId) {

            // author query
            q = q.eq('author.id', decode(authorId));
        }

        const { to, from } = range({ page, size: pageSize });

        // get results
        ({ data, count } = await q.order(sortField, { ascending: sortDirection === 'asc' }).range(from, to));

        if (count && count > 0) {

            // translate results
            data = data?.map((_p: supabase_post) => supabase_to_post(_p));
        }
        return { error, data, count };
    }
};