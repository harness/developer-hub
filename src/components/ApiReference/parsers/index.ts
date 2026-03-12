/**
 * Format-level parsers for OpenAPI specs. Use these to parse by format (YAML vs JSON);
 * then optionally run a per-module parser (e.g. modules/<module-id>/parser.ts) for oddities.
 */
import type { OpenApiSpec } from '../types';
import type { SpecFormat } from '../modules/types';
import { parseYamlSpec } from './yaml';
import { parseJsonSpec } from './json';

export { parseYamlSpec } from './yaml';
export { parseJsonSpec } from './json';
export { parseJsonInWorker } from './parseJsonInWorker';

/**
 * Parse spec text using the appropriate format parser.
 * Use for remote spec URLs; static files at /api-specs/<id>.json are always JSON.
 */
export function parseSpecByFormat(text: string, format: SpecFormat): OpenApiSpec {
  switch (format) {
    case 'yaml':
      return parseYamlSpec(text);
    case 'json':
    default:
      return parseJsonSpec(text);
  }
}
