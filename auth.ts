import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const baseUrl = process.env.BACKEND_URL;
          if (!baseUrl) {
            throw new Error(
              "BACKEND_URL is not defined in environment variables."
            );
          }

          const loginRes = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!loginRes.ok) {
            throw new Error("Error validating credentials at /auth/login");
          }

          // Obtén la data de login
          const loginData = await loginRes.json();
          console.log("loginData", loginData);
          if (!loginData?.accessToken || !loginData?.internalUserId) {
            return null;
          }

          // Segundo fetch: /me
          const meRes = await fetch(`${baseUrl}/auth/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Cookie: `accessToken=${loginData.accessToken}`,
            },
            credentials: "include",
          });

          console.log("meRes", meRes);

          if (!meRes.ok) {
            throw new Error("Error fetching user data from /me");
          }

          const meData = await meRes.json();
          if (!meData?.user) return null;

          // Combina datos de login y /me
          return {
            ...meData.user,
            company: meData.company,
            accessToken: loginData.accessToken,
            internalUserId: loginData.internalUserId,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],

  // <--- Añade esta línea para 'trustHost'
  trustHost: true,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const nowInSec = Math.floor(Date.now() / 1000);
  if (token.exp && token.exp < nowInSec) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("accessToken");
    return res;
  }

  if (token.accessToken) {
    const res = NextResponse.next();
    res.cookies.set("accessToken", token.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      // domain: "dev.remote.api.lumasystems.ai",
    });
    return res;
  }

  return NextResponse.next();
}
