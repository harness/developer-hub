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
    title: "Continuous Verification - Machine Learning Usage",
    module: MODULES.cd,
    date: "April 12, 2023",
    link: "/kb/continuous-delivery/continuous-verification-ml",
  },
  {
    title: "Continuous Verification - Templates",
    module: MODULES.cd,
    date: "April 12, 2023",
    link: "/kb/continuous-delivery/continuous-verification-templates",
  },
  {
    title: "Continuous Verification - Results",
    module: MODULES.cd,
    date: "April 12, 2023",
    link: "/kb/continuous-delivery/continuous-verification-results",
  },
  {
    title: "How Can I Troubleshoot The Delegate Installation Error with Readiness Probe Failure in GKE?",
    module: MODULES.platform,
    date: "April 06, 2023",
    link: "/kb/platform/delegate_installation_gke_error",
  },
  {
    title: "Build and Push to ECR Permission Troubleshooting",
    module: MODULES.ci,
    date: "March 30, 2023",
    link: "/kb/continuous-integration/delegate_eks_cluster",
  },
  {
    title: "Why Am I Getting “Kaniko Container Runtime Error”",
    module: MODULES.ci,
    date: "March 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
];