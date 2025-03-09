import { Horizon } from "./roadmapData";

export const SscaData: Horizon = {
  "Released": {
    description: "What has been released",
    feature: [
      {
        tag: [],
        title: "Repo Security Posture Management for GitHub",
        description: "Identify misconfigs in source code repositories based on industry standards such as CIS v1.0 and OWASP Top 10 CI/CD Security Risks. Also, includes support for SBOM generation and security tests such as SAST, SCA, and secrets scanning.",
      },
      {
        tag: [],
        title: "Artifact Chain of Custody",
        description: "Auditors can now review an artifact chain of custody - a comprehensive audit trail for auditors that serves as a ledger for every artifact built and deployed in a CI/CD pipeline.",
      },
      {
        tag: [],
        title: "CI/CD Security Posture Management for GitHub Workflows & Harness Pipelines",
        description: "Perform static analysis in GitHub workflows and Harness pipelines to detect risky actions and misconfigurations.",
      },
      {
        tag: [],
        title: "Compliance Report Generation",
        description: "Generate and download reports based on compliance standards such as CIS v1.0, and OWASP Top 10 CI/CD Security Risks.",
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
        title: "Report Generation",
        description: "Generate comprehensive license reports detailing the licenses associated with artifacts.",
      },
    ],
  },
  "Now": {
    description: "Q1 2025, Feb 2025 - April 2025",
    feature: [
      {
        tag: [],
        title: "Non-Container based Artifact Signing & Verification",
        description: "Support for signing and verification for non-containerized artifacts like helm charts, manifest files, JARs, WARs etc.",
      },
      {
        tag: [],
        title: "Artifact Chain of Custody v2",
        description: "Enhanced audit trail that seamlessly integrates all pipeline events at an account level, spanning from source code to deployment.",
      },
      {
        tag: [],
        title: "Repo Security Posture Management for Harness Code",
        description: "Identify misconfigs in source code repositories based on industry standards such as CIS v1.0 and OWASP Top 10 CI/CD Risk. Also, includes support for SBOM generation and security tests such as SAST, SCA, and secrets scanning.",
      },
      {
        tag: [],
        title: "OWASP OSS Top 10 Risks",
        description: "Visibility into open source risks across built artifacts using SBOMs.",
      },
      {
        tag: [],
        title: "SLSA Policies",
        description: "Out of the box policies to ensure compliance with Level 1, Level 2, and Level 3 requirements.",
      },
      {
        tag: [],
        title: "Bulk Onboarding",
        description: "Allow users to bulk onboard GitHub repos across org and accounts via API.",
      },
      {
        tag: [],
        title: "SBOM API Support",
        description: "Enable SBOM download APIs for repos and artifacts.",
      },
    ],
  },
  "Next": {
    description: "Q2 2025, May - July 2025",
    feature: [
      {
        tag: [],
        title: "Cosign AWS Support",
        description: "Leverage keys from AWS KMS to sign and verify artifacts.",
      },
      {
        tag: [],
        title: "Global Level View",
        description: "Gain complete visibility into all artifact and code repositories across projects, along with their associated findings, in a unified account-level view.",
      },
      {
        tag: [],
        title: "OpenSSF Integration",
        description: "Support for OpenSSF Rules.",
      },
      {
        tag: [],
        title: "Support for Gitlab & Bitbucket",
        description: "Complete support for GitLab and Bitbucket, allowing users to onboard repositories and perform configuration checks, SBOM generation, and security scans.",
      },
      {
        tag: [],
        title: "OSS Top 10 Policies",
        description: "Out of the box policies to identify risks in open source dependencies based on OSS Top 10 Risks.",
      },
    ],
  },
  "Later": {
    description: "Q3 2025+, August 2025 & beyond",
    feature: [
      {
        tag: [],
        title: "CI/CD Security for Jenkins",
        description: "Perform static analysis to detect risks and misconfigurations in Jenkins pipelines.",
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
        title: "SBOM Scoring in Drift Detection",
        description: "View risk scores on dependencies that get added or removed between artifact drifts which contain vulnerabilities, have invalid licenses, or are unmaintained.",
      },
      {
        tag: [],
        title: "Remediation Tracker",
        description: "Assign vulnerabilities & compliance issues to developers using remediation tracker to track across different types of target (Artifact, CI/CD, Repos).",
      },
      {
        tag: [],
        title: "Exemption Management",
        description: "Manage exemptions for risk and compliance issues across all targets (Artifact, CI/CD, Repos).",
      },
      {
        tag: [],
        title: "Automate OSS Dependency Updates with Harness AI",
        description: "Leverage Harness AI to automatically generate PRs for updating outdated dependencies.",
      },
    ],
  },
};
