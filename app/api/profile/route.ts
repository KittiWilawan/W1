import { NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase-server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return Response.json({
      id: user.id,
      email: user.email,
      phone: user.user_metadata?.phone || "",
      role: user.user_metadata?.role === "normaluser" ? "member" : user.user_metadata?.role || "member",
      created_at: user.created_at,
      display_name: "",
      avatar_url: "",
      address: "",
      bio: "",
    });
  }

  return Response.json(profileData);
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const phoneClean = String(body.phone || "").replace(/[^0-9]/g, "");

    if (phoneClean && (phoneClean.length < 9 || phoneClean.length > 10)) {
      return Response.json(
        { error: "Phone number must be 9-10 digits" },
        { status: 400 }
      );
    }

    const profilePayload = {
      id: user.id,
      email: user.email,
      phone: phoneClean || null,
      display_name: body.display_name || null,
      avatar_url: body.avatar_url || null,
      address: body.address || null,
      bio: body.bio || null,
    };

    const { data, error: updateError } = await supabase
      .from("profiles")
      .upsert(profilePayload, { onConflict: "id" })
      .select()
      .single();

    if (updateError) {
      return Response.json({ error: updateError.message }, { status: 500 });
    }

    await supabase.auth.updateUser({
      data: { phone: phoneClean },
    });

    return Response.json(data);
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}
