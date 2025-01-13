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
        title: "CI/CD Security Posture Management for GitHub Workflows & Harness Pipelines",
        description: "Perform static analysis in Github workflows and Harness pipelines to detect risky actions and misconfigurations.",
      },
      {
        tag: [],
        title: "Compliance Report Generation",
        description: "Generate and download reports based on compliance standards such as CIS v1.0, and OWASP Top 10 CI/CD Security Risks.",
      },
      {
        tag: [],
        title: "HashiCorp Vault Support",
        description: "Leverage keys from HashiCorp Vault to attest and verify the build provenance.",
      },
    ],
  },
  "Now": {
    description: "Q4 2024, Nov 2024 - Jan 2025",
    feature: [
      {
        tag: [],
        title: "Repo Security Posture Management for Harness Code",
        description: "Identify misconfigs in source code repositories based on industry standards such as CIS and OWASP Top 10 CI/CD Risk. Also, includes support for SBOM generation and security tests such as SAST, SCA, and secrets scanning.",
      },
      
      {
        tag: [],
        title: "SBOM & SLSA support with GitHub Actions",
        description: "Generate SBOM and achieve SLSA compliance using GitHub Actions for artifacts built in GitHub.",
      },
      {
        tag: [],
        title: "Artifact Signing and Verification",
        description: "Ensure built artifact is not tampered before deployment.",
      },
      {
        tag: [],
        title: "SBOM API Support",
        description: "Enable SBOM download APIs for repos and artifacts.",
      },
      {
        tag: [],
        title: "SLSA Policies",
        description: "Out of the box policies to ensure compliance with Level 1, Level 2 and Level 3 requirements.",
      },
      {
        tag: [],
        title: "Licensing Policies",
        description: "Out of the box open source policies to check for non compliant licenses in dependencies.",
      },
      {
        tag: [],
        title: "Report Generation",
        description: "Generate and download reports based on compliance standards such as CIS, and OWASP Top 10 CI/CD Security Risks",
      },
      {
        tag: [],
        title: "Bulk Onboarding",
        description: "Allow users to bulk onboard github repos across org and accounts via API",
      },
    ],
  },
  "Next": {
    description: "Q1 2025, Feb - April 2025",
    feature: [
      {
        tag: [],
        title: "Artifact Chain of Custody V2",
        description: "Enhanced audit trail that seamlessly integrates all pipeline events at an account level, spanning from source code to deployment.",
      },     
      {
        tag: [],
        title: "OSS Top 10 Risks",
        description: "Visibility into open source risks across built artifacts using SBOMs.",
      },
      {
        tag: [],
        title: "OSS Top 10 Policies",
        description: "Out of the box policies to identify risks in open source dependencies based on OSS Top 10 Risks.",
      },
      {
        tag: [],
        title: "UX Enhancements",
        description: "Improving search, filtering across product pages and overall user experience.",
      },
      {
        tag: [],
        title: "OpenSSF Integration",
        description: "Support for OpenSSF Rules.",
      },
      {
        tag: [],
        title: "CI/CD Security for Jenkins",
        description: "Perform static analysis to detect risks and misconfigurations in Jenkins pipelines.",
      },
      {
        tag: [],
        title: "mTLS support for SCS plugins",
        description: "mTLS support for SCS plugin to ensure secure communication with Harness services.",
      },
    ],
  },
  "Later": {
    description: "Q2 2025+, May 2025 & beyond",
    feature: [
      {
        tag: [],
        title: "Support for Gitlab & CircleCI",
        description: "Complete support for GitLab, allowing users to onboard GitLab repositories and perform configuration checks, SBOM generation, and security scans.",
      },
      {
        tag: [],
        title: "SBOM & SLSA support for Jenkins",
        description: "Generate SBOMs and achieve SLSA compliance using Jenkins pipelines.",
      },
      {
        tag: [],
        title: "NIST SP800-204D Support",
        description: "Out of the box rules for supporting NIST SP800-204D compliance standards.",
      },
      {
        tag: [],
        title: "Remediation Tracker",
        description: "Assign vulnerabilities & compliance issues to developers using remediation tracker to track across different types of target (Artifact, CI/CD, Repos).",
      },
      {
        tag: [],
        title: "SBOM Scoring in Drift Detection",
        description: "View risk scores on dependencies that get added or removed between artifact drifts which contain vulnerabilities, have invalid licenses or are unmaintained.",
      },
    ],
  },
};
