import { Horizon } from "./roadmapData";

export const CiData: Horizon = {
  Now: {
    description: "Q2 2025, May-July 2025",
    feature: [
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Maven",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch. Support will be added for Maven build tool, for both Cloud and self-hosted builds.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for JavaScript-based languages with Cypress",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related to the code changes made.",
      },
      {
        tag: [{ value: "Kubernetes" }],
        title: "Pod Spec Customization for Kubernetes Infrastructure",
        description: "Harness will enhance the `podSpecOverlay` field to support full Kubernetes Pod YAML customization. This enables users to apply custom attributes such as security contexts, topology spread constraints and so on, offering fine-grained control for compliance, performance, and platform-specific requirements.",
      }, 
      {
        tag: [{ "value": "Usability" }],
        title: "Run Git Commands Post-Clone Without Re-authentication",
        description: "Support for easily running Git commands in any Run step after the repository is cloned via Git Connector, removing the need to handle authentication explicitly."
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Additional VM images for macOS and Linux with Harness Cloud",
        description: "We're expanding our Cloud offering to support multiple VM images for macOS and Linux, giving users the flexibility to choose from a predefined set of images. This allows teams to run builds on both the latest and previous stable OS versions, ensuring compatibility with different environments",
      }, 
      {
        tag: [{ value: "Cloud" }],
        title: "Save/Restore Cache Steps with Harness Cloud Storage",
        description: "New Save and Restore Cache steps will be introduced to complement Cache Intelligence, giving users more control and flexibility over caching behavior, such as the ability to use a cache key calculated within the stage.",
      }, 
    ],
  },
  Next: {
    description: "Q3 2025+, August-October 2025",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Upload and Display Build Artifacts",
        description: "Harness will support uploading build artifacts to Harness-managed storage, whether builds run in the cloud or on-prem. Users will be able to download artifacts from the Artifacts tab or view them directly in the browser if the file type is supported—enabling use cases like viewing HTML-based code coverage reports and other test results."
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for all test types",
        description: "ML-based Test Intelligence that applies smart test selection across all testing frameworks, reducing testing times and speeding up the feedback loop for developers. Test Intelligence currently supported for unit tests, and with this work we will make it available for other test types as well.",
      },
      {
        tag: [{value: "Insights"}],
        title: "Test Insights",
        description: "Harness can help users to visualize test results across success, failure, and other key metrics.",
      },
      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - Azure",
        description: "Securely connect to Microsoft Azure through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
    ],
  },
  Later: {
    description: "Q4 2025, November 2025 & beyond",
    feature: [

      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Go",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },
      
      {
        tag: [{ value: "Fast" }],
        title: "Flaky tests management",
        description: "Identify, track, and manage flaky tests, improving test reliability and build stability.",
      },
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
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Cloud Credits Breakdown report",
        description: "Gain insights into how Harness Cloud build credits are consumed by different pipelines, helping you manage and optimize your CI resource allocation.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Gradle & Bazel - Cloud & Self Hosted",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Simplify usage of Test Intelligence with new Test step",
        description: "Simplify the configuration and usage of Test Intelligence, making it easier for teams to speed up their builds.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for C# ",
        description: "Accelerate testing cycles of C# (.NET Core 6.0+) applications with Test Intelligence, selectively running only tests that cover the code changes made.",
      },  
      {
        tag: [{ value: "Secure" }, { value: "beta" }],
        title: "Secure Connect",
        description: "Enables encrypted, secure tunnel between the Harness Cloud network and your private network, to safely use Harness Cloud build infrastructure with privately-hosted assets, such as internal artifacts repositories and code repositories.",
      },


    ],
  },
};

