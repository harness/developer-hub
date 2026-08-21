import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const aisreModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "aisre", moduleTitle: "AI SRE" };

export const AiSreData: Horizon = {
  Now: {
    description: "Q3 FY27 (Aug - Oct 2026)",
    feature: [
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Native Worker Agents",
        description: "Run AI agents as native runbook steps with their own reasoning and configuration, enabling agentic troubleshooting beyond scripted automation.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Chat Action Capture",
        description: "Capture actions taken through Harness AI Chat and convert them into reusable runbooks automatically.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Incident Management" }],
        title: "Problem Tickets",
        description: "Extend AI-SRE beyond incidents into post-incident problem management, tracking root causes and long-term fixes.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Automation" }],
        title: "Ad-Hoc Runbook Runs",
        description: "Run runbooks standalone outside of triggered incidents for flexible automation workflows.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Automation" }],
        title: "Plug-and-Play Runbook Pipeline Connections",
        description: "Connect runbooks to pipelines with picker-based configuration instead of hand-mapped variable paths.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Platform" }],
        title: "RBAC Object Audit Trail",
        description: "Track who changed what in AI-SRE for enterprise compliance and security audit requirements.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Platform" }],
        title: "RBAC Severity Restriction",
        description: "Control which users can create incidents at specific severity levels for enterprise governance.",
        backgroundColor: "#E6F4EA",
      },
    ],
  },
  Later: {
    description: "Future quarters",
    feature: [
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Alert Watcher Framework",
        description: "Proactive alert monitoring that surfaces anomalies and patterns before they escalate into incidents.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Overview Dashboard Reimagined",
        description: "Customizable overview dashboard with widgets for incident metrics, MTTR trends, and team-specific health indicators.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "xMatters Native Runbook Actions",
        description: "OOTB runbook actions to trigger incidents, alerts, and paging through xMatters for phased migration and international on-call coverage.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "MS Teams App",
        description: "Native Microsoft Teams application for incident management and on-call workflows.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Terraform Support",
        description: "Terraform provider for managing AI-SRE resources as code for infrastructure-as-code workflows.",
      },
    ],
  },
  Released: {
    description: "What has been released recently",
    feature: [
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Real-Time AI Action Item Detection",
        description: "AI automatically detects and creates action items from Slack messages, meeting transcriptions, and incident notes during active incidents, assigning them to the right people.",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "AI-Native Post-Mortem Generation",
        description: "AI automatically generates structured post-incident reviews with root cause analysis, impact assessment, and lessons learned when incidents close.",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "ServiceNow Change Correlation in AI RCA",
        description: "AI Investigator automatically correlates ServiceNow change records to incidents for enhanced root cause analysis.",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Investigator Extensibility via Agent Pipelines",
        description: "Run custom AI agents on your own delegate infrastructure as part of incident investigation workflows.",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Ask AI SRE",
        description: "Conversational AI interface for querying incident data, investigation context, and on-call status using natural language.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Unified Data Platform Integration",
        description: "AI-SRE data integrated into Harness Knowledge Graph and available via MCP for cross-module analytics and insights.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Custom Dashboards for Incident Analytics",
        description: "Build custom dashboards using Harness Platform Dashboards with incident and alert data for tailored reporting and metrics.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "On-Call Migration Wizard",
        description: "Self-service wizard for migrating on-call schedules and escalation policies from PagerDuty and Opsgenie.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "Escalation Policy Rotation Targeting",
        description: "Escalation policies can target specific rotations within a schedule for more granular paging control.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Google Chat Bidirectional Sync",
        description: "Real-time timeline mirroring between AI-SRE and Google Chat spaces with native runbook actions for space creation.",
      },
    ],
  },
};
