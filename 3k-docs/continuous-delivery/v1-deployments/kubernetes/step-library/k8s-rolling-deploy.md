---
title: Kubernetes Rolling Deploy
description: Prepare manifests, apply them to the cluster, and wait for all pods to reach steady state.
sidebar_position: 4
---

The Kubernetes Rolling Deploy step prepares your manifests, applies them to the cluster using `kubectl apply`, and waits for all pods to reach steady state. Kubernetes replaces pods incrementally using its native `RollingUpdate` strategy. Use this step in a rolling stage, or as the promotion step at the end of a canary stage.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up your service manifests and artifact source.
- **A Kubernetes infrastructure:** Go [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect your cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying the connector and namespace. Go [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Kubernetes Rolling Deploy step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Kubernetes Rolling Deploy`. | Required |
| **Skip Dry Run** | When enabled, skips the `kubectl apply --dry-run` pre-validation before the actual apply. Default: `false`. | Optional |
| **Kubernetes Pruning** | When enabled, Harness removes resources from the cluster that exist in the previous release but are no longer in the current manifests. Default: `false`. | Optional |
| **Manifest Path** | Override the manifest paths from the service configuration. Leave empty to use all manifests from the service. | Optional |
| **Kubeconfig Path** | Path to the kubeconfig file. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Target namespace for the deployment. Default: `${{infra.namespace}}`. | Optional |
| **Release Name** | Name used to track Harness release history in the cluster. Default: `${{infra.releaseName}}`. | Optional |
| **Log Level** | Verbosity of step logs. Default: `info`. | Optional |

---

## How the step works

When the step runs, it performs three internal actions:

1. **Kubernetes Rolling Prepare Action:** Reads your manifests, increments the release number, versions ConfigMaps and Secrets, labels all pods with `harness.io/track=stable`, and writes the prepared manifests to the workspace. Harness saves the release state as a Kubernetes Secret in the target namespace.

2. **Kubernetes Apply Action:** Applies the prepared manifests to your cluster using `kubectl apply`. Kubernetes performs the rolling update natively, incrementally replacing old pods with new pods according to the `maxSurge` and `maxUnavailable` settings in your Deployment manifest.

3. **Kubernetes Steady State Check Action:** Polls the cluster until all pods in the Deployment reach `Running` status and pass readiness checks, or until the step timeout is reached.

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before being terminated.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go [Kubernetes rolling deployment](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-deployment-strategies/rolling) to understand the full rolling deployment flow.
- Go [Kubernetes Rolling Rollback](./k8s-rolling-rollback) to configure the rollback step for this strategy.
