import type { Context } from "@netlify/functions";

const KAPA_WEBSITE_ID = "db287d54-3525-4674-9d83-a0cbe35024d2";

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

  try {
    const kapaRes = await fetch(
      `https://api.kapa.ai/query/v1/projects/${KAPA_WEBSITE_ID}/chat/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({ query: body.query }),
      }
    );

    if (!kapaRes.ok) {
      const errorText = await kapaRes.text();
      console.error("[kapa_proxy] Kapa API error:", kapaRes.status, errorText);
      return new Response(
        JSON.stringify({ error: `Kapa API error: ${kapaRes.status}` }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await kapaRes.json() as { answer?: string };
    return new Response(JSON.stringify({ answer: data.answer ?? "" }), {
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
