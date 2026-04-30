---
title: Download Manifests
description: Download Azure Container Apps manifests step.
sidebar_position: 1
---

## Download Manifests

The **Download Manifests** step downloads all manifest files specified in your service configuration and makes them available for subsequent deployment steps.

## What this step does

The Download Manifests step performs the following operations:

- Fetches all manifest files configured in your service definition
- Downloads Azure Container Apps manifest from your configured manifest store (Inline, Harness File Store, or Git)
- Validates the YAML/JSON structure of the manifest
- Stages the manifest files in a temporary directory for use by subsequent deployment steps
- Makes manifests available at the path: `/harness/m1/`

This step is a prerequisite for all Azure Container Apps deployment steps, as it ensures that the deployment steps have access to the required configuration files.

## Step parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for the step (default: **DownloadManifests**) | No |
| **Timeout** | Maximum time allowed for downloading manifests (default: `10m`) | No |

There are no additional configuration parameters required for this step. The step automatically downloads all manifests configured in your service definition.

## Output

The step creates manifest files in the `/harness/m1/` directory, which subsequent steps use to access the Azure Container Apps configuration.

**Example output:**

```
Download Path:   /harness/m1

Creating file :  /harness/m1/acaManifest
```

The `acaManifest` file contains your Azure Container Apps manifest content and is referenced by subsequent deployment steps.

## Usage in pipeline

The Download Manifests step should be the first step in your Azure Container Apps deployment step group. It must execute before any other Azure Container Apps steps that require access to the manifest configuration.

## YAML Example

```yaml
- step:
    type: DownloadManifests
    name: DownloadManifests
    identifier: DownloadManifests
    spec: {}
    timeout: 10m
```

## Related resources

- [Configure Service and Environment](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-container-apps/configure-service-environment)
- [Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store)
