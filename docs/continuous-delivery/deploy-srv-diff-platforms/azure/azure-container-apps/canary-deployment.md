---
title: Canary Deployment
description: Configure and execute Canary Azure Container Apps deployments with progressive traffic shifting.
sidebar_position: 4
---

This guide explains how to configure and execute progressive Canary deployments for Azure Container Apps using gradual traffic shifting in Harness.

:::info Feature Flag
This feature is behind the feature flag `CDS_AZURE_CONTAINER_APPS`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::


## Prerequisites for Canary deployment

Before setting up your Canary deployment, ensure you have the following Azure resources already configured:

- **Harness Account**: Active account with the Continuous Delivery module enabled
- **Azure Subscription**: An active Azure subscription with appropriate permissions
- **Azure Connector**: A Harness connector to Azure using OIDC or Service Principal authentication
- **Managed Environment**: An Azure Container Apps managed environment where your container apps will be deployed
- **Container Registry**: Azure Container Registry (ACR), Docker Hub, or another supported container registry with your container images
- **IAM Permissions**: Service principal with permissions to manage Container Apps, Managed Environments, and related resources

## Select deployment strategy

After configuring your service, environment, and infrastructure, navigate to the **Execution** tab and select the **Canary** execution strategy. Harness automatically adds a pre-configured step group containing all the necessary deployment steps. This automated setup eliminates manual configuration and ensures best practices for zero-downtime deployments with progressive traffic shifting.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/canary-step-group.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

The step group includes four steps: Download Manifests, Prepare Rollback Data, Deploy, and Traffic Shift. You can add additional Traffic Shift steps for progressive rollout.

## Step configuration

The Canary deployment workflow uses three default steps plus manually added Traffic Shift steps. All steps must be added within a Container Step Group.

:::important Containerized Step Group Required
All Azure Container Apps deployment steps must be added within a **Container Step Group** (also called a Containerized Step Group). These steps run as containerized tasks and require the container infrastructure configuration (Kubernetes connector and namespace) provided by the step group. The steps will not execute without being placed in a Container Step Group.
:::

### 1. Download Manifests

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/download-manifests-step.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| **Name** | Display name for the step | No | `DownloadManifests` |
| **Timeout** | Maximum time allowed for downloading manifests | No | `10m` |

This step downloads all manifest files specified in your service configuration and makes them available for subsequent deployment steps.

For detailed information on how this step works, see [Download Manifests](step-references/download-manifests.md).

### 2. Azure Container Apps Prepare Rollback Data

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/prepare-rollback-step.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| **Name** | Display name for the step | No | - |
| **Timeout** | Maximum time for the step to complete | No | `10m` |
| **Container Registry** | Harness connector for the deployment plugin image | Yes | - |
| **Image** | Deployment plugin container image | Yes | `harness/azure-container-apps-plugin:0.0.1-linux-amd64` |
| **Image Pull Policy** | Policy for pulling the container image | No | `Always` |

This step captures the current state of your container app before deployment begins, enabling rollback if needed.

For detailed information on how this step works, see [Azure Container Apps Prepare Rollback Data](step-references/prepare-rollback-data.md).

### 3. Azure Container Apps Deploy

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/deploy-step.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| **Name** | Display name for the step | No | - |
| **Timeout** | Maximum time for the step to complete | No | `30m` |
| **Skip Traffic Shift** | Creates revision without traffic cutover | No | `false` |
| **Container Registry** | Harness connector for the deployment plugin image | Yes | - |
| **Image** | Deployment plugin container image | Yes | `harness/azure-container-apps-plugin:0.0.1-linux-amd64` |
| **Image Pull Policy** | Policy for pulling the container image | No | `Always` |

This step creates a new revision with your updated container image. For Canary deployments, enable **Skip Traffic Shift** to create the revision without shifting traffic.

:::note
For Canary deployment, **Skip Traffic Shift** must be **enabled (checked)** to prevent immediate traffic cutover. Traffic shifting is then controlled by separate Traffic Shift steps. The screenshot above shows this correctly configured.
:::

