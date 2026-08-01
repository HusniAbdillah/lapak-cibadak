# 03. Sitemap & Application Structure

## 3.1. Public-Facing Interfaces
The public architecture prioritizes discovery and storytelling.

*   `/` **(Beranda / Home):**
    *   **Components:** Massive Typographic Hero (`Space Grotesk`). Official Logo (`/logo.webp`) branding. Featured UMKM cards with rounded corners (`rounded-2xl`). Short excerpts of KKNT stories.
*   `/jelajah` **(Jelajah Lapak):**
    *   **Components:** The main exploratory catalog page (formerly /direktori). Includes Category Badges (Chips) using Navy background and Ivory text. Search bar with rounded-full border and focus state.
*   `/umkm/[slug]` **(Profil Detail):**
    *   **Components:** The heart of the app. Displays the UMKM's cover photo, full narrative description, owner details, operational hours, embedded map location, and the Gold "Hubungi Penjual" CTA button. Optional: Product grid if data exists.
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