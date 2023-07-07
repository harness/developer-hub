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
    title: "Verifying New Deployment Metrics with Continuous Verification",
    module: MODULES.cd,
    date: "July 05, 2023",
    link: "/kb/continuous-delivery/articles/cv-new-deployment-metrics",
  },
  {
    title: "Debugging AKS Permission Issues",
    module: MODULES.cd,
    date: "June 22, 2023",
    link: "/kb/continuous-delivery/articles/aks-permission-issues",
  },
  {
    title: "Multi Service Deployments with Continuous Verification",
    module: MODULES.cd,
    date: "May 05, 2023",
    link: "/kb/continuous-delivery/articles/cv-multi-service",
  },
  {
    title: "How Can I Troubleshoot The Delegate Installation Error with Readiness Probe Failure in GKE?",
    module: MODULES.platform,
    date: "April 06, 2023",
    link: "/kb/platform/articles/delegate_installation_gke_error",
  },
  {
    title: "Build and Push to ECR Permission Troubleshooting",
    module: MODULES.ci,
    date: "March 30, 2023",
    link: "/kb/continuous-integration/articles/delegate_eks_cluster",
  },
  {
    title: "Why Am I Getting “Kaniko Container Runtime Error”",
    module: MODULES.ci,
    date: "March 23, 2023",
    link: "/kb/continuous-integration/articles/kaniko_container_runtime_error",
  },
];
