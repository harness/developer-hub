---
title: Kubernetes services
description: Configure Kubernetes services in Harness, manifests, artifact sources, override files, and sidecars.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Harness service for Kubernetes represents the application you want to deploy. It holds the manifests, artifact sources, override files, and sidecar definitions that Harness uses to deploy to your cluster.

Services are independent of pipelines; configure one once and reuse them across stages and pipelines.

---

## Before you begin

- **Kubernetes cluster access:** A running cluster that your Harness delegate can reach. Go to [Install a Kubernetes delegate](/docs/platform/delegates/install-delegates/overview) to set up a delegate in your cluster.
- **Source connector:** A connector to the repository or registry where your manifest files and container images are stored. Go to [Connect to a code repo](/docs/platform/connectors/code-repositories/connect-to-code-repo) to set up a Git connector.
- **Harness project:** A project with CD enabled. Go to [Create organizations and projects](/docs/platform/organizations-and-projects/create-an-organization) to create one.

---

## Create a Kubernetes service

1. Go to **Deployments**, expand the drop-down, and select **Services** under **Resources**.
2. Click **Create Service**.
3. In the **Create service** panel, select **Kubernetes** from the **Deployment Target** drop-down.
4. Harness auto-generates a name and ID. You can change both.
5. Under **Storage**, select **Inline** (Harness stores the service configuration) or a Git repository.
6. Configure manifests, additional override files, artifact sources, and sidecars as described in the sections below.
7. Expand **Advanced** to add config files, variables, and service hooks.
8. Click **Create**.

---

## Add a manifest

Click **+ Add** under **Manifest** and select a manifest type.

### K8s manifest

Use this type for standard Kubernetes YAML manifests, optionally rendered with Go templating and a values file.

| Field | Description |
|-------|-------------|
| **Source** | The location of your manifest files. Options include Harness Code, GitHub, GitLab, Bitbucket, Azure Repo, and Custom Remote. |
| **ID** | A unique identifier for this manifest within the service. |
| **Repository** | The repository that contains your manifest files. |
| **Fetch** | Select **Branch** to track a branch head, or **Commit** to pin to a specific SHA or Git tag. |
| **Branch / Commit** | The branch name or commit SHA to fetch. |
| **File/Folder Path** | One or more paths to manifest files or directories. If a path points to a directory, Harness fetches all `.yaml` files inside it. |

Expand **Advanced** to add values files: one or more paths in the same repository that Harness merges into the manifest at render time. When multiple files are present, later files take priority over earlier ones.

