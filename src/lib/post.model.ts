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
    imageTmp: Optional<string>;
    imageUploads: Optional<string[]>;
    tags: Optional<Tag[]>;
  };

  export interface UserRec {
    id: string;
    createdAt: Date;
    updatedAt: Optional<Date>;
    displayName: Optional<string>;
    photoURL: Optional<string>;
    username: Optional<string>;
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