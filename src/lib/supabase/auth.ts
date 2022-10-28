import { authSession } from "j-supabase";
import { get, readable } from "svelte/store";
import { supabase } from "./supabase";
import type { User as User_Supabase } from '@supabase/supabase-js';
import type { User } from "$lib/user.model";
import { page } from '$app/stores';

const supabase_to_user = (i: User_Supabase): User => ({
    displayName: i.user_metadata['full_name'],
    email: i.email as string,
    uid: i.id,
    photoURL: i.user_metadata['avatar_url']
});

export class supabase_auth_adapter {

    // auth class

    user = readable<User | null>(null, (set) => {
        return authSession(supabase).subscribe(session => {
            set(session?.user ? supabase_to_user(session.user) : null);
        });
    });

    async loginWithGoogle(): Promise<void> {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: get(page).url.origin
            }
        });
        if (error) {
            console.error(error);
        }
    }

    async logout(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        }
    }

    async loginWithMagic(email: string): Promise<void> {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: get(page).url.origin
            }
        });
        if (error) {
            console.error(error);
        }
    }
}
