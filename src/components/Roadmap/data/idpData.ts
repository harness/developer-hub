import { Horizon } from "./roadmapData";

// Recommended Tags to use
// 1. Software Catalog
// 2. Plugins
// 3. Workflows
// 4. Scorecards
// 5. Customizability
// 6. Platform
// 7. Onboarding and Adoption

/** Copy this for a new item
{
  tag: [{ value: "" }],
  title: "",
  description: "",
},
 */

export const IdpData: Horizon = {
  /**
   * NOW
   */

  Now: {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "Workflows" }],
        title: "Workflows UI Enhancements",
        description:
          "Introducing layout customizability to allow grouping of workflows according to teams and use-cases. Add missing features like refresh, unregister or view YAML definition of workflows",
      },
      {
        tag: [{ value: "Workflows" }],
        title: "Dynamic Workflows UI Picker",
        description:
          "Support an HTTP based picker that will allow users to fetch data dynamically on the Workflows UI and have users pick from the API response e.g. query ServiceNow for options to pick from, dropdown of available Bitbucket projects, etc.",
      },
      {
        tag: [{ value: "Customizability" }],
        title: "Customizable Homepage",
        description:
          "Enable homepage customizations where users can add/remove cards in the homepage, update quick links and increase utility by adding personalized content.",
      },
      {
        tag: [{ value: "Onboarding and Adoption" }],
        title: "My Jira Tickets",
        description:
          "Show recently assigned Jira tickets and sprint data on the homepage for developers.",
      },
      {
        tag: [{ value: "Onboarding and Adoption" }],
        title: "My Pull Requests",
        description:
          "Show active PRs, assigned PRs, PRs to review, etc. on the homepage for developers.",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "Catalog Ingestion API Enhancements",
        description:
          "Add support to update one entity at a time and provide a drone plugin to make usage simpler in a Harness pipeline.",
      },
      {
        tag: [{ value: "Workflows" }],
        title: "Enhanced Single Workflow Execution View",
        description:
          "More intuitive UI, easier to see status of the pipeline and see logs.",
      },
      {
        tag: [{ value: "Scorecards" }],
        title: "Harness STO as a Scorecards Data Source",
        description:
          "Add support to create security checks based on STO scans and active vulnerabilities in the pipelines and projects.",
      },
      {
        tag: [{ value: "Plugins" }, { value: "Customizability" }],
        title: "Custom Plugins for Sidebar",
        description: "Add support to use custom plugins in the IDP Sidebar.",
      },
      {
        tag: [{ value: "Onboarding and Adoption" }],
        title: "Out of the box Adoption Dashboard",
        description:
          "Provide an out of the box adoption dashboard to see IDP adoption in real time and get notified on a schedule via Platform Dashboards.",
      },
    ],
  },

  /**
   *
   * NEXT
   *
   */

  Next: {
    description: "Q4, Nov 2024 - Jan 2025",
    feature: [
      {
        tag: [{ value: "Catalog" }],
        title: "Catalog UI Enhancements",
        description:
          "Enhance the Catalog homepage with a customizable table and a more personalized improved user experience.",
      },
      {
        tag: [{ value: "Workflows" }],
        title: "Visibility of Workflows based on pipeline permissions",
        description:
          "Users should only see the IDP workflows if they have access to the pipeline(s) configured in the workflow definition. As of today, they can see but won't be able to execute if they don't have access.",
      },
      {
        tag: [{ value: "Scorecard" }],
        title: "Out of the box Scorecard",
        description:
          "Provide one out of the box Catalog Readiness scorecard in a new account.",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "CCM Plugin for IDP",
        description:
          "Create a Cloud Cost Management plugin to show a cost perspective on the Catalog entity page.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "iFrame config support in TechDocs",
        description: "Configure hosts allowed for iFrames used in TechDocs.",
      },
      {
        tag: [{ value: "Scorecards" }],
        title: "Launch Scorecard Initiatives",
        description:
          "Create Scorecard Initiatives with Owners and Deadlines to drive faster change in the software ecosystem.",
      },

      {
        tag: [{ value: "Workflows" }],
        title: "Workflows Execution History enhancements",
        description:
          "Enhance the workflows execution history page to add support for filters like executions per workflow, my executions, outputs, download as CSV, etc.",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "Network Maps for Auto-Discovery",
        description:
          "Support for automated onboarding using network maps for auto-discovery & auto ingestion of entities along with the dependencies into catalog. ",
      },
    ],
  },

  /**
   *
   * LATER
   *
   */

  Later: {
    description: "Q1 2025+, Jan 2025 & beyond",
    feature: [
      {
        tag: [{ value: "Platform" }],
        title: "Self-Managed Version",
        description:
          "Release and support for self-managed version of IDP that can be hosted on customer's infrastructure and environment",
      },
      {
        tag: [{ value: "Platform" }],
        title: "IDP Free Plan",
        description:
          "Create a free plan for IDP for users to use IDP in a self service way.",
      },
      {
        tag: [{ value: "Catalog" }],
        title: "Auto Dependencies Discovery",
        description:
          "Automatically pull in dependencies information from Kubernetes or observability sources and update the Catalog.",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "AIDA powered IDP Search (Beta)",
        description: "Enable AIDA powered IDP Search",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "Layout Editing",
        description: "UI based layout editing and creation",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "AI based creation of flows",
        description: "AI based creation of flows and population of catalog",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Projects and Orgs Hierarchy",
        description:
          "Introduce Harness Projects and Orgs hierarchy for Catalog entities.",
      },
    ],
  },

  /**
   *
   * RELEASED
   *
   */
  Released: {
    description: "What has been released recently",
    feature: [
      {
        tag: [{ value: "Platform" }],
        title: "Customer's Secret Manager",
        description:
          "Allow customers to store all of their IDP secrets in their own secret manager, including Plugin configurations, Git Integration as well as those used in IDP pipelines",
      },
      {
        tag: [{ value: "Customizability" }],
        title: "Support JEXL Variables",
        description:
          "JEXL support in in IDP YAML syntax with account variables and built-in variables like account ID",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Backstage Plugins For Harness Modules",
        description:
          "Add new plugins for Harness Modules like IACM, Chaos Engineering",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Custom Plugins Error Handling",
        description: "Improve error handling for Custom Plugins",
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
        tag: [{ value: "Platform" }],
        title: "Role Based Access Control",
        description:
          "Added Role Based Access Control, wherein users could control the access of developer portal, like creation of entities deletion of entities.",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "Repository based Catalog auto-population",
        description:
          "Quick onboarding by importing existing repositories as catalog components.",
      },
      {
        tag: [{ value: "Software Catalog" }],
        title: "Catalog Ingestion API",
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
        tag: [{ value: "Platform" }],
        title: "Support for EU Cluster",
        description: "IDP is now supported in EU Cluster",
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
