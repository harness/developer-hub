import type { Config, Context } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * HDH-876: rephrases raw feedback text into a single, direct question
 * suitable for prefilling the Kapa Ask AI widget (see FeedbackWidget's
 * "Submit and Ask AI" button). A template alone can't do this well -
 * turning "this page is outdated" into "What features are supported in
 * Harness Continuous Integration" requires actual language understanding,
 * not string substitution - so this calls Gemini (same model/SDK already
 * used by scripts/utils/gemini-client.mjs for build-time content
 * generation).
 *
 * Fails soft: a missing API key, a Gemini error, or a timeout all fall back
 * to the original template-style question rather than blocking the Ask AI
 * flow - the reader still gets a prefilled (editable, unsent) query either
 * way, just a plainer one.
 */

const GEMINI_MODEL = "gemini-flash-latest";
const GEMINI_TIMEOUT_MS = 6000;

// Same allowlist approach as feedback_submit.mts - this hits a paid Gemini
// quota, so it shouldn't be callable from an arbitrary origin either.
const ALLOWED_ORIGINS = new Set([
  "https://developer.harness.io",
  "http://localhost:8888", // netlify dev
]);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  try {
    return new URL(origin).hostname.endsWith(".netlify.app");
  } catch {
    return false;
  }
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = isAllowedOrigin(origin) ? origin! : "";
  return {
    ...(allow ? { "Access-Control-Allow-Origin": allow, Vary: "Origin" } : {}),
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(status: number, body: unknown, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

function fallbackQuestion(feedbackText: string, moduleLabel: string, url: string): string {
  return `On the ${moduleLabel} documentation (${url}), a reader said: "${feedbackText}". Can you help answer their question or point me to the right information?`;
}

function buildPrompt(feedbackText: string, moduleLabel: string): string {
  return `A reader left this feedback about the "${moduleLabel}" documentation on the Harness Developer Hub:

"${feedbackText}"

Rewrite this as a single, direct, natural-language question that captures what the reader most likely wants to know - as if they were asking a documentation AI assistant directly, not describing a problem with a page. Do not mention the feedback, the page, or that it is "outdated" or similar meta-commentary - ask about the actual subject matter.

Respond with ONLY the question, no preamble, no quotation marks, no markdown.`;
}

interface Body {
  feedbackText?: string;
  moduleLabel?: string;
  url?: string;
}

export default async (req: Request, _context: Context) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders(origin) });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" }, origin);
  }

  const feedbackText = typeof body.feedbackText === "string" ? body.feedbackText.trim() : "";
  const moduleLabel =
    typeof body.moduleLabel === "string" && body.moduleLabel.trim()
      ? body.moduleLabel.trim()
      : "Harness Developer Hub";
  const url = typeof body.url === "string" ? body.url.trim() : "";

  if (!feedbackText) {
    return jsonResponse(400, { error: "feedbackText is required" }, origin);
  }

  const fallback = fallbackQuestion(feedbackText, moduleLabel, url);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn(
      "[ask_ai_question_draft] GEMINI_API_KEY not configured - using fallback question."
    );
    return jsonResponse(200, { question: fallback, generated: false }, origin);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await Promise.race([
      model.generateContent(buildPrompt(feedbackText, moduleLabel)),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), GEMINI_TIMEOUT_MS)
      ),
    ]);

    const response = await result.response;
    const text = response.text()?.trim();

    if (!text) {
      return jsonResponse(200, { question: fallback, generated: false }, origin);
    }

    return jsonResponse(200, { question: text, generated: true }, origin);
  } catch (error) {
    console.warn("[ask_ai_question_draft] Gemini call failed, using fallback:", error);
    return jsonResponse(200, { question: fallback, generated: false }, origin);
  }
};

// Light per-IP throttle - this calls a paid Gemini quota, so it shouldn't be
// left uncapped even though it's not as sensitive as feedback_submit's
// ticket/Slack side effects. Enforced by Netlify before the function runs.
export const config: Config = {
  rateLimit: {
    action: "rate_limit",
    aggregateBy: "ip",
    windowSize: 300,
    // @ts-expect-error - windowLimit is documented and enforced by the
    // Netlify platform (https://docs.netlify.com/build/functions/api/#ratelimit)
    // but missing from this project's currently-pinned @netlify/functions
    // type defs. Runtime behavior reads the actual exported object, not
    // these local types, so this still works; remove the suppression once
    // @netlify/functions is upgraded and the types catch up.
    windowLimit: 10,
  },
};
