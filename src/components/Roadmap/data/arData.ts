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
    description: "Q2 2026",
    feature: [
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "Debian Packages",
        description: "Store and manage Debian packages",
      },
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "Alpine Packages",
        description: "Store and manage Alpine packages",
      },
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "Puppet Packages",
        description: "Store and manage Puppet packages",
      },
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "RubyGems Packages",
        description: "Store and manage RubyGems.",
      },
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "Conan Packages",
        description: "Store and Manage C++ Conan packages",
      },
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "R Packages",
        description: "Store and Manage R packages",
      },
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "Terraform Modules and Providers",
        description: "Store and Manage Terraform Modules and Providers",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Artifact Lifecycle Management",
        description: "Automate artifact retention, cleanup, and archival with lifecycle policies",
      },
      {
        tag: [{ value: "Visibility and Insights" }],
        title: "Custom Dashboards",
        description: "Visualize key metrics and activity across registries with built-in dashboards",
      },
      {
        tag: [{ value: "AI" }],
        title: "AI Chatbot",
        description: "AI-powered chatbot capabilities to assist users within the AR module",
      },
      {
        tag: [{ value: "Cost Optimization" }],
        title: "Cold Storage Tiering",
        description: "Optimize costs by automatically moving infrequently used artifacts to cold storage",
      },
    ],
  },
  Next: {
    description: "Q3 2026",
    feature: [
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "Vagrant Packages",
        description: "Store and manage Alpine packages",
      },
      {
        tag: [{ value: "AI" }],
        title: "Agent Skills Support",
        description: "Store and manage Agent Skills",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Storage Quota Configuration",
        description: "Define and enforce storage quotas across projects and orgs",
      },
      {
        tag: [{ value: "AI" }],
        title: "Semantic Artifact Discovery",
        description: "Find artifacts intelligently using context aware, natural language search.",
      },
      {
        tag: [{ value: "CD Integration" }],
        title: "Harness CD Integration",
        description: "Enable Artifact Registry as a native artifact source across Kubernetes Helm, Native Helm, and Deployment templates",
      },
    ],
  },
  Later: {
    description: "Q4 2026",
    feature: [
      {
        tag: [{ value: "Governance" }],
        title: "Geo-Based Access",
        description: "Control artifact access based on user geography",
      },
      {
        tag: [{ value: "AI" }],
        title: "OSS Gatekeeper Agent",
        description: "Enforce policies using a lightweight gatekeeper agent",
      },
      {
        tag: [{ value: "Integration" }],
        title: "Harness IDP Integration",
        description: "Integrate Artifact Registry insights and actions directly into the Harness Internal Developer Portal",
      },
      {
        tag: [{ value: "CI/CD Integration" }],
        title: "Artifact Promotion Step",
        description: "Promote artifacts across environments with a native CI/CD step for controlled release flows",
      },
    ],
  },
  Released: {
    description: "Q1 2026",
    feature: [
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "Swift Packages",
        description: "Store and manage Swift packages",
      },
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "Raw Packages",
        description: "Store and manage raw packages including generic files without versions.",
      },
      {
        tag: [{ value: "Package Ecosystem" }],
        title: "Poetry/UV Client Support",
        description: "Support for Poetry and uv clients for Python packages",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Soft Delete for Artifacts",
        description: "Recover accidentally deleted registries, packages, or versions with soft delete support",
      },
      {
        tag: [{ value: "Security" }, { value: "Governance" }],
        title: "Audit for Artifact Access",
        description: "Track and audit artifact downloads, uploads, and access events for full traceability via dashboards",
      },
      {
        tag: [{ value: "Security" }, { value: "Governance" }],
        title: "Dependency Firewall: Exemptions and Notifications",
        description: "Allow for exemption management for blocked packages, with notification support",
      },
    ],
  },
};
