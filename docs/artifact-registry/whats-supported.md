---
title: What's Supported with Artifact Registries
sidebar_position: 1
sidebar_label: What's Supported
---

:::info 
To enable Harness Artifact Registry in your account, contact your sales representative or reach out to the team at [ar-interest@harness.io](mailto:support@harness.io).
:::

## Registries
Harness Artifact Registry support a variety of registry types, and new ones are often added. We currently support the registry types listed below. 

### Supported registry types
These are the currently supported registry types. 
- **Docker:** Your go-to for container images.
- **Helm:** Perfect for managing Kubernetes applications.
- **Generic:** Flexible for all your needs.
- **Maven:** Essential for Java projects.
- **Gradle:** Streamline your build automation.
- **SBT (Scala Build Tool):** Tailored for Scala and Java projects.
- **Python:** For all your Python packages.
- **NPM:** JavaScript package management.
- **NuGet:** .NET package manager.

### Beta
- **RPM:** Red Hat package management.

### Coming Soon
In addition to the registry types above, support for the following registries will be coming soon!
- **Go:** Support for Go modules.
- **Debian:** For Debian packages.
- **Rust:** Rust package management.
- **Ruby:** RubyGems support.
- **Conan:** C/C++ package manager.
- **Alpine:** For Alpine Linux packages.

## Platform Support
Harness Artifact Registry (HAR) is seamlessly integrated with the Harness Platform, offering you robust features and capabilities.

### Role-based Access Control (RBAC)
HAR has [full RBAC support](/docs/platform/role-based-access-control/rbac-in-harness). Simply go to your project settings, create a new role, and scroll to the bottom to find the supported HAR resources. 

This comes with 3 roles automatically created for you:
- **Artifact Registry Viewer**: Bind to this role to allow a user to view registries and its contents.
- **Artifact Registry Contributor**: Bind to this role to allow a user to push an pull from registries.
- **Artifact Registry Admin**: Bind to this role to allow a user full admin access to the AR module.

### Continuous Integration (CI)
HAR provides native support for pushing images to Docker registries, eliminating the hassle of managing external connections. To set up, use the **Build and Push to Docker** step in a CI stage and select **Harness Artifact Registry** as your registry type. From there, simply choose the registry and image you want to use from convenient, pre-populated lists in the fields below. 

Learn more about streamlining your CI process with our guide to [Build and Push to Docker](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry)

### Continuous Deployment (CD)
Speed up your deployment process by using HAR as your [Artifact sources in CD](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources) without the for connectors.

Learn more about [CD services](/docs/continuous-delivery/x-platform-cd-features/services/services-overview).