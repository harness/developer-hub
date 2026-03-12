import type { ApiReferenceModuleConfig } from '../types';

const config: ApiReferenceModuleConfig = {
  name: 'Artifact Registry',
  specUrl: 'https://app.harness.io/prod1/har/swagger.json',
  specFormat: 'json',
  baseUrl: 'https://app.harness.io/prod1',
  pathPrefix: '/har/api',
  sidebarIconClass: 'sidebar-har',
  iconPath: '/img/icon_artifact_registry.svg',
};

export default config;
