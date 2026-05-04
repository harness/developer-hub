import type { ApiReferenceModuleConfig } from '../types';

const config: ApiReferenceModuleConfig = {
  name: 'Database DevOps',
  specUrl: 'https://app.harness.io/prod1/dbops/swagger.json',
  specFormat: 'json',
  pathPrefix: '/dbops',
  sidebarIconClass: 'sidebar-dbops',
  iconPath: '/img/icon_dbdevops.svg',
  docsPathSegment: 'database-devops',
};

export default config;
