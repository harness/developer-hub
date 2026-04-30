---
title: Azure Container Apps Prepare Rollback Data
description: Prepare rollback data step for Azure Container Apps deployments.
sidebar_position: 2
---

# Azure Container Apps Prepare Rollback Data

The **Azure Container Apps Prepare Rollback Data** step captures the current state of your container app before deployment begins, enabling rollback to the previous configuration if deployment fails or issues are detected.

:::note Prerequisites
- This step must be added within a **Container Step Group**. The step runs as a containerized task and requires the container infrastructure configuration provided by the step group.
- A **Download Manifests** step must be added before this step to fetch the required manifest files from your configured manifest store.
:::

## What this step does

The Prepare Rollback Data step performs the following operations:

1. **Parses the manifest**: Reads the Azure Container Apps manifest to identify the container app name and configuration
2. **Fetches current app state**: Retrieves the current state of the container app from Azure, including:
   - Active revisions and their traffic weights
   - Current traffic configuration
   - Revision names and status
   - Container app configuration settings
3. **Saves rollback data**: Stores this information for use by the rollback step if deployment fails

This step ensures that if something goes wrong during deployment, Harness can restore your container app to its exact previous state, including traffic distribution across revisions.

## Deployment phases

The step executes in two phases:

### Phase 1: Parsing manifest

```
[INFO] Phase 1/2: Parsing manifest
[INFO] Preparing rollback data for container app: aca-aut-test
```

Harness reads the Azure Container Apps manifest to extract the container app name and validate the configuration.

### Phase 2: Fetching current app state

```
[INFO] Phase 2/2: Fetching current app state
[INFO] Current traffic config fetched for app: aca-aut-test
[INFO] Saved traffic configuration for rollback:
[INFO] Revision: aca-aut-test--ojvsl4z, Traffic: 100%
```

Harness retrieves the current state of the container app from Azure, capturing the traffic configuration and active revisions. This data is stored and made available to the rollback step.

## Step parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for the step | No |
| **Timeout** | Maximum time allowed for the step to complete (default: `10m`) | No |
| **Skip Traffic Shift** | When enabled, the step does not capture traffic shift data. Typically left disabled (false) for standard Canary deployments | No |

## Container configuration

| Parameter | Description |
|-----------|-------------|
| **Container Registry** | Harness connector for authenticating to your container registry. This connector pulls the deployment plugin image. |
| **Image** | The deployment plugin container image. Use the official Harness image: [`harness/azure-container-apps-plugin:0.0.1-linux-amd64`](https://hub.docker.com/r/harness/azure-container-apps-plugin/tags) |
| **Image Pull Policy** | Policy for pulling the container image (default: `Always`) |
| **Resources** | Resource limits for the container (e.g., `512Mi` memory, `0.5` CPU) |

## Output

The step outputs rollback data that includes:

- **Container app name**: The name of the Azure Container App
- **Current revisions**: List of active revisions with their traffic weights
- **Traffic configuration**: Complete traffic distribution across revisions
- **Managed environment**: The managed environment where the app is deployed
- **Resource group and subscription**: Azure resource identifiers

This data is stored in Harness and automatically used by the rollback step if deployment fails.

## Example log output

```
---------------INPUT PARAMETERS---------------
 - [AZURE_CONTAINER_APPS_STEP_TYPE] Step Type: AzureContainerAppsPrepareRollbackData
 - [AZURE_MANAGED_ENVIRONMENT] Managed Environment: aaakash
 - [AZURE_RESOURCE_GROUP] Azure Resource Group: cdp-automation-test
 - [AZURE_SUBSCRIPTION_ID] Azure Subscription ID: 20d6a917-99fa-4b1b-9b2e-a3d624e9dcf0
 - [AZURE_MANIFEST_FILE_PATH] Manifest File Path: /harness/m1/acaManifest
 - [AZURE_FORCE_TRAFFIC_TO_LATEST] Force Traffic To Latest: false
----------------------------------------------

---------------PARAM VALIDATION---------------
All looks good
----------------------------------------------

[INFO] Setting up authentication
[INFO] Using Azure Public cloud
[INFO] Using Service Principal with Secret authentication
[INFO] Phase 1/2: Parsing manifest
[INFO] Preparing rollback data for container app: aca-aut-test
[INFO] Phase 2/2: Fetching current app state
[INFO] Current traffic config fetched for app: aca-aut-test
[INFO] Saved traffic configuration for rollback:
[INFO] Revision: aca-aut-test--ojvsl4z, Traffic: 100%
[INFO] Azure Container Apps plugin execution successfully completed
```

## Usage in pipeline

The Prepare Rollback Data step should be placed after the Download Manifests step and before the Deploy step in your Azure Container Apps deployment step group.

## YAML Example

```yaml
- step:
    type: AzureContainerAppsPrepareRollbackData
    name: Azure_Container_Apps_Prepare_Rollback_Data
    identifier: Azure_Container_Apps_Prepare_Rollback_Data
    spec:
      connectorRef: account.harnessImage
      image: harness/azure-container-apps-plugin:0.0.1-linux-amd64
      imagePullPolicy: Always
      skipTrafficShift: false
      resources:
        limits:
          memory: 512Mi
          cpu: 0.5
    timeout: 10m
```

## Related resources

- [Canary Deployment Strategy](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-container-apps/canary-deployment)
- [Azure Container Apps Deploy](deploy-aca.md)
- [Azure Container Apps documentation](https://learn.microsoft.com/en-us/azure/container-apps/)
