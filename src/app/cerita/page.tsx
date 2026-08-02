import Image from "next/image";
import Link from "next/link";
import { Store01Icon, UserGroupIcon, SparklesIcon, ArrowRight01Icon } from "hugeicons-react";

export const metadata = {
  title: "Tentang Cibadak Store - Cerita & Inisiatif",
  description: "Mengenal lebih dekat platform digitalisasi UMKM Desa Cibadak.",
};

const TEAM_MEMBERS = [
  {
    name: "Husni Abdillah",
    role: "Full-Stack Developer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Tim KKNT IPB",
    role: "Riset & Pendataan UMKM",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Pemerintah Desa Cibadak",
    role: "Mitra Strategis & Pendamping",
    avatar: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=400&auto=format&fit=crop",
  },
];

export default function CeritaPage() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Hero Header */}
        <div className="border-b-2 border-border pb-10 mb-12">
          <span className="bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 w-fit border border-border rounded-full shadow-sm mb-4 inline-block">
            Inisiatif Digital Desa
          </span>
          <h1 className="font-heading uppercase font-bold tracking-tighter text-5xl md:text-7xl text-foreground">
            Tentang Cibadak Store
          </h1>
          <p className="font-sans text-lg md:text-xl text-foreground/80 mt-4 leading-relaxed">
            Menghubungkan potensi usaha warga dengan pasar yang lebih luas melalui cerita dan teknologi.
          </p>
        </div>

        {/* Story Content / Article */}
        <div className="space-y-12 mb-20">
          <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-10 space-y-6 shadow-sm">
            <h2 className="font-heading uppercase font-bold text-3xl text-foreground flex items-center gap-3 border-b-2 border-border pb-4">
              <Store01Icon className="w-8 h-8 text-primary" /> Visi & Mula Cerita
            </h2>
            <div className="font-sans text-base md:text-lg text-foreground/90 leading-relaxed space-y-4">
              <p>
                <strong>Cibadak Store</strong> lahir dari semangat gotong royong untuk mendorong kemandirian ekonomi masyarakat Desa Cibadak, Kecamatan Ciampea, Kabupaten Bogor. Banyak usaha mikro dan kecil warga yang memiliki produk berkualitas luar biasa, namun belum terdokumentasikan dengan rapi di ranah digital.
              </p>
              <p>
                Platform ini tidak hanya sekadar direktori bisnis online, melainkan media penceritaan (digital storytelling) yang menguraikan kisah perjuangan, keunikan produk, serta lokasi fisik dari setiap pedagang dan perajin lokal di wilayah RW 01 hingga RW 08.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center border-2 border-border">
                <SparklesIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading uppercase font-bold text-xl text-foreground">
                Inovasi & Inklusivitas
              </h3>
              <p className="font-sans text-sm md:text-base text-foreground/80 leading-relaxed">
                Dirancang dengan antarmuka <i>Friendly Neo-Brutalism</i> yang mudah dipahami oleh semua tingkatan usia warga, dari kaum muda hingga para senior pedagang pasar.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
              <div className="bg-secondary/30 w-12 h-12 rounded-xl flex items-center justify-center border-2 border-border">
                <UserGroupIcon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-heading uppercase font-bold text-xl text-foreground">
                Kolaborasi KKNT IPB
              </h3>
              <p className="font-sans text-sm md:text-base text-foreground/80 leading-relaxed">
                Dikembangkan melalui riset mendalam dan aksi lapangan mahasiswa Kuliah Kerja Nyata Tematik (KKNT) IPB University bersama aparatur desa dan tokoh warga.
              </p>
            </div>
          </div>
        </div>

        {/* Tim Pengembang Section */}
        <div className="space-y-8">
          <div className="border-b-2 border-border pb-4">
            <h2 className="font-heading uppercase font-bold text-3xl md:text-4xl text-foreground flex items-center gap-3">
              <UserGroupIcon className="w-8 h-8 text-primary" /> Tim Pengembang & Inisiator
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-card border-2 border-border rounded-2xl p-6 text-center space-y-4 shadow-sm hover:-translate-y-1 transition-transform"
              >
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-border bg-muted">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading uppercase font-bold text-xl text-foreground">
                    {member.name}
                  </h3>
                  <p className="font-sans text-xs font-bold uppercase text-foreground/60 mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-secondary/20 border-2 border-border rounded-2xl p-8 text-center space-y-4">
          <h3 className="font-heading uppercase font-bold text-2xl text-foreground">
            Punya Usaha di Desa Cibadak?
          </h3>
          <p className="font-sans text-sm text-foreground/80 max-w-md mx-auto">
            Daftarkan UMKM Anda sekarang secara gratis agar dikenal oleh lebih banyak pembeli dan wisatawan.
          </p>
          <div className="pt-2">
            <Link
              href="/ajukan"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground active:scale-95 font-bold px-6 py-3 border-2 border-border rounded-full uppercase text-sm transition-all"
            >
              Daftarkan Usaha <ArrowRight01Icon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
