/**
 * API Reference module configuration.
 * Re-exports from the per-module registry (modules/index.ts) so existing imports keep working.
 * Add or edit a module under modules/<module-id>/config.ts and optionally modules/<module-id>/parser.ts.
 */
export {
  getApiReferenceModule,
  getApiReferenceModuleIds,
  getApiRefModuleIdFromDocsPath,
  getDocsBasePathForModule,
  getDocsPathSegmentFromActivePath,
  getApiRefModuleIdFromSidebarItems,
  getSpecParser,
  apiReferenceModules,
} from './modules';

export type { ApiReferenceModuleConfig } from './modules';
