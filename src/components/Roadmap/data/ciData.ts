import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const ciModuleTheme: ModuleTheme = {
  moduleKey: "ci",
  moduleTitle: "Continuous Integration",
  palette: {
    light: { bg: "#E2F5FF", text: "#0672B6" },
    dark: { bg: "#1A3045", text: "#6BB3E8" },
  },
};

export const CiData: Horizon = {
  Now: {
    description: "Q2 2026, May 2026 - July 2026",
    feature: [ 
      {
        tag: [{ value: "Code Quality" }],
        title: "Code Coverage",
        description: "Upload code coverage reports to Harness. Visualize overall coverage and coverage for changed code, track trends over time, gain insights into coverage gaps, enforce thresholds, and improve test completeness.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Test Insights",
        description: "Visualize test metrics such as pass/fail rates, duration trends, and flake frequency across builds.",
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "Test Intelligence for Java integration tests",
        description: "Test intelligence will learn the full dependency chain for each test across service boundaries, allowing tests that hit external services to also be selectively run.",
      },
      {
        tag: [{ value: "Self-hosted" }],
        title: "Azure Blob Storage support for Build Intelligence and Docker Layer Caching",
        description: "Use Azure Blob Storage as a backend for Build Intelligence and Docker Layer Caching when using self-hosted build infrastructure.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Harness Cloud - GPU Enabled Machines",
        description: "Run GPU-accelerated workloads such as machine learning training, simulation, or graphics-heavy builds directly on Harness Cloud infrastructure.",
      },
      {
        tag: [{ value: "Cloud" }, { value: "Networking" }],
        title: "PrivateLink Productisation",
        description: "Enable self-service of AWS PrivateLink for Harness Cloud CI workflows, enabling secure connectivity to private services (artifact registries, code repositories, etc).",
      },
      {
        tag: [{ value: "Cloud" }, { value: "Networking" }],
        title: "Native Support for Reverse Proxy",
        description: "Add native reverse proxy support for Harness Cloud CI workflows, , enabling secure connectivity to private services (artifact registries, code repositories, etc) and replacing 'Secure Connect'.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Upload and Display Artifacts",
        description: "Upload build artifacts and metadata to Harness-managed storage. View them directly in the browser alongside pipeline execution results or download for inspection and debugging.",
      },
    ],
  },
  Next: {
    description: "Q3 2026, August 2026 - October 2026",
    feature: [
      {
        tag: [{ value: "AI" }],
        title: "AI-powered errors classification",
        description: "AI-powered error classification to enable meaningful pipeline failure messages and dashboards, surfacing human-readable insights on the root cause, build and test failures.",
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "Support for Code Coverage integration with Test Intelligence",
        description: "Show accurate code coverage metrics even when only a subset of tests is executed through Test Intelligence, helping teams maintain visibility without running the full suite.",
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "Test Intelligence for JavaScript-based languages with Cypress",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related to the code changes made.",
      },

      {
        tag: [{ value: "Fast" }],
        title: "Smart Parallelism with Test Intelligence",
        description: "Optimize resource usage by intelligently allocating only the required number of parallel stages based on selected tests, eliminating idle machines when parallelism exceeds test groups. Support for Java, C#, Ruby, Scala, and Kotlin (Python is already supported).",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for Integration Tests",
        description: "Enable test selection and insights for integration tests, extending Test Intelligence beyond unit testing.",
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "CocoaPods Support with Cache Intelligence",
        description: "Accelerate mobile development and build times with Cache Intelligence for CocoaPods.",
      }
    ],
  },
  Later: {
    description: "November 2026 & beyond",
    feature: [       
      {
        tag: [{ value: "Integrations" }, { value: "Mobile" }],
        title: "Native integration with Fastlane",
        description: "Simplify building and publishing iOS and Android applications with native Fastlane integration.",
      },
      {
        tag: [{ value: "Mobile" }],
        title: "MobileOps",
        description: "Solutions to simplify and streamline mobile device testing, helping teams improve the efficiency and reliability of their mobile development workflows.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Go",
        description: "Speed up Golang builds by reusing outputs from previous runs and avoiding redundant compilation of unchanged code.",
      }
    ], 
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Cloud" }],
        title: "Save and Restore Cache Steps for Azure",
        description: "Save and restore CI caches with Azure Blob Storage using dedicated YAML steps and Microsoft identity provider authentication.",
        link: "/docs/continuous-integration/use-ci/caching-ci-data/save-cache-azure"
      },
      {
        tag: [{ value: "Fast" }, { value: "beta" }],
        title: "Flaky Test Detection",
        description: "Identify and track flaky tests to improve test reliability and build stability.",
      },
      {
        tag: [{ value: "Intelligence" }, { value: "beta" }],
        title: "Flaky Test Management",
        description: "Define custom rules to qualify flaky tests and manage quarantine list to separate noise from signals in test suites.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Smart Parallelism with Test Intelligence for Python",
        description: "Optimize resource usage by intelligently allocating only the required number of parallel stages based on selected tests, eliminating idle machines when parallelism exceeds test groups.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Error Classification",
        description: "Rule-based error classification to enable meaningful pipeline failure messages and dashboards, surfacing human-readable insights on the root cause, build and test failures.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Harness Cloud - CPU and Resource Insights",
        description: "Visibility into CPU and memory consumption pipeline stages running on Harness Cloud infrastructure, enabling performance tuning and better resource class selection.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Branch-Based Version Counters",
        description: "Track build numbering independently per branch, including pipelines with codebase disabled that use trigger event data.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Real-Time Status for Containerized Step Groups",
        description: "Show real-time step status updates during execution for containerized step groups.",
      },
      {
        tag: [{ value: "Adoption" }],
        title: "Seamless Migration from Drone to Harness",
        description: "Run existing Drone pipelines natively on the Harness platform with automatic runtime conversion and dynamic pipelines—making migration frictionless and significantly faster."
      },
      {
        tag: [{ value: "Secure" }, { value: "Cloud" }],
        title: "Azure Workload Identity for ACR Build and Push",
        description: "Authenticate Build and Push to Azure Container Registry steps with delegate-based User Assigned Managed Identity.",
        link: "/docs/continuous-integration/secure-ci/azure-oidc-token-plugin"
      },
      {
        tag: [{ value: "Fast" }, {value: "beta" }],
        title: "Test Intelligence for JavaScript-based languages with Jest",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related to the code changes made.",
      }
    ],
  },
};
