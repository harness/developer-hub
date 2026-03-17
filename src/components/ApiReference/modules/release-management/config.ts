import type { ApiReferenceModuleConfig } from '../types';

const config: ApiReferenceModuleConfig = {
  name: 'Release Orchestration',
  specUrl: 'https://app.harness.io/prod1/rmg/swagger/doc.json',
  specFormat: 'json',
  baseUrl: 'https://app.harness.io/prod1',
  pathPrefix: '/rmg/api',
  sidebarIconClass: 'sidebar-rm',
  iconPath: '/img/icon-rm.svg',
};

export default config;
