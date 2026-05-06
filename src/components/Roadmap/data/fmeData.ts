import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const fmeModuleTheme: ModuleTheme = {
  moduleKey: "fme",
  moduleTitle: "Feature Management & Experimentation",
  palette: {
    light: { bg: "#F6F1FF", text: "#6938C0" },
    dark: { bg: "#2E2845", text: "#B8A8E8" },
  },
};

export const FmeData: Horizon = {
  Now: {
    description: "Q2 2026, May-Jul 2026",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Harness multi-environment support",
        description:
          "Support for additional Harness environments, including EU and Single Tenancy.",
      },
      {
        tag: [{ value: "Configuration Management" }],
        title: "Config Management",
        description: "Enterprise-grade configuration management with approvals, audit logging, impression tracking, schema validations, and real-time delivery.",
      },
      {
        tag: [{ value: "Dashboards" }],
        title: "Harness dashboards for FME",
        description: "A unified set of dashboards that combine production activity and usage insights to keep teams aligned on system health and impact.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Metric checks in automated release pipelines",
        description: "Integrate built-in data checks in your pipelines to automatically validate release health based on performance metrics.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Remote evaluation client-side SDKs",
        description: "The power of choice: Ensure rule privacy exactly where you need it with a cloud SDK engine that evaluates flags remotely for thin SDKs clients, eliminating rule exposure.",
      },
      {
        tag: [{ value: "Configuration Management" }],
        title: "AI Config Management",
        description: "Extended Config Management to include out-of-the-box templates for AI product configurations.",
      },
      {
        tag: [{ value: "Configuration Management" }],
        title: "Measurement for Config Management",
        description: "Integration with Cloud Experimentation to track Config Management as assignment sources, enabling impact measurement and alerting capabilities.",
      },
      {
        tag: [{ value: "Configuration Management" }],
        title: "Governance for Config Management",
        description: "Granular control over Config Management through RBAC, OPA policy enforcement, and enhanced audit trails.",
      },
      {
        tag: [{ "value": "SDK" }],
        title: "Dart SDK support",
        description: "Extend cross-platform coverage with the introduction of Dart SDK, enabling direct use on native Dart applications.",
      },
      {
        tag: [{value: "Experimentation"}],
        title: "Additional data warehouse support",
        description:
          "Extend Warehouse Native Experimentation to support Databricks.",
      },
      {
        tag: [{ "value": "AI" }],
        title: "Feature Flag Cleanup Agent",
        description: "Automate technical debt reduction with an agent that identifies and helps remove stale feature flags directly within the new UI experience.",
      },
      {
        tag: [{ "value": "AI" }],
        title: "AI chat for flag operations",
        description: "Perform CRUD operations, modify flag definitions, and check rollout status through a natural language interface powered by the Harness Model Context Protocol (MCP) Server.",
      },
      {
        tag: [{value: "Targeting"}, {value: "Better Together"}],
        title: "Flag prerequisites",
        description:
          "Top level flag dependencies enforced (new) as well as within rules (existing).",
      },
    ],
  },
  Next: {
    description: "Q3 2026, Aug-Oct 2026",
    feature: [
      {
        tag: [{ "value": "Better Together" }],
        title: "Pipeline-gated flag changes",
        description: "Enforce strict release workflows by gating feature flag updates behind your pipelines, third-party integrations like ServiceNow, cross-system validations and more.",
      },
      {
        tag: [{ "value": "Better Together" }],
        title: "Feature Flags as Code",
        description: "Manage the full lifecycle of flags directly from your codebase using GitX, enabling version-controlled configurations and code-reviewed releases.",
      },
      {
        tag: [{value: "Experimentation"}],
        title: "Additional data warehouse support",
        description:
          "Extend Warehouse Native Experimentation to support Trino.",
      },
      {
        tag: [{ "value": "Better Together"}],
        title: "Expanded guardrail metric insights",
        description: "Understand the impact of feature releases on guardrail metrics with causal insights for percentage-based rollouts and correlational insights for all other releases.",
      },
      {
        tag: [{value: "Better Together"}],
        title: "Policy as code for experiments",
        description:
          "Leverage Harness Policy as Code to enforce governance policies on experiment changes.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Unified billing and setting management",
        description: "Unified control plane for billing and subscription management with streamlined FME settings.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Project movement support",
        description: "Allow FME projects to be moved from one Harness organization to another.",
      },
      {
        tag: [{ value: "Audit Trail" }],
        title: "Audit log unification with Harness Audit Trail",
        description: "Deliver FME audit logs and admin audit log events in Harness Audit Trail to support a single source of truth.",
      },
      {
        tag: [{value: "Experimentation"}, {value: "Better Together"}],
        title: "Experiment pipeline support",
        description:
          "Treat experiments as pipeline objects in Harness pipelines.",
      },
      {
        tag: [{ "value": "SDK" }],
        title: "Expanded language support for SDKs",
        description: "Extend cross-platform coverage, including support for additional languages.",
      },
    ],
  },
  Later: {
    description: "Q4 2026+, November 2026 & beyond",
    feature: [
      {
        tag: [{value: "Experimentation"}],
        title: "Dimensional Analysis for WHN Experimentation",
        description:
          "Introduce dimensional analysis for Warehouse Native Experimentation (WHN) to uncover deeper trends and segment-level impact.",
      },
      {
        tag: [{ "value": "AI" }],
        title: "Experimentation Agents",
        description: "A suite of intelligent agents to automate the full experiment lifecycle, from hypothesis design and prioritization to results analysis and value realization.",
      },
      {
        tag: [{ "value": "SDK" }],
        title: "Additional OpenFeature Provider support",
        description: "Expand multi-language support for vendor-agnostic feature management, including Ruby and Go.",
      },
      {
        tag: [{ "value": "API" }],
        title: "Programmatically manage experiments and metrics",
        description: "Enable CRUD capabilities for experiments and metrics using APIs and MCP, allowing for automated configuration and external integration.",
      },
      {
        tag: [{value: "Experimentation"}],
        title: "CUPED for Cloud and WHN Experimentation",
        description:
          "Introduce CUPED to leverage pre-experiment data and reduce variance across cloud and warehouse-native experiments.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Advanced configuration support for pipelines",
        description: "Enhanced pipeline support for segments, flag sets, impression toggles, and metadata for better release tracking.",
        link: "https://developer.harness.io/release-notes/feature-management-experimentation#new-enhancement-harness-policy-as-code-for-fme-environments-segments-and-segment-definitions",
      },
      {
        tag: [{value: "Experimentation"}],
        title: "Additional data warehouse support",
        description:
          "Extend Warehouse Native Experimentation to support Google BigQuery.",
        link: "https://developer.harness.io/release-notes/feature-management-experimentation#new-feature-google-bigquery-support-in-warehouse-native-experimentation",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Warehouse Native Experimentation",
        description: "Run experiments directly in your data warehouse with Warehouse Native Experimentation, now generally available.",
        link: "https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-warehouse-native-experimentation-is-ga",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Split integration into Harness",
        description:
          "Support for additional Harness environments, including Prod0, Prod3, and Prod4.",
        link: "https://developer.harness.io/docs/feature-management-experimentation/split-to-harness/migrated-account",
      },
      {
        tag: [{ value: "SDK" }],
        title: "OpenFeature provider updates",
        description:
          "Ongoing support for OpenFeature providers in .NET, Python, React, and Angular.",
        link: "https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-openfeature-providers"
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Granular permissions in RBAC",
        description:
          "Migrate permission management for FME object and environment-level permissions to Harness RBAC. Previously titled, Split integration into Harness, Part 2.",
        link: "https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-environment-level-rbac-governance-in-fme",
      },
      {
        tag: [{ value: "Monitoring" }],
        title: "Alert webhook",
        description: "Automate downstream processes based on FME data with alert webhooks.",
        link: "https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-metric-alert-webhook-integration",
      },
      {
        tag: [{ value: "Monitoring" }, {value: "Experimentation"}],
        title: "Flag impressions properties bag",
        description: "Decorate impression records with properties to use in downstream processing. Support for the following SDKs and Split Proxy / Synchronizer is coming this quarter: Go, PHP Thin Client (via SplitD), .NET, and Flutter.",
        link: "https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-append-impression-properties",
      },
      {
        tag: [{ value: "SDK" }],
        title: "OpenFeature provider updates",
        description: "Ongoing support for OpenFeature providers in Java, Node.js, and Browser SDKs.",
        link: "https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-openfeature-providers",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Harness Forward proxy for FME",
        description: "Centralize traffic going outside of a customer's cloud. Unlike the current Split Proxy, it does not require environment-specific configuration.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-harness-proxy",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Experiment entry event filter",
        description: "Define an entry event at the experiment level to filter exposures, ensuring sample sizes only reflect users who were exposed to your experiment.",
        link: "https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-experiment-entry-event-filter",
      },
      {
        tag: [{value: "Targeting"}],
        title: "Fallback treatments",
        description:
          "A configuration option that lets you define a default treatment and optional configuration to be returned instead of the standard control.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-fallback-treatments",
      },
      {
        tag: [{value: "Targeting"}, {value: "Better Together"}],
        title: "Rule-based segments",
        description:
          "Assign feature availability for user groups based on different conditions, with all the power of FME targeting.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-support-for-rule-based-segments",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Client side SDKs cache expiration",
        description:
          "Control when local cache on device expires.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-control-cache-expiration-for-client-side-sdks"
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Flag impressions toggle",
        description: "Disable the flow of impressions for individual flags.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-feature-flag-impression-toggle",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Reimagined experimentation design",
        description: "New workflow for designing experiments, decoupling experimentation analysis from flag monitoring use cases.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-experiments-dashboard",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Reimagined experimentation dashboard",
        description: "Tabular experiment results dashboard + new features like comparison of multiple treatments & sample size visualization.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-experiments-dashboard",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Experiment sample population chart",
        description: "See accumulation of sample population over time. Identify unexpected assignment or traffic level changes.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-experiments-dashboard",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Flag impressions properties bag",
        description: "Decorate impression records with properties to use in downstream processing. Supported in Browser, Android, iOS, JavaScript, React, React Native, Redux, Node.js, and Java SDKs.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-append-impression-properties",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Elixir SDK",
        description: "First of new SDKs to be added after joining Harness.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-sdk-elixir-sdk",
      },
      {        
        tag: [{value: "AI Agents"}],
        title: "AI results interpretation conversation",
        description:
          "AI-generated metric results summary can be asked follow-up questions.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-release-agent-ai-chatbot",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Large segments",
        description: "New segment type enabling large-scale audience targeting up to 1M keys. Even higher limits available by request.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-targeting---large-segments",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Access Split from within Harness app",
        description: "Allow Harness customers to authenticate and access Split from the Harness application.",
      },
    ],
  },
};
