import { NextResponse } from "next/server";

const SITE_URL = "https://creative-overflow.maenababneh.dev";

export function GET() {
  const payload = {
    serverInfo: {
      name: "creativeflow-webmcp",
      version: "1.0.0",
    },
    transport: {
      type: "webmcp",
      endpoint: SITE_URL,
    },
    capabilities: {
      tools: {
        listChanged: true,
      },
      resources: {
        subscribe: false,
      },
      prompts: {
        listChanged: false,
      },
    },
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
