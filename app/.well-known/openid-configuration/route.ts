import { NextResponse } from "next/server";

const SITE_URL = "https://creative-overflow.maenababneh.dev";

export function GET() {
  const issuer = SITE_URL;

  const payload = {
    issuer,
    authorization_endpoint: `${issuer}/api/auth/signin`,
    token_endpoint: `${issuer}/api/auth/token`,
    jwks_uri: `${issuer}/.well-known/jwks.json`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
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
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
