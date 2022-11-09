import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

const isLocal = Object.keys(env).length;

export const supabase = createClient(
    (isLocal ? env.PUBLIC_SUPABASE_URL : process.env.PUBLIC_SUPABASE_URL) as string,
    (isLocal ? env.PUBLIC_SUPABASE_ANON_KEY : process.env.PUBLIC_SUPABASE_ANON_KEY) as string
);
