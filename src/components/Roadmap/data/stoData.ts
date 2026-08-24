import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const stoModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "sto", moduleTitle: "Security Testing Orchestration" };

export const StoData: Horizon = {
  Now: {
    description: "Q3 2026, Aug 2026 - Oct 2026",
    feature: [
      {
        tag: [{ value: "AST" }],
        title: "App & Target Vuln View for Code Repository & Artifacts",
        description: "Target view grouped by apps and teams.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Jenkins"}, { value: "GitHub Actions"}],
        title: "Non Harness CI (Jenkins & GHA Support)",
        description: "Native onboarding for Non Harness CI - Jenkins and GitHub Actions.",
      },
      {
        tag: [{ value: "AI" }, { value: "Triage" }],
        title: "Triage Agent",
        description: "AI-powered agent that determines if a finding is a likely false positive or likely true positive by leveraging LLMs to understand real-world risk beyond CVSS scores.",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "Get Started",
        description: "A new Get Started workflow to onboard third-party integrations - Github Actions, Jenkins.",
      },
      {
        tag: [{ value: "AI" }, { value: "Orchestration" }],
        title: "LLM as a Scanner Orchestration",
        description: "Orchestrate LLM-based scanners natively in STO pipelines.",
      },
      {
        tag: [{ value: "AI" }, { value: "Remediation" }],
        title: "Remediation Agent",
        description: "AI-powered agent that remediates security findings with suggested fixes and automated workflows.",
      },
      {
        tag: [{ value: "SBOM" }, { value: "Compliance"}],
        title: "SBOM & Compliance Visibility",
        description: "Add SBOM and Compliance Tabs in the Target view page",
      },
      {
        tag: [{ value: "Runtime" }, { value: "Visibility"}],
        title: "Code to Runtime Visibility",
        description: "End-to-end vulnerability traceability from code to runtime, powered by the Security Graph.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Checkmarx" }, { value: "Mend" }],
        title: "Bi-directional Support for Checkmarx and Mend",
        description: "Manage Checkmarx and Mend scans and findings from STO while keeping source projects in sync, and reduce duplicate workflows across tools.",
      },
      {
        tag: [{ value: "Deduplication" }, { value: "Scanner" }],
        title: "Scanner Deduplication",
        description: "Roll up findings from multiple scanners into a single issue so the same vulnerability is not tracked more than once.",
      },
    ],
  },
  Next: {
    description: "Q4 2026, Nov 2026 - Jan 2027",
    feature: [
      {
        tag: [{ value: "Data Handling" }],
        title: "Target Deletion",
        description: "Allows deletion of unwanted targets/artifacts vulnerability data to reduce noise.",
      },
      {
        tag: [{ value: "Runtime" }, { value: "Visibility" }],
        title: "Code to CD Inventory Graph with Runtime Signals",
        description: "Extend the Code to CD Inventory Graph with runtime signals so teams overlay live service health and exposure data on the code-to-deploy graph and prioritize production fixes.",
      },
        {
        tag: [{ value: "AI" }, { value: "Remediation" }, { value: "SCA" }],
        title: "Auto PRs for SCA Remediation",
        description: "Create PRs for SCA issues using AI suggestions for direct dependency upgrades (JS/TS, Python, Java). Transitives excluded."
      },
      {
        tag: [{ value: "Integration" }],
        title: "Orca Integration",
        description: "Native integration with Orca."
      },
      {
        tag: [{ value: "Risk Scoring" }, { value: "Prioritization" }],
        title: "Harness Risk Scoring",
        description: "Combine severity, exploitability, reachability, and environment data into a single score so security teams can prioritize the riskiest issues across services.",
      },
      {
        tag: [{ value: "Reachability" }, { value: "Runtime" }],
        title: "Runtime Reachability via STO",
        description: "Distinguish vulnerabilities that are actually reachable at runtime from theoretical issues so teams apply risk-based remediation and more focused policies.",
      },
      ],
  },
  Later: {
    description: "Q1 2027, Feb 2027 & Beyond",
    feature: [
    {
        tag: [{ value: "SAST" }, { value: "DAST" }, { value: "Correlation" }],
        title: "SAST to DAST Correlation",
        description: "Correlate SAST and DAST findings so teams see how a single underlying flaw manifests in code and at runtime.",
      },
    {
        tag: [{ value: "Integration" }, { value: "ServiceNow" }],
        title: "Exemption Management via ServiceNow",
        description: "Native ServiceNow integration for exemption management.",
      },
          {
        tag: [{ value: "Reachability" }, { value: "Vulnerability Prioritization"}],
        title: "Reachability based Vulnerability Prioritization",
        description: "Prioritize vulnerabilities on Harness risk score - formualted on CVSS, EPSS, static and runtime Reacability, etc.",
      },
        {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Issues List - Org/Account",
        description: "A centralized, prioritized vulnerability list for the AppSec persona at the Org/Account scope.",
      },
        {
        tag: [{ value: "Integration" }, { value: "Dastardly" }],
        title: "Dastardly Integration",
        description: "Support Dastardly with Orchestration, Extraction, and Ingestion modes, with Built-in scanner workflow step under DAST."
      },
      {
        tag: [{ value: "Integration" }, { value: "CrowdStrike"}],
        title: "CrowdStrike Integration",
        description: "Native integration with CrowdStrike.",
      },
      {
        tag: [{ value: "Vulnerability" }, { value: "Governance" }],
        title: "Extraction and Ingestion mode support for Base Image detection",
        description: "Ability to see base image vs. app layer vulnerabilities and govern pipelines.",
        },
      {
        tag: [{ value: "SAST" }, { value: ".NET" }],
        title: "Native .NET Scanning Support",
        description: "Scan .NET services natively in STO without relying on external tooling.",
      },
    ],
  },

  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "Remediation" }, { value: "GitLab" }, { value: "Bitbucket" }],
        title: "Auto PR Support for GitLab and Bitbucket",
        description: "Create pull requests from Harness AI remediation for GitLab and Bitbucket.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/remediations/ai-based-remediations#create-pull-request-from-sto"
      },
      {
        tag: [{ value: "Ticketing" }, { value: "Integration" }, { value: "Exemption" }],
        title: "Auto Create Jira Ticket on Exemption Request",
        description: "Automatically create a Jira ticket on exemption request using a configured template."
      },
      {
        tag: [{ value: "Integration" }, { value: "Cortex Cloud" }],
        title: "Cortex Cloud Integration",
        description: "Native Integration with Cortex Cloud.",
      },
      {
        tag: [{ value: "Analytics" }],
        title: "Product Usage Analytics",
        description: "A centralized analytics dashboard showing STO usage trends, adoption, and engagement across all security scans.",
      },
      {
        tag: [{ value: "Exemption" }],
        title: "Exemption Workflow Revamp",
        description: "Revamp the exemption workflow with configurable rules based on severity, customizable exemption periods per severity level.",
      },
      {
        tag: [{ value: "AI SKills" }],
        title: "AI Skills for AI-powered IDEs",
        description: "Expose STO capabilities as AI-powered skills via the Harness MCP Server, enabling security workflow automation directly from AI-powered IDEs.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Open and Remediated Issues Trend",
        description: "Visibility into active and remediated issues trend across Targets in a Project."
      },
      {
        tag: [{ value: "Infrastructure" }],
        title: "Linux ARM64 Support",
        description: "Adds Linux ARM64 infrastructure support for all STO steps, enabling broader platform compatibility and flexibility.",
      },
      {
        tag: [{ value: "FedRAMP" }],
        title: "Support Nexus scanner in FedRAMP",
        description: "Add native ingestion-mode support for the Nexus scanner in FedRAMP environments.",
      },
      {
        tag: [{ value: "FedRAMP" }],
        title: "Support Prisma Cloud scanner in FedRAMP",
        description: "Add native ingestion-mode support for the Prisma Cloud scanner in FedRAMP environments.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "Dashboard"}],
        title: "Project level Security Dashboard",
        description: "Redesigned STO overview page to get security posture across the Project via graphs, trends, summary.",
      },
      {
        tag: [{ value: "Delegate" }],
        title: "Delegate 3.0 Support",
        description: "Extend STO steps to execute on Delegate 3.0.",
      },
      {
        tag: [{ value: "Override Severity" }],
        title: "Manually override severity",
        description: "Ability to manually override the severity of an issue across all the targets at Project scope.",
      },
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS)",
        description: "Provide EPSS score in addition to CVSS score for better vulnerability prioritization.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Qwiet AI"}],
        title: "Native Integration with Qwiet AI ",
        description: "Native integration with Qwiet.ai scanners aka Harness Secruity Scanners for SAST/SCA/Secret.",
      },
      {
        tag: [{ value: "External Policy Failures" }, { value: "Severity"}],
        title: "Map External Policy Failures to severity",
        description: "Map external policy failures ingested from 3rd party scanners to a severity instead of INFO level issues.",
      },
       {
        tag: [{ value: "Usability" }, { value: "Filtering"}],
        title: "Filters on Exemption page",
        description: "Provide filters for users to narrow down exemptions based on all the supported criteria.",
      },
      {
        tag: [{ value: "Vulnerability" }, { value: "Governance" }],
        title: "Base image vs App layer vulnerability",
        description: "Ability to see base image vs. app layer vulnerabilities and govern pipelines.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/set-up-scans/container-scanning/base-image-vulnerabilites/base-image-detection/"
      },
      {
        tag: [{ value: "Visibility" }, { value: "Platform" }],
        title: "Fix: Handle vulnerabilities for Aborted/Resume executions",
        description: "Aggregate security scan results from all stages/executions including aborted, resumed pipeline executions.",
        link: "https://developer.harness.io/release-notes/security-testing-orchestration#fixed-issues-1"
      },
      {
        tag: [{ value: "Notifications" }, { value: "Platform" }],
        title: "Exemption Notifications",
        description: "Notify developers and AppSec teams via email, Slack, Microsoft Teams, or a custom webhook about pending, approved, and expired exemption requests.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/notifications/exemption-notifications/"
      },
      {
        tag: [{ value: "Platform" }, { value: "RBAC" }],
        title: "Download Issues Data as CSV from Vulnerabilities Tab",
        description: "Enable RBAC-honoring download of issues CSV from Vulnerabilities Tab, add API, and deep-link to Pipeline Execution Summary Dashboard with execution ID.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/view-security-test-results/export-scan-results/"
      },
      {
        tag: [{ value: "AI" }, { value: "Visibility" }],
        title: "AppSec Chatbot",
        description: "AI chatbot to help with STO use cases."
      },
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Issues List - Project",
        description: "Centralized, prioritized vulnerability list for AppSec persona with ticket creation for tracking at Project scope.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/view-security-test-results/issues"
      },
      {
        tag: [{ value: "Cross Module" }],
        title: "Native support in IDP",
        description: "Native STO support via the Harness IDP module score-cards.",
        link: "https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/harness-native-plugins/sto-integration/"
      },
      {
        tag: [{ value: "RBAC" }],
        title: "STO support in Harness Resource Group",
        description: "Ability to configure granular access to security test results within the pipeline view via the Harness Resource Group.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/rbac/"
      },
      {
        tag: [{ value: "Exemption Management" }],
        title: "Approval/Rejection comment",
        description: "Enable AppSec users to add contextual comments when approving or rejecting an exemption request.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/exemptions/manage-exemptions"
      },
      {
        tag: [{ value: "FIPS" }, { value: "Compliance" }],
        title: "FIPS support for STO",
        description: "Ability to leverage STO steps in Harness Pipeline within FIPS enabled SMP environment.",
        link: "https://developer.harness.io/docs/self-managed-enterprise-edition/smp-fips-overview/"
      },
      {
        tag: [{ value: "Platform" }, { value: "Exemption"}],
        title: "Exemption at Occurrence Level",
        description: "Exempt specific occurrences of issues without exempting the entire STO issue.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/exemptions/exemption-workflows#create-exemption-request-for-occurrences-within-issue"
      },
    ],
  },
};
