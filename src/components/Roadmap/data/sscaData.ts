import { Horizon } from "./roadmapData";

export const SscaData: Horizon = {
  "Released": {
    description: "What has been released",
    feature: [
      {
        tag: [],
        title: "Repo Security Posture Management for GitHub",
        description: "Identify misconfigs in source code repositories based on industry standards such as CIS and OWASP Top 10 CI/CD Security Risks. Also, includes support for SBOM generation and security tests such as SAST, SCA, and secrets scanning.",
      },
      {
        tag: [],
        title: "Artifact Chain of Custody",
        description: "Auditors can now review an artifact chain of custody - a comprehensive audit trail that serves as a ledger for every artifact built and deployed in a CI/CD pipeline.",
      },
      {
        tag: [],
        title: "Unified Security View",
        description: "A unified view on OSS dependencies, vulnerabilities, and deployment details for artifacts all in one place.",
      },
      {
        tag: [],
        title: "ECR & ACR support",
        description: "Support to connect with ECR and ACR for SBOM generation and management.",
      },
      {
        tag: [],
        title: "Base Image Detection",
        description: "The feature helps in prioritizing vulnerability assessment between base images and applications, while also enforcing policies such as identifying newer versions of base images.",
      },
    ],
  },
  "Now": {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [],
        title: "Report Generation",
        description: "Generate and download reports based on compliance standards such as CIS, and OWASP Top 10 CI/CD Security Risks",
      },
      {
        tag: [],
        title: "CI/CD Security Posture Management for GitHub Workflows & Harness Pipelines:",
        description: "Perform static analysis in Github workflows and Harness pipelines to detect risky actions and misconfigurations. ",
      },
      {
        tag: [],
        title: "Repo Security Posture Management for Harness Code",
        description: "Identify misconfigs in source code repositories based on industry standards such as CIS and OWASP Top 10 CI/CD Risk. Also, includes support for SBOM generation and security tests such as SAST, SCA, and secrets scanning.",
      },
      {
        tag: [],
        title: "SBOM & SLSA support with GitHub Actions and Jenkins Plugins",
        description: "Generate SBOM and achieve SLSA compliance using GitHub Actions and Jenkins Plugins.",
      },
      {
        tag: [],
        title: "HashiCorp Vault Support",
        description: "Leverage keys from HashiCorp Vault to attest and verify your artifacts.",
      },
    ],
  },
  "Next": {
    description: "Q4 2024, Nov 2024-Jan 2025",
    feature: [
      {
        tag: [],
        title: "OpenSSF, OWASP Top 10 OSS, EO14028 & NIST SP800-204D Support",
        description: "Out of the box rules for supporting OpenSSF, OWASP Top 10 OSS, EO14028, & NIST SP800-204D compliance standards.",
      },
      {
        tag: [],
        title: "Remediation Tracker Support for Compliance Standards Issues",
        description: "Assign issues to developers and track them with a remediation tracker to ensure governance on compliance standards.",
      },
      {
        tag: [],
        title: "Governance Policies for Compliance Standards",
        description: "View and enforce policies on Code Repo, Artifacts and CI/CD pipelines based on rules defined in supply chain standards.",
      },
    ],
  },
  "Later": {
    description: "Q1 2025+, Feb 2025 & beyond",
    feature: [
      {
        tag: [],
        title: "Support for Gitlab & CircleCI",
        description: "Complete support for GitLab, allowing users to onboard GitLab repositories and perform configuration checks, SBOM generation, and security scans.",
      },
      {
        tag: [],
        title: "CI/CD Security for Jenkins",
        description: "Perform static analysis in Jenkins pipelines to detect risky plugins and misconfigurations.",
      },
      {
        tag: [],
        title: "Harness Runtime Analyzer",
        description: "Identify anomalous behavior and threats in Harness Pipelines and GitHub Workflows",
      },
      {
        tag: [],
        title: "SBOM Scoring in Drift Detection",
        description: "View risk scores on dependencies that get added or removed between artifact drifts which contain vulnerabilities, have invalid licenses or are unmaintained.",
      },
    ],
  },
};
