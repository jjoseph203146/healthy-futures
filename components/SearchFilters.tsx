"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TABS = [
  { label: "All", value: "all" },
  { label: "Open Now", value: "open-now" },
  { label: "Top Rated", value: "top-rated" },
];

interface Props {
  activeFilter: string;
  q?: string;
  category?: string;
}

export function SearchFilters({ activeFilter, q, category }: Props) {
  const router = useRouter();
  const [locating, setLocating] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [city, setCity] = useState("");

  const buildHref = (value: string) => {
    const parts: string[] = [];
    if (q) parts.push(`q=${encodeURIComponent(q)}`);
    else if (category) parts.push(`category=${encodeURIComponent(category)}`);
    parts.push(`filter=${value}`);
    return `/search?${parts.join("&")}`;
  };

  // Plain synchronous function — no async wrapper — preserves user gesture for geolocation prompt.
  function handleNearby(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!("geolocation" in navigator)) {
      setShowManual(true);
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      function onSuccess(pos) {
        const parts: string[] = [];
        if (q) parts.push(`q=${encodeURIComponent(q)}`);
        else if (category) parts.push(`category=${encodeURIComponent(category)}`);
        parts.push(`filter=near-me`);
        parts.push(`lat=${pos.coords.latitude.toFixed(6)}`);
        parts.push(`lng=${pos.coords.longitude.toFixed(6)}`);
        router.push(`/search?${parts.join("&")}`);
        setLocating(false);
      },
      function onError() {
        setLocating(false);
        setShowManual(true);
      },
      { timeout: 10000, maximumAge: 0, enableHighAccuracy: false }
    );
  }

  return (
    <div className="flex gap-1.5 mt-3 overflow-x-auto scrollbar-hide pb-1 items-center">
      {TABS.map((tab) => {
        const isActive = activeFilter === tab.value;
        return (
          <Link
            key={tab.value}
            href={buildHref(tab.value)}
            className={`text-xs font-bold rounded-full px-3 py-1.5 whitespace-nowrap flex-none transition-colors ${
              isActive
                ? "text-white bg-brand-brown"
                : "text-brand-surface bg-white border border-brand-border"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}

      {showManual ? (
        <div className="flex items-center gap-1 flex-none">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city…"
            autoFocus
            className="text-xs border border-brand-border rounded-full px-2.5 py-1.5 bg-white text-brand-dark w-24 focus:outline-none focus:border-brand-gold"
            onKeyDown={(e) => {
              if (e.key === "Enter" && city.trim())
                router.push(`/search?q=${encodeURIComponent(city.trim())}`);
            }}
          />
        </div>
      ) : activeFilter === "near-me" ? (
        <Link
          href={buildHref("all")}
          className="flex items-center gap-1 text-xs font-bold rounded-full px-3 py-1.5 whitespace-nowrap flex-none text-white bg-brand-brown"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z"
              stroke="#fff"
              strokeWidth="2.5"
            />
            <circle cx="12" cy="10" r="2.5" fill="#fff" />
          </svg>
          Nearby ×
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleNearby}
          disabled={locating}
          className="flex items-center gap-1 text-xs font-bold text-brand-surface bg-white border border-brand-border rounded-full px-3 py-1.5 whitespace-nowrap flex-none disabled:opacity-60"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <circle cx="12" cy="10" r="2.5" fill="currentColor" />
          </svg>
          {locating ? "Locating…" : "Nearby"}
        </button>
      )}
    </div>
  );
}
