"use client";

import { useState, useRef } from "react";
import { CloudUploadIcon, Tick02Icon } from "hugeicons-react";
import Image from "next/image";

interface CloudinaryUploaderProps {
  onUploadSuccess: (url: string) => void;
  error?: string;
}

export function CloudinaryUploader({ onUploadSuccess, error }: CloudinaryUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      if (!uploadPreset || !cloudName) {
        throw new Error("Missing Cloudinary environment variables");
      }

      formData.append("upload_preset", uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUploadSuccess(data.secure_url);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Gagal mengunggah gambar. Pastikan file valid dan koneksi internet stabil.");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-full border-2 border-dashed ${
          error ? "border-red-500 bg-red-50" : "border-border hover:bg-secondary/10"
        } rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors text-center overflow-hidden min-h-[200px]`}
      >
        {previewUrl ? (
          <>
            <Image src={previewUrl} alt="Preview" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover opacity-50" />
            <div className="relative z-10 flex flex-col items-center bg-card/90 p-4 rounded-xl border-2 border-border shadow-sm">
              {isUploading ? (
                <>
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2" />
                  <span className="font-bold text-sm uppercase">Mengunggah...</span>
                </>
              ) : (
                <>
                  <Tick02Icon className="w-8 h-8 text-green-600 mb-2" />
                  <span className="font-bold text-sm uppercase text-green-700">Berhasil Diunggah!</span>
                  <span className="text-xs font-sans text-foreground/70 mt-1">Klik untuk mengganti gambar</span>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="bg-primary/10 p-4 rounded-full">
              <CloudUploadIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground uppercase text-sm">
                Unggah Foto Dokumentasi/Produk
              </p>
              <p className="font-sans text-xs text-foreground/60 mt-1">
                Format: JPG, PNG. Maksimal 5MB.
              </p>
            </div>
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg, image/png, image/webp"
        className="hidden"
      />
      {error && <p className="text-red-500 text-xs font-bold uppercase tracking-wider">{error}</p>}
    </div>
  );
}
