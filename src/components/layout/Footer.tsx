import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t-2 border-border">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-heading uppercase font-bold tracking-tighter text-5xl md:text-8xl">
            DESA<br />CIBADAK.
          </h2>
          <p className="font-sans text-lg md:text-xl max-w-md opacity-90">
            Platform direktori dan cerita digital untuk memajukan Usaha Mikro Kecil dan Menengah di Desa Cibadak.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 md:text-right">
          <Link href="/ajukan" className="font-heading uppercase font-bold text-2xl hover:text-secondary transition-colors">
            Ajukan UMKM &rarr;
          </Link>
          <Link href="/direktori" className="font-heading uppercase font-bold text-2xl hover:text-secondary transition-colors">
            Lihat Direktori &rarr;
          </Link>
          <p className="font-sans mt-8 opacity-75">
            &copy; {new Date().getFullYear()} Desa Cibadak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
