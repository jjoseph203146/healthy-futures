import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchBusinessById, fetchReviewsForBusiness } from "@/lib/queries";
import { isBusinessOpen } from "@/lib/geo";
import { SaveButton } from "@/components/SaveButton";

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await fetchBusinessById(id);

  if (!business) notFound();

  const reviews = await fetchReviewsForBusiness(id);
  const isOpen = isBusinessOpen(business.hours);

  const todayLabel = (() => {
    if (!business.hours) return null;
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = days[new Date().getDay()];
    const h = business.hours[today];
    return h ? `${today}: ${h}` : null;
  })();

  const mapsQuery = business.address
    ? encodeURIComponent(`${business.address}, ${business.city}, ${business.state}`)
    : null;

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero image */}
      <div className="relative h-56 w-full">
        {business.image_url ? (
          <Image
            src={business.image_url}
            alt={business.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg,#3B1F0A,#5C4A36)" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

        {/* Overlay nav */}
        <div className="absolute top-0 left-0 right-0 pt-14 px-5 flex justify-between items-center">
          <Link
            href="/search"
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.92)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M14 6l-6 6 6 6" stroke="#2A1607" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div className="flex gap-2">
            {mapsQuery && (
              <a
                href={`https://maps.google.com/?q=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.92)" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M12 20s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z" stroke="#2A1607" strokeWidth="2" />
                  <circle cx="12" cy="9" r="2.2" fill="#2A1607" />
                </svg>
              </a>
            )}
            <SaveButton businessId={id} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[390px] mx-auto px-5 pb-12">
        <div className="pt-4">
          <h1 className="font-serif text-[25px] font-semibold text-brand-dark leading-[1.05]">
            {business.name}
          </h1>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[13px] text-brand-muted font-semibold">
              {business.category}
              {business.city && ` · ${business.city}, ${business.state}`}
            </span>
            {business.is_black_owned && (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand-light bg-brand-dark rounded-full px-2 py-0.5">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#E0A93B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                BLACK-OWNED
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="text-sm text-brand-gold">
              {"★".repeat(Math.round(business.avg_rating ?? 0))}
              {"☆".repeat(5 - Math.round(business.avg_rating ?? 0))}
            </span>
            <span className="text-[13px] font-extrabold text-brand-dark">
              {business.avg_rating != null ? business.avg_rating.toFixed(1) : "—"}
            </span>
            <span className="text-[12.5px] text-brand-muted">
              ({business.review_count ?? 0} reviews)
            </span>
            {business.hours && (
              <span className={`text-[10px] font-extrabold rounded-full px-1.5 py-0.5 ${isOpen ? "text-open bg-open-bg" : "text-closed bg-closed-bg"}`}>
                {isOpen ? "OPEN" : "CLOSED"}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              className="flex-1 flex flex-col items-center gap-1.5 bg-brand-brown text-brand-light rounded-[14px] py-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="#F4E6CA" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              <span className="text-[11px] font-bold">Call</span>
            </a>
          )}
          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center gap-1.5 bg-white border border-brand-border text-brand-brown rounded-[14px] py-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#3B1F0A" strokeWidth="1.8" />
                <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="#3B1F0A" strokeWidth="1.8" />
              </svg>
              <span className="text-[11px] font-bold">Website</span>
            </a>
          )}
          {mapsQuery && (
            <a
              href={`https://maps.google.com/?q=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center gap-1.5 bg-white border border-brand-border text-brand-brown rounded-[14px] py-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="m21 3-9 18-2-7-7-2 18-9Z" stroke="#3B1F0A" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              <span className="text-[11px] font-bold">Directions</span>
            </a>
          )}
        </div>

        {business.description && (
          <div className="mt-5">
            <div className="text-[11px] font-extrabold tracking-[1.5px] text-brand-gold uppercase mb-2">
              About
            </div>
            <p className="text-[13px] text-brand-surface leading-relaxed">{business.description}</p>
          </div>
        )}

        {/* Info links */}
        <div className="mt-4 flex flex-col gap-3">
          {business.address && (
            <div className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-none mt-0.5">
                <path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z" stroke="#C8860A" strokeWidth="1.8" />
                <circle cx="12" cy="10" r="2.3" stroke="#C8860A" strokeWidth="1.8" />
              </svg>
              <span className="text-[13px] text-brand-brown font-semibold">
                {business.address}, {business.city}, {business.state}
              </span>
            </div>
          )}
          {todayLabel && (
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-none">
                <circle cx="12" cy="12" r="9" stroke="#C8860A" strokeWidth="1.8" />
                <path d="M12 7v5l3 2" stroke="#C8860A" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="text-[13px] text-brand-brown font-semibold">
                {isOpen ? "Open today" : "Closed"} · {todayLabel}
              </span>
            </div>
          )}
          {business.website && (
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-none">
                <circle cx="12" cy="12" r="9" stroke="#C8860A" strokeWidth="1.8" />
                <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="#C8860A" strokeWidth="1.8" />
              </svg>
              <a href={business.website} className="text-[13px] text-brand-gold font-bold">
                {business.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>

        {/* Map placeholder */}
        <div
          className="mt-4 h-[118px] rounded-2xl overflow-hidden relative border border-brand-border"
          style={{
            background: "#E3E7DD",
            backgroundImage:
              "linear-gradient(#D7DCCF 1px,transparent 1px),linear-gradient(90deg,#D7DCCF 1px,transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z" fill="#C8860A" />
              <circle cx="12" cy="11" r="2.6" fill="#fff" />
            </svg>
          </div>
          {mapsQuery && (
            <a
              href={`https://maps.google.com/?q=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2.5 right-3 text-[11px] font-extrabold text-brand-gold rounded-full px-2.5 py-1"
              style={{ background: "rgba(255,255,255,0.95)" }}
            >
              View Full Map →
            </a>
          )}
        </div>

        {/* Reviews */}
        <div className="mt-5 flex items-center justify-between">
          <h2 className="text-base font-extrabold text-brand-dark">Reviews</h2>
          <button className="text-[11px] font-extrabold text-white bg-brand-gold rounded-full px-3 py-1.5">
            ＋ Write a Review
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border border-brand-card rounded-2xl p-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-[34px] h-[34px] rounded-full bg-brand-gold text-white flex items-center justify-center font-extrabold text-[13px] flex-none">
                  {review.user_name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-extrabold text-brand-dark">{review.user_name}</div>
                  <div className="text-[11px] text-brand-subtle">
                    {new Date(review.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </div>
                </div>
                <span className="text-xs text-brand-gold flex-none">{"★".repeat(review.rating)}</span>
              </div>
              {review.content && (
                <p className="text-[12.5px] text-brand-surface leading-[1.45] mt-2.5">{review.content}</p>
              )}
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center py-6 text-brand-muted text-sm">
              No reviews yet. Be the first!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
