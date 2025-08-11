import { Horizon } from "./roadmapData";

export const StoData: Horizon = {
  Now: {
    description: "Q3 2025, Aug 2025 - Oct 2025",
    feature: [  
      {
        tag: [{ value: "Notifications" }, { value: "Platform" }],
        title: "Exemption Notifications",
        description: "Notify developers and AppSec teams via email, Slack, MS teams, custom webhook about pending, approved and expired exemption requests.",
      },
      {
        tag: [{ value: "Vulnerability" }, { value: "Governance" }],
        title: "Base image vs App layer vulnerability",
        description: "Ability to see base image Vs app layer vulnerability and govern pipelines.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Issues List - Project",
        description: "Centralized, prioritized vulnerability list for AppSec persona with ticket creation for tracking at Project scope.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Sonatype"}],
        title: "Sonatype Integration",
        description: "Native integration with Sonatype Nexus IQ Server and Nexus Repository.",
      },
      {
        tag: [{ value: "Integration" }, { value: "GHAS"}],
        title: "GitHub Advanced Security Integration",
        description: "Native integration with GitHub Advanced Security for CodeQL, SCA, and Secrets.",
      },
      {
        tag: [{ value: "Platform" }, { value: "RBAC" }],
        title: "Download Issues Data as CSV from Vulnerabilities Tab",
        description: "Enable RBAC-honoring download of issues CSV from Vulnerabilities Tab, add API, and deep-link to Pipeline Execution Summary Dashboard with execution ID."
      },
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Open and Remediated Issues at project Scope",
        description: "Visibility into all Active Open and remediated issues across Targets and Pipelines at Prokject scope."
      },
      {
        tag: [{ value: "Visibility" }, { value: "Platform" }],
        title: "Vulnerability overview under pipeline execution page",
        description: "Show vulnerability stats on the Pipeline execution at stage level."
      },
      {
        tag: [{ value: "AI" }, { value: "Visibility" }],
        title: "AppSec Chatbot",
        description: "AI chatbot to help with STO use cases."
      },
      {
        tag: [{ value: "Vulnerability Prioritization" }, { value: "AppSec" }],
        title: "Override Severity for Vulnerabilities",
        description: "Allow appsec users to override vulnerability severity."
      }, 
      {
        tag: [{ value: "Ticketing" }, { value: "Integration" }, { value: "Exemption" }],
        title: "Auto Create Jira Ticket on Exemption Request",
        description: "Automatically create a Jira ticket on exemption request using a configured template."
      },
      {
        tag: [{ value: "Visibility" }, { value: "Platform" }],
        title: "Fix: Handle vulnerabilities for Aborted/Resume executions",
        description: "Aggregate security scan results from all stages/executions including aborted, resumed pipeline executions."
      },
      {
        tag: [{ value: "Integration" }, { value: "Anchore" }],
        title: "Anchore Enhacenments",
        description: "Updated the Anchore runner to latest, add advanced configuration, etc."
      },          
      {
        tag: [{ value: "Integration" }, { value: "SonarQube" }],
        title: "SonarQube: Code/Bug Smells as Vulnerabilities",
        description: "Treat SonarQube Code/Bug Smells as vulnerabilities instead of Info level issues"
      },
      {
        tag: [{ value: "Visibility" }, { value: "Platform" }],
        title: "Deduplication Stats",
        description: "Show deduplication stats at pipeline level."
      },
      {
        tag: [{ value: "Integration" }, { value: "ServiceNow" }],
        title: "Exemption Management via ServiceNow",
        description: "Native ServiceNow integration for exemption management.",
      },
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS)",
        description: "Provide EPSS score additional to CVSS score for better vulnerability prioritization.",
      },
      {
        tag: [{ value: "Cross Module" }],
        title: "Native support in IDP",
        description: "Native STO support via the Harness IDP module score-cards.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "Platform" }],
        title: "Expose Internal Issue ID",
        description: "Show STO internal issue ID under the issue details."
      }
    ],
  },
  Next: {
    description: "Q4 2025, Nov 2025 - Jan 2026",
    feature: [
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Issues List - Org/Account",
        description: "Centralized, prioritized vulnerability list for AppSec persona at Org/Account scope.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Target view",
        description: "Provides insights on vulnerability, external policy failures, code coverage, etc. for a target, in addition to the current pipeline view.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "Dashboard"}],
        title: "Project level Security Dashboard",
        description: "Redesigned STO overview page to get security posture across the Project via graphs, trends, summary.",
      },
          {
        tag: [{ value: "Integration" }, { value: "Dastardly" }],
        title: "Dastardly Integration",
        description: "Support Dastardly with Orchestration, Extraction, and Ingestion modes, with Built-in scanner workflow step under DAST."
      },
        {
        tag: [{ value: "AI" }, { value: "Remediation" }, { value: "SCA" }],
        title: "Auto PRs for SCA Remediation",
        description: "Create PRs for SCA issues using AI suggestions for direct dependency upgrades (JS/TS, Python, Java). Transitives excluded."
      },
        {
        tag: [{ value: "Runtime" }, { value: "Visibility"}],
        title: "Runtime Visibility",
        description: "Ingest Runtime vulnerabilities via Traceable's Protection agent.",
      }
    ],
  },
  Later: {
    description: "Q1 2026, Feb 2026 & Beyond",
    feature: [
      {
        tag: [{ value: "Onboarding" }],
        title: "Get Started",
        description: "A new Get Started workflow to onboard third-party integrations - Github Actions, Jenkins, GitLab.",
      },
      {
        tag: [{ value: "Data Handling" }],
        title: "Target Deletion",
        description: "Allows deletion of unwanted targets/artifacts vulnerability data to reduce noise.",
      },
      {
        tag: [{ value: "Integration" }, { value: "CrowdStrike"}],
        title: "CrowdStrike Integration",
        description: "Native integration with CrowdStrike.",
      },
              {
        tag: [{ value: "Runtime" }, { value: "Vulnerability Prioritization"}],
        title: "Runtime Vulnerability Prioritization",
        description: "Correlate runtime vulnerabilities with SAST/SCA issue findings for better vulnerability prioritization",
      }
    ],
  },

  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "RBAC" }],
        title: "STO support in Harness Resource Group",
        description: "Ability to configure granular access to security test results within the pipeline view via the Harness Resource Group.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/rbac/"
      },
      {
        tag: [{ value: "Integration" }, { value: "Aqua Sec"}],
        title: "Aqua Security on-prem",
        description: "Native integration with Aqua Security on-prem.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/aquasec-scanner-reference#scan-configuration"
    
      },
      {
        tag: [{ value: "Exepmtion Management" }],
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
      {
        tag: [{ value: "Integration"}],
        title: "Scanner Original Severity",
        description: "Use native scanner severity and scoring for prioritization (e.g., Prisma Cloud, SonarQube, Anchore, Checkmarx, Wiz).",
        link: "https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarxone-scanner-reference/#use-raw-scanner-severity"
      },
      {
        tag: [{ value: "Integration" }, { value: "Checkmarx"}],
        title: "Checkmarx Integration",
        description: "Native integration with Checkmarx CxOne, SAST, SCA, and OSA.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarxone-scanner-reference"
      },
      {
        tag: [{ value: "AI" }, { value: "Remediation" }],
        title: "Auto Remediate Vulnerabilities with AI",
        description: "Detect and fix vulnerabilities at the source using AI-driven remediation and automated code patches.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/remediations/ai-based-remediations"
      },
      {
        tag: [{ value: "Ticketing" }, { value: "Integration" }],
        title: "Jira Integration",
        description: "Sync updates bi-directionally for vulnerabilities found, remediated, or exempted.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/jira-integrations"
      },
      {
        tag: [{ value: "Exemption Workflow" }, { value: "Early Access"}],
        title: "Global Exemption Management",
        description: "Manage vulnerability exemptions at account, organization, pipeline, and project levels.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/exemptions/exemption-workflows#view-exemptions-at-the-account-level"
      }

    ],
  },
};
