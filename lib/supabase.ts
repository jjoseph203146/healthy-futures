import { createClient } from "@supabase/supabase-js";

// Fallback values prevent createClient from throwing when env vars aren't set in local dev.
// All queries are wrapped in try/catch in lib/queries.ts so unconfigured state is handled gracefully.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-key"
);
