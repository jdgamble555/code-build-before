import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

const isEdge = Object.keys(env).length === 0;

export const supabase = createClient(
    (isEdge ? env.PUBLIC_SUPABASE_URL : process.env.PUBLIC_SUPABASE_URL) as string,
    (isEdge ? env.PUBLIC_SUPABASE_ANON_KEY : process.env.PUBLIC_SUPABASE_ANON_KEY) as string
);
