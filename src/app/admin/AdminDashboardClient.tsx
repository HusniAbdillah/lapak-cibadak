"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Tick02Icon, Cancel01Icon, UserIcon } from "hugeicons-react";

interface Submission {
  id: string;
  type: string;
  status: string;
  proposed_data: any;
  created_at: string;
}

interface Props {
  initialSubmissions: Submission[];
}

export function AdminDashboardClient({ initialSubmissions }: Props) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    if (!confirm(`Apakah Anda yakin ingin me-${action === "approve" ? "nyetujui" : "nolak"} pengajuan ini?`)) {
      return;
    }

    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submission_id: id }),
      });

      if (!response.ok) {
        throw new Error("Aksi gagal dilakukan.");
      }

      router.refresh();
    } catch (err) {
      alert("Terjadi kesalahan. Silakan coba lagi.");
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  if (initialSubmissions.length === 0) {
    return (
      <div className="bg-card border-2 border-border p-12 text-center rounded-2xl shadow-sm flex flex-col items-center justify-center gap-4">
        <Tick02Icon className="w-16 h-16 text-green-600" />
        <h3 className="font-heading uppercase font-bold text-2xl text-foreground">Semua Selesai!</h3>
        <p className="font-sans text-foreground/70">Tidak ada pengajuan UMKM baru yang menunggu antrean moderasi.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card border-2 border-border px-5 py-3.5 rounded-xl shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-foreground/80">
          Antrean Moderasi • {initialSubmissions.length} Pengajuan Menunggu
        </div>
      </div>

      {initialSubmissions.map((submission) => {
        const data = submission.proposed_data;
        const isProcessing = processingId === submission.id;

        return (
          <div key={submission.id} className="bg-card rounded-2xl border-2 border-border p-6 shadow-sm flex flex-col lg:flex-row gap-6">
            
            {/* Image Preview */}
            <div className="relative w-full lg:w-48 aspect-video lg:aspect-square bg-muted rounded-xl border-2 border-border overflow-hidden shrink-0">
              <Image 
                src={data.cover_image_url || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800"} 
                alt={data.name} 
                fill 
                sizes="(max-width: 768px) 100vw, 200px"
                className="object-cover"
              />
            </div>

            {/* Content Details */}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="inline-block bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-border mb-2">
                    {data.category}
                  </span>
                  <h2 className="font-heading uppercase font-bold tracking-tighter text-3xl text-foreground leading-none">
                    {data.name}
                  </h2>
                  <p className="font-sans text-sm text-foreground/80 font-bold mt-1 flex items-center gap-1">
                    <UserIcon className="w-4 h-4 text-primary" /> Pemilik: {data.owner_name}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-sans font-bold text-foreground/50 bg-background border border-border px-2.5 py-1 rounded-full">
                    {new Date(submission.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-background border-2 border-border rounded-xl p-4">
                <div>
                  <p className="text-xs uppercase font-bold text-foreground/60">Kontak WhatsApp</p>
                  <p className="text-sm font-sans font-bold">{data.whatsapp_number}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-foreground/60">Lokasi</p>
                  <p className="text-sm font-sans font-bold">{data.rw} / {data.rt}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs uppercase font-bold text-foreground/60">Alamat Lengkap</p>
                  <p className="text-sm font-sans">{data.address}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs uppercase font-bold text-foreground/60">Deskripsi</p>
                  <p className="text-sm font-sans text-foreground/80 line-clamp-3">{data.description}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row lg:flex-col justify-end gap-3 shrink-0">
              <button
                onClick={() => handleAction(submission.id, "approve")}
                disabled={isProcessing}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#16a34a] text-white hover:bg-[#15803d] active:scale-95 transition-all font-bold uppercase text-sm px-6 py-4 rounded-xl border-2 border-[#0e1743] shadow-[0_4px_0_0_#0e1743] hover:translate-y-1 hover:shadow-none disabled:opacity-50"
              >
                {isProcessing ? "Memproses..." : <><Tick02Icon className="w-5 h-5" /> Setujui</>}
              </button>

              <button
                onClick={() => handleAction(submission.id, "reject")}
                disabled={isProcessing}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 active:scale-95 transition-all font-bold uppercase text-sm px-6 py-4 rounded-xl border-2 border-red-700 shadow-sm disabled:opacity-50"
              >
                {isProcessing ? "..." : <><Cancel01Icon className="w-5 h-5" /> Tolak</>}
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
}
