import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { countApprovedBusinesses } from "@/lib/queries";

const MENU_ITEMS = [
  {
    label: "Saved Businesses",
    href: "/saved",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 4h12v16l-6-4-6 4V4Z" stroke="#C8860A" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    badge: "4",
  },
  {
    label: "My Reviews",
    href: "/search",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#C8860A" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Notification Preferences",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#C8860A" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default async function ProfilePage() {
  const savedCount = 0;
  const totalBusinesses = await countApprovedBusinesses();

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      <div className="max-w-[390px] mx-auto px-5">
        {/* Header */}
        <div className="pt-14 pb-0">
          <div className="flex items-center gap-4">
            <div className="w-[60px] h-[60px] rounded-full bg-brand-brown flex items-center justify-center text-brand-light font-extrabold text-[22px] flex-none">
              AJ
            </div>
            <div>
              <h1 className="font-serif text-[22px] font-semibold text-brand-dark leading-tight">
                Amara Johnson
              </h1>
              <p className="text-[12.5px] text-brand-muted font-semibold mt-0.5">Augusta, GA</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-white border border-brand-card rounded-2xl p-3.5 text-center">
            <div className="text-lg font-extrabold text-brand-dark">{savedCount}</div>
            <div className="text-[10.5px] font-semibold text-brand-muted mt-0.5">Saved</div>
          </div>
          <div className="bg-white border border-brand-card rounded-2xl p-3.5 text-center">
            <div className="text-lg font-extrabold text-brand-dark">2</div>
            <div className="text-[10.5px] font-semibold text-brand-muted mt-0.5">Reviews</div>
          </div>
          <div className="bg-white border border-brand-card rounded-2xl p-3.5 text-center">
            <div className="text-lg font-extrabold text-brand-dark">{totalBusinesses}</div>
            <div className="text-[10.5px] font-semibold text-brand-muted mt-0.5">Businesses</div>
          </div>
        </div>

        {/* List Your Business CTA */}
        <Link
          href="/submit"
          className="block mt-5 rounded-[20px] overflow-hidden"
          style={{ background: "linear-gradient(135deg,#3B1F0A,#5A3413)" }}
        >
          <div className="p-5">
            <div className="text-base font-extrabold text-brand-light">List Your Business</div>
            <div className="text-[12px] text-brand-light/70 mt-1 leading-relaxed">
              Join {totalBusinesses}+ verified Black-owned businesses reaching your community. Free forever.
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div>
                <div className="text-[15px] font-extrabold text-brand-gold">Free</div>
                <div className="text-[9.5px] text-brand-light/50">forever</div>
              </div>
              <div>
                <div className="text-[15px] font-extrabold text-brand-gold">Verified</div>
                <div className="text-[9.5px] text-brand-light/50">community</div>
              </div>
              <div>
                <div className="text-[15px] font-extrabold text-brand-gold">Visible</div>
                <div className="text-[9.5px] text-brand-light/50">locally</div>
              </div>
            </div>
          </div>
          <div className="bg-brand-gold px-5 py-3 flex items-center justify-between">
            <span className="text-[13px] font-extrabold text-white">Get Listed Today →</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>

        {/* Menu items */}
        <div className="mt-5 bg-white border border-brand-card rounded-2xl overflow-hidden divide-y divide-brand-card">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3.5 px-4 py-3.5 hover:bg-brand-cream transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-cream flex items-center justify-center flex-none">
                {item.icon}
              </div>
              <span className="flex-1 text-[13.5px] font-semibold text-brand-dark">{item.label}</span>
              {item.badge && (
                <span className="text-[11px] font-bold text-brand-gold bg-brand-cream border border-brand-border rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-brand-muted flex-none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>

        <p className="text-center text-[11px] text-brand-muted mt-6">
          Healthy Futures · Augusta, GA · v1.0
        </p>
        <p className="text-center mt-2 pb-2">
          <Link
            href="/admin/login"
            className="text-[10px] text-brand-muted/40 hover:text-brand-muted transition-colors"
          >
            Admin Access
          </Link>
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
