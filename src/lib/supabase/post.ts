import type { Post, PostRequest } from "$lib/post.model";
import { encode } from "j-supabase";
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
    }
};