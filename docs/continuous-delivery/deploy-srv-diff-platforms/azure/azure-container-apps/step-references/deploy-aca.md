---
title: Azure Container Apps Deploy
description: Deploy step for Azure Container Apps.
sidebar_position: 3
---

## Azure Container Apps Deploy

The **Azure Container Apps Deploy** step creates a new revision of your Azure Container App with the updated container image and configuration.

:::note Prerequisites
- This step must be added within a **Container Step Group**. The step runs as a containerized task and requires the container infrastructure configuration provided by the step group.
- A **Download Manifests** step must be added before this step to fetch the required manifest files from your configured manifest store.
- An **Azure Container Apps Prepare Rollback Data** step should be added before this step to capture the current state for rollback purposes.
:::

## What this step does

The Azure Container Apps Deploy step performs the following operations:

1. **Parses the manifest**: Reads the Azure Container Apps manifest to extract configuration
2. **Prepares deployment**: Injects the container image URL from your artifact configuration and sets deployment options
3. **Deploys container app**: Creates or updates the Azure Container App with the new revision
4. **Finalizes outputs**: Waits for deployment to stabilize and outputs revision details and instance status

This step creates a new immutable revision of your container app. By default (`skipTrafficShift: false`), traffic shifts immediately to the new revision upon deployment. When **Skip Traffic Shift** is enabled (`true`), the step creates the revision without shifting traffic, and traffic shifting is performed explicitly in subsequent Azure Container Apps Traffic Shift steps.

## Deployment phases

The step executes in four phases:

### Phase 1: Parsing manifest

```
[INFO] Phase 1/4: Parsing manifest
[INFO] Container App: aca-aut-test
```

Harness reads the Azure Container Apps manifest to extract the container app name and validate the configuration.

### Phase 2: Preparing deployment

```
[INFO] Phase 2/4: Preparing deployment
[INFO] Using location from managed environment: East US
[INFO] Injecting image URL: index.docker.io/library/nginx:stable-otel
[INFO] Traffic will be forced to latest revision
[INFO] Setting active revisions mode: Single
```

Harness prepares the deployment by:
- Determining the Azure region from the managed environment
- Injecting the container image URL from your artifact configuration (replaces `placeholder` in the manifest)
- Configuring traffic behavior based on the **Skip Traffic Shift** setting
- Setting the active revisions mode (`Single` or `Multiple`)

### Phase 3: Deploying container app

```
[INFO] Phase 3/4: Deploying container app
[INFO] Deploying container app completed (took 16s)
[INFO] Container App deployed successfully: aca-aut-test
```

Harness deploys the container app to Azure. If the container app doesn't exist, it creates a new one. If it already exists, it creates a new revision with the updated configuration.

### Phase 4: Finalizing outputs

```
[INFO] Phase 4/4: Finalizing outputs
[INFO] Waiting 1 minute for deployment to stabilise...
[INFO] Revisions:
[INFO] Revision: aca-aut-test--0000001, Status: Running, Replicas: 1, Traffic: 0%
[INFO] Instances:
[INFO] Instance: aca-aut-test--0000001-7c7fd9f49c-bpfcb, Revision: aca-aut-test--0000001, Status: Running
```

Harness waits for the deployment to stabilize (typically 1 minute) and then outputs the current state, including:
- Active revisions and their status
- Replica counts
- Current traffic distribution
- Instance details

## Step parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for the step | No |
| **Timeout** | Maximum time allowed for the step to complete (default: `30m`) | No |
| **Skip Traffic Shift** | Controls traffic behavior for the deployed revision | No |

### Skip Traffic Shift

This critical parameter controls whether traffic is shifted to the new revision immediately upon deployment:

**Skip Traffic Shift = disabled (default: false)**

- Traffic shifts to the new revision immediately upon deployment
- This is the default behavior for basic deployments where you want immediate cutover to the new version
- Suitable for standard deployments without progressive traffic shifting

**Skip Traffic Shift = enabled (true)**

- The Deploy step only creates the new revision without shifting traffic to it
- Traffic shifting is performed explicitly in subsequent Azure Container Apps Traffic Shift steps
- This gives you full control over when and how traffic moves to the new revision
- **Recommended for progressive Canary deployments** where you want gradual traffic shifting
- Allows you to add multiple Traffic Shift steps to incrementally increase traffic

