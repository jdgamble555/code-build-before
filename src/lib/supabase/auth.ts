import { authSession } from "j-supabase";
import { get, readable } from "svelte/store";
import { supabase } from "./supabase";
import type { AuthError, Session, User as User_Supabase } from '@supabase/supabase-js';
import type { User } from "$lib/user.model";
import { page } from '$app/stores';

const supabase_to_user = (i: User_Supabase): User => ({
    displayName: i.user_metadata['full_name'],
    email: i.email as string,
    uid: i.id,
    photoURL: i.user_metadata['avatar_url']
});

export const supabase_auth_adapter = {

    // auth class

    user: readable<User | null>(null, (set) => {
        return authSession(supabase).subscribe(session => {
            checkUser(session);
            set(session?.user ? supabase_to_user(session.user) : null);
        });
    }),

    async logout(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        }
    },

    async loginWithMagic(email: string): Promise<AuthError | null> {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: get(page).url.origin
            }
        });
        if (error) {
            console.error(error);
            return error;
        }
        return null;
    },

    async loginWithGoogle(): Promise<AuthError | null> {
        return await oAuth('google');
    },

    async loginWithApple(): Promise<AuthError | null> {
        return await oAuth('apple');
    }
}

const checkUser = (session: Session | null): void => {

    // check for public profile record or create one
    if (session) {
        supabase.from('profiles').select('*').eq('id', session?.user.id)
            .then(({ data, error }) => {
                if (error) {
                    console.error(error);
                } else {
                    if (data.length === 0) {
                        supabase.from('profiles').insert({
                            photo_url: session?.user.user_metadata.avatar_url || null,
                            display_name: session?.user.user_metadata.avatar_url || null,
                            role: 'USER'
                        }).then(({ error }) => {
                            if (error) {
                                console.error(error);
                            }
                        });
                    }
                }
            });
    }
}

const oAuth = async (provider: 'google' | 'apple'): Promise<AuthError | null> => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: get(page).url.origin
        }
    });
    if (error) {
        console.error(error);
    }
    if (error) {
        console.error(error);
        return error;
    }
    return null;
}