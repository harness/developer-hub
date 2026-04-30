---
title: Overview
description: Deploy and manage Azure Container Apps with Harness.
sidebar_position: 1
---

This guide explains how to deploy and manage Azure Container Apps using Harness.

:::info Feature Flag
This feature is behind the feature flag `CDS_AZURE_CONTAINER_APPS`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

## Overview

Harness supports deploying and managing **Azure Container Apps** with automated scaling, health monitoring, and zero-downtime deployments. [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview) is a fully managed serverless container platform that enables you to run microservices and containerized applications without managing complex infrastructure. The platform provides automatic scaling based on HTTP traffic or events, built-in service discovery, and integrated observability capabilities.

Azure Container Apps is ideal for microservices, API endpoints, background processing applications, event-driven workloads, and any containerized application that requires automatic scaling and simplified operations. With Harness, you can leverage deployment strategies including Basic deployments for immediate cutover and Canary deployments for progressive traffic shifting to ensure safe, controlled rollouts with instant rollback capabilities. The platform handles all the complexity of managing container app revisions, environment configuration, and traffic distribution.

## Why use Harness for Azure Container Apps deployments?

Deploying Azure Container Apps with Harness transforms how you manage containerized workloads on Azure by providing enterprise-grade deployment orchestration. Instead of manually managing container app revisions, environment variables, and traffic routing through the Azure portal or CLI commands, Harness automates the entire deployment lifecycle. This automation reduces deployment time, eliminates human error, and provides consistent, repeatable deployments across all your environments.

Harness brings several key advantages to Azure Container Apps deployments. The platform enables zero-downtime deployments using either Basic strategy for immediate cutover or Canary strategy with Azure Container Apps' built-in traffic splitting capabilities, ensuring your users never experience service interruptions during updates. When issues arise, automated rollback capabilities let you instantly revert to previous revisions without manual intervention or complex recovery procedures.

For progressive deployments, the Canary strategy lets you validate new revisions under real production load before a full rollout. You can shift traffic incrementally—starting with 20%, then 70%, and finally 100%—monitoring application metrics at each stage to catch issues early. This progressive delivery approach significantly reduces the risk of widespread failures while maintaining complete control over your deployment process.

All Azure Container Apps configurations are defined declaratively as YAML manifests, enabling infrastructure-as-code practices. Your container app definitions, environment configurations, and scaling rules live in version control, providing complete audit trails and enabling easy rollbacks to known-good configurations.

## Key capabilities

### Deployment strategies

Harness currently supports two deployment strategies for Azure Container Apps:

#### Basic deployment

The Basic strategy provides straightforward deployments with immediate traffic cutover. When you deploy a new version, Harness creates a new revision and immediately shifts 100% of traffic to it. This approach is ideal for development environments, testing, or simple applications where immediate cutover is acceptable. The Basic strategy uses three default steps: Download Manifests, Prepare Rollback Data, and Deploy.

For details, see [Basic Deployment](basic-deployment.md).

#### Canary deployment

The Canary strategy enables gradual rollout of new versions by progressively shifting traffic from existing revisions to the new revision. This approach minimizes risk by allowing you to validate new deployments with a small percentage of traffic before exposing them to your entire user base. The Canary strategy uses Azure Container Apps' native traffic splitting feature and revision management to control traffic distribution. When you deploy a new version, Harness creates a new revision without shifting traffic, then you add Traffic Shift steps to incrementally move traffic (e.g., 20% → 70% → 100%) while monitoring application health at each stage.

For details, see [Canary Deployment](canary-deployment.md).

### Azure Container Apps infrastructure components

Azure Container Apps deployments rely on several Azure resources that you configure and maintain. Understanding these components helps you set up your infrastructure correctly before deploying with Harness.

**Container Apps** define your application configuration, including container image, CPU and memory resources, environment variables, secrets, and scaling rules. The container app acts as a logical grouping for your application revisions, ensuring consistency across deployments.

