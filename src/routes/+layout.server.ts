import { read_post } from '$lib/database';
import { getTags } from '$lib/supabase/tags';
import type { LayoutLoad } from './$types';

const { getTotal } = read_post;

export const load: LayoutLoad = async () => {
  const tags = await getTags();
  const { count: total } = await getTotal('posts');
  return {
    total,
    tags
  };
}