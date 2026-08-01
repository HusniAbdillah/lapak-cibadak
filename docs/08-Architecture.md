# 08. System Architecture & Rendering Strategy

## 8.1. Rendering Pattern: Incremental Static Regeneration (ISR)
Because the UMKM directory data is highly read-heavy and relatively static (UMKM profiles don't change every minute), the platform will utilize ISR.
*   The `/direktori` and `/umkm/[slug]` pages will be statically generated at build time.
*   We will set a `revalidate` timer (e.g., 3600 seconds), OR we will implement On-Demand Revalidation. When an Admin clicks "Approve" in the dashboard, the Next.js API will call `revalidatePath('/')` and `revalidatePath('/direktori')` to instantly update the static cache globally without rebuilding the whole site.

## 8.2. The Zero-Cost Image Pipeline
Uploading 800+ raw 5MB images directly to Supabase Storage would exhaust the free tier bandwidth in days.
*   **Architecture:** The client-side form directly calls the Cloudinary API using an `unsigned` preset. Cloudinary processes the image, compresses it to WebP, and returns a URL. Only the lightweight text URL is sent to Next.js and saved in Supabase. Next.js serves the image via CDN.

## 8.3. Security Architecture (RLS)
The database operates on a "Zero-Trust Public, Full-Trust Server" model.
*   **Public (Anon Key):** RLS policy allows `SELECT` on `umkm` where `is_active = true`. Policy allows `INSERT` on `submissions`.
*   **Server (Service Role Key):** Hidden in `.env.local`, only accessible inside `app/api/`. Bypasses RLS to perform administrative approvals, ensuring malicious actors cannot reverse-engineer the client to delete live data.