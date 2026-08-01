import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// PUT: Update an existing UMKM entry
export async function PUT(req: Request) {
  try {
    const payload = await req.json();
    const { id, ...updateData } = payload;

    if (!id) {
      return NextResponse.json({ error: "Missing UMKM id" }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("umkm")
      .update({
        name: updateData.name,
        owner_name: updateData.owner_name,
        category: updateData.category,
        established_year: updateData.established_year ? parseInt(updateData.established_year) : null,
        rw: updateData.rw,
        rt: updateData.rt,
        address: updateData.address,
        gmaps_link: updateData.gmaps_link || null,
        whatsapp_number: updateData.whatsapp_number,
        description: updateData.description,
        cover_image_url: updateData.cover_image_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating UMKM:", error);
      return NextResponse.json({ error: "Failed to update UMKM entry" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("PUT UMKM Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Soft delete an existing UMKM entry (set is_active = false)
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing UMKM id" }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("umkm")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("Error deleting UMKM:", error);
      return NextResponse.json({ error: "Failed to delete UMKM entry" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE UMKM Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
