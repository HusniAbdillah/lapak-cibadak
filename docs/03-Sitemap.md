# 03. Sitemap & Application Structure

## 3.1. Public-Facing Interfaces
The public architecture prioritizes discovery and storytelling.

*   `/` **(Beranda / Home):**
    *   **Components:** Massive Typographic Hero (`Space Grotesk`)[cite: 1]. Featured UMKM cards. Short excerpts of KKNT stories.
*   `/direktori` **(Direktori UMKM):**
    *   **Components:** The main exploratory grid. Includes Category Badges (Chips) using Navy background and Ivory text[cite: 1]. Search bar with 1px solid Navy border, increasing to 2px on focus[cite: 1].
*   `/umkm/[slug]` **(Profil Detail):**
    *   **Components:** The heart of the app. Displays the UMKM's cover photo, full narrative description, owner details, operational hours, embedded map location, and the Gold "Hubungi Penjual" CTA button[cite: 1]. Optional: Product grid if data exists.
*   `/peta` **(Peta Desa / Village Map):**
    *   **Components:** Full-screen interactive map (Leaflet) with clustered markers.
*   `/cerita` **(Cerita KKN):**
    *   **Components:** Blog-style index page for storytelling, highlighting the human element of the village's economy.
*   `/ajukan` **(Portal Kontribusi):**
    *   **Components:** User-friendly submission forms (New Profile vs. Edit Profile) utilizing large, accessible input fields.

## 3.2. Protected Interfaces (Admin Namespace)
*   `/admin/login`: Supabase Auth gateway.
*   `/admin/dashboard`: High-level metrics (Total Live UMKM, Total Pending Submissions).
*   `/admin/inbox`: The moderation queue.
*   `/admin/review/[id]`: The conflict-resolution interface comparing JSONB payloads to live PostgreSQL rows.
*   `/admin/database-manager`: A fallback interface for direct, manual CRUD operations on the live tables by the Admin.