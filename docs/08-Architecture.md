# 08. System Architecture & Rendering Strategy

## 8.1. Rendering Pattern: Incremental Static Regeneration (ISR) / Server Rendering
Because the UMKM catalog data is read-heavy, the platform utilizes hybrid server fetching and caching.
*   The `/jelajah` and `/umkm/[slug]` pages are generated on the server using Supabase SSR.
*   We can set a `revalidate` timer (e.g., 3600 seconds) or On-Demand Revalidation. When an Admin clicks "Approve" in the dashboard, the Next.js API calls `revalidatePath('/')` and `revalidatePath('/jelajah')` to update the cache globally.

## 8.2. The Zero-Cost Image Pipeline
Uploading raw images directly to Supabase Storage would exhaust free tier bandwidth.
*   **Architecture:** The client-side form calls the Cloudinary API using an `unsigned` preset. Cloudinary processes the image, compresses it to WebP, and returns a URL. Only the lightweight text URL is sent to Next.js and saved in Supabase. Next.js serves the image via CDN.

## 8.3. Security Architecture (RLS)
The database operates on a "Zero-Trust Public, Full-Trust Server" model.
*   **Public (Anon Key):** RLS policy allows `SELECT` on `umkm` where `is_active = true`. Policy allows `INSERT` on `submissions`.
*   **Server (Service Role Key):** Hidden in `.env.local`, only accessible inside `app/api/`. Bypasses RLS to perform administrative approvals, ensuring malicious actors cannot reverse-engineer the client to delete live data.