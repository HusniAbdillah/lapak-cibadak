-- 1. Tipe Data Status
CREATE TYPE submission_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- 2. TABEL UMKM (Fokus Direktori & Profil)
CREATE TABLE umkm (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    established_year INT,
    description TEXT,
    
    -- Lokasi Terstruktur
    rw VARCHAR(10),
    rt VARCHAR(10),
    address TEXT NOT NULL,
    gmaps_link TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    
    -- Kontak & Sistem
    operating_hours VARCHAR(255),
    whatsapp_number VARCHAR(25) NOT NULL,
    social_media JSONB,
    sales_system VARCHAR(100),
    
    -- ARSITEKTUR GAMBAR BARU (Semua URL dari Cloudinary)
    logo_url TEXT, -- (Opsional) Logo UMKM
    cover_image_url TEXT NOT NULL, -- (Wajib) Foto Dokumentasi Lokasi/Tim
    gallery_urls TEXT[], -- (Opsional) Array foto tambahan/suasana toko
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL KATALOG PRODUK (Opsional)
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    umkm_id UUID REFERENCES umkm(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2), -- Opsional, bisa NULL untuk jasa
    image_url TEXT, -- Gambar produk spesifik
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL SANDBOX MODERASI
CREATE TABLE submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(20) NOT NULL, 
    target_umkm_id UUID REFERENCES umkm(id) ON DELETE CASCADE,
    status submission_status DEFAULT 'PENDING',
    proposed_data JSONB NOT NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. INDEXING UNTUK KECEPATAN FILTER
CREATE INDEX idx_umkm_category ON umkm(category);
CREATE INDEX idx_umkm_rw ON umkm(rw);
CREATE INDEX idx_umkm_rt ON umkm(rt);
CREATE INDEX idx_umkm_slug ON umkm(slug);