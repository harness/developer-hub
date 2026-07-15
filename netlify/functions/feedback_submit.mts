import type { Config, Context } from "@netlify/functions";

/**
 * HDH-876: receives submissions from the custom FeedbackWidget
 * (src/components/FeedbackWidget), replacing the old Refiner-hosted form.
 *
 * This proxies to a dedicated n8n intake workflow ("HDH Feedback Intake",
 * still to be built - see HDH-876) that is expected to post a Slack message
 * into #product-helpcenter-feedback in the same shape the existing
 * "HDH Feedback Ticket Bot" workflow already parses (its "Parce feedback,
 * module & assignee" node expects Slack blocks whose first block's text
 * contains the substring "Developer Hub Survey", plus "Current Url" and
 * "Questions/Comments" labelled lines). Building the message in that shape
 * is the intake workflow's job, not this function's - keeping the existing
 * ticket-creation workflow at zero changes was the whole point of the
 * two-workflow split discussed on HDH-876.
 *
 * N8N_FEEDBACK_WEBHOOK_URL / N8N_FEEDBACK_WEBHOOK_SECRET do not exist yet as
 * of this branch. Until the intake workflow is built and those Netlify
 * environment variables are set, this function correctly fails closed with a
 * clear 500 rather than silently pretending to succeed.
 *
 * Hardened per AI PR review (both points confirmed legitimate on inspection):
 * - CORS was a bare wildcard with no rate limiting, so any origin's
 *   client-side JS could fetch() this endpoint and spam real Jira tickets /
 *   Slack posts - the X-Webhook-Secret only authenticates the
 *   function->n8n leg, never the browser->function leg. Now scoped to an
 *   explicit origin allowlist plus Netlify's own *.netlify.app deploy
 *   previews.
 * - String fields read off the parsed JSON body were only guarded with
 *   `|| ""`, which does not catch non-string truthy values (e.g.
 *   {"feedbackText": 42}) and let `.trim()` throw a TypeError that escaped
 *   as an opaque platform 500 instead of a 400. Every field is now type
 *   checked before `.trim()`.
 * - Rate limiting is enforced by Netlify's platform (see `config` export
 *   below), not application code - it applies before the function runs,
 *   so it holds up across cold starts and concurrent invocations in a way
 *   an in-memory counter would not.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_FEEDBACK_TYPES = new Set(["bug", "missing-info", "suggestion", "praise"]);

// Exact origins this endpoint is meant to serve. Add any additional
// legitimate caller (e.g. a second production domain) here explicitly -
// this list is intentionally not a wildcard.
const ALLOWED_ORIGINS = new Set([
  "https://developer.harness.io",
  "http://localhost:8888", // netlify dev
]);

interface FeedbackBody {
  feedbackType?: string;
  feedbackText?: string;
  wantsReply?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  currentUrl?: string;
  source?: string;
  kapaAssistShown?: boolean;
  kapaAssistExpanded?: boolean;
}

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // Netlify deploy previews use dynamic *.netlify.app subdomains per PR/
  // branch, so they can't be listed individually - allow the whole
  // *.netlify.app namespace rather than every preview URL.
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

export default async (req: Request, _context: Context) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders(origin) });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders(origin) });
  }

  let body: FeedbackBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" }, origin);
  }

  const feedbackText = toTrimmedString(body.feedbackText);
  const email = toTrimmedString(body.email);
  const wantsReply = body.wantsReply === true;

  if (!feedbackText) {
    return jsonResponse(400, { error: "feedbackText is required" }, origin);
  }
  if (
    typeof body.feedbackType !== "string" ||
    !VALID_FEEDBACK_TYPES.has(body.feedbackType)
  ) {
    return jsonResponse(400, { error: "A valid feedbackType is required" }, origin);
  }
  // Email is only required when the reader opted into a reply. Consent is
  // covered by the general disclaimer shown in the widget on every step
  // (not a per-field checkbox - removed at Richard's request once the
  // disclaimer shipped), so there's no separate agreePrivacy flag to check.
  if (wantsReply && !EMAIL_RE.test(email)) {
    return jsonResponse(400, { error: "A valid email is required for a reply" }, origin);
  }

  const webhookUrl = process.env.N8N_FEEDBACK_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_FEEDBACK_WEBHOOK_SECRET;

  if (!webhookUrl) {
    console.error(
      "[feedback_submit] N8N_FEEDBACK_WEBHOOK_URL not configured - set it once the 'HDH Feedback Intake' n8n workflow exists (see HDH-876)."
    );
    return jsonResponse(
      500,
      { error: "Feedback intake is not configured yet (N8N_FEEDBACK_WEBHOOK_URL missing)." },
      origin
    );
  }

  const source = body.source === "university" ? "university" : "docs";

  try {
    const forwardRes = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookSecret ? { "X-Webhook-Secret": webhookSecret } : {}),
      },
      body: JSON.stringify({
        feedbackType: body.feedbackType,
        feedbackText,
        wantsReply,
        firstName: wantsReply ? toTrimmedString(body.firstName) : "",
        lastName: wantsReply ? toTrimmedString(body.lastName) : "",
        email: wantsReply ? email : "",
        currentUrl: typeof body.currentUrl === "string" ? body.currentUrl : "",
        source,
        // Triage signal for whoever picks up the ticket - does not include
        // the Kapa answer itself, only whether the assist fired/was opened.
        kapaAssistShown: body.kapaAssistShown === true,
        kapaAssistExpanded: body.kapaAssistExpanded === true,
      }),
    });

    if (!forwardRes.ok) {
      const text = await forwardRes.text().catch(() => "");
      console.error("[feedback_submit] n8n webhook error:", forwardRes.status, text);
      return jsonResponse(502, { error: "Failed to submit feedback" }, origin);
    }

    return jsonResponse(200, { ok: true }, origin);
  } catch (error) {
    console.error("[feedback_submit] Unexpected error:", error);
    return jsonResponse(500, { error: "Internal server error" }, origin);
  }
};

// Platform-enforced per-IP throttle - a genuine feedback submitter rarely
// sends more than one or two reports per session, so 5 requests per 5
// minutes gives real users headroom while blocking scripted spam. Enforced
// by Netlify before the function runs, so (unlike an in-memory counter) it
// holds up across cold starts and concurrent invocations.
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
    windowLimit: 5,
  },
};
