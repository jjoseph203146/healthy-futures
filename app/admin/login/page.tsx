"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "#3B1F0A" }}
    >
      <div className="w-full max-w-[360px]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gold mb-4">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="font-serif text-[24px] font-semibold text-brand-light">
            Admin Access
          </h1>
          <p className="text-[12.5px] text-brand-light/50 mt-1">
            Healthy Futures · Augusta, GA
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[24px] p-6 flex flex-col gap-4"
        >
          <div>
            <label className="text-[11px] font-extrabold text-brand-muted uppercase tracking-widest block mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@example.com"
              className="w-full border border-brand-border rounded-xl px-3.5 py-2.5 text-[14px] text-brand-dark bg-brand-cream focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold text-brand-muted uppercase tracking-widest block mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full border border-brand-border rounded-xl px-3.5 py-2.5 text-[14px] text-brand-dark bg-brand-cream focus:outline-none focus:border-brand-gold"
            />
          </div>

          {error && (
            <p className="text-[12px] font-semibold rounded-xl bg-closed-bg px-3.5 py-2.5 text-closed">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-[14px] font-extrabold text-white transition-opacity disabled:opacity-50"
            style={{ background: "#3B1F0A" }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
