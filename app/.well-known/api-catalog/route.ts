import { NextResponse } from "next/server";

const SITE_URL = "https://creative-overflow.maenababneh.dev";

export function GET() {
  const payload = {
    linkset: [
      {
        anchor: `${SITE_URL}/api`,
        "service-desc": [
          {
            href: `${SITE_URL}/openapi.json`,
            type: "application/openapi+json",
          },
        ],
        "service-doc": [
          {
            href: `${SITE_URL}/docs/api`,
            type: "text/html",
          },
        ],
        status: [
          {
            href: `${SITE_URL}/api/health`,
            type: "application/json",
          },
        ],
      },
    ],
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
