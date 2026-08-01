import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Basic server-side validation check
    if (!payload.name || !payload.owner_name || !payload.whatsapp_number || !payload.cover_image_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();

    // Insert into 'submissions' table instead of public 'umkm' table for safety
    const { error } = await supabase
      .from("submissions")
      .insert({
        type: "CREATE",
        status: "PENDING",
        proposed_data: payload,
      });

    if (error) {
      console.error("Supabase Insertion Error:", error);
      return NextResponse.json({ error: "Database error occurred" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error("Submission POST Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
