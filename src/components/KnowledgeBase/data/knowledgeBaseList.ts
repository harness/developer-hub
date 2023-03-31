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
    title: "Why Am I Getting “Kaniko Container Runtime Error”",
    module: MODULES.ci,
    date: "March 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
  {
    title: "Build and Push to ECR Permission Troubleshooting",
    module: MODULES.ci,
    date: "March 30, 2023",
    link: "/kb/continuous-integration/delegate_eks_cluster",
  },
];