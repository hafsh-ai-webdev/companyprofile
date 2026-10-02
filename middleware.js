import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // --- Latihan 1: Logger ---
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${request.method} ${pathname}`);

  // --- Latihan 3: Maintenance Mode ---
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const isMaintenancePage = pathname === "/maintenance";

  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // --- Latihan 2: Auth Guard Menggunakan Cookie ---
  if (pathname.startsWith("/favorites")) {
    const token = request.cookies.get("token");

    if (!token) {
      // Belum ada tanda login -> lempar ke halaman awal (/) 
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Config matcher bawaan mentor di Latihan 3
// (Otomatis mengabaikan /api/ sehingga tidak akan bentrok dengan fetch JSON)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};