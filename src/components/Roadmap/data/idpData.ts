import { Horizon } from "./roadmapData";

export const IdpData: Horizon = {
  Now: {
    description: "Q1 2024, Feb-April 2024",
    feature: [
      {
        tag: [{ value: "Self Service Onboarding" }, { value: "IDP Flows" }],
        title: "IDP Flows",
        description: "Complete Revamp of the Workflows page, which will enable more customizations and easy navigation including grouping of templates according to teams and use-cases. ",
      },
      {
        tag: [{ value: "Self Service Onboarding" }],
        title: "Custom Picker",
        description: "Add support for http based custom picker that will allow users to fetch data dynamically into templates.",
      },
      {
        tag: [{ value: "Self Service Onboarding" }],
        title: "IDP Stage Upgrades",
        description: "Add all the necessary steps, like email based notification support, in the new developer portal stage. ",
      },
      {
        tag: [{ value: "Software Catalog" }, { value: "Onboarding" }],
        title: "Network Maps for Auto-Discovery",
        description: "Support for automated onboarding using network maps for auto-discovery & auto ingestion of entities along with the dependencies into catalog. ",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "Custom Entity",
        description: "Support custom entity types like micro-frontends, libraries, etc. and creating layout for them ",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "Layout Editing",
        description: "UI based layout editing and creation",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "Entity Builder",
        description: "New entity creator UI (instead of creating YAML in git)",
      },
      {
        tag: [{ value: "Software Catalog" }, { value: "Onboarding" }],
        title: "Support for Repository based YAML creation",
        description: "",
      },
      {
        tag: [{ value: "Onboarding" }, { value: "Flows" }],
        title: "Autocompletion support",
        description: "Dynamic fetch of entity metadata to support auto completion of fields",
      },
      {
        tag: [{ value: "Self Service Onboarding" }],
        title: "Custom Entity Provider",
        description: "Custom Entity Provider for non-YAML based entities.",
      },
      {
        tag: [{ value: "Self Service Onboarding" }],
        title: "Custom Processors",
        description: "Custom processors for custom entity metadata.",
      },
      {
        tag: [{ value: "Scorecards" }, { value: "Data Source" }],
        title: "Custom Data Source",
        description: "Add support for custom data source using APIs to fetch data from any required source.",
      },
      {
        tag: [{ value: "Scorecards" }],
        title: "Third Party Integrations",
        description: "Add support for more data sources and data points using Third Party Integrations",
      },
      {
        tag: [{ value: "Scorecards" }, { value: "Custom Dashboards" }],
        title: "Executive reporting and Dashboards",
        description: "Add executive reporting and dashboards for regular usage using scorecards and custom dashboards.",
      },
      {
        tag: [{ value: "RBAC" }],
        title: "Granular RBAC & Policy Enforcements",
        description: "Show/Hide workflows based on access, Mark entities as private and share with others. Project and Org based hierarchy of entities",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Backstage Plugins",
        description: "Add support for 50 plugins from backstage marketplace, lean and fast plugin integration flow",
      },

    ],
  },
  Next: {
    description: "Q2 2024, May-July 2024",
    feature: [
      {
        tag: [{ value: "Plugins" }],
        title: "Custom plugins GA",
        description: "UI based Tools to develop and test the plugin, and auto-validate new plugins, API (CI/CD) based plugin updates for newer versions, Resilience on build failures, UI improvements, customer feedbacks",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "More Developer Centric Information",
        description: "Enhancement of User Group/Team and User pages for collaboration and skill sharing",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Enhanced Scoping",
        description: "Support for Projects and Organizations for entities",
      },
    ],
  },
  Later: {
    description: "Q4 2024+, Oct+ 2024",
    feature: [
      {
        tag: [{ value: "Software Catalog" }, { value: "Artificial Intelligence" }],
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
        description: "Added support for Software catalog",
      },
      {
        tag: [{ value: "Self Service Onboarding" }, { value: "IDP Flows" }],
        title: "IDP Flows",
        description: "Added support for Backstage Templates and Harness based custom actions to enable harness pipelines as a workflow orchestrator",
      },
      {
        tag: [{ value: "Scorecards" }, { value: "Software Catalog" }],
        title: "Scorecards",
        description: "Added support for Scorecards to ensure software components are developed and utilized while adhering to organizational and industry standards.",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Custom Plugins",
        description: "Added support to add your own custom front end backstage plugins along with the already available curated list of plugins from Backstage Plugin Marketplace. ",
      },
      {
        tag: [{ value: "RBAC" }],
        title: "Granular RBAC",
        description: "Added Granular RBAC, wherein users could control the access of developer portal, like creation of entities deletion of entities. ",
      },
    ],
  },
};
