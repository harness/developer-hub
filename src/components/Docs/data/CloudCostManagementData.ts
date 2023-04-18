import {
    CardItem,
    CardSections,
    docType,
  } from "../../LandingPage/TutorialCard";
  
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
            title: "Get started with Continuous Delivery",
            module: "cd",
            description:
              "Learn the basics of Harness Continuous Delivery.",
            link: "/docs/category/get-started",
          },
          {
            title: "Integrations",
            module: "cd",
            description:
              "See the tools and platforms you can use to deploy your apps.",
            link: "/docs/continuous-delivery/integrations/cd-integrations",
          },
          {
            title: "Provision infrastructure",
            module: "cd",
            description:
              "Provision infrastructures for your deployments.",
            link: "/docs/category/provision-infrastructure",
          },
          {
            title: "Deploy services on different platforms",
            module: "cd",
            description:
              "Platform-specific deployment types.",
            link: "/docs/category/deploy-services-on-different-platforms",
          },
          {
            title: "Cross-platform CD features",
            module: "cd",
            description:
              "Features common to all deployment types.",
            link: "/docs/category/cross-platform-cd-features",
          },
          {
            title: "Verify deployments",
            module: "cd",
            description:
              "Use Harness Continuous Verification (CV) to verify your deployments.",
            link: "/docs/category/verify-deployments",
          },
          {
            title: "Manage deployments",
            module: "cd",
            description:
              "Control deployment resources and schedules.",
            link: "/docs/continuous-delivery",
          },
          {
            title: "Monitor deployments",
            module: "cd",
            description:
              "Use DORA and other advanced metrics for deployments.",
            link: "/docs/category/monitor-deployments",
          },
          {
            title: "GitOps",
            module: "cd",
            description:
              "Perform GitOps deployments in Harness.",
            link: "/docs/category/gitops",
          },
        ],
      },
    ];
    /* Define the cards - end */