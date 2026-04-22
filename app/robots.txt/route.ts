import { NextResponse } from "next/server";

const SITE_URL = "https://creative-overflow.maenababneh.dev";

export function GET() {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /sign-in",
    "Disallow: /sign-up",
    "",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Host: ${SITE_URL}`,
  ].join("\n");

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
