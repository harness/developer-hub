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
      name: "Continuous Delivery & GitOps Docs",
      description:
        "These are prudent topics to Continuous Delivery.",
      list: [
        {
          title: "Onboard with Continuous Delivery",
          module: "cd",
          description:
            "This topic covers onboarding with Continuous Delivery.",
          link: "/docs/category/onboard-with-continuous-delivery",
        },
        {
          title: "Services",
          module: "cd",
          description:
            "This topic covers Services.",
          link: "/docs/category/services",
        },
        {
          title: "Infrastructure",
          module: "cd",
          description:
            "This topic covers Infrastructure.",
          link: "/docs/category/infrastructure",
        },
        {
          title: "Execution",
          module: "cd",
          description:
            "This topic covers Execution.",
          link: "/docs/category/execution",
        },
        {
          title: "Deployments",
          module: "cd",
          description:
            "This topic covers Deployments.",
          link: "/docs/category/deployments",
        },
        {
          title: "GitOps",
          module: "cd",
          description:
            "This topic covers GitOps.",
          link: "/docs/category/gitops",
        },
        {
          title: "Advanced CD",
          module: "cd",
          description:
            "This topic covers Advanced CD.",
          link: "/docs/category/advanced-cd",
        },
        {
          title: "CD Dashboards",
          module: "cd",
          description:
            "This topic covers CD Dashboards.",
          link: "/docs/category/cd-dashboards",
        },
        {
          title: "CD Tech Reference",
          module: "cd",
          description:
            "This topic covers CD Tech References.",
          link: "/docs/category/cd-tech-reference",
        },
      ],
    },
  ];
  /* Define the cards - end */