"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search01Icon, Location01Icon, FilterIcon, Store01Icon } from "hugeicons-react";
import type { Umkm } from "./page";



const CATEGORIES = ["Semua", "Kuliner", "Kerajinan", "Perdagangan", "Jasa"];
const LOCATIONS = ["Semua", "RW 01", "RW 02", "RW 03", "RW 04", "RW 05", "RW 06", "RW 07", "RW 08"];

interface Props {
  initialUmkm: Umkm[];
}

export function JelajahContent({ initialUmkm }: Props) {
  const umkmData = initialUmkm;
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedLocation, setSelectedLocation] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUmkm = umkmData.filter((item) => {
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesLocation = selectedLocation === "Semua" || item.rw === selectedLocation;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 md:px-6">
      {/* Page Header */}
      <div className="border-b-2 border-border pb-8 mb-12">
        <div className="flex flex-col gap-2">
          <span className="bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 w-fit border border-border rounded-full shadow-sm">
            Katalog Usaha Desa
          </span>
          <h1 className="font-heading uppercase font-bold tracking-tighter text-5xl md:text-7xl text-foreground">
            Jelajah UMKM Desa
          </h1>
          <p className="font-sans text-lg md:text-xl text-foreground/80 max-w-2xl mt-2">
            Temukan dan dukung usaha lokal unggulan di Desa Cibadak berdasarkan kategori dan wilayah RW.
          </p>
        </div>
      </div>

      {/* 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filter (Col span 3) */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-card border-2 border-border p-6 rounded-2xl space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b-2 border-border pb-4">
              <h2 className="font-heading uppercase font-bold text-xl flex items-center gap-2">
                <FilterIcon className="w-5 h-5" /> Filter
              </h2>
              {(selectedCategory !== "Semua" || selectedLocation !== "Semua" || searchQuery !== "") && (
                <button
                  onClick={() => {
                    setSelectedCategory("Semua");
                    setSelectedLocation("Semua");
                    setSearchQuery("");
                  }}
                  className="text-xs font-bold text-foreground hover:underline uppercase active:scale-95 transition-all"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Kategori Filter */}
            <div className="space-y-3">
              <h3 className="font-heading uppercase font-bold text-sm tracking-wider text-foreground/70">
                Kategori Usaha
              </h3>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-4 py-2.5 font-bold text-sm uppercase rounded-xl border-2 active:scale-95 transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-secondary hover:text-secondary-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Lokasi Filter */}
            <div className="space-y-3 pt-4 border-t-2 border-border">
              <h3 className="font-heading uppercase font-bold text-sm tracking-wider text-foreground/70 flex items-center gap-1">
                <Location01Icon className="w-4 h-4" /> Wilayah RW
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`text-center px-2.5 py-2 font-bold text-xs uppercase rounded-xl border-2 active:scale-95 transition-all ${
                      selectedLocation === loc
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-secondary hover:text-secondary-foreground"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area (Col span 9) */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Cari nama UMKM atau alamat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border-2 border-border px-4 py-3 pl-12 font-sans font-medium text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-foreground/50 shadow-sm"
            />
            <Search01Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/60" />
          </div>

          {/* Total Results Counter */}
          <div className="flex justify-between items-center bg-secondary/30 border-2 border-border px-4 py-2.5 text-sm font-bold uppercase rounded-xl">
            <span>Menampilkan {filteredUmkm.length} UMKM</span>
            {(selectedCategory !== "Semua" || selectedLocation !== "Semua") && (
              <span className="text-xs text-foreground/70">
                Filter: {selectedCategory} • {selectedLocation}
              </span>
            )}
          </div>

          {/* UMKM Cards Grid */}
          {filteredUmkm.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUmkm.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col bg-card border-2 border-border hover:-translate-y-1 hover:shadow-md active:scale-[0.98] transition-all duration-300 rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Image Placeholder */}
                  <div className="relative aspect-[4/3] w-full border-b-2 border-border overflow-hidden bg-muted">
                    <Image
                      src={item.cover_image_url || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border border-border">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold uppercase text-foreground/70 flex items-center gap-1 border border-border px-2.5 py-0.5 bg-background rounded-full">
                        <Location01Icon className="w-3 h-3" /> {item.rw || "RW -"} / {item.rt || "RT -"}
                      </span>
                    </div>

                    <h3 className="font-heading uppercase font-bold tracking-tighter text-2xl line-clamp-2 text-foreground">
                      {item.name}
                    </h3>

                    <p className="font-sans text-xs text-foreground/70 line-clamp-1">
                      {item.address}
                    </p>

                    <div className="mt-auto pt-4">
                      <Link
                        href={`/umkm/${item.slug}`}
                        className="block w-full text-center bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground active:scale-95 font-bold px-4 py-2.5 transition-all border-2 border-border rounded-full uppercase text-sm"
                      >
                        Lihat Profil
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-card border-2 border-border p-12 text-center flex flex-col items-center justify-center gap-4 rounded-2xl shadow-sm">
              <Store01Icon className="w-16 h-16 text-foreground/40" />
              <h3 className="font-heading uppercase font-bold text-2xl text-foreground">
                Tidak Ada UMKM Ditemukan
              </h3>
              <p className="font-sans text-sm text-foreground/70 max-w-md">
                Coba ubah kata kunci pencarian atau sesuaikan filter kategori dan lokasi RW Anda.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("Semua");
                  setSelectedLocation("Semua");
                  setSearchQuery("");
                }}
                className="mt-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground active:scale-95 font-bold px-6 py-2.5 border-2 border-border rounded-full uppercase text-sm transition-all"
              >
                Reset Filter
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
