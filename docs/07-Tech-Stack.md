# 07. Technology Stack Specifications

## 7.1. Front-End Application
*   **Framework:** Next.js (App Router) version 14+. Chosen for its superior SEO capabilities, React Server Components (RSC), and robust routing.
*   **Language:** TypeScript. Ensures type safety for complex JSONB payloads and database types.
*   **Styling & UI:** Tailwind CSS. The configuration enforces the "Friendly Neo-Brutalism" variables (Ivory `#fff8f0`, Navy `#0e1743`, Gold `#f2bf48`) with tactile rounded corners (`rounded-xl` 12px, `rounded-2xl` 16px, `rounded-full`). Components use `shadcn/ui` with custom rounded styling.
*   **Branding:** Uses official Lapak Cibadak logo (`/logo.webp`).
*   **Typography Providers:** `next/font/google` for Space Grotesk (Headlines) and Figtree (`font-sans`, Body text).
*   **Icons:** Hugeicons React (Providing elegant, consistent stroke widths).

## 7.2. Geospatial & Media
*   **Map Rendering:** `react-leaflet` wrapped around standard Leaflet.js. Tile layers will be sourced from OpenStreetMap (OSM) to ensure zero recurring API costs.
*   **Media Management:** Cloudinary. Next.js will use the `next-cloudinary` library or custom loaders to fetch heavily optimized WebP images, completely bypassing Vercel's strict Image Optimization limits.

## 7.3. Back-End & Infrastructure
*   **Database:** Supabase (PostgreSQL). Chosen for its built-in Auth, Row Level Security, and seamless integration with Next.js via `@supabase/ssr`.
*   **Hosting:** Vercel. Provides automated CI/CD from GitHub, Edge networking, and native support for Next.js Route Handlers.