import Link from "next/link";
import Image from "next/image";
import { Business } from "@/lib/data";

interface BusinessCardProps {
  business: Business;
  variant?: "horizontal" | "vertical";
  isSaved?: boolean;
}

function BlackOwnedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-brand-light bg-brand-dark rounded-full px-1.5 py-0.5">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="#E0A93B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      BLACK-OWNED
    </span>
  );
}

export default function BusinessCard({
  business,
  variant = "horizontal",
  isSaved = false,
}: BusinessCardProps) {
  if (variant === "vertical") {
    return (
      <Link
        href={`/business/${business.id}`}
        className="w-[188px] flex-none bg-white border border-brand-card rounded-[18px] overflow-hidden block"
        style={{ boxShadow: "0 8px 20px -14px rgba(59,31,10,0.35)" }}
      >
        <div className="relative h-[104px]">
          <Image
            src={business.image_url}
            alt={business.name}
            fill
            className="object-cover"
            sizes="188px"
          />
          {business.is_black_owned && (
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[9px] font-extrabold text-brand-light bg-brand-dark rounded-full px-1.5 py-0.5">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#E0A93B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              BLACK-OWNED
            </span>
          )}
          <span className="absolute bottom-2 right-2 text-[9px] font-extrabold rounded-full px-1.5 py-0.5 text-open bg-open-bg">
            OPEN
          </span>
        </div>
        <div className="p-3">
          <div className="text-sm font-extrabold text-brand-dark leading-tight">{business.name}</div>
          <div className="text-[11.5px] text-brand-muted mt-0.5">{business.category}</div>
          <div className="mt-2 text-xs font-bold text-brand-dark">
            <span className="text-brand-gold">★</span> {business.rating}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/business/${business.id}`}
      className="flex gap-3 bg-white border border-brand-card rounded-[18px] p-3 relative block"
      style={{ boxShadow: "0 4px 12px -8px rgba(59,31,10,0.2)" }}
    >
      <div className="relative w-[78px] h-[78px] rounded-[14px] flex-none overflow-hidden bg-brand-card">
        <Image
          src={business.image_url}
          alt={business.name}
          fill
          className="object-cover"
          sizes="78px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-1.5">
          <div className="min-w-0">
            <div className="text-[14.5px] font-extrabold text-brand-dark truncate">{business.name}</div>
            <div className="text-[11.5px] text-brand-muted mt-0.5">
              {business.category} · {business.city}, {business.state}
            </div>
          </div>
          <span className="text-[9px] font-extrabold rounded-full px-1.5 py-0.5 flex-none text-open bg-open-bg">
            OPEN
          </span>
        </div>
        <p className="text-[11.5px] text-brand-surface mt-1 leading-[1.35] line-clamp-2">
          {business.description}
        </p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className="text-[11.5px] font-extrabold text-brand-dark">
            <span className="text-brand-gold">★</span> {business.rating}{" "}
            <span className="text-brand-muted font-normal">({business.review_count})</span>
          </span>
          {business.is_black_owned && <BlackOwnedBadge />}
        </div>
      </div>
      {isSaved && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#C8860A"
          className="absolute top-3 right-3 flex-none"
        >
          <path d="M6 4h12v16l-6-4-6 4V4Z" />
        </svg>
      )}
    </Link>
  );
}
