"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit02Icon, Delete02Icon, Location01Icon, Store01Icon, UserIcon } from "hugeicons-react";

interface UmkmItem {
  id: string;
  name: string;
  slug: string;
  owner_name: string;
  category: string;
  rw: string | null;
  rt: string | null;
  address: string;
  cover_image_url: string;
}

interface Props {
  initialUmkm: UmkmItem[];
}

export function KelolaClient({ initialUmkm }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus "${name}" dari daftar publik?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch("/api/admin/umkm", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus UMKM.");
      }

      router.refresh();
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus data.");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  if (initialUmkm.length === 0) {
    return (
      <div className="bg-card border-2 border-border p-12 text-center rounded-2xl shadow-sm flex flex-col items-center justify-center gap-4">
        <Store01Icon className="w-16 h-16 text-foreground/40" />
        <h3 className="font-heading uppercase font-bold text-2xl text-foreground">
          Belum Ada UMKM Aktif
        </h3>
        <p className="font-sans text-foreground/70">
          Semua daftar UMKM yang disetujui akan muncul di sini.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card border-2 border-border px-5 py-3.5 rounded-xl shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-foreground/80">
          Daftar Lapak Aktif • Total {initialUmkm.length} UMKM Terdaftar
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialUmkm.map((item) => {
          const isDeleting = deletingId === item.id;

          return (
            <div
              key={item.id}
              className="bg-card border-2 border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="flex gap-4 items-start">
                <div className="relative w-24 h-24 bg-muted border-2 border-border rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.cover_image_url || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800"}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-border">
                    {item.category}
                  </span>
                  <h3 className="font-heading uppercase font-bold text-xl text-foreground line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs text-foreground/80 font-bold flex items-center gap-1">
                    <UserIcon className="w-3.5 h-3.5 text-primary" /> {item.owner_name}
                  </p>
                  <p className="font-sans text-xs text-foreground/70 flex items-center gap-1">
                    <Location01Icon className="w-3.5 h-3.5" /> {item.rw || "RW -"} / {item.rt || "RT -"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t-2 border-border">
                <Link
                  href={`/admin/edit/${item.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all font-bold uppercase text-xs py-2.5 rounded-xl border-2 border-border"
                >
                  <Edit02Icon className="w-4 h-4" /> Edit
                </Link>

                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  disabled={isDeleting}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 active:scale-95 transition-all font-bold uppercase text-xs py-2.5 rounded-xl border-2 border-red-700 disabled:opacity-50"
                >
                  {isDeleting ? "..." : <><Delete02Icon className="w-4 h-4" /> Hapus</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
