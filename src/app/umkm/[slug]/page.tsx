import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  WhatsappIcon,
  Location01Icon,
  Clock01Icon,
  UserIcon,
  ArrowLeft01Icon,
  GlobeIcon,
  Store01Icon,
} from "hugeicons-react";

interface Product {
  id: string;
  umkm_id: string;
  name: string;
  price: number | null;
  image_url: string | null;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function sanitizeWhatsApp(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }
  return cleaned;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: umkm } = await supabase
    .from("umkm")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!umkm) {
    return {
      title: "UMKM Tidak Ditemukan - Lapak Cibadak",
    };
  }

  return {
    title: `${umkm.name} - Lapak Cibadak`,
    description: umkm.description || `Profil UMKM ${umkm.name} di Desa Cibadak.`,
  };
}

export default async function UmkmDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch UMKM details
  const { data: umkm, error: umkmError } = await supabase
    .from("umkm")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (umkmError || !umkm) {
    notFound();
  }

  // Fetch related products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("umkm_id", umkm.id);

  const formattedProducts: Product[] = products || [];

  // Format WhatsApp Link
  const sanitizedPhone = sanitizeWhatsApp(umkm.whatsapp_number);
  const waMessage = `Halo ${umkm.owner_name} (${umkm.name}), saya melihat profil usaha Anda di Lapak Cibadak dan ingin bertanya lebih lanjut...`;
  const waUrl = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/jelajah"
            className="inline-flex items-center gap-2 font-bold text-sm uppercase text-foreground hover:text-secondary active:scale-95 transition-all"
          >
            <ArrowLeft01Icon className="w-5 h-5" /> Kembali ke Jelajah Lapak
          </Link>
        </div>

        {/* Cover Image Header */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-border bg-muted shadow-sm mb-8">
          <Image
            src={umkm.cover_image_url || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"}
            alt={umkm.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Business Title & Header Info */}
        <div className="border-b-2 border-border pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-primary text-primary-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full border border-border">
                {umkm.category}
              </span>
              {umkm.rw && (
                <span className="bg-secondary text-secondary-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full border border-border">
                  {umkm.rw} {umkm.rt ? `/ ${umkm.rt}` : ""}
                </span>
              )}
              {umkm.established_year && (
                <span className="bg-card text-foreground px-3 py-1 text-xs font-bold uppercase rounded-full border border-border">
                  Berdiri Sejak {umkm.established_year}
                </span>
              )}
            </div>

            <h1 className="font-heading uppercase font-bold tracking-tighter text-4xl md:text-6xl text-foreground">
              {umkm.name}
            </h1>

            <p className="font-sans text-lg text-foreground/80 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-primary" /> Pemilik: <span className="font-bold text-foreground">{umkm.owner_name}</span>
            </p>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2/3 Width) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Description */}
            <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
              <h2 className="font-heading uppercase font-bold text-2xl border-b-2 border-border pb-3 flex items-center gap-2">
                <Store01Icon className="w-6 h-6 text-primary" /> Cerita & Deskripsi Usaha
              </h2>
              <div className="font-sans text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                {umkm.description || "Belum ada deskripsi rinci untuk UMKM ini."}
              </div>
            </div>

            {/* Operational Info */}
            <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="font-heading uppercase font-bold text-2xl border-b-2 border-border pb-3 flex items-center gap-2">
                <Clock01Icon className="w-6 h-6 text-primary" /> Jam Operasional & Lokasi
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-heading uppercase font-bold text-sm text-foreground/70">Jam Operasional</h3>
                  <p className="font-sans text-base font-bold text-foreground">
                    {umkm.operating_hours || "Setiap Hari (Sesuai Konfirmasi)"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading uppercase font-bold text-sm text-foreground/70 flex items-center gap-1">
                    <Location01Icon className="w-4 h-4" /> Alamat Lengkap
                  </h3>
                  <p className="font-sans text-base text-foreground/90">
                    {umkm.address}
                  </p>
                  {umkm.gmaps_link && (
                    <a
                      href={umkm.gmaps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase text-primary hover:underline mt-1"
                    >
                      Buka Google Maps &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (1/3 Width - Sticky Contact Card) */}
          <div className="lg:col-span-1">
            <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 sticky top-28 space-y-6 shadow-sm">
              <h2 className="font-heading uppercase font-bold text-xl border-b-2 border-border pb-3">
                Hubungi Penjual
              </h2>

              <p className="font-sans text-sm text-foreground/80">
                Terhubung langsung dengan <span className="font-bold">{umkm.owner_name}</span> via WhatsApp untuk pemesanan atau pertanyaan.
              </p>

              {/* WhatsApp CTA Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground active:scale-95 font-bold px-6 py-4 rounded-full w-full flex items-center justify-center gap-3 text-lg uppercase transition-all shadow-md border-2 border-border"
              >
                <WhatsappIcon className="w-6 h-6" /> Chat WhatsApp
              </a>

              {/* Social Media Links if any */}
              {umkm.social_media && typeof umkm.social_media === "object" && Object.keys(umkm.social_media).length > 0 && (
                <div className="pt-4 border-t-2 border-border space-y-3">
                  <h3 className="font-heading uppercase font-bold text-xs text-foreground/70">
                    Media Sosial & Tautan
                  </h3>
                  <div className="flex flex-col gap-2">
                    {Object.entries(umkm.social_media as Record<string, string>).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={String(link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-secondary uppercase transition-colors"
                      >
                        <GlobeIcon className="w-4 h-4" /> {platform}: {String(link)}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optional Products Section */}
        {formattedProducts.length > 0 && (
          <div className="mt-16 border-t-2 border-border pt-12">
            <h2 className="font-heading uppercase font-bold tracking-tighter text-3xl md:text-5xl text-foreground mb-8">
              Katalog Produk / Jasa
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {formattedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-card border-2 border-border rounded-2xl overflow-hidden shadow-sm flex flex-col"
                >
                  <div className="relative aspect-square w-full bg-muted border-b-2 border-border overflow-hidden">
                    <Image
                      src={product.image_url || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <h3 className="font-heading uppercase font-bold text-lg text-foreground line-clamp-1">
                      {product.name}
                    </h3>
                    {product.price !== null && (
                      <p className="font-sans font-bold text-sm text-primary">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