## Container configuration

| Parameter | Description |
|-----------|-------------|
| **Container Registry** | Harness connector for authenticating to your container registry. This connector pulls the deployment plugin image. |
| **Image** | The deployment plugin container image. Use the official Harness image: [`harness/azure-container-apps-plugin:0.0.1-linux-amd64`](https://hub.docker.com/r/harness/azure-container-apps-plugin/tags) |
| **Image Pull Policy** | Policy for pulling the container image (default: `Always`) |
| **Resources** | Resource limits for the container (e.g., `512Mi` memory, `0.5` CPU) |

## Output

The step outputs information about the deployed revision:

- **Revision name**: The name of the newly created revision (e.g., `aca-aut-test--0000001`)
- **Revision status**: Current status of the revision (`Running`, `Provisioning`, etc.)
- **Replica count**: Number of running replicas
- **Traffic percentage**: Current traffic weight assigned to this revision
- **Instances**: List of running instances with their status

You can reference the revision name in subsequent steps using expressions:

```
<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_GROUP_ID.steps.DEPLOY_STEP_ID.output.revisionName>
```

## Example log output

```
---------------INPUT PARAMETERS---------------
 - [AZURE_CONTAINER_APPS_STEP_TYPE] Step Type: AzureContainerAppsDeploy
 - [AZURE_MANAGED_ENVIRONMENT] Managed Environment: aaakash
 - [AZURE_RESOURCE_GROUP] Azure Resource Group: cdp-automation-test
 - [AZURE_SUBSCRIPTION_ID] Azure Subscription ID: 20d6a917-99fa-4b1b-9b2e-a3d624e9dcf0
 - [AZURE_CONTAINER_IMAGE_URL] Container Image URL: index.docker.io/library/nginx:stable-otel
 - [AZURE_MANIFEST_FILE_PATH] Manifest File Path: /harness/m1/acaManifest
 - [AZURE_FORCE_TRAFFIC_TO_LATEST] Force Traffic To Latest: true
 - [TIMEOUT] Timeout: 30m
----------------------------------------------

---------------PARAM VALIDATION---------------
All looks good
----------------------------------------------

[INFO] Setting up authentication
[INFO] Using Azure Public cloud
[INFO] Using Service Principal with Secret authentication
[INFO] Phase 1/4: Parsing manifest
[INFO] Container App: aca-aut-test
[INFO] Phase 2/4: Preparing deployment
[INFO] Using location from managed environment: East US
[INFO] Injecting image URL: index.docker.io/library/nginx:stable-otel
[INFO] Traffic will be forced to latest revision
[INFO] Setting active revisions mode: Single
[INFO] Phase 3/4: Deploying container app
[INFO] Deploying container app completed (took 16s)
[INFO] Container App deployed successfully: aca-aut-test
[INFO] Phase 4/4: Finalizing outputs
[INFO] Waiting 1 minute for deployment to stabilise...
[INFO] Revisions:
[INFO] Revision: aca-aut-test--0000001, Status: Running, Replicas: 1, Traffic: 0%
[INFO] Instances:
[INFO] Instance: aca-aut-test--0000001-7c7fd9f49c-bpfcb, Revision: aca-aut-test--0000001, Status: Running
[INFO] Azure Container Apps plugin execution successfully completed
```

## Usage in pipeline

The Azure Container Apps Deploy step should be placed after the Download Manifests and Prepare Rollback Data steps, and before any Traffic Shift steps in your deployment step group.

## YAML Example

```yaml
- step:
    type: AzureContainerAppsDeploy
    name: Azure_Container_Apps_Deploy
    identifier: Azure_Container_Apps_Deploy
    spec:
      connectorRef: account.harnessImage
      image: harness/azure-container-apps-plugin:0.0.1-linux-amd64
      imagePullPolicy: Always
      skipTrafficShift: true
      resources:
        limits:
          memory: 512Mi
          cpu: 0.5
    timeout: 30m
```

## Related resources

- [Canary Deployment Strategy](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-container-apps/canary-deployment)
- [Azure Container Apps Traffic Shift](traffic-shift.md)
- [Azure Container Apps Prepare Rollback Data](prepare-rollback-data.md)
- [Azure Container Apps documentation](https://learn.microsoft.com/en-us/azure/container-apps/)
