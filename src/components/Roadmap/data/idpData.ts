import { Horizon } from "./roadmapData";

// Recommended Tags to use
// 1. Catalog
// 2. Plugins
// 3. Workflows
// 4. Scorecards
// 5. Customizability
// 6. Platform
// 7. Onboarding and Adoption
// 8. Environment Management

/** Copy this for a new item
{
  tag: [{ value: "" }],
  title: "",
  description: "",
  link: ""
},
 */

export const IdpData: Horizon = {
  /**
   * NOW
   */

  Now: {
    description: "⏳ Q1 2025 (Feb - April)",
    feature: [
      {
        tag: [],
        title: "IDP 2.0 BETA Launch",
        description:
          "Introducing a brand-new IDP experience with an enhanced data model, Project/Org hierarchy, granular RBAC, and an all-new Catalog UX. More details coming soon!",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [
          { value: "Catalog" },
          { value: "Workflows" },
          { value: "Platform" },
        ],
        title:
          "Introduce Project/Org Scopes to Catalog and Workflows (IDP 2.0)",
        description:
          "Introduce Project/Org Hierarchy in the Catalog to enable granular access control over IDP Catalog entities and Workflows at these levels. Entities can be created at 3 different scopes (Project, Org, Account) and can be shared with other Users and Groups using Harness Platform RBAC.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Git Experience for YAML files (IDP 2.0)",
        description:
          "Ability to keep YAML file definitions in Git for Catalog entities and Workflows leveraging Harness Platform Git Experience.",
        link: "https://developer.harness.io/docs/platform/git-experience/git-experience-overview/",
        backgroundColor: "#E6F4EA",
      },
    ],
  },
  /**
   *
   * NEXT
   *
   */

  Next: {
    description: " 🔜 Q2 2025 (May - July)",
    feature: [
      {
        tag: [{ value: "Platform" }],
        title: "IDP 2.0 GA Launch",
        description:
          "IDP 2.0 becomes Generally Available and the default experience for all customers.",
      },
      {
        tag: [{ value: "Catalog" }],
        title: "Catalog Auto-Discovery with Harness CD",
        description:
          "Services deployed using Harness CD will auto-magically appear in IDP and will be easier to manage for end-users.",
      },
      {
        tag: [{ value: "Workflows" }],
        title: "Enhanced Workflow UX - Live Execution View",
        description:
          "A more intuitive live execution view for workflows, making it easier to track pipeline progress and logs.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Self Managed Platform (SMP) BETA",
        description:
          "Release and support a self-managed version of IDP that can be hosted on a customer's infrastructure and environment.",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Workflows" }],
        title: "Integrate Workflows with Catalog for Day 2 Actions",
        description:
          "Ability to link Workflows with Catalog items for easier Day 2 actions on existing Catalog entities.",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "Environment Management BETA Launch",
        description:
          "Ability to create new ephemeral Environments using Environment Blueprints leveraging Harness CD and IaCM.",
      },
      {
        tag: [{ value: "Scorecards" }],
        title: "Project/Org filters in account level Scorecards",
        description:
          "Ability to filter the scope of a Scorecard using Project/Org scopes. The Scorecard will continue to exist at the account scope.",
      },
    ],
  },

  /**
   *
   * LATER
   *
   */

  Later: {
    description: "🔮 Aug 2025 and later (few quarters)",
    feature: [
      {
        tag: [{ value: "Scorecards" }],
        title: "Scorecards created at Project/Org scopes",
        description:
          "Enable Scorecards and Checks to be created at the Project or Org scope.",
      },
      {
        tag: [{ value: "Workflows" }],
        title: "Workflow Input Sets",
        description: "Create and Share input sets for Workflows",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Customizability" }],
        title: "Flexible Catalog Table",
        description:
          "Enhance the Catalog table to have user-customizable columns and filters.",
      },
      {
        tag: [{ value: "Workflows" }],
        title: "Enhanced Workflow UX - Execution History",
        description:
          "Enhance the workflows execution history page to add support for filters like executions per workflow, my executions, outputs, download as CSV, ongoing executions, etc.",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "UI driven plugin configuration for Components",
        description:
          "Provide user-friendly UI for developers to configure core plugins for their components easily e.g. CI/CD, JIRA, GitHub, IaCM, CCM, Kubernetes, PagerDuty, Grafana, etc.",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Customizability" }],
        title: "Custom Entity Model",
        description:
          "Support creation of custom Core Entity Kinds and their Relationships with other Entities.",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Customizability" }],
        title: "Persona-based Custom Pages",
        description:
          "UI driven capability to create pages for different personas (SRE, Architects, VP of Platform etc.) based on the Catalog data, Scorecards, etc. and share with a specific group of people.",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Platform" }],
        title: "Launch AI-native Search",
        description: "AI-powered global search for smarter discovery in IDP",
      },

      {
        tag: [{ value: "Scorecards" }],
        title: "Enhanced Scorecards Dashboards UX",
        description:
          "Better dashboards and trends view of Scorecard and check results with enhanced filters.",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Show metrics from Harness SEI",
        description:
          "Integrate with Harness SEI to show developers their team's DORA metrics and Productivity Insights in IDP Homepage.",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "Re-work Kubernetes plugin",
        description:
          "Improve the Kubernetes plugin’s authentication mode to use Delegates. Simplify setup for existing Harness customers using the Kubernetes connector. Enhance the plugin’s performance and scalability for thousands of pods.",
      },
      {
        tag: [{ value: "Catalog" }],
        title: "Catalog Auto-Discovery with Kubernetes",
        description:
          "Services can be discovered from Kubernetes clusters and be onboarded in the IDP Catalog.",
      },
      {
        tag: [{ value: "Catalog" }],
        title: "Auto Dependencies Discovery",
        description:
          "Automatically pull in dependencies information from Kubernetes or observability sources and update the Catalog.",
      },
      {
        tag: [{ value: "Catalog" }],
        title: "Layout Editing",
        description: "UI based layout editing and creation",
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
        tag: [{ value: "Catalog" }],
        title: "Custom Plugins in IDP Homepage",
        description:
          "Support user-written custom plugins (UI widgets) on the IDP homepage.",
      },
      {
        tag: [{ value: "Scorecard" }],
        title: "Out of the box Scorecards",
        description:
          "Provide one out of the box Catalog Readiness scorecard in a new account.",
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
    ],
  },

  /**
   *
   * RELEASED
   *
   */
  Released: {
    description: "✅ What has been released recently",
    feature: [
      {
        tag: [
          { value: "Catalog" },
          { value: "Workflows" },
          { value: "Platform" },
        ],
        title: "Granular RBAC at Account Level Resources (IDP 2.0)",
        description:
          "Move IDP Catalog entities as well as Workflows to Account scope and support Harness RBAC on those Resources. (Note that this feature will be released with IDP 2.0 at the end of Q1)",
      },
      {
        tag: [{ value: "Catalog" }],
        title: "API based Entity Creation (IDP 2.0)",
        description:
          "Allow creating the Core entities (Components, APIs, Resources) directly on the Harness Platform without having to create a YAML. This will allow seamless integration with third party entities for catalog population and updates. (Note that this feature will be released with IDP 2.0 at the end of Q1)",
      },
      {
        tag: [{ value: "Workflows" }],
        title: "Dynamic Picker: Support Conditional API Request",
        description:
          "Add support for Workflow Dynamic Picker to trigger the API request based on user's input in one of the previous Workflow form fields. Today as soon as Dynamic Pickers are rendered, the API requests to fetch the dropdown values are triggered",
        link: "https://developer.harness.io/release-notes/internal-developer-portal/#new-feature-conditional-api-requests-in-workflow-dynamic-pickers",
      },
      {
        tag: [{ value: "Workflows" }],
        title:
          "Fetch additional details and set form fields based on User selection",
        description:
          "Add a feature to set values of other fields in the workflow forms based on user selection. For example - user selects their application, an API request is made to CMDB to fetch additional details of the application and populate the rest of the fields.",
        link: "https://developer.harness.io/release-notes/internal-developer-portal/#new-feature-updating-fields-using-form-context",
      },
      {
        tag: [{ value: "Workflows" }],
        title:
          "Use an API Key to trigger Pipelines from an IDP Workflow instead of user token",
        description:
          "Today Pipelines are triggered from an IDP Workflow using the user's token. Additionally, it should be possible to use an API key to trigger the pipeline and remove the requirement for the user to have any access to the pipeline.",
        link: "https://developer.harness.io/release-notes/internal-developer-portal/#new-feature-api-key-secret-based-pipeline-execution-from-idp-workflows",
      },
      {
        tag: [{ value: "Workflows" }],
        title: "Workflows UI Enhancements",
        description:
          "Introducing layout customizability to allow grouping of workflows according to teams and use-cases. Add missing features like refresh or view YAML definition of workflows.",
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
        tag: [{ value: "Catalog" }],
        title: "Catalog Ingestion API Enhancements",
        description:
          "Add support to update one entity at a time and provide a drone plugin to make usage simpler in a Harness pipeline.",
      },
      {
        tag: [{ value: "Onboarding and Adoption" }],
        title: "Out of the box Adoption Dashboard",
        description:
          "Provide an out of the box adoption dashboard to see IDP adoption in real time and get notified on a schedule via Platform Dashboards.",
      },
      {
        tag: [{ value: "Plugins" }],
        title: "CCM Plugin for IDP",
        description:
          "Create a Cloud Cost Management plugin to show a cost perspective on the Catalog entity page.",
      },
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
        tag: [{ value: "Scorecards" }, { value: "Catalog" }],
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
        tag: [{ value: "Catalog" }],
        title: "Repository based Catalog auto-population",
        description:
          "Quick onboarding by importing existing repositories as catalog components.",
      },
      {
        tag: [{ value: "Catalog" }],
        title: "Catalog Ingestion API",
        description:
          "API based updates of catalog properties with custom metadata like cost, ownership, etc.",
      },
      {
        tag: [{ value: "Catalog" }],
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
        tag: [{ value: "Catalog" }],
        title: "Support for Harness Code Repo",
        description:
          "Added support for Harness Code Repository as a git integration",
      },
    ],
  },
};
