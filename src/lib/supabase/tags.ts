/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Tag } from "$lib/post.model";
import { supabase } from "./supabase";

export const getTags = async (): Promise<{ data: Tag[] | null, error: any }> => {
    const { error, data } = await supabase.from('tag_cloud')
        .select('*');
    return { data: data as any, error };
}