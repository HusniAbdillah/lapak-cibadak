"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SecurityCheckIcon, Store01Icon, Logout01Icon, CheckListIcon } from "hugeicons-react";
import { createClient } from "@/utils/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    {
      label: "Antrean Moderasi",
      href: "/admin",
      exact: true,
      icon: CheckListIcon,
    },
    {
      label: "Kelola Lapak Aktif",
      href: "/admin/kelola",
      exact: false,
      icon: Store01Icon,
    },
  ];

  return (
    <div className="min-h-screen bg-background py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Admin Header Bar */}
        <div className="bg-card border-2 border-border p-6 rounded-2xl shadow-sm mb-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-border pb-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-3 rounded-xl border-2 border-border shadow-sm">
                <SecurityCheckIcon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="font-heading uppercase font-bold tracking-tighter text-3xl md:text-4xl text-foreground">
                  Ruang Kendali Admin
                </h1>
                <p className="font-sans text-xs uppercase font-bold text-foreground/60 tracking-wider">
                  Panel Manajemen Cibadak Store
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-background hover:bg-secondary text-foreground font-bold text-xs uppercase px-4 py-2.5 rounded-xl border-2 border-border active:scale-95 transition-all shadow-sm w-fit"
            >
              <Logout01Icon className="w-4 h-4" /> Keluar (Logout)
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-5 py-3 font-bold text-xs uppercase rounded-xl border-2 active:scale-95 transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-foreground border-border hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Child Pages Content */}
        {children}
      </div>
    </div>
  );
}
