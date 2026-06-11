import Link from "next/link";

const CATEGORIES = [
  {
    label: "Food & Dining",
    href: "/search?category=Food+%26+Dining",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 3v8a3 3 0 0 0 6 0V3M8 3v18M19 3c-1.5 0-3 2-3 5s.5 4 3 4v9" stroke="#C8860A" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Beauty",
    href: "/search?category=Beauty",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 3a3 3 0 1 1 6 0c0 3-3 4-3 7m0 4v.01M5 14c0 4 3 7 7 7s7-3 7-7" stroke="#C8860A" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Health",
    href: "/search?category=Health+%26+Wellness",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z" stroke="#C8860A" strokeWidth="1.8" />
        <path d="M9 9h6M12 6v6" stroke="#C8860A" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Retail",
    href: "/search?category=Retail",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 8h12l1 12H5L6 8Z" stroke="#C8860A" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 8a3 3 0 0 1 6 0" stroke="#C8860A" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: "Auto",
    href: "/search?category=Auto",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 16v-3l2-5h12l2 5v3M6 16v2M18 16v2M3 13h18" stroke="#C8860A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Services",
    href: "/search?category=Services",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3a3 3 0 0 0-4.2 4.2l-6 6 2 2 6-6a3 3 0 0 0 4.2-4.2l-2 2-2-2 2-2Z" stroke="#C8860A" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Home Svcs",
    href: "/search?category=Home+Services",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 11 12 4l8 7M6 10v9h12v-9" stroke="#C8860A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Arts & Culture",
    href: "/search?category=Arts+%26+Culture",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M5 7l7-4 7 4M5 7v8c0 2 3 3 7 3s7-1 7-3V7" stroke="#C8860A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 gap-x-2.5 gap-y-3">
      {CATEGORIES.map((cat) => (
        <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-1.5">
          <div className="w-14 h-14 rounded-[18px] bg-white border border-brand-card flex items-center justify-center">
            {cat.icon}
          </div>
          <span className="text-[10.5px] font-semibold text-brand-surface text-center leading-tight">
            {cat.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
