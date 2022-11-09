import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

const p = env ?? process.env;
console.log(p);

export const supabase = createClient(
    p.PUBLIC_SUPABASE_URL as string,
    p.PUBLIC_SUPABASE_ANON_KEY as string
);
