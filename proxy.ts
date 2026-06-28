import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/recommend") {
    const linkedinUrl = "https://www.linkedin.com/in/christian-james-abendan-2218a640a/details/recommendations/";
    
    return NextResponse.redirect(linkedinUrl, 301); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/recommend"],
};