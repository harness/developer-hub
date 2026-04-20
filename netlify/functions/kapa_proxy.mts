import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

/** Public Website Widget id in `docusaurus.config.ts` — not the same as Query API `project_id`. */
const HARNESS_WIDGET_WEBSITE_ID = "29510767-cc35-43bf-a0b4-f818f97a3a56";

/** How long a cached Kapa response is considered fresh (30 days in ms). */
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

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

interface CacheEntry {
  answer: string;
  cachedAt: number;
}

/**
 * Normalise a query string into a safe blob key.
 * Blob keys must be valid path segments; we strip anything outside [a-z0-9._-].
 */
function blobKey(query: string): string {
  return query
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, 200);
}

async function readCacheEntry(query: string): Promise<CacheEntry | null> {
  try {
    const store = getStore("kapa_response_cache");
    const raw = await store.get(blobKey(query), { type: "text" });
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

async function writeCacheEntry(query: string, answer: string): Promise<void> {
  try {
    const store = getStore("kapa_response_cache");
    const entry: CacheEntry = { answer, cachedAt: Date.now() };
    await store.set(blobKey(query), JSON.stringify(entry));
  } catch (err) {
    console.warn("[kapa_proxy] Failed to write cache entry:", err);
  }
}

function isFresh(entry: CacheEntry): boolean {
  return Date.now() - entry.cachedAt < CACHE_TTL_MS;
}

/**
 * Kapa `POST .../chat/` returns markdown under `question_answer` / camelCase variants.
 * Mirrors the extraction logic in `api.ts` on the client side.
 */
function extractAnswer(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const p = payload as Record<string, unknown>;
  const wrap = p.data;
  const fromWrap =
    wrap && typeof wrap === "object"
      ? ((wrap as Record<string, unknown>).question_answer as Record<string, unknown> | undefined) ??
        ((wrap as Record<string, unknown>).questionAnswer as Record<string, unknown> | undefined)
      : undefined;
  const qa =
    (p.question_answer as Record<string, unknown> | undefined) ??
    (p.questionAnswer as Record<string, unknown> | undefined) ??
    fromWrap;

  const fromQa =
    (qa && typeof qa.answer === "string" && qa.answer) ||
    (qa && typeof qa.answer_text === "string" && qa.answer_text) ||
    "";
  if (fromQa.trim()) return fromQa.trim();

  const direct =
    (typeof p.answer === "string" && p.answer) ||
    (typeof p.message === "string" && p.message) ||
    (typeof p.content === "string" && p.content) ||
    "";
  return direct.trim();
}

async function fetchFromKapa(
  query: string,
  apiKey: string,
  kapaProjectId: string
): Promise<string> {
  const integrationId = process.env.KAPA_API_INTEGRATION_ID?.trim();

  const kapaRes = await fetch(
    `https://api.kapa.ai/query/v1/projects/${kapaProjectId}/chat/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        query,
        ...(integrationId ? { integration_id: integrationId } : {}),
      }),
    }
  );

  if (!kapaRes.ok) {
    const errorText = await kapaRes.text();
    console.error("[kapa_proxy] Kapa API error:", kapaRes.status, errorText);
    if (kapaRes.status === 404) {
      console.error(
        "[kapa_proxy] 404: Confirm KAPA_PROJECT_ID is the Project id for this API key (app.kapa.ai → Manage projects)."
      );
    }
    throw new Error(`Kapa API error: ${kapaRes.status}`);
  }

  const raw: unknown = await kapaRes.json();
  return extractAnswer(raw);
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
      "[kapa_proxy] Set KAPA_PROJECT_ID to your Kapa Project ID (app.kapa.ai/projects). Widget website id is not the same."
    );
    return new Response(
      JSON.stringify({
        error:
          "KAPA_PROJECT_ID not configured — use the Project ID from Kapa, not the Website Widget id",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (kapaProjectId === HARNESS_WIDGET_WEBSITE_ID) {
    console.warn(
      "[kapa_proxy] KAPA_PROJECT_ID equals the Website Widget id from docusaurus.config.ts. The Query API expects the Project id from app.kapa.ai → project dropdown → Manage projects — they are usually different UUIDs. Chat will 404 until corrected."
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

  const { query } = body;

  try {
    const cached = await readCacheEntry(query);

    // --- Fresh cache hit: return immediately, no Kapa call ---
    if (cached && isFresh(cached)) {
      console.log("[kapa_proxy] Cache hit (fresh) for query:", query.slice(0, 80));
      return new Response(
        JSON.stringify({ answer: cached.answer, cached: true, stale: false }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // --- Stale cache: fetch a fresh answer and return it.
    // This request originates from the client's background revalidation call, so
    // the user is already seeing the old answer — they won't feel this latency. ---
    if (cached && !isFresh(cached)) {
      console.log("[kapa_proxy] Cache stale — refreshing for query:", query.slice(0, 80));
      try {
        const freshAnswer = await fetchFromKapa(query, apiKey, kapaProjectId);
        if (freshAnswer) {
          await writeCacheEntry(query, freshAnswer);
          return new Response(
            JSON.stringify({ answer: freshAnswer, cached: false, stale: false }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
      } catch {
        // Kapa unavailable — return the stale answer rather than erroring.
        console.warn("[kapa_proxy] Kapa unavailable during revalidation — serving stale cache.");
      }
      return new Response(
        JSON.stringify({ answer: cached.answer, cached: true, stale: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // --- Cache miss: fetch synchronously (first-ever request for this query) ---
    console.log("[kapa_proxy] Cache miss — fetching from Kapa for query:", query.slice(0, 80));
    const answer = await fetchFromKapa(query, apiKey, kapaProjectId);

    if (!answer) {
      return new Response(
        JSON.stringify({ error: "Empty answer from Kapa" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    await writeCacheEntry(query, answer);

    return new Response(
      JSON.stringify({ answer, cached: false, stale: false }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("[kapa_proxy] Unexpected error:", error);

    // Kapa unreachable and no cache at all — hard error.
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
