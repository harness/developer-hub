---
title: Azure Container Apps Traffic Shift
description: Traffic shift step for Azure Container Apps.
sidebar_position: 4
---

# Azure Container Apps Traffic Shift

The **Azure Container Apps Traffic Shift** step manages progressive traffic distribution from old revisions to new revisions, enabling safe Canary deployments with gradual rollout.

:::note Prerequisites
- This step must be added within a **Container Step Group**. The step runs as a containerized task and requires the container infrastructure configuration provided by the step group.
- A **Download Manifests** step must be added before this step to fetch the required manifest files.
- An **Azure Container Apps Deploy** step must execute before this step to create the new revision.
:::

## What this step does

The Azure Container Apps Traffic Shift step performs the following operations:

1. **Parses inputs**: Reads the manifest and traffic configuration to determine target revisions and traffic weights
2. **Activates required revisions**: Ensures all revisions that should receive traffic are active and sets the active revisions mode to `Multiple` if needed
3. **Applies traffic shift**: Updates the Azure Container App traffic configuration to distribute traffic according to specified weights
4. **Finalizes outputs**: Waits for the deployment to stabilize and outputs current revision status and traffic distribution

This step enables progressive traffic shifting by allowing you to control exactly how traffic is distributed across revisions. You can add multiple traffic shift steps to gradually increase traffic to the new revision while monitoring application health and performance.

## Deployment phases

The step executes in four phases:

### Phase 1: Parsing inputs

```
[INFO] Phase 1/4: Parsing inputs
[INFO] Shifting traffic for app: aca-aut-test
[INFO] Resolved alias "latest" → revision "aca-aut-test--0000001"
[INFO] Resolved alias "secondlatest" → revision "aca-aut-test--ojvsl4z"
```

Harness reads the traffic configuration and resolves revision aliases to actual revision names:
- `latest`: The most recently created revision
- `secondlatest`: The second most recent revision

You can also specify exact revision names instead of using aliases.

### Phase 2: Activating required revisions

```
[INFO] Phase 2/4: Activating required revisions
[INFO] Setting active revisions mode: Multiple
[INFO] Setting active revisions mode to Multiple completed (took 16s)
[INFO] Ensuring revision aca-aut-test--0000001 is active
[INFO] Ensuring revision aca-aut-test--ojvsl4z is active
```

Harness ensures that all revisions specified in the traffic configuration are active. If multiple revisions need to receive traffic, the step sets the active revisions mode to `Multiple` (required for traffic splitting in Azure Container Apps).

### Phase 3: Applying traffic shift

```
[INFO] Phase 3/4: Applying traffic shift
[INFO] Target traffic configuration:
[INFO] Revision: aca-aut-test--0000001, Traffic: 20%, Label: label1
[INFO] Revision: aca-aut-test--ojvsl4z, Traffic: 80%, Label: label2
[INFO] Updating traffic configuration completed (took 16s)
[INFO] Traffic shift completed for app: aca-aut-test
```

Harness updates the traffic configuration in Azure Container Apps to match your specified distribution. Traffic is split according to the weights you configured, and optional tags can be assigned to revisions for testing specific versions.

### Phase 4: Finalizing outputs

```
[INFO] Phase 4/4: Finalizing outputs
[INFO] Waiting 1 minute for deployment to stabilise...
[INFO] Revisions:
[INFO] Revision: aca-aut-test--ojvsl4z, Status: Running, Replicas: 1, Traffic: 80%, Label: label2
[INFO] Revision: aca-aut-test--0000001, Status: Running, Replicas: 1, Traffic: 20%, Label: label1
[INFO] Instances:
[INFO] Instance: aca-aut-test--ojvsl4z-6dc55779cc-jbqk8, Revision: aca-aut-test--ojvsl4z, Status: Running
[INFO] Instance: aca-aut-test--0000001-7c7fd9f49c-bpfcb, Revision: aca-aut-test--0000001, Status: Running
```

Harness waits for the traffic shift to stabilize (typically 1 minute) and then outputs the current state, including revision status, replica counts, traffic distribution, and instance details.

## Step parameters

### Revision Traffic Details

This section defines how traffic should be distributed across revisions. You can add multiple entries to split traffic between different revisions.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Revision Name** | The name of the revision that should receive traffic. Use `latest` for the most recent revision, `secondlatest` for the second most recent, or specify an exact revision name. | Yes |
| **Traffic Value** | The percentage of traffic this revision should receive (0-100). The sum of all traffic values must equal 100. | Yes |
| **Tag** (optional) | A tag assigned to this revision for testing. You can use tags to route requests to specific revisions for testing purposes via revision-specific URLs. | No |

