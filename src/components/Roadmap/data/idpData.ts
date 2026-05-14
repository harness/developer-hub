import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const idpModuleTheme: ModuleTheme = {
  moduleKey: "idp",
  moduleTitle: "Internal Developer Portal",
  palette: {
    light: { bg: "#01C9CC", text: "#ECFFFF" },
    dark: { bg: "#0D3D3E", text: "#7ED9DB" },
  },
};

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
        // color for "NOW"
        // backgroundColor: "#E6F4EA",
      },
 */

export const IdpData: Horizon = {
  Now: {
    description: "Q2 2026",
    feature: [
      {
        tag: [{ value: "Catalog" }, { value: "AI & Automation" }],
        title: "Workflow Authoring Agent",
        description: "AI-powered agent that drafts and refines workflow templates from natural language intent",
      },
      {
        tag: [{ value: "Workflows" }, { value: "Catalog" }],
        title: "Link Workflows with Catalog",
        description: "Associate workflows with catalog entities for contextual discovery and execution",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "Cost of Environments",
        description: "Surface cost attribution alongside managed environments",
      },
      {
        tag: [{ value: "Plugins/Integrations" }],
        title: "Custom Integrations",
        description: "First-class API + webhook framework for building custom catalog integrations",
      },
      {
        tag: [{ value: "Plugins/Integrations" }, { value: "Workflows" }],
        title: "OOTB Actions for Integrations",
        description: "Out-of-the-box action library available across integrations to power workflows and automation",
      },
      {
        tag: [{ value: "Scorecards" }],
        title: "Scorecards Custom Tiers",
        description: "Define custom maturity tiers for scorecards beyond default thresholds",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Developer Experience" }],
        title: "Enhanced Layouting",
        description: "Cards-builder experience for composing entity layouts with greater flexibility",
      },
      {
        tag: [{ value: "Workflows" }],
        title: "Lightweight Workflow Actions",
        description: "API/MCP-driven workflow actions that don't require pipelines",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Developer Experience" }],
        title: "AI Search through MCP",
        description: "Ability to search through Confluence and other docs through MCP",
      },
      {
        tag: [{ value: "Workflows" }, { value: "Developer Experience" }],
        title: "Workflow Library",
        description: "Browse and use out of the box workflow templates supporting use cases across Developer onboarding, Infrastructure provisioning, Day-two operations, etc.",
      },
    ],
  },
  Next: {
    description: "Q3 2026",
    feature: [
      {
        tag: [{ value: "Scorecards" }, { value: "Developer Experience" }],
        title: "Scorecards UX Redesign",
        description: "Refresh the scorecards experience for clarity, drill-downs, and improved data visualization",
      },
      {
        tag: [{ value: "Scorecards" }, { value: "Integrations" }],
        title: "OOTB Scorecards & Checks for Integrations",
        description: "Out-of-the-box scorecards and checks bundled with each integration",
      },
      {
        tag: [{ value: "Workflows" }, { value: "Environment Management" }],
        title: "Shareable Input Sets",
        description: "Reusable input sets across workflows and environment management, mirroring the pipelines pattern",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "TFE/TFC support in Environment Management",
        description: "Set up environment footprints directly through Terraform pipelines without IACM",
      },
    ],
  },
  Later: {
    description: "Q4 2026",
    feature: [
      {
        tag: [{ value: "Catalog" }, { value: "Environment Management" }],
        title: "Infrastructure Resources in Catalog",
        description: "Surface environment infrastructure resources in the catalog and map infra entities to resources",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Integrations" }],
        title: "Next-Wave Integrations",
        description: "Continued expansion of the integrations ecosystem, including Harness AI SRE, Jira enhancements, Wiz, GitLab enhancements, AWS Infrastructure, and Kubernetes Phase 2",
      },
      {
        tag: [{ value: "Workflows" }, { value: "Developer Experience" }],
        title: "Picker Templates",
        description: "Reusable picker patterns that can be shared across multiple workflows",
      },
    ],
  },
  Released: {
    description: "Q1 2026",
    feature: [
      {
        tag: [{ value: "Catalog" }],
        title: "Custom Entity Kinds",
        description: "Define custom entity types with JSON Schema for assets not covered by built-in catalog kinds",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Plugins/Integrations" }],
        title: "Catalog Auto-discovery",
        description: "Auto-discover and import entities from GitHub, ServiceNow CMDB, PagerDuty, Datadog, Sonarqube, Harness CD, GCP, and Kubernetes into the IDP Catalog with register/merge/auto-import controls",
      },
      {
        tag: [{ value: "Plugins/Integrations" }],
        title: "Custom Plugins V2",
        description: "Redesigned plugin creation: define with name/icon, upload an HTML file directly, preview live with Dev Mode, no npm package or .tgz required",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "Dependent environments",
        description: "Compose environments by referencing another environment's outputs",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "Environment Management GA",
        description: "Self-service environment creation and lifecycle management with versioned blueprints, TTL-based auto-pause, drift detection, granular RBAC, is now Generally Available for all IDP customers",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Scorecards" }],
        title: "Aggregation Rules for Metrics and Scorecards Rollup",
        description: "Roll up sum/average/max/min/median metrics and scorecards from services to projects, orgs, and accounts with custom rules",
      },
    ],
  },
};
