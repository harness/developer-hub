const BULLET_HINT =
  '\n\nFormat your response as a concise bulleted list of steps or checks.';

/** Full prompt sent to Kapa Query API (must match cache keys). */
export function buildKapaPrompt(rawQuery: string, formatBullets: boolean): string {
  return formatBullets ? `${rawQuery}${BULLET_HINT}` : rawQuery;
}

/**
 * Kapa `POST .../chat/` returns markdown under `question_answer` / camelCase variants,
 * not only top-level `answer`. Mirrors kapa-cli's `normalizeResponse`.
 */
function extractAnswerFromKapaChatPayload(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return '';
  const p = payload as Record<string, unknown>;
  const wrap = p.data;
  const fromWrap =
    wrap && typeof wrap === 'object'
      ? ((wrap as Record<string, unknown>).question_answer as Record<string, unknown> | undefined) ??
        ((wrap as Record<string, unknown>).questionAnswer as Record<string, unknown> | undefined)
      : undefined;
  const qa =
    (p.question_answer as Record<string, unknown> | undefined) ??
    (p.questionAnswer as Record<string, unknown> | undefined) ??
    fromWrap;

  const fromQa =
    (qa && typeof qa.answer === 'string' && qa.answer) ||
    (qa && typeof qa.answer_text === 'string' && qa.answer_text) ||
    '';
  if (fromQa.trim()) return fromQa.trim();

  const direct =
    (typeof p.answer === 'string' && p.answer) ||
    (typeof p.message === 'string' && p.message) ||
    (typeof p.content === 'string' && p.content) ||
    '';
  return direct.trim();
}

interface ProxyResponse {
  answer?: string;
  cached?: boolean;
  stale?: boolean;
  error?: string;
}

/**
 * Headless answer from the same Kapa project as the Website Widget (via Netlify
 * `kapa_proxy`). The proxy handles server-side caching with a 30-day TTL, so
 * Kapa is only called at most once per month per unique query across all users.
 *
 * Requires `KAPA_API_KEY` and `KAPA_PROJECT_ID` in the Netlify environment.
 */
export async function fetchKapaAnswer(prompt: string): Promise<string> {
  const res = await fetch('/api/kapa_proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: prompt }),
  });
  if (!res.ok) throw new Error(`Kapa proxy error: ${res.status}`);
  const data = (await res.json()) as ProxyResponse;

  // Proxy now returns { answer, cached, stale } directly.
  // Fall back to legacy extraction for backwards compatibility during rollout.
  if (data.answer?.trim()) return data.answer.trim();

  const legacy = extractAnswerFromKapaChatPayload(data);
  if (legacy) return legacy;

  throw new Error('Empty Kapa answer');
}