### Additional Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for the step | No |
| **Timeout** | Maximum time allowed for the step to complete (default: `30m`) | No |
| **Skip Traffic Shift** | When enabled, the step skips traffic shifting. Typically left disabled (false) for standard Canary deployments. | No |

## Container configuration

| Parameter | Description |
|-----------|-------------|
| **Container Registry** | Harness connector for authenticating to your container registry. This connector pulls the deployment plugin image. |
| **Image** | The deployment plugin container image. Use the official Harness image: [`harness/azure-container-apps-plugin:0.0.1-linux-amd64`](https://hub.docker.com/r/harness/azure-container-apps-plugin/tags) |
| **Image Pull Policy** | Policy for pulling the container image (default: `Always`) |
| **Resources** | Resource limits for the container (e.g., `512Mi` memory, `0.5` CPU) |

## Revision aliases

To make traffic shifting easier and more maintainable, you can use revision aliases instead of hardcoding revision names:

- **`latest`**: References the most recently created revision (typically the new version you just deployed)
- **`secondlatest`**: References the second most recent revision (typically the previous version)

These aliases are resolved dynamically at runtime, so your pipeline configuration remains valid across multiple deployments without requiring updates.

**Example usage:**

```yaml
trafficShiftDetails:
  - revisionName: latest
    trafficValue: 20
    tag: canary
  - revisionName: secondlatest
    trafficValue: 80
    tag: stable
```

## Progressive traffic shifting

For safe Canary deployments, you should add multiple traffic shift steps with increasing traffic percentages. This enables you to validate the new revision at each traffic level before increasing exposure.

**Example phased rollout:**

1. **Traffic Shift 1**: 20% to latest (new), 80% to secondlatest (old)
   - Initial validation with minimal risk
   - Monitor error rates and performance metrics

2. **Traffic Shift 2**: 70% to latest, 30% to secondlatest
   - Increase exposure after validation
   - Continue monitoring application health

3. **Traffic Shift 3**: 100% to latest
   - Full cutover to the new revision
   - Old revision can be deactivated

Between each traffic shift step, you can add:
- Manual approval steps for controlled progression
- Verification steps to check application metrics
- Custom scripts to validate specific functionality
- Wait steps to allow metrics to stabilize

## Example log output

### Traffic Shift Step 1 (20% / 80%)

```
---------------INPUT PARAMETERS---------------
 - [AZURE_CONTAINER_APPS_STEP_TYPE] Step Type: AzureContainerAppsTrafficShift
 - [AZURE_TRAFFIC_CONFIG] Traffic Config: ******
 - [AZURE_MANAGED_ENVIRONMENT] Managed Environment: aaakash
 - [AZURE_RESOURCE_GROUP] Azure Resource Group: cdp-automation-test
 - [AZURE_SUBSCRIPTION_ID] Azure Subscription ID: 20d6a917-99fa-4b1b-9b2e-a3d624e9dcf0
 - [AZURE_MANIFEST_FILE_PATH] Manifest File Path: /harness/m1/acaManifest
 - [AZURE_FORCE_TRAFFIC_TO_LATEST] Force Traffic To Latest: false
 - [TIMEOUT] Timeout: 30m
----------------------------------------------

---------------PARAM VALIDATION---------------
All looks good
----------------------------------------------

[INFO] Setting up authentication
[INFO] Using Azure Public cloud
[INFO] Using Service Principal with Secret authentication
[INFO] Phase 1/4: Parsing inputs
[INFO] Shifting traffic for app: aca-aut-test
[INFO] Resolved alias "latest" → revision "aca-aut-test--0000001"
[INFO] Resolved alias "secondlatest" → revision "aca-aut-test--ojvsl4z"
[INFO] Phase 2/4: Activating required revisions
[INFO] Setting active revisions mode: Multiple
[INFO] Setting active revisions mode to Multiple completed (took 16s)
[INFO] Ensuring revision aca-aut-test--0000001 is active
[INFO] Ensuring revision aca-aut-test--ojvsl4z is active
[INFO] Phase 3/4: Applying traffic shift
[INFO] Target traffic configuration:
[INFO] Revision: aca-aut-test--0000001, Traffic: 20%, Label: label1
[INFO] Revision: aca-aut-test--ojvsl4z, Traffic: 80%, Label: label2
[INFO] Updating traffic configuration completed (took 16s)
[INFO] Traffic shift completed for app: aca-aut-test
[INFO] Phase 4/4: Finalizing outputs
[INFO] Waiting 1 minute for deployment to stabilise...
[INFO] Revisions:
[INFO] Revision: aca-aut-test--ojvsl4z, Status: Running, Replicas: 1, Traffic: 80%, Label: label2
[INFO] Revision: aca-aut-test--0000001, Status: Running, Replicas: 1, Traffic: 20%, Label: label1
[INFO] Instances:
[INFO] Instance: aca-aut-test--ojvsl4z-6dc55779cc-jbqk8, Revision: aca-aut-test--ojvsl4z, Status: Running
[INFO] Instance: aca-aut-test--0000001-7c7fd9f49c-bpfcb, Revision: aca-aut-test--0000001, Status: Running
[INFO] Azure Container Apps plugin execution successfully completed
```

### Traffic Shift Step 2 (70% / 30%)

```
[INFO] Phase 1/4: Parsing inputs
[INFO] Shifting traffic for app: aca-aut-test
[INFO] Resolved alias "latest" → revision "aca-aut-test--0000001"
[INFO] Resolved alias "secondlatest" → revision "aca-aut-test--ojvsl4z"
[INFO] Phase 2/4: Activating required revisions
[INFO] Setting active revisions mode: Multiple
[INFO] Setting active revisions mode to Multiple completed (took 16s)
[INFO] Ensuring revision aca-aut-test--0000001 is active
[INFO] Ensuring revision aca-aut-test--ojvsl4z is active
[INFO] Phase 3/4: Applying traffic shift
[INFO] Target traffic configuration:
[INFO] Revision: aca-aut-test--0000001, Traffic: 70%, Label: label1
[INFO] Revision: aca-aut-test--ojvsl4z, Traffic: 30%, Label: label2
[INFO] Updating traffic configuration completed (took 16s)
[INFO] Traffic shift completed for app: aca-aut-test
[INFO] Phase 4/4: Finalizing outputs
[INFO] Waiting 1 minute for deployment to stabilise...
[INFO] Revisions:
[INFO] Revision: aca-aut-test--ojvsl4z, Status: Running, Replicas: 1, Traffic: 30%, Label: label2
[INFO] Revision: aca-aut-test--0000001, Status: Running, Replicas: 1, Traffic: 70%, Label: label1
[INFO] Instances:
[INFO] Instance: aca-aut-test--ojvsl4z-6dc55779cc-jbqk8, Revision: aca-aut-test--ojvsl4z, Status: Running
[INFO] Instance: aca-aut-test--0000001-7c7fd9f49c-bpfcb, Revision: aca-aut-test--0000001, Status: Running
[INFO] Azure Container Apps plugin execution successfully completed
```

## Usage in pipeline

The Azure Container Apps Traffic Shift step should be placed after the Deploy step in your deployment step group. You can add multiple traffic shift steps to create a progressive rollout.

## YAML Example

### Single Traffic Shift (100%)

```yaml
- step:
    type: AzureContainerAppsTrafficShift
    name: Traffic_Shift_100
    identifier: Traffic_Shift_100
    spec:
      trafficShiftDetails:
        - revisionName: latest
          trafficValue: 100
          tag: production
      connectorRef: account.harnessImage
      image: harness/azure-container-apps-plugin:0.0.1-linux-amd64
      imagePullPolicy: Always
      skipTrafficShift: false
      resources:
        limits:
          memory: 512Mi
          cpu: 0.5
    timeout: 30m
```

### Progressive Traffic Shift (20% / 80%)

```yaml
- step:
    type: AzureContainerAppsTrafficShift
    name: Traffic_Shift_20
    identifier: Traffic_Shift_20
    spec:
      trafficShiftDetails:
        - revisionName: latest
          trafficValue: 20
          tag: label1
        - revisionName: secondlatest
          trafficValue: 80
          tag: label2
      connectorRef: account.harnessImage
      image: harness/azure-container-apps-plugin:0.0.1-linux-amd64
      imagePullPolicy: Always
      skipTrafficShift: false
      resources:
        limits:
          memory: 512Mi
          cpu: 0.5
    timeout: 30m
```

## Related resources

- [Canary Deployment Strategy](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-container-apps/canary-deployment)
- [Azure Container Apps Deploy](deploy-aca.md)
- [Traffic splitting in Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/revisions-manage#traffic-splitting)
- [Azure Container Apps documentation](https://learn.microsoft.com/en-us/azure/container-apps/)
