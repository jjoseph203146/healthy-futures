"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

// Retrieves or creates an anonymous device-scoped user ID in localStorage.
// Must only be called client-side (inside useEffect or click handlers).
function getOrCreateUserId(): string {
  let uid = localStorage.getItem("hf_user_id");
  if (!uid) {
    uid = crypto.randomUUID();
    localStorage.setItem("hf_user_id", uid);
  }
  return uid;
}

interface Props {
  businessId: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SaveButton({ businessId, className, style }: Props) {
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  // Check saved state once on mount (client-only — localStorage unavailable during SSR)
  useEffect(() => {
    const userId = getOrCreateUserId();
    const supabase = createClient();

    async function check() {
      try {
        const { data } = await supabase
          .from("saved_businesses")
          .select("id")
          .eq("user_id", userId)
          .eq("business_id", businessId)
          .maybeSingle();
        setSaved(!!data);
      } catch {
        // Supabase not configured — leave unsaved state
      }
      setReady(true);
    }

    check();
  }, [businessId]);

  async function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const userId = getOrCreateUserId();
    const supabase = createClient();

    if (saved) {
      setSaved(false);
      const { error } = await supabase
        .from("saved_businesses")
        .delete()
        .eq("user_id", userId)
        .eq("business_id", businessId);
      if (error) setSaved(true); // revert on failure
    } else {
      setSaved(true);
      const { error } = await supabase
        .from("saved_businesses")
        .insert({ user_id: userId, business_id: businessId });
      if (error) setSaved(false); // revert on failure
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={saved ? "Remove from saved" : "Save business"}
      className={
        className ??
        "w-[34px] h-[34px] rounded-full flex items-center justify-center transition-transform active:scale-90"
      }
      style={style ?? { background: "rgba(255,255,255,0.92)" }}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill={ready && saved ? "#C8860A" : "none"}
        style={{ opacity: ready ? 1 : 0.5 }}
      >
        <path
          d="M6 4h12v16l-6-4-6 4V4Z"
          stroke="#C8860A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
