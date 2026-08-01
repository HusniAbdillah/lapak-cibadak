# 09. Development Roadmap (4-Week Sprint)

## Week 1: Foundation & Design System
*   **Day 1-2:** Repository setup, Next.js initialization, `.env` configuration for Supabase & Cloudinary.
*   **Day 3-4:** Execute DDL schema in Supabase. Configure `tailwind.config.ts` with the Elegant Brutalism palette and typography fonts[cite: 1].
*   **Day 5-7:** Build foundational UI components (0px radius Buttons, strict 1px border Cards, Inputs)[cite: 1].

## Week 2: Core Directory & Profiling
*   **Day 8-10:** Develop the Homepage and main Directory grid (`/direktori`). Implement Category filtering.
*   **Day 11-12:** Build the dynamic profile page (`/umkm/[slug]`), handling conditional rendering for optional product catalogs.
*   **Day 13-14:** Implement React Leaflet and plot dummy coordinates on the Village Map (`/peta`).

## Week 3: UGC & Moderation Pipeline
*   **Day 15-17:** Build the public submission form (`/ajukan`). Integrate Cloudinary client-side upload widget. Wire up the `/api/submissions` endpoint.
*   **Day 18-21:** Build the Admin Dashboard (`/admin`). Implement Supabase Auth. Build the "Diff View" UI for reviewing JSONB payloads against Live data.

## Week 4: Data Cleansing, QA & Launch
*   **Day 22-24:** Data Cleansing (Extracting Lat/Lng from raw Google Maps shortlinks, sanitizing WhatsApp numbers to `628...` format).
*   **Day 25-26:** Run database seed scripts. Test ISR caching and On-Demand Revalidation.
*   **Day 27-28:** Final deployment to Vercel. Conduct Mobile UI responsiveness checks. Handover to KKNT team.