export { authMiddleware as middleware } from "@/auth";

export const config = {
  matcher: ["/dashboard/:path*"],
};
