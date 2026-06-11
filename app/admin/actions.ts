"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase-admin";

export type BusinessStatus = "pending" | "approved" | "rejected";

export async function updateBusinessStatus(id: string, status: BusinessStatus) {
  const client = createAdminClient();
  const { error } = await client
    .from("businesses")
    .update({
      status,
      is_verified: status === "approved",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}
