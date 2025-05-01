import { Horizon } from "./roadmapData";

export const CiData: Horizon = {
  Now: {
    description: "Q1 2025, Feb-April 2025",
    feature: [
      // Harness Cloud - Allow other Secrets than Harness Secrets
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Maven",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch. Support will be added for Maven build tool, for both Cloud ans self-hosted builds.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for JavaScript-based languages with Jest",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related the code changes made.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for Kotest",
        description: "Accelerate testing cycles of Kotest applications with Test Intelligence, selectively running only tests that cover the code changes made.",
      },  
      {
        tag: [{ value: "Cloud" }],
        title: "Using external secret managers with Harness Cloud",
        description: "This enhancement allows users to securely integrate with external secret management systems like HashiCorp Vault, providing greater flexibility for managing sensitive data.",
      }, 
      {
        tag: [{ value: "Cloud" }],
        title: "Additional VM images for macOS and Linux with Harness Cloud",
        description: "We're expanding our hosted CI offering to support multiple VM images for macOS and Linux, giving users the flexibility to choose from a predefined set of images. This allows teams to run builds on both the latest and previous stable OS versions, ensuring compatibility with different environments",
      }, 
      {
        tag: [{ value: "Integrations" }],
        title: "Improvements for Build and Push steps ",
        description: "Enhancing the Build and Push steps with a new 'build-only' mode and support for generating Docker images or tar files for local vulnerability scans. These improvements make it easier to accomplish the build-local scan-and-push flow.",
      },
      
      {
        tag: [{ value: "Integrations" }],
        title: "Push Docker Image plugin",
        description: "Introducing a new plugin for securely pushing  a local Docker images or a tar file to registries. This complements the build-only mode, allowing users to scan local images before pushing.",
      },
      {
        tag: [{ value: "AI DevOps" }],
        title: "AI DevOps driven Build pipelines",
        description: "Using the Harness AI DevOps Agent, Harness will help generate CI pipelines.",
        link: "https://developer.harness.io/docs/platform/harness-aida/ai-devops#pipeline-orchestration",
      },
    ],
  },
  Next: {
    description: "Q2 2025, May-July 2025",
    feature: [
      {
        tag: [{ value: "Artifact Management" }],
        title: "Hosted Artifacts Management",
        description: "Manage your build artifacts with ease using hosted artifacts management, providing a secure, scalable solution for storing and accessing your CI/CD artifacts.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for all test types",
        description: "ML-based Test Intelligence that applies smart test selection across all testing frameworks, reducing testing times and speeding up the feedback loop for developers. Test Intelligence currently supported for unit tests, and with this work we will make it available for other test types as well.",
      },

      {
        tag: [{value: "Insights"}],
        title: "Test Insights",
        description: "Harness can help users visualize their test executions for their failures, success, and other metrics, providing meaningful insights",
      },
      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - Azure",
        description: "Securely connect to Microsoft Azure through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
    ],
  },
  Later: {
    description: "Q3 2025+, Aug 2025 & beyond",
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
        description: "Simplify building and publishing iOS and Android applications with native Fastlane integration",
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
        tag: [{ value: "Fast" }, { value: "Beta" }],
        title: "Cache Intelligence - VB & F# ",
        description: "Cache Intelligence reduces build times by automatically caching software dependencies, avoiding the need for external storage. We will add support for VB & F#.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Linux Hardware Acceleration in Harness Cloud",
        description: "This enhancement allows leveraging hardware acceleration when running on Linux/amd Cloud machines. This enhancement enables Android emulation, leading to faster and more efficient Android test execution",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for C# ",
        description: "Accelerate testing cycles of C# C# (.Net Core 6.0+) applications with Test Intelligence, selectively running only tests that cover the code changes made.",
      },  
      {
        tag: [{ value: "Secure" }, { value: "Beta" }],
        title: "Secure Connect",
        description: "Enables encrypted, secure tunnel between the Harness Cloud network and your private network, to safely use Harness Cloud build infrastructure with privately-hosted assets, such as internal artifacts repositories and code repositories.",
      },
      {
        tag: [{ value: "Fast" }, { value: "Beta" }],
        title: "Cache Intelligence for self-hosted build infrastructure",
        description: "Cache Intelligence reduces build times by automatically caching software dependencies. Customers running their builds on self-hosted infra can now configure a default S3-compatible bucket to be used with cache intelligence",
      },
      {
        tag: [{ value: "Fast" }, { value: "Beta" }],
        title: "Docker Layer Caching for self-hosted build infrastructure",
        description: "Accelerate builds with Docker Layer Caching, which reuses unchanged layers from previous builds, speeding up the Docker image creation process. Customers running their builds on self-hosted infra can now configure a default S3-compatible bucket to be used with cache intelligence",
      },
      {
        tag: [{ value: "Fast" }, { value: "Beta" }],
        title: "Simplify usage of Test Intelligence with new Test step",
        description: "Simplify the configuration and utilization of Test Intelligence with, making it easier for teams to speed up their builds.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Plugin - Test Analysis",
        description: "Introduced a new plugin, plugins/test-analysis, to support managing flaky tests by introducing a quarantine mechanism. This helps teams to reduce false positives in CI by isolating non-critical, known flaky test failures. By using a quarantine list, the plugin prevents disruptions caused by unreliable tests, allowing teams to focus on true failures and improve test suite reliability without unnecessary pipeline failures",
      },
    ],
  },
};

