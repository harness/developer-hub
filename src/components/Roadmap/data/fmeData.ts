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
    description: "Q1 2026, Feb-Apr 2026",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Harness multi-environment support",
        description:
          "Support for additional Harness environments, including Prod0, EU, and Single Tenancy.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Data checks in automated release pipelines",
        description: "Add built-in data checks and use segment changes to automate release processes.",
      },
      {
        tag: [{ value: "Dashboards" }],
        title: "Harness dashboards for FME",
        description: "A unified set of dashboards that combine production activity and usage insights to keep teams aligned on system health and impact.",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Remote evaluation client-side SDKs",
        description: "No rules are exposed to client-side. Instead, these thin clients utilize a secure cloud service for flag evaluations.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Unified UI",
        description: "A platform-wide design system. Modern and designed for action, clarity, and cohesiveness.",
      },
    ],
  },
  Next: {
    description: "Q2 2026, May-Jul 2026",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Unified billing and setting management",
        description: "Unified control plane for billing and subscription management with streamlined FME settings.",
      },
      {
        tag: [{ value: "Configuration" }],
        title: "Config and AI config management",
        description: "Enterprise cloud config management, leveraging FME's real-time flag delivery infrastructure.",
      },
      {
        tag: [{value: "Experimentation"}],
        title: "Experiment pipeline support",
        description:
          "Include experiment steps in FME pipelines.",
      },
      {
        tag: [{value: "Better Together"}],
        title: "Policy as code for experiments",
        description:
          "Leverage Harness Policy as Code to enforce governance policies on experiment changes.",
      },
      {
        tag: [{value: "Targeting"}, {value: "Better Together"}],
        title: "Flag prerequisites",
        description:
          "Top level flag dependencies enforced (new) as well as within rules (existing).",
      },
      {
        tag: [{value: "Experimentation"}],
        title: "Additional data warehouse support",
        description:
          "Extend Warehouse Native Experimentation to support Trino and BigQuery.",
      },
    ],
  },
  Later: {
    description: "Q3 2026+, August 2026 & beyond",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Project movement support",
        description: "Allow FME projects to be moved from one Harness organization to another.",
      },
      {
        tag: [{ value: "SDKs" }],
        title: "Extend SDK support",
        description: "Support additional SDKs.",
      },
      {
        tag: [{ value: "Audit Trail" }],
        title: "Audit log unification with Harness Audit Trail",
        description: "Deliver FME audit logs and admin audit log events in Harness Audit Trail to support a single source of truth.",
      },
      {
        tag: [{value: "Experimentation"}],
        title: "CUPED",
        description:
          "Introduce CUPED to leverage pre-experiment data to reduce variance.",
      },
      {
        tag: [{value: "Experimentation"}],
        title: "Dimensional Analysis for WHN",
        description:
          "Introduce dimensional analysis for Warehouse Native Experimentation (WHN) to uncover deeper trends and segment-level impact.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Experimentation" }],
        title: "Warehouse Native Experimentation",
        description: "Run experiments directly in your data warehouse with Warehouse Native Experimentation, now generally available.",
        link: "https://developer.harness.io/release-notes/feature-management-experimentation/warehouse-native/",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Split integration into Harness",
        description:
          "Support for additional Harness environments, including Prod 3.",
      },
      {
        tag: [{ value: "SDK" }],
        title: "OpenFeature provider updates",
        description:
          "Ongoing support for OpenFeature providers in .NET, Python, React, and Angular.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Granular permissions in RBAC",
        description:
          "Migrate permission management for FME object and environment-level permissions to Harness RBAC. Previously titled, Split integration into Harness, Part 2.",
      },
      {
        tag: [{ value: "Monitoring" }],
        title: "Alert webhook",
        description: "Automate downstream processes based on FME data with alert webhooks.",
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
      {
        tag: [{ value: "Targeting" }],
        title: "SemVer attribute dictionary support",
        description: "Support SemVer type attributes and suggested values in the attribute dictionary to streamline entry & reduce risk of errors.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-12-06",
      },
      {
        tag: [{ value: "Monitoring" }],
        title: "Feature flag alerts on Monitoring tab",
        description: "Show guardrail and key metric alerts on the monitoring tab, in addition to the threshold-based alerts shown prev.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-11-27",
      },
      {
        tag: [{ value: "Measurement" }],
        title: "Monitoring tab: feature traffic insights",
        description: "Analyze flag traffic in real time to understand trends and ensure proper targeting configuration.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-09-12",
      },
      {
        tag: [{ value: "Alerting" }, {value: "Experimentation"}],
        title: "Significance alerting for guardrail metrics",
        description: "Automatically receive alerts on any guardrail metric without manual configuration.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-09-04",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Semantic version targeting",
        description: "Easily define targeting rules for new features using the native semantic version matcher.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-06-06",
      },
      {
        tag: [{ value: "Measurement" }, {value: "SDK"}],
        title: "Split Suite for Browser, iOS, Android",
        description: "Eliminate the need to connect the RUM agents to the SDK separately with a single unified SDK.",
        link:"https://help.split.io/hc/en-us/sections/22701959913229-Client-side-Suites",
      },
      {
        tag: [{ value: "Measurement" }, {value: "Experimentation"}],
        title: "Guardrail metrics",
        description: "A new category of metrics that can be used to protect every release and improve metric organization.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-06-14",
      },
      {
        tag: [{ value: "SDK" }, {value: "Security"}],
        title: "SDK certificate pinning",
        description: "Enhanced Mobile (iOS and Android) SDK support to ensure mobile apps connect only to trusted servers.",
        link:"https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK#certificate-pinning",
      },
    ],
  },
};
