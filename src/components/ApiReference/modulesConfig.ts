/**
 * API Reference module configuration.
 * Each module's API reference is driven by a single OpenAPI spec URL from the engineering team.
 * Add a new entry when onboarding a new module; ensure the key matches the docs module id
 * and the URL used in sidebars: /api-reference?module=<moduleId>.
 */
export interface ApiReferenceModuleConfig {
  name: string;
  specUrl: string;
  /** Path prefix for request URLs when the API expects a module segment (e.g. /iacm) */
  pathPrefix?: string;
  /** Sidebar icon class used in docs (e.g. sidebar-iacm) for matching module header style */
  sidebarIconClass?: string;
  /** Icon path for module header (same as Docs landing, e.g. /img/iacm-icon.svg) */
  iconPath?: string;
}

export const apiReferenceModules: Record<string, ApiReferenceModuleConfig> = {
  'code-repository': {
    name: 'Code Repository',
    specUrl: 'https://app.harness.io/prod1/code/openapi.yaml',
    sidebarIconClass: 'sidebar-cr',
  },
  'infra-as-code-management': {
    name: 'Infrastructure as Code Management',
    specUrl: 'https://app.harness.io/prod1/iacm/openapi3.yaml',
    pathPrefix: '/iacm',
    sidebarIconClass: 'sidebar-iacm',
    iconPath: '/img/iacm-icon.svg',
  },
};

/** Docs URL path segment -> API reference module id (when they differ, e.g. IaCM) */
const DOCS_PATH_TO_API_MODULE: Record<string, string> = {
  'infrastructure-as-code-management': 'infra-as-code-management',
};

export function getApiReferenceModule(moduleId: string): ApiReferenceModuleConfig | null {
  return apiReferenceModules[moduleId] ?? null;
}

export function getApiReferenceModuleIds(): string[] {
  return Object.keys(apiReferenceModules);
}

/**
 * Resolve API ref module id from the docs path segment (first segment after /docs/).
 * e.g. "infrastructure-as-code-management" -> "infra-as-code-management"
 */
export function getApiRefModuleIdFromDocsPath(docsPathSegment: string): string {
  return DOCS_PATH_TO_API_MODULE[docsPathSegment] ?? docsPathSegment;
}

/** API ref module id -> docs path segment (when they differ) */
const API_MODULE_TO_DOCS_PATH: Record<string, string> = {
  'infra-as-code-management': 'infrastructure-as-code-management',
};

/** Docs base path for the "Documentation" link when viewing API reference (e.g. /docs/infrastructure-as-code-management) */
export function getDocsBasePathForModule(apiRefModuleId: string): string {
  const segment = API_MODULE_TO_DOCS_PATH[apiRefModuleId] ?? apiRefModuleId;
  return `/docs/${segment}`;
}

/** Docs path segment from active doc path (path prop). Use when pathname parsing fails. */
export function getDocsPathSegmentFromActivePath(activePath: string): string | null {
  const first = activePath?.replace(/^\/+/, '').split('/')[0];
  if (!first) return null;
  return API_MODULE_TO_DOCS_PATH[first] ?? first;
}

/** Sidebar item shape (minimal for our scan). */
type SidebarItemLike = { type: string; href?: string; items?: SidebarItemLike[] };

/**
 * Find API ref module id from sidebar items by looking for a link href like /api-reference?module=xxx.
 * Use this to show the Documentation | API Reference switcher whenever the sidebar contains that link.
 */
export function getApiRefModuleIdFromSidebarItems(items: SidebarItemLike[] | undefined): string | null {
  if (!items?.length) return null;
  for (const item of items) {
    if (item.type === 'link' && typeof item.href === 'string') {
      const m = item.href.match(/^\/api-reference\?module=([^&]+)/);
      if (m) return decodeURIComponent(m[1]);
    }
    if (item.items?.length) {
      const found = getApiRefModuleIdFromSidebarItems(item.items);
      if (found) return found;
    }
  }
  return null;
}
