import { read_post } from '$lib/database';
import { getTags } from '$lib/supabase/tags';
import type { LayoutServerLoad } from './$types';

const { getTotal, getPosts } = read_post;

export const load: LayoutServerLoad = async () => {
  const tags = await getTags();
  const { data: posts } = await getPosts();
  const { count: total } = await getTotal('posts');
  return {
    total,
    tags,
    posts
  };
}