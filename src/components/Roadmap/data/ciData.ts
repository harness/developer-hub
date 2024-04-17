import { Horizon } from "./roadmapData";

export const CiData: Horizon = {
  Now: {
    description: "Q1 2024, Feb-Apr 2024",
    feature: [
      {
        tag: [{ value: "Fast" }],
        title: "Build Cache for Gradle",
        description: "Build Cache accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Cache for Bazel",
        description: "Build Cache accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Cache Intelligence - Self-managed builds",
        description: "Cache Intelligence reduces build times by automatically caching software dependencies, avoiding the need for external storage.  It's currently supported when running builds in Harness Cloud, and with this work we will make it available for users running self-managed builds as well.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Credits usage consumption by pipeline report",
        description: "Gain insights into how Harness Cloud build credits are consumed by different pipelines, helping you manage and optimize your CI resource allocation.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Credit Card purchase of build credits",
        description: "You'll be able to purchase Harness Cloud build credits on demand.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Simplify usage of Test Intelligence",
        description: "Simplify the configuration and utilization of Test Intelligence, making it easier for teams to speed up their builds.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Simplify usage of Cache Intelligence",
        description: "Simplify the configuration and utilization of Cache Intelligence, making it easier for teams to speed up their builds.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Plugin - Get Maven Version",
        description: "The plugin is designed to retrieve the POM_VERSION from the pom.xml file and assign it as an environment variable to be used by subsequent builds tasks.",
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
    ],
  },
  Next: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for all test types",
        description: "ML-based Test Intelligence that applies smart test selection across all testing frameworks, reducing testing times and speeding up the feedback loop for developers. Test Intelligence currently supported for unit tests, and with this work we will make it available for other test types as well.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Cache for Maven",
        description: "Build Cache accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Cache for Go",
        description: "Build Cache accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Build Resource Class support",
        description: "Choose the appropriate compute size for your builds and monitor credit usage by resource type, improving build efficiency and resource management.",
      },
      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - AWS",
        description: "Securely connect to Amazon Web Services (AWS) through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
    ],
  },
  Later: {
    description: "Q3 2024+, Aug 2024 & beyond",
    feature: [
      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - Azure",
        description: "Securely connect to Microsoft Azure through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Simplify usage of Build Cache",
        description: "Simplify the configuration and utilization of Build Cache, making it easier for teams to speed up their builds.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Flaky tests management",
        description: "Identify, track, and manage flaky tests, improving test reliability and build stability.",
      },
      {
        tag: [{ value: "Fast" }, { value: "Beta" }],
        title: "Test Intelligence for JavaScript-based languages and tools",
        description: "Accelerate test cycles of applications written in JavaScript-based languages with Test Intelligence, selectively running only tests that are related the code changes made.",
      },
      {
        tag: [{ value: "Artifact Management" }],
        title: "Hosted Artifacts Management",
        description: "Manage your build artifacts with ease using hosted artifacts management, providing a secure, scalable solution for storing and accessing your CI/CD artifacts.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Plugin enhancement - Publish Artifacts to Jfrog Artifactory",
        description: "Added support for passing 'build_name', 'build_number' and '--target-props' JFrog flags.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Plugin - Mount S3 bucket to a container",
        description: "Ability to mount S3 buckets to docker containers for seamless access to organization data.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Secure" }, { value: "Beta" }],
        title: "Secure Tunnel support for Harness CI cloud",
        description: "Enables encrypted, secure tunnel between the Harness Cloud network and your private network, to safely use Harness Cloud build infrastructure with privately-hosted assets, such as internal artifacts repositories and code repositories.",
      },
      {
        tag: [{ value: "Fast" }, { value: "Beta" }],
        title: "Docker Layer Caching",
        description: "Accelerate builds with Docker Layer Caching, which reuses unchanged layers from previous builds, speeding up the Docker image creation process.",
      },
      {
        tag: [{ value: "Fast" }, { value: "GA" }],
        title: "Cache Intelligence - Harness Cloud",
        description: "Cache Intelligence reduces build times by automatically caching software dependencies, avoiding the need for external storage. Available for Harness CI Cloud builds.",
      },
      {
        tag: [{ value: "Fast" }, { value: "Beta" }],
        title: "Test Intelligence for Python",
        description: "Accelerate testing cycles of Python applications with Test Intelligence, selectively running only tests that cover the code changes made.",
      },
      {
        tag: [{ value: "Fast" }, { value: "GA" }],
        title: "Test Intelligence for Ruby",
        description: "Accelerate testing cycles of Ruby applications with Test Intelligence, selectively running only tests that cover the code changes made.",
      },
      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - GCP",
        description: "Securely connect to Google Cloud Platform (GCP) through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
    ],
  },
};
