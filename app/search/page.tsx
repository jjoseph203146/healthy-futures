import Link from "next/link";
import BusinessCard from "@/components/BusinessCard";
import BottomNav from "@/components/BottomNav";
import { SearchFilters } from "@/components/SearchFilters";
import { fetchApprovedBusinesses } from "@/lib/queries";
import { isBusinessOpen, haversineDistance } from "@/lib/geo";
import type { DbBusiness } from "@/lib/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; filter?: string; lat?: string; lng?: string }>;
}) {
  const { q, category, filter, lat, lng } = await searchParams;
  const activeFilter = filter || "all";

  let businesses: DbBusiness[] = await fetchApprovedBusinesses({
    q,
    category: category ? decodeURIComponent(category) : undefined,
  });

  if (activeFilter === "open-now") {
    businesses = businesses.filter((b) => isBusinessOpen(b.hours));
  } else if (activeFilter === "top-rated") {
    businesses = [...businesses].sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0));
  } else if (activeFilter === "near-me" && lat && lng) {
    const uLat = parseFloat(lat);
    const uLng = parseFloat(lng);
    businesses = businesses
      .map((b) => ({
        ...b,
        distance_miles:
          b.latitude != null && b.longitude != null
            ? haversineDistance(uLat, uLng, b.latitude, b.longitude)
            : null,
      }))
      .sort((a, b) => (a.distance_miles ?? 9999) - (b.distance_miles ?? 9999));
  }

  const displayQuery =
    q ? q
    : category ? decodeURIComponent(category)
    : activeFilter === "near-me" ? "Near You"
    : activeFilter === "open-now" ? "Open Now"
    : activeFilter === "top-rated" ? "Top Rated"
    : "All Businesses";

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      <div className="max-w-[390px] mx-auto px-5">
        <div className="pt-14">
          <div
            className="flex items-center gap-2.5 bg-white border-[1.5px] border-brand-gold rounded-2xl px-3.5 py-3"
            style={{ boxShadow: "0 4px 14px -8px rgba(200,134,10,0.4)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#C8860A" strokeWidth="2" />
              <path d="m20 20-3.2-3.2" stroke="#C8860A" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[14.5px] text-brand-dark font-bold flex-1 truncate">
              {displayQuery}
            </span>
            <Link href="/search" className="flex-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6 6 18" stroke="#A9967E" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
          </div>

          <SearchFilters activeFilter={activeFilter} q={q} category={category} />

          <div className="mt-3 text-[12.5px] text-brand-muted font-semibold">
            <b className="text-brand-dark">{businesses.length} results</b> · Augusta, GA
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-3 pb-4">
          {businesses.length > 0 ? (
            businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))
          ) : (
            <div className="mt-16 text-center py-12 px-4">
              <div
                className="w-16 h-16 rounded-[18px] flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg,#3B1F0A22,#C8860A22)" }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#C8860A" strokeWidth="1.8" />
                  <path d="m20 20-3.2-3.2" stroke="#C8860A" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="text-[16px] font-extrabold text-brand-dark">
                {activeFilter === "open-now"
                  ? "No businesses open right now"
                  : activeFilter === "near-me"
                  ? "No businesses found nearby"
                  : activeFilter === "top-rated"
                  ? "No rated businesses yet"
                  : q
                  ? `No results for "${q}"`
                  : category
                  ? `No ${decodeURIComponent(category)} businesses yet`
                  : "No businesses found"}
              </h2>
              <p className="text-[13px] text-brand-muted mt-2 leading-relaxed max-w-[220px] mx-auto">
                {activeFilter === "open-now"
                  ? "Check back later or browse all businesses."
                  : activeFilter === "near-me"
                  ? "Try expanding your search or browse all businesses."
                  : "Try adjusting your search or browse all businesses."}
              </p>
              <div className="flex gap-2.5 justify-center mt-5">
                {(q || category || activeFilter !== "all") && (
                  <Link
                    href="/search"
                    className="text-[13px] font-bold text-brand-brown border border-brand-border bg-white rounded-full px-4 py-2"
                  >
                    Clear filters
                  </Link>
                )}
                <Link
                  href="/"
                  className="text-[13px] font-bold text-brand-light rounded-full px-4 py-2"
                  style={{ background: "linear-gradient(135deg,#3B1F0A,#5C4A36)" }}
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
