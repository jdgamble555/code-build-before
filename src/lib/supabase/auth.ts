import { authUser } from "j-supabase";
import { readable } from "svelte/store";
import { supabase } from "./supabase";
import type { User as User_Supabase } from '@supabase/supabase-js';
import type { User } from "$lib/user.model";

const supabase_to_user = (i: User_Supabase): User => ({
    displayName: i.user_metadata['full_name'],
    email: i.email as string,
    uid: i.id,
    photoURL: i.user_metadata['avatar_url']
});

export class supabase_auth_adapter {

    // auth class

    user = readable<User | null>(null, (set) => {
        return authUser(supabase).subscribe(user => {
            set(user ? supabase_to_user(user) : null);
        });
    });

    async loginWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) {
            console.error(error);
        }
    }

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        }
    }
}