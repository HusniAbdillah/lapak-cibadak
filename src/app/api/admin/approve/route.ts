import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { submission_id } = await req.json();

    if (!submission_id) {
      return NextResponse.json({ error: "Missing submission_id" }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Fetch the submission
    const { data: submission, error: fetchError } = await supabase
      .from("submissions")
      .select("*")
      .eq("id", submission_id)
      .eq("status", "PENDING")
      .single();

    if (fetchError || !submission) {
      console.error("Fetch Submission Error:", fetchError);
      return NextResponse.json({ error: "Submission not found or already processed" }, { status: 404 });
    }

    const proposedData = submission.proposed_data;

    // Generate unique slug from name
    const baseSlug = proposedData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const randomString = Math.random().toString(36).substring(2, 6);
    const uniqueSlug = `${baseSlug}-${randomString}`;

    // Prepare UMKM insert payload
    const umkmPayload = {
      name: proposedData.name,
      slug: uniqueSlug,
      owner_name: proposedData.owner_name,
      category: proposedData.category,
      established_year: proposedData.established_year ? parseInt(proposedData.established_year) : null,
      rw: proposedData.rw,
      rt: proposedData.rt,
      address: proposedData.address,
      gmaps_link: proposedData.gmaps_link || null,
      whatsapp_number: proposedData.whatsapp_number,
      description: proposedData.description,
      cover_image_url: proposedData.cover_image_url,
      is_active: true,
    };

    // 2. Insert into live `umkm` table
    const { error: insertError } = await supabase
      .from("umkm")
      .insert(umkmPayload);

    if (insertError) {
      console.error("UMKM Insert Error:", insertError);
      return NextResponse.json({ error: "Failed to insert into live table" }, { status: 500 });
    }

    // 3. Update submission status to APPROVED
    const { error: updateError } = await supabase
      .from("submissions")
      .update({ status: "APPROVED", reviewed_at: new Date().toISOString() })
      .eq("id", submission_id);

    if (updateError) {
      console.error("Update Submission Error:", updateError);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err: any) {
    console.error("Approve Route Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
