// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Ejemplo: Chequear expiración y setear cookie
  const nowInSec = Math.floor(Date.now() / 1000);
  if (token.exp && token.exp < nowInSec) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("accessToken");
    return res;
  }

  // Set cookie con el token
  if (token.accessToken) {
    const res = NextResponse.next();
    res.cookies.set("accessToken", token.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
