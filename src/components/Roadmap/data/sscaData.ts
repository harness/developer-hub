import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const sscaModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "ssca", moduleTitle: "Supply Chain Security" };

export const SscaData: Horizon = {
  Now: {
    description: "Q2 2026, May 2026 - July 2026",
    feature: [
      {
        tag: [{ value: "Risk & Compliance" }, { value: "AppSec" }],
        title: "Exemption Management",
        description: "Manage exemptions for OSS Dependencies across Artifacts & Repos with full auditability and lifecycle tracking.",
      },
      {
        tag: [{ value: "Governance" }, { value: "Attestation" }],
        title: "Evidence Vault - Phase 2",
        description: "Extend to CD events with deployment attestations and environment snapshots, plus attestation search and policy enforcement to streamline audit readiness and compliance reporting.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Artifact Security" }],
        title: "Cosign AWS Support",
        description: "Leverage keys from AWS KMS to sign and verify artifacts.",
      },
      {
        tag: [{ value: "Risk & Compliance" }],
        title: "OSS Risk Scoring",
        description: "Introduce contextual risk scoring for open source dependencies based on risks such as EOL, malicious packages, and known vulnerabilities.",
      },
      {
        tag: [{ value: "Run time Security" }],
        title: "Run Time Security for CI/CD Pipelines",
        description: "Protect your Harness CI/CD pipelines from supply chain attacks by detecting anomalies and unauthorized activity through real-time system and network event monitoring.",
      },
      {
        tag: [{ value: "Analytics" }],
        title: "SCS Usage Analytics",
        description: "A centralized analytics dashboard showing SCS usage trends, adoption, and engagement across all SCS steps.",
      },
      {
        tag: [{ value: "AI" }, { value: "AppSec" }],
        title: "Remediation Agent",
        description: "Deliver intelligent insights and automate key SCS actions to proactively secure your software supply chain with AI-driven agent.",
      },
      {
        tag: [{ value: "Risk & Compliance" }],
        title: "License Attribution",
        description: "Comprehensive license attribution reporting for open source dependencies across your artifacts and repositories.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Repo Security" }],
        title: "SCS Plugins for GitLab",
        description: "Enable SCS capabilities for GitLab repositories with native plugin support for SBOM generation, SAST, SCA, and secrets scanning.",
      },
    ],
  },
  Next: {
    description: "Q3 2026, August 2026 - October 2026",
    feature: [
      {
        tag: [{ value: "AIBOM" }],
        title: "AIBOM",
        description: "Gain visibility into all AI models, datasets and prompts used across your systems, enabling governance, risk assessment, and secure AI adoption.",
      },
      {
        tag: [{ value: "Risk & Compliance" }],
        title: "Global Artifact & Repository visibility",
        description: "Account-wide views of repositories and artifacts, enabling unified visibility and oversight across all resources.",
      },
      {
        tag: [{ value: "Integration" }, { value: "OpenSSF" }],
        title: "OpenSSF Integration",
        description: "Enforce industry-standard OpenSSF rules to strengthen build integrity, dependency hygiene, and overall software supply chain security.",
      },
      {
        tag: [{ value: "Repo Security" }],
        title: "Repo Security Posture Management for Harness Code",
        description: "Identify repository misconfigurations based on CIS v1.0 and OWASP Top 10 CI/CD Risks, with built-in SBOM generation, SAST, SCA, and secrets scanning.",
      },
    ],
  },
  Later: {
    description: "Q4 2026+, November 2026 & beyond",
    feature: [
      {
        tag: [{ value: "Governance" }, { value: "Risk & Compliance" }],
        title: "OSS Top 10 Policies",
        description: "Out of the box policies to identify risks in open source dependencies based on the OSS Top 10 risks, with the ability to block builds and deployments when critical vulnerabilities or license violations are detected.",
      },
      {
        tag: [{ value: "Risk & Compliance" }],
        title: "NIST SP800-204D Support",
        description: "Out of the box rules for supporting NIST SP800-204D compliance standards.",
      },
      {
        tag: [{ value: "SLSA" }, { value: "Artifact Security" }],
        title: "SLSA Policies",
        description: "Out of the box policies to ensure compliance with Level 1, Level 2, and Level 3 requirements.",
      },
      {
        tag: [{ value: "CI/CD Security" }],
        title: "CICD Static Rules",
        description: "Enhance the rule list to detect CICD misconfigs.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Governance" }, { value: "Attestation" }],
        title: "Evidence Vault - Phase 1 (Beta)",
        description: "Native CI integration to automatically capture Source and Build attestations, link artifacts to source code, support custom attestations, and enable attestation downloads.",
      },
      {
        tag: [{ value: "Dependency Management" }],
        title: "Automate OSS Dependency Updates with Harness AI",
        description: "Leverage Harness AI to automatically generate PRs for updating outdated dependencies.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Repo Security" }],
        title: "Support for Bitbucket",
        description: "Complete support for Bitbucket, allowing users to onboard repositories and perform SBOM generation, SAST, SCA and secret scans.",
      },
      {
        tag: [{ value: "Artifact Security" }],
        title: "Keyless signing support using OIDC",
        description: "Support SBOM and SLSA attestations, as well as artifact signing, using keyless workflows powered by Harness OIDC.",
      },
      {
        tag: [{ value: "Dependency Management" }, { value: "Repo Security" }],
        title: "OSS Risks (Malicious Package Detection, TypoSquatting)",
        description: "Detect malicious open source packages, typosquatted dependencies, and other suspicious components across your repositories and artifacts.",
      },
      {
        tag: [{ value: "SLSA" }],
        title: "SLSA for non-containers",
        description: "Enable SLSA provenance generation and verification for non-container artifacts.",
      },
      {
        tag: [{ value: "Risk & Compliance" }, { value: "OWASP" }],
        title: "OWASP OSS Top 10 Risks",
        description: "Visibility into outdated, unmaintained and End of Life components using SBOMs.",
      },
      {
        tag: [{ value: "Repo Security" }],
        title: "Repo Security Posture Management for GitHub",
        description: "Identify misconfigurations in source code repositories based on industry standards such as CIS v1.0 and OWASP Top 10 CI/CD Security Risks. Also, includes support for SBOM generation and security tests such as SAST, SCA, and secrets scanning.",
      },
      {
        tag: [{ value: "Governance" }, { value: "Audit Trail" }],
        title: "Artifact Chain of Custody",
        description: "Auditors can now review an artifact chain of custody - a comprehensive audit trail for auditors that serves as a ledger for every artifact built and deployed in a CI/CD pipeline.",
      },
      {
        tag: [{ value: "Risk & Compliance" }],
        title: "Compliance Report Generation",
        description: "Generate and download reports based on compliance standards such as CIS v1.0, and OWASP Top 10 CI/CD Security Risks.",
      },
      {
        tag: [{ value: "Artifact Security" }, { value: "GitHub Actions" }],
        title: "SBOM & SLSA support with GitHub Actions",
        description: "Generate SBOM and achieve SLSA compliance using GitHub Actions for artifacts built in GitHub.",
      },
      {
        tag: [{ value: "Artifact Security" }],
        title: "Artifact Signing and Verification (Containers & Non-Containers)",
        description: "Ensure built artifacts are not tampered before deployment.",
      },
      {
        tag: [{ value: "AI" }],
        title: "AI Chatbot",
        description: "AI-powered chatbot capabilities to assist users within the SCS module.",
      },
      {
        tag: [{ value: "SBOM" }],
        title: "SBOM Direct and Indirect Dependencies",
        description: "Gain full visibility into OSS usage in your code repos by analyzing both direct and transitive dependencies for comprehensive risk insights.",
      },
    ],
  },
};