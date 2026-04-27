# Harness Developer Hub — Claude Instructions

This file provides project-wide conventions and rules for Claude (Claude Code and Cowork). It mirrors the rules in `.cursor/rules/` so both Cursor and Claude users benefit from the same standards.

---

## Documentation Structure

We have **two documentation templates** depending on page type:

**Instructional/Action pages** (`.cursor/rules/doc-structure-template.mdc`):
- Step-by-step tutorials and quickstarts
- "Create your first X" guides
- Setup/installation guides
- Configuration walkthroughs with UI navigation
- Structure: Frontmatter → Introduction → Prerequisites → Step-by-step instructions → Troubleshooting → Next steps

**Informative/Overview pages** (`.cursor/rules/doc-structure-overview-template.mdc`):
- Architecture and concept explanations
- "How X works" or "Understanding X" pages
- Feature comparisons and reference docs
- API/schema reference material
- Structure: Frontmatter → Introduction → What you will learn → Optional lightweight prerequisites → Concept sections → Optional FAQs → Related concepts

**When in doubt:** If the page title is action-oriented ("Create", "Configure", "Set up"), use the instructional template. If the title is a noun phrase ("OPA Policies", "Workspace Architecture"), use the overview template.

---

### Instructional pages (default structure)

When creating instructional documentation pages, follow this structure:

### Frontmatter
```yaml
---
title: Clear, descriptive title
sidebar_label: Title Case Nav Label
description: One-sentence summary
keywords:
  - keyword1
tags:
  - tag1
---
```

Use `sidebar_label` when the left-nav text (Title Case, capitalize major words) should differ from `title`. Omit if the sidebar should match `title`.

### Standard Sections

1. **Introduction** (1 short paragraph, 2–3 lines): what the user will accomplish and why it matters.
2. **Prerequisites**: required setup, permissions, or knowledge.
3. **Step-by-step instructions**: use imperative headers in **sentence case** (`## Install dependencies`, not `## Installing dependencies`). Capitalize proper nouns (technologies, Harness modules such as **IaCM**). Do not use `#` in the Markdown body; start at `##`. Add inline `:::tip` callouts for common errors at the relevant step.
4. **Troubleshooting** (optional): use the `<Troubleshoot>` component — see below.
5. **Next steps**: 1–2 sentence conclusion + 2–3 related links.

**Visual separation:** Add a horizontal rule (`---`) before each major `##` section heading to provide clear visual separation between sections.

---

## Troubleshooting Sections — Use `<Troubleshoot>`

Never use static `### Issue` headings with `**Solution:**` pairs. Use the `<Troubleshoot>` component instead.

Import at the top of the file (after frontmatter):
```mdx
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
```

Usage:
```jsx
<Troubleshoot
  issue="[Problem description with product/module context]"
  mode="docs"
  fallback="[One-sentence static fix if AI unavailable]"
/>
```

**Mode guide:**
- `mode="docs"` — Harness-specific issues. Kapa answers at runtime from live docs. Use for most entries.
- `mode="general"` — Infrastructure-adjacent issues (auth, networking, Terraform, Kubernetes). Gemini pre-generates a response at build time.
- `mode="fallback-only"` — Deterministic fixes that never change. Always shows the static `fallback`.

**Rules:**
- Do **not** add `###` headings above each `<Troubleshoot>` — the `issue` prop is the collapsible heading.
- The `fallback` prop is required on every entry.
- Multiple entries sit directly adjacent with no headings between them.

---

## FAQ Sections — Use `<FAQ>`

```mdx
import { FAQ } from '@site/src/components/AdaptiveAIContent';
```

```jsx
<FAQ
  question="[Question text]"
  mode="docs"
  fallback="[Static answer shown if AI unavailable]"
/>
```

- `mode="docs"` is the default. Kapa answers at runtime.
- `mode="fallback-only"` for answers that are always static.
- Do not use `mode="general"` on `<FAQ>`.

---

## Markdown headers

