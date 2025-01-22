import { Horizon } from "./roadmapData";

export const StoData: Horizon = {
  Now: {
    description: "Q4 2024, Nov 2024 - Jan 2025",
    feature: [
      {
        tag: [{ value: "Platform" }, { value: "Governance"}],
        title: "Detection of New Occurrences",
        description: "Identifies and governs new occurrences of existing vulnerabilities.",
      }, 
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
    ],
  },
  Next: {
    description: "Q1 2025, Feb 2025 - Apr 2025",
    feature: [
      {
        tag: [{ value: "Exemption Workflow" }],
        title: "Global Exemption Management",
        description: "Manage vulnerability exemptions at account, organization, pipeline, and project levels.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "AppSec" }],
        title: "Issues List",
        description: "Centralized, prioritized vulnerability list for AppSec persona with ticket creation for tracking.",
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
  Later: {
    description: "Q2 2025+, May 2025 & Beyond",
    feature: [
      {
        tag: [{ value: "Integration" }, { value: "Crowdstrike"}],
        title: "Crowdstrike Integration",
        description: "Native integration with Crowdstrike.",
      },
      {
        tag: [{ value: "AppSec" }],
        title: "Custom Severity",
        description: "Allow users to adjust vulnerability severity with justification.",
      },
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS) - Phase 1",
        description: "The EPSS framework will help customers prioritize vulnerabilities faster in conjunction with other attributes such as CVSS score and severity.",
      },
      {
        tag: [{ value: "Data Handling" }],
        title: "Target Deletion",
        description: "Allows deletion of unwanted targets/artifacts vulnerability data to reduce noise.",
      },
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS)",
        description: "The EPSS framework will help customers prioritize vulnerabilities faster in conjunction with other attributes such as CVSS score and severity.",
      },
      {
        tag: [{ value: "Visibility" }],
        title: "Target View",
        description: "Segregate the existing Test Target view into 4 tabs - Code Repository, Artifacts (aka container images), Instances, Configurations for better visibility. This will provide an ability to drill down into target specific vulnerabilities outside the pipeline view and analyze target security posture trend over time across different pipeline scans.",
      }
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
        tag: [{ value: "Onboarding" }],
        title: "Get Started",
        description: "A new Get Started workflow to onboard third-party integrations - Github Actions, Jenkins, GitLab.",
      },
      {
        tag: [{ value: "Remediation" }, { value: "Integration" }],
        title: "Remediation Tracker for Vulnerabilities",
        description: "Enhances the remediation workflow to seamlessly integrate with ticketing services and notification channels.",
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
    ],
  },
};
