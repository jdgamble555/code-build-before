import { authUser, realtime, } from "j-supabase";
import { get, readable } from "svelte/store";
import { supabase } from "./supabase";
import type { AuthError, User } from '@supabase/supabase-js';
import type { Optional, UserRec } from "$lib/user.model";
import { page } from '$app/stores';
import { type supabase_user, supabase_to_user } from './auth.types';


export const supabase_auth_adapter = {

    // auth class

    user: readable<UserRec | null>(null, (set) => {
        let profileSub: Optional<() => void>;
        const authSub = authUser(supabase).subscribe(user => {
            if (user) {
                checkUser(user);
                if (user.id) {
                    profileSub = realtime<supabase_user>(supabase)
                        .from('profiles')
                        .eq('id', user.id)
                        .single()
                        .subscribe(snap => {
                            if (snap.data) {
                                const _user = supabase_to_user({
                                    ...snap.data,
                                    providers: user.app_metadata['providers']
                                });
                                set(_user);
                            } else {
                                set(null);
                            }
                        });
                }
            } else {
                if (profileSub) profileSub();
                set(null);
            }
        });
        return () => {
            if (authSub) authSub();
            if (profileSub) profileSub();
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

const checkUser = (user: User): void => {

    // check for public profile record or create one
    supabase.from('profiles').select('*').eq('id', user.id)
        .then(({ data, error }) => {
            if (error) {
                console.error(error);
            } else {
                if (data.length === 0) {
                    supabase.from('profiles').insert({
                        photo_url: user.user_metadata.avatar_url || null,
                        display_name: user.user_metadata.avatar_url || null,
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

