"use client";

import { useEffect } from "react";

const SITE_URL = "https://creative-overflow.maenababneh.dev";

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<Record<string, unknown>>;
};

type WebMcpContextPayload = {
  tools: WebMcpTool[];
};

type ModelContextApi = {
  provideContext: (payload: WebMcpContextPayload) => Promise<void>;
};

export default function WebMcpProvider() {
  useEffect(() => {
    const modelContext = (
      navigator as Navigator & {
        modelContext?: ModelContextApi;
      }
    ).modelContext;

    if (!modelContext?.provideContext) {
      return;
    }

    const tools: WebMcpTool[] = [
      {
        name: "open_question",
        description: "Open a question details page by ID.",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The question ID used in /questions/[id] routes.",
            },
          },
          required: ["id"],
          additionalProperties: false,
        },
        execute: async (input) => {
          const id = String(input.id ?? "").trim();

          if (!id) {
            throw new Error("A non-empty question id is required.");
          }

          window.location.href = `${SITE_URL}/questions/${encodeURIComponent(id)}`;

          return {
            success: true,
            url: `${SITE_URL}/questions/${encodeURIComponent(id)}`,
          };
        },
      },
      {
        name: "search_questions",
        description:
          "Search questions and open the homepage with the query prefilled.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search text for questions.",
            },
          },
          required: ["query"],
          additionalProperties: false,
        },
        execute: async (input) => {
          const query = String(input.query ?? "").trim();

          if (!query) {
            throw new Error("A non-empty search query is required.");
          }

          const targetUrl = `${SITE_URL}/?query=${encodeURIComponent(query)}`;
          window.location.href = targetUrl;

          return {
            success: true,
            url: targetUrl,
          };
        },
      },
      {
        name: "open_ask_question",
        description: "Open the Ask Question page.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        execute: async () => {
          const targetUrl = `${SITE_URL}/ask-question`;
          window.location.href = targetUrl;

          return {
            success: true,
            url: targetUrl,
          };
        },
      },
    ];

    void modelContext.provideContext({ tools });
  }, []);

  return null;
}
