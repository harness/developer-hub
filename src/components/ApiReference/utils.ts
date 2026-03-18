import type { OpenApiSpec, OpenApiPathItem, OpenApiParameter, HttpMethod } from './types';
import type { EndpointEntry } from './types';

/** Resolve a $ref like "#/components/parameters/X" against the spec. Returns undefined if ref is invalid. */
export function resolveRef(spec: OpenApiSpec, ref: string): unknown {
  if (!ref || typeof ref !== 'string' || !ref.startsWith('#/')) return undefined;
  const parts = ref.slice(2).split('/').filter(Boolean);
  let current: unknown = spec;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/** Resolve parameters array: replace any { $ref } item with the resolved component. */
export function resolveParameters(spec: OpenApiSpec, parameters: OpenApiParameter[] | undefined): OpenApiParameter[] {
  if (!parameters?.length) return [];
  return parameters.map((p) => {
    const ref = (p as { $ref?: string }).$ref;
    if (ref) {
      const resolved = resolveRef(spec, ref) as OpenApiParameter | undefined;
      return resolved ?? p;
    }
    return p;
  });
}

/** Resolve requestBody if it is a $ref; return the resolved body object (content, description). */
export function resolveRequestBody(
  spec: OpenApiSpec,
  requestBody: { $ref?: string; content?: Record<string, { schema?: unknown }>; description?: string } | undefined
): { content?: Record<string, { schema?: unknown }>; description?: string } | undefined {
  if (!requestBody) return undefined;
  const ref = requestBody.$ref;
  if (ref) {
    const resolved = resolveRef(spec, ref) as { content?: Record<string, { schema?: unknown }>; description?: string } | undefined;
    return resolved;
  }
  return requestBody;
}

/** Resolve a response object if it is a $ref (e.g. #/components/responses/X). */
export function resolveResponse(
  spec: OpenApiSpec,
  response: { $ref?: string; description?: string; content?: Record<string, unknown> } | undefined
): { description?: string; content?: Record<string, unknown> } | undefined {
  if (!response) return undefined;
  const ref = response.$ref;
  if (ref) {
    const resolved = resolveRef(spec, ref) as { description?: string; content?: Record<string, unknown> } | undefined;
    return resolved;
  }
  return response;
}

type SchemaLike = Record<string, unknown> & {
  $ref?: string;
  type?: string;
  properties?: Record<string, SchemaLike>;
  items?: SchemaLike;
  enum?: unknown[];
  example?: unknown;
  default?: unknown;
};

/** Resolve a schema (follow $ref). Returns the same object if no $ref. */
function resolveSchema(spec: OpenApiSpec, schema: SchemaLike | undefined, seen = new Set<string>()): SchemaLike | undefined {
  if (!schema || typeof schema !== 'object') return schema;
  const ref = schema.$ref;
  if (ref) {
    if (seen.has(ref)) return undefined;
    seen.add(ref);
    const resolved = resolveRef(spec, ref) as SchemaLike | undefined;
    const out = resolved ? resolveSchema(spec, resolved, seen) : undefined;
    seen.delete(ref);
    return out;
  }
  return schema;
}

/** Resolve a schema for display (e.g. request body schema). Public wrapper around resolveSchema. */
export function getResolvedSchema(
  spec: OpenApiSpec,
  schema: Record<string, unknown> | undefined
): Record<string, unknown> | undefined {
  return resolveSchema(spec, schema as SchemaLike) as Record<string, unknown> | undefined;
}

/** Human-readable type string for a resolved schema (for request/response body docs). */
export function getSchemaTypeDisplay(schema: Record<string, unknown> | undefined): string {
  if (!schema || typeof schema !== 'object') return '—';
  const ref = schema.$ref as string | undefined;
  if (ref) return ref.split('/').pop() ?? 'object';
  const type = schema.type as string | undefined;
  if (type === 'array') {
    const items = schema.items as Record<string, unknown> | undefined;
    const itemRef = items?.$ref as string | undefined;
    if (itemRef) return `array of ${itemRef.split('/').pop() ?? 'object'}`;
    return (items?.type as string) ? `array of ${items.type}` : 'array';
  }
  if (type === 'object') return 'object';
  return type ?? '—';
}

/** Build a sample JSON value from an OpenAPI schema (for sample responses). Avoids null; uses empty object/string/array so responses are always populated. */
function sampleFromSchema(
  spec: OpenApiSpec,
  schema: SchemaLike | undefined,
  seen = new Set<string>(),
  depth = 0
): unknown {

  const MAX_DEPTH = 6;

  if (!schema || typeof schema !== 'object') return {};
  if (depth > MAX_DEPTH) return {};

  const ref = schema.$ref;

  if (ref) {
    if (seen.has(ref)) return {};

    seen.add(ref);
    const resolved = resolveRef(spec, ref) as SchemaLike | undefined;

    const out = resolved
      ? sampleFromSchema(spec, resolved, seen, depth + 1)
      : {};

    seen.delete(ref);
    return out;
  }

  if (schema.example !== undefined) return schema.example;
  if (schema.default !== undefined) return schema.default;
  if (Array.isArray(schema.enum) && schema.enum.length > 0) return schema.enum[0];

  const type = schema.type as string | undefined;

  if (type === 'object' && schema.properties) {
    const obj: Record<string, unknown> = {};

    for (const [key, propSchema] of Object.entries(
      schema.properties as Record<string, SchemaLike>
    )) {
      const value = sampleFromSchema(spec, propSchema, seen, depth + 1);
      obj[key] = value === null ? {} : value;
    }

    return obj;
  }

  if (type === 'object') return {};

  if (type === 'array') {
    const items = schema.items as SchemaLike | undefined;

    if (items && typeof items === 'object') {
      const resolvedItems = resolveSchema(spec, items, seen) ?? items;
      const itemType = (resolvedItems as SchemaLike).type;
      const hasProperties = !!(resolvedItems as SchemaLike).properties;

      if (itemType === 'object' || hasProperties) {
        const item = sampleFromSchema(
          spec,
          resolvedItems as SchemaLike,
          seen,
          depth + 1
        );

        return [item === null ? {} : item];
      }
    }

    return ['string'];
  }

  switch (type) {
    case 'string':
      return '';
    case 'number':
    case 'integer':
      return 0;
    case 'boolean':
      return false;
    case 'null':
      return null;
    default:
      return {};
  }
}

/**
 * Get a sample response string from an operation's response body only.
 * Uses operation.responses (e.g. 200/201/204): response example if present,
 * otherwise builds a sample from the response schema (resolving $refs).
 * Never uses request body.
 */
export function getSampleResponseFromOperation(
  spec: OpenApiSpec,
  operation: { responses?: Record<string, { $ref?: string; content?: Record<string, { schema?: unknown; example?: unknown; examples?: Record<string, { value?: unknown }> }> }> } | undefined
): string {
  if (!operation?.responses) return '{}';
  const statuses = ['200', '201', '204'];
  for (const status of statuses) {
    const res = operation.responses[status];
    if (!res) continue;
    const resolved = resolveResponse(spec, res as { $ref?: string; description?: string; content?: Record<string, unknown> }) as {
      content?: Record<string, { schema?: SchemaLike; example?: unknown; examples?: Record<string, { value?: unknown }> }>;
    } | undefined;
    if (!resolved?.content) continue;
    const json = resolved.content['application/json'];
    if (!json) continue;
    if (json.example != null) {
      return typeof json.example === 'string'
        ? json.example
        : JSON.stringify(json.example, null, 2);
    }
    if (json.examples && typeof json.examples === 'object') {
      const first = Object.values(json.examples)[0] as { value?: unknown } | undefined;
      if (first?.value != null) {
        return typeof first.value === 'string'
          ? first.value
          : JSON.stringify(first.value, null, 2);
      }
    }
    const rawSchema = json.schema as SchemaLike | undefined;
    if (rawSchema) {
      const schema = resolveSchema(spec, rawSchema);
      const sample = sampleFromSchema(spec, schema ?? rawSchema);
      const cleaned = sample === null ? {} : sample;
      return JSON.stringify(cleaned, null, 2);
    }
  }
  return '{}';
}

/**
 * Get a sample request body string from an operation: builds from requestBody schema
 * (resolving $refs). Uses same conventions as sample response (e.g. ["string"] for arrays of primitives).
 */
export function getSampleRequestBodyFromOperation(
  spec: OpenApiSpec,
  operation: { requestBody?: { $ref?: string; content?: Record<string, { schema?: unknown }> } } | undefined
): string {
  if (!operation?.requestBody) return '{}';
  const resolved = resolveRequestBody(spec, operation.requestBody);
  if (!resolved?.content) return '{}';
  const json = resolved.content['application/json'];
  const rawSchema = json?.schema as SchemaLike | undefined;
  if (!rawSchema) return '{}';
  const schema = resolveSchema(spec, rawSchema);
  const sample = sampleFromSchema(spec, schema ?? rawSchema);
  return JSON.stringify(sample, null, 2);
}

/** Flatten schema properties for request body param list (name, type, required, description, depth). */
function flattenSchemaProperties(
  spec: OpenApiSpec,
  schema: Record<string, unknown> | undefined,
  requiredList: string[],
  depth: number
): Array<{ name: string; typeDisplay: string; required: boolean; description: string; depth: number }> {
  const resolved = getResolvedSchema(spec, schema);
  if (!resolved) return [];
  const properties = resolved.properties as Record<string, Record<string, unknown>> | undefined;
  const required = (resolved.required as string[] | undefined) ?? requiredList;
  if (!properties) return [];
  const rows: Array<{ name: string; typeDisplay: string; required: boolean; description: string; depth: number }> = [];
  for (const [name, propSchema] of Object.entries(properties)) {
    const resolvedProp = getResolvedSchema(spec, propSchema);
    const typeDisplay = getSchemaTypeDisplay(resolvedProp ?? propSchema);
    const isRequired = Array.isArray(required) && required.includes(name);
    const description = (resolvedProp?.description ?? propSchema?.description ?? '') as string;
    rows.push({ name, typeDisplay, required: isRequired, description, depth });
    const nestedProps = resolvedProp?.properties;
    if (nestedProps && typeof nestedProps === 'object' && Object.keys(nestedProps).length > 0) {
      const nestedRequired = (resolvedProp?.required as string[] | undefined) ?? [];
      rows.push(...flattenSchemaProperties(spec, resolvedProp as Record<string, unknown>, nestedRequired, depth + 1));
    }
  }
  return rows;
}

/** Request body param row for Try It panel (optional params). */
export interface RequestBodyParamRow {
  name: string;
  required: boolean;
  description?: string;
  type?: string;
  depth?: number;
}

/**
 * Get all request body parameters from an operation (flattened from schema).
 * Used by Try It panel to show optional request body fields.
 */
export function getRequestBodyParamRows(
  spec: OpenApiSpec,
  operation: { requestBody?: { $ref?: string; content?: Record<string, { schema?: unknown }> } } | undefined
): RequestBodyParamRow[] {
  if (!spec || !operation?.requestBody) return [];
  const resolved = resolveRequestBody(spec, operation.requestBody);
  if (!resolved?.content) return [];
  const bodySchema = resolved.content['application/json']?.schema as Record<string, unknown> | undefined;
  if (!bodySchema) return [];
  const resolvedSchema = getResolvedSchema(spec, bodySchema) ?? bodySchema;
  const requiredList = (resolvedSchema.required as string[] | undefined) ?? [];
  return flattenSchemaProperties(spec, resolvedSchema as Record<string, unknown>, requiredList, 0).map((r) => ({
    name: r.name,
    required: r.required,
    description: r.description,
    type: r.typeDisplay,
    depth: r.depth,
  }));
}

const METHODS: HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

/** Skip operations marked as internal (x-internal: true) so they are not shown on the public site. */
function isInternalOperation(op: unknown): boolean {
  return (op as Record<string, unknown>)?.['x-internal'] === true;
}

export function getEndpointsFromSpec(spec: OpenApiSpec): EndpointEntry[] {
  const paths = spec.paths ?? {};
  const entries: EndpointEntry[] = [];

  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    const item = pathItem as OpenApiPathItem;
    for (const method of METHODS) {
      const op = item[method];
      if (op && !isInternalOperation(op)) {
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

/** Slug from operationId (e.g. listModulesById → list-modules-by-id) for unique scroll/section id. */
function slugifyOperationId(operationId: string): string {
  return operationId
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || 'op';
}

/**
 * Stable slug for scroll anchor and section id. Uses operationId when present so each operation
 * is uniquely identified. When no operationId, uses method + path + label slug so "List modules"
 * and "List module by id" always get different slugs (avoids collisions when paths normalize
 * the same or spec has no operationIds).
 */
export function endpointSlug(entry: EndpointEntry): string {
  const opId = entry.operation?.operationId?.trim();
  if (opId) return slugifyOperationId(opId);
  const path = entry.path
    .replace(/^\/+/, '')
    .replace(/\//g, '-')
    .replace(/\{([^}]*)\}/g, '$1');
  const methodPath =
    `${entry.method.toLowerCase()}-${path}`.replace(/-+/g, '-').replace(/^-|-$/g, '') || 'endpoint';
  const labelSlug = slugifyForFragment(endpointLabel(entry));
  return labelSlug ? `${methodPath}-${labelSlug}` : methodPath;
}

/**
 * Terms that must keep their capitalization in endpoint and category labels
 * (e.g. "CI/CD" not "Ci/cd"). Only whole terms like "API" or "CI/CD" — do NOT add
 * "ID" or "CD" alone, as they would incorrectly change words like "provider" → "proviDer".
 */
const CAPITALIZATION_EXCEPTIONS = [
  'CI/CD',
  'API',
  'SCM',
  'SDLC',
  'SSO',
  'OAuth',
  'REST',
  'JSON',
  'YAML',
  'HTTP',
  'URL',
  'URI',
  'HTML',
  'XML',
  'SCS',
//  'SEI',
];

/**
 * Word-for-word display replacements (e.g. spec says "Cicd" but we show "CI/CD").
 * Applied before capitalization exceptions so "Cicd workflows" → "CI/CD Workflows".
 */
const DISPLAY_REPLACEMENTS: [string, string][] = [
  ['Cicd', 'CI/CD'],
  ['cicd', 'CI/CD'],
];

function escapeForRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Apply DISPLAY_REPLACEMENTS then CAPITALIZATION_EXCEPTIONS. */
function applyCapitalizationExceptions(text: string): string {
  if (!text) return text;
  let result = text;
  for (const [from, to] of DISPLAY_REPLACEMENTS) {
    result = result.replace(new RegExp(`\\b${escapeForRegExp(from)}\\b`, 'g'), to);
  }
  for (const term of CAPITALIZATION_EXCEPTIONS) {
    result = result.replace(new RegExp(escapeForRegExp(term), 'gi'), term);
  }
  return result;
}

/** Human-readable category label: title case on every word (e.g. "License Usage Resource", "Orchestration"). */
export function categoryLabel(category: string): string {
  const titleCased = category
    .replace(/_/g, ' ')
    .split(/\s+|-/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
  return applyCapitalizationExceptions(titleCased);
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

/**
 * Normalize endpoint/sidebar labels: insert space before capitals (ListWebhooks → List Webhooks),
 * collapse multiple spaces, trim.
 */
export function normalizeEndpointLabel(label: string): string {
  if (!label || !label.trim()) return label;
  return label
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // HTTPResponse → HTTP Response
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Standardize operation summary for display: sentence case (first word capitalized, rest lowercase)
 * and remove trailing period. Applied to all API reference modules.
 * CAPITALIZATION_EXCEPTIONS (e.g. CI/CD, API) are restored after sentence case.
 */
export function normalizeOperationSummary(summary: string): string {
  if (!summary || !summary.trim()) return summary;
  const trimmed = summary.trim().replace(/\.+$/, '');
  if (!trimmed) return trimmed;
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return trimmed;
  const sentence = parts
    .map((word, i) => (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()))
    .join(' ');
  return applyCapitalizationExceptions(sentence);
}

export function endpointLabel(entry: EndpointEntry): string {
  const summary = entry.operation?.summary;
  const raw = summary ? summary : `${entry.method.toUpperCase()} ${entry.path}`;
  const withSpaces = normalizeEndpointLabel(raw);
  return summary ? normalizeOperationSummary(withSpaces) : withSpaces;
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
