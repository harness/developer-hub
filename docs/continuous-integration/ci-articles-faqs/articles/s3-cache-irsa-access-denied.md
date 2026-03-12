---
title: S3 cache AccessDenied with IRSA on EKS
description: Save/Restore Cache to S3 steps fail with AccessDenied when using an AWS connector configured with IRSA on Kubernetes (EKS) build infrastructure.
sidebar_position: 86
---

# S3 cache AccessDenied with IRSA on EKS

## Conditions

- **Module:** Harness CI
- **Infrastructure:** Kubernetes (EKS)
- **OS:** Linux
- **AWS connector authentication:** IRSA (IAM Roles for Service Accounts)
- **Steps affected:** Save Cache to S3, Restore Cache from S3, Cache Intelligence (with S3 storage), Build Intelligence (with S3 storage)

## Problem

When using an AWS connector configured with IRSA for S3 caching on EKS-based Kubernetes build infrastructure, the **Save Cache to S3** and **Restore Cache from S3** steps fail with `AccessDenied` errors such as:

```
AccessDenied: Access Denied
  status code: 403
```

You may also see the following log message, which can be misleading:

```
No AWS credentials provided or role assumed; using default machine credentials for AWS requests
```

This happens because cache operations (Save/Restore Cache to S3, Cache Intelligence, Build Intelligence) run inside containers in the **build pod**, not on the delegate. With IRSA, credentials are not stored as static secrets -- instead, an IAM role is assumed dynamically by the pod's Kubernetes ServiceAccount at runtime. If the build pod is not configured with the correct IRSA-annotated ServiceAccount, the cache containers fall back to the node's IAM role (for example, a Karpenter node instance profile), which typically lacks S3 permissions.

## Solution

To fix this, configure the build pod to use the IRSA-annotated Kubernetes ServiceAccount so that all containers in the build pod (including cache step containers) can assume the correct IAM role.

1. **Set the Service Account Name** in your stage's Kubernetes build infrastructure settings. Go to the **Build** tab of your CI stage, expand **Infrastructure**, and set **Service Account Name** to the Kubernetes ServiceAccount that has the IRSA IAM role annotation (for example, `harness-worker`).

2. **Enable Automount Service Account Token.** Make sure **Automount Service Account Token** is checked (set to `true`). This is required for EKS to project the OIDC token into the pod, which the AWS SDK uses to assume the IAM role.

In YAML, this looks like:

```yaml
infrastructure:
  type: KubernetesDirect
  spec:
    connectorRef: your-k8s-connector
    namespace: your-namespace
    serviceAccountName: harness-worker
    automountServiceAccountToken: true
    nodeSelector: {}
    os: Linux
```

## Verification

After applying the configuration:

1. **Check the ServiceAccount annotation.** Verify that the Kubernetes ServiceAccount has the correct IAM role annotation:

   ```bash
   kubectl get sa harness-worker -n <namespace> -o yaml
   ```

   Look for:

   ```yaml
   annotations:
     eks.amazonaws.com/role-arn: arn:aws:iam::<account-id>:role/<role-name>
   ```

2. **Verify the build pod spec.** During a pipeline execution, inspect the build pod to confirm the ServiceAccount and token are mounted:

   ```bash
   kubectl get pod <build-pod-name> -n <namespace> -o yaml
   ```

   Look for `serviceAccountName: harness-worker` and `automountServiceAccountToken: true` in the pod spec.

3. **Check IAM role permissions.** Ensure the IAM role associated with the ServiceAccount has the necessary S3 permissions (`s3:PutObject`, `s3:GetObject`, `s3:ListBucket`, `s3:DeleteObject`) on the target bucket.

## Related docs

- [Service Account Name in Kubernetes build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure#service-account-name)
- [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache)
- [AWS connector settings - IRSA](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference)
- [AWS documentation - IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)
