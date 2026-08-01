import { createClient } from "@/utils/supabase/server";
import { MapWrapper } from "@/components/map/MapWrapper";
import { Location01Icon } from "hugeicons-react";

export const metadata = {
  title: "Peta Desa - Lapak Cibadak",
  description: "Jelajahi lokasi UMKM Desa Cibadak melalui peta interaktif.",
};

export const revalidate = 60; // Revalidate static cache every 60 seconds

export default async function PetaPage() {
  const supabase = await createClient();

  // Fetch active UMKM entries with valid coordinates
  const { data: umkmList, error } = await supabase
    .from("umkm")
    .select("id, name, slug, category, lat, lng, address")
    .eq("is_active", true)
    .not("lat", "is", null)
    .not("lng", "is", null);

  if (error) {
    console.error("Error fetching map data from Supabase:", error);
  }

  const markers = (umkmList || []).filter(
    (item) => typeof item.lat === "number" && typeof item.lng === "number"
  );

  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="flex flex-col gap-3 mb-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 border border-border rounded-full shadow-sm">
              Eksplorasi Wilayah
            </span>
          </div>
          <h1 className="font-heading uppercase font-bold tracking-tighter text-5xl md:text-7xl text-foreground flex items-center gap-4">
            Peta Desa <Location01Icon className="w-10 h-10 md:w-14 md:h-14 text-primary" />
          </h1>
          <p className="font-sans text-lg md:text-xl text-foreground/80 mt-2">
            Temukan lokasi fisik UMKM dan titik usaha unggulan yang tersebar di seluruh penjuru Desa Cibadak.
          </p>
        </div>

        {/* Client Map Wrapper */}
        <MapWrapper markers={markers} />

        {/* Legend / Stats Panel */}
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <div className="bg-card border-2 border-border px-4 py-2.5 rounded-xl text-sm font-bold uppercase shadow-sm">
            Menampilkan <span className="text-primary text-base">{markers.length}</span> Titik Lokasi
          </div>
        </div>
      </div>
    </div>
  );
}
