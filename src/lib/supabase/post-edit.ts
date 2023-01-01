/* eslint-disable @typescript-eslint/no-explicit-any */
import { dev } from "$app/environment";
import type { Post, PostRequest } from "$lib/post.model";
import { minutesToRead, slugify } from "$lib/utils";
import { decode } from "j-supabase";
import { supabase } from "./supabase";

export const supabase_post_edit_adapter = {
    /**
 * Edit an existing post / create new post
 * @param id doc id
 * @param data doc data
 * @returns void
 */
    async setPost(data: Post, id: string | undefined = undefined, published = false): Promise<PostRequest> {

        id = id ? decode(id) : undefined;

        // todo - save to drafts first

        // update post
        let new_data: any = {
            title: data.title,
            content: data.content,
            image: data.image,
            slug: slugify(data.title),
            minutes: minutesToRead(data.content),
            author: decode(data.author.id),
            image_uploads: data.imageUploads,
            published_at: data.publishedAt
        };

        if (dev) {
            console.log(new_data);
        }

        if (!published) {
            new_data = { ...new_data, tags: data.tags };
        }

        // add post
        const { error, data: _d } = await supabase
            .from(published ? 'posts' : 'drafts')
            .upsert(id ? { ...new_data, id } : new_data)
            .select()
            .single();

        if (published && id && !error) {

            // remove all tags
            const { error: _e2 } = await supabase.from('tags').delete().eq('pid', id);
            if (_e2) {
                console.error(_e2);
            }

            // add tags
            const { error: _e1 } = await supabase
                .from('tags').upsert(data.tags.map((_t: string) => ({ pid: id, name: _t })));
            if (_e1) {
                console.error(_e1);
            }

            // remove draft
            const { error: _e } = await supabase_post_edit_adapter.deletePost(id, false);
            if (_e) {
                console.error(_e);
            }
        }
        return { error: error?.message, data: _d };
    },

    /**
   * Delete Post by ID
   * @param id
   */
    async deletePost(id: string, published = true): Promise<PostRequest> {
        const pid = decode(id);
        if (published) {
            // delete all fks...
            // todo - clean up with cascade deletes
            const { error: e1 } = await supabase.from('hearts').delete().eq('pid', pid);
            if (e1) {
                console.error(e1);
            }
            const { error: e2 } = await supabase.from('bookmarks').delete().eq('pid', pid);
            if (e1) {
                console.error(e2);
            }
            const { error: e3 } = await supabase.from('tags').delete().eq('pid', pid);
            if (e1) {
                console.error(e3);
            }
        }
        const { error } = await supabase.from(published ? 'posts' : 'drafts').delete().eq('id', pid);
        return { error: error?.message };
    }
};