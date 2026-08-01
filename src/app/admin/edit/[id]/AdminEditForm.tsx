"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { CloudinaryUploader } from "@/app/ajukan/CloudinaryUploader";
import { Store01Icon, UserIcon, Location01Icon, Book01Icon } from "hugeicons-react";

const formSchema = z.object({
  name: z.string().min(3, "Nama usaha minimal 3 karakter"),
  owner_name: z.string().min(3, "Nama pemilik minimal 3 karakter"),
  category: z.string().min(1, "Pilih kategori usaha"),
  established_year: z.string().optional(),
  rw: z.string().min(1, "Pilih RW"),
  rt: z.string().min(1, "Pilih RT"),
  address: z.string().min(10, "Alamat lengkap wajib diisi"),
  gmaps_link: z.string().optional(),
  whatsapp_number: z.string().min(10, "Nomor WhatsApp wajib diisi (min. 10 angka)"),
  description: z.string().min(20, "Ceritakan sedikit tentang usaha Anda (min. 20 karakter)"),
  cover_image_url: z.string().min(5, "Foto dokumentasi wajib ada"),
});

type FormValues = z.infer<typeof formSchema>;

const CATEGORIES = ["Kuliner", "Kerajinan", "Perdagangan", "Jasa", "Lainnya"];
const RWS = ["RW 01", "RW 02", "RW 03", "RW 04", "RW 05"];
const RTS = ["RT 01", "RT 02", "RT 03", "RT 04", "RT 05"];

interface Props {
  initialData: any;
}

export function AdminEditForm({ initialData }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name || "",
      owner_name: initialData.owner_name || "",
      category: initialData.category || "",
      established_year: initialData.established_year ? String(initialData.established_year) : "",
      rw: initialData.rw || "",
      rt: initialData.rt || "",
      address: initialData.address || "",
      gmaps_link: initialData.gmaps_link || "",
      whatsapp_number: initialData.whatsapp_number || "",
      description: initialData.description || "",
      cover_image_url: initialData.cover_image_url || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/admin/umkm", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: initialData.id,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengupdate data UMKM.");
      }

      alert("Data UMKM berhasil diperbarui!");
      router.push("/admin/kelola");
      router.refresh();
    } catch (err: any) {
      setServerError(err.message || "Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {serverError && (
        <div className="bg-red-50 text-red-700 border-2 border-red-500 p-4 rounded-xl font-bold text-sm uppercase">
          {serverError}
        </div>
      )}

      {/* SECTION 1: INFO UTAMA */}
      <div className="space-y-4">
        <h3 className="font-heading uppercase font-bold text-lg border-b-2 border-border pb-2 flex items-center gap-2">
          <Store01Icon className="w-5 h-5 text-primary" /> 1. Informasi Usaha
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-xs uppercase text-foreground/80">Nama Usaha *</label>
            <input
              {...register("name")}
              className={`w-full bg-background border-2 ${errors.name ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans text-sm focus:outline-none focus:border-primary`}
            />
            {errors.name && <p className="text-red-500 text-xs font-bold uppercase">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-xs uppercase text-foreground/80 flex items-center gap-1">
              <UserIcon className="w-3.5 h-3.5" /> Nama Pemilik *
            </label>
            <input
              {...register("owner_name")}
              className={`w-full bg-background border-2 ${errors.owner_name ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans text-sm focus:outline-none focus:border-primary`}
            />
            {errors.owner_name && <p className="text-red-500 text-xs font-bold uppercase">{errors.owner_name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-xs uppercase text-foreground/80">Kategori *</label>
            <select
              {...register("category")}
              className={`w-full bg-background border-2 ${errors.category ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans text-sm focus:outline-none focus:border-primary appearance-none`}
            >
              <option value="">Pilih Kategori...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs font-bold uppercase">{errors.category.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-xs uppercase text-foreground/80">Tahun Berdiri (Opsional)</label>
            <input
              type="number"
              {...register("established_year")}
              className="w-full bg-background border-2 border-border p-3 rounded-xl font-sans text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: LOKASI & KONTAK */}
      <div className="space-y-4">
        <h3 className="font-heading uppercase font-bold text-lg border-b-2 border-border pb-2 flex items-center gap-2">
          <Location01Icon className="w-5 h-5 text-primary" /> 2. Lokasi & Kontak
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-xs uppercase text-foreground/80">Wilayah RW *</label>
            <select
              {...register("rw")}
              className={`w-full bg-background border-2 ${errors.rw ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans text-sm focus:outline-none focus:border-primary appearance-none`}
            >
              <option value="">Pilih RW...</option>
              {RWS.map((rw) => (
                <option key={rw} value={rw}>{rw}</option>
              ))}
            </select>
            {errors.rw && <p className="text-red-500 text-xs font-bold uppercase">{errors.rw.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-xs uppercase text-foreground/80">Wilayah RT *</label>
            <select
              {...register("rt")}
              className={`w-full bg-background border-2 ${errors.rt ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans text-sm focus:outline-none focus:border-primary appearance-none`}
            >
              <option value="">Pilih RT...</option>
              {RTS.map((rt) => (
                <option key={rt} value={rt}>{rt}</option>
              ))}
            </select>
            {errors.rt && <p className="text-red-500 text-xs font-bold uppercase">{errors.rt.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-xs uppercase text-foreground/80">Alamat Lengkap *</label>
          <textarea
            {...register("address")}
            rows={3}
            className={`w-full bg-background border-2 ${errors.address ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans text-sm focus:outline-none focus:border-primary resize-none`}
          />
          {errors.address && <p className="text-red-500 text-xs font-bold uppercase">{errors.address.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-xs uppercase text-foreground/80">Nomor WhatsApp *</label>
            <input
              {...register("whatsapp_number")}
              className={`w-full bg-background border-2 ${errors.whatsapp_number ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans text-sm focus:outline-none focus:border-primary`}
            />
            {errors.whatsapp_number && <p className="text-red-500 text-xs font-bold uppercase">{errors.whatsapp_number.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-xs uppercase text-foreground/80">Link Google Maps (Opsional)</label>
            <input
              {...register("gmaps_link")}
              className="w-full bg-background border-2 border-border p-3 rounded-xl font-sans text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: MEDIA & DESKRIPSI */}
      <div className="space-y-4">
        <h3 className="font-heading uppercase font-bold text-lg border-b-2 border-border pb-2 flex items-center gap-2">
          <Book01Icon className="w-5 h-5 text-primary" /> 3. Foto & Cerita Usaha
        </h3>

        <div className="space-y-2">
          <label className="font-bold text-xs uppercase text-foreground/80">Ganti Foto Sampul / Usaha (Opsional)</label>
          <CloudinaryUploader
            onUploadSuccess={(url) => setValue("cover_image_url", url, { shouldValidate: true })}
            error={errors.cover_image_url?.message}
          />
          <input type="hidden" {...register("cover_image_url")} />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-xs uppercase text-foreground/80">Cerita & Deskripsi Usaha *</label>
          <textarea
            {...register("description")}
            rows={5}
            className={`w-full bg-background border-2 ${errors.description ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans text-sm focus:outline-none focus:border-primary resize-none`}
          />
          {errors.description && <p className="text-red-500 text-xs font-bold uppercase">{errors.description.message}</p>}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-secondary text-secondary-foreground font-heading uppercase font-bold text-xl py-4 rounded-xl border-2 border-border shadow-[0_4px_0_0_#0e1743] hover:translate-y-1 hover:shadow-none active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
