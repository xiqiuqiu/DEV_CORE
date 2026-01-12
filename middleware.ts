import { NextRequest, NextResponse } from "next/server";

function buildMainSiteCsp(): string {
  // 主站禁止被 iframe
  return [
    "frame-ancestors 'none'",
    // 避免舊瀏覽器忽略 frame-ancestors 時仍可被利用 base tag
    "base-uri 'none'",
  ].join("; ");
}

function buildUserHtmlCsp(): string {
  // 使用者內容：
  // - 必須 sandbox（不同源）
  // - JS 可跑
  // - 斷網（connect-src none）
  // - 最小視覺（inline style + data/blob 圖片）
  // - 禁止導頁/提交/嵌入其他 frame
  return [
    "sandbox allow-scripts",
    "default-src 'none'",
    // Allow common CDN resources for styling/libraries
    "script-src 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
    "style-src 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
    "img-src data: blob:",
    "connect-src 'none'",
    "font-src data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    "media-src 'none'",
    "object-src 'none'",
    "frame-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "manifest-src 'none'",
    "worker-src 'none'",
    "navigate-to 'none'",
    // 只允許本站 iframe 內嵌（用於 /p/:id 預覽）
    "frame-ancestors 'self'",
  ].join("; ");
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  const isUserHtml = pathname.startsWith("/api/html/");

  // 站點通用（低破壞）
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (isUserHtml) {
    response.headers.set("Content-Security-Policy", buildUserHtmlCsp());
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  } else {
    response.headers.set("Content-Security-Policy", buildMainSiteCsp());
    response.headers.set("X-Frame-Options", "DENY");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
