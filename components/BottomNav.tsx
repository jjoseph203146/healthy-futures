"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    renderIcon: (active: boolean) => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 11 12 4l8 7M6 10v9h12v-9"
          stroke={active ? "#3B1F0A" : "#B0A18E"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/search",
    label: "Search",
    renderIcon: (active: boolean) => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke={active ? "#3B1F0A" : "#B0A18E"} strokeWidth="2" />
        <path d="m20 20-3.2-3.2" stroke={active ? "#3B1F0A" : "#B0A18E"} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/saved",
    label: "Saved",
    renderIcon: (active: boolean) => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill={active ? "#C8860A" : "none"}>
        <path
          d="M6 4h12v16l-6-4-6 4V4Z"
          stroke={active ? "#3B1F0A" : "#B0A18E"}
          strokeWidth={active ? "1.5" : "2"}
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    renderIcon: (active: boolean) => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.6" stroke={active ? "#3B1F0A" : "#B0A18E"} strokeWidth="2" />
        <path
          d="M5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5"
          stroke={active ? "#3B1F0A" : "#B0A18E"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-card flex items-center justify-around px-3 pt-2 pb-4"
      style={{
        height: "74px",
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-brand-brown" : "text-[#B0A18E]"
            }`}
          >
            {item.renderIcon(isActive)}
            <span className={`text-[10px] ${isActive ? "font-extrabold" : "font-semibold"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
