## Overview

This guide walks you through deploying to Kubernetes using a Service with Harness Artifact Registry (HAR) as the artifact source.

1) Create a Service and define Manifests and Artifact
2) Create a Pipeline that uses the Service, Environment, and Infrastructure
3) Configure the Execution strategy (for example, Rolling) and Run the pipeline

### Step 1 — Create a Service
- Start with the Service creation wizard: see [Create Services](/docs/continuous-delivery/x-platform-cd-features/services/create-services).
- Choose whether the Service is Inline or Remote (Git-managed). For background, see [Services Overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview).
- Set the Service Definition and select deployment type: *Kubernetes*.

---

### Step 2 — Define Manifests and Artifact
Add the manifests that describe your app (files must use the `.yaml` extension). If your image is not hardcoded in the manifests, configure an Artifact.

- Manifest types: K8s Manifest, Helm Chart, OpenShift Template, Kustomize.
- Stores: Code, Git providers (GitHub/GitLab/Bitbucket/Azure Repos), Harness, Custom.

Artifacts (from HAR):
- In the Service's Artifacts section, select Harness Artifact Registry and provide registry, image path, tag (or tag regex), and optional digest. See [Artifact Sources](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources).
- To create a registry and upload an artifact, see [Artifact Registry Quickstart (Generic)](/docs/artifact-registry/get-started/quickstart#docker).

Reference the selected artifact in your manifest:

```yaml
image: <+artifact.image>
```

At runtime this resolves to the full image (for example, `docker.io/bitnami/nginx:1.22.0-debian-11-r0`). If you only need the image path/name, use `<+artifact.imagePath>`.


:::note INFORMATION

#### Configure Image Pull Secrets

To allow Kubernetes to pull images from your private Harness Artifact Registry, you need to configure image pull secrets:

**Step 1: Create a Harness Secret**

Create a [Harness secret](/docs/platform/secrets/add-use-text-secrets) at the required scope (account, org, or project) to store your PAT (Personal Access Token) or SAT (Service Account Token) with access to the Artifact Registry.

**Step 2: Define the Image Pull Secret in values.yaml**

Add the Docker configuration to your `values.yaml` file, referencing the Harness secret:

```yaml
dockercfg: '{"pkg.harness.io":{"username":"john.doe@harness.io","password":"<+secrets.getValue("secret-ref")>"}}'
```

Replace:
- `john.doe@harness.io` with your Harness account email
- `secret-ref` with the identifier of your Harness secret containing the PAT/SAT token

**Step 3: Reference the Secret in Your Kubernetes Manifest**

Create a Secret resource in your Kubernetes manifest that uses the Docker configuration:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: service-name-dockercfg
  annotations:
    harness.io/skip-versioning: "true"
data:
  .dockercfg: {{ .Values.dockercfg | b64enc }}
type: kubernetes.io/dockercfg
```

Then reference this secret in your Deployment or Pod specification:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      imagePullSecrets:
        - name: service-name-dockercfg
      containers:
        - name: app
          image: <+artifact.image>
```

This configuration ensures Kubernetes can authenticate with Harness Artifact Registry and pull your private images during deployment.

:::


<DocImage path={require('../static/docker-service-kuber.png')} width="80%" title="Kubernetes deploy pipeline example" alt="Kubernetes deploy pipeline example" />
---

### Step 3 — Create the Pipeline
1. Create a new pipeline with a Deploy stage of type Kubernetes.
2. Select the Service you created in Step 1.
3. Choose the target Environment and Infrastructure where you want to deploy.

<DocImage path={require('../static/docker-pipe.png')} width="80%" title="Kubernetes deploy pipeline example" alt="Kubernetes deploy pipeline example" />

### Step 4 — Configure Execution and Run
1. In Execution, select a strategy such as Rolling Kubernetes and provide required inputs.
2. Save and Run the pipeline. Monitor logs to validate the selected artifact and rollout.
