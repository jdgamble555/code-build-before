import type { Post } from "$lib/post.model";
import type { Optional, Provider, Role, UserRec } from "$lib/user.model";
import type { User } from "@supabase/supabase-js";
import { decode, encode } from "j-supabase";

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

export const user_to_supabase = (u: UserRec): supabase_user => ({
    id: decode(u.id),
    created_at: u.createdAt,
    updated_at: u.updatedAt,
    display_name: u.displayName,
    photo_url: u.photoURL,
    phone_number: u.phoneNumber,
    email: u.email,
    role: u.role,
    username: u.username,
    providers: u.providers
});

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


// POST

export interface supabase_post {
    id: string;
    created_at: Date;
    title: string;
    author: supabase_user;
    content: string;
    slug: string;
    minutes: string;
    updated_at?: Optional<Date>;
    image?: Optional<string>;
    image_uploads?: Optional<string[]>;
    tags: string[];
    published_at: Date;
    hearts_count: number;
};

export const supabase_to_post = (p: supabase_post): Post => ({
    content: p.content,
    title: p.title,
    id: encode(p.id),
    image: p.image,
    imageUploads: p.image_uploads,
    minutes: p.minutes,
    slug: p.slug,
    author: supabase_to_user(p.author),
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    tags: p.tags,
    heartsCount: p.hearts_count,
    publishedAt: p.published_at
});

export const post_to_supabase = (p: Post): supabase_post => ({
    id: decode(p.id),
    title: p.title,
    content: p.content,
    image: p.image,
    slug: p.slug,
    minutes: p.minutes,
    image_uploads: p.imageUploads,
    author: user_to_supabase(p.author),
    created_at: p.createdAt,
    updated_at: p.updatedAt,
    tags: p.tags,
    hearts_count: p.heartsCount,
    published_at: p.publishedAt
});