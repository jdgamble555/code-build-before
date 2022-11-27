import { read_post } from '$lib/database';
import { getTags } from '$lib/supabase/tags';
import type { LayoutServerLoad } from './$types';

const { getPosts } = read_post;

console.log("layout ran...");

export const load: LayoutServerLoad = async () => {
  const tags = await getTags();
  const { data: posts, count: total } = await getPosts();
  return {
    total,
    tags,
    posts
  };
};
