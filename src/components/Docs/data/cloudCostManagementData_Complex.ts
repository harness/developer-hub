import {
    CardItem,
    CardSections,
    docType,
  } from "../../LandingPage/TutorialCard";
  import { MODULES } from "../../../constants"

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
        name: "Key features",
        description:
          "",
        list: [
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
        ],
    },
    {
      name: "FAQs",
      description:
        "",
      list: [ 
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