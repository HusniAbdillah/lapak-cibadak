import { createClient } from "@/utils/supabase/server";
import { KelolaClient } from "./KelolaClient";

export const metadata = {
  title: "Kelola Lapak Aktif - Admin Lapak Cibadak",
};

export const dynamic = "force-dynamic";

export default async function KelolaPage() {
  const supabase = await createClient();

  const { data: umkmList, error } = await supabase
    .from("umkm")
    .select("id, name, slug, owner_name, category, rw, rt, address, cover_image_url, is_active, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching active UMKM list:", error);
  }

  const items = umkmList || [];

  return <KelolaClient initialUmkm={items} />;
}
