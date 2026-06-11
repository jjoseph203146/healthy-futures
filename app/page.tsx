import Link from "next/link";
import BusinessCard from "@/components/BusinessCard";
import CategoryGrid from "@/components/CategoryGrid";
import BottomNav from "@/components/BottomNav";
import { getFeaturedBusinesses, BUSINESSES } from "@/lib/data";

export default function HomePage() {
  const trendingBusinesses = BUSINESSES.slice(0, 4);
  const featuredBusinesses = getFeaturedBusinesses();

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      <div className="max-w-[390px] mx-auto px-5">
        {/* Header */}
        <div className="pt-14">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-[25px] font-semibold text-brand-dark leading-tight">
                Good morning 👋
              </h1>
              <p className="text-[13px] text-brand-muted mt-1 font-semibold tracking-wide">
                Discover · Connect · Empower
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-brown flex items-center justify-center text-brand-light font-extrabold text-base flex-none">
              AJ
            </div>
          </div>
        </div>

        {/* Search bar */}
        <Link
          href="/search"
          className="mt-4 flex items-center gap-2.5 bg-white border border-brand-border rounded-2xl px-4 py-3.5 block"
          style={{ boxShadow: "0 4px 14px -8px rgba(59,31,10,0.3)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#A07A3C" strokeWidth="2" />
            <path d="m20 20-3.2-3.2" stroke="#A07A3C" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[14.5px] text-brand-subtle">
            Search businesses, food, services…
          </span>
        </Link>

        {/* Filter chips */}
        <div className="flex gap-2 mt-3.5">
          <Link
            href="/search?filter=near-me"
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-brand-gold rounded-full px-3 py-2"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z" stroke="#fff" strokeWidth="2" />
              <circle cx="12" cy="10" r="2.3" fill="#fff" />
            </svg>
            Near Me
          </Link>
          <Link
            href="/search?filter=open-now"
            className="text-xs font-bold text-brand-surface bg-white border border-brand-border rounded-full px-3 py-2"
          >
            Open Now
          </Link>
          <Link
            href="/search?filter=top-rated"
            className="text-xs font-bold text-brand-surface bg-white border border-brand-border rounded-full px-3 py-2"
          >
            Top Rated
          </Link>
        </div>

        {/* Trending section header */}
        <div className="flex items-center justify-between mt-6 mb-3">
          <h2 className="text-base font-extrabold text-brand-dark">Trending Near You</h2>
          <Link href="/search" className="text-xs font-bold text-brand-gold">
            See all
          </Link>
        </div>
      </div>

      {/* Horizontal scroll — full width so cards bleed off edge */}
      <div
        className="flex gap-3.5 px-5 pb-4 overflow-x-auto scrollbar-hide"
        style={{ maxWidth: "100%" }}
      >
        {trendingBusinesses.map((business) => (
          <BusinessCard key={business.id} business={business} variant="vertical" />
        ))}
      </div>

      <div className="max-w-[390px] mx-auto px-5">
        {/* Categories */}
        <h2 className="text-base font-extrabold text-brand-dark mb-3 mt-2">Browse by Category</h2>
        <CategoryGrid />

        {/* Featured section */}
        {featuredBusinesses.length > 0 && (
          <>
            <div className="flex items-center justify-between mt-6 mb-3">
              <h2 className="text-base font-extrabold text-brand-dark">Featured Businesses</h2>
              <Link href="/search" className="text-xs font-bold text-brand-gold">
                See all
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {featuredBusinesses.slice(0, 3).map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
