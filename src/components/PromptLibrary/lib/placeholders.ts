/**
 * Placeholder parsing utilities - ported from PriteshKiri/RT-prompt-library (Apache 2.0).
 * https://github.com/PriteshKiri/RT-prompt-library/blob/main/website/lib/placeholders.ts
 *
 * Prompts in this library use bracketed placeholders like `[SERVICE_NAME]`,
 * `[FAULT_TYPE - e.g. pod-delete]`, `[FILL IN: pod networking]`, or
 * `[TOP_UPSTREAM_DEPENDENCY from Step 1]` that a user must replace before
 * pasting into their AI client.
 *
 * The dedup key is the entire bracketed string so that `[SCENARIO_1_NAME]`
 * and `[SCENARIO_2_NAME]` are independent variables.
 */

const PLACEHOLDER_RE = /\[([^\]\n]+)\]/g;

export interface TextToken {
  kind: 'text';
  value: string;
}

export interface PlaceholderToken {
  kind: 'var';
  /** The full bracketed string, e.g. `[FAULT_TYPE - e.g. pod-delete]`. Also the dedup key. */
  raw: string;
  /** Stable lookup key - identical to `raw`. */
  key: string;
  /** Short human-friendly label for the input, e.g. `FAULT_TYPE`. */
  name: string;
  /** Optional helper text - what came after `-`, ` from `, or `:`. */
  hint?: string;
}

export type Token = TextToken | PlaceholderToken;

function splitNameHint(inner: string): { name: string; hint?: string } {
  const trimmed = inner.trim();

  const splitters = [' - ', ' from ', ':'];
  let earliestIdx = -1;
  let earliestLen = 0;
  for (const sep of splitters) {
    const idx = trimmed.indexOf(sep);
    if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
      earliestIdx = idx;
      earliestLen = sep.length;
    }
  }

  if (earliestIdx === -1) {
    return { name: trimmed };
  }

  const name = trimmed.slice(0, earliestIdx).trim();
  const hint = trimmed.slice(earliestIdx + earliestLen).trim() || undefined;
  return { name, hint };
}

function looksLikePlaceholder(inner: string): boolean {
  const name = splitNameHint(inner).name;
  if (!name) return false;
  if (/^[A-Z]$/.test(name)) return true;
  return /^[A-Z][A-Z0-9_ ]*[A-Z0-9]$/.test(name) && !/\s{2,}/.test(name);
}

/**
 * Split a prompt into an ordered list of text + placeholder tokens.
 * Non-placeholder brackets are preserved as text.
 */
export function tokenize(prompt: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;

  PLACEHOLDER_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = PLACEHOLDER_RE.exec(prompt)) !== null) {
    const inner = m[1];
    const raw = m[0];
    const start = m.index;

    if (!looksLikePlaceholder(inner)) {
      continue;
    }

    if (start > lastIndex) {
      tokens.push({ kind: 'text', value: prompt.slice(lastIndex, start) });
    }
    const { name, hint } = splitNameHint(inner);
    tokens.push({ kind: 'var', raw, key: raw, name, hint });
    lastIndex = start + raw.length;
  }

  if (lastIndex < prompt.length) {
    tokens.push({ kind: 'text', value: prompt.slice(lastIndex) });
  }

  return tokens;
}

/**
 * Collect the unique placeholder variables across one or more prompts,
 * preserving first-seen order.
 */
export function uniqueVariables(prompts: string[]): PlaceholderToken[] {
  const seen = new Map<string, PlaceholderToken>();
  for (const p of prompts) {
    for (const t of tokenize(p)) {
      if (t.kind === 'var' && !seen.has(t.key)) {
        seen.set(t.key, t);
      }
    }
  }
  return Array.from(seen.values());
}

/**
 * Produce the substituted prompt text for clipboard copy.
 * If a placeholder has no value, leaves the original bracketed text in place.
 */
export function substitute(
  prompt: string,
  values: Record<string, string>,
): string {
  return tokenize(prompt)
    .map((t) => {
      if (t.kind === 'text') return t.value;
      const v = values[t.key];
      return v && v.trim() ? v : t.raw;
    })
    .join('');
}
