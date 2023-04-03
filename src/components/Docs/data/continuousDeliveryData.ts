import {
  CardItem,
  CardSections,
  docType,
} from "../../LandingPage/TutorialCard";
import { MODULES } from "../../../constants"

/* Define the cards - start */
// Featured Tutorials
export const featuredTutorials: CardItem[] = [
    {
      title: "Deploy a Helm Chart using Harness GitOps for Argo CD",
      module: MODULES.cd,
      icon: "img/icon_cd.svg",
      description: "Get started with Harness GitOps for Argo CD.",
      newDoc: true,
      type: [docType.Documentation],
      time: "8min",
      link: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
    },
    {
      title: "Deploy a Helm Chart using CD Community Edition",
      module: MODULES.cd,
      icon: "img/icon_cd.svg",
      description: "Use the 100% free, source-available, self-managed Harness CD Community Edition to automate Helm Chart deployments.",
      newDoc: true,
      type: [docType.Documentation],
      time: "10min",
      link: "/tutorials/deploy-services/cdce-helm-k8s",
    },
  ];
  
  // Docs
  export const docsCards: CardSections = [
    {
      name: "Documentation Topics",
      description:
        "",
      list: [
        {
          title: "Onboard with Continuous Delivery",
          module: MODULES.cd,
          description:
            "Learn the basics of Harness Continuous Delivery.",
          link: "/docs/category/onboard-with-continuous-delivery",
        },
        {
          title: "Services",
          module: MODULES.cd,
          description:
            "Use Harness services to define your microservices and other workloads.",
          link: "/docs/category/services",
        },
        {
          title: "Infrastructure",
          module: MODULES.cd,
          description:
            "Define the target infrastructures for your deployments.",
          link: "/docs/category/infrastructure",
        },
        {
          title: "Execution",
          module: MODULES.cd,
          description:
            "Use built-in steps to model your release process.",
          link: "/docs/category/execution",
        },
        {
          title: "Deployments",
          module: MODULES.cd,
          description:
            "Manage how deployments impact your resources.",
          link: "/docs/category/deployments",
        },
        {
          title: "GitOps",
          module: MODULES.cd,
          description:
            "Use Harness GitOps to perform Ops tasks.",
          link: "/docs/category/gitops",
        },
        {
          title: "Advanced CD",
          module: MODULES.cd,
          description:
            "In depth topics to take your CD to the next level.",
          link: "/docs/category/advanced-cd",
        },
        {
          title: "CD Dashboards",
          module: MODULES.cd,
          description:
            "Use DORA and other advanced metrics for deployments.",
          link: "/docs/category/cd-dashboards",
        },
        {
          title: "CD Tech Reference",
          module: MODULES.cd,
          description:
            "Quickly reference settings, permissions, etc.",
          link: "/docs/category/cd-tech-reference",
        },
      ],
    },
  ];
  /* Define the cards - end */