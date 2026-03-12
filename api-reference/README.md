# API Reference content

This folder contains one directory per **module** that has an API reference. Each module's API reference is driven by a **single OpenAPI spec URL** (owned by the engineering team).

## Structure

```
api-reference/
  <module-id>/     e.g. code-repository, infra-as-code-management
    (optional)     Override files or config can be added here later.
```

## Configuration

Module IDs and their spec URLs are defined in **`src/components/ApiReference/modulesConfig.ts`**. Add a new entry when onboarding a new module. The key (e.g. `infra-as-code-management`) must match the segment used in the docs sidebar and in the URL: `/api-reference?module=<module-id>`.

- **Spec format:** The spec URL can return **JSON** or **YAML** (OpenAPI 3.x). Both are parsed client-side.
- **CORS:** If the spec is hosted on another origin, the server must allow the Developer Hub origin in CORS, or the spec must be proxied/served from the same origin.
- **Optional config per module:** `pathPrefix` (e.g. `/iacm`) for request URLs, `sidebarIconClass`, `iconPath` (e.g. `/img/iacm-icon.svg`) for the module header. Docs path segment can be mapped to a different API ref module id (e.g. `infrastructure-as-code-management` → `infra-as-code-management`) for the Documentation | API Reference switcher.

## Frontend behaviour

### Entry and layout

- **Docs sidebar:** Each module's sidebar shows an **API Reference** item. Clicking it goes to `/api-reference?module=<module-id>` and switches to the API reference view (no docs sidebar on that page).
- **API Reference page:** When the view is opened or the spec changes, the **window and main content scroll to the very top** so the page starts at the top.
- **Layout:** Left = **sidebar** (module name, Documentation | API Reference toggle, categories and endpoints). Center = **main content** (all categories and endpoints on one scrollable page). Right = **Try it** panel (API key, parameters, request body, Send, response) for the selected endpoint.

### Sidebar

- **Categories** come from the OpenAPI spec (`operation.tags[0]`). Categories are expanded by default and can be toggled.
- Clicking an **endpoint** selects it, scrolls the main content to that endpoint (or to the category heading if it’s the first endpoint in that category), and updates the URL fragment.
- The **active endpoint** is highlighted and scrolled into view in the sidebar when it changes (from scroll or click).

### Main content and scroll behaviour

- All **categories and endpoints** are rendered in a single scrollable column. Each endpoint shows its spec details (title, method, URL, description, parameters, etc.) with the Try it panel beside it.
- **Scroll position when selecting an endpoint:**
  - If the selected endpoint is the **very first** on the page (first in first category): main content and window scroll to the **very top** so the category heading is visible and nothing is chopped off.
  - If it’s the **first endpoint in a category** (but not the first on the page): main content scrolls so the **category heading** is at the top.
  - Otherwise: main content scrolls so the **endpoint block** is brought into view (with scroll-padding so the title isn’t clipped under the navbar).

### URL fragments

- Fragments use the form **`#category-endpoint`** (e.g. `#approvals-list-approvals`, `#approvals-show-approval`). Category and endpoint names are slugified (lowercase, hyphens).
- The fragment is **updated** when the user scrolls (scrollspy) or clicks an endpoint in the sidebar.
- **On load**, the hash is read and the matching endpoint is selected. The format `#category-endpoint` is resolved first; the legacy path-based slug is still supported for backwards compatibility.

### Scrollspy

- As the user scrolls the main content, the **sidebar highlight** follows the endpoint that is at the **middle of the viewport** (halfway down the screen). A small per-endpoint “anchor” at the top of each block is used so the correct endpoint is highlighted even when blocks are tall.
- When **scrolling back up**, the highlight moves back one endpoint at a time; it does not jump to the first item.

### Build it panel

- **API key** field (when required by the spec).
- **Parameters:** path, query, and header parameters with required vs optional grouping; path placeholders in the URL.
- **Request body** for POST/PUT etc. **Send** triggers the request and shows the **response** (status and body).
