import { createClient } from '@supabase/supabase-js';
import env from './env';

const supabase = createClient(env.supabaseURL, env.supabaseAPIKey);

export default supabase;
