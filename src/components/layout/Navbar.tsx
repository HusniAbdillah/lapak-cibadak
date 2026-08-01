"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu01Icon } from "hugeicons-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Beranda", href: "/" },
    { name: "Direktori", href: "/direktori" },
    { name: "Peta", href: "/peta" },
    { name: "Cerita", href: "/cerita" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border h-20 flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="font-heading uppercase font-bold tracking-tighter text-3xl md:text-4xl text-foreground">
          CIBADAK.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-foreground hover:bg-secondary hover:text-secondary-foreground px-3 py-1 font-bold transition-colors border-2 border-transparent hover:border-border rounded-none"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/ajukan"
            className="hidden md:flex bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground border-2 border-border font-bold px-6 py-2.5 transition-colors rounded-none items-center justify-center uppercase"
          >
            Ajukan UMKM
          </Link>

          {/* Mobile Nav */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden p-2 bg-primary text-primary-foreground border-2 border-border rounded-none hover:bg-secondary hover:text-secondary-foreground transition-colors">
              <Menu01Icon className="w-6 h-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="rounded-none border-l-2 border-border bg-background p-6">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-heading font-bold uppercase tracking-tighter text-foreground border-b-2 border-border pb-2 hover:text-secondary"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/ajukan"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground border-2 border-border font-bold px-5 py-3 transition-colors rounded-none text-center uppercase"
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
