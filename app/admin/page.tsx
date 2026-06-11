import Link from "next/link";
import { createAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/utils/supabase/server";
import { AdminActions } from "@/components/AdminActions";
import { AdminSignOut } from "@/components/AdminSignOut";

interface BusinessRow {
  id: string;
  name: string;
  owner_name: string | null;
  category: string;
  description: string | null;
  city: string | null;
  state: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const STATUS_STYLES: Record<string, string> = {
  pending: "text-amber-700 bg-amber-50 border border-amber-200",
  approved: "text-green-700 bg-green-50 border border-green-200",
  rejected: "text-red-600 bg-red-50 border border-red-200",
};

async function getAdminData(): Promise<BusinessRow[]> {
  const client = createAdminClient();
  const { data, error } = await client
    .from("businesses")
    .select("id, name, owner_name, category, description, city, state, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin fetch error:", error.message);
    return [];
  }
  return (data ?? []) as BusinessRow[];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const activeFilter = filter || "all";

  const serverClient = await createClient();
  const { data: { user } } = await serverClient.auth.getUser();

  const allBusinesses = await getAdminData();

  const stats = {
    pending: allBusinesses.filter((b) => b.status === "pending").length,
    approved: allBusinesses.filter((b) => b.status === "approved").length,
    rejected: allBusinesses.filter((b) => b.status === "rejected").length,
    total: allBusinesses.length,
  };

  const displayed =
    activeFilter === "all"
      ? allBusinesses
      : allBusinesses.filter((b) => b.status === activeFilter);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-5 py-4 flex items-center gap-3 border-b border-brand-card"
        style={{ background: "#3B1F0A" }}
      >
        <Link href="/" className="text-brand-light/60 hover:text-brand-light">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <div className="flex-1">
          <h1 className="text-base font-extrabold text-brand-light leading-none">Admin Panel</h1>
          <p className="text-[11px] text-brand-light/50 mt-0.5">{user?.email ?? "Healthy Futures"}</p>
        </div>
        <AdminSignOut />
        <Link
          href="/submit"
          className="text-[11px] font-bold text-brand-dark bg-brand-gold rounded-full px-3 py-1.5 ml-2"
        >
          + Add
        </Link>
      </div>

      <div className="max-w-[520px] mx-auto px-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
            <div className="text-2xl font-extrabold text-amber-700">{stats.pending}</div>
            <div className="text-xs font-semibold text-amber-600 mt-0.5">Pending</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <div className="text-2xl font-extrabold text-green-700">{stats.approved}</div>
            <div className="text-xs font-semibold text-green-600 mt-0.5">Approved</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
            <div className="text-2xl font-extrabold text-blue-700">{stats.total}</div>
            <div className="text-xs font-semibold text-blue-600 mt-0.5">Total</div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mt-5 overflow-x-auto scrollbar-hide pb-1">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <Link
                key={tab.value}
                href={`/admin?filter=${tab.value}`}
                className={`text-xs font-bold rounded-full px-4 py-2 whitespace-nowrap flex-none transition-colors ${
                  isActive
                    ? "text-white bg-brand-brown"
                    : "text-brand-surface bg-white border border-brand-border hover:bg-brand-cream"
                }`}
              >
                {tab.label}
                {tab.value !== "all" && (
                  <span className="ml-1.5 opacity-70">
                    {tab.value === "pending" && stats.pending}
                    {tab.value === "approved" && stats.approved}
                    {tab.value === "rejected" && stats.rejected}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Business list */}
        <div className="mt-4 flex flex-col gap-3 pb-10">
          {displayed.length === 0 ? (
            <div className="text-center py-16 text-brand-muted">
              <div className="text-3xl mb-3">📋</div>
              <p className="text-sm font-semibold">No businesses in this category.</p>
              {!process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("https") && (
                <p className="text-xs mt-2 text-brand-subtle">
                  Connect Supabase to see live data.
                </p>
              )}
            </div>
          ) : (
            displayed.map((business) => (
              <div
                key={business.id}
                className="bg-white border border-brand-card rounded-2xl p-4"
                style={{ boxShadow: "0 2px 8px -4px rgba(59,31,10,0.15)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-extrabold text-brand-dark truncate">
                        {business.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold rounded-full px-2 py-0.5 capitalize ${STATUS_STYLES[business.status]}`}
                      >
                        {business.status}
                      </span>
                    </div>
                    <div className="text-[11.5px] text-brand-muted mt-0.5">
                      {business.category}
                      {business.city && ` · ${business.city}, ${business.state}`}
                      {business.owner_name && ` · Owner: ${business.owner_name}`}
                    </div>
                    {business.description && (
                      <p className="text-[11.5px] text-brand-surface mt-1.5 line-clamp-2 leading-snug">
                        {business.description}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-brand-subtle flex-none">{timeAgo(business.created_at)}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-brand-card">
                  <AdminActions businessId={business.id} currentStatus={business.status} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
