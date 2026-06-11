import { createClient } from "@supabase/supabase-js";

// Server-side only — uses service role key so it bypasses RLS.
// Never import this in client components.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Falls back to anon key in local dev if service role key isn't set yet
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
