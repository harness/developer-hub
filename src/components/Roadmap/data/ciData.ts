import { Horizon } from "./roadmapData";

export const CiData: Horizon = {
  Now: {
    description: "Q3 2025, August-October 2025",
    feature: [
      {
        tag: [{ value: "Fast" }],
        title: "Flaky tests management",
        description: "Identify, track, and manage flaky tests to improve test reliability and build stability.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for Integration Tests",
        description: "Enable test selection and insights for integration tests, extending Test Intelligence beyond unit testing.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Simplify migration from Drone to Harness platform",
        description: "Customers can run Drone pipelines on the Harness platform using runtime conversion and dynamic pipelines, simplifying the migration path.",
      },
      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - Azure",
        description: "Securely connect to Microsoft Azure through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
      {
        tag: [{ value: "Code Quality" }],
        title: "Code Coverage",
        description: "Upload code coverage reports to Harness. Visualize overall coverage and coverage for changed code to track gaps, enforce thresholds, and improve test completeness over time.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Upload and Display Build Artifacts",
        description: "Preview build artifacts like HTML test coverage reports directly in the browser, or download them from Harness-managed storage for deeper inspection.",
      },
      {
        tag: [{ "value": "Usability" }],
        title: "Run Git Commands Post-Clone Without Re-authentication",
        description: "Support for easily running Git commands in any Run step after the repository is cloned via Git Connector, removing the need to handle authentication explicitly."
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Additional VM images for macOS and Linux with Harness Cloud",
        description: "We're expanding our Cloud offering to support multiple VM images for macOS and Linux, giving users the flexibility to choose from a predefined set of images. This allows teams to run builds on both the latest and previous stable OS versions, ensuring compatibility with different environments.",
      }, 
      {
        tag: [{ value: "Cloud" }],
        title: "Save/Restore Cache Steps with Harness Cloud Storage",
        description: "New Save and Restore Cache steps will be introduced to complement Cache Intelligence, giving users more control and flexibility over caching behavior, such as the ability to use a cache key calculated within the stage.",
      }, 
    ],
  },
  Next: {
    description: "Q4 2025, November 202 5- January 2026",
    feature: [
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for JavaScript-based languages with Cypress",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related to the code changes made.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Go",
        description: "Speed up Go builds by reusing outputs from previous runs and avoiding redundant compilation of unchanged code.",
      },
      {
        tag: [{ value: "Intelligence" }],
        title: "Support for Code Coverage integration with Test Intelligence",
        description: "Show accurate code coverage metrics even when only a subset of tests is executed through Test Intelligence, helping teams maintain visibility without running the full suite.",
      },
      {
        tag: [{ value: "Self-hosted" }],
        title: "Support Azure storage with Caching Intelligence features",
        description: "Use Azure Blob Storage as a backend for Build Intelligence, Cache Intelligence, and Docker Layer Caching, when using self-hosted build infrastructure.",
      },
      {
        tag: [{ value: "AI" }],
        title: "AI-powered errors classification",
        description: "AI-powered error classification to enable meaningful pipeline failure messages and dashboards, surfacing meaningful, human-readable insights on the root cause build and test failures.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Test Insights",
        description: "Visualize test metrics such as pass/fail rates, duration trends, and flake frequency across builds.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Harness Cloud - GPU Enabled Machines",
        description: "Run GPU-accelerated workloads such as machine learning training, simulation, or graphics-heavy builds directly on Harness Cloud infrastructure.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Harness Cloud - support for larger Windows Machines",
        description: "Access high-capacity Windows machines in Harness Cloud to support resource-intensive workloads.",
      },
    ],
  },
  Later: {
    description: "Q1 2026, February 2026 & beyond",
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
        tag: [{ value: "Kubernetes" }],
        title: "Pod Spec Customization for Kubernetes Infrastructure",
        description: "Harness will enhance the `podSpecOverlay` field to support full Kubernetes Pod YAML customization. This enables users to apply custom attributes such as security contexts, topology spread constraints and so on, offering fine-grained control for compliance, performance, and platform-specific requirements.",
      }, 
       {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Maven",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch. Support will be added for Maven build tool, for both Cloud and self-hosted builds.",
      },

      {
        tag: [{ value: "Fast" }, {value: "beta" }],
        title: "Test Intelligence for JavaScript-based languages with Jest",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related to the code changes made.",
      },
      {
        tag: [{ value: "Fast" }, {value: "beta" }],
        title: "Test Intelligence for Kotest",
        description: "Accelerate testing cycles of Kotest applications with Test Intelligence, selectively running only tests that cover the code changes made.",
      },  
      {
        tag: [{ value: "Fast" }],
        title: "Default Settings for Cache Intelligence and Build Intelligence",
        description: "Introduced default settings to control whether Cache Intelligence and Build Intelligence are enabled automatically when creating a new CI stage.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Using external secret managers with Harness Cloud",
        description: "Enables an encrypted, secure tunnel between the Harness Cloud network and your private network, allowing you to safely use Harness Cloud infrastructure with privately-hosted assets such as internal artifact or code repositories."
      ,
      }, 
      {
        tag: [{ value: "Integrations" }],
        title: "Improvements for Build and Push steps",
        description: "Enhancing the Build and Push steps with a 'build-only' and 'push-only' mode, allowing for local vulnerability scans. These improvements make it easier to accomplish the build-local scan-and-push flow, or building once and pushing to multiple Docker registries.",
      }

    ],
  },
};

