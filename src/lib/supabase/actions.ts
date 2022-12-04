import type { ActionRequest } from "$lib/user.model";
import { decode } from "j-supabase";
import { supabase } from "./supabase";

export const supabase_actions_adapter = {

    async getActionExists(postId: string, userId: string, action: string): Promise<ActionRequest> {
        const { error, count } = await supabase.from(action)
            .select('*', { count: 'exact' })
            .eq('pid', decode(postId))
            .eq('uid', decode(userId));
        return { error: error?.message, data: !!(count && count > 0) }
    },

    async actionPost(postId: string, userId: string, action: string): Promise<ActionRequest> {
        const { error } = await supabase.from(action)
            .insert({ pid: decode(postId), uid: decode(userId) });
        return { error: error?.message };
    },

    async unActionPost(postId: string, userId: string, action: string): Promise<ActionRequest> {
        const { error } = await supabase.from(action)
            .delete()
            .eq('uid', decode(userId))
            .eq('pid', decode(postId));
        return { error: error?.message };
    }
};