import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    {
      keys: [],
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}
