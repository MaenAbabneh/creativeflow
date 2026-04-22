import { NextResponse } from "next/server";

const SITE_URL = "https://creative-overflow.maenababneh.dev";

export function GET() {
  const payload = {
    resource: `${SITE_URL}/api`,
    authorization_servers: [SITE_URL],
    scopes_supported: [
      "openid",
      "profile",
      "email",
      "questions:read",
      "questions:write",
      "answers:write",
    ],
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
