import { supabase_actions_adapter } from './supabase/actions';
import { supabase_auth_adapter } from './supabase/auth';
import { supabase_auth_settings_adapter } from './supabase/auth-settings';
import { supabase_image_upload_adapter } from './supabase/image-upload';
import { supabase_post_read_adapter } from './supabase/post';
import { supabase_post_edit_adapter } from './supabase/post-edit';

export const auth = supabase_auth_adapter;
export const read_post = supabase_post_read_adapter;
export const edit_post = supabase_post_edit_adapter;
export const auth_settings = supabase_auth_settings_adapter;
export const image_upload = supabase_image_upload_adapter;
export const actions = supabase_actions_adapter;