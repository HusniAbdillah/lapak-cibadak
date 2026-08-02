import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";

export default function Home() {
  // Dummy data for featured UMKM
  const featuredUmkm = [
    {
      id: 1,
      name: "Warung Kopi Abah",
      category: "Kuliner",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Kerajinan Bambu Ibu Siti",
      category: "Kerajinan",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Toko Sembako Makmur",
      category: "Perdagangan",
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center px-4 md:px-6 py-20 bg-background border-b-2 border-border text-center">
        <div className="max-w-5xl flex flex-col items-center gap-8">
          <h1 className="font-heading uppercase font-bold tracking-tighter text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none text-foreground">
            Karya Lokal,
            <br />
            Cerita Cibadak.
          </h1>
          <p className="font-sans text-xl md:text-2xl max-w-2xl text-foreground/80 mt-4 leading-relaxed">
            Temukan dan dukung berbagai usaha mikro kecil dan menengah (UMKM) unggulan langsung dari Desa Cibadak.
          </p>
          <Link
            href="/jelajah"
            className="mt-8 flex items-center gap-3 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground active:scale-95 border-2 border-border px-9 py-4 font-bold text-lg md:text-xl rounded-full transition-all group uppercase shadow-md hover:-translate-y-0.5"
          >
            Mulai Jelajah UMKM
            <ArrowRight01Icon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Statistics / Intro Strip */}
      <section className="w-full bg-secondary text-secondary-foreground border-b-2 border-border py-6 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-heading font-bold uppercase tracking-tighter text-2xl md:text-4xl text-center md:text-left whitespace-nowrap overflow-x-auto no-scrollbar">
            <span>100+ UMKM</span>
            <span className="hidden md:block">&bull;</span>
            <span>Desa Cibadak</span>
            <span className="hidden md:block">&bull;</span>
            <span>Dukung Ekonomi Lokal</span>
          </div>
        </div>
      </section>

      {/* Featured UMKM Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end border-b-2 border-border pb-6 mb-12">
            <h2 className="font-heading uppercase font-bold tracking-tighter text-4xl md:text-6xl text-foreground">
              UMKM Pilihan
            </h2>
            <Link href="/jelajah" className="hidden md:flex font-bold hover:text-secondary transition-colors uppercase border-b-2 border-transparent hover:border-secondary pb-1 active:scale-95">
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredUmkm.map((umkm) => (
              <div key={umkm.id} className="group flex flex-col bg-card border-2 border-border hover:-translate-y-1 hover:shadow-md active:scale-[0.98] transition-all duration-300 rounded-2xl overflow-hidden shadow-sm">
                <div className="relative aspect-[3/4] w-full border-b-2 border-border overflow-hidden bg-muted">
                  <Image
                    src={umkm.image}
                    alt={umkm.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-heading uppercase font-bold tracking-tighter text-2xl line-clamp-2">
                      {umkm.name}
                    </h3>
                  </div>
                  <div className="flex">
                    <span className="bg-primary text-primary-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full border border-border">
                      {umkm.category}
                    </span>
                  </div>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/jelajah`}
                      className="block w-full text-center bg-transparent text-foreground border-2 border-border hover:bg-secondary hover:text-secondary-foreground active:scale-95 font-bold px-4 py-3 transition-all rounded-full uppercase"
                    >
                      Lihat Profil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center md:hidden">
            <Link href="/jelajah" className="w-full text-center bg-primary text-primary-foreground border-2 border-border hover:bg-secondary hover:text-secondary-foreground active:scale-95 font-bold px-6 py-4 transition-all rounded-full uppercase">
              Mulai Jelajah UMKM
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

