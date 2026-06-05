const AUTH_PATHS = ["/Login", "/Register", "/changepassword", "/forgotpassword"];

export function isAuthPage(pathname: string) {
  if (pathname === "/") return true;
  return AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}
