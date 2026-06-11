import Link from "next/link";
import BusinessCard from "@/components/BusinessCard";
import BottomNav from "@/components/BottomNav";
import { BUSINESSES } from "@/lib/data";

// Mock saved state — replace with real Supabase query once auth is connected
const SAVED_BUSINESSES = BUSINESSES.slice(0, 4);

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      <div className="max-w-[390px] mx-auto px-5">
        <div className="pt-14">
          <h1 className="font-serif text-[27px] font-semibold text-brand-dark">Saved</h1>
          <p className="text-[12.5px] text-brand-muted mt-1 font-semibold">
            {SAVED_BUSINESSES.length} businesses you love
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {SAVED_BUSINESSES.length > 0 ? (
            SAVED_BUSINESSES.map((business) => (
              <BusinessCard key={business.id} business={business} isSaved />
            ))
          ) : (
            <div className="mt-16 text-center py-12">
              <div className="text-5xl mb-4">🔖</div>
              <h2 className="text-base font-bold text-brand-dark">Nothing saved yet</h2>
              <p className="text-sm text-brand-muted mt-1 max-w-[260px] mx-auto">
                Tap the bookmark icon on any business profile to save it here.
              </p>
              <Link
                href="/search"
                className="inline-block mt-5 bg-brand-brown text-brand-light text-sm font-bold rounded-full px-6 py-3"
              >
                Discover Businesses
              </Link>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
