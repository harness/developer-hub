import { Horizon } from "./roadmapData";

export const CiData: Horizon = {
  Now: {
    description: "Q4 2025, November 2025 - January 2026",
    feature: [ 
      {
        tag: [{ value: "Code Quality" }],
        title: "Code Coverage",
        description: "Upload code coverage reports to Harness. Visualize overall coverage and coverage for changed code to track gaps, enforce thresholds, and improve test completeness over time.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Flaky Test Detection",
        description: "Identify and track flaky tests to improve test reliability and build stability.",
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "Flaky Test Management",
        description: "Define custom rules to qualify flaky tests and manage quarantine list to separate noise from signals in test suites.",
      },
      {
        tag: [{ value: "AI" }],
        title: "CI Auto-Fix",
        description: "Harness AI agents detect and remediate failing builds automatically. The system learns from code changes and CI failures, applies targeted fixes, and iterates until the pipeline passes—reducing manual intervention and accelerating developer velocity."
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "Support for Code Coverage integration with Test Intelligence",
        description: "Show accurate code coverage metrics even when only a subset of tests is executed through Test Intelligence, helping teams maintain visibility without running the full suite.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Go",
        description: "Speed up Golang builds by reusing outputs from previous runs and avoiding redundant compilation of unchanged code.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Error Classification",
        description: "Rule-based error classification to enable meaningful pipeline failure messages and dashboards, surfacing human-readable insights on the root cause, build and test failures.",
      },
      {
        tag: [{ value: "Self-hosted" }],
        title: "Support Azure storage with Caching Intelligence features",
        description: "Use Azure Blob Storage as a backend for Build Intelligence, Cache Intelligence, and Docker Layer Caching, when using self-hosted build infrastructure.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "CPU and Resource Insights",
        description: "Visibility into CPU and memory consumption pipeline stages running on Harness Cloud infrastructure, enabling performance tuning and better resource class selection.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Harness Cloud - GPU Enabled Machines",
        description: "Run GPU-accelerated workloads such as machine learning training, simulation, or graphics-heavy builds directly on Harness Cloud infrastructure.",
      }
    ],
  },
  Next: {
    description: "Q1 2026, February 2026 - April 2026",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Sharing Artifacts in Harness",
        description: "Upload, preview & download build artifacts like dependencies, release artifacts or HTML test coverage reports directly in the browser, or download them from Harness-managed storage across stages for reuse or inspection.",
      },
      {
        tag: [{ value: "AI" }],
        title: "AI-powered errors classification",
        description: "AI-powered error classification to enable meaningful pipeline failure messages and dashboards, surfacing human-readable insights on the root cause, build and test failures.",
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "Test Intelligence for JavaScript-based languages with Cypress",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related to the code changes made.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Test Insights",
        description: "Visualize test metrics such as pass/fail rates, duration trends, and flake frequency across builds.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence with Test splitting",
        description: "Accelerate test cycles of applications with the ability to dynamically split tests across workers with Test Intelligence.",
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
    description: "April 2026 & beyond",
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
      }
    ], 
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Adoption" }],
        title: "Seamless Migration from Drone to Harness",
        description: "Run existing Drone pipelines natively on the Harness platform with automatic runtime conversion and dynamic pipelines—making migration frictionless and significantly faster."
      },
      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - Azure",
        description: "Securely connect to Microsoft Azure through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
      {
        tag: [{ value: "Usability" }],
        title: "Run Git Commands Post-Clone Without Re-authentication",
        description: "Support for easily running Git commands in any Run step after the repository is cloned via Git Connector, removing the need to handle authentication explicitly.",
        link: "/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase"
      },
      {
        tag: [{ value: "Developer Experience"}, {value: "Kubernetes" }],
        title: "Pipeline Annotations",
        description: "Publish rich markdown-based summaries via custom markdown scripts in run steps displayed directly in the Annotations tab of an execution. This provides quick, structured visibility into key metrics and build insights, without digging through logs.",
        link: "/docs/platform/pipelines/harness-annotations"
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Additional VM images for Linux with Harness Cloud",
        description: "We're expanding our Cloud offering to support multiple VM images Linux, giving users the flexibility to choose from a predefined set of images. This allows teams to run builds on both the latest and previous stable OS versions, ensuring compatibility with different environments.",
        link: "/docs/platform/references/harness-cloud-vm-images"
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Save/Restore Cache Steps with Harness Cloud Storage",
        description: "New Save and Restore Cache steps will be introduced to complement Cache Intelligence, giving users more control and flexibility over caching behavior, such as the ability to use a cache key calculated within the stage.",
        link: "/docs/continuous-integration/use-ci/caching-ci-data/save-restore-cache-in-harness"
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Additional VM images for MacOS with Harness Cloud",
        description: "We're expanding our Cloud offering to support latest MacOS images within days of release. This allows developer teams to run builds on the latest and previous stable OS versions (with the latest Xcode 16.3 pre-installed).",
        link: "/docs/platform/references/harness-cloud-vm-images"
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Harness Cloud - support for larger Windows Machines",
        description: "Access high-capacity Windows machines in Harness Cloud to support resource-intensive workloads.",
        link: "/docs/continuous-integration/get-started-ci-subscription-mgmt/#custom-model"
      },
      
      {
        tag: [{ value: "Fast" }, {value: "beta" }],
        title: "Test Intelligence for JavaScript-based languages with Jest",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related to the code changes made.",
      }
    ],
  },
};


