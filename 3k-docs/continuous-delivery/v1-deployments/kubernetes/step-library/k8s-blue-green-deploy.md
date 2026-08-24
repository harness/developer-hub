---
title: Kubernetes Blue Green Deploy
description: Deploy the new version to the stage pod set and wait for it to reach steady state before a traffic swap.
sidebar_position: 11
---

The Kubernetes Blue Green Deploy step creates or updates the stage pod set with the new version of your application alongside the existing pod set that serves production traffic. The primary service continues routing all production traffic to the existing pod set until the swap step runs.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect your cluster and namespace.
- **A Harness delegate in target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Kubernetes Blue Green Deploy step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Kubernetes Blue Green Deploy`. | Required |
| **Skip Dry Run** | When enabled, Harness skips the `kubectl apply --dry-run` pre-validation before applying. Default: `false`. | Optional |
| **Kubernetes Pruning** | When enabled, Harness removes resources from the cluster that exist in the previous release but are no longer in the current manifests. Default: `false`. | Optional |
| **Skip Unchanged Manifest** | When enabled, Harness compares rendered manifests with the previous deployment and skips the step if no changes are detected. Default: `false`. | Optional |
| **Use Traffic Shift** | When enabled, Harness activates traffic routing configuration on this step to split live traffic between primary and stage services. | Optional |
| **Manifest Path** | Override the manifest paths from the service configuration. Leave empty to use all manifests from the service. | Optional |
| **Kubeconfig Path** | Path to the kubeconfig file. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Target namespace. Default: `${{infra.namespace}}`. | Optional |
| **Release Name** | Name used to track Harness release history. Default: `${{infra.releaseName}}`. | Optional |
| **Log Level** | Verbosity of step logs. Default: `info`. | Optional |

:::warning One workload per blue-green stage
Blue-green deployments support exactly one Kubernetes Deployment workload per stage. If your service manifests define multiple Deployment objects, the stage fails.
:::

---

## How the step works

When the step runs, it performs three internal actions:

1. **Kubernetes Blue Green Prepare Action:** Reads your manifests, determines the stage color (the inverse of the current primary color), creates or updates the stage service, labels the new pod set with `harness.io/color: <stage-color>`, and writes the prepared manifests to the workspace. Harness does not modify the primary service at this point.

2. **Kubernetes Apply Action:** Applies the prepared manifests using `kubectl apply`. This creates the new pod set alongside the existing pod set, with both running simultaneously. The primary service continues routing all production traffic to the existing pod set.

3. **Kubernetes Steady State Check Action:** Polls the cluster until all pods in the new deployment reach `Running` status and pass readiness checks, or until the step timeout is reached.

---

## Traffic routing configuration

When you enable **Use Traffic Shift**, a traffic routing section appears on the step. The following fields control how Harness splits live traffic between primary and stage services:

| Field | Description |
|-------|-------------|
| **Traffic Shift Command Timeout** | Maximum time Harness waits for the traffic shift operation to complete. Default: `5m`. |
| **Provider** | The traffic management provider: `istio` (creates an Istio VirtualService) or `k8s-native` (uses a Kubernetes HTTPRoute). |
| **Resource Name** | Name of the VirtualService or HTTPRoute resource. |
| **Hosts** | Hostnames the routing rules apply to. |
| **Gateways** | Istio gateway names to attach the VirtualService to. Required for external traffic when using Istio. |
| **Configure Routes** | Weighted route definitions splitting traffic between primary and stage destinations. Weights across all routes must sum to 100. |

---

## Step outputs

The following output variables are available for use in downstream steps.

| Output variable | Description |
|-----------------|-------------|
| `stableService` | The name of the service currently serving production traffic. Auto-populates the Swap Services step. |
| `stageService` | The name of the service currently serving stage traffic. Auto-populates the Swap Services step. |
| `isOpenshift` | Whether the deployment targets an OpenShift cluster. |

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before Harness terminates it.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go to [Kubernetes blue-green deployment](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-deployment-strategies/blue-green) to understand the full blue-green deployment flow.
- Go to [Kubernetes Blue Green Swap Services Selectors](./k8s-blue-green-swap-services) to configure the step that routes production traffic to the new pod set.
