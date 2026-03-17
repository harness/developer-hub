import type { ApiReferenceModuleConfig } from '../types';

/**
 * Spec is loaded from the local openapi.yaml in this folder.
 * The fetch-api-specs script copies it to static/api-specs/software-engineering-insights.json at build time.
 */
const config: ApiReferenceModuleConfig = {
  name: 'Software Engineering Insights',
  specFormat: 'yaml',
  pathPrefix: '/software-engineering-insights',
  sidebarIconClass: 'sidebar-sei',
  iconPath: '/img/icon_sei.svg',
  docsPathSegment: 'software-engineering-insights',
};

export default config;
