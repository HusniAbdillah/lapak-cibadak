"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu01Icon } from "hugeicons-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Beranda", href: "/" },
    { name: "Jelajah Lapak", href: "/jelajah" },
    { name: "Peta", href: "/peta" },
    { name: "Cerita", href: "/cerita" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border h-20 flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-full">
        {/* Logo with image */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 border-2 border-border rounded-xl overflow-hidden bg-white group-hover:scale-105 transition-transform">
            <Image
              src="/logo.webp"
              alt="Lapak Cibadak Logo"
              fill
              sizes="40px"
              className="object-contain p-1"
            />
          </div>
          <span className="font-heading uppercase font-bold tracking-tighter text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
            LAPAK CIBADAK
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-foreground hover:bg-secondary hover:text-secondary-foreground active:scale-95 px-4 py-1.5 font-bold transition-all border-2 border-transparent hover:border-border rounded-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/ajukan"
            className="hidden md:flex bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground active:scale-95 border-2 border-border font-bold px-6 py-2.5 transition-all rounded-full items-center justify-center uppercase shadow-sm"
          >
            Ajukan UMKM
          </Link>

          {/* Mobile Nav */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden p-2.5 bg-primary text-primary-foreground border-2 border-border rounded-xl hover:bg-secondary hover:text-secondary-foreground active:scale-95 transition-all">
              <Menu01Icon className="w-6 h-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="rounded-l-2xl border-l-2 border-border bg-background p-6">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-heading font-bold uppercase tracking-tighter text-foreground border-b-2 border-border pb-2 hover:text-secondary active:scale-95 transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/ajukan"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground active:scale-95 border-2 border-border font-bold px-5 py-3 transition-all rounded-full text-center uppercase"
                >
                  Ajukan UMKM
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


