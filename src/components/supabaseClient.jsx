import { createClient } from '@supabase/supabase-js'

const sbUrl =import.meta.env.VITE_SB_URL;;
const sbAnonKey = import.meta.env.VITE_SB_ANON_KEY;

export const sb = createClient(sbUrl, sbAnonKey)