For detailed information on how this step works, see [Azure Container Apps Deploy](step-references/deploy-aca.md).

### 4. Azure Container Apps Traffic Shift (Manually Added)

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/traffic-shift-step.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| **Name** | Display name for the step | No | - |
| **Timeout** | Maximum time for the step to complete | No | `30m` |
| **Revision Name** | Revision to receive traffic (`latest`, `secondlatest`, or exact name) | Yes | - |
| **Traffic Value** | Percentage of traffic (0-100, sum must equal 100) | Yes | - |
| **Tag** | Optional tag for testing specific revisions | No | - |
| **Container Registry** | Harness connector for the deployment plugin image | Yes | - |
| **Image** | Deployment plugin container image | Yes | `harness/azure-container-apps-plugin:0.0.1-linux-amd64` |
| **Image Pull Policy** | Policy for pulling the container image | No | `Always` |

This step controls progressive traffic distribution. Add multiple instances for gradual rollout (e.g., 20% → 70% → 100%).

For detailed information on how this step works, see [Azure Container Apps Traffic Shift](step-references/traffic-shift.md).

### 5. Azure Container Apps Rollback (In Rollback Tab)

The rollback step is automatically added to the **Rollback** tab when you select the Canary deployment strategy. Click the **Rollback** tab to view the rollback configuration.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/rollback-tab.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/rollback-step-config.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| **Name** | Display name for the step | No | `Azure Container Apps Rollback` |
| **Timeout** | Maximum time for the step to complete | No | `30m` |
| **Container Registry** | Harness connector for the deployment plugin image | Yes | - |
| **Image** | Deployment plugin container image | Yes | `harness/azure-container-apps-plugin:0.0.1-linux-amd64` |
| **Image Pull Policy** | Policy for pulling the container image | No | `Always` |

This step restores your container app to its previous state using the rollback data captured before deployment. It executes automatically when a deployment fails or when you manually trigger a rollback.

For detailed information on how this step works, see [Azure Container Apps Rollback](step-references/rollback.md).

## How Canary deployment works

Canary deployment enables gradual rollout of new versions by progressively shifting traffic from existing revisions to the new revision. This approach minimizes risk by allowing you to validate new deployments with a small percentage of traffic before exposing them to your entire user base.

Unlike [Basic deployment](basic-deployment.md) which shifts traffic immediately, Canary deployment gives you control over traffic distribution at each stage, allowing you to monitor metrics and halt or rollback if issues arise.

### Deployment flow

#### Phase 1: Download Manifests

The Download Manifests step fetches all manifest files specified in your service configuration and makes them available for subsequent deployment steps. Harness downloads the Azure Container Apps manifest from your configured manifest store (Inline, Harness File Store, or Git), validates the YAML/JSON structure, and stages it for use by the deployment steps.

**What this step does:**

- Fetches all manifest files configured in your service definition
- Downloads Azure Container Apps manifest from your configured manifest store
- Validates the YAML/JSON structure of the manifest
- Stages the manifest files in a temporary directory (`/harness/m1/`)
- Makes manifests available for subsequent deployment steps

**Example output:**

```
Download Path:   /harness/m1

Creating file :  /harness/m1/acaManifest
```

#### Phase 2: Prepare Rollback Data

The Azure Container Apps Prepare Rollback Data step captures the current state of your container app before deployment begins. This step reads the Azure Container Apps manifest to identify the container app name, retrieves the current state from Azure including active revisions and traffic weights, and stores this information for use by the rollback step if deployment fails or issues are detected.

**What this step captures:**

- Current active revisions and their traffic weights
- Current traffic configuration
- Revision names and status
- Container app configuration settings
- Managed environment details
- Resource group and subscription information

This data ensures that if something goes wrong during deployment, Harness can restore your container app to its exact previous state, including traffic distribution across revisions.

**Example log output:**

```
[INFO] Phase 1/2: Parsing manifest
[INFO] Preparing rollback data for container app: aca-aut-test
[INFO] Phase 2/2: Fetching current app state
[INFO] Current traffic config fetched for app: aca-aut-test
[INFO] Saved traffic configuration for rollback:
[INFO] Revision: aca-aut-test--ojvsl4z, Traffic: 100%
```

