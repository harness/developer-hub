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

/**
 * Headless answer from the same Kapa project as the Website Widget (via Netlify
 * `kapa_proxy`). Requires `KAPA_API_KEY` and `KAPA_PROJECT_ID` in the hosting environment.
 */
export async function fetchKapaAnswer(prompt: string): Promise<string> {
  const res = await fetch('/api/kapa_proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: prompt }),
  });
  if (!res.ok) throw new Error(`Kapa proxy error: ${res.status}`);
  const data: unknown = await res.json();
  const answer = extractAnswerFromKapaChatPayload(data);
  if (!answer) throw new Error('Empty Kapa answer');
  return answer;
}
