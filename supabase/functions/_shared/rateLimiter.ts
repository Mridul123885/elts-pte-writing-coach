import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const DAILY_AI_LIMIT = Number(Deno.env.get("DAILY_AI_LIMIT_FREE") ?? "5");

export async function checkDailyLimit(supabase: SupabaseClient, userId: string) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("writing_submissions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "submitted")
    .gte("submitted_at", startOfDay.toISOString());

  if (error) throw error;

  if ((count ?? 0) >= DAILY_AI_LIMIT) {
    return { allowed: false, count: count ?? 0, limit: DAILY_AI_LIMIT };
  }
  return { allowed: true, count: count ?? 0, limit: DAILY_AI_LIMIT };
}
