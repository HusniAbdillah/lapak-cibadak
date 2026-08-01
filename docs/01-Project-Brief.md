# Project Brief: Lapak Cibadak

## 1. Project Overview
**Project Name:** Lapak Cibadak  
**Tagline:** "Katalog Karya dan Cerita UMKM Desa Cibadak" (Aligned with KKNT theme: *cibadak.bercerita*)  
**Project Type:** Web-Based Digital Catalog & Moderation Platform  
**Target Location:** Desa Cibadak, Kecamatan Ciampea, Kabupaten Bogor  

Lapak Cibadak is a modern, responsive digital catalog built to showcase over 100 Micro, Small, and Medium Enterprises (UMKM) in Desa Cibadak. The platform aims to bridge the gap between traditional local businesses and digital accessibility. It allows the public to browse local products, contact sellers directly via WhatsApp, and contribute to the catalog's data through a seamless, login-free submission system that is safely moderated by administrators.

## 2. Project Objectives
*   **Digitalization:** Provide a digital presence for local UMKM, moving from offline and scattered data to a centralized, accessible platform.
*   **Economic Empowerment:** Increase local sales and external visibility by enabling direct consumer-to-seller communication via pre-filled WhatsApp links.
*   **Community Participation:** Implement a User-Generated Content (UGC) system where business owners or citizens can easily propose new UMKM profiles or edit existing ones without the friction of account creation.
*   **Data Integrity & Moderation:** Ensure the catalog remains accurate and spam-free through a robust Admin Approval Pipeline (Draft-Publish system).

## 3. Target Audience
*   **Consumers (End-Users):** Local villagers, tourists, and broader online audiences looking for local products (food, crafts, services).
*   **UMKM Owners (Contributors):** Local entrepreneurs who want to list or update their business information and product catalogs.
*   **Administrators:** The KKNT team and appointed village officials who will moderate incoming data and manage the platform.

## 4. Technical Stack (100% Free-Tier Optimized)
*   **Frontend Framework:** Next.js (App Router) + React.
*   **Styling & UI:** TailwindCSS, integrated with shadcn/ui for rapid, accessible component development.
*   **Hosting & Deployment:** Vercel (Edge Network, CI/CD via GitHub).
*   **Database & Admin Auth:** Supabase (PostgreSQL). Utilizes Row Level Security (RLS) and Supabase Auth for the Admin dashboard.
*   **Media Storage & Optimization:** Cloudinary (Handling 800+ images with automatic compression and format optimization to preserve Vercel/Supabase bandwidth limits).

## 5. Scope of Work (Out of Scope)
*   *In-app Payment/Transactions:* The platform is strictly a catalog. All transactions happen externally via WhatsApp.
*   *Public User Accounts:* No login/registration is required for public users or UMKM owners to view or submit data.