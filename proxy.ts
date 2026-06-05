import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const role = user?.user_metadata?.role || "normaluser";

  // Helper to construct a redirect response that preserves updated cookies (e.g. from session refresh)
  const redirectResponse = (to: string) => {
    const url = request.nextUrl.clone();
    url.pathname = to;
    const redirectRes = NextResponse.redirect(url);
    
    // Copy all cookies from the updated response to the redirect response
    response.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        maxAge: cookie.maxAge,
        expires: cookie.expires,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        sameSite: cookie.sameSite,
      });
    });
    
    return redirectRes;
  };

  // General auth protection
  const isProtectedRoute =
    pathname.startsWith("/Dashboard") ||
    pathname.startsWith("/reportissue") ||
    pathname.startsWith("/admindashboard");

  if (isProtectedRoute && !user) {
    return redirectResponse("/");
  }

  // Role-based protection when logged in
  if (user) {
    // Admins are redirected to /admindashboard if visiting normal user dashboard or root
    if (role === "admin" && (pathname === "/" || pathname.startsWith("/Dashboard"))) {
      return redirectResponse("/admindashboard");
    }

    // Non-admins are redirected to /Dashboard if they try to access /admindashboard
    if (role !== "admin" && pathname.startsWith("/admindashboard")) {
      return redirectResponse("/Dashboard");
    }
  }

  // Redirect auth routes if already logged in
  const isAuthRoute =
    pathname === "/" ||
    pathname.startsWith("/Register") ||
    pathname.startsWith("/forgotpassword");

  if (isAuthRoute && user) {
    return redirectResponse(role === "admin" ? "/admindashboard" : "/Dashboard");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any static assets (png, svg, jpg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
