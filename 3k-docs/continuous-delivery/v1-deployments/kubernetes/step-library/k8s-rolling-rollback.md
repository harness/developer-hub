---
title: Kubernetes Rolling Rollback
description: Re-apply the previous release manifests to roll back a failed rolling or canary deployment.
sidebar_position: 7
---

The Kubernetes Rolling Rollback step re-applies the manifests from the last successful release stored in the cluster release history secret. Harness runs this step automatically when a rolling or canary stage fails. You can also add it manually to a rollback group.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and artifact source.
- **A Kubernetes infrastructure:** Go [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect your cluster and namespace.
- **A Harness delegate in your target cluster:** The delegate runs deployment steps in your cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying connector and namespace. Go [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand required fields.

---

## Configure the step

The following parameters are available on the Kubernetes Rolling Rollback step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step. Default: `Kubernetes Rolling Rollback`. | Required |
| **Enable Kubernetes Pruning** | When enabled, removes resources from the cluster that are not in the rollback release manifests before re-applying. Default: `false`. | Optional |
| **Kubeconfig Path** | Path to the kubeconfig file. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Target namespace. Default: `${{infra.namespace}}`. | Optional |
| **Release Name** | Release name used to look up the rollback target in the cluster secret. Default: `${{infra.releaseName}}`. | Optional |

---

## How the step works

The step retrieves the previous release manifests from the Harness release history secret stored in the target namespace and re-applies them using `kubectl apply`.

With **Enable Kubernetes Pruning** set to `true`, resources that exist in the current release but not in the rollback release are deleted before the rollback manifests are applied. With it set to `false`, only the apply runs and any extra resources remain in the cluster.

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before being terminated.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go [Kubernetes rolling deployment](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-deployment-strategies/rolling) to understand when rollback runs automatically.
- Go [Kubernetes Rolling Deploy](./k8s-rolling-deploy) to review the deploy step reference.
