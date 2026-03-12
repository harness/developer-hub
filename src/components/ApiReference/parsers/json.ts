import type { OpenApiSpec } from '../types';

/**
 * Dedicated JSON format parser for OpenAPI specs.
 * Used for modules like HAR (Artifact Registry) whose specs are JSON.
 */
export function parseJsonSpec(text: string): OpenApiSpec {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('Spec text is empty');
  }
  const parsed = JSON.parse(trimmed);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('JSON spec did not parse to an object');
  }
  return parsed as OpenApiSpec;
}
