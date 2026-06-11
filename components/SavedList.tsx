"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BusinessCard from "@/components/BusinessCard";
import { createClient } from "@/utils/supabase/client";
import type { DbBusiness } from "@/lib/types";

type RawRow = DbBusiness & { reviews?: { rating: number }[] };

function withRatings(rows: RawRow[]): DbBusiness[] {
  return rows.map(({ reviews, ...b }) => ({
    ...b,
    avg_rating: reviews?.length
      ? parseFloat(
          (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        )
      : null,
    review_count: reviews?.length ?? 0,
  }));
}

function SkeletonCard() {
  return (
    <div className="flex gap-3 bg-white border border-brand-card rounded-[18px] p-3 animate-pulse">
      <div className="w-[78px] h-[78px] rounded-[14px] bg-brand-card flex-none" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-3.5 bg-brand-card rounded w-3/4" />
        <div className="h-2.5 bg-brand-card rounded w-1/2" />
        <div className="h-2.5 bg-brand-card rounded w-full" />
      </div>
    </div>
  );
}

export function SavedList() {
  const [businesses, setBusinesses] = useState<DbBusiness[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage is only accessible client-side
    const userId = localStorage.getItem("hf_user_id");
    if (!userId) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    async function load() {
      try {
        const { data: savedRows } = await supabase
          .from("saved_businesses")
          .select("business_id")
          .eq("user_id", userId);

        const ids = (savedRows ?? []).map(
          (r: { business_id: string }) => r.business_id
        );

        if (ids.length === 0) {
          setLoading(false);
          return;
        }

        const { data } = await supabase
          .from("businesses")
          .select("*, reviews(rating)")
          .in("id", ids)
          .eq("status", "approved");

        setBusinesses(withRatings((data ?? []) as RawRow[]));
      } catch {
        // Supabase not configured — show empty state
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="mt-4 flex flex-col gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="mt-12 text-center py-10">
        <div className="text-5xl mb-4">🔖</div>
        <h2 className="text-base font-bold text-brand-dark">Nothing saved yet</h2>
        <p className="text-sm text-brand-muted mt-1.5 max-w-[260px] mx-auto leading-relaxed">
          Tap the bookmark icon on any business profile to save it here.
        </p>
        <Link
          href="/search"
          className="inline-block mt-5 bg-brand-brown text-brand-light text-sm font-bold rounded-full px-6 py-3"
        >
          Discover Businesses
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="text-[12.5px] text-brand-muted font-semibold mt-1">
        {businesses.length} business{businesses.length !== 1 ? "es" : ""} saved
      </p>
      <div className="mt-3 flex flex-col gap-3">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} isSaved />
        ))}
      </div>
    </>
  );
}
