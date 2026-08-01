# 04. User Flow & Journey Mapping

## 4.1. Consumer Discovery Flow
1.  **Entry:** A tourist or local resident lands on the Beranda (`/`).
2.  **Exploration:** They click on "Jelajah Lapak" and are taken to `/jelajah`. They filter the list by clicking the "Kerajinan" (Crafts) chip.
3.  **Profiling:** They select "Konveksi Tas Pak Aceng". The page loads instantly. They read the story about how Pak Aceng started in 2020.
4.  **Conversion:** They see there is no specific product catalog, but the profile offers "Custom Bag Production". They click the Gold CTA button.
5.  **Action:** The device opens WhatsApp with a pre-filled message: *"Halo Pak Aceng (Konveksi Tas Pak Aceng), saya melihat profil usaha Anda di Lapak Cibadak dan ingin berdiskusi lebih lanjut..."*

## 4.2. Citizen Contribution Flow (UGC)
1.  **Initiation:** Bu Uun wants to register her Nasi Uduk stall. She visits `/ajukan` via her smartphone.
2.  **Selection:** She chooses "Daftarkan Usaha Baru".
3.  **Data Entry:** She fills in her business name, owner name, category, and writes a short description. She skips the "Products/Menu" section since it is marked as (Opsional).
4.  **Media Upload:** She takes a photo of her stall. The React component streams this to Cloudinary and returns a secure `res.cloudinary.com/...` URL under the hood.
5.  **Submission:** She submits the form. The data is packed into a JSON object and sent to the `/api/submit` endpoint. She receives a success message.

## 4.3. Admin Moderation Flow
1.  **Authentication:** The KKNT Admin logs into `/admin/login`.
2.  **Review:** They open the Inbox and see Bu Uun's submission marked as `PENDING`.
3.  **Validation:** The Admin reviews the text for typos, verifies the photo is appropriate, and checks the WhatsApp number format.
4.  **Execution:** The Admin clicks "Setujui" (Approve).
5.  **Database Merge:** The Next.js API uses the Admin Service Key to unpack the JSON, insert a new row into the public `umkm` table, and update the submission status to `APPROVED`.