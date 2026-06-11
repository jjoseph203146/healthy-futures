"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NearMeButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [city, setCity] = useState("");

  // Must be a plain synchronous function — no async wrapper — so the browser
  // recognises this as a direct user gesture and allows the geolocation prompt.
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!("geolocation" in navigator)) {
      setShowManual(true);
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      function onSuccess(pos) {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        router.push(`/search?filter=near-me&lat=${lat}&lng=${lng}`);
        setLoading(false);
      },
      function onError() {
        setLoading(false);
        setShowManual(true);
      },
      { timeout: 10000, maximumAge: 0, enableHighAccuracy: false }
    );
  }

  if (showManual) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city…"
          autoFocus
          className="text-xs border border-brand-border rounded-full px-3 py-1.5 bg-white text-brand-dark w-28 focus:outline-none focus:border-brand-gold"
          onKeyDown={(e) => {
            if (e.key === "Enter" && city.trim())
              router.push(`/search?q=${encodeURIComponent(city.trim())}`);
          }}
        />
        <button
          type="button"
          onClick={() =>
            city.trim() && router.push(`/search?q=${encodeURIComponent(city.trim())}`)
          }
          className="text-xs font-extrabold text-white bg-brand-gold rounded-full px-3 py-1.5"
        >
          Go
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1.5 text-xs font-bold text-white bg-brand-gold rounded-full px-3 py-2 disabled:opacity-60"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z"
          stroke="#fff"
          strokeWidth="2"
        />
        <circle cx="12" cy="10" r="2.3" fill="#fff" />
      </svg>
      {loading ? "Locating…" : "Near Me"}
    </button>
  );
}
