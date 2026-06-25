---
title: GCE Provision Backend Service
description: Provision a Google Cloud backend service.
sidebar_position: 2
tags:
  - gce-provision-backend-service
  - gce-provision-backend-service-step
---

# GCE Provision Backend Service

The **GCE Provision Backend Service** step creates or updates a backend service in Google Cloud. This is a utility step that can be used to provision any backend service within GCP, not limited to MIG deployments.

The step includes built-in support for fetching backend service configuration files from multiple sources: **Google Cloud Storage (GCS)**, **Git providers** (GitHub, GitLab, Bitbucket), or the **Harness File Store**. You no longer need to add a separate download step when using the built-in store configuration.

:::note Prerequisites
This step must be added within a **Container Step Group**. The step runs as a containerized task and requires the container infrastructure configuration provided by the step group.
:::

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/gce-provision-backend.png')} width="40%" height="40%" title="Click to view full size image" />
</div>

## Configuration methods

You can configure the backend service in two ways:

### Use built-in store support (recommended)

When you configure the step, select a store type and provide the file location. Harness fetches the file and provisions the backend service automatically.

Supported store types:
- **Google Cloud Storage (GCS):** Fetch configuration from a GCS bucket.
- **Git providers** (GitHub, GitLab, Bitbucket): Fetch from a Git repository.
- **Harness File Store:** Use files stored in Harness.

This method simplifies your pipeline. It removes the need for a separate download step.

### Use a separate download step (legacy)

You can also use a **Download Harness Store** or **Git Clone** step before the GCE Provision Backend Service step to fetch the configuration file manually. The **Config File Path** parameter in the provision step must then point to the downloaded file location (e.g., `/harness/backendservice.json`).

Harness recommends the built-in store method for simpler pipeline configuration.
## What this step does

This step creates or updates a backend service in Google Cloud. You can use it to:

- Create a new backend service in GCP if it doesn't exist
- Update an existing backend service if it already exists
- Configure load balancing, health checks, and backend groups based on the configuration file

## Configure the step

### Step Parameters

#### Name

Enter a name for the step. You can use fixed values or runtime inputs.

#### Timeout

Set the timeout duration for the step. Default is `10m`.

#### GCP Connector

Select your Harness GCP connector that has permissions to create and manage backend services in your Google Cloud project.

#### Project

Enter the GCP project ID where the backend service will be created or updated.

#### Region

Select the GCP region for the backend service (e.g., `us-central1`).

#### Backend Service

Enter the name of the backend service to create or update.

#### Config

Click the Config field to open the store configuration wizard. This defines where Harness fetches your backend service configuration file.

Harness supports multiple store types:

- **GCS (Google Cloud Storage)**: Fetch configuration from a GCS bucket
- **GitHub**: Fetch from a GitHub repository
- **GitLab**: Fetch from a GitLab repository
- **Bitbucket**: Fetch from a Bitbucket repository
- **Harness**: Use the Harness File Store
- **Git**: Use a generic Git provider

After selecting a store type, provide the required details:

**For Google Cloud Storage (GCS):**
- **Google Cloud Storage Connector:** Select your Harness [GCP connector](/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp) with read access to the GCS bucket
- **Bucket Name:** Enter the GCS bucket containing your backend service configuration file
- **Manifest Path:** Enter the path to the JSON file inside the bucket (e.g., `backend-services/prod-config.json`)

**For Git providers (GitHub, GitLab, Bitbucket):**
- **Git Connector:** Select your Harness connector to your Git provider. Go to [Code repository connectors](/docs/category/code-repo-connectors) to configure connectors
- **Repository:** Enter the Git repository name
- **Branch/Commit/Tag:** Enter the Git reference to fetch from
- **File Path:** Enter the path to the JSON file in the repository (e.g., `configs/backend-service.json`)

**For Harness File Store:**
- **File Path:** Enter the path to the file in [Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store) (e.g., `/mig_config/backend-service.json`)

### Container Configuration

This step runs as a containerized task and requires container configuration.

#### Container Registry

Select your Harness connector for authenticating to your container registry. This connector pulls the deployment plugin image.

#### Image

Enter the deployment plugin container image. Use the official Harness image:

```
harness/gce-provision-backend-service:0.0.1-linux-amd64
```

## Backend service configuration file

The configuration file defines the backend service properties in JSON format. Store this file in GCS, a Git repository, or the Harness File Store, and reference it through the store configuration in the step.

```json
{
  "name": "my-backend-service",
  "loadBalancingScheme": "INTERNAL_SELF_MANAGED",
  "protocol": "HTTP",
  "portName": "http",
  "sessionAffinity": "NONE",
  "timeoutSec": 30,
  "connectionDraining": {
    "drainingTimeoutSec": 300
  },
  "healthChecks": [
    "projects/PROJECT_ID/global/healthChecks/HEALTH_CHECK_NAME"
  ],
  "backends": [
    {
      "group": "projects/PROJECT_ID/zones/ZONE/instanceGroups/MIG_NAME",
      "balancingMode": "UTILIZATION",
      "maxUtilization": 0.8,
      "capacityScaler": 1.0
    }
  ]
}
```

### Using expressions for dynamic values

You can use Harness expressions in the configuration file to dynamically reference values from other pipeline steps. This is useful when the MIG name or other values are generated during pipeline execution.

For example, to reference a MIG name from a previous deployment step, use an expression like:

```
<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_GROUP_ID.steps.DEPLOY_STEP_ID.output.outputVariables.MIG_NAME>
```

The exact expression path depends on your pipeline structure—replace `STAGE_ID`, `STEP_GROUP_ID`, and `DEPLOY_STEP_ID` with the actual identifiers from your pipeline configuration.

For more information on using expressions, see [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables/#get-inputoutput-expressions-from-execution-details).

## Pipeline YAML

<details>
<summary>View pipeline YAML example</summary>

```yaml
- stepGroup:
    name: MIG Deployment
    identifier: MIG
    steps:
      - step:
          type: GCEProvisionBackendService
          name: GCEProvisionBackendService_1
          identifier: GCEProvisionBackendService_1
          spec:
            gcpConnectorRef: <+input>
            project: pl-play
            region: us-central1
            backendService: prod-backend-service
            config:
              type: Harness
              spec:
                secretFiles: []
                files:
                  - /gcp-backend-service/prod-service
            connectorRef: account.harnessImage
            image: harness/gce-provision-backend-service:0.0.1-linux-amd64
          timeout: 10m
    stepGroupInfra:
      type: KubernetesDirect
      spec:
        connectorRef: <+input>
        namespace: <+input>
```

</details>
