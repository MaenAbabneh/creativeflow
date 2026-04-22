import { type NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

const SITE_URL = "https://creative-overflow.maenababneh.dev";
const HOME_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</docs/api>; rel="service-doc"',
  '</.well-known/agent-skills/index.json>; rel="describedby"',
  '</.well-known/mcp/server-card.json>; rel="service"',
].join(", ");

const HOME_MARKDOWN = `# Creative Overflow

Creative Overflow is a community Q&A platform for developers.

## Agent Discovery

- API catalog: ${SITE_URL}/.well-known/api-catalog
- API docs: ${SITE_URL}/docs/api
- Agent skills index: ${SITE_URL}/.well-known/agent-skills/index.json
- MCP server card: ${SITE_URL}/.well-known/mcp/server-card.json

## Useful Endpoints

- API base: ${SITE_URL}/api
- API status: ${SITE_URL}/api/health
- OpenAPI description: ${SITE_URL}/openapi.json
`;

function appendHomepageHeaders(response: NextResponse) {
  response.headers.set("Link", HOME_LINK_HEADER);
  response.headers.set("Vary", "Accept");
}

function createMarkdownResponse(markdown: string) {
  const tokenCount = markdown.split(/\s+/).filter(Boolean).length;
  const response = new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": tokenCount.toString(),
    },
  });

  appendHomepageHeaders(response);
  return response;
}

export default auth((request: NextRequest) => {
  const isHomepage = request.nextUrl.pathname === "/";
  const acceptsMarkdown =
    request.method === "GET" &&
    isHomepage &&
    request.headers.get("accept")?.includes("text/markdown");

  if (acceptsMarkdown) {
    return createMarkdownResponse(HOME_MARKDOWN);
  }

  const response = NextResponse.next();

  if (isHomepage) {
    appendHomepageHeaders(response);
  }

  return response;
});
