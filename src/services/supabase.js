import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseUrl = "https://jooncyildxalxxyppwkk.supabase.co";
const supabasePublishKey = "sb_publishable_QSksYogU8sNsdpMv9dCEVw_Ipy_Ufj1";
const supabase = createClient(supabaseUrl, supabasePublishKey);
export default supabase;
