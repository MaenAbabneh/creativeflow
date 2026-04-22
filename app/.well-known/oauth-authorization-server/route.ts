import { NextResponse } from "next/server";

const SITE_URL = "https://creative-overflow.maenababneh.dev";

export function GET() {
  const issuer = SITE_URL;

  const payload = {
    issuer,
    authorization_endpoint: `${issuer}/api/auth/signin`,
    token_endpoint: `${issuer}/api/auth/token`,
    jwks_uri: `${issuer}/.well-known/jwks.json`,
    registration_endpoint: `${issuer}/api/auth/register-client`,
    grant_types_supported: [
      "authorization_code",
      "refresh_token",
      "client_credentials",
    ],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
    ],
    scopes_supported: [
      "openid",
      "profile",
      "email",
      "questions:read",
      "questions:write",
    ],
    response_types_supported: ["code"],
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
