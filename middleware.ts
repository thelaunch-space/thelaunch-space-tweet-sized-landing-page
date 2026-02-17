import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GEO_COOKIE_NAME, GEO_COOKIE_MAX_AGE } from "@/lib/geo-savings";

export default clerkMiddleware((_auth, request) => {
  const response = NextResponse.next();

  // Set geo cookie if not already present
  const existing = request.cookies.get(GEO_COOKIE_NAME);
  if (!existing) {
    const country = request.headers.get("x-country") ?? "";
    const region = country === "IN" ? "IN" : "INTL";
    response.cookies.set(GEO_COOKIE_NAME, region, {
      httpOnly: false, // client needs to read it
      sameSite: "lax",
      maxAge: GEO_COOKIE_MAX_AGE,
      path: "/",
    });
  }

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
