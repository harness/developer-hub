---
title: Helm services
description: "Configure Helm services in Harness: chart sources, values files, artifact sources, sidecars, and advanced options."
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Harness service for Native Helm represents the application you want to deploy. It holds the Helm chart source, values files, artifact sources, and sidecar definitions that Harness uses to run the Helm release.

Services are independent of pipelines; configure one once and reuse it across stages and pipelines.

---

## Create a Helm service

1. Go to **Deployments**, expand the drop-down, and select **Services** under **Resources**.
2. Select **Create Service**.
3. In the **Create service** panel, select **Native Helm** from the **Deployment Target** drop-down.
4. Harness auto-generates a name and ID. You can change both.
5. Under **Storage**, choose **Inline** (Harness stores the service configuration) or a Git repository.
6. Configure manifests, additional override files, artifact sources, and sidecars as described in the sections below.
7. Expand **Advanced** to add config files, variables, and service hooks.
8. Select **Create**.

---

## Add a manifest

Select **+ Add** under **Manifest**. Native Helm services support one manifest type: **Helm Chart**.

### Helm Chart

Use this type for a Helm chart stored in a Harness Code repository, Git provider, HTTP Helm repository, S3 bucket, or GCS bucket. The available fields vary by source.

**Common fields (all sources)**

| Field | Description |
| --- | --- |
| **ID** | A unique identifier for this manifest within the service. |
| **Helm Version** | Select **V3**. |

**Harness Code, GitHub, Git, GitLab, Bitbucket, Azure Repos**

| Field | Description |
| --- | --- |
| **Source** | Select the Git provider. Requires a Harness connector for that provider. |
| **Repository** | The repository that contains your chart. |
| **Fetch** | Select **Branch** to track a branch head, or **Commit** to pin to a specific SHA. |
| **Branch / Commit** | The branch name or commit SHA. |
| **Chart Path** | The path to the chart folder from the root of the repository. Harness expects a `Chart.yaml` at this path. |

**Amazon S3**

| Field | Description |
| --- | --- |
| **Connector** | A Harness AWS connector with `s3:GetObject` and `s3:ListBucket` permissions. |
| **Region** | The AWS region where the bucket is located. |
| **Bucket Name** | The name of the S3 bucket. |
| **Folder Path** | The path to the chart folder or `.tgz` file within the bucket. |

**Google Cloud Storage**

| Field | Description |
| --- | --- |
| **Connector** | A Harness GCP connector with **Storage Object Viewer** role on the bucket. |
| **Bucket Name** | The name of the GCS bucket. |
| **Folder Path** | The path to the chart folder or `.tgz` file within the bucket. |

**HTTP Helm**

| Field | Description |
| --- | --- |
| **Connector** | A Harness HTTP Helm connector pointing to your Helm repository. |
| **Chart Name** | The name of the chart in the repository. |
| **Chart Version** | The chart version to deploy. Supports a fixed value, runtime input, or an expression. |

Expand **Advanced** under the manifest form to add values override files. Harness merges these at render time; later files take priority over earlier ones.

---

## Add an additional override file

Override files let you layer values on top of your base chart at deploy time without modifying the chart itself. Useful for environment-specific configuration.

Select **+ Add** under **Additional override file**. Set **Type** to **Values YAML**, choose a source, and fill in the source-specific fields (same set as the manifest form). When an override file is present, its values take priority over matching keys in the chart's default `values.yaml`.

You can add multiple override files. Harness merges them in the order listed; later files take priority over earlier ones.

---

## Add an artifact source

Artifact sources define the container image that Harness injects into your chart at deploy time. Reference the primary artifact image in your `values.yaml`:
- CEL: `${{artifacts.primary.image}}`
- JEXL: `<+artifacts.primary.image>`

If you hardcode the image directly in your chart templates, Harness ignores any artifact sources defined in the service.

Select **+ Add** under **Artifact source**, choose a type, then configure the connector and image details.

<Tabs>
<TabItem value="docker" label="Docker Registry" default>

| Field | Description |
| --- | --- |
| **Connector** | A Harness Docker Registry connector. |
| **Image Path** | The full image path, for example `library/nginx` or `myorg/myapp`. Wildcards are not supported. |
| **Tag** | The image tag. Supports a fixed value, runtime input, or a Harness expression. |
| **Digest** | Optional. Pin the image to a specific digest or SHA value. |

</TabItem>
<TabItem value="ecr" label="Amazon ECR">

| Field | Description |
| --- | --- |
| **Connector** | A Harness AWS connector with ECR read permissions. |
| **Region** | The AWS region where the ECR repository is located. |
| **Image Path** | The repository name, for example `my-app`. |
| **Tag** | The image tag. |

