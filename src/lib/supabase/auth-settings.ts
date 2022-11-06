import type { Optional } from "$lib/user.model";
import { supabase } from "./supabase";

interface user_update {
    displayName?: Optional<string>,
    photoURL?: Optional<string>,
    phoneNumber?: Optional<string>
};

type profile_update = {
    error?: Optional<string>;
    data?: Optional<string>;
};

export const supabase_auth_settings_adapter = {

    async updateProfile({ displayName, photoURL, phoneNumber }: user_update): Promise<profile_update> {
        const id = (await supabase.auth.getSession()).data.session?.user.id;

        // update profiles db
        const { error } = await supabase.from('profiles').upsert({
            id,
            photo_url: photoURL,
            phone_number: phoneNumber,
            display_name: displayName
        });
        if (error) {
            console.error(error);
            return { error: error.message };
        }

        // update meta db
        const { error: e2 } = await supabase.auth.updateUser({
            data: {
                avatar_url: photoURL,
                picture: photoURL,
                phone_number: phoneNumber,
                full_name: displayName,
                name: displayName
            }
        });
        if (e2) {
            console.error(e2);
            return { error: e2.message };
        }
        return { error: null };
    },
    async updateEmail(email: string): Promise<profile_update> {
        const { error } = await supabase.auth.updateUser({ email });
        if (error) {
            console.error(error);
            return { error: error.message };
        }
        return { error: null };
    },
    async updateUsername(username: string): Promise<profile_update> {
        const id = (await supabase.auth.getSession()).data.session?.user.id;
        if (id) {
            const { error } = await supabase.from('profiles')
                .update({ username }).eq('id', id);
            if (error) {
                console.error(error);
                return { error: error.message };
            }
        }
        return { error: null };
    },
    async validUsername(username: string): Promise<boolean> {
        const { error, count } = await supabase.from('profiles')
            .select('username', { count: 'exact' }).eq('username', username);
        if (error) {
            console.error(error);
        }
        return count === 0;
    }
};