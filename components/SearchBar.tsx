"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search"
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex items-center gap-2.5 bg-white border border-brand-border rounded-2xl px-4 py-3.5"
      style={{ boxShadow: "0 4px 14px -8px rgba(59,31,10,0.3)" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#A07A3C" strokeWidth="2" />
        <path d="m20 20-3.2-3.2" stroke="#A07A3C" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search businesses, food, services…"
        className="flex-1 bg-transparent text-[14.5px] text-brand-dark placeholder:text-brand-subtle focus:outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="flex-none text-brand-muted"
          aria-label="Clear search"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </form>
  );
}
