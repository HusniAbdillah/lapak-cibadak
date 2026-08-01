# 10. Deployment Strategy & Operations

## 10.1. Continuous Integration / Continuous Deployment (CI/CD)
The project will be deployed on **Vercel** connected directly to the `main` branch of the GitHub repository. Every push to `main` will trigger a production build. Pushes to other branches will generate preview URLs for testing.

## 10.2. Environment Variables Matrix
The following variables must be configured in the Vercel Dashboard prior to deployment:

```env
# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://[ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ey...]
SUPABASE_SERVICE_ROLE_KEY=[ey...] # CRITICAL: Do not expose with NEXT_PUBLIC

# CLOUDINARY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=[cloud_name]
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=[preset_name] # Must be configured as Unsigned in Cloudinary
CLOUDINARY_API_KEY=[api_key]
CLOUDINARY_API_SECRET=[api_secret]


```

## 10.3. Post-Deployment Checklist

1. **Cloudinary Security Check:** Verify that the `upload_preset` is correctly set to "Unsigned" and allows uploads from the production Vercel domain.
2. **Supabase RLS Check:** Use an API testing tool (like Postman) to attempt a `DELETE` request on the `umkm` table using the public anon key. The request MUST fail (401/403).
3. **Geospatial Verification:** Open the production `/peta` route on a mobile device to ensure the Leaflet map tiles render correctly and touch-panning works smoothly without breaking the viewport.
4. **Cache Invalidation:** Submit a dummy UMKM, approve it in the admin dashboard, and verify that the public directory updates immediately without requiring a manual Vercel rebuild.