- **No `#` (h1) in doc Markdown bodies.** Use `##` as the first in-file heading; the page title comes from frontmatter `title`. Use `sidebar_label` (Title Case) when the nav label must differ from `title`.
- **Sentence case** for `##` / `###` headings: capitalize the first word and **proper nouns** only (e.g. **Kubernetes**, **Terraform**, **IaCM**, **Harness**).
- **Sidebar:** labels in the left nav use **Title Case** (set via `sidebar_label` or a Title Case `title`).

### Heading style by page type

**Instructional pages** — Use imperative headers, not gerunds:

| ❌ Avoid | ✅ Use |
|---------|--------|
| Installing dependencies | Install dependencies |
| Configuring the API | Configure the API |
| Running tests | Run tests |

Exceptions: concept sections like **Troubleshooting** or **Prerequisites** are fine as noun phrases.

**Overview pages** — Use descriptive noun phrases or "how it works" style:

| ✅ Good for overview pages |
|---------------------------|
| Policy entity types |
| How policy sets are triggered |
| Workspace attribute reference |
| Common policy patterns |

Avoid imperative headings ("Create a policy set") in overview pages since they're conceptual, not action-oriented.

---

## List Formatting

Use bold labels followed by colons:

```markdown
- **Label:** Description text here.
- **Another point:** More description text.
```

---

## Voice and Tone

- Write in **present tense**, **active voice**. Speak to the developer using "you", not "the user".
- Do **not** use "please". Be authoritative but approachable.
- Do **not** use contractions. Write out all words in full (`do not` instead of `don't`, `will not` instead of `won't`, `it is` instead of `it's`).
- Keep sentences short. **No gerunds** anywhere — use the imperative form instead (`Install X`, not `Installing X`). This applies to headings, body text, steps, and list items.
- **No em dashes** (`—`). Never use em dashes in any documentation — not in sentences, bullet points, or link descriptions. Use a comma, period, semicolon, or rewrite the sentence instead. For bullet points with links, use a colon after the link: `- [Link text](/path): Description here.`

---

## Link Phrasing — "Go to X to do Y"

Always use **"Go to [link] to [verb phrase]"**. Never use "see", "refer to", "to learn more about", "to find out more", or "for more information".

- ❌ `See [RBAC in Harness](/docs/...) for the permissions hierarchy.`
- ❌ `To find out more, refer to the [permissions reference](/docs/...).`
- ✅ `Go to [RBAC in Harness](/docs/...) to understand the permissions hierarchy.`
- ✅ `Go to the [permissions reference](/docs/...) to review required permissions.`

Use meaningful link text. Never write `[here](url)` or `[this doc](url)`.

---

## Prerequisites Section Formatting

Keep Prerequisites bullets short and scannable — no paragraph-length bullets.

- Bold only the **label** (2–4 words), not the entire sentence.
- Follow each label with a brief description and a relevant link using "Go to X to Y" phrasing.
- Detailed logic or configuration steps belong in the page body, not in Prerequisites.

❌ Too text-heavy:
```
- **Harness project access:** You need permission to open the failing pipeline execution and view logs. At minimum, **View** on [Pipelines](...) is required; **Execute** is needed if you will re-run the pipeline to verify a fix. An administrator assigns these via [RBAC in Harness](...) and [Manage roles](...).
```

✅ Concise:
```
- **Harness project access:** View or Execute permissions on the pipeline. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
```

---

## Doc Linking

- Use **site-relative paths**: `/docs/infra-as-code-management/get-started`
- Never use full production URLs: `https://developer.harness.io/docs/...`
- If a file is an index page in a same-named folder, link to the folder path only.

---

## Redirects When Moving Files

Add `redirect_from` to the destination file's frontmatter:

```yaml
redirect_from:
  - /docs/old/path/to/page
```

**Custom `slug`:** If the canonical URL is not the default path derived from the file (frontmatter `slug`), list every superseded URL under `redirect_from`. **`slug` must not include a `/docs/` prefix** (Docusaurus already applies `routeBasePath`). Full conventions: `.cursor/rules/doc-slugs-and-redirects.mdc`.

---

## AdaptiveAIContent Component System

**Location:** `src/components/AdaptiveAIContent/`

