"use client";

import Link from "next/link";
import { useTransition } from "react";
import { updateBusinessStatus, type BusinessStatus } from "@/app/admin/actions";

interface Props {
  businessId: string;
  currentStatus: string;
}

export function AdminActions({ businessId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();

  const handle = (status: BusinessStatus) => {
    startTransition(async () => {
      await updateBusinessStatus(businessId, status);
    });
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {currentStatus !== "approved" && (
        <button
          onClick={() => handle("approved")}
          disabled={isPending}
          className="text-[11px] font-bold text-white bg-green-600 hover:bg-green-700 rounded-full px-2.5 py-1 disabled:opacity-40 transition-colors"
        >
          {isPending ? "…" : "Approve"}
        </button>
      )}

      {currentStatus === "approved" && (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Approved
        </span>
      )}

      <Link
        href={`/business/${businessId}`}
        target="_blank"
        className="text-[11px] font-bold text-brand-brown bg-white border border-brand-border rounded-full px-2.5 py-1 hover:bg-brand-cream transition-colors"
      >
        View ↗
      </Link>

      {currentStatus !== "rejected" ? (
        <button
          onClick={() => handle("rejected")}
          disabled={isPending}
          className="text-[11px] font-bold text-white bg-red-500 hover:bg-red-600 rounded-full px-2.5 py-1 disabled:opacity-40 transition-colors"
        >
          Reject
        </button>
      ) : (
        <button
          onClick={() => handle("pending")}
          disabled={isPending}
          className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 rounded-full px-2.5 py-1 disabled:opacity-40 transition-colors"
        >
          Re-review
        </button>
      )}
    </div>
  );
}
