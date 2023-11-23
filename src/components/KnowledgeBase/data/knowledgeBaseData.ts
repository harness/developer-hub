import { MODULES } from "../../../constants";

export type CardItem = {
  title: string;
  /*
  MODULES.ci | MODULES.cd | MODULES.ff | MODULES.ccm |
  MODULES.sto | MODULES.srm | MODULES.ce | MODULES.platform
  */
  module: MODULES;
  description?: JSX.Element | string;
  date?: string;
  link?: string;
};

export const knowledgeBaseList: CardItem[] = [
  {
    title: "Using a String List in Repeat Strategy",
    module: MODULES.cd,
    date: "Oct 19, 2023",
    link: "/kb/continuous-delivery/articles/repeat-strategy",
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