The AWS IAM user or role requires the `AmazonEC2ContainerRegistryReadOnly` policy.

</TabItem>
<TabItem value="nexus" label="Nexus 3 Registry">

| Field | Description |
| --- | --- |
| **Connector** | A Harness Nexus connector. |
| **Repository** | The name of the Nexus repository. |
| **Repository Format** | Select **Docker**. |
| **Artifact Path** | The path to the artifact within the repository. |
| **Tag** | The image tag. |

The Nexus user requires the `nx-repository-view-*_*_*` privilege and **Repository Browser** access.

</TabItem>
<TabItem value="artifactory" label="Artifactory Registry">

| Field | Description |
| --- | --- |
| **Connector** | A Harness Artifactory connector. |
| **Repository URL** | The URL from the `docker login` command in Artifactory's **Set Me Up** settings. |
| **Repository** | The repository name (the first segment of the full artifact path). |
| **Artifact Path** | The path to the artifact within the repository. |
| **Tag** | The image tag. |

</TabItem>
<TabItem value="acr" label="Azure Container Registry">

| Field | Description |
| --- | --- |
| **Connector** | A Harness Azure connector with the **Reader** role at the subscription or resource group level. |
| **Subscription Id** | The Azure subscription ID. |
| **Registry** | The ACR registry name. |
| **Repository** | The repository within the registry. |
| **Tag** | The image tag. |

:::info ACR image limits
Harness supports up to 500 images from an ACR repository. If you connect via the generic Docker connector, the limit is 100.
:::

</TabItem>
<TabItem value="gar" label="Google Artifact Registry">

| Field | Description |
| --- | --- |
| **Connector** | A Harness GCP connector. |
| **Repository Type** | The format of the artifact, for example **docker**. |
| **Project** | The GCP project ID. |
| **Region** | The region where the repository is located. |
| **Repository Name** | The name of the Artifact Registry repository. |
| **Package** | The artifact name. |
| **Version** | The version or tag. Supports **Value** or **Regex** matching. |

The GCP service account or delegate requires the **Artifact Registry Reader** role.

</TabItem>
<TabItem value="github" label="GitHub Package Registry">

| Field | Description |
| --- | --- |
| **Connector** | A Harness GitHub connector with API access enabled and a personal access token (PAT) with `read:packages` scope. |
| **Package Type** | Select **container**. |
| **Package Name** | The name of the GitHub package. |
| **Version** | The package version. |

:::info Supported package types
Only the `container` (Docker) package type is currently supported for GitHub Packages.
:::

</TabItem>
<TabItem value="custom" label="Custom Artifact">

For artifact repositories that Harness does not natively support, provide a script that queries your repository's API and outputs a JSON array. Harness reads the result from the `$HARNESS_ARTIFACT_RESULT_PATH` variable and maps a key to the build version.

</TabItem>
</Tabs>

---

## Add a sidecar

Sidecar definitions specify images for containers that run alongside your main application container. Select **+ Add** under **Sidecar** and configure an artifact source using the same registry types listed above.

The sidecar form requires an **ID** that uniquely identifies it within the service. Reference the sidecar image in your `values.yaml`:
- CEL: `${{artifacts.sidecars.<sidecar-id>.image}}`
- JEXL: `<+artifacts.sidecars.<sidecar-id>.image>`

---

## Advanced service options

Expand **Advanced** on the service to access options that apply across the entire service:

- **Config Files:** Attach configuration files such as properties files, certificates, or scripts. Supported sources: Harness Code, GitHub, Git, Bitbucket, and GitLab. Harness makes these available to the delegate at deploy time.
- **Variables:** Define service-level variables to use in values files and pipeline expressions. Variables support fixed values, runtime inputs, and expressions. Reference them as:
  - CEL: `${{serviceVariables.<name>}}`
  - JEXL: `<+serviceVariables.<name>>`
- **Service Hooks:** Run scripts at specific points in the service lifecycle. Configure a **Store Type** (Inline), **Hook Type** (Pre Hook or Post Hook), **Actions** (which lifecycle event triggers the hook), and the script **Content**.

---

## Use an existing service

When you configure a stage, select **Existing** in the **Choose service** panel. Only Native Helm services appear when the stage deployment type is Native Helm.

---

## Next steps

- Go to [Helm infrastructure](./helm-infrastructure.md) to configure environments and infrastructure definitions.
- Go to [Basic deployment](./helm-deployment-strategies/basic) to run a single-phase Helm upgrade.
- Go to [Canary deployment](./helm-deployment-strategies/canary) to set up a staged rollout with canary release.
- Go to [Blue-green deployment](./helm-deployment-strategies/blue-green) to perform a stage/production swap and rollback.
