import { Horizon } from "./roadmapData";

export const SscaData: Horizon = {
  "Now": {
    description: "What is being delivered now",
    feature: [
      {
        tag: [],
        title: "Unified security view",
        description: "Consolidate OSS dependencies, vulnerabilities, and deployment details for artifacts in one place.",
      },
      {
        tag: [],
        title: "Base Image Classification",
        description: "Distinguish components between base images and applications.",
      },
      {
        tag: [],
        title: "Transitive Dependencies",
        description: "Track the inclusion path of transitive dependencies for deeper insight.",
      },
      {
        tag: [],
        title: "Dashboard",
        description: "Summarize critical supply chain assurance data, highlighting areas requiring attention.",
      },
    ],
  },
  "Next": {
    description: "What is being developed next",
    feature: [
      {
        tag: [],
        title: "Component View",
        description: "Provide a centralized view of all components with their quality and security statuses across applications.",
      },
      {
        tag: [],
        title: "Chain of custody",
        description: "Gather and attest evidences of all actions taken on an artifact from source to production to ensure integrity",
      }
    ],
  },
  "Later": {
    description: "What is being developed later",
    feature: [
      {
        tag: [],
        title: "Artifact’s Security Scorecard",
        description: "Assess and govern artifact security maturity using multiple parameters.",
      },
      {
        tag: [{ value: "VEX" }],
        title: "VEX",
        description: "Enable VEX (Vulnerability Exploitability eXchange) generation and sharing for better vulnerability management",
      },
      {
        tag: [{ value: "SBOM" }],
        title: "Additional SBOM Tools",
        description: "Expand SBOM generation capabilities with additional tool support",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
    ],
  },
};
