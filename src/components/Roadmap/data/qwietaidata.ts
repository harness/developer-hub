import { Horizon } from "./roadmapData";


export const QwietaiData: Horizon = {
  Now: {
    description: "Q4 2025, Nov 2025 - Jan 2026",
    feature: [  
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Open and Remediated Issues Trend",
        description: "Visibility into active and remediated issues trend across Targets in a Project."
      },
      {
        tag: [{ value: "Vulnerability Prioritization" }, { value: "AppSec" }],
        title: "Override Severity for Vulnerabilities",
        description: "Allow AppSec users to override vulnerability severity."
      }, 
      {
        tag: [{ value: "Ticketing" }, { value: "Integration" }, { value: "Exemption" }],
        title: "Auto Create Jira Ticket on Exemption Request",
        description: "Automatically create a Jira ticket on exemption request using a configured template."
      },
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS)",
        description: "Provide EPSS score in addition to CVSS score for better vulnerability prioritization.",
      },
      {
        tag: [{ value: "Override Severity" }],
        title: "Manually override severity",
        description: "Ability to manually override the severity of an issue across all the targets at Project scope.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Qwiet.ai"}],
        title: "Native Integration with Qwiet.ai",
        description: "Native integration with Qwiet.ai scanners aka Harness Secruity Scanners for SAST/SCA/Secret.",
      },
      {
        tag: [{ value: "Usability" }, { value: "Filtering"}],
        title: "Filters on Exemption page",
        description: "Provide filters for users to narrow down exemptions based on all the supported criteria.",
      },
      {
        tag: [{ value: "External Policy Failures" }, { value: "Severity"}],
        title: "Map External Policy Failures to severity",
        description: "Map external policy failures ingested from 3rd party scanners to a severity instead of INFO level issues.",
      },
      {
        tag: [{ value: "Reachability" }, { value: "Vulnerability Prioritization"}],
        title: "Reachability based Vulnerability Prioritization",
        description: "Prioritize vulnerabilities on Harness risk score - formualted on CVSS, EPSS, static and runtime Reacability, etc.",
      }
    ],
  },
  Next: {
    description: "Q1 2026, Feb 2026 - April 2026",
    feature: [
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Issues List - Org/Account",
        description: "A centralized, prioritized vulnerability list for the AppSec persona at the Org/Account scope.",
      },
      {
        tag: [{ value: "AST" }],
        title: "App/Teams view",
        description: "Target view grouped by apps and teams.",
      },
      {
        tag: [{ value: "Runtime" }, { value: "Visibility"}],
        title: "Code to Runtime Visibility",
        description: "End-to-end vulnerability traceability from code to runtime, powered by the Security Graph.",
      },
      {
        tag: [{ value: "Agentic" }],
        title: "Agentic Workflow",
        description: "Unified Agentic Workflow across AppSec modules for Posture and Remediation use cases.",
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
      }
    ],
  },
  Later: {
    description: "Q2 2026, May 2026 & Beyond",
    feature: [
      {
        tag: [{ value: "Onboarding" }],
        title: "Get Started",
        description: "A new Get Started workflow to onboard third-party integrations - Github Actions, Jenkins, GitLab.",
      },
      {
        tag: [{ value: "Integration" }, { value: "ServiceNow" }],
        title: "Exemption Management via ServiceNow",
        description: "Native ServiceNow integration for exemption management.",
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
      }
    ],
  },

  Released: {
    description: "What has been released",
    feature: [
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
        tag: [{ value: "Reporting" }],
        title: "Download Vulnerabilities",
        description: "Download CSV with the vulnerabilities found in the pipeline execution.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/view-security-test-results/export-scan-results#export-as-csv-from-the-vulnerabilities-tab/"
      },
      {
        tag: [{ value: "Notifications" }, { value: "Platform" }],
        title: "Exemption Notifications",
        description: "Notify developers and AppSec teams via email, Slack, Microsoft Teams, or a custom webhook about pending, approved, and expired exemption requests.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/notifications/exemption-notifications/"
      },
      {
        tag: [{ value: "Integration" }, { value: "GHAS"}],
        title: "GitHub Advanced Security Integration",
        description: "Native integration with GitHub Advanced Security for CodeQL, SCA, and Secrets.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/github-advanced-security/"
      },
      {
        tag: [{ value: "Platform" }, { value: "RBAC" }],
        title: "Download Issues Data as CSV from Vulnerabilities Tab",
        description: "Enable RBAC-honoring download of issues CSV from Vulnerabilities Tab, add API, and deep-link to Pipeline Execution Summary Dashboard with execution ID.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/view-security-test-results/export-scan-results/"
      },
      {
        tag: [{ value: "Integration" }, { value: "Sonatype"}],
        title: "Sonatype Integration",
        description: "Native integration with Sonatype Nexus IQ Server and Nexus Repository.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/nexus-scanner-reference/"
      },
      {
        tag: [{ value: "Visibility" }, { value: "Platform" }],
        title: "Deduplication Stats",
        description: "Show deduplication stats at the pipeline level.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/view-security-test-results/view-scan-results"
      },
      {
        tag: [{ value: "Integration" }, { value: "Anchore" }],
        title: "Anchore Enhancements",
        description: "Update the Anchore runner to the latest version, add advanced configuration, and more.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference/"
      },
      {
        tag: [{ value: "Visibility" }, { value: "Platform" }],
        title: "Expose Internal Issue ID",
        description: "Show STO internal issue ID under the issue details."
      },
      {
        tag: [{ value: "Integration" }, { value: "SonarQube" }],
        title: "SonarQube: Code/Bug Smells as Vulnerabilities",
        description: "Treat SonarQube Code/Bug Smells as vulnerabilities instead of info-level issues.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference/"
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
        tag: [{ value: "Integration" }, { value: "Aqua Security"}],
        title: "Aqua Security On-Prem",
        description: "Native integration with Aqua Security on-prem.",
        link: "https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/aquasec-scanner-reference#scan-configuration"
    
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
