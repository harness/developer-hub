---
title: Issues Pulling Images
description: Fixing 401 Unauthorized errors when pulling images from Harness Artifact Registry.
sidebar_position: 10
---

This document provides steps to resolve "401 Unauthorized" errors when pulling images from Harness Artifact Registry.
401 Unauthorized errors occur when Harness Artifact Registry fails to authenticate image pull requests from the Kubernetes cluster.

:::tip Cluster Secrets
Ensure your cluster has the correct `imagePullSecrets` and Kubernetes secrets configured.
:::

## Prerequisites
**Generate a Harness Personal Access Token (PAT)** to access the registry, **base64 encode your credentials** with the below command, **then save the output** for use in your Kubernetes secrets.
```bash
echo -n "<your_email>:<your_PAT>" | base64
```
---
Ensure that your Kubernetes cluster is securely configured to authenticate and pull images from the Harness Artifact Registry by setting up and applying the necessary Docker authentication secrets with the following steps:

### Create a temporary dockercfg file
Create a temporary `temp_dockercfg` file to store Docker authentication settings if they are not already in `~/.docker/config.json`.
  ```json
  {
    "pkg.harness.io": {
      "username": "<registry_username>",
      "password": "<registry_PAT_or_SAT>",
      "email": "<registry_email>",
      "auth": "<encoded_PAT_you_copied_from_previous_step>"
    }
  }
  ```

#### Encode the temporary dockercfg file
Encode the `temp_dockercfg` file. Encoding is necessary for Kubernetes to read the authentication settings.
```bash
cat temp_dockercfg | base64 -w 0 > dockercfg
```
- **Note:** Save the output for the next step.

### Create a secret file
Create a `secrets.yaml` file to store the encoded Docker configuration as a Kubernetes secret.
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: <some_identifier>-dockercfg
  namespace: <your_namespace>
type: kubernetes.io/dockercfg
data:
  .dockercfg: <encoded_dockercfg_from_previous_step>
```

### Apply the Secret in Kubernetes
Make the secret available for image pulls in the specified namespace.
```bash
kubectl apply -f secret.yaml -n <namespace>
```

### Update your Deployment Manifest
Reference the secret in your deployment for image pulls.
```yaml
{{- if .Values.dockercfg }}
---
apiVersion: v1
kind: Secret
metadata:
  name: "<some_identifier_you_used_previously>-dockercfg"
  namespace: {{.Values.namespace}}
  annotations:
    harness.io/skip-versioning: "true"
data:
  .dockercfg: {{ .Values.dockercfg }}
type: kubernetes.io/dockercfg
{{- end }}
```

### Modify the Deployment Spec
Ensure Kubernetes uses the secret when pulling images.
```yaml
imagePullSecrets:
  - name: <some_identifier_you_used_previously>-dockercfg
```

### Update your values file
Update your `values.yaml` file to configure the deployment values for image pull secrets.
```yaml
dockercfg: <+artifact.imagePullSecret>
```

Deploy the updated manifest and monitor the pod status to ensure the image is pulled successfully without authentication errors.

## Kubernetes-specific guides
Go to the [Private Registry for Kubernetes guide](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/pull-an-image-from-a-private-registry-for-kubernetes/) or [Add Container Images as Artifacts](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments/) for more details on how to pull an image from a private registry, or to add container images as artifacts for Kubernetes deployments.