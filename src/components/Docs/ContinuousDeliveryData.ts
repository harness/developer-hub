import {
  CardItem,
  CardSections,
  docType,
} from "../LandingPage/TutorialCard";

/* Define the cards - start */
// Featured Tutorials
export const featuredTutorials: CardItem[] = [
    {
      title: "Deploy a Helm Chart using Harness GitOps for Argo CD",
      module: "cd",
      icon: "img/icon_cd.svg",
      description: "Get started with Harness GitOps for Argo CD.",
      newDoc: true,
      type: [docType.Documentation],
      time: "8min",
      link: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
    },
    {
      title: "Deploy a Helm Chart using CD Community Edition",
      module: "cd",
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
          module: "cd",
          description:
            "Learn the basics of Harness Continuous Delivery.",
          link: "/docs/category/onboard-with-continuous-delivery",
        },
        {
          title: "Services",
          module: "cd",
          description:
            "Use Harness services to define your microservices and other workloads.",
          link: "/docs/category/services",
        },
        {
          title: "Infrastructure",
          module: "cd",
          description:
            "Define the target infrastructures for your deployments.",
          link: "/docs/category/infrastructure",
        },
        {
          title: "Execution",
          module: "cd",
          description:
            "Use built-in steps to model your release process.",
          link: "/docs/category/execution",
        },
        {
          title: "Deployments",
          module: "cd",
          description:
            "Manage how deployments impact your resources.",
          link: "/docs/category/deployments",
        },
        {
          title: "GitOps",
          module: "cd",
          description:
            "Use Harness GitOps to perform Ops tasks.",
          link: "/docs/category/gitops",
        },
        {
          title: "Advanced CD",
          module: "cd",
          description:
            "In depth topics to take your CD to the next level.",
          link: "/docs/category/advanced-cd",
        },
        {
          title: "CD Dashboards",
          module: "cd",
          description:
            "Use DORA and other advanced metrics for deployments.",
          link: "/docs/category/cd-dashboards",
        },
        {
          title: "CD Tech Reference",
          module: "cd",
          description:
            "Quickly reference settings, permissions, etc.",
          link: "/docs/category/cd-tech-reference",
        },
      ],
    },
  ];
  /* Define the cards - end */