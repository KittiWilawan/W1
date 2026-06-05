export async function signOutUser() {
  const res = await fetch("/api/auth/signout", { method: "POST" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Sign out failed");
  }
}
