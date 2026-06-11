import Link from "next/link";
import BusinessCard from "@/components/BusinessCard";
import BottomNav from "@/components/BottomNav";
import { BUSINESSES, searchBusinesses, getBusinessesByCategory } from "@/lib/data";

const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Open Now", value: "open-now" },
  { label: "Top Rated", value: "top-rated" },
  { label: "Nearby", value: "nearby" },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; filter?: string }>;
}) {
  const { q, category, filter } = await searchParams;

  let businesses = BUSINESSES;
  if (q) {
    businesses = searchBusinesses(q);
  } else if (category) {
    businesses = getBusinessesByCategory(decodeURIComponent(category));
  }

  const activeFilter = filter || "all";
  const displayQuery = q || (category ? decodeURIComponent(category) : "All Businesses");

  const buildTabHref = (value: string) => {
    const base = q ? `?q=${q}` : category ? `?category=${category}` : "?";
    return `/search${base}${base === "?" ? "" : "&"}filter=${value}`;
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      <div className="max-w-[390px] mx-auto px-5">
        {/* Search bar */}
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

          {/* Filter tabs */}
          <div className="flex gap-1.5 mt-3 overflow-x-auto scrollbar-hide pb-1">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <Link
                  key={tab.value}
                  href={buildTabHref(tab.value)}
                  className={`text-xs font-bold rounded-full px-3 py-1.5 whitespace-nowrap flex-none ${
                    isActive
                      ? "text-white bg-brand-brown"
                      : "text-brand-surface bg-white border border-brand-border"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-3 text-[12.5px] text-brand-muted font-semibold">
            <b className="text-brand-dark">{businesses.length} results</b> · Augusta, GA
          </div>
        </div>

        {/* Results */}
        <div className="mt-3 flex flex-col gap-3 pb-4">
          {businesses.length > 0 ? (
            businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))
          ) : (
            <div className="mt-16 text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <h2 className="text-base font-bold text-brand-dark">No results found</h2>
              <p className="text-sm text-brand-muted mt-1">
                Try a different search term or browse by category.
              </p>
              <Link
                href="/"
                className="inline-block mt-4 text-sm font-bold text-brand-gold"
              >
                Back to home
              </Link>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
