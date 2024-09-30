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
    link: "/kb/continuous-delivery/articles/create-cascading-fields-jira",
  },
  {
    title: "ServiceNow create, update, and approval API permissions",
    module: MODULES.cd,
    date: "April 22, 2024",
    link: "/kb/continuous-delivery/articles/servicenow-api-permission",
  },  
  {
    title: "Send Dashboard Reports to Slack Channel",
    module: MODULES.ccm,
    date: "Sept 08, 2023",
    link: "/kb/cloud-cost-management/articles/slack-email-alert",
  },
  {
    title: "Mount Custom Cert in Delegate via ConfigMap",
    module: MODULES.platform,
    date: "July 31, 2023",
    link: "/kb/platform/articles/mount-custom-cert-with-delegate",
  },
];
