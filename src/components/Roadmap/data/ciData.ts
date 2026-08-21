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
    description: "Q3 2026, August 2026 - October 2026",
    feature: [
      {
        tag: [{ value: "Code Quality" }],
        title: "Code Coverage with Test Intelligence for Python and Java",
        description: "Enable code coverage reporting when using Test Intelligence, showing accurate coverage metrics even when only a subset of tests is executed.",
      },
      {
        tag: [{ value: "Code Quality" }],
        title: "Visualize Code Coverage across branches and repositories",
        description: "Track code coverage trends over time across different branches and repositories, gaining insights into coverage gaps and improvements.",
      },
      {
        tag: [{ value: "Code Quality" }],
        title: "View coverage on Pull Requests and Status Checks",
        description: "See code coverage metrics directly on pull requests with status checks that enforce coverage thresholds before merging.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "View detailed test level execution and flake history",
        description: "Visualize test metrics such as pass/fail rates, duration trends, and flake frequency across builds with detailed test-level insights.",
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "Test Intelligence for Integration Tests",
        description: "Test Intelligence will learn the full dependency chain for each test across service boundaries, allowing tests that hit external services to also be selectively run.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Harness Cloud - GPU Enabled Machines",
        description: "Run GPU-accelerated workloads such as machine learning training, simulation, or graphics-heavy builds directly on Harness Cloud infrastructure.",
      },
      {
        tag: [{ value: "Cloud" }, { value: "Networking" }],
        title: "Native Support for Reverse Proxy",
        description: "Add native reverse proxy support for Harness Cloud CI workflows, enabling secure connectivity to private services (artifact registries, code repositories, etc) and replacing 'Secure Connect'.",
      },
      {
        tag: [{ value: "Cloud" }, { value: "Networking" }],
        title: "Egress Control for Harness Cloud",
        description: "Production launch of native egress control for Harness Cloud on Linux and Windows, enabling secure firewall rules to control outbound traffic from build environments.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Upload and Display Artifacts",
        description: "Upload build artifacts and metadata to Harness-managed storage. View them directly in the browser alongside pipeline execution results or download for inspection and debugging.",
      },
      {
        tag: [{ value: "AI" }],
        title: "AI-powered errors classification",
        description: "AI-powered error classification to enable meaningful pipeline failure messages and dashboards, surfacing human-readable insights on the root cause, build and test failures.",
      },
    ],
  },
  Next: {
    description: "Q4 2026, November 2026 - January 2027",
    feature: [
      {
        tag: [{ value: "Intelligence" }],
        title: "Test Intelligence for JavaScript-based languages with Cypress",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related to the code changes made.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Go",
        description: "Speed up Golang builds by reusing outputs from previous runs and avoiding redundant compilation of unchanged code.",
      },
    ],
  },
  Later: {
    description: "February 2027 & beyond",
    feature: [
      {
        tag: [{ value: "Integrations" }, { value: "Mobile" }],
        title: "Native integration with Fastlane",
        description: "Simplify building and publishing iOS and Android applications with native Fastlane integration.",
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "CocoaPods Support with Cache Intelligence",
        description: "Accelerate mobile development and build times with Cache Intelligence for CocoaPods.",
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "Matrix Support for Test Intelligence",
        description: "Enable Test Intelligence to work seamlessly across matrix build configurations, intelligently selecting tests for each matrix combination.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
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
        title: "Smart Parallelism with Test Intelligence",
        description: "Optimize resource usage by intelligently allocating only the required number of parallel stages based on selected tests, eliminating idle machines when parallelism exceeds test groups. Support for Python, Java, C#, Ruby, Scala, and Kotlin.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Harness Cloud - CPU and Resource Insights",
        description: "Visibility into CPU and memory consumption pipeline stages running on Harness Cloud infrastructure, enabling performance tuning and better resource class selection.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Real-Time Status for Containerized Step Groups",
        description: "Show real-time step status updates during execution for containerized step groups.",
      },
      {
        tag: [{ value: "Fast" }, {value: "beta" }],
        title: "Test Intelligence for JavaScript-based languages with Jest",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related to the code changes made.",
      },
      {
        tag: [{ value: "Self-hosted" }],
        title: "Azure Blob Storage support for Build Intelligence and Docker Layer Caching",
        description: "Use Azure Blob Storage as a backend for Build Intelligence and Docker Layer Caching when using self-hosted build infrastructure.",
      },
      {
        tag: [{ value: "Cloud" }, { value: "Networking" }],
        title: "PrivateLink Productisation",
        description: "Enable self-service of AWS PrivateLink for Harness Cloud CI workflows, enabling secure connectivity to private services (artifact registries, code repositories, etc).",
      },
    ],
  },
};
