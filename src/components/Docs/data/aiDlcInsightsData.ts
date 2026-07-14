import {
  CardSections,
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

export const docsCards: CardSections = [
  {
    name: "Get Started",
    description: "",
    list: [
      {
        title: "Overview of AI DLC Insights",
        module: MODULES.aidi,
        description:
          "Learn about AI DLC Insights and start onboarding.",
        link: "/docs/ai-dlc-insights/overview",
      },
      {
        title: "Key Concepts",
        module: MODULES.aidi,
        description:
          "Learn the core concepts that power AI DLC Insights.",
        link: "/docs/ai-dlc-insights/key-concepts",
      },
      {
        title: "Role-Based Access Control (RBAC)",
        module: MODULES.aidi,
        description: "Manage permissions and access control for AI DLC Insights user roles.",
        link: "/docs/ai-dlc-insights/get-started/rbac",
      },
    ],
  },

  {
    name: "Set Up AI DLC Insights",
    description: "",
    list: [
      {
        title: "Deploy the AI DLC Agent",
        module: MODULES.aidi,
        description:
          "Deploy the AI DLC Agent to capture AI engineering activity across your development workflows.",
        link: "/docs/ai-dlc-insights/setup/agent",
      },
      {
        title: "Configure Integrations",
        module: MODULES.aidi,
        description: "Connect your issue trackers, source control, and CI/CD tools to aggregate engineering data.",
        link: "/docs/ai-dlc-insights/setup/integrations",
      },
      {
        title: "Set Up Org Trees",
        module: MODULES.aidi,
        description:
          "Organize teams and reporting structures for engineering visibility.",
        link: "/docs/ai-dlc-insights/setup/org-trees",
      },
      {
        title: "Set Up Teams",
        module: MODULES.aidi,
        description:
          "Create and manage teams to organize engineering data and reporting.",
        link: "/docs/ai-dlc-insights/setup/teams",
      },
    ],
  },

  {
    name: "View AI DLC Insights",
    description: "",
    list: [
      {
        title: "AI Engineering",
        module: MODULES.aidi,
        description:
          "Track AI coding agent adoption, output, cost efficiency, and delivery impact.",
        link: "/docs/ai-dlc-insights/insights/ai-engineering",
      },
      {
        title: "Engineering Efficiency",
        module: MODULES.aidi,
        description:
          "Measure DORA metrics, sprint performance, and delivery efficiency.",
        link: "/docs/ai-dlc-insights/insights/efficiency",
      },
      {
        title: "Developer Productivity",
        module: MODULES.aidi,
        description:
          "Measure developer productivity across teams and workflows.",
        link: "/docs/ai-dlc-insights/insights/productivity",
      },
      {
        title: "Business Alignment",
        module: MODULES.aidi,
        description:
          "Understand how engineering initiatives contribute to business outcomes.",
        link: "/docs/ai-dlc-insights/insights/business-alignment",
      },
      {
        title: "Security Insights",
        module: MODULES.aidi,
        description:
          "Analyze security hotspots and trends across your engineering organization.",
        link: "/docs/ai-dlc-insights/insights/security",
      },
      {
        title: "Studio Dashboards",
        module: MODULES.aidi,
        description:
          "Create and publish custom dashboards to visualize your engineering data.",
        link: "/docs/ai-dlc-insights/canvas/",
      }
    ],
  },

  {
    name: "Help & Resources",
    description: "",
    list: [
      {
        title: "API",
        module: MODULES.aidi,
        description:
          "Use the AI DLC Insights API to manage developer identities and export engineering metrics.",
        link: "/docs/ai-dlc-insights/api/developer-records",
      },
      {
        title: "Troubleshooting",
        module: MODULES.aidi,
        description:
          "Find troubleshooting guides and frequently asked questions.",
        link: "/docs/ai-dlc-insights/troubleshooting",
      },
      {
        title: "Harness Support",
        module: MODULES.aidi,
        description:
          "Contact Harness Support if you encounter issues or have questions about AI DLC Insights.",
        link: "https://www.harness.io/support",
      },
    ],
  },
];

/* Define the cards - end */