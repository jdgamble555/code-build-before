import { getTags } from '$lib/supabase/tags';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
  const tags = await getTags();
  return {
    tags
  };
}