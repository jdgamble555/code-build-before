import type { UserRec } from "./user.model";

export type Optional<T> = T | null | undefined;

export interface Post {
    id: string;
    title: string;
    content: string;
    slug: string;
    minutes: string;
    author: UserRec;
    createdAt: Date;
    updatedAt: Optional<Date>;
    publishedAt: Date;
    image: Optional<string>;
    imageUploads: Optional<string[]>;
    tags: Optional<string[]>;
    heartsCount: number;
  };

  export interface Tag {
    name: string;
    count: number;
  };

  export interface PostRequest {
    error?: Optional<string>;
    data?: Optional<Post[]>;
    exists?: Optional<boolean>;
    count?: Optional<number>;
  };
  
  export interface PostInput {
    sortField?: string,
    sortDirection?: 'desc' | 'asc',
    tag?: string,
    uid?: string,
    authorId?: string,
    field?: string,
    page?: number,
    pageSize?: number,
    drafts?: boolean
  };