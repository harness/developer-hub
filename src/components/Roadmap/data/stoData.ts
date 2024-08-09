import { Horizon } from "./roadmapData";

export const StoData: Horizon = {
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Governance" }, { value: "AIDA" }],
        title: "Enhanced Governance Using OPA",
        description: "Allows users to govern pipelines using custom or out-of-the-box OPA policies based on STO vulnerability results.",
      },
      {
        tag: [{ value: "Usability" }, { value: "On-boarding" }],
        title: "Built-in Open Source Scanners",
        description: "Simplifies onboarding of open-source scanners with just a few clicks, eliminating complex configurations. We support multiple scanners in each category: SAST, SCA, Container, Secret, and DAST.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Wiz" }],
        title: "Wiz Scanner Support",
        description: "Supports Wiz scanner integration for IaC, Container and Directory scanning with STO modes - ingestion and orchestration.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Semgrep" }],
        title: "Semgrep Scanner Support",
        description: "Supports commercial Semgrep SAST scanner integration in all STO modes - ingestion, orchestration, and extraction.",
      },
      {
        tag: [{ value: "Platform" }, { value: "Windows" }],
        title: "Windows Support",
        description: "Allows STO users to run STO plugin and scanner images on Windows infrastructure to ingest vulnerability results from all supported scanners.",
      },
      {
        tag: [{ value: "IACM" }, { value: "Cross Module" }],
        title: "STO for IACM Module",
        description: "Extends STO support to the IACM module within the Harness Platform.",
      },
      {
        tag: [{ value: "Integration" }, { value: "IaC" }],
        title: "IaC Scan Support",
        description: "Allows STO users to scan infrastructure templates using Wiz (commercial) and Checkov (OSS) scanners.",
      },
      {
        tag: [{ value: "Integration" }],
        title: "SonarQube Branch Support",
        description: "Allows the STO users to be able to perform SonarQube branch scan support including for the PRs.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Snyk" }],
        title: "Snyk Code, Container, and IaC Support",
        description: "Extends the existing Snyk SCA scanner orchestration support to include Snyk code, container, and IaC scans.",
      },
      {
        tag: [{ value: "Reporting" }],
        title: "Download Reports",
        description: "Allows users to download and schedule detailed reports with STO results at the pipeline level in PDF and CSV formats.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Override Image Path",
        description: "Allows Harness users to override the image registry and image path to pull the STO scanner runner images within STO steps.",
      },
      {
        tag: [{ value: "Dashboard" }],
        title: "Enhance Performance",
        description: "Optimizes the dashboard for better performance with large data sets.",
      },
    ],
  },
  Now: {
    description: "Q3 2024+, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "AIDA" }, { value: "Remediation" }],
        title: "Automatic Pull Requests Using AIDA",
        description: "Enables STO users to detect and directly fix issues at the source using AIDA's suggested remediation. STO applies code patches seamlessly, enhancing efficiency and ensuring a more secure codebase.",
      },
      {
        tag: [{ value: "Platform" }, { value: "MacOS" }],
        title: "MacOS Support",
        description: "Allows STO users to run STO plugin and scanner images on MacOS infrastructure to ingest vulnerability results from all supported scanners.",
      },
      {
        tag: [{ value: "Platform" }, { value: "Governance"}],
        title: "Detection of New Occurrences for Existing Issues",
        description: "Allows the new occurrences of the existing and exempted issues/vulnerabilities to be recognized by the product and seperately handle there governance.",
      }, 
      {
        tag: [{ value: "Ticketing" }, { value: "Integration" }],
        title: "Jira Integration",
        description: "Enhances Jira integration to allow bi-directional update if the vulnerabilities are remediated, exempted and the scope of the vulnerability has changed in STO and vice versa.",
      },
      {
        tag: [{ value: "Exemption Workflow" }],
        title: "Global Exemption Management",
        description: "Allows exempting issues/vulnerabilities at the account and organization levels, in addition to the current pipeline and project levels.",
      },
      {
        tag: [{ value: "Visibility" }],
        title: "Issues List",
        description: "Centralized issue/vulerability list for Developers and AppSec, offering insights into the organization's overall security posture, targets impacted, refined prioritized list of issues, and exemption management.",
      },
      {
        tag: [{ value: "Governance" }, { value: "Integration" }],
        title: "Ingest Policy Failures",
        description: "Ingest the Policy failure data provided by the scanners (CheckMarkx, Anchore, Veracode, etc) and allow the STO users to govern pipelines based on it.",
      },
      {
        tag: [ { value: "Integration" }],
        title: "Native Veracode Support",
        description: "Natively support the Veracode scanner in the Security Tests module including the sandbox scanning.",
      },
      {
        tag: [ { value: "Integration" }],
        title: "Native Traceable Support",
        description: "Natively support the Traceable scanner in the Security Tests module for the API vulnerability management.",
      },
      {
        tag: [{ value: "AI" }, { value: "Remediation" }],
        title: "Enhance Remediation Suggestions",
        description: "Fine-tunes the existing LLM model for better remediation suggestions.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "DinD optional",
        description: "Make DinD as optional for container scanners (Aqua Trivy, Grype, etc.), giving customer flexibility.",
      }, 
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS) - Phase 1",
        description: "The EPSS framework will help customers prioritize vulnerabilities faster in conjunction with other attributes such as CVSS score and severity.",
      },
    ],
  },
  Next: {
    description: "Q4 2024+, Nov 2024 - Jan 2025",
    feature: [
      {
        tag: [{ value: "Platform" }, { value: "Cross Module" }],
        title: "Combine Artifacts with SSCA",
        description: "Provides granular vulnerability data for an artifact/target, in addition to the current pipeline view.",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "Get Started",
        description: "A new Get Started workflow to onboard third-party integrations - Github Actions, Jenkins, GitLab.",
      },
      {
        tag: [{ value: "Platform" }, { value: "Exemption"}],
        title: "Allow exemption at Occurrence level",
        description: "Allows customers to exempt an occurrence of an issue instead of complete issue - helpful with handling false positive use case.",
      }, 
      {
        tag: [{ value: "Data Handling" }],
        title: "Target Deletion",
        description: "Allows deletion of unwanted targets/artifacts vulnerability data to reduce noise.",
      },
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS) - Phase 2",
        description: "The EPSS framework will help customers prioritize vulnerabilities faster in conjunction with other attributes such as CVSS score and severity.",
      },
      {
        tag: [{ value: "Visibility" }],
        title: "Target View",
        description: "Segregate the existing Test Target view into 4 tabs - Code Repository, Artifacts (aka container images), Instances, Configurations for better visibility. This will provide an ability to drill down into target specific vulnerabilities outside the pipeline view and analyze target security posture trend over time across different pipeline scans.",
      }
    ],
  },
  Later: {
    description: "Q1 2025+, Feb 2025 & beyond",
    feature: [
      {
        tag: [{ value: "Platform" }, { value: "Cross Module" }],
        title: "Combine Artifacts with SSCA",
        description: "Provides granular vulnerability data for an artifact/target, in addition to the current pipeline view.",
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
      },
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS)",
        description: "The EPSS framework will help customers prioritize vulnerabilities faster in conjunction with other attributes such as CVSS score and severity.",
      },
      {
        tag: [{ value: "Developer Productivity" }],
        title: "Severity Override",
        description: "Allows STO users to override the severity of the vulnerabilities coming from the scanner for better prioritization.",
      },
    ],
  },
};
