import Link from "next/link";

export default function BusinessNotFound() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-8 text-center">
      <div
        className="w-[72px] h-[72px] rounded-[20px] flex items-center justify-center mb-5"
        style={{ background: "linear-gradient(135deg,#3B1F0A,#5C4A36)" }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#C8860A" strokeWidth="2" />
          <path d="m20 20-3.2-3.2" stroke="#C8860A" strokeWidth="2" strokeLinecap="round" />
          <path d="M11 8v4M11 14.5h.01" stroke="#C8860A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <h1 className="font-serif text-[27px] font-semibold text-brand-dark leading-tight">
        Business Not Found
      </h1>
      <p className="mt-2 text-[14px] text-brand-muted leading-relaxed max-w-[260px]">
        This listing may have moved or been removed. Try searching for it by name.
      </p>

      <div className="flex flex-col gap-2.5 mt-7 w-full max-w-[240px]">
        <Link
          href="/search"
          className="w-full text-center py-3.5 rounded-2xl font-bold text-[14px] text-brand-light"
          style={{ background: "linear-gradient(135deg,#3B1F0A,#5C4A36)" }}
        >
          Browse Businesses
        </Link>
        <Link
          href="/"
          className="w-full text-center py-3.5 rounded-2xl font-bold text-[14px] text-brand-brown border border-brand-border bg-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
