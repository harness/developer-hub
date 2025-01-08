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

### Example Solution

To authenticate your Kubernetes cluster, follow these steps:

1. **Create a Docker Registry Secret:**

   ```bash
   kubectl create secret docker-registry docker-registry-secret1 \
   --docker-server=pkg.harness.io \
   --docker-username=<email> \
   --docker-password=<personal-access-token> \
   --docker-email=<email> \
   --namespace=default
   ```

2.	**Update your Kubernetes deployment manifest to reference the secret:**
  ```bash
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
      - name: docker-registry-secret1
  ```

3.	**Verify the Setup:**

Deploy the updated manifest and monitor the pod status to ensure the image is pulled successfully without authentication errors.

---

## Kubernetes-specific guides
Go to the [Private Registry for Kubernetes guide](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/pull-an-image-from-a-private-registry-for-kubernetes/) or [Add Container Images as Artifacts](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments/) for more details on how to pull an image from a private registry, or to add container images as artifacts for Kubernetes deployments.