Harness supports [Go templating](https://pkg.go.dev/text/template) in K8s manifests. Use `{{.Values.key}}` syntax to reference values from your values files, and inject Harness expressions in values files only, not directly in manifests. For example, to reference the primary image:
- CEL: `${{artifacts.primary.image}}`
- JEXL: `<+artifacts.primary.image>`

If your values file lives in a separate repository, add it as a standalone manifest of type **Values YAML** rather than attaching it under **Advanced**. A separate **Values YAML** manifest takes priority over any paths listed under **Advanced** and overwrites conflicting keys.

<details>
<summary>Example: rolling and canary deployment</summary>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hello-app
  template:
    metadata:
      labels:
        app: hello-app
    spec:
      containers:
        - name: hello-app
          image: docker.io/hashicorp/http-echo:0.2.3
          args:
            - "-text=Hello from Harness CD"
          ports:
            - containerPort: 5678
---
apiVersion: v1
kind: Service
metadata:
  name: hello-app
spec:
  type: ClusterIP
  selector:
    app: hello-app
  ports:
    - port: 80
      targetPort: 5678
```

</details>

<details>
<summary>Example: blue-green deployment</summary>

Blue-green deployments require two Services: one annotated as the primary and one as the stage. Harness uses these annotations to route traffic during the swap.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-app
spec:
  replicas: 2
  revisionHistoryLimit: 3
  selector:
    matchLabels:
      app: hello-app
  template:
    metadata:
      labels:
        app: hello-app
    spec:
      containers:
        - name: hello-app
          image: docker.io/hashicorp/http-echo:0.2.3
          args:
            - "-text=Hello from Harness CD"
          ports:
            - containerPort: 5678
---
apiVersion: v1
kind: Service
metadata:
  name: hello-app
  annotations:
    harness.io/primary-service: "true"
spec:
  type: ClusterIP
  selector:
    app: hello-app
  ports:
    - port: 80
      targetPort: 5678
---
apiVersion: v1
kind: Service
metadata:
  name: hello-app-stage
  annotations:
    harness.io/stage-service: "true"
spec:
  type: ClusterIP
  selector:
    app: hello-app
  ports:
    - port: 80
      targetPort: 5678
```

</details>

### Helm chart

Use this type for a Helm chart stored in an HTTP Helm repository, OCI registry, Git repo, S3 bucket, or GCS bucket.

| Field | Description |
|-------|-------------|
| **Source** | The store type for your chart. |
| **ID** | A unique identifier for this chart within the service. |
| **Chart Path** | The path to the chart folder from the root of the repository. For HTTP Helm and OCI sources, this is the chart name. |
| **Helm Version** | Select **V3**. |

Expand **Advanced** to add values override files. Harness merges these at render time. Later files take priority over earlier ones.

### Kustomize

Use this type for a Kustomize base with optional overlays stored in a Git repo or Harness File Store.

| Field | Description |
|-------|-------------|
| **Source** | A Git provider, Harness File Store, or Azure Repo. |
| **ID** | A unique identifier for this kustomization within the service. |
| **Kustomize Folder Path** | The path to the folder containing `kustomization.yaml` from the root of the repository. |

Expand **Advanced** to add Kustomize patch files. Harness applies patches in the order listed. The last file wins on conflicting keys. You cannot use Harness expressions in the base manifest or `kustomization.yaml`. Add them to patch files only.

Harness does not use Kustomize for rollback. It renders templates with Kustomize, passes them to `kubectl`, and rollback works the same as native Kubernetes.

### OpenShift template

Use this type for an OpenShift template stored in a Git repo, Harness File Store, custom repo, or Azure Repo.

| Field | Description |
|-------|-------------|
| **Source** | A Git provider, Harness File Store, custom repo, or Azure Repo. |
| **ID** | A unique identifier for this template within the service. |
| **Template File Path** | The path to the template file from the root of the repository. |

Expand **Advanced** to add OpenShift parameter files. You can also add parameters as a separate manifest of type **OpenShift Param**.

:::info API version
Use `apiVersion: apps.openshift.io/v1`, not `apiVersion: v1`, in your OpenShift templates.
:::

---

## Add an additional override file

Override files let you layer values on top of your base manifest at deploy time without modifying the manifest itself. This is useful for environment-specific configuration.

Click **+ Add** under **Additional override file**. The fields match the manifest configuration: **Type**, **Source**, **ID**, **Repository**, **Fetch**, **Branch**, and **File/Folder Path**. When an override file is present, it takes priority over matching keys in the manifest's values files.

---

## Add an artifact source

Artifact sources define the container image that Harness injects at deploy time. Reference the primary artifact image in your values file:
- CEL: `${{artifacts.primary.image}}`
- JEXL: `<+artifacts.primary.image>`

If you hardcode the image directly in your manifest, Harness ignores any artifact sources defined in the service.

Click **+ Add** under **Artifact source**, select a type, and configure the connector and image details.

<Tabs>
<TabItem value="docker" label="Docker Registry" default>

| Field | Description |
|-------|-------------|
| **Connector** | A Harness Docker Registry connector. |
| **Image Path** | The full image path, for example `library/nginx` or `myorg/myapp`. Wildcards are not supported. |
| **Tag** | The image tag. Supports a fixed value, runtime input (`<+input>`), or a Harness expression. |
| **Digest** | Optional. Pin the image to a specific digest or SHA value. |

</TabItem>
<TabItem value="ecr" label="Amazon ECR">

| Field | Description |
|-------|-------------|
| **Connector** | A Harness AWS connector with ECR read permissions. |
| **Region** | The AWS region where the ECR repository is located. |
| **Image Path** | The repository name, for example `my-app`. |
| **Tag** | The image tag. |

The AWS IAM user or role requires the `AmazonEC2ContainerRegistryReadOnly` policy.

</TabItem>
<TabItem value="nexus" label="Nexus 3 Registry">

| Field | Description |
|-------|-------------|
| **Connector** | A Harness Nexus connector. |
| **Repository** | The name of the Nexus repository. |
| **Repository Format** | Select **Docker**. |
| **Artifact Path** | The path to the artifact within the repository. |
| **Tag** | The image tag. |

The Nexus user requires the `nx-repository-view-*_*_*` privilege and **Repository Browser** access.

</TabItem>
<TabItem value="artifactory" label="Artifactory">

| Field | Description |
|-------|-------------|
| **Connector** | A Harness Artifactory connector. |
| **Repository URL** | The URL from the `docker login` command in Artifactory's **Set Me Up** settings. |
| **Repository** | The repository name (the first segment of the full artifact path). |
| **Artifact Path** | The path to the artifact within the repository. |
| **Tag** | The image tag. |

</TabItem>
<TabItem value="acr" label="Azure Container Registry">

| Field | Description |
|-------|-------------|
| **Connector** | A Harness Azure connector with the **Reader** role at the Subscription or Resource Group level. |
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
|-------|-------------|
| **Connector** | A Harness GCP connector. |
| **Repository Type** | The format of the artifact, for example **docker**. |
| **Project** | The GCP project ID. |
| **Region** | The region where the repository is located. |
| **Repository Name** | The name of the Artifact Registry repository. |
| **Package** | The artifact name. |
| **Version** | The version or tag. Supports **Value** or **Regex** matching. |

The GCP service account or delegate requires the **Artifact Registry Reader** and **Artifact Registry Writer** roles.

</TabItem>
<TabItem value="github" label="GitHub Package Registry">

| Field | Description |
|-------|-------------|
| **Connector** | A Harness GitHub connector with API access enabled and a personal access token (PAT) with `read:packages` and `write:packages` scopes. |
| **Package Type** | Select **container**. |
| **Package Name** | The name of the GitHub package. |
| **Version** | The package version. |

:::info Supported package types
Only the `container` (Docker) package type is currently supported for GitHub Packages.
:::

</TabItem>
<TabItem value="custom" label="Custom">

For artifact repositories that Harness does not natively support, provide a script that queries your repository's API and outputs a JSON array. Harness reads the result from the `$HARNESS_ARTIFACT_RESULT_PATH` variable and maps a key to the build version.

Go to [Add a custom artifact source for CD](/docs/continuous-delivery/x-platform-cd-features/services/add-a-custom-artifact-source-for-cd) to configure a custom source.

</TabItem>
<TabItem value="har" label="Harness Artifact Registry">

Harness Artifact Registry (HAR) is a built-in registry that does not require a separate connector.

| Field | Description |
|-------|-------------|
| **Registry Ref** | The name of the HAR registry, for example `dev`. |
| **Type** | The artifact type stored in HAR, for example `docker`. |
| **Image Path** | The path to the image within the registry. |
| **Tag** | The image tag. |
| **Digest** | Optional. Pin to a specific digest or SHA. |

:::info HAR licensing
HAR requires a valid HAR license. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

</TabItem>
</Tabs>

---

## Add a sidecar

Sidecar definitions specify images for containers that run alongside your main application container. Click **+ Add** under **Sidecar** and configure an artifact source using the same registry types listed above.

Reference the sidecar image in your values file:
- CEL: `${{artifacts.sidecars.<sidecar-id>.image}}`
- JEXL: `<+artifacts.sidecars.<sidecar-id>.image>`

---

## Advanced service options

Expand **Advanced** on the service to access options that apply across the entire service:

- **Config Files:** Attach configuration files such as properties files, certificates, or scripts. Harness makes these available to the delegate at deploy time.
- **Variables:** Define service-level variables to use in values files and pipeline expressions. Variables support fixed values, runtime inputs, and expressions. Reference them as:
  - CEL: `${{serviceVariables.<name>}}`
  - JEXL: `<+serviceVariables.<name>>`
- **Service Hooks:** Run scripts at specific points in the service lifecycle: before or after Harness fetches manifests or applies resources.

---

## Use an existing service

When you configure a stage, select **Existing** in the **Choose service** panel. Use the **Project**, **Organization**, and **Account** tabs to select from the appropriate scope. Only Kubernetes services appear when your stage deployment type is Kubernetes.

---

## Next steps

- Go to [Kubernetes infrastructure](./kubernetes-infrastructure.md) to configure environments and infrastructure definitions.
- Go to [Kubernetes deployment strategies](./kubernetes-deployment-strategies/rolling) to configure rolling, canary, or blue-green deployments.
