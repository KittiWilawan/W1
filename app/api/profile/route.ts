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
      role: user.user_metadata?.role || "normaluser",
      created_at: user.created_at,
      display_name: "",
      avatar_url: "",
      address: "",
      bio: "",
    });
  }

  return Response.json(profileData);
}
