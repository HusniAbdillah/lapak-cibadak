# 05. Database Schema (Supabase PostgreSQL)

The schema is optimized to handle optional catalog data and safely sandbox user-generated content using JSONB.

## 5.1. DDL Statements

```sql
-- ENUMS
CREATE TYPE submission_type AS ENUM ('CREATE', 'EDIT');
CREATE TYPE submission_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE umkm_category AS ENUM ('Makanan & Minuman', 'Kriya / Kerajinan', 'Perdagangan', 'Jasa', 'Peternakan & Perikanan', 'Warung / Kelontong');

-- 1. UMKM MAIN DIRECTORY (LIVE DATA)
CREATE TABLE umkm (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    category umkm_category NOT NULL,
    established_year INT,
    description TEXT,
    
    -- Location & Geospatial
    address TEXT NOT NULL,
    gmaps_link TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    
    -- Contact & Ops
    operating_hours VARCHAR(255),
    whatsapp_number VARCHAR(25) NOT NULL,
    social_media JSONB, -- { "instagram": "...", "shopee": "..." }
    
    -- Media & Admin
    cover_image_url TEXT, -- Primary Cloudinary URL
    gallery_urls TEXT[], -- Array of Cloudinary URLs
    kknt_notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS (OPTIONAL EXTENSION)
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    umkm_id UUID REFERENCES umkm(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2), -- Nullable, as many services don't have fixed prices
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SUBMISSIONS SANDBOX (DRAFT-PUBLISH PIPELINE)
CREATE TABLE submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type submission_type NOT NULL,
    target_umkm_id UUID REFERENCES umkm(id) ON DELETE CASCADE, -- Null if type is 'CREATE'
    status submission_status DEFAULT 'PENDING',
    proposed_data JSONB NOT NULL, -- Holds the entire form payload safely
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX idx_umkm_category ON umkm(category);
CREATE INDEX idx_umkm_slug ON umkm(slug);
CREATE INDEX idx_submissions_status ON submissions(status);

```
