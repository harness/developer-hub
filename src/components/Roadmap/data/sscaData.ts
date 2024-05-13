import { Horizon } from "./roadmapData";

export const SscaData: Horizon = {
  "Now": {
    description: "Q1 2024, Feb-Apr 2024",
    feature: [
      {
        tag: [],
        title: "Unified Security View",
        description: "A unified view on OSS dependencies, vulnerabilities, and deployment details for artifacts all in one place.",
      },
      {
        tag: [],
        title: "ECR & ACR support",
        description: "Support to connect with ECR and ACR for SBOM generation and management",
      },
      {
        tag: [],
        title: "Base Image Detection",
        description: "The feature helps in prioritizing vulnerability assessment between base images and applications, while also enforcing policies such as identifying newer versions of base images.",
      },
    ],
  },
  "Next": {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [],
        title: "Code Repo Posture Management",
        description: "Config check to ensure that your source code repositories, artifacts and CI/CD Tools used in supply chain are appropriately monitored for best practices",
      },
      {
        tag: [],
        title: "Support for GitHub",
        description: "Complete support for GitHub with allowing user to onboard and perform checks on repos, artifacts and pipeline checks against out of the box rules",
      },
      {
        tag: [],
        title: "Report Generation",
        description: "Generate and download reports based on compliance standards such as CIS, OWASP and SLSA",
      }
    ],
  },
  "Later": {
    description: "Q3 2024+, Aug 2024 & beyond",
    feature: [
      {
        tag: [],
        title: "OpenSSF Scorecard Integration",
        description: "Assess open source projects for security risks through a series of automated checks.",
      },
      {
        tag: [],
        title: "Support for GitLab and Jenkins",
        description: "Complete support for Gitlab and Jenkins with allowing user to onboard, ingest metadata and perform config check on repositories, artifacts and CI/CD Tools against out of the box rules",
      },
      {
        tag: [],
        title: "Compliance Standards",
        description: "Support for US EO14028, NIST SP-80 and Cyber Resiliency Act",
      },
    ],
  },
};
