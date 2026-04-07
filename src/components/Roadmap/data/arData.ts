import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const arModuleTheme: ModuleTheme = {
  moduleKey: "ar",
  moduleTitle: "Artifact Registry",
  palette: {
    light: { bg: "#E2F5FF", text: "#0672B6" },
    dark: { bg: "#1A3045", text: "#6BB3E8" },
  },
};

export const arData: Horizon = {
  Now: {
    description: "🚧 Q1 2026",
    feature: [
      {
        title: "Debian Packages",
        description: "Store and manage Debian packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Swift Packages",
        description: "Store and manage Swift packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Puppet Packages",
        description: "Store and manage Puppet packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Raw Packages",
        description:
          "Store and manage raw packages including generic files without versions.",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Poetry/UV Client Support",
        description:
          "Support for Poetry and uv clients for Python packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Artifact Lifecycle Management",
        description:
          "Automate artifact retention, cleanup, and archival with lifecycle policies",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Soft Delete for Artifacts",
        description:
          "Recover accidentally deleted registries, packages, or versions with soft delete support",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Audit for Artifact Access",
        description:
          "Track and audit artifact downloads, uploads, and access events for full traceability via dashboards",
        tag: [{ value: "Security" }, { value: "Governance" }],
      },
      {
        title: "Dependency Firewall: Exemptions and Notifications",
        description:
          "Allow for exemption management for blocked packages, with notification support",
        tag: [{ value: "Security" }, { value: "Governance" }],
      },
      {
        title: "AI Chatbot",
        description:
          "AI-powered chatbot capabilities to assist users within the AR module",
        tag: [{ value: "AI" }],
      },
    ],
  },
  Next: {
    description: "🪄 Q2 2026",
    feature: [
      {
        title: "Alpine Packages",
        description: "Store and manage Alpine packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "RubyGems Packages",
        description: "Store and manage RubyGems packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Storage Quota Configuration",
        description: "Define and enforce storage quotas across projects and orgs",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Custom Dashboards",
        description:
          "Visualize key metrics and activity across registries with built-in dashboards",
        tag: [{ value: "Visibility and Insights" }],
      },
      {
        title: "Semantic Artifact Discovery",
        description:
          "Find artifacts intelligently using context aware, natural language search.",
        tag: [{ value: "AI" }],
      },
      {
        title: "Harness CD Integration",
        description:
          "Enable Artifact Registry as a native artifact source across Kubernetes Helm, Native Helm, and Deployment templates",
        tag: [{ value: "CD Integration" }],
      },
    ],
  },
  Later: {
    description: "🔮 Q3 2026",
    feature: [
      {
        title: "Conan Packages",
        description: "Store and manage Conan packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Geo-Based Access",
        description: "Control artifact access based on user geography",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Cold Storage Tiering",
        description:
          "Optimize costs by automatically moving infrequently used artifacts to cold storage",
        tag: [{ value: "Cost Optimization" }],
      },
      {
        title: "OSS Gatekeeper Agent",
        description: "Enforce policies using a lightweight gatekeeper agent",
        tag: [{ value: "AI" }],
      },
      {
        title: "Harness IDP Integration",
        description:
          "Integrate Artifact Registry insights and actions directly into the Harness Internal Developer Portal",
        tag: [{ value: "Integration" }],
      },
      {
        title: "Artifact Promotion Step",
        description:
          "Promote artifacts across environments with a native CI/CD step for controlled release flows",
        tag: [{ value: "CI/CD Integration" }],
      },
    ],
  },
  Released: {
    description: "✅ Q4 2025",
    feature: [
      {
        title: "Conda Packages",
        description: "Store and manage Conda packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Dart Packages",
        description: "Store and manage Dart packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "PHP Composer Packages",
        description: "Store and manage PHP Composer packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Custom Artifact Metadata",
        description:
          "Add and manage custom metadata to enrich artifact context and traceability",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Download Option in UI",
        description: "Add one-click artifact download capability",
        tag: [{ value: "User Experience" }],
      },
      {
        title: "Dependency Firewall",
        description:
          "Automatically block risky or non-compliant OSS dependencies",
        tag: [{ value: "Security" }, { value: "Governance" }],
      },
      {
        title: "Harness CD Integration",
        description:
          "Enable Artifact Registry as a native artifact source across major CD deployment types",
        tag: [{ value: "CD Integration" }],
      },
      {
        title: "Harness CI Upload Step to Artifact Registry",
        description:
          "Simplify artifact publishing with a built-in upload step in Harness CI pipelines",
        tag: [{ value: "CI/CD Integration" }],
      },
    ],
  },
};
