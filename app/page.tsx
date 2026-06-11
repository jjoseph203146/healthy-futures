import Link from "next/link";
import BusinessCard from "@/components/BusinessCard";
import CategoryGrid from "@/components/CategoryGrid";
import BottomNav from "@/components/BottomNav";
import SearchBar from "@/components/SearchBar";
import NearMeButton from "@/components/NearMeButton";
import { fetchTrendingBusinesses, fetchFeaturedBusinesses } from "@/lib/queries";

function getGreeting(): string {
  const etHour = ((new Date().getUTCHours() - 4) + 24) % 24;
  if (etHour < 12) return "Good morning 👋";
  if (etHour < 17) return "Good afternoon 👋";
  return "Good evening 👋";
}

export default async function HomePage() {
  const [trending, featured] = await Promise.all([
    fetchTrendingBusinesses(),
    fetchFeaturedBusinesses(),
  ]);

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      <div className="max-w-[390px] mx-auto px-5">
        {/* Header */}
        <div className="pt-14">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-[25px] font-semibold text-brand-dark leading-tight">
                {getGreeting()}
              </h1>
              <p className="text-[13px] text-brand-muted mt-1 font-semibold tracking-wide">
                Discover · Connect · Empower
              </p>
            </div>
            <Link
              href="/profile"
              className="w-10 h-10 rounded-full bg-brand-brown flex items-center justify-center flex-none"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#F4E6CA" strokeWidth="1.8" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#F4E6CA" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <SearchBar />

        {/* Filter chips */}
        <div className="flex gap-2 mt-3.5">
          <NearMeButton />
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
        {trending.length > 0 ? (
          trending.map((business) => (
            <BusinessCard key={business.id} business={business} variant="vertical" />
          ))
        ) : (
          <p className="text-sm text-brand-muted px-1 py-8">
            Connect Supabase to see live businesses.
          </p>
        )}
      </div>

      <div className="max-w-[390px] mx-auto px-5">
        {/* Categories */}
        <h2 className="text-base font-extrabold text-brand-dark mb-3 mt-2">Browse by Category</h2>
        <CategoryGrid />

        {/* Featured section */}
        {featured.length > 0 && (
          <>
            <div className="flex items-center justify-between mt-6 mb-3">
              <h2 className="text-base font-extrabold text-brand-dark">Featured Businesses</h2>
              <Link href="/search" className="text-xs font-bold text-brand-gold">
                See all
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {featured.slice(0, 3).map((business) => (
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
