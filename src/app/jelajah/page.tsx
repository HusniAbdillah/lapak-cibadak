import { createClient } from "@/utils/supabase/server";
import { JelajahContent } from "./JelajahContent";
import { Suspense } from "react";

export interface Umkm {
  id: string;
  name: string;
  slug: string;
  category: string;
  rw: string | null;
  rt: string | null;
  address: string;
  cover_image_url: string;
  owner_name: string;
}

export const revalidate = 60; // Revalidate static cache every 60 seconds

export default async function JelajahPage() {
  const supabase = await createClient();

  // Fetch live active UMKM from Supabase
  const { data: umkmList, error } = await supabase
    .from("umkm")
    .select("id, name, slug, category, rw, rt, address, cover_image_url, owner_name")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching live UMKM data:", error);
  }

  const initialData: Umkm[] = umkmList || [];

  return (
    <div className="min-h-screen bg-background py-12">
      <Suspense fallback={<JelajahSkeleton />}>
        <JelajahContent initialUmkm={initialData} />
      </Suspense>
    </div>
  );
}

function JelajahSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="border-b-2 border-border pb-8 mb-12 animate-pulse">
        <div className="h-6 w-32 bg-muted rounded-full mb-4"></div>
        <div className="h-12 w-64 bg-muted rounded-xl mb-4"></div>
        <div className="h-6 w-96 bg-muted rounded-xl"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 h-64 bg-muted border-2 border-border rounded-2xl animate-pulse"></div>
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-muted border-2 border-border rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
