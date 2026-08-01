import Link from "next/link";
import { Store01Icon, ArrowLeft01Icon } from "hugeicons-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-background flex items-center justify-center px-4 py-16">
      <div className="bg-card border-2 border-border rounded-2xl p-8 md:p-14 text-center max-w-lg shadow-sm flex flex-col items-center gap-6">
        <div className="bg-secondary/40 border-2 border-border p-5 rounded-full">
          <Store01Icon className="w-16 h-16 text-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading uppercase font-bold tracking-tighter text-7xl md:text-8xl text-foreground">
            404
          </h1>
          <h2 className="font-heading uppercase font-bold text-xl md:text-2xl text-foreground">
            Lapak Tidak Ditemukan
          </h2>
          <p className="font-sans text-sm md:text-base text-foreground/70 pt-2 leading-relaxed">
            Waduh! Lapak yang kamu cari sepertinya sedang tutup, berpindah alamat, atau belum terdaftar di direktori.
          </p>
        </div>

        <Link
          href="/jelajah"
          className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground active:scale-95 font-bold px-6 py-4 rounded-full border-2 border-border uppercase text-sm md:text-base transition-all flex items-center justify-center gap-2 shadow-md"
        >
          <ArrowLeft01Icon className="w-5 h-5" /> Kembali ke Jelajah Lapak
        </Link>
      </div>
    </div>
  );
}
