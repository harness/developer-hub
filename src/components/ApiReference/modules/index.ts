/**
 * API Reference modules registry.
 * Aggregates per-module configs from modules/<module-id>/config.ts and optional
 * parsers from modules/<module-id>/parser.ts so each module can be customized without impacting others.
 */
import type { ApiReferenceModuleConfig } from './types';
import type { OpenApiSpec } from '../types';
import codeRepository from './code-repository/config';
import infraAsCodeManagement from './infra-as-code-management/config';
import artifactRegistry from './artifact-registry/config';
// import securitySupplyChain from './software-supply-chain-assurance/config';
// import { parseSpec as softwareSupplyChainParseSpec } from './software-supply-chain-assurance/parser';
import releaseManagement from './release-management/config';
// import softwareEngineeringInsights from './software-engineering-insights/config';

const MODULE_CONFIGS: Record<string, ApiReferenceModuleConfig> = {
  'code-repository': codeRepository,
  'infra-as-code-management': infraAsCodeManagement,
  'artifact-registry': artifactRegistry,
  // 'software-supply-chain-assurance': securitySupplyChain,
  'release-management': releaseManagement,
//  'software-engineering-insights': softwareEngineeringInsights,
};

/** Optional per-module spec parser. Receives raw parsed spec; returns normalized OpenApiSpec for the UI. */
type SpecParser = (spec: unknown) => OpenApiSpec;

const MODULE_PARSERS: Partial<Record<string, SpecParser>> = {
  // 'software-supply-chain-assurance': softwareSupplyChainParseSpec,
};

export type { ApiReferenceModuleConfig };

export const apiReferenceModules: Record<string, ApiReferenceModuleConfig> = MODULE_CONFIGS;

export function getApiReferenceModule(moduleId: string): ApiReferenceModuleConfig | null {
  return MODULE_CONFIGS[moduleId] ?? null;
}

export function getApiReferenceModuleIds(): string[] {
  return Object.keys(MODULE_CONFIGS);
}

/**
 * Returns the module's spec parser if it has one. Call after loading the raw spec
 * to apply module-specific normalization when needed.
 */
export function getSpecParser(moduleId: string): SpecParser | null {
  const fn = MODULE_PARSERS[moduleId];
  return typeof fn === 'function' ? fn : null;
}

/** Build docs path segment -> module id from configs that set docsPathSegment */
function buildDocsPathToModule(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [moduleId, config] of Object.entries(MODULE_CONFIGS)) {
    if (config.docsPathSegment) map[config.docsPathSegment] = moduleId;
  }
  return map;
}

/** Build module id -> docs path segment */
function buildModuleToDocsPath(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [moduleId, config] of Object.entries(MODULE_CONFIGS)) {
    map[moduleId] = config.docsPathSegment ?? moduleId;
  }
  return map;
}

const DOCS_PATH_TO_API_MODULE = buildDocsPathToModule();
const API_MODULE_TO_DOCS_PATH = buildModuleToDocsPath();

export function getApiRefModuleIdFromDocsPath(docsPathSegment: string): string {
  return DOCS_PATH_TO_API_MODULE[docsPathSegment] ?? docsPathSegment;
}

export function getDocsBasePathForModule(apiRefModuleId: string): string {
  const segment = API_MODULE_TO_DOCS_PATH[apiRefModuleId] ?? apiRefModuleId;
  return `/docs/${segment}`;
}

export function getDocsPathSegmentFromActivePath(activePath: string): string | null {
  const first = activePath?.replace(/^\/+/, '').split('/')[0];
  if (!first) return null;
  return API_MODULE_TO_DOCS_PATH[first] ?? first;
}

type SidebarItemLike = { type: string; href?: string; items?: SidebarItemLike[] };

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
