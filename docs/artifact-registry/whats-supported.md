---
title: What's Supported with Artifact Registries
sidebar_position: 1
sidebar_label: What's Supported
---

## Registries

Harness Artifact Registry support a variety of registry types, and new ones are often added. We currently support the registry types listed below. 

### Supported registry types

These are the currently supported registry types. 
- Docker
- Helm

### Coming Soon

In addition to the registry types above, support for the following registries will be coming soon!
- Generic
- Maven

## Platform Support

Harness Artifact Registry (HAR) is a part of the Harness Platform and benefits greatly from all the platform features you know and love. Here's a glimpse of what you can do with the power of the Harness Platform when using Artifact Registry.

### Role-based Access Control (RBAC)

HAR has full RBAC support. Simply go to your project settings, create a new role, and scroll to the bottom to find the supported HAR resources. 

To learn more on how to use RBAC, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).

### Continuous Integration (CI)

HAR provides native support for pushing images to Docker registries, eliminating the hassle of managing external connections. To set up, use the **Build and Push to Docker** step in a CI stage and select **Harness Artifact Registry** as your registry type. From there, simply choose the registry and image you want to use from convenient, pre-populated lists in the fields below. 

To learn more about pushing artifacts from CI, go to [Build and Push to Docker](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry)

### Continuous Deployment (CD)

HAR is now available as an artifact source for CD services. By using HAR as a service's artifact source, you eliminate any need for connectors and vastly speed up the service setup and configuration process.

To learn more about CD services, go to the [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview).

To learn more about artifact sources in CD, go to [CD artifact sources](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources)

