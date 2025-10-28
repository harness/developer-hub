import { MODULES } from "../../../constants";

export type CardItem = {
  title: string;
  /*
  MODULES.ci | MODULES.cd | MODULES.ff | MODULES.ccm | MODULES.idp | MODULES.sei |
  MODULES.sto | MODULES.srm | MODULES.ce | MODULES.platform | MODULES.dbdevops
  */
  module: MODULES;
  description?: JSX.Element | string;
  date?: string;
  link?: string;
};

export const knowledgeBaseList: CardItem[] = [
  {
    title: "Use the HTTP step to set unsupported fields when creating Jira issues",
    module: MODULES.cd,
    date: "May 14, 2024",
    link: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-cascading-fields-jira",
  },
  {
    title: "ServiceNow create, update, and approval API permissions",
    module: MODULES.cd,
    date: "April 22, 2024",
    link: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/servicenow-api-permission",
  },  
  {
    title: "Mount Custom Cert in Delegate via ConfigMap",
    module: MODULES.platform,
    date: "July 31, 2023",
    link: "/docs/platform/knowledgebase/articles/mount-custom-cert-with-delegate",
  },
];
