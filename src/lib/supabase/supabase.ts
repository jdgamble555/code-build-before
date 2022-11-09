/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    env.PUBLIC_SUPABASE_URL as string,
    env.PUBLIC_SUPABASE_ANON_KEY as string
);
