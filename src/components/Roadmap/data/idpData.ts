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
    description: "Q3, Aug - Oct 2026",
    feature: [
      {
        tag: [{ value: "Catalog" }, { value: "AI" }],
        title: "AI-Powered Entity Reconciliation",
        description: "AI-enabled recommendations to reconcile and link components across systems",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Developer Experience" }],
        title: "TechDocs Customization",
        description: "Customisation of CSS, themes, TOC compression, link formatting",
      },
      {
        tag: [{ value: "Scorecards" }],
        title: "OOTB Data Points for integrations",
        description: "Out-of-the-box data points to easily build scorecards and checks on integration data",
      },
      {
        tag: [{ value: "Scorecards" }],
        title: "Increased API & Terraform Provider Coverage",
        description: "Increase API and Terraform provider coverage for scorecards and integration",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "Custom Messaging to End Users",
        description: "Allow teams to customize messaging shown to end users in environments and blueprints",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "Provision Infrastructure via Terraform Enterprise",
        description: "Provision infrastructure via Terraform Enterprise",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Harness Integrations Expansion",
        description: "Expand Harness integrations across CI and IaCM",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "AWS & Azure Integrations",
        description: "Add AWS and Azure integrations to expand infrastructure visibility and management",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Jenkins Integrations",
        description: "Integrate Jenkins to bring Jenkins build data into the IDP",
      },
      {
        tag: [{ value: "Integrations" }, { value: "AI" }, { value: "Catalog" }],
        title: "Expanded AI Asset Auto-Discovery",
        description: "Discover and catalog AI assets across a broader set of platforms and systems",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Enhanced Github and Kubernetes integrations",
        description: "Support for Github multi-org and mono repo scenarios; Kubernetes SDA auto-upgrade",
      },
      {
        tag: [{ value: "Plugins/Integrations" }, { value: "Workflows" }],
        title: "OOTB Workflows for Integrations",
        description: "Out-of-the-box action library available across integrations to power workflows and automation",
      },
    ],
  },
  Next: {
    description: "Q4, Nov - Jan 2027",
    feature: [
      {
        tag: [{ value: "Workflows" }, { value: "Developer Experience" }],
        title: "Visual Workflow Creation",
        description: "UI-first workflow authoring with visual composition, no YAML required",
      },
      {
        tag: [{ value: "Catalog" }, { value: "Developer Experience" }],
        title: "Enhanced Layouting",
        description: "Cards-builder experience for composing entity layouts with greater flexibility",
      },
      {
        tag: [{ value: "Integrations" }, { value: "Catalog" }],
        title: "Bitbucket Server Integration",
        description: "Add Bitbucket Server integration",
      },
      {
        tag: [{ value: "Integrations" }, { value: "Security" }],
        title: "Security Integrations",
        description: "Integrate with Semgrep and Wiz",
      },
      {
        tag: [{ value: "Integrations" }, { value: "Observability" }],
        title: "Grafana integration",
        description: "Support integration to bring observability data",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Identity Integrations",
        description: "Integrate with Okta and Workday",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Hosted Delegates",
        description: "Support hosted delegates for IDP integrations",
      },
      {
        tag: [{ value: "Scorecards" }],
        title: "Scorecard Alerts",
        description: "Notify developers via Slack and email when scorecard checks pass or fail",
      },
    ],
  },
  Later: {
    description: "In the future",
    feature: [
      {
        tag: [{ value: "Integrations" }],
        title: "Harness Integrations Expansion",
        description: "Expand Harness integrations across AIDI and CCM",
      },
      {
        tag: [{ value: "Catalog" }, { value: "AI" }],
        title: "AI-Powered Ownership Recommendations",
        description: "AI-enabled recommendations to close gaps in ownership",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "Environment Management as a Pipeline Step",
        description: "Use Environment Management as a pipeline step to enable promotion flows with environment creation and teardown",
      },
      {
        tag: [{ value: "Workflows" }, { value: "AI" }],
        title: "AI-Guided Workflows",
        description: "Help developers choose workflow parameters based on intent",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "Selective TTL",
        description: "Support component-level TTL for environments instead of complete pause",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Custom Apps",
        description: "Enable teams to build custom internal applications that can be plugged into the IDP",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "Input Validation and Constraints",
        description: "Add input validation and constraint capabilities to Environment Management",
      },
    ],
  },
  Released: {
    description: "Has been released recently",
    feature: [
      {
        tag: [{ value: "Catalog" }],
        title: "Teams Hierarchies",
        description: "Onboard teams and organisational hierarchies in IDP for visibility and aggregation",
      },
      {
        tag: [{ value: "Catalog" }, { value: "AI" }],
        title: "Enhanced Entity Overview and pages",
        description: "An updated overview and individual pages for different entity types that is focused on bubbling up most important functional data",
      },
      {
        tag: [{ value: "Workflows" }, { value: "Catalog" }],
        title: "Link Workflows with Catalog",
        description: "Associate workflows with catalog entities for contextual discovery and execution",
      },
      {
        tag: [{ value: "Environment Management" }],
        title: "Cost of Environments",
        description: "Surface infrastructure cost attribution for environments",
      },
      {
        tag: [{ value: "Plugins/Integrations" }],
        title: "Custom Integrations, Metrics",
        description: "First-class API + webhook framework for building custom catalog integrations and time series metrics",
      },
      {
        tag: [{ value: "Scorecards" }],
        title: "Scorecards Custom Tiers",
        description: "Define custom maturity tiers for scorecards beyond default thresholds",
      },
      {
        tag: [{ value: "Workflows" }, { value: "Developer Experience" }],
        title: "Workflow Library",
        description: "Browse and use out of the box workflow templates supporting use cases across Developer onboarding, Infrastructure provisioning, Day-two operations, etc.",
      },
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
