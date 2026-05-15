import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const aisreModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "aisre", moduleTitle: "AI SRE" };

export const AiSreData: Horizon = {
  Now: {
    description: "Q2 FY27 (May - Jul 2026)",
    feature: [
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Alert Watcher Framework",
        description: "Proactive alert monitoring that surfaces anomalies and patterns before they escalate into incidents.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Surface Related Previous Incidents",
        description: "AI-powered suggestion of similar historical incidents during active incidents to accelerate resolution.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Ask AI SRE",
        description: "Conversational AI surface for querying incident data, investigation context, and on-call status.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Investigator Extensibility via Agent Pipelines",
        description: "Run custom AI agents on your own delegate infrastructure as part of incident investigation workflows.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "AI Post-Mortem Meeting Integration",
        description: "Extend AI-native post-mortems with meeting transcription and automatic action item extraction.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "On-Call Migration Wizard",
        description: "Self-service wizard for migrating on-call schedules and escalation policies from PagerDuty and Opsgenie.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "Escalation Policy Rotation Targeting",
        description: "Escalation policies can target specific rotations within a schedule for more granular paging.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Platform" }],
        title: "AI SRE Data in Harness Unified Data Platform",
        description: "Incident data surfaced in the Harness unified data plane for richer analytics and visibility alongside your other engineering metrics.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Pipeline Steps for Incident Creation",
        description: "Create incidents or alerts directly from a Harness pipeline so failures in CI/CD automatically open an incident without manual intervention.",
        backgroundColor: "#E6F4EA",
      },
    ],
  },
  Later: {
    description: "Future quarters",
    feature: [
      {
        tag: [{ value: "Integrations" }],
        title: "MS Teams App",
        description: "Native Microsoft Teams application for incident management and on-call workflows.",
      },
      {
        tag: [{ value: "Incident Management" }],
        title: "Scheduled Maintenance Windows",
        description: "Schedule maintenance windows in advance to automatically suppress escalations during planned maintenance.",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Multi-lingual Transcription Support",
        description: "Support for transcribing incident calls in multiple languages.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Default Project Time Zone",
        description: "Project-level default timezone for notifications and scheduling.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Terraform Support for Core IR",
        description: "Terraform provider support for managing IR resources as code.",
      },
    ],
  },
  Released: {
    description: "What has been released recently",
    feature: [
      {
        tag: [{ value: "On-Call" }],
        title: "On-Call System Migration (xMatters)",
        description: "Migration tooling for transitioning from xMatters to Harness on-call.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Google Chat Support",
        description: "Google Chat integration to support creating incident spaces and ingesting messages.",
      },
      {
        tag: [{ value: "Incident Management" }],
        title: "Status Update & Stakeholder Communication",
        description: "Structured status updates and stakeholder communication system for incidents.",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "ServiceNow Change Integration in AI RCA",
        description: "ServiceNow change records integrated into AI RCA Investigator for enhanced root cause analysis context.",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "AI-Native Post-Mortem Experience",
        description: "AI-powered post-mortem generation with automated insights and action item tracking.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Custom Dashboards for Reporting",
        description: "Reporting capabilities leveraging custom Harness dashboards for incident metrics and analytics.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "On-Call Service Paging Webhook",
        description: "Webhook endpoint for external systems to trigger on-call paging directly to services.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "Named Alert Rules",
        description: "Add ability to name and organize alert rules.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "RBAC for On-Call",
        description: "Role-based access control for on-call schedules and escalations.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "Additional International On-Call Support",
        description: "On-call timezone support for India, Shanghai, and Amsterdam regions.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "On-Call Automated Paging Feature Parity",
        description: "Full paging capability parity with legacy systems, including automated paging for all incident activity types.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "On-Call Notification Fallback System",
        description: "Multi-channel notification fallback ensuring on-call responders are reached via SMS, push, or voice if primary channel fails.",
      },
      {
        tag: [{ value: "Incident Management" }],
        title: "Custom Severity and Priority Options",
        description: "Admin-configurable severity and priority levels for incidents.",
      },
      {
        tag: [{ value: "Incident Management" }],
        title: "Action Items in Incident Details",
        description: "Track and manage action items directly within incident details.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "Individual Users in Escalation Policies",
        description: "Escalation policies can now target individual users in addition to schedules and rotations.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Jira Dynamic Fields Integration",
        description: "Enhanced Jira integration with dynamic field mapping for issue creation and updates.",
      },
    ],
  },
};
