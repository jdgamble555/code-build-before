import type { Post } from "$lib/post.model";
import { encode } from "j-supabase";
import { supabase } from "./supabase";

export const supabase_post_read_adapter = {

    async searchPost(phrase: string): Promise<Post[] | null> {

        //const { data, error } = await this.sb.supabase.rpc('search_posts', { phrase });
        const { data, error } = await supabase.from('search_posts').select('*')//.textSearch('content', phrase, { type: 'phrase', config: 'english' });
            .or(`title.phfts.${phrase},content.phfts.${phrase},tags.phfts.${phrase}`);
        if (error) {
            console.error(error);
        }
        return data ? data.map((p) => ({ ...p, id: encode(p.id) })) as Post[] : null;
    }
};