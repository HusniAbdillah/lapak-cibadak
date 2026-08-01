"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { SecurityCheckIcon, LockKeyIcon, Mail01Icon } from "hugeicons-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Email atau password yang Anda masukkan salah.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-card border-2 border-border p-8 md:p-10 rounded-2xl shadow-sm space-y-8">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="bg-primary text-primary-foreground p-3.5 rounded-full border-2 border-border shadow-sm">
            <SecurityCheckIcon className="w-8 h-8" />
          </div>
          <h1 className="font-heading uppercase font-bold text-3xl tracking-tighter text-foreground">
            Login Admin
          </h1>
          <p className="font-sans text-xs text-foreground/70 uppercase font-bold tracking-wider">
            Ruang Moderasi Lapak Cibadak
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 border-2 border-red-500 p-4 rounded-xl font-bold text-xs uppercase text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="font-bold text-xs uppercase tracking-wider text-foreground/80 flex items-center gap-1">
              <Mail01Icon className="w-4 h-4" /> Email Admin
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cibadak.desa.id"
              className="w-full bg-background border-2 border-border p-3.5 rounded-xl font-sans text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold text-xs uppercase tracking-wider text-foreground/80 flex items-center gap-1">
              <LockKeyIcon className="w-4 h-4" /> Kata Sandi
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background border-2 border-border p-3.5 rounded-xl font-sans text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-secondary-foreground font-heading uppercase font-bold text-lg py-4 rounded-xl border-2 border-border shadow-[0_4px_0_0_#0e1743] hover:translate-y-1 hover:shadow-none active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
