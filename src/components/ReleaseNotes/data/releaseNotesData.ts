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
        link: "/tutorials/ci-pipelines/build/tfc-notification",
      },
    ];
    */
    
    // Docs
    export const docsCards: CardSections = [
      {
        name: "Harness Platform release notes",
        description:
          "",
        list: [
          {
            title: "Platform release notes",
            module: MODULES.platform,
            description:
              "",
            link: "/release-notes/platform",
          },
          {
            title: "Delegate release notes",
            module: MODULES.platform,
            description:
              "",
            link: "/release-notes/delegate",
          },
          {
            title: "Self-Managed Enterprise Edition release notes",
            module: MODULES.platform,
            description:
              "",
            link: "/release-notes/self-managed-enterprise-edition",
          },
        ],
      },
      {
        name: "Module release notes",
        description:
          "",
        list: [
          {
            title: "Chaos Engineering release notes",
            module: MODULES.ce,
            description:
              "",
            link: "/release-notes/chaos-engineering",
          },
          {
            title: "Cloud Cost Management release notes",
            module: MODULES.ccm,
            description:
              "",
            link: "/release-notes/cloud-cost-management",
          },
          {
            title: "Code Repository release notes",
            module: MODULES.code,
            description:
              "",
            link: "/release-notes/code-repository",
          },
          {
            title: "Continuous Delivery and GitOps release notes",
            module: MODULES.cd,
            description:
              "",
            link: "/release-notes/continuous-delivery",
          },
          {
            title: "Continuous Error Tracking release notes",
            module: MODULES.cet,
            description:
              "",
            link: "/release-notes/continuous-error-tracking",
          },
          {
            title: "Continuous Integration release notes",
            module: MODULES.ci,
            description:
              "",
            link: "/release-notes/continuous-integration",
          },
          {
            title: "Feature Flags release notes",
            module: MODULES.ff,
            description:
              "",
            link: "/release-notes/feature-flags",
          },
          {
            title: "Internal Developer Portal release notes",
            module: MODULES.idp,
            description:
              "",
            link: "/release-notes/internal-developer-portal",
          },
          {
            title: "Security Testing Orchestration release notes",
            module: MODULES.sto,
            description:
              "",
            link: "/release-notes/security-testing-orchestration",
          },
          {
            title: "Service Reliability Management release notes",
            module: MODULES.srm,
            description:
              "",
            link: "/release-notes/service-reliability-management",
          },
          {
            title: "Software Supply Chain Assurance release notes",
            module: MODULES.ssca,
            description:
              "",
            link: "/release-notes/software-supply-chain-assurance",
          },
          {
            title: "Software Engineering Insights release notes",
            module: MODULES.sei,
            description:
              "",
            link: "/release-notes/software-engineering-insights",
          },
        ],
      },
      {
        name: "Security advisories",
        description:
          "",
        list: [
          {
            title: "Harness Trust Center - Security advisories",
            module: MODULES.platform,
            description:
              "Harness publishes security advisories for every release on the Harness Trust Center.",
            link: "https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card",
          },
        ],
      },
      {
        name: "FirstGen release notes",
        description:
          "",
        list: [
          {
            title: "FirstGen SaaS release notes",
            module: MODULES.platform,
            description:
              "",
            link: "/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes",
          },
          {
            title: "FirstGen Self-Managed Enterprise Edition release notes",
            module: MODULES.platform,
            description:
              "",
            link: "/docs/first-gen/firstgen-release-notes/harness-on-prem-release-notes",
          },
        ],
      },
    ];
    /* Define the cards - end */
