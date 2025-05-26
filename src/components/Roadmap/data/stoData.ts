import { Horizon } from "./roadmapData";

export const StoData: Horizon = {
  Now: {
    description: "Q2 2025, May 2025 - July 2025",
    feature: [
      {
        tag: [{ value: "Platform" }, { value: "Exemption"}],
        title: "Exemption at Occurrence Level",
        description: "Exempt specific occurrences of issues without exempting the entire STO issue.",
      }, 
      {
        tag: [{ value: "Notifications" }, { value: "Platform" }],
        title: "Exemption Notifications",
        description: "Notify developers and AppSec teams via email or Slack about pending or expired exemption requests.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Sonatype"}],
        title: "Sonatype Integration",
        description: "Native integration with Sonatype Nexus IQ Server and Nexus Repository.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Issues List - Project",
        description: "Centralized, prioritized vulnerability list for AppSec persona with ticket creation for tracking at Project scope.",
      },
      {
        tag: [{ value: "Integration" }, { value: "GHAS"}],
        title: "GitHub Advanced Security Integration",
        description: "Native integration with GitHub Advanced Security for CodeQL, SCA, and Secrets.",
      },
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS)",
        description: "Provide EPSS score additional to CVSS score for better vulnerability prioritization.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Aqua Sec"}],
        title: "Aqua Security on-prem",
        description: "Native integration with Aqua Security on-prem.",
      },
      {
        tag: [{ value: "Cross Module" }],
        title: "Native support in IDP",
        description: "Native STO support via the Harness IDP module score-cards.",
      },
      {
        tag: [{ value: "FIPS" }, { value: "Compliance" }],
        title: "FIPS support for STO",
        description: "Ability to leverage STO steps in Harness Pipeline within FIPS enabled SMP environment.",
      },
      {
        tag: [{ value: "Vulnerability" }, { value: "Governance" }],
        title: "Base image vs App layer vulnerability",
        description: "Ability to see base image Vs app layer vulnerability and govern pipelines.",
      },
      {
        tag: [{ value: "RBAC" }],
        title: "STO support in Harness Resource Group",
        description: "Ability to configure granular access to security test results within the pipeline view via the Harness Resource Group.",
      },
      {
        tag: [{ value: "Exepmtion Management" }],
        title: "Approval/Rejection comment",
        description: "Enable AppSec users to add contextual comments when approving or rejecting an exemption request.",
      },

    ],
  },
  Next: {
    description: "Q3 2025, Aug 2025 - Oct 2025",
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
        tag: [{ value: "Integration" }, { value: "ServiceNow" }],
        title: "Exemption Management via ServiceNow",
        description: "Add ServiceNow integration for the exemption management workflow.",
      },

    ],
  },
  Later: {
    description: "Q4 2025+, Nov 2025 & Beyond",
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
        tag: [{ value: "AppSec" }],
        title: "Custom Severity",
        description: "Allow users to adjust vulnerability severity with justification.",
      },
      {
        tag: [{ value: "Integration" }, { value: "CrowdStrike"}],
        title: "CrowdStrike Integration",
        description: "Native integration with CrowdStrike.",
      },
    ],
  },

  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Integration"}],
        title: "Scanner Original Severity",
        description: "Use native scanner severity and scoring for prioritization (e.g., Prisma Cloud, SonarQube, Anchore, Checkmarx, Wiz).",
      },
      {
        tag: [{ value: "Integration" }, { value: "Checkmarx"}],
        title: "Checkmarx Integration",
        description: "Native integration with Checkmarx CxOne, SAST, SCA, and OSA.",
      },
      {
        tag: [{ value: "AI" }, { value: "Remediation" }],
        title: "Auto Remediate Vulnerabilities with AI",
        description: "Detect and fix vulnerabilities at the source using AI-driven remediation and automated code patches.",
      },
      {
        tag: [{ value: "Ticketing" }, { value: "Integration" }],
        title: "Jira Integration",
        description: "Sync updates bi-directionally for vulnerabilities found, remediated, or exempted.",
      },
      {
        tag: [{ value: "Exemption Workflow" }, { value: "Early Access"}],
        title: "Global Exemption Management",
        description: "Manage vulnerability exemptions at account, organization, pipeline, and project levels.",
      }

    ],
  },
};