#### Phase 3: Deploy New Revision

The Azure Container Apps Deploy step creates a new revision with your updated container image. Harness reads the manifest configuration, injects the container image URL from your artifact configuration, and creates the new revision in Azure Container Apps.

**Deployment behavior for Canary:**

For progressive Canary deployments, you must **enable Skip Traffic Shift (set to true)** in the Deploy step:

- **Skip Traffic Shift = enabled (true)**: The Deploy step only creates the new revision without shifting traffic to it. Traffic shifting is performed explicitly in subsequent Azure Container Apps Traffic Shift steps. This is **required** for progressive Canary deployments where you want full control over gradual traffic shifting.

- **Skip Traffic Shift = disabled (false)**: This is the default for [Basic deployment](basic-deployment.md) where traffic shifts immediately to the new revision. Do not use this setting for progressive Canary deployments.

The Deploy step completes the following operations in four phases:

**Phase 1: Parsing manifest**
```
[INFO] Phase 1/4: Parsing manifest
[INFO] Container App: aca-aut-test
```
Harness reads the Azure Container Apps manifest to extract the container app name and validate the configuration.

**Phase 2: Preparing deployment**
```
[INFO] Phase 2/4: Preparing deployment
[INFO] Using location from managed environment: East US
[INFO] Injecting image URL: index.docker.io/library/nginx:stable-otel
[INFO] Traffic will NOT be forced to latest revision (Skip Traffic Shift enabled)
[INFO] Setting active revisions mode: Multiple
```
Harness prepares the deployment by determining the Azure region, injecting the container image URL (replaces `placeholder` in the manifest), and setting the active revisions mode to `Multiple` to support traffic splitting across revisions.

**Phase 3: Deploying container app**
```
[INFO] Phase 3/4: Deploying container app
[INFO] Deploying container app completed (took 16s)
[INFO] Container App deployed successfully: aca-aut-test
```
Harness deploys the container app to Azure, creating a new revision with the updated configuration. The new revision is created but receives no traffic initially.

**Phase 4: Finalizing outputs**
```
[INFO] Phase 4/4: Finalizing outputs
[INFO] Waiting 1 minute for deployment to stabilise...
[INFO] Revisions:
[INFO] Revision: aca-aut-test--0000001, Status: Running, Replicas: 1, Traffic: 0%
[INFO] Revision: aca-aut-test--ojvsl4z, Status: Running, Replicas: 1, Traffic: 100%
[INFO] Instances:
[INFO] Instance: aca-aut-test--0000001-7c7fd9f49c-bpfcb, Revision: aca-aut-test--0000001, Status: Running
[INFO] Instance: aca-aut-test--ojvsl4z-6dc55779cc-jbqk8, Revision: aca-aut-test--ojvsl4z, Status: Running
```
Harness waits for the deployment to stabilize and outputs the current state. Notice the new revision (`aca-aut-test--0000001`) receives 0% traffic, while the old revision still receives 100%. The Deploy step outputs the new revision name, which you can reference in traffic shift steps using the `latest` alias or expressions.

#### Phase 4: Traffic Shifting

For progressive Canary deployments, you manually add **Azure Container Apps Traffic Shift** steps after the Deploy step to enable gradual traffic shifting from old revisions to the new revision. This gives you full control over when and how traffic moves to the new revision.

To enable progressive traffic shifting:

1. Enable **Skip Traffic Shift** in the Deploy step
2. Add one or more **Azure Container Apps Traffic Shift** steps after the Deploy step

The Traffic Shift step performs the following operations in four phases:

**Phase 1: Parsing inputs**
```
[INFO] Phase 1/4: Parsing inputs
[INFO] Shifting traffic for app: aca-aut-test
[INFO] Resolved alias "latest" → revision "aca-aut-test--0000001"
[INFO] Resolved alias "secondlatest" → revision "aca-aut-test--ojvsl4z"
```
Harness reads the traffic configuration and resolves revision aliases to actual revision names. You can use `latest` (most recently created revision) or `secondlatest` (second most recent revision) instead of hardcoding revision names.

