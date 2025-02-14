---
title: Issues Pulling Images
description: Fixing 401 Unauthorized errors when pulling images from Harness Artifact Registry.
sidebar_position: 10
---

This document provides steps to resolve "401 Unauthorized" errors when pulling images from Harness Artifact Registry.

## Understanding 401 Errors When Pulling Images
401 Unauthorized errors occur when Harness Artifact Registry fails to authenticate image pull requests from the Kubernetes cluster.

:::tip Cluster Secrets
Ensure your cluster has the correct `imagePullSecrets` and Kubernetes secrets configured.
:::

## Prerequisites
- Generate a Harness Personal Access Token (PAT) to access the registry.
- Base64 encode your credentials using:
```bash
echo -n "<your_email>:<your_PAT>" | base64
```

Save the output for use in your Kubernetes secrets.

### Example Solution

To authenticate your Kubernetes cluster, follow these steps:
1. **Create a Docker Registry Secret:**
  - If the Harness authentication isn’t in your `~/.docker/config.json`, create a temporary `temp_dockercfg` file with the following Docker authentication settings:

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
- Encode the `temp_dockercfg`:
```bash
cat temp_dockercfg | base64 -w 0 > dockercfg
```
- Create a `secret.yaml` file:
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
- Apply the secret for declarative management:
```bash
kubectl apply -f secret.yaml -n <namespace>
```

2. **Update your Kubernetes deployment manifest to reference the secret:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: your-pod-name
  namespace: default
spec:
  containers:
    - name: your-container-name
      image: pkg.harness.io/your-image:tag
  imagePullSecrets:
    - name: <some_identifier>-dockercfg
  ```

3.	**Verify the Setup:**
Deploy the updated manifest and monitor the pod status to ensure the image is pulled successfully without authentication errors.

---
## Kubernetes-specific guides
Go to the [Private Registry for Kubernetes guide](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/pull-an-image-from-a-private-registry-for-kubernetes/) or [Add Container Images as Artifacts](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments/) for more details on how to pull an image from a private registry, or to add container images as artifacts for Kubernetes deployments.