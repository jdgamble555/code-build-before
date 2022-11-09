import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

const process = { env };

export const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);