import { Horizon } from "./roadmapData";

export const SscaData: Horizon = {
  
  "Now": {
    description: "Q3 2025, August 2025 - October 2025",
    feature: [
      // {
      //   tag: [{value: "Artifact Security"}],
      //   title: "Non-Container based Artifact Signing & Verification",
      //   description: "Support for signing and verification for non-containerized artifacts like helm charts, manifest files, JARs, WARs, etc.",
      // },
      {
         tag: [{value: "SBOM"}],
         title: "SBOM Ingestion for Non-Containerized Artifacts",
         description: "Enable ingestion of SBOMs for artifacts such as WAR, JAR, and other non-containerized files.",
      },
      {
        tag: [{value : "Governance"}, {value: "Audit Trail"}],
        title: "Artifact Chain of Custody v2",
        description: "Enhanced audit trail that seamlessly integrates all pipeline events at an account level, spanning from source code to deployment.",
      },
      {
        tag: [{value: "AI"}],
        title: "AI Chatbot",
        description: "AI-powered chatbot capabilities to assist users within the SCS module",
      },
      {
        tag: [{value : "Risk & Compliance"}, {value : "OWASP"}],
        title: "OWASP OSS Top 10 Risks",
        description: "Visibility into End of Life components using SBOMs.",
      },
      {
        tag: [{value: "Artifact Security"}],
        title: "Keyless attestation/signing support",
        description: "Support SBOM and SLSA attestations, as well as artifact signing, using keyless workflows.",
      },
      {
        tag: [{value : "Risk & Compliance"}],
        title: "Global Artifact & Repository visibility",
        description: "Account-wide views of repositories and artifacts, enabling unified visibility and oversight across all resources.",
      },
       {
        tag: [{value: "Dependency Management"}],
        title: "Automate OSS Dependency Updates",
        description: "Automatically generate PRs for updating outdated dependencies.",
      },
    
    ],
  },
  "Next": {
    description: "Q4 2025, November 2025 - January 2026",
    feature: [
      {
        tag: [{value: "Integration"}, {value : "Artifact Security"}],
        title: "Cosign AWS Support",
        description: "Leverage keys from AWS KMS to sign and verify artifacts.",
      },
      // {
      //   tag: [{value: "Visibility"}],
      //   title: "Global Level View",
      //   description: "Gain complete visibility into all artifact and code repositories across projects, along with their associated findings, in a unified account-level view.",
      // },
      {
         tag: [{value: "UX"}],
         title: "UX Enhancements",
         description: "Improving search, filtering across product pages and overall user experience",
      },
      {
          tag: [{value : "SLSA"}, {value: "Artifact Security"}],
          title: "SLSA Policies",
          description: "Out of the box policies to ensure compliance with Level 1, Level 2, and Level 3 requirements.",
      },
      {
        tag: [{value : "Repo Security"}],
        title: "Repo Security Posture Management for Harness Code",
        description: "Identify misconfigurations in source code repositories based on industry standards such as CIS v1.0 and OWASP Top 10 CI/CD Risk. Also, includes support for SBOM generation and security tests such as SAST, SCA, and secrets scanning.",
      },
      {
        tag: [{value: "Run time Security"}],
        title: "Run Time Security for CI/CD Pipelines",
        description: "Protect your Harness CI/CD pipelines from supply chain attacks by detecting anomalies and unauthorized activity through real-time system and network event monitoring.",
      },
      {
        tag: [{value : "Governance"}, {value: "Risk & Compliance"}],
        title: "OSS Top 10 Policies",
        description: "Out of the box policies to identify risks in open source dependencies based on the OSS Top 10 risks, with the ability to block builds and deployments when critical vulnerabilities or license violations are detected.",
      },
      
    ],
  },
  "Later": {
    description: "Q1 2026+, February 2026 & beyond",
    feature: [
      {
        tag: [{value : "CI/CD Security"}],
        title: "CI/CD Security for Jenkins",
        description: "Perform static analysis to detect risks and misconfigurations in Jenkins pipelines.",
      },
      {
        tag: [{value : "SBOM"}, {value : "SLSA"}, {value: "CI/CD Security"}],
        title: "SBOM & SLSA Support for Jenkins",
        description: "Generate SBOMs and achieve SLSA compliance using Jenkins pipelines.",
      },
      {
        tag: [{value : "Risk & Compliance"}],
        title: "NIST SP800-204D Support",
        description: "Out of the box rules for supporting NIST SP800-204D compliance standards.",
      },
      {
        tag: [{value: "Artifact Security"}, {value: "SBOM"}],
        title: "SBOM Scoring in Drift Detection",
        description: "View risk scores on dependencies that get added or removed between artifact drifts which contain vulnerabilities, have invalid licenses, or are unmaintained.",
      },
       {
        tag: [{value: "Integration"}, {value : "OpenSSF"}],
        title: "OpenSSF Integration",
        description: "Support for OpenSSF Rules.",
      },
      {
        tag: [{value: "Integration"},{value: "Repo Security"}],
        title: "Support for Gitlab & Bitbucket",
        description: "Complete support for GitLab and Bitbucket, allowing users to onboard repositories and perform configuration checks, SBOM generation, and security scans.",
      },
      // {
      //   tag: [{value : "Remediation"}, {value: "AppSec"}],
      //   title: "Remediation Tracker",
      //   description: "Assign vulnerabilities & compliance issues to developers using remediation tracker to track across different types of targets (Artifacts, CI/CD, Repos).",
      // },
      {
        tag: [{value : "Risk & Compliance"}, {value : "AppSec"}],
        title: "Exemption Management",
        description: "Manage exemptions for risk and compliance issues across all targets (Artifacts, CI/CD, Repos).",
      },
    ],
  },
  "Released": {
    description: "What has been released",
    feature: [
      {
         tag: [{value : "Risk & Compliance"}],
         title: "OWASP OSS Top 10 Risks (Beta)",
         description: "Visibility into outdated and unmaintained components using SBOMs"
      },
      {
        tag: [{value : "Repo Security"}],
        title: "Repo Security Posture Management for GitHub",
        description: "Identify misconfigurations in source code repositories based on industry standards such as CIS v1.0 and OWASP Top 10 CI/CD Security Risks. Also, includes support for SBOM generation and security tests such as SAST, SCA, and secrets scanning.",
      },
      {
        tag: [{value : "Governance"}, {value: "Audit Trail"}],
        title: "Artifact Chain of Custody",
        description: "Auditors can now review an artifact chain of custody - a comprehensive audit trail for auditors that serves as a ledger for every artifact built and deployed in a CI/CD pipeline.",
      },
      // {
      //   tag: [{value : "CI/CD Security"}],
      //   title: "CI/CD Security Posture Management for GitHub Workflows & Harness Pipelines",
      //   description: "Perform static analysis in GitHub workflows and Harness pipelines to detect risky actions and misconfigurations.",
      // },
      {
        tag: [{value : "Risk & Compliance"}],
        title: "Compliance Report Generation",
        description: "Generate and download reports based on compliance standards such as CIS v1.0, and OWASP Top 10 CI/CD Security Risks.",
      },
      {
        tag: [{value : "Artifact Security" }, {value : "GitHub Actions"}],
        title: "SBOM & SLSA support with GitHub Actions",
        description: "Generate SBOM and achieve SLSA compliance using GitHub Actions for artifacts built in GitHub.",
      },
      {
        tag: [{value: "Artifact Security"}],
        title: "Artifact Signing and Verification (Containers & Non-Containers)",
        description: "Ensure built artifacts are not tampered before deployment.",
      },
      {
        tag: [{value : "Risk & Compliance"}],
        title: "Report Generation",
        description: "Generate comprehensive license reports detailing the licenses associated with artifacts.",
      },
      {
        tag: [{value: "API"}],
        title: "API Support",
        description: "Enable bulk onboarding of GitHub repos across orgs and accounts, and provide SBOM download APIs for repos and artifacts."
      },
    ],
  },
};
