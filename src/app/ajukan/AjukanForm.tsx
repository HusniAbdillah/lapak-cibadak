"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CloudinaryUploader } from "./CloudinaryUploader";
import { Store01Icon, UserIcon, Location01Icon, Book01Icon, Tick02Icon } from "hugeicons-react";

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
  cover_image_url: z.string().min(5, "Foto dokumentasi wajib diunggah"),
});

type FormValues = z.infer<typeof formSchema>;

const CATEGORIES = ["Kuliner", "Kerajinan", "Perdagangan", "Jasa", "Lainnya"];
const RWS = ["RW 01", "RW 02", "RW 03", "RW 04", "RW 05"];
const RTS = ["RT 01", "RT 02", "RT 03", "RT 04", "RT 05"];

export function AjukanForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      rw: "",
      rt: "",
      cover_image_url: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim data.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setServerError(err.message || "Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
        <div className="bg-green-100 p-6 rounded-full border-2 border-green-600 mb-4 shadow-sm">
          <Tick02Icon className="w-16 h-16 text-green-700" />
        </div>
        <h2 className="font-heading uppercase font-bold text-3xl text-foreground">
          Pengajuan Berhasil!
        </h2>
        <p className="font-sans text-foreground/80 max-w-md">
          Terima kasih! Data usaha Anda telah masuk ke sistem kami dan sedang dalam tahap peninjauan. Kami akan menghubungi Anda melalui WhatsApp jika sudah diverifikasi.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 font-bold uppercase text-sm border-2 border-border px-6 py-2.5 rounded-full hover:bg-secondary active:scale-95 transition-all"
        >
          Ajukan Lagi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {serverError && (
        <div className="bg-red-50 text-red-700 border-2 border-red-500 p-4 rounded-xl font-bold text-sm uppercase">
          {serverError}
        </div>
      )}

      {/* SECTION 1: INFO UTAMA */}
      <div className="space-y-6">
        <h2 className="font-heading uppercase font-bold text-xl border-b-2 border-border pb-2 flex items-center gap-2">
          <Store01Icon className="w-5 h-5" /> 1. Informasi Usaha
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold text-sm uppercase text-foreground/80">Nama Usaha *</label>
            <input
              {...register("name")}
              placeholder="Cth: Warung Kopi Abah"
              className={`w-full bg-background border-2 ${errors.name ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary`}
            />
            {errors.name && <p className="text-red-500 text-xs font-bold uppercase">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm uppercase text-foreground/80 flex items-center gap-1">
              <UserIcon className="w-4 h-4" /> Nama Pemilik *
            </label>
            <input
              {...register("owner_name")}
              placeholder="Cth: Bpk. Suryaman"
              className={`w-full bg-background border-2 ${errors.owner_name ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans focus:outline-none focus:border-primary`}
            />
            {errors.owner_name && <p className="text-red-500 text-xs font-bold uppercase">{errors.owner_name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm uppercase text-foreground/80">Kategori *</label>
            <select
              {...register("category")}
              className={`w-full bg-background border-2 ${errors.category ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans focus:outline-none focus:border-primary appearance-none`}
            >
              <option value="">Pilih Kategori...</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs font-bold uppercase">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm uppercase text-foreground/80">Tahun Berdiri (Opsional)</label>
            <input
              type="number"
              {...register("established_year")}
              placeholder="Cth: 2020"
              className="w-full bg-background border-2 border-border p-3 rounded-xl font-sans focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: LOKASI & KONTAK */}
      <div className="space-y-6">
        <h2 className="font-heading uppercase font-bold text-xl border-b-2 border-border pb-2 flex items-center gap-2">
          <Location01Icon className="w-5 h-5" /> 2. Lokasi & Kontak
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold text-sm uppercase text-foreground/80">Wilayah RW *</label>
            <select
              {...register("rw")}
              className={`w-full bg-background border-2 ${errors.rw ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans focus:outline-none focus:border-primary appearance-none`}
            >
              <option value="">Pilih RW...</option>
              {RWS.map(rw => (
                <option key={rw} value={rw}>{rw}</option>
              ))}
            </select>
            {errors.rw && <p className="text-red-500 text-xs font-bold uppercase">{errors.rw.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm uppercase text-foreground/80">Wilayah RT *</label>
            <select
              {...register("rt")}
              className={`w-full bg-background border-2 ${errors.rt ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans focus:outline-none focus:border-primary appearance-none`}
            >
              <option value="">Pilih RT...</option>
              {RTS.map(rt => (
                <option key={rt} value={rt}>{rt}</option>
              ))}
            </select>
            {errors.rt && <p className="text-red-500 text-xs font-bold uppercase">{errors.rt.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-bold text-sm uppercase text-foreground/80">Alamat Lengkap *</label>
          <textarea
            {...register("address")}
            rows={3}
            placeholder="Cth: Jalan Desa Raya No. 12, Patokan sebelah pos ronda."
            className={`w-full bg-background border-2 ${errors.address ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans focus:outline-none focus:border-primary resize-none`}
          />
          {errors.address && <p className="text-red-500 text-xs font-bold uppercase">{errors.address.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold text-sm uppercase text-foreground/80">Nomor WhatsApp *</label>
            <input
              {...register("whatsapp_number")}
              placeholder="Cth: 08123456789"
              className={`w-full bg-background border-2 ${errors.whatsapp_number ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans focus:outline-none focus:border-primary`}
            />
            {errors.whatsapp_number && <p className="text-red-500 text-xs font-bold uppercase">{errors.whatsapp_number.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm uppercase text-foreground/80">Link Google Maps (Opsional)</label>
            <input
              {...register("gmaps_link")}
              placeholder="Cth: https://maps.app.goo.gl/..."
              className="w-full bg-background border-2 border-border p-3 rounded-xl font-sans focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: MEDIA & DESKRIPSI */}
      <div className="space-y-6">
        <h2 className="font-heading uppercase font-bold text-xl border-b-2 border-border pb-2 flex items-center gap-2">
          <Book01Icon className="w-5 h-5" /> 3. Foto & Cerita Usaha
        </h2>
        
        <div className="space-y-2">
          <label className="font-bold text-sm uppercase text-foreground/80">Foto Usaha / Produk Utama *</label>
          <CloudinaryUploader
            onUploadSuccess={(url) => setValue("cover_image_url", url, { shouldValidate: true })}
            error={errors.cover_image_url?.message}
          />
          {/* Hidden input to register the value */}
          <input type="hidden" {...register("cover_image_url")} />
        </div>

        <div className="space-y-2">
          <label className="font-bold text-sm uppercase text-foreground/80">Cerita & Deskripsi Usaha *</label>
          <textarea
            {...register("description")}
            rows={5}
            placeholder="Ceritakan sejarah usaha, produk unggulan, atau apa yang membuat usaha Anda unik."
            className={`w-full bg-background border-2 ${errors.description ? "border-red-500" : "border-border"} p-3 rounded-xl font-sans focus:outline-none focus:border-primary resize-none`}
          />
          {errors.description && <p className="text-red-500 text-xs font-bold uppercase">{errors.description.message}</p>}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-secondary text-secondary-foreground font-heading uppercase font-bold text-2xl py-6 rounded-2xl border-2 border-border shadow-[0_4px_0_0_#0e1743] hover:translate-y-1 hover:shadow-none active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Mengirim Data..." : "Kirim Pengajuan UMKM"}
      </button>
    </form>
  );
}
