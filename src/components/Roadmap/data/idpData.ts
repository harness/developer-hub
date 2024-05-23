import { Horizon } from "./roadmapData";

export const IdpData: Horizon = {
  Now: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "Self Service Onboarding" }, { value: "IDP Workflows" }],
        title: "IDP Flows V2",
        description:
          "Complete Revamp of the Workflows page, which will enable more customizations and easy navigation including grouping of templates according to teams and use-cases. ",
      },
      {
        tag: [{ value: "Self Service Onboarding" }],
        title: "Custom Workflows UI Picker",
        description:
          "Create an HTTP based custom picker that will allow users to fetch data dynamically on the Workflows UI e.g. query ServiceNow for options to pick from.",
      },
      {
        tag: [
          { value: "Software Catalog" },
          { value: "Artificial Intelligence" },
        ],
        title: "AIDA powered IDP Search (Beta)",
        description: "Enable AIDA powered IDP Search",
      },
      {
        tag: [{ value: "Self Service Onboarding" }],
        title: "IDP Stage Upgrades",
        description:
          "Expand the IDP Stage in our pipelines with more orchestration and notification steps.",
      },
      {
        tag: [{ value: "Self-Managed" }],
        title: "Self-Managed Version",
        description:
          "Release and support for self-managed IDP that will be hosted on users infra and environment",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Custom Plugins Error Handling",
        description:
          "Improve error handling for Custom Plugins",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Backstage Plugins",
        description:
          "Expand up to 50 out of the box plugins from the Backstage marketplace",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Backstage Plugins For Harness Modules",
        description:
          "Add new plugins for Harness Modules like IACM, Chaos Engineering",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "IDP Homepage Upgrades",
        description:
          "Enable Branding and Customizations and increase utility",
      },
      {
        tag: [{ value: "Self Service Onboarding" }],
        title: "Support Pipeline Variables",
        description:
          "JEXL support in templates and catalog to fetch values fro  Harness Pipelines",
      },
      {
        tag: [{ value: "Scorecards" }, { value: "Custom Dashboards" }],
        title: "Executive reporting and Dashboards",
        description:
          "Add executive reporting and dashboards for regular usage using scorecards and custom dashboards",
      },
    ],
  },
  Next: {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "Software Catalog" }, { value: "Onboarding" }],
        title: "Network Maps for Auto-Discovery",
        description:
          "Support for automated onboarding using network maps for auto-discovery & auto ingestion of entities along with the dependencies into catalog. ",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Custom plugins GA",
        description:
          "UI based tools to develop and test the plugin, and auto-validate new plugins, API (CI/CD) based plugin updates for newer versions, Resilience on build failures, UI improvements, customer feedbacks",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Backstage Plugins",
        description:
          "Expand up to 100 out of the box plugins from the Backstage marketplace",
      },
      {
        tag: [{ value: "Scorecards" }, { value: "Custom Dashboards" }],
        title: "Custom Dashboards Enhancement",
        description:
          "Custom Dashboards Out of the Box dashboard for onboarding SKUs, add executive reporting and dashboards for regular usage",
      },
    ],
  },
  Later: {
    description: "Q4 2024+, Nov 2024 & beyond",
    feature: [
      {
        tag: [{ value: "Software Catalog" }],
        title: "Layout Editing",
        description: "UI based layout editing and creation",
      },
      {
        tag: [
          { value: "Software Catalog" },
          { value: "Artificial Intelligence" },
        ],
        title: "AI based creation of flows",
        description: "AI based creation of flows and population of catalog",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Software Catalog" }],
        title: "Software Catalog",
        description: "Introduced Software catalog, powered by Backstage.",
      },
      {
        tag: [{ value: "Self Service Onboarding" }, { value: "IDP Flows" }],
        title: "IDP Flows",
        description:
          "Introduced Backstage Software Templates and Harness based custom actions to enable harness pipelines as a workflow orchestrator",
      },
      {
        tag: [{ value: "Scorecards" }, { value: "Software Catalog" }],
        title: "Scorecards",
        description:
          "Created Scorecards to ensure software components are developed and utilized while adhering to organizational and industry standards.",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Custom Plugins",
        description:
          "Added support to add your own custom frontend backstage plugins along with the already available curated list of plugins from Backstage Plugin Marketplace. ",
      },
      {
        tag: [{ value: "RBAC" }],
        title: "Role Based Access Control",
        description:
          "Added Role Based Access Control, wherein users could control the access of developer portal, like creation of entities deletion of entities. ",
      },
      {
        tag: [{ value: "Scorecards" }, { value: "Custom Dashboards" }],
        title: "Executive reporting and Dashboards",
        description:
          "Add executive reporting and dashboards for regular usage using scorecards and custom dashboards.",
      },
      {
        tag: [{ value: "RBAC" }],
        title: "Granular RBAC & Policy Enforcements",
        description:
          "Show/Hide workflows based on access, mark entities as private.",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Backstage Plugins",
        description:
          "Expand up to 50 out of the box plugins from the Backstage marketplace.",
      },
      {
        tag: [{ value: "Software Catalog" }, { value: "Onboarding" }],
        title: "Support for Repository based YAML creation",
        description:
          "Quick onboarding by importing existing repositories as catalog entities.",
      },
      {
        tag: [{ value: "Self Service Onboarding" }],
        title: "Catalog Custom Property Ingestion",
        description:
          "API based updates of catalog properties with custom metadata like cost, ownership, etc.",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "Custom entity type",
        description:
          "Support custom entity types like 'micro-frontends', 'platform', etc. for existing entity kinds and creating layout for them.",
      },
      {
        tag: [{ value: "Infrastructure Evolution" }],
        title: "Support for EU Cluster",
        description:
          "IDP is now supported in EU Cluster",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "Support for Harness Code Repo",
        description:
          "Added support for Harness Code Repository as a git integration",
      },
    ],
  },
};
