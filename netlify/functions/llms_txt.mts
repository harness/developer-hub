import { getDeployStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";
import { readFile } from "fs/promises";
import { resolve } from "path";

/**
 * Serves /llms.txt and /llms-full.txt dynamically.
 *
 * In production (Netlify): reads content from Deploy Blobs written at build time
 * by scripts/generate-llms-txt.mjs.
 *
 * In local dev (netlify dev): falls back to reading the static file from
 * static/llms.txt or static/llms-full.txt, which npm start generates as normal.
 */
export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const key = url.pathname.endsWith("llms-full.txt") ? "llms-full.txt" : "llms.txt";

  let content: string | null = null;

  // --- Primary: read from Deploy Blobs (production) ---
  try {
    const store = getDeployStore("llms_txt");
    content = await store.get(key, { type: "text" });
  } catch (err) {
    console.warn(`[llms_txt] Could not read from Blobs: ${err instanceof Error ? err.message : String(err)}`);
  }

  // --- Fallback: read static file (local dev via netlify dev) ---
  if (!content) {
    try {
      const staticPath = resolve(process.cwd(), "static", key);
      content = await readFile(staticPath, "utf-8");
      console.log(`[llms_txt] Serving ${key} from static fallback`);
    } catch (err) {
      console.warn(`[llms_txt] Could not read from static file: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (!content) {
    return new Response(
      `${key} not found. Run npm start or npm run build to generate it.`,
      { status: 404, headers: { "Content-Type": "text/plain" } }
    );
  }

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Fresh for 1 hour; browsers/crawlers may serve stale for up to 24 hours while revalidating
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "X-Served-By": "llms-txt-function",
    },
  });
};
