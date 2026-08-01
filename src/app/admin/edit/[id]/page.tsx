import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { AdminEditForm } from "./AdminEditForm";
import Link from "next/link";
import { ArrowLeft01Icon } from "hugeicons-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Edit UMKM (${id.slice(0, 8)}) - Admin Lapak Cibadak`,
  };
}

export default async function AdminEditPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: umkm, error } = await supabase
    .from("umkm")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !umkm) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b-2 border-border pb-4">
        <Link
          href="/admin/kelola"
          className="inline-flex items-center gap-2 font-bold text-xs uppercase text-foreground hover:text-secondary active:scale-95 transition-all"
        >
          <ArrowLeft01Icon className="w-4 h-4" /> Kembali ke Kelola Lapak
        </Link>
        <span className="text-xs font-bold uppercase text-foreground/60 bg-card border border-border px-3 py-1 rounded-full">
          ID: {umkm.id.slice(0, 8)}...
        </span>
      </div>

      <div className="bg-card border-2 border-border p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
        <h2 className="font-heading uppercase font-bold text-2xl text-foreground">
          Edit Data Usaha: {umkm.name}
        </h2>

        <AdminEditForm initialData={umkm} />
      </div>
    </div>
  );
}
