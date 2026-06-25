# Harness Developer Hub — Claude Instructions

This file provides project-wide conventions and rules for Claude (Claude Code and Cowork). It mirrors the rules in `.cursor/rules/` so both Cursor and Claude users benefit from the same standards.

---

## Documentation Structure

We have **three documentation templates** depending on page type:

**Instructional/Action pages** (`.cursor/rules/doc-structure-template.mdc`):
- Step-by-step tutorials and quickstarts
- "Create your first X" guides
- Setup/installation guides
- Configuration walkthroughs with UI navigation
- Structure: Frontmatter → Introduction → Before you begin → Step-by-step instructions → Troubleshooting → Next steps

**Informative/Overview pages** (`.cursor/rules/doc-structure-overview-template.mdc`):
- Architecture and concept explanations
- "How X works" or "Understanding X" pages
- Feature comparisons and reference docs
- API/schema reference material
- Structure: Frontmatter → Introduction → What you will learn → Optional lightweight prerequisites → Concept sections → Optional FAQs → Related concepts

**Best-practices pages** (`.cursor/rules/doc-structure-best-practices-template.mdc`):
- "Best Practices" or "X best practices" pages
- Hardening, production-readiness, and "before you scale" guidance
- Pages that steer decisions rather than define concepts or list features
- Structure: Frontmatter → Introduction (advice frame, not a feature tour) → Practice sections with imperative headings → Next steps
- Defining rule: every entry states a **recommendation + rationale + consequence** ("if you do not do X, then Y happens"). If you cannot state a consequence, it is not a best practice.
- Deliberately **omit** "What you will learn", `<Troubleshoot>` blocks, concept dumps (hierarchies, version matrices, "how RBAC works"), and standalone "Limitations" sections. Link concept and platform-level material out, or surface it under Next steps. Score these pages against this rule, not the feature or overview rubric.

**When in doubt:** If the page title is action-oriented ("Create", "Configure", "Set up"), use the instructional template. If the title is a noun phrase ("OPA Policies", "Workspace Architecture"), use the overview template. If the page tells the reader what to do and what breaks if they do not ("Best Practices"), use the best-practices template.

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
2. **Before you begin**: required setup, permissions, or knowledge.
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

**Validate the mode against Kapa before publishing (especially for new or pending-release features):** Run each `issue` string through Kapa. If Kapa returns a **grounded, accurate** answer, keep `mode="docs"`. If Kapa is **uncertain or contradicts the feature** (common when the page is not yet published or indexed, so it answers "this is not documented" or conflates it with a different feature), use `mode="general"` so Gemini answers from the issue text at build time. Reserve `mode="fallback-only"` for deterministic fixes. Always supply an accurate static `fallback` regardless of mode. When a pending-release page later goes live and Kapa re-indexes it, re-evaluate the `general` entries and switch the ones Kapa now answers well to `mode="docs"`.

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

Exceptions: concept sections like **Troubleshooting** or **Before you begin** are fine as noun phrases.

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

## Tabs for Parallel Variants — Use `<Tabs>`

When two or more sections document **the same action or reference for different targets**, consolidate them under **one** heading with unsynced tabs instead of repeating near-identical sibling headings. This is the default for **configuration-level** and **operation-variant** pairs.

- **Configuration levels:** Replace `### Enable X for a workspace` + `### Enable X for a project` with a single `### Enable X` and **Workspace level** / **Project level** tabs.
- **Operation variants:** Replace `### Destroy schedule fields` + `### Delete schedule fields` with a single `### Schedule fields` and **Destroy schedule** / **Delete schedule** tabs.

Import once at the top of the file (after frontmatter):

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Usage:

```jsx
### Enable X

Configure X at the workspace level for a single workspace, or at the project level for every matching workspace.

<Tabs>
<TabItem value="workspace" label="Workspace level" default>

Workspace-level steps, code, and notes here.

</TabItem>
<TabItem value="project" label="Project level">

Project-level steps, code, and notes here.

</TabItem>
</Tabs>
```

**Rules:**
- Keep a one-line intro under the heading, before `<Tabs>`, that states what the tabs cover.
- Put each variant's full content (tables, code blocks, callouts) **inside** its `<TabItem>`.
- Mark the first tab `default`. Use **Title Case** tab labels.
- For long, self-contained variants or more than ~5 options, use `DynamicMarkdownSelector` instead. Go to `.cursor/rules/doc-structure-template.mdc` to review the full DMS-vs-tabs decision guide.

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

