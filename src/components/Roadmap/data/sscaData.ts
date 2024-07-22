import { Horizon } from "./roadmapData";

export const SscaData: Horizon = {
  "Released": {
    description: "What has been released",
    feature: [
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
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [],
        title: "Repo Security Posture Management",
        description: "Configuration checks to ensure that your source code repositories used in the supply chain are appropriately monitored for best security practices, including SBOM generation and security tests such as SAST, SCA, and secrets scanning.",
      },
      {
        tag: [],
        title: "Support for GitHub",
        description: "Complete support for GitHub, allowing users to onboard using the GitHub app and perform configuration checks, SBOM generation, and security scans.",
      },
      {
        tag: [],
        title: "Report Generation",
        description: "Generate and download reports based on compliance standards such as CIS, OWASP, and SLSA.",
      },
      {
        tag: [],
        title: "Artifact Chain of Custody",
        description: "Auditors can now review an artifact chain of custody - a comprehensive audit trail that serves as a ledger for every artifact built and deployed in a CI/CD pipeline.",
      },
    ],
  },
  "Next": {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [],
        title: "CI/CD Security Posture Management",
        description: "Checks on CI/CD pipelines to detect risky actions and misconfigs",
      },
      {
        tag: [],
        title: "Support for Harness Code for RSPM",
        description: "Complete support for Harness Code, allowing users to onboard using the GitHub app and perform configuration checks, SBOM generation, and security scans.",
      },
      {
        tag: [],
        title: "SBOM & SLSA support with GitHub Actions and Jenkins Plugins",
        description: "Generate SBOM and achieve SLSA compliance using GitHub Actions and Jenkins Plugins.",
      },
      {
        tag: [],
        title: "NIST SP-800, OWASP Top 10 OSS, EO14028 Support",
        description: "Added support for NIST SP-800, OWASP Top 10 OSS, and EO14028 compliance standards.",
      },
      {
        tag: [],
        title: "OpenSSF Scorecard Integration",
        description: "Assess open source projects for security risks through a series of automated checks.",
      },
    ],
  },
  "Later": {
    description: "Q4 2024+, Nov 2024 & beyond",
    feature: [
      {
        tag: [],
        title: "SBOM Risk Scoring",
        description: "Added support for SBOM scoring against risky OSS components.",
      },
      {
        tag: [],
        title: "Governance Policies for Compliance Standard",
        description: "Allow users to enforce governance policies against the supported compliance standards.",
      },
      {
        tag: [],
        title: "Remediation Tracker Support for Compliance Standards Violations",
        description: "Create and manage remediation trackers for compliance standard violations.",
      },
    ],
  },
};
