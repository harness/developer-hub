import { Horizon } from "./roadmapData";

export const CiData: Horizon = {
  Now: {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Gradle - Self Hosted",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch. Support for cloud is already available, this work is to extend support for self-hosted build infrastructure.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Bazel- Self Hosted",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch. Support for cloud is already available, this work is to extend support for self-hosted build infrastructure.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Maven",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Cloud Credits Breakdown report",
        description: "Gain insights into how Harness Cloud build credits are consumed by different pipelines, helping you manage and optimize your CI resource allocation.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Linux Hardware Acceleration in Harness Cloud",
        description: "This enhancement allows leveraging hardware acceleration to speed up computational tasks, improving performance for resource-intensive builds, when running on Linux Cloud machines.",
      },

      {
        tag: [{ value: "Integrations" }],
        title: "Docker build secrets",
        description: "Ability to use Docker build secrets in Build and Push steps.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Git Clone Enhancements",
        description: "Native support for Git LFS, submodules, and tag fetching in the native clone functionality and Git Clone step. These enhancements improve repository management, reducing setup time and errors, and boosting overall productivity.",
      },    
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for .Net Core",
        description: "Accelerate testing cycles of Python applications with Test Intelligence, selectively running only tests that cover the code changes made.",
      },  
      {
        tag: [{ value: "Fast" }, { value: "Cloud" }],
        title: "Simplify usage of Build Intelligence",
        description: "Support for automatically using Build Intelligence on Cloud, eliminating the need for user configuration and making it easier for teams to speed up their builds.",
      },
      
    ],
  },
  Next: {
    description: "Q4 2024, Nov-Jan 2025",
    feature: [
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for JavaScript-based languages and tools",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related the code changes made.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for all test types",
        description: "ML-based Test Intelligence that applies smart test selection across all testing frameworks, reducing testing times and speeding up the feedback loop for developers. Test Intelligence currently supported for unit tests, and with this work we will make it available for other test types as well.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Flaky tests management",
        description: "Identify, track, and manage flaky tests, improving test reliability and build stability.",
      },

      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - Azure",
        description: "Securely connect to Microsoft Azure through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
    ],
  },
  Later: {
    description: "Q1 2025+, Feb 2025 & beyond",
    feature: [

      {
        tag: [{ value: "Artifact Management" }],
        title: "Hosted Artifacts Management",
        description: "Manage your build artifacts with ease using hosted artifacts management, providing a secure, scalable solution for storing and accessing your CI/CD artifacts.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Intelligence for Go",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },

    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Fast" },{ value: "Cloud" } ,{ value: "Beta" }],
        title: "Build Intelligence for Gradle",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch. Available for Cloud, with support for self-hosted coming soon. ",
      },
      {
        tag: [{ value: "Fast"} ,{ value: "Cloud" }, { value: "Beta" }],
        title: "Build Intelligence for Bazel",
        description: "Build Intelligence accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch. . Available for Cloud, with support for self-hosted coming soon. ",
      },
      {
        tag: [{ value: "Secure" }, { value: "Beta" }],
        title: "Secure Tunnel support for Harness CI cloud",
        description: "Enables encrypted, secure tunnel between the Harness Cloud network and your private network, to safely use Harness Cloud build infrastructure with privately-hosted assets, such as internal artifacts repositories and code repositories.",
      },
      {
        tag: [{ value: "Fast" }, { value: "Beta" }],
        title: "Cache Intelligence for self-hosted build infrastructure",
        description: "Cache Intelligence reduces build times by automatically caching software dependencies, avoiding the need for external storage.  It's currently supported when running builds in Harness Cloud, and with this work we will make it available for users running self-managed builds as well.",
      },
      {
        tag: [{ value: "Fast" }, { value: "Beta" }],
        title: "Docker Layer Caching for self-hosted build infrastructure",
        description: "Accelerate builds with Docker Layer Caching, which reuses unchanged layers from previous builds, speeding up the Docker image creation process.",
      },
      {
        tag: [{ value: "Fast" }, { value: "Beta" }],
        title: "Simplify usage of Test Intelligence with new Test step",
        description: "Simplify the configuration and utilization of Test Intelligence with, making it easier for teams to speed up their builds.",
      },
      {
        tag: [{ value: "Cloud" }, { value: "Beta" }],
        title: "Build Resource Class support",
        description: "Choose the appropriate compute size for your builds and monitor credit usage by resource type, improving build efficiency and resource management.",
      },
      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - AWS",
        description: "Securely connect to Amazon Web Services (AWS) through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - GCP",
        description: "Securely connect to Google Cloud Platform (GCP) through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Plugin enhancement - Publish Artifacts to Jfrog Artifactory",
        description: "Added support for passing 'build_name', 'build_number' and '--target-props' JFrog flags.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Plugin - Push Helm Charts to Docker Registry",
        description: "Easily push Helm charts compliant with Open Container Initiative (OCI) to Docker Registry.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Plugin - Copy Docker images between registries",
        description: "Copy images between docker registries, eliminating the need to rebuild the same image multiple times, saving time and computational resources.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Plugin - Get Maven Version",
        description: "The plugin is designed to retrieve the POM_VERSION from the pom.xml file and assign it as an environment variable to be used by subsequent builds tasks.",
      },
    ],
  },
};
