import type { ApiReferenceModuleConfig } from '../types';

const config: ApiReferenceModuleConfig = {
  name: 'Infrastructure as Code Management',
  specUrl: 'https://qa.harness.io/iacm/openapi3.yaml',
  specFormat: 'yaml',
  pathPrefix: '/iacm',
  sidebarIconClass: 'sidebar-iacm',
  iconPath: '/img/iacm-icon.svg',
  docsPathSegment: 'infrastructure-as-code-management',
};

export default config;
