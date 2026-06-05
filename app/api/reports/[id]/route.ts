import { NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase-server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !report) {
    return Response.json({ error: "Report not found" }, { status: 404 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";
  const isOwner = report.user_id === user.id;

  if (!isAdmin && !isOwner) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return Response.json(report);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return Response.json({ error: "status is required" }, { status: 400 });
    }

    const { data: report, error: updateError } = await supabase
      .from("reports")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single();

    if (updateError) {
      return Response.json({ error: updateError.message }, { status: 500 });
    }

    if (report?.user_id) {
      await supabase.from("notifications").insert({
        user_id: report.user_id,
        title: "อัปเดตสถานะแจ้งเหตุ",
        content: `รายการ "${report.subcategory || report.category_title}" ถูกเปลี่ยนสถานะเป็น "${status}"`,
        report_id: id,
        read: false,
      });
    }

    return Response.json(report);
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}