**Files:**
```
src/components/AdaptiveAIContent/
├── index.ts
├── FAQ.tsx
├── Troubleshoot.tsx
├── useAIResponse.ts                # sessionStorage cache + eager fetch on mount
├── api.ts                          # window.Kapa JS bridge (8s timeout) + kapa_proxy fallback
├── generated-responses.json        # build-time Gemini output (gitignored; script seeds `{}`)
└── styles.module.scss              # progress bar animation + shared styles
scripts/
└── generate-troubleshoot-responses.mjs
netlify/functions/
└── kapa_proxy.mts
```

**Performance:**
- `useAIResponse.ts` reads `sessionStorage` on first render — cached responses are instant.
- Fetches eagerly on mount (before the user opens the collapsible).
- `docusaurus.config.ts` includes `preconnect` + `dns-prefetch` for both Kapa endpoints.

**Loading state:** Animated progress bar (deceleration curve, snaps to 100% on completion) with label "Fetching the most relevant and up-to-date information from our docs…"

**Environment variables:**
- `GEMINI_API_KEY` — build time only (already in pipeline).
- `KAPA_API_KEY` — Netlify runtime (add to Netlify environment variables).

**Always wrap components in `BrowserOnly`** — required for Docusaurus SSR.

---

## Project Stack

- **Docusaurus** (static site generator, MDX support)
- **Netlify** (hosting + serverless functions via `.mts` files in `netlify/functions/`)
- **Kapa.ai** (docs-grounded AI chat, website ID `db287d54-3525-4674-9d83-a0cbe35024d2`)
- **Gemini** (`gemini-flash-latest`, build-time AI via `@google/generative-ai`)
- **TypeScript** throughout; SCSS modules for component styles
- `/api/*` routes to `/.netlify/functions/*` via `netlify.toml`

---

## React / TypeScript Coding Patterns

These rules come from real code review findings on this codebase. Follow them when writing or modifying any component.

### Always cancel timers in useEffect cleanup

Any `setTimeout` or `setInterval` created inside a `useEffect` must be declared at the effect's scope and cleared in the cleanup function — even if it is created inside a nested function or callback.

```ts
// ✅ Correct
useEffect(() => {
  let correctionTimer: ReturnType<typeof setTimeout> | undefined;

  const doWork = () => {
    correctionTimer = setTimeout(() => { /* ... */ }, 200);
  };

  doWork();

  return () => {
    clearTimeout(correctionTimer);
  };
}, [dep]);

// ❌ Wrong — timer created inside a nested function, never cancelled
useEffect(() => {
  const doWork = () => {
    setTimeout(() => { /* ... */ }, 200); // leaks on re-render
  };
  doWork();
}, [dep]);
```

### Never suppress accessibility linting — fix the root cause

Do not use `// eslint-disable-next-line jsx-a11y/...` to silence warnings. Find and remove the actual accessibility problem instead.

The most common pattern: a `<span>` with an `onClick` handler that duplicates what a nearby `<button>` already does. Remove the `onClick` from the span (and the disable comment) rather than hiding the warning.

```tsx
// ✅ Correct — button handles interaction, span is display-only
<button onClick={() => setOpen(true)}>▸</button>
<span className={styles.summary}>[5 items]</span>

// ❌ Wrong — span with click handler suppressed by eslint-disable
// eslint-disable-next-line jsx-a11y/click-events-have-key-events
<span onClick={() => setOpen(true)}>[5 items]</span>
```

### Use stable React keys — never bare array index alone

`key={i}` is acceptable only when the list is truly static and items are never added, removed, or reordered. For any list that could change, combine the index with a content-derived value so React can track identity correctly.

```tsx
// ✅ For primitive-heavy arrays
{value.map((v, i) => (
  <div key={`${i}-${typeof v === 'object' ? i : String(v)}`}>
    ...
  </div>
))}

// ✅ For object arrays with a natural ID
{items.map((item) => (
  <div key={item.id}>...</div>
))}

// ❌ Bare index
{value.map((v, i) => <div key={i}>...</div>)}
```