**Phase 2: Activating required revisions**
```
[INFO] Phase 2/4: Activating required revisions
[INFO] Setting active revisions mode: Multiple
[INFO] Setting active revisions mode to Multiple completed (took 16s)
[INFO] Ensuring revision aca-aut-test--0000001 is active
[INFO] Ensuring revision aca-aut-test--ojvsl4z is active
```
Harness ensures that all revisions specified in the traffic configuration are active. If multiple revisions need to receive traffic, the step sets the active revisions mode to `Multiple` (required for traffic splitting in Azure Container Apps).

**Phase 3: Applying traffic shift**
```
[INFO] Phase 3/4: Applying traffic shift
[INFO] Target traffic configuration:
[INFO] Revision: aca-aut-test--0000001, Traffic: 20%, Tag: label1
[INFO] Revision: aca-aut-test--ojvsl4z, Traffic: 80%, Tag: label2
[INFO] Updating traffic configuration completed (took 16s)
[INFO] Traffic shift completed for app: aca-aut-test
```
Harness updates the traffic configuration in Azure Container Apps to match your specified distribution. Traffic is split according to the weights you configured, and optional tags can be assigned to revisions for testing specific versions.

**Phase 4: Finalizing outputs**
```
[INFO] Phase 4/4: Finalizing outputs
[INFO] Waiting 1 minute for deployment to stabilise...
[INFO] Revisions:
[INFO] Revision: aca-aut-test--ojvsl4z, Status: Running, Replicas: 1, Traffic: 80%, Tag: label2
[INFO] Revision: aca-aut-test--0000001, Status: Running, Replicas: 1, Traffic: 20%, Tag: label1
[INFO] Instances:
[INFO] Instance: aca-aut-test--ojvsl4z-6dc55779cc-jbqk8, Revision: aca-aut-test--ojvsl4z, Status: Running
[INFO] Instance: aca-aut-test--0000001-7c7fd9f49c-bpfcb, Revision: aca-aut-test--0000001, Status: Running
```
Harness waits for the traffic shift to stabilize (typically 1 minute) and outputs the current state, including revision status, replica counts, traffic distribution, and instance details.

**Example traffic shift progression:**

- **Traffic Shift 1**: 20% to latest (new revision), 80% to secondlatest (old revision)
- **Traffic Shift 2**: 70% to latest, 30% to secondlatest
- **Traffic Shift 3**: 100% to latest

Between each shift, you can monitor application metrics, error rates, and performance before proceeding to the next step. You can also add manual approval steps or custom verification steps between traffic shifts.

## Gradual traffic shifting

For safe production rollouts, you can add multiple **Azure Container Apps Traffic Shift** steps with increasing traffic percentages. This enables you to validate the new revision at each traffic level before increasing exposure.

**Example phased rollout:**

1. **Traffic Shift 1**: 20% to latest (new), 80% to secondlatest (old) - initial validation with minimal risk
2. **Traffic Shift 2**: 70% to latest, 30% to secondlatest - balanced load testing
3. **Traffic Shift 3**: 100% to latest, 0% to secondlatest - full cutover

Between each shift, you can:

- Monitor application metrics and error rates
- Run verification steps or manual approvals
- Add custom scripts or API calls for validation
- Roll back if issues are detected

## Rollback

When deployment fails or issues are detected, Harness can automatically roll back to the previous state using the rollback data captured during the Prepare Rollback Data step.

**Rollback process:**

1. Retrieves the rollback data captured before deployment
2. Restores the traffic configuration to the previous state
3. Restores the previous revision traffic weights
4. Reactivates previous revisions as needed

The rollback step is automatically added to your pipeline's rollback section when you select the Canary strategy.

## Complete pipeline examples

### Canary deployment pipeline

This example shows a complete Canary deployment pipeline with gradual traffic shifting. The pipeline deploys a new revision and progressively shifts traffic in three stages: 20% → 70% → 100%.

