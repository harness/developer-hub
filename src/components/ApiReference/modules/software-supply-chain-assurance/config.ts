import type { ApiReferenceModuleConfig } from '../types';

/**
 * Spec is loaded from the local openapi.yaml in this folder.
 * The fetch-api-specs script copies it to static/api-specs/software-supply-chain-assurance.json at build time.
 */
const config: ApiReferenceModuleConfig = {
  name: 'Security Supply Chain',
  specFormat: 'yaml',
  pathPrefix: '/scs',
  sidebarIconClass: 'sidebar-scs',
  iconPath: '/img/icon_ssca.svg',
  docsPathSegment: 'software-supply-chain-assurance',
};

export default config;
