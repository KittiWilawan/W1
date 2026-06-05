export const DEFAULT_ROLE = "member";

export function normalizeRole(role?: string | null) {
  if (!role || role === "normaluser") return DEFAULT_ROLE;
  return role;
}

export function getRoleLabel(role: string | undefined | null, language: "th" | "en") {
  const normalized = normalizeRole(role);
  if (normalized === "admin") {
    return language === "th" ? "ผู้ดูแลระบบ" : "Admin";
  }
  return language === "th" ? "สมาชิก" : "Member";
}