## Before you begin Section Formatting

Keep Before you begin bullets short and scannable — no paragraph-length bullets.

- Bold only the **label** (2–4 words), not the entire sentence.
- Follow each label with a brief description and a relevant link using "Go to X to Y" phrasing.
- Detailed logic or configuration steps belong in the page body, not in Before you begin.

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

## Sidebar Navigation Configuration

This project uses **three navigation systems** depending on where files live and the content type.

### System 1: Manual sidebar entries (required for module-level pages)

**Files:** `sidebars.ts`, `sidebars-release-notes.ts`, `sidebars-community.ts`, `sidebars-university.ts`

**When to use:** 
- **`sidebars.ts`:** Required when adding **any file directly under `/docs/[module]/`** (e.g., `/docs/platform/new-file.md`)
- **`sidebars.ts`:** Also required when creating a **new top-level module** landing page (e.g., `/docs/new-module/`)
- **`sidebars-release-notes.ts`:** When adding new release notes pages
- **Nested docs** (files inside subfolders like `/docs/[module]/[subfolder]/`) auto-generate from folder structure (see System 2)

**How it works:**

1. **Module landing pages** (in `sidebars.ts`): These are `type: 'link'` entries that point to module index pages:

```typescript
{
  type: 'link',
  label: 'Cloud Cost Management',
  className: 'sidebar-ccm',
  href: '/docs/cloud-cost-management',
  customProps: {
    description: 'Learn how to optimize your cloud costs.',
  },
}
```

2. **Release notes** (in `sidebars-release-notes.ts`): Simple doc ID references:

```typescript
releaseNotes: [
  {
    type: 'category',
    label: 'Release Notes',
    items: [
      "all-modules",
      "platform",
      "self-managed-enterprise-edition",
      // ... more doc IDs
    ],
  },
]
```

**When adding a file directly under `/docs/[module]/` (e.g., `/docs/platform/new-file.md`):**
1. Add the doc ID (path without `.md`) to the Platform items array in `sidebars.ts`
2. Example: `'platform/smriti'` for `/docs/platform/smriti.md`
3. Place it in the appropriate position in the items array

**When adding a new release notes page:** Add the doc ID (filename without `.md`) to the `items` array in `sidebars-release-notes.ts` in the appropriate position.

**When adding a new module landing page:** Add a new `type: 'link'` entry in `sidebars.ts` with label, href, and description.

**Important:** You do NOT need to touch `sidebars.ts` for files nested inside subfolders (e.g., `/docs/platform/get-started/new-guide.md`). Those auto-generate — see System 2 below.

### System 2: Autogenerated sidebars from `_category_.json` files (for nested pages)

**When to use:** For **documentation nested inside subfolders** (e.g., `/docs/[module]/[subfolder]/[page.md]`). Files that are NOT directly under the module root.

**How it works:** Docusaurus automatically generates sidebar items from the directory structure. Control ordering and labels with `_category_.json` files at the folder level.

**`_category_.json` structure:**

```json
{
  "label": "Cloud & AI Cost Management",
  "collapsible": "true",
  "collapsed": "true",
  "className": "red",
  "link": {
    "type": "generated-index",
    "title": "Cloud & AI Cost Management"
  },
  "customProps": {
    "position": "To position the category, enter a number and move this to the root level."
  }
}
```

**Fields:**
- `label` — Display name in the sidebar (Title Case)
- `collapsible` — Whether the category can collapse (`"true"` or `"false"`)
- `collapsed` — Default state (`"true"` = collapsed by default)
- `className` — CSS class for styling (optional)
- `link.type` — `"generated-index"` creates an auto-generated landing page; `"doc"` links to a specific file
- `link.title` — Title for the generated index page
- `customProps.position` — Numeric value to control category order (lower numbers appear first)

**When adding a new folder under `/docs/[module]/`:**

1. Create a `_category_.json` file in the new folder
2. Set the `label`, `position`, and `link` type
3. Individual page ordering within the folder uses frontmatter `sidebar_position`:

```yaml
---
title: Get started
sidebar_position: 1
---
```

### System 3: Module-specific `sidebar.js` files (rare)

**Location:** Some modules like Feature Flags have their own `sidebar.js` files (e.g., `docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/sidebar.js`)

**When to use:** Only when a module requires a completely custom sidebar structure that cannot be auto-generated.

