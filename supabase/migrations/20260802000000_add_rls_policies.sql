-- Aktifkan RLS
ALTER TABLE umkm ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Kebijakan akses Publik (Anon)
-- Memungkinkan siapa saja membaca data UMKM
CREATE POLICY "Public UMKM are viewable by everyone" 
ON umkm FOR SELECT 
USING (true);

-- Memungkinkan siapa saja membaca data Produk
CREATE POLICY "Public Products are viewable by everyone" 
ON products FOR SELECT 
USING (true);
