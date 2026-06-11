"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function AdminSignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-[11px] font-bold text-brand-light/60 hover:text-brand-light transition-colors"
    >
      Sign out
    </button>
  );
}
