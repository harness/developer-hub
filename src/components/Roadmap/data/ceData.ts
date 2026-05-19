import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const ceModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "ce", moduleTitle: "Resilience Testing" };

export const CeData: Horizon = {
  Now: {
    description: "Q2 2026, May 2026 - Jul 2026",
    feature: [
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Resilience Risks",
        description: "Identify presence or absence of risks when any test is run.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Passive Risk Detection for Harness CD",
        description: "Detect resilience risks without running either chaos or load tests using Harness CD metadata.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Native Dashboards",
        description: "Introduce basic native dashboards for Resilience Testing built on the Harness UDP platform.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "External Secrets Manager",
        description: "Extend support for external secret managers like Vault for all components of the Resilience Testing module.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Service Unification",
        description: "Every resource that goes under a resilience test or a probe that runs is associated with a service. Provide Customer Service support.",
      },
      {
        tag: [{ value: "Load Testing" }],
        title: "K6 Support",
        description: "Add native support for the K6 load testing tool.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Harness 3.0 Design Support",
        description: "Add the new UX design support for the Resilience Testing module.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "FIPS Compliance",
        description: "Make the Resilience Testing module FIPS compliant.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "OPA Support for Risks",
        description: "Add OPA policies to mandate risk detection and assertion in CD pipelines.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Auto Probe Creation",
        description: "Create resilience probes automatically using AI for the onboarded services.",
      },
    ],
  },
  Next: {
    description: "Q3 2026, Aug 2026 - Oct 2026",
    feature: [
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Passive Risk Detection for Incidents",
        description: "Detect resilience risks without running either chaos or load tests using Incidents metadata.",
      },
      {
        tag: [{ value: "Load Testing" }],
        title: "JMeter Support",
        description: "Add native support for the JMeter load testing tool.",
      },
      {
        tag: [{ value: "DR Testing" }],
        title: "DR Templates",
        description: "Add out-of-the-box DR templates for achieving end-to-end DR and DR test automation.",
      },
      {
        tag: [{ value: "Chaos" }],
        title: "Extend Azure Chaos Faults",
        description: "Add more chaos faults related to Azure PaaS.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Extend AI Recommendations",
        description: "Extend AI recommendations support for load and DR testing.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Resilience Testing Policies",
        description: "Add support for notifications based on policies for Chaos, Load, and DR testing.",
      },
      {
        tag: [{ value: "DR Testing" }],
        title: "Compliance Reporting",
        description: "Provide reports related to DR compliance to the industry standards.",
      },
    ],
  },
  Later: {
    description: "H2 2026, Q4 2026 and beyond",
    feature: [
      {
        tag: [{ value: "AI" }],
        title: "Extended Resilience Insights",
        description: "Provide AI recommendations based on data and events reported on the Harness Knowledge Graph.",
      },
      {
        tag: [{ value: "AI" }],
        title: "APM Insights",
        description: "Extend AI recommendations based on APM insights.",
      },
      {
        tag: [{ value: "AI" }],
        title: "AI Editors Plugin Support",
        description: "Add Resilience Test plugin support through Harness Plugin.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Comprehensive Risk Profiling",
        description: "Risk profiling and compliance reporting along with AI recommendations.",
      },
      {
        tag: [{ value: "AI" }],
        title: "Chaos Tests for Code",
        description: "Recommend chaos tests in the code with help from code copilots.",
      },
      {
        tag: [{ value: "AI" }],
        title: "JIRA Recommendations",
        description: "Recommend experiments based on JIRA or wiki content.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Chaos NG Experience GA",
        description: "Chaos NG experience features are now generally available, completing the transition to the new Chaos Studio. Legacy Git-based Chaos Hubs, the legacy Visual Builder, Kubernetes V1 dedicated chaos infrastructure creation, and the SLO probe type for new Kubernetes probes have been retired.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Experiment Run Reports",
        description: "Added experiment run reports in the UI, backed by a unified data extraction pipeline and a JSON API for downstream consumption.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Live Logs View in Timeline",
        description: "Integrated Harness Delegate logs and DDCI logs directly into the timeline view for in-context observability during experiment runs.",
      },
      {
        tag: [{ value: "Load Testing" }],
        title: "Load Testing on Linux and Machine Infrastructure",
        description: "Extended native load testing beyond Kubernetes to Linux and machine chaos infrastructure, with load-enabled enforcement from installation to execution and live logging for load executions.",
      },
      {
        tag: [{ value: "DR Testing" }],
        title: "Disaster Recovery Component Model",
        description: "Added first-class DR component support with new entity, APIs (DR Test run, getVariables, DR component nodes CRUD), and DDCR execution enhancements for end-to-end DR test orchestration.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Variables and Inputs in Chaos Studio",
        description: "Introduced user-defined variables and utility functions with CRUD support across faults, templates, probes, and actions, and migrated probe and action variables to the unified Inputs model.",
      },
      {
        tag: [{ value: "Chaos" }],
        title: "Native Chaos Faults on Linux and Windows Machine Infrastructure",
        description: "Expanded native fault coverage beyond Kubernetes with Linux machine faults (network, API, JVM, process, service, DNS, disk fill) and native Windows network chaos faults, along with their hub templates.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Experiment Templates for Windows and Linux",
        description: "Extended Experiment Templates beyond Kubernetes to Windows and Linux infrastructure, enabling reusable, standardized experiments across all supported infra types.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Resilience Risks",
        description: "Introduced the Risks feature with risk identification UI at project, org, and account scopes, backed by a new resilience risk data model.",
      },
    ],
  },
};
