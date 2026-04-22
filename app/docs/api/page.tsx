import type { Metadata } from "next";

const SITE_URL = "https://creative-overflow.maenababneh.dev";

export const metadata: Metadata = {
  title: "API Documentation",
  description:
    "API documentation and discovery endpoints for Creative Overflow.",
  alternates: {
    canonical: "/docs/api",
  },
};

export default function ApiDocsPage() {
  return (
    <main className="mx-auto mt-10 max-w-4xl px-6 pb-12 text-dark100_light900">
      <h1 className="h1-bold">Creative Overflow API Documentation</h1>
      <p className="paragraph-regular mt-4">
        This page describes machine-discoverable endpoints used by clients and
        AI agents.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="h3-bold">Primary Endpoints</h2>
        <ul className="list-disc pl-6 text-sm">
          <li>API base: {SITE_URL}/api</li>
          <li>Health: {SITE_URL}/api/health</li>
          <li>OpenAPI description: {SITE_URL}/openapi.json</li>
          <li>API catalog: {SITE_URL}/.well-known/api-catalog</li>
        </ul>
      </section>
    </main>
  );
}
