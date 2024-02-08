import { Horizon } from "./roadmapData";

export const CiData: Horizon = {
  Now: {
    description: "What is being delivered now",
    feature: [
      {
        tag: [{ value: "Fast" }],
        title: "Build Cache for Gradle",
        description: "Build Cache accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Cache for Go",
        description: "Build Cache accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Cache Intelligence - Self-hosted builds",
        description: "Cache Intelligence reduces build times by automatically caching software dependencies, avoiding the need for external storage.  It's currently supported when running builds in Harness Cloud, and with this work we will make it avaiable for users running self-hosted builds as well.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Test Intelligence for all test types",
        description: "ML-based Test Intelligence that applies smart test selection across all testing frameworks, reducing testing times and speeding up the feedback loop for developers.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Credits usage consumption by pipeline report",
        description: "Gain insights into how credits are consumed by different pipelines, helping you manage and optimize your CI resource allocation.",
      },
      {
        tag: [{ value: "Cloud" }],
        title: "Credit Card purchase of build credits",
        description: "Supporting self-service for Harness CI Cloud credits purchase.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Simplify usage of Test Intelligence",
        description: "Harness simplifies the configuration and utilization of Test Intelligence, making it easier for teams to speed up their builds.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Simplify usage of Cache Intelligence",
        description: "Harness simplifies the configuration and utilization of Cache Intelligence, making it easier for teams to speed up their builds.",
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
        description: "Copy images between docker registries, eliminates the need to rebuild the same image multiple times, saving time and computational resources.",
      },
    ],
  },
  Next: {
    description: "What is being developed next",
    feature: [
      {
        tag: [{ value: "Fast" }],
        title: "Build Cache for Maven",
        description: "Build Cache accelerates builds by intelligently identifying and reusing unchanged build outputs from previous builds, instead of unnecessarily rebuilding them from scratch.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Build Cache for Bazel",
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
    description: "What is being developed later",
    feature: [
      {
        tag: [{ value: "Secure" }],
        title: "OpenID Connect (OIDC) - Azure",
        description: "Securely connect to Microsoft Azure through OIDC, for accessing public cloud resources without secrets or credentials.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Simplify usage of Build Cache",
        description: "Harness simplifies the configuration and utilization of Build Cache, making it easier for teams to speed up their builds.",
      },
      {
        tag: [{ value: "Fast" }],
        title: "Flaky tests management",
        description: "Identify, track, and manage flaky tests, improving test reliability and build stability.",
      },
      {
        tag: [{ value: "Artifact Management" }],
        title: "Hosted Artifacts Management",
        description: "Manage your build artifacts with ease using Hosted Artifacts Management, providing a secure, scalable solution for storing and accessing your CI/CD artifacts.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Plugin enhancement - Publish Artifacts to Jfrog Artifactory",
        description: "Added support for passing 'build_name', 'build_number' and '--target-props' JFrog flags.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Plugin - mount S3 bucket to a container",
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
        title: "Cache Intelligence - cloud builds",
        description: "Cache Intelligence reduces build times by automatically caching software dependencies, avoiding the need for external storage. Available for CI Cloud users.",
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
