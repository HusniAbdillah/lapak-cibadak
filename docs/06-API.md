# 06. API & Integration Specifications

The application relies heavily on Next.js Route Handlers (`app/api/`) acting as a secure middle-tier between the client and Supabase.

## 6.1. Endpoint: `POST /api/submissions`
**Purpose:** Accepts public form data and writes it to the sandbox.
*   **Auth Required:** No.
*   **Request Body (JSON):**
    ```json
    {
      "type": "CREATE",
      "target_umkm_id": null,
      "proposed_data": {
        "name": "Nasi Uduk Bu Uun",
        "owner_name": "Bu Uun",
        "category": "Makanan & Minuman",
        "whatsapp_number": "628123456789",
        "cover_image_url": "[https://res.cloudinary.com/](https://res.cloudinary.com/)...",
        "description": "Menjual berbagai makanan...",
        "products": [] // Empty array signifies no catalog
      }
    }
    ```
*   **Response (200 OK):** `{ "success": true, "message": "Pengajuan berhasil dikirim." }`

## 6.2. Endpoint: `POST /api/admin/approve`
**Purpose:** Admin action to merge JSONB sandbox data into Live SQL rows.
*   **Auth Required:** Yes (Valid Supabase Session).
*   **Request Body (JSON):** `{ "submission_id": "uuid-string" }`
*   **Internal Logic:**
    1. Verify Admin JWT.
    2. Initialize Supabase Admin Client (`SUPABASE_SERVICE_ROLE_KEY`) to bypass RLS.
    3. Read `proposed_data` from `submissions` table.
    4. Execute SQL `INSERT/UPDATE` into `umkm`.
    5. Loop through `products` array (if length > 0) and execute `INSERT` into `products`.
    6. Update submission status to `APPROVED`.
*   **Response (200 OK):** `{ "success": true, "message": "Data berhasil dipublikasikan." }`

