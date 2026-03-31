# Harness Developer Hub — Claude Instructions

This file provides project-wide conventions and rules for Claude (Claude Code and Cowork). It mirrors the rules in `.cursor/rules/` so both Cursor and Claude users benefit from the same standards.

---

## Documentation Structure

When creating new documentation pages, follow this structure:

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

1. **Introduction** (2–3 paragraphs): what it is, why use it, key benefits.
2. **Prerequisites**: required setup, permissions, or knowledge.
3. **Step-by-step instructions**: use imperative headers in **sentence case** (`## Install dependencies`, not `## Installing dependencies`). Capitalize proper nouns (technologies, Harness modules such as **IaCM**). Do not use `#` in the Markdown body; start at `##`. Add inline `:::tip` callouts for common errors at the relevant step.
4. **Troubleshooting** (optional): use the `<Troubleshoot>` component — see below.
5. **Next steps**: 1–2 sentence conclusion + 2–3 related links.

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

Use imperative headers, not gerunds:

| ❌ Avoid | ✅ Use |
|---------|--------|
| Installing dependencies | Install dependencies |
| Configuring the API | Configure the API |
| Running tests | Run tests |

Exceptions: concept sections like **Troubleshooting** or **Prerequisites** are fine as noun phrases.

---

## List Formatting

Use bold labels followed by colons:

```markdown
- **Label:** Description text here.
- **Another point:** More description text.
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
