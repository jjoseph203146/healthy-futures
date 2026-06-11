import { supabase } from "@/lib/supabase";
import type { DbBusiness, DbReview } from "@/lib/types";

type RawRow = DbBusiness & { reviews?: { rating: number }[] };

function withRatings(rows: RawRow[]): DbBusiness[] {
  return rows.map(({ reviews, ...b }) => ({
    ...b,
    avg_rating: reviews?.length
      ? parseFloat(
          (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        )
      : null,
    review_count: reviews?.length ?? 0,
  }));
}

const SELECT = "*, reviews(rating)";

export async function fetchTrendingBusinesses(): Promise<DbBusiness[]> {
  try {
    const { data } = await supabase
      .from("businesses")
      .select(SELECT)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(8);
    return withRatings((data ?? []) as RawRow[]);
  } catch {
    return [];
  }
}

export async function fetchFeaturedBusinesses(): Promise<DbBusiness[]> {
  try {
    const { data } = await supabase
      .from("businesses")
      .select(SELECT)
      .eq("status", "approved")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(6);
    return withRatings((data ?? []) as RawRow[]);
  } catch {
    return [];
  }
}

export async function fetchBusinessById(id: string): Promise<DbBusiness | null> {
  try {
    const { data } = await supabase
      .from("businesses")
      .select(SELECT)
      .eq("id", id)
      .eq("status", "approved")
      .single();
    if (!data) return null;
    return withRatings([data as RawRow])[0];
  } catch {
    return null;
  }
}

export async function fetchReviewsForBusiness(businessId: string): Promise<DbReview[]> {
  try {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });
    return (data ?? []) as DbReview[];
  } catch {
    return [];
  }
}

export async function fetchApprovedBusinesses(opts?: {
  q?: string;
  category?: string;
}): Promise<DbBusiness[]> {
  try {
    let query = supabase.from("businesses").select(SELECT).eq("status", "approved");

    if (opts?.q) {
      const term = `%${opts.q}%`;
      query = query.or(
        `name.ilike.${term},category.ilike.${term},description.ilike.${term}`
      );
    } else if (opts?.category) {
      query = query.ilike("category", `%${opts.category}%`);
    }

    const { data } = await query.order("name");
    return withRatings((data ?? []) as RawRow[]);
  } catch {
    return [];
  }
}

export async function countApprovedBusinesses(): Promise<number> {
  try {
    const { count } = await supabase
      .from("businesses")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved");
    return count ?? 0;
  } catch {
    return 0;
  }
}
