import { Horizon } from "./roadmapData";

export const StoData: Horizon = {
  Now: {
    description: "Q1 2025, Feb 2025 - Apr 2025",
    feature: [
      {
        tag: [{ value: "Integration" }, { value: "Checkmarx"}],
        title: "Checkmarx Integration",
        description: "Native integration with Checkmarx CxOne, SAST, SCA, and OSA.",
      },
      {
        tag: [{ value: "AI" }, { value: "Remediation" }],
        title: "Enhance Auto Remediate Vulnerabilities with AI",
        description: "Fix vulnerabilities using AI-driven remediation for all the supported SAST scanners.",
      },
      {
        tag: [{ value: "Ticketing" }, { value: "Integration" }],
        title: "Jira Integration",
        description: "Sync updates bi-directionally for vulnerabilities found, remediated, or exempted.",
      }
      {
        tag: [{ value: "Exemption Workflow" }],
        title: "Global Exemption Management",
        description: "Manage vulnerability exemptions at account, organization, pipeline, and project levels.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Issues List - Project",
        description: "Centralized, prioritized vulnerability list for AppSec persona with ticket creation for tracking at Project scope.",
      },
      {
        tag: [{ value: "Platform" }, { value: "Exemption"}],
        title: "Exemption at Occurrence Level",
        description: "Exempt specific occurrences of issues without exempting the entire STO issue.",
      }, 
      {
        tag: [{ value: "Integration" }, { value: "GHAS"}],
        title: "GitHub Advanced Security Integration",
        description: "Native integration with GitHub Advanced Security for CodeQL, SCA, and Secrets.",
      },
      {
        tag: [{ value: "Integration"}],
        title: "Scanner Original Severity",
        description: "Use native scanner severity and scoring for prioritization (e.g., Prisma Cloud, SonarQube, Anchore, Checkmarx, Wiz).",
      },
      {
        tag: [{ value: "Integration" }, { value: "SonaType"}],
        title: "Sonatype Integration",
        description: "Native integration with Sonatype Nexus IQ.",
      },
      {
        tag: [{ value: "Notifications" }, { value: "Platform" }],
        title: "Exemption Notifications",
        description: "Notify developers and AppSec teams via email or Slack about pending or expired exemption requests.",
      }
    ],
  },
  Next: {
    description: "Q2 2025, May 2025 - July 2025",
    feature: [
      {
        tag: [{ value: "Integration" }, { value: "Crowdstrike"}],
        title: "Crowdstrike Integration",
        description: "Native integration with Crowdstrike.",
      },
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS)",
        description: "Provide EPSS score additional to CVSS score for better vulnerability prioritization.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Issues List - Org/Account",
        description: "Centralized, prioritized vulnerability list for AppSec persona at Org/Account scope.",
      },
      {
        tag: [{ value: "UX Enhancement" }, { value: "Developer Productivity" }],
        title: "Security Test page",
        description: "Revamp the UX of the Security Test page.",
      }
    ],
  },
  Later: {
    description: "Q3 2025+, Aug 2025 & Beyond",
    feature: [
      {
        tag: [{ value: "Platform" }, { value: "Cross Module" }],
        title: "Target view",
        description: "Provides insights on vulnerability, external policy failures, code coverage, etc. for a target, in addition to the current pipeline view.",
      },
      {
        tag: [{ value: "AppSec" }],
        title: "Custom Severity",
        description: "Allow users to adjust vulnerability severity with justification.",
      },
      {
        tag: [{ value: "Platform" }, { value: "Cross Module" }],
        title: "Combine Artifacts with SCS",
        description: "Provides granular vulnerability data for an artifact/target, in addition to the current pipeline view.",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "Get Started",
        description: "A new Get Started workflow to onboard third-party integrations - Github Actions, Jenkins, GitLab.",
      },
      {
        tag: [{ value: "Integration" }, { value: "ServiceNow" }],
        title: "Exemption Management via ServiceNow",
        description: "Add ServiceNow integration for the exemption mamnagement workflow.",
      },
      {
        tag: [{ value: "Data Handling" }],
        title: "Target Deletion",
        description: "Allows deletion of unwanted targets/artifacts vulnerability data to reduce noise.",
      }
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Usability" }, { value: "On-boarding" }],
        title: "Built-in Open Source Scanners",
        description: "Simplifies onboarding and supports multiple scanner types (SAST, SCA, Container, Secret, IaC, DAST).",
      },
      {
        tag: [{ value: "AI" }, { value: "Remediation" }],
        title: "Auto Remediate Vulnerabilities with AI",
        description: "Detect and fix vulnerabilities at the source using AI-driven remediation and automated code patches.",
      },
      {
        tag: [{ value: "Infrastructure" }, { value: "Windows" }],
        title: "Windows Support",
        description: "Run STO plugins and scanners on Windows infrastructure to ingest vulnerability results.",
      },
      {
        tag: [{ value: "Infrastructure" }, { value: "MacOS" }],
        title: "MacOS Support",
        description: "Run STO plugins and scanners on MacOS infrastructure to ingest vulnerability results.",
      },
      {
        tag: [ { value: "Integration" }],
        title: "Native Scanner Integration",
        description: "Integrations with Wiz, Snyk, Veracode, Traceable, and SonarQube for comprehensive scanning.",
      },
      {
        tag: [{ value: "Pipeline, Artifact Scanning" }],
        title: "Local Tar/Archive Scan",
        description: "Scan local tar bundles and Docker/OCI archives directly in pipelines.",
      },
      {
        tag: [{ value: "Platform" }, { value: "Governance"}],
        title: "Detection of New Occurrences",
        description: "Behind FF: Identifies and governs new occurrences of existing vulnerabilities.",
      } 
    ],
  },
};
