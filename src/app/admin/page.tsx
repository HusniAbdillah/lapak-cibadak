import { createClient } from "@/utils/supabase/server";
import { AdminDashboardClient } from "./AdminDashboardClient";

export const metadata = {
  title: "Antrean Moderasi - Admin Lapak Cibadak",
};

export const dynamic = "force-dynamic";

export default async function AdminModerationPage() {
  const supabase = await createClient();

  const { data: pendingSubmissions, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("status", "PENDING")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching submissions:", error);
  }

  const submissions = pendingSubmissions || [];

  return <AdminDashboardClient initialSubmissions={submissions} />;
}
