import type { OpenApiSpec } from '../../types';

/** Known subwords for splitting run-together tag names (e.g. licenseusageresource → license usage resource). Sorted by length descending. */
const SCS_TAG_WORDS = [
  'orchestration',
  'enforcement',
  'remediation',
  'violation',
  'artifact',
  'resource',
  'summary',
  'details',
  'download',
  'process',
  'policy',
  'config',
  'license',
  'usage',
  'token',
  'sbom',
  'drift',
];

/**
 * Normalize SCS category/tag names for display: split camelCase and run-together words,
 * then sentence case (e.g. "Licenseusageresource" → "License usage resource").
 */
function normalizeScsTagName(tag: string): string {
  if (!tag || !tag.trim()) return tag;
  // 1) Split camelCase / PascalCase: space before uppercase that follows lowercase
  let out = tag
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  // 2) Split run-together lowercase by inserting space around known words (e.g. licenseusageresource → license usage resource)
  const re = new RegExp(`(${SCS_TAG_WORDS.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  out = out.replace(re, ' $1 ');
  out = out.replace(/\s+/g, ' ').trim();
  if (!out) return tag;
  return out.charAt(0).toUpperCase() + out.slice(1).toLowerCase();
}

/**
 * SCS (Software Supply Chain Assurance) parser extension.
 * Applies module-specific normalization to the raw parsed spec before the UI uses it.
 * Runs after format parsing (YAML/JSON); x-internal filtering is done later in getEndpointsFromSpec.
 */
export function parseSpec(spec: unknown): OpenApiSpec {
  const s = spec as OpenApiSpec;
  if (!s || typeof s !== 'object') return s as OpenApiSpec;

  // Ensure servers has a sensible default for Try It / display (config.pathPrefix is applied separately)
  if (!s.servers?.length && s.info) {
    s.servers = [{ url: 'https://app.harness.io', description: 'Harness host URL' }];
  }

  // Normalize category/tag names for display (e.g. Licenseusageresource → License usage resource)
  const tagNameMap = new Map<string, string>();
  function normalizedTag(name: string): string {
    if (!name || typeof name !== 'string') return name;
    let normalized = tagNameMap.get(name);
    if (normalized === undefined) {
      normalized = normalizeScsTagName(name);
      tagNameMap.set(name, normalized);
    }
    return normalized;
  }
  if (Array.isArray(s.tags)) {
    for (const t of s.tags) {
      if (t && typeof t === 'object' && typeof (t as { name?: string }).name === 'string') {
        (t as { name: string }).name = normalizedTag((t as { name: string }).name);
      }
    }
  }
  const paths = s.paths ?? {};
  for (const pathItem of Object.values(paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const;
    for (const method of methods) {
      const op = (pathItem as Record<string, unknown>)[method];
      if (op && typeof op === 'object' && Array.isArray((op as { tags?: string[] }).tags)) {
        const tags = (op as { tags: string[] }).tags;
        for (let i = 0; i < tags.length; i++) {
          if (typeof tags[i] === 'string') tags[i] = normalizedTag(tags[i]);
        }
      }
    }
  }

  return s;
}
