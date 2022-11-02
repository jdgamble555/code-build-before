import { supabase_auth_adapter } from './supabase/auth';
import { supabase_post_read_adapter } from './supabase/post';

export const auth = supabase_auth_adapter;

export const read_post = supabase_post_read_adapter;