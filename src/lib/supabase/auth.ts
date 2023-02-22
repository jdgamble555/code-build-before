import { authUser, realtime, } from "j-supabase";
import { derived, get, readable } from "svelte/store";
import { supabase } from "./supabase";
import type { AuthError, User } from '@supabase/supabase-js';
import type { UserType } from "$lib/user.model";
import { page } from '$app/stores';
import { type supabase_user, combine_auth_user } from './auth.types';

type AuthType = {
    _loading: boolean;
    _user: User | null;
}

const auth = readable<AuthType>({ _loading: true, _user: null }, set =>
    authUser(supabase).subscribe(user => {
        set({ _loading: false, _user: user ?? null });
    })
);

export const supabase_auth_adapter = {

    // auth class

    user: derived<typeof auth, UserType>(auth, ({ _user, _loading }, set) => {

        // loading
        if (_loading) {
            set({ loading: true, data: null });
            return;
        }

        // not logged in
        if (!_user) {
            set({ loading: false, data: null });
            return;
        }

        // subscribe to profiles table
        return realtime<supabase_user>(supabase)
            .from('profiles')
            .eq('id', _user.id)
            .single()
            .subscribe(snap => {
                if (!snap.data) {
                    // if DNE, set create data
                    // will refresh subscription...
                    supabase.from('profiles').insert({
                        photo_url: _user.user_metadata.avatar_url || null,
                        display_name: _user.user_metadata.full_name || null,
                        role: 'USER'
                    }).then(({ error }) => {
                        if (error) {
                            console.error(error);
                        }
                    });
                    return;
                }
                
                // if exists, get data
                set({ loading: false, data: combine_auth_user(snap.data, _user) });
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

