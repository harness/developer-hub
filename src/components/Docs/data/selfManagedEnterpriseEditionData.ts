import {
    CardItem,
    CardSections,
    docType,
  } from "@site/src/components/LandingPage/TutorialCard";
  import { MODULES } from "@site/src/constants"

  
  /* Define the cards - start */
  export const featuredTutorials: CardItem[] = []
/* Uncomment if you want to show the Featured Tutorials section -->
  // Featured Tutorials
  export const featuredTutorials: CardItem[] = [
      {
        title: "Get started for free with the fastest CI on the planet",
        module: MODULES.ci,
        icon: "img/icon_ci.svg",
        description: "Get started with Harness CI and explore some of the features that make it four times faster than the leading competitor.",
        newDoc: true,
        type: [docType.Documentation],
        time: "5min",
        link: "/tutorials/build-code/fastest-ci",
      },
      {
        title: "Terraform Cloud notification triggers",
        module: MODULES.ci,
        icon: "img/icon_ci.svg",
        description: "Terraform Cloud notifications can automatically trigger CI pipelines.",
        newDoc: true,
        type: [docType.Documentation],
        time: "9min",
        link: "/tutorials/build-code/tfc-notification",
      },
    ];
    */
    
    // Docs
    export const docsCards: CardSections = [
      {
        name: "Get started",
        description:
          "",
        list: [
          {
            title: "Install using Helm",
            module: MODULES.platform,
            description:
              "Learn how to use Helm to install Harness Self-Managed Enterprise Edition.",
            link: "/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-harness-self-managed-enterprise-edition-using-helm-ga",
          },
          {
            title: "Install in an air-gapped environment",
            module: MODULES.platform,
            description:
              "Learn how to use Helm to install in an air-gapped environment.",
            link: "/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-in-an-air-gapped-environment",
          },
          {
            title: "Overview",
            module: MODULES.platform,
            description:
              "Learn the differences between Harness SaaS and self-managed products.",
            link: "/docs/self-managed-enterprise-edition/introduction/harness-self-managed-enterprise-edition-overview",
          },
        ],
      },
      {
        name: "Feature highlights",
        description:
          "",
        list: [
          {
            title: "Monitoring",
            module: MODULES.platform,
            description:
              "Learn how to monitor the infrastructure of your installation.",
            link: "/docs/self-managed-enterprise-edition/monitor-harness-on-prem",
          },
          {
            title: "Back up and restore",
            module: MODULES.platform,
            description:
              "Learn how to back up and restore Harness Self-Managed Enterprise Edition.",
            link: "/docs/self-managed-enterprise-edition/back-up-and-restore-helm",
          },
        ],
      },
    ];
    /* Define the cards - end */