**Structure:** Simple array of doc IDs:

```javascript
module.exports = [
  "module/path/to/index",
  "module/path/to/page1",
  "module/path/to/page2",
];
```

**When adding pages to these sections:** Add the full doc ID (relative path from `docs/` without `.md` extension) to the array.

### Quick decision tree

```
Adding a new file/folder?
│
├─ Is it a NEW top-level module (e.g., /docs/new-module/)?
│  └─ YES → Add to sidebars.ts (type: 'link')
│  └─ NO → Keep reading...
│
├─ Is it a file DIRECTLY under a module root (e.g., /docs/platform/new-file.md)?
│  └─ YES → Add doc ID to sidebars.ts in the module's items array
│  └─ Example: 'platform/smriti' for /docs/platform/smriti.md
│  └─ NO → Keep reading...
│
├─ Is it a release notes page under /release-notes/?
│  └─ YES → Add doc ID to sidebars-release-notes.ts
│  └─ NO → Keep reading...
│
├─ Is it a new FOLDER under /docs/[module]/[new-folder]/?
│  └─ YES → Create _category_.json in the new folder
│  └─ NO → Keep reading...
│
├─ Is it a PAGE inside a subfolder /docs/[module]/[subfolder]/new-page.md?
│  └─ YES → Just add sidebar_position to frontmatter (auto-generates!)
│  └─ NO → Keep reading...
│
└─ Is it in a module with a custom sidebar.js file?
   └─ YES → Add doc ID to that sidebar.js array (rare)
```

**Key distinction:**
- **File directly under module** (`/docs/platform/file.md`) → Requires `sidebars.ts` entry
- **File inside subfolder** (`/docs/platform/subfolder/file.md`) → Auto-generates with just `sidebar_position` in frontmatter

### Sidebar labels and titles

- **Sidebar labels** (left nav) use **Title Case**: `sidebar_label: Title Case Nav Label`
- **Page titles** can use any case appropriate to the content
- **Module names** use proper capitalization: **IaCM**, **Harness Platform**, **Cloud Cost Management**

### Common issues

**Page does not appear in sidebar:**
- Check if the folder has a `_category_.json` file
- Check if the page has `sidebar_position` in frontmatter
- For manual sidebars, verify the doc ID is added to the correct `.ts` or `.js` file
- Check that the file is not in an `exclude` path (e.g., `**/shared/**`)

**Sidebar order is wrong:**
- For folders: adjust `position` in `_category_.json`
- For pages: adjust `sidebar_position` in frontmatter
- For manual sidebars: reorder entries in the array

**Page appears twice:**
- Check if it is both auto-generated AND manually listed in a sidebar file
- Remove the manual entry if auto-generation is sufficient

**Full documentation:** Go to [`.cursor/rules/doc-move.mdc`](.cursor/rules/doc-move.mdc) for guidance on updating sidebar references when moving files.

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
├── useAIResponse.ts                # localStorage cache (90-day TTL) + lazy fetch on first open
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

---

## LLM Documentation Files (`llms.txt` and `llms-full.txt`)

**Purpose:** Make documentation discoverable and consumable by Large Language Models (LLMs). These files act as a "sitemap for AI" — similar to how `robots.txt` helps search engines, these help LLMs understand your documentation structure.

**Files:**
- `llms.txt` — Concise overview (~200 lines) with priority modules, key pages, and metadata
- `llms-full.txt` — Comprehensive index (~4500+ lines) with all modules and all documentation pages

**Generation:**
```bash
npm run generate-llms-txt
```

**Auto-generation:** Both files are automatically regenerated during:
- `npm run build` (prebuild hook)
- `npm start` (development mode)

**Script:** `/scripts/generate-llms-txt.mjs`

**What it does:**
1. Scans all `.md` and `.mdx` files in `docs/`
2. Extracts frontmatter (`title`, `description`, `sidebar_label`, `slug`)
3. Groups by module (top-level directory)
4. Generates structured output with:
   - Metadata (maintainer, citation, attribution policy)
   - Allow patterns for all modules
   - Detailed page listings with descriptions and URLs

**Customization:**
- **Priority modules** (appear in `llms.txt`): Edit `PRIORITY_MODULES` array in script
- **Module names**: Edit `getModuleName()` function for human-friendly names
- **Metadata**: Edit `METADATA` object at top of script

**Format follows the emerging `llms.txt` standard** for AI-friendly documentation indexing.
