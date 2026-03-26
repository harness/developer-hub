import type { Context } from "@netlify/functions";

/** Public Website Widget id in `docusaurus.config.ts` — not the same as Query API `project_id`. */
const HARNESS_WIDGET_WEBSITE_ID = "29510767-cc35-43bf-a0b4-f818f97a3a56";

/**
 * Query API path uses **Project ID** (app.kapa.ai → Projects), not the Website Widget
 * `data-website-id`. Using the widget id in the URL returns 404 {"detail":"Not found."}.
 */
function projectId(): string | undefined {
  const id = process.env.KAPA_PROJECT_ID?.trim();
  if (id) return id;
  return undefined;
}

interface Body {
  query: string;
}

export default async (req: Request, _context: Context) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const apiKey = process.env.KAPA_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "KAPA_API_KEY not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const kapaProjectId = projectId();
  if (!kapaProjectId) {
    console.error(
      "[kapa_proxy] Set KAPA_PROJECT_ID to your Kapa Project ID (app.kapa.ai/projects). Widget website id is not the same.",
    );
    return new Response(
      JSON.stringify({
        error:
          "KAPA_PROJECT_ID not configured — use the Project ID from Kapa, not the Website Widget id",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  if (kapaProjectId === HARNESS_WIDGET_WEBSITE_ID) {
    console.warn(
      "[kapa_proxy] KAPA_PROJECT_ID equals the Website Widget id from docusaurus.config.ts. The Query API expects the Project id from app.kapa.ai → project dropdown → Manage projects — they are usually different UUIDs. Chat will 404 until corrected.",
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!body.query) {
    return new Response(JSON.stringify({ error: "query is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const integrationId = process.env.KAPA_API_INTEGRATION_ID?.trim();

  try {
    const kapaRes = await fetch(
      `https://api.kapa.ai/query/v1/projects/${kapaProjectId}/chat/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({
          query: body.query,
          ...(integrationId ? { integration_id: integrationId } : {}),
        }),
      }
    );

    if (!kapaRes.ok) {
      const errorText = await kapaRes.text();
      console.error("[kapa_proxy] Kapa API error:", kapaRes.status, errorText);
      if (kapaRes.status === 404) {
        console.error(
          "[kapa_proxy] 404: Confirm KAPA_PROJECT_ID is the Project id for this API key (app.kapa.ai → Manage projects). Optional: curl -sS -H \"X-API-KEY: …\" https://api.kapa.ai/org/v1/projects/<id>/",
        );
      }
      return new Response(
        JSON.stringify({ error: `Kapa API error: ${kapaRes.status}` }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Pass through Kapa JSON. Answers usually live under `question_answer.answer`
    // (not top-level `answer`); rewriting here dropped the text and broke the client.
    const data: unknown = await kapaRes.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[kapa_proxy] Unexpected error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
