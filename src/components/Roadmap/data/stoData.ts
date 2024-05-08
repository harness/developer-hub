import { Horizon } from "./roadmapData";
export const StoData: Horizon = {
  Now: {
    description: "Q1 2024, Feb-Apr 2024",
    feature: [
      {
        tag: [{ value: "Usability" }, { value: "On-boarding" }],
        title: "Built-in Open Source Scanners",
        description: "Simplifies onboarding open-source scanners with just a few clicks, eliminating complex configurations. We support multiple scanners in each category: SAST, SCA, Image Scanning, Secret Detection, and DAST.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Wiz" }],
        title: "Wiz scanner support",
        description: "Support Wiz scanner integration in all STO modes - Ingestion, orchestration, and extraction.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Semgrep" }],
        title: "Semgrep scanner support",
        description: "Support Commercial Semgrep scanner integration in all STO modes - Ingestion, orchestration, and extraction.",
      },
      {
        tag: [{ value: "AIDA" }, { value: "Remediation" }],
        title: "Automatic pull requests using AIDA",
        description: "Enabling STO users to detect and directly fix issues at the source using AIDA's suggested remediation. STO applies code patches seamlessly, enhancing efficiency and ensuring a more secure codebase.",
      },
    ],
  },
  Next: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "EPSS" }],
        title: "Exploit Protection Scoring System (EPSS)",
        description: "The EPSS framework will help customers prioritize vulnerabilities faster in conjunction with other attributes such as CVSS score and severity.",
      },
      {
        tag: [{ value: "Reporting" }],
        title: "Download Reports",
        description: "Allow users to download and schedule a detailed report with STO results at pipeline level in PDF and CSV format.",
      },
      {
        tag: [{ value: "Data Handling" }],
        title: "Target Deletion",
        description: "Allow to delete unwanted targets/artifacts vulnerability data to reduce noise.",
      },
      {
        tag: [{ value: "Exemption Workflow" }],
        title: "Global Exemption Management",
        description: "Allow to exempt issues/vulnerabilities at Acoount, Organization level, additional to current Pipleine and Project.",
      },
      {
        tag: [{ value: "Dashboard" }],
        title: "Security Workbench",
        description: "Centralized dashboard for DevSecOps, offering insights into overall organization's - security posture trends, refined prioritized list of issues, and exemption management.",
      },
    ],
  },
  Later: {
    description: "Q3 2024+, Aug 2024 & beyond",
    feature: [
      {
        tag: [{ value: "Remediation" }, { value: "Integration" }],
        title: "Remediation tracker for vulnerabilities",
        description: "Enhance the remediation workflow to seamlessly integrate with ticketing services and notification channels.",
      },
      {
        tag: [{ value: "IACM" }, { value: "Cross Module" }],
        title: "STO for IACM Module",
        description: "Extend STO support to the IACM module within Harness Platform.",
      },
      {
        tag: [{ value: "Platform" }, { value: "Cross Module" }],
        title: "Combine Artifacts with SSCA",
        description: "Provide granular vulnerability data for an artifact/target, additional to current pipeline view.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Governance" }, { value: "AIDA" }],
        title: "Enhanced governance using OPA",
        description: "Allow users to govern pipelines using custom/out-of-the-Box OPA policies based on STO Vulnerability results.",
      },
    ],
  },
};
