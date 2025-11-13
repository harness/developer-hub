import { Horizon } from "./roadmapData";

export const arData: Horizon = {
  Now: {
    description: "🚧 Q4 2025",
    feature: [
      {
        title: "Conda Packages",
        description: "Store and manage Conda packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Custom Artifact Metadata",
        description: "Add and manage custom metadata to enrich artifact context and traceability",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Dart Packages",
        description: "Store and manage Dart packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Soft Delete for Artifacts",
        description: "Recover accidentally deleted registries, packages, or versions with soft delete support",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Download Option in UI",
        description: "Add one-click artifact download capability",
        tag: [{ value: "User Experience" }],
      },
      {
        title: "Dependency Firewall",
        description: "Automatically block risky or non-compliant OSS dependencies",
        tag: [{ value: "Security" }, { value: "Governance" }],
      },
      {
        title: "Alpine Packages",
        description: "Store and manage Alpine packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "PHP Composer Packages",
        description: "Store and manage PHP Composer packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Harness CI Upload Step to Artifact Registry",
        description: "Simplify artifact publishing with a built-in upload step in Harness CI pipelines",
        tag: [{ value: "CI/CD Integration" }],
      },
      {
        title: "Harness CD Integration",
        description: "Enable Artifact Registry as a native artifact source across all CD deployment types",
        tag: [{ value: "CD Integration" }],
      },
    ],
  },
  Next: {
    description: "🪄 Q1 2026",
    feature: [
      {
        title: "Debian Packages",
        description: "Store and manage Debian packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Artifact Lifecycle Management",
        description: "Automate artifact retention, cleanup, and archival with lifecycle policies",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Audit for Artifact Access",
        description: "Track and audit artifact downloads, uploads, and access events for full traceability",
        tag: [{ value: "Security" }, { value: "Governance" }],
      },
      {
        title: "Custom Dashboards",
        description: "Visualize key metrics and activity across registries with built-in dashboards",
        tag: [{ value: "Visibility and Insights" }],
      },
      {
        title: "Swift Packages",
        description: "Store and manage Swift packages",
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
        title: "Semantic Artifact Discovery",
        description: "Find artifacts intelligently using context-aware, natural language search",
        tag: [{ value: "AI" }],
      },
      {
        title: "AI Chatbot",
        description: "AI-powered chatbot capabilities to assist users within the AR module",
        tag: [{ value: "AI" }],
      },
    ],
  },
  Later: {
    description: "🔮 Q2 2026",
    feature: [
      {
        title: "Conan Packages",
        description: "Store and manage Conan packages",
        tag: [{ value: "Package Ecosystem" }],
      },
      {
        title: "Artifact Promotion Step",
        description: "Promote artifacts across environments with a native CI/CD step for controlled release flows",
        tag: [{ value: "CI/CD" }],
      },
      {
        title: "Cold Storage Tiering",
        description: "Optimize costs by automatically moving infrequently used artifacts to cold storage",
        tag: [{ value: "Cost Optimization" }],
      },
      {
        title: "Geo-Based Access",
        description: "Control artifact access based on user geography",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Harness IDP Integration",
        description: "Integrate Artifact Registry insights and actions directly into the Harness Internal Developer Portal",
        tag: [{ value: "Integration" }],
      },
      {
        title: "OSS Gatekeeper Agent",
        description: "Enforce policies using a lightweight gatekeeper agent",
        tag: [{ value: "AI" }],
      },
    ],
  },
  Released: {
    description: "✅ Q3 2025",
    feature: [
      {
        title: "Hugging Face Model Store",
        description: "Easily store and manage Hugging Face models",
        tag: [{ value: "Package Ecosystem" }, { value: "AI Artifacts" }],
      },
      {
        title: "Upstream Proxy for Generic Artifacts",
        description: "Cache and proxy external Generic artifacts for faster, controlled access",
        tag: [{ value: "Upstream Proxy" }],
      },
      {
        title: "Artifact Quarantine",
        description: "Quarantine unsafe or non compliant artifacts and block their downloads",
        tag: [{ value: "Security" }],
      },
      {
        title: "Support for Public Registries",
        description: "Enable public access to selected registries for open sharing and distribution",
        tag: [{ value: "Artifact Access" }],
      },
      {
        title: "Aggregate Multiple Artifact Registries",
        description: "Combine multiple registries into one logical source for simplified access",
        tag: [{ value: "Developer Experience" }],
      },
      {
        title: "Artifact Registry CLI",
        description: "Manage and automate Artifact Registry operations directly from the command line",
        tag: [{ value: "Developer Experience" }, { value: "Automation" }],
      },
    ],
  },
};