<details>
<summary>Complete Pipeline YAML Example</summary>

```yaml
pipeline:
  name: Azure Container Apps Canary Deployment
  identifier: aca_canary_deployment
  projectIdentifier: my_project
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Deploy
        identifier: deploy
        description: "Canary Azure Container Apps Deployment"
        type: Deployment
        spec:
          deploymentType: AzureContainerApps
          service:
            serviceRef: <+input>
          environment:
            environmentRef: <+input>
            deployToAll: false
            infrastructureDefinitions:
              - identifier: <+input>
          execution:
            steps:
              - stepGroup:
                  name: Azure Container Apps Deployment
                  identifier: aca_deployment
                  steps:
                    - step:
                        type: DownloadManifests
                        name: Download Manifests
                        identifier: DownloadManifests
                        spec: {}
                        failureStrategies: []
                    - step:
                        name: ACA Prepare Rollback Data
                        identifier: AcaPrepareRollbackData
                        type: AzureContainerAppsPrepareRollbackData
                        timeout: 10m
                        spec:
                          connectorRef: account.harnessImage
                          image: harness/azure-container-apps-plugin:0.0.1-linux-amd64
                    - step:
                        name: ACA Deploy
                        identifier: AcaDeploy
                        type: AzureContainerAppsDeploy
                        timeout: 30m
                        spec:
                          connectorRef: account.harnessImage
                          image: harness/azure-container-apps-plugin:0.0.1-linux-amd64
                          skipTrafficShift: true
                    - step:
                        name: ACA Traffic Shift 20%
                        identifier: AcaTrafficShift1
                        type: AzureContainerAppsTrafficShift
                        timeout: 30m
                        spec:
                          connectorRef: account.harnessImage
                          image: harness/azure-container-apps-plugin:0.0.1-linux-amd64
                          revisionTrafficDetails:
                            - revisionName: latest
                              trafficValue: 20
                              tag: canary
                            - revisionName: secondlatest
                              trafficValue: 80
                              tag: stable
                    - step:
                        name: ACA Traffic Shift 70%
                        identifier: AcaTrafficShift2
                        type: AzureContainerAppsTrafficShift
                        timeout: 30m
                        spec:
                          connectorRef: account.harnessImage
                          image: harness/azure-container-apps-plugin:0.0.1-linux-amd64
                          revisionTrafficDetails:
                            - revisionName: latest
                              trafficValue: 70
                              tag: canary
                            - revisionName: secondlatest
                              trafficValue: 30
                              tag: stable
                    - step:
                        name: ACA Traffic Shift 100%
                        identifier: AcaTrafficShift3
                        type: AzureContainerAppsTrafficShift
                        timeout: 30m
                        spec:
                          connectorRef: account.harnessImage
                          image: harness/azure-container-apps-plugin:0.0.1-linux-amd64
                          revisionTrafficDetails:
                            - revisionName: latest
                              trafficValue: 100
                              tag: production
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: <+input>
                      namespace: default
            rollbackSteps:
              - stepGroup:
                  name: ACA Rollback
                  identifier: aca_rollback
                  steps:
                    - step:
                        name: ACA Rollback
                        identifier: AcaRollbackStep
                        type: AzureContainerAppsRollback
                        timeout: 30m
                        spec:
                          connectorRef: account.harnessImage
                          image: harness/azure-container-apps-plugin:0.0.1-linux-amd64
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: <+input>
                      namespace: default
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```

</details>

## Related resources

- [Azure Container Apps Revisions](https://learn.microsoft.com/en-us/azure/container-apps/revisions)
- [Traffic splitting in Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/revisions-manage#traffic-splitting)
- [Configure Service and Environment](configure-service-environment.md)
- [Download Manifests](step-references/download-manifests.md)
- [Prepare Rollback Data](step-references/prepare-rollback-data.md)
- [Azure Container Apps Deploy](step-references/deploy-aca.md)
- [Azure Container Apps Traffic Shift](step-references/traffic-shift.md)
- [Azure Container Apps Rollback](step-references/rollback.md)
