/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';

let process: any;

const p = process?.env ? process.env : env;

export const supabase = createClient(
    p.PUBLIC_SUPABASE_URL as string,
    p.PUBLIC_SUPABASE_ANON_KEY as string
);