import type { Metadata } from "next";
import { Figtree, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Cibadak Store | Direktori UMKM Desa Cibadak",
    template: "%s | Cibadak Store",
  },
  description: "Platform direktori resmi UMKM Desa Cibadak. Temukan berbagai produk lokal, kuliner, dan jasa terbaik dari warga Cibadak.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", figtree.variable, spaceGrotesk.variable)}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
