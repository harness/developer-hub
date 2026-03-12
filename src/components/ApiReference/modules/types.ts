/**
 * Per-module API Reference configuration.
 * Each module has its own config under modules/<module-id>/config.ts.
 */
/** Spec format used to choose the format parser (YAML for IaCM/code repo, JSON for HAR). */
export type SpecFormat = 'yaml' | 'json';

export interface ApiReferenceModuleConfig {
  name: string;
  specUrl: string;
  /**
   * Spec format for parsing when loading from remote URL. Static files are always JSON.
   * Used by the dedicated YAML vs JSON format parsers.
   */
  specFormat?: SpecFormat;
  /**
   * Full path prefix between base URL and spec paths (e.g. /har/api or /iacm).
   * No default segment (e.g. /api) is assumed; this is the complete prefix.
   */
  pathPrefix?: string;
  /**
   * Base URL for Try It and displayed request URLs. When set, used instead of the spec's servers[0].url
   * so the full URL is baseUrl + pathPrefix + path (e.g. https://app.harness.io/prod1 + /har/api + /v1/...).
   */
  baseUrl?: string;
  /** Sidebar icon class used in docs (e.g. sidebar-iacm) for matching module header style */
  sidebarIconClass?: string;
  /** Icon path for module header (same as Docs landing, e.g. /img/iacm-icon.svg) */
  iconPath?: string;
  /**
   * Docs URL path segment when it differs from module id (e.g. infra-as-code-management uses
   * docs path "infrastructure-as-code-management"). Used for Documentation link and sidebar resolution.
   */
  docsPathSegment?: string;
}
