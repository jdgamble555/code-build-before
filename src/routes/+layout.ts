import { read_post } from '$lib/database';
import { getTags } from '$lib/supabase/tags';
import type { LayoutLoad } from './$types';

const { getPosts } = read_post;

export const load: LayoutLoad = async () => {
  const tags = await getTags();
  const { data: posts, count: total } = await getPosts();
  return {
    total,
    tags,
    posts
  };
};
