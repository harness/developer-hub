import {
    CardItem,
    CardSections,
    docType,
  } from "../../LandingPage/TutorialCard";
  
  /* Define the cards - start */
  // Featured Tutorials
  export const featuredTutorials: CardItem[] = [
    
      {
        title: "Optimize Cloud Costs for Kubernetes",
        module: "cd",
        icon: "img/icon_ccm.svg",
        description: "Get started with optimizing your Kubernetes cloud costs by connecting your public cloud Kubernetes cluster to Harness.",
        newDoc: true,
        type: [docType.Documentation],
        time: "10min",
        link: "/tutorials/manage-cloud-costs/ccm-first-kubernetes-tutorial",
      },
    ];
    
    // Docs
    export const docsCards: CardSections = [
      {
        name: "Get started",
        description:
          "",
        list: [
          {
            title: "Get started with Cloud Cost Management",
            module: "ccm",
            description:
              "Learn the basic concepts of Harness Cloud Cost Management, and how to set up CCM for your cloud accounts.",
            link: "/docs/category/get-started-1",
          },
          {
            title: "Cost reporting",
            module: "ccm",
            description:
              "Monitor and analyze the expenses incurred by your cloud resources by using Harness' cost reporting features.",
            link: "/docs/category/cost-reporting",
          },
          {
            title: "Cost optimization",
            module: "ccm",
            description:
              "Optimize cloud costs using CCM recommendations and AutoStopping idle cloud instances.",
            link: "/docs/category/cost-optimization",
          },
          {
            title: "Cost governance",
            module: "ccm",
            description:
              "Manage your cloud environment and cloud spend using the asset governance rules and budgets.",
            link: "/docs/category/deploy-services-on-different-platforms",
          },
          {
            title: "Currency prefereces",
            module: "ccm",
            description:
              "Use your preferred currency throughout Harness CCM by standardizing the currency.",
            link: "/docs/category/cross-platform-cd-features",
          },
          {
            title: "Third-party integrations",
            module: "ccm",
            description:
              "Monitor your cloud costs by integrating CCM with third-party tools such as Datadog.",
            link: "/docs/category/third-party-integrations",
          },
        ],
      },
    ];
    /* Define the cards - end */