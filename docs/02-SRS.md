# Software Requirements Specification (SRS)
**System:** Lapak Cibadak (Digital Catalog & Moderation System)

## 1. Introduction
### 1.1 Purpose
This document specifies the software requirements for Lapak Cibadak, detailing the functional and non-functional requirements necessary to develop the Next.js and Supabase-powered web application.

### 1.2 Scope
The system will feature a public-facing catalog, a login-free submission form for data proposals (creates/updates), and a secure administrative dashboard for data moderation (conflict handling and approvals). 

## 2. Overall Description
### 2.1 User Classes and Characteristics
1.  **Public User (Guest):** Can browse the catalog, search for UMKM, view details, and click WhatsApp links to contact sellers.
2.  **Contributor (Guest):** Can submit a new UMKM profile or propose edits to an existing one by filling out a form and uploading images.
3.  **Administrator (Authenticated):** Logs in securely. Can view all pending submissions, compare proposed edits with active data (Diff View), approve/reject submissions, and perform direct CRUD (Create, Read, Update, Delete) operations on the live database.

### 2.2 Operating Environment
*   **Client-Side:** Modern web browsers (Chrome, Safari, Firefox, Edge) on Mobile and Desktop devices. The UI must be mobile-first.
*   **Server-Side:** Next.js Serverless Functions / Route Handlers hosted on Vercel.

## 3. Functional Requirements

### 3.1 Public Catalog (Front-End)
*   **FR-1.1 Catalog Listing:** The system shall display a grid of UMKM cards featuring a cover image, name, category, and a brief description.
*   **FR-1.2 Category Filtering:** The system shall allow users to filter UMKM by categories (e.g., *Makanan*, *Kriya*, *Perdagangan*).
*   **FR-1.3 Exclusion Rule:** The system MUST NOT display UMKM categorized as "Warung / Kelontong" on the main public catalog feed.
*   **FR-1.4 UMKM Detail Page:** The system shall generate a dynamic route (e.g., `/umkm/[slug]`) displaying full details: Address, Google Maps link, Operating Hours, Product Catalog (with prices), and specific images.
*   **FR-1.5 WhatsApp Integration:** The system shall provide a CTA (Call to Action) button that opens WhatsApp with a pre-filled message, utilizing sanitized phone numbers (converting `08` to `628` automatically).

### 3.2 Submission System (Draft Pipeline)
*   **FR-2.1 Login-Free Form:** The system shall provide a public form (`/pengajuan`) to submit a new UMKM or propose edits to an existing UMKM.
*   **FR-2.2 Direct Image Upload:** When a contributor uploads images, the system shall upload them directly to Cloudinary and store the returned secure URLs in the proposed data payload.
*   **FR-2.3 JSONB Proposal Storage:** Submissions must be saved in the `submissions` table under a `proposed_data` column (JSONB format) with a status of `PENDING`, ensuring live data is never overwritten without consent.

### 3.3 Administrative Dashboard
*   **FR-3.1 Secure Authentication:** The dashboard (`/admin`) shall be protected by Supabase Auth (Email/Password).
*   **FR-3.2 Moderation Inbox:** Admins shall see a list of `PENDING` submissions, categorized by 'CREATE' (New) or 'EDIT' (Update).
*   **FR-3.3 Diff View (Conflict Handling):** For 'EDIT' submissions, the system shall display a side-by-side comparison of the active data vs. the proposed data, allowing the Admin to review changes safely.
*   **FR-3.4 Approval Execution:** Upon clicking "Approve", the Next.js API shall extract the JSONB data, inject it into the live `umkm` and `products` tables, and update the submission status to `APPROVED`.
*   **FR-3.5 Rejection/Cleanup:** If rejected, the system shall mark the submission as `REJECTED` and optionally trigger a Cloudinary API call to delete the temporary images associated with the rejected submission to save storage space.

## 4. Non-Functional Requirements

### 4.1 Performance & Scalability
*   **Image Optimization:** All images must be served via Cloudinary to guarantee auto-compression (e.g., converting MBs of JPEGs to lightweight WebP formats), bypassing Vercel's strict image optimization limits.
*   **Data Fetching:** The Next.js application should utilize Next.js App Router caching mechanisms (ISR - Incremental Static Regeneration) to serve the catalog rapidly without querying the Supabase database on every single page load.

### 4.2 Security
*   **Database Security:** Supabase Row Level Security (RLS) must be configured to deny any public `INSERT`, `UPDATE`, or `DELETE` operations on the `umkm` and `products` tables. Public operations are only allowed for `INSERT` on the `submissions` table.
*   **Admin Bypass:** Next.js server actions handling the "Approval" process shall use the `SUPABASE_SERVICE_ROLE_KEY` internally to bypass RLS and securely write to the live tables.

### 4.3 Data Cleansing (Migration Requirement)
*   **Sanitization:** Before the initial data seed, all WhatsApp numbers must be programmatically sanitized (removing dashes, spaces, and standardizing the country code).
*   **Slug Generation:** The system must enforce unique URL slugs for every UMKM based on their business name.

## 5. Database Schema (Draft)
The system relies on a relational model utilizing PostgreSQL (Supabase) with four primary entities:
1.  `admin_profiles`: Linked to Supabase Auth users for moderation tracking.
2.  `umkm`: The main table for approved, live business data.
3.  `products`: The child table storing individual items for sale (One-to-Many relationship with `umkm`).
4.  `submissions`: The holding area for user proposals. Contains `submission_type`, `target_umkm_id`, `status`, and `proposed_data` (JSONB) to prevent concurrent edit conflicts.