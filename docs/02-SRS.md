# 02. Software Requirements Specification (SRS)

## 2.1. Functional Requirements (FR)

### 2.1.1. Public Directory & Profiling (Front-End)
*   **FR-1.1 Directory Listing:** The homepage and main directory must display UMKM profiles focusing on the owner, business name, and category. The layout will use a fluid content model for mobile and a strict 12-column grid for desktop[cite: 1].
*   **FR-1.2 Rich Profile Detail Page:** The dynamic route (`/umkm/[slug]`) MUST prioritize the business narrative (Description/Story), Owner Name, Established Year, Operational Hours, and an embedded single-pin Google Map.
*   **FR-1.3 Optional Product Catalog:** If an UMKM has specific products to showcase, they will appear at the bottom of the profile page. If no products exist, this section will safely collapse without breaking the UI.
*   **FR-1.4 Interactive Village Map:** A dedicated page (`/peta`) rendering a full-viewport OpenStreetMap via React Leaflet, plotting every approved UMKM using absolute Latitude and Longitude coordinates.
*   **FR-1.5 Automated WhatsApp Routing:** The system shall automatically sanitize raw phone numbers (converting `08` to `628`) and generate a WhatsApp API link with a pre-filled greeting referencing the specific business.

### 2.1.2. User-Generated Content (UGC) Pipeline
*   **FR-2.1 Public Submission Portal:** A publicly accessible form (`/ajukan`) allowing any user to submit a new UMKM profile or propose updates to an existing one without creating an account.
*   **FR-2.2 Direct-to-Cloudinary Uploads:** Image inputs must utilize an "Unsigned" upload preset to push files directly to Cloudinary from the client's browser, returning secure URLs to be attached to the form payload.
*   **FR-2.3 JSONB Payload Sandboxing:** Submitted forms MUST NOT write to the live `umkm` table. They must be stored in a `submissions` table as a serialized JSONB object with a `PENDING` status.

### 2.1.3. Administrative Moderation Dashboard
*   **FR-3.1 Secure Authentication:** The `/admin` namespace must be protected by Supabase Authentication (Email & Password).
*   **FR-3.2 Submission Inbox:** Admins must see a chronological queue of all `PENDING` submissions, categorized by 'NEW PROFILE' or 'PROFILE UPDATE'.
*   **FR-3.3 Granular Diff-View Resolution:** For updates, the UI must present a side-by-side comparison of the Live Data vs. Proposed Data, allowing the Admin to approve changes.

## 2.2. Non-Functional Requirements (NFR)
*   **NFR-1 Typography & Layout Strictness:** Spacing must follow a 4px baseline, transitioning primarily between large jumps (24px to 64px) to maintain a generous white-space requirement[cite: 1]. Elements must sit directly on the Ivory base or within White containers, without drop shadows[cite: 1].
*   **NFR-2 Performance Metrics:** The public-facing directory must achieve a Google Lighthouse score of 90+ in Performance, Accessibility, and SEO, leveraging Next.js Static Site Generation (SSG).
*   **NFR-3 Security & RLS:** Supabase Row Level Security (RLS) must be strictly enforced. The public anon key can only `SELECT` from the `umkm` table and `INSERT` into the `submissions` table. `UPDATE` and `DELETE` operations on live data are completely locked down to the Service Role Key.