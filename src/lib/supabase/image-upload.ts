import { randomID } from "$lib/image-tools";
import { supabase } from "./supabase";

export const supabase_image_upload = {

    async getURL(gs: string): Promise<{ data: string | null }> {
        const { data } = supabase.storage.from('photos').getPublicUrl(gs);
        return { data: data.publicUrl || null };
    },

    async deleteImage(url: string): Promise<{ error?: string }> {
        const { error } = await supabase.storage.from('photos').remove([url]);
        if (error) {
            console.error(error);
        }
        return { error: error?.message };
    },

    async uploadImage(folder: string, file: File | null, name = randomID()): Promise<{ url: string | null, error: string | null }> {

        folder = folder.replace('_', '-');
        const ext = 'png';
        const path = `${folder}/${name}.${ext}`;
        let error = null;
        let data = null;
        const { error: _e } = await supabase_image_upload.deleteImage(path);
        if (_e) {
            console.error(_e);
        }
        if (file) {
            if (file.type.split('/')[0] !== 'image') {
                error = 'Not a valid image file type.';
            }
            else {
                ({ error, data } = await supabase.storage.from('photos').upload(path, file));
                if (error) {
                    console.error(error);
                    error = error.message;
                }
            }
        } else {
            error = 'Not a valid file.';
        }
        let url = null;
        if (data?.path) {

            ({ data: url } = await supabase_image_upload.getURL(data.path));
            url = url + '?lastmod=' + Math.random();
        }
        return { url, error };
    }
};