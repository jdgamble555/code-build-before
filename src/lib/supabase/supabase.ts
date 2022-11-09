import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

console.log(Object.keys(env).length)

export const supabase = createClient(
    env.PUBLIC_SUPABASE_URL as string,
    env.PUBLIC_SUPABASE_ANON_KEY as string
);
