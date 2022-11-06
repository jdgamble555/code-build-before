import type { Optional, Provider, Role, UserRec } from "$lib/user.model";
import type { User } from "@supabase/supabase-js";
import { encode } from "j-supabase";

export interface supabase_user {
    id: string;
    email: string;
    role: Role;
    providers: Provider[];
    created_at: Date;
    updated_at: Optional<Date>;
    photo_url: Optional<string>;
    username: Optional<string>;
    display_name: Optional<string>;
    phone_number: Optional<string>;
};

export const supabase_to_user = (u: supabase_user): UserRec => ({
    id: encode(u.id),
    photoURL: u.photo_url,
    phoneNumber: u.phone_number,
    displayName: u.display_name,
    createdAt: u.created_at,
    updatedAt: u.updated_at,
    username: u.username,
    email: u.email,
    role: u.role,
    providers: u.providers
});

export const combine_auth_user = (data: supabase_user, user: User):
    UserRec => supabase_to_user({
        ...data,
        email: user.email as string,
        providers: user.app_metadata['providers']
    });

