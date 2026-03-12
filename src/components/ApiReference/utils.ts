import type { OpenApiSpec, OpenApiPathItem, HttpMethod } from './types';
import type { EndpointEntry } from './types';

const METHODS: HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

export function getEndpointsFromSpec(spec: OpenApiSpec): EndpointEntry[] {
  const paths = spec.paths ?? {};
  const entries: EndpointEntry[] = [];

  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    const item = pathItem as OpenApiPathItem;
    for (const method of METHODS) {
      const op = item[method];
      if (op) {
        entries.push({
          path,
          method,
          operation: op,
          pathItem: item,
        });
      }
    }
  }

  return entries.sort((a, b) => {
    const pathCompare = a.path.localeCompare(b.path);
    if (pathCompare !== 0) return pathCompare;
    return METHODS.indexOf(a.method) - METHODS.indexOf(b.method);
  });
}

export function endpointId(entry: EndpointEntry): string {
  return `${entry.method.toUpperCase()} ${entry.path}`;
}

/** Stable slug for scroll anchor / id (e.g. get-api-usage-check-licence). Keeps param names so e.g. .../approvals and .../approvals/{id} stay distinct. */
export function endpointSlug(entry: EndpointEntry): string {
  const path = entry.path
    .replace(/^\/+/, '')
    .replace(/\//g, '-')
    .replace(/\{([^}]*)\}/g, '$1'); // keep param name so /approvals and /approvals/{id} differ
  return `${entry.method.toLowerCase()}-${path}`.replace(/-+/g, '-').replace(/^-|-$/g, '') || 'endpoint';
}

/** Human-readable category label (e.g. "Provisioner Activities") */
export function categoryLabel(category: string): string {
  return category
    .replace(/_/g, ' ')
    .split(/\s+|-/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/** Slug for URL fragment: lowercase, spaces/special to single hyphen (e.g. "List approvals" → "list-approvals") */
function slugifyForFragment(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || 'section';
}

/** URL fragment in form category-endpoint (e.g. approvals-list-approvals) */
export function endpointFragment(entry: EndpointEntry, category: string): string {
  const catSlug = slugifyForFragment(category);
  const labelSlug = slugifyForFragment(endpointLabel(entry));
  return `${catSlug}-${labelSlug}`;
}

/** Resolve URL fragment to endpoint; returns null if no match. */
export function getEndpointByFragment(
  fragment: string,
  byCategory: { category: string; endpoints: EndpointEntry[] }[]
): EndpointEntry | null {
  if (!fragment) return null;
  for (const { category, endpoints } of byCategory) {
    const entry = endpoints.find((e) => endpointFragment(e, category) === fragment);
    if (entry) return entry;
  }
  return null;
}

export function endpointLabel(entry: EndpointEntry): string {
  const summary = entry.operation?.summary;
  if (summary) return summary;
  return `${entry.method.toUpperCase()} ${entry.path}`;
}

const METHOD_STYLE_KEYS: Record<string, string> = {
  get: 'endpointMethodGet',
  post: 'endpointMethodPost',
  put: 'endpointMethodPut',
  delete: 'endpointMethodDelete',
};

/** CSS module class for method badge (GET=green, POST=blue, PUT=orange, DELETE=red). */
export function getMethodClass(styles: Record<string, string>, method: string): string {
  const key = METHOD_STYLE_KEYS[method.toLowerCase()];
  return (key && styles[key]) || styles.endpointMethod;
}

const UNCATEGORIZED = '_';

/** Category from operation tags (first tag), or uncategorized. */
function getCategoryFromEntry(entry: EndpointEntry): string {
  const tag = entry.operation?.tags?.[0];
  return (typeof tag === 'string' && tag) ? tag : UNCATEGORIZED;
}

/**
 * Group endpoints by operation tag (operation.tags[0]). Category order matches the spec:
 * 1. Order of the spec's top-level `tags` array (same order as in the OpenAPI YAML/JSON).
 * 2. Any tag used in operations but not listed in `tags` is appended at the end, alphabetically.
 */
export function getEndpointsByCategory(spec: OpenApiSpec): { category: string; endpoints: EndpointEntry[] }[] {
  const endpoints = getEndpointsFromSpec(spec);
  const tagOrderFromSpec = (spec.tags ?? []).map((t: { name?: string }) => t?.name).filter(Boolean) as string[];
  const byCategory = new Map<string, EndpointEntry[]>();
  for (const entry of endpoints) {
    const cat = getCategoryFromEntry(entry);
    const key = cat === UNCATEGORIZED ? 'Other' : cat;
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key)!.push(entry);
  }
  const ordered = new Map<string, EndpointEntry[]>();
  for (const name of tagOrderFromSpec) {
    if (byCategory.has(name)) ordered.set(name, byCategory.get(name)!);
  }
  const rest = [...byCategory.keys()].filter((k) => !ordered.has(k)).sort();
  for (const name of rest) ordered.set(name, byCategory.get(name)!);
  return Array.from(ordered.entries()).map(([category, endpoints]) => ({ category, endpoints }));
}