**Managed Environments** provide a secure boundary around groups of container apps. All container apps within the same environment share the same virtual network, logging configuration, and Dapr settings. Environments enable service-to-service communication and shared infrastructure resources. For details, see [Azure Container Apps environments](https://learn.microsoft.com/en-us/azure/container-apps/environment).

**Revisions** represent immutable snapshots of your container app configuration. When you update your container app with a new container image or configuration changes, Azure creates a new revision. Revisions support traffic splitting for Blue-Green and canary deployments. See [Revisions in Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/revisions) for more information.

**Ingress** (optional) controls external HTTP and HTTPS traffic to your container app. You can configure external ingress for public access or internal ingress for private communication within the environment. Ingress supports custom domains, TLS certificates, and traffic splitting across revisions.

**Scaling** enables automatic scaling of container app replicas based on HTTP traffic, CPU utilization, memory usage, or custom Azure Monitor metrics. You can configure minimum and maximum replica counts, as well as scale rules that determine when to scale up or down. For configuration options, see [Set scaling rules in Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/scale-app).

### Authentication options

Harness supports multiple Azure authentication methods, giving you flexibility in how you connect to your Azure resources. Azure OIDC (OpenID Connect) provides secure, keyless authentication using workload identity federation, eliminating the need to manage and rotate service principal credentials. We recommend this approach for production environments as it reduces security risks and simplifies credential management.

Alternatively, you can use traditional Service Principal authentication with client ID and secret. This method works well for getting started quickly or when OIDC isn't available in your environment. Both authentication methods support cross-subscription access, allowing a single connector to deploy Container Apps across multiple Azure subscriptions.

## Prerequisites

Before deploying Azure Container Apps with Harness, ensure you have the following:

- **Harness Account**: Active account with the Continuous Delivery module enabled
- **Azure Subscription**: An active Azure subscription with appropriate permissions
- **Azure Connector**: A Harness connector to Azure using OIDC or Service Principal authentication
- **IAM Permissions**: Service principal with permissions to manage Container Apps, Managed Environments, and related resources
- **Container Registry**: Azure Container Registry (ACR), Docker Hub, or another supported container registry with your container images
- **Managed Environment**: An Azure Container Apps managed environment already created in your target Azure region

For detailed IAM permission requirements, see the [Azure IAM requirements](#azure-iam-requirements) section below.

## Azure IAM requirements

<details>
<summary>Container Apps Deployment Minimum Permissions</summary>

The following are the minimum set of permissions required for deploying and managing Azure Container Apps:

### Container Apps Permissions

1. **Container App Management**:
   - `Microsoft.App/containerApps/read`
   - `Microsoft.App/containerApps/write`
   - `Microsoft.App/containerApps/delete`
   - `Microsoft.App/containerApps/revisions/read`
   - `Microsoft.App/containerApps/revisions/activate/action`
   - `Microsoft.App/containerApps/revisions/deactivate/action`

2. **Managed Environment Access**:
   - `Microsoft.App/managedEnvironments/read`
   - `Microsoft.App/managedEnvironments/write`

### Container Registry Permissions

1. **Azure Container Registry** (if using ACR):
   - `Microsoft.ContainerRegistry/registries/read`
   - `Microsoft.ContainerRegistry/registries/pull/read`

### Resource Group Permissions

1. **Resource Group Operations**:
   - `Microsoft.Resources/subscriptions/resourceGroups/read`

### Predefined Roles

Alternatively, you can use the following predefined roles:

1. **Contributor** (`Contributor` role on the resource group):
   - Grants full access to manage all resources in the resource group, including Container Apps

2. **Azure Container Apps Contributor** (custom role):
   - Provides permissions specific to Container Apps operations

### Custom Role Example

You can create a custom role with the minimum required permissions:

```json
{
  "Name": "Harness Container Apps Deployment Role",
  "Description": "Custom role for Harness Container Apps deployments",
  "Actions": [
    "Microsoft.App/containerApps/read",
    "Microsoft.App/containerApps/write",
    "Microsoft.App/containerApps/delete",
    "Microsoft.App/containerApps/revisions/read",
    "Microsoft.App/containerApps/revisions/activate/action",
    "Microsoft.App/containerApps/revisions/deactivate/action",
    "Microsoft.App/managedEnvironments/read",
    "Microsoft.App/managedEnvironments/write",
    "Microsoft.ContainerRegistry/registries/read",
    "Microsoft.ContainerRegistry/registries/pull/read",
    "Microsoft.Resources/subscriptions/resourceGroups/read"
  ],
  "NotActions": [],
  "AssignableScopes": [
    "/subscriptions/{subscription-id}"
  ]
}
```

</details>

## Limitations

The Azure Container Apps feature currently has the following limitations:

- **Deployment Strategies**: Harness supports Basic and Canary deployment strategies. Other deployment approaches like Blue-Green or native rolling updates are not currently available through Harness orchestration. You can configure these directly through Azure Container Apps revision modes if needed.

- **Artifact Repositories**: Only **Azure Container Registry (ACR)** and **Docker Hub** are supported as artifact sources for container images. Other container registries are not currently supported.

- **Azure Authentication**: While both OIDC and Service Principal authentication methods are supported, we recommend using Azure OIDC for production environments to eliminate credential management overhead.

## Next steps

To get started with Azure Container Apps deployments in Harness:

1. [Configure Service and Environment](configure-service-environment.md) - Set up your service definition with container app manifests and artifacts
2. [Basic Deployment Strategy](basic-deployment.md) - Learn how to implement Basic deployments with immediate traffic cutover
3. [Canary Deployment Strategy](canary-deployment.md) - Learn how to implement Canary deployments with progressive traffic shifting

## Related resources

- [Create an Azure Connector](/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector)
- [Create a Harness Service](/docs/continuous-delivery/x-platform-cd-features/services/create-services)
- [Create a Harness Environment](/docs/continuous-delivery/x-platform-cd-features/environments/create-environments)
