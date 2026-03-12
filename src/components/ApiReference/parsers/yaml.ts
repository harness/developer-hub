import yaml from 'js-yaml';
import type { OpenApiSpec } from '../types';

/**
 * Dedicated YAML format parser for OpenAPI specs.
 * Used for modules like IaCM and Code Repository whose specs are YAML.
 */
export function parseYamlSpec(text: string): OpenApiSpec {
  const parsed = yaml.load(text);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('YAML spec did not parse to an object');
  }
  return parsed as OpenApiSpec;
}
