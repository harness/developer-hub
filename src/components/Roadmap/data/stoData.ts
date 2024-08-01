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
        tag: [{ value: "Integration" }, { value: "SonarQube" }],
        title: "SonarQube PR and Branch Support",
        description: "Allows SonarQube scans to be performed against a PR and branch with STO orchestration mode.",
      },
      {
        tag: [{ value: "Usability" }, { value: "On-boarding" }],
        title: "Built-in Open Source Scanners",
        description: "Simplifies onboarding of open-source scanners with just a few clicks, eliminating complex configurations. We support multiple scanners in each category: SAST, SCA, Image Scanning, Secret Detection, and DAST.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Wiz" }],
        title: "Wiz Scanner Support",
        description: "Supports Wiz scanner integration for SAST, SCA, and container scanning with STO modes - ingestion and orchestration.",
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
    ],
  },
  Now: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "AIDA" }, { value: "Remediation" }],
        title: "Automatic Pull Requests Using AIDA",
        description: "Enables STO users to detect and directly fix issues at the source using AIDA's suggested remediation. STO applies code patches seamlessly, enhancing efficiency and ensuring a more secure codebase.",
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
        tag: [{ value: "Platform" }, { value: "MacOS" }],
        title: "MacOS Support",
        description: "Allows STO users to run STO plugin and scanner images on MacOS infrastructure to ingest vulnerability results from all supported scanners.",
      },
      {
        tag: [{ value: "Dashboard" }],
        title: "Enhance Performance",
        description: "Optimizes the dashboard for better performance with large data sets.",
      },
    ],
  },
  Next: {
    description: "Q3 2024+, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "Platform" }, { value: "Governance"}],
        title: "Detection of New Occurrences for Exempted Issues",
        description: "Allows the new occurrences of the already exempted issues/vulnerabilities to be recognized by the product and seperately handle there governance.",
      }, 
      {
        tag: [{ value: "Ticketing" }, { value: "Integration" }],
        title: "Jira Integration",
        description: "Enhances Jira integration to allow closing Jira tickets if the vulnerabilities are remediated in STO and vice versa.",
      },
      {
        tag: [{ value: "Exemption Workflow" }],
        title: "Global Exemption Management",
        description: "Allows exempting issues/vulnerabilities at the account and organization levels, in addition to the current pipeline and project levels.",
      },
      {
        tag: [{ value: "Dashboard" }],
        title: "Security Workbench",
        description: "Centralized dashboard for DevSecOps, offering insights into the organization's overall security posture, trends, refined prioritized list of issues, and exemption management.",
      },
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
    ],
  },
  Later: {
    description: "Q4 2024+, Oct 2024 & beyond",
    feature: [
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
