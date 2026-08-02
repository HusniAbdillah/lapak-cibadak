import { AjukanForm } from "./AjukanForm";
import { Store01Icon } from "hugeicons-react";

export const metadata = {
  title: "Ajukan UMKM - Cibadak Store",
  description: "Daftarkan usaha Anda di Cibadak Store untuk mendapatkan lebih banyak pelanggan.",
};

export default function AjukanPage() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <div className="bg-primary text-primary-foreground p-4 rounded-full border-2 border-border shadow-sm mb-2">
            <Store01Icon className="w-10 h-10" />
          </div>
          <h1 className="font-heading uppercase font-bold tracking-tighter text-4xl md:text-5xl text-foreground">
            Daftarkan Usaha Anda
          </h1>
          <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl">
            Mari berkembang bersama. Isi formulir di bawah ini untuk mendaftarkan UMKM Anda ke dalam direktori Cibadak Store.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-card border-2 border-border p-6 md:p-10 shadow-sm rounded-2xl">
          <AjukanForm />
        </div>
      </div>
    </div>
  );
}
