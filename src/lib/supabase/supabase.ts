import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

const p = Object.keys(env).length ? env : process.env;

export const supabase = createClient(
    p.PUBLIC_SUPABASE_URL as string,
    p.PUBLIC_SUPABASE_ANON_KEY as string
);
