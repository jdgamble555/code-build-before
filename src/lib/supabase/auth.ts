import { authUser, realtime, } from "j-supabase";
import { derived, get, readable } from "svelte/store";
import { supabase } from "./supabase";
import type { AuthError, User } from '@supabase/supabase-js';
import type { UserRec } from "$lib/user.model";
import { page } from '$app/stores';
import { type supabase_user, combine_auth_user } from './auth.types';

const auth = readable<User | null>(null, set =>
    authUser(supabase).subscribe(user => {
        set(user ?? null);
    })
);

export const supabase_auth_adapter = {

    // auth class

    user: derived<typeof auth, UserRec | null>(auth, (user, set) => {
        // check for logged in
        if (user && user.id) {

            // subscribe to profiles table
            return realtime<supabase_user>(supabase)
                .from('profiles')
                .eq('id', user.id)
                .single()
                .subscribe(snap => {
                    if (snap.data) {

                        // if exists, get data
                        set(combine_auth_user(snap.data, user));
                    } else {

                        // if DNE, set create data
                        supabase.from('profiles').insert({
                            photo_url: user.user_metadata.avatar_url || null,
                            display_name: user.user_metadata.avatar_url || null,
                            role: 'USER'
                        }).select('*').single().then(({ error, data }) => {
                            if (error) {
                                console.error(error);
                            } else {

                                // get data created
                                set(combine_auth_user(data, user));
                            }
                        });
                    }
                });
        } else {

            // not logged in
            set(null);
        }
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

