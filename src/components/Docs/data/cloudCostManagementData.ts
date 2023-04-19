import {
    CardItem,
    CardSections,
    docType,
  } from "../../LandingPage/TutorialCard";
  
  /* Define the cards - start */
  // Featured Tutorials
  /*export const featuredTutorials: CardItem[] = [
    
      {
        title: "Optimize Cloud Costs for Kubernetes",
        module: "ccm",
        icon: "img/icon_ccm.svg",
        description: "Get started with optimizing your Kubernetes cloud costs by connecting your public cloud Kubernetes cluster to Harness.",
        newDoc: true,
        type: [docType.Documentation],
        time: "10min",
        link: "/tutorials/manage-cloud-costs/ccm-first-kubernetes-tutorial",
      },
    ];*/
    
    // Docs
    export const docsCards: CardSections = [
      {
        name: "Documentation topics",
        description:
          "",
        list: [
          {
            title: "Get started with Cloud Cost Management",
            module: "ccm",
            description:
              "Learn the basic concepts of Harness Cloud Cost Management and how to set up CCM for your cloud accounts.",
            link: "/docs/category/get-started-1",
          },
          {
            title: "Cost reporting",
            module: "ccm",
            description:
              "Monitor and analyze expenses incurred by your cloud assets using Harness's cost reporting capabilities.",
            link: "/docs/category/cost-reporting",
          },
          {
            title: "Cost optimization",
            module: "ccm",
            description:
              "Optimize cloud costs using CCM recommendations and auto-stopping idle cloud instances.",
            link: "/docs/category/cost-optimization",
          },
          {
            title: "Cost governance",
            module: "ccm",
            description:
              "Manage your cloud environment and cloud spend using the asset governance rules and budgets.",
            link: "/docs/category/cost-governance",
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
      {
        name: "Key features and FAQs",
        description:
          "",
        list: [
          {
            title: "AutoStopping rules",
            module: "ccm",
            description:
              "AutoStopping Rules make sure that your non-production resources run only when used, and never when idle.",
            link: "/docs/category/autostopping-rules",
          },
          {
            title: "Cloud cost recommendations",
            module: "ccm",
            description:
              "Optimize cloud costs by applying CCM recommendations.",
            link: "/docs/category/recommendations",
          },
          {
            title: "Currency preferences",
            module: "ccm",
            description:
              "Use your preferred currency throughout Harness CCM.",
            link: "/docs/cloud-cost-management/use-ccm-cost-reporting/currency-preferences",
          },
          {
            title: "Cost categories",
            module: "ccm",
            description:
              "Use cost categories to take data across multiple sources and attribute it to business contexts.",
            link: "/docs/category/cost-categories",
          },
          {
            title: "Detect cost anomalies",
            module: "ccm",
            description:
              "Identify unusual or unexpected changes in your cloud service expenses.",
            link: "/docs/cloud-cost-management/use-ccm-cost-reporting/detect-cloud-cost-anomalies-with-ccm",
          },
        
          {
            title: "CCM FAQs",
            module: "ccm",
            description:
              "",
            link: "/docs/frequently-asked-questions/harness-faqs/cloud-cost-management-faqs",
          },
        ],
    },
  ];
    /* Define the cards - end */