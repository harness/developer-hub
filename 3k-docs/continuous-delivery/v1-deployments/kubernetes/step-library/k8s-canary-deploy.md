---
title: Kubernetes Canary Deploy
description: Deploy a subset of pods with the new version alongside the stable version for validation before a full rollout.
sidebar_position: 2
---

The Kubernetes Canary Deploy step deploys a small number of pods running the new version alongside the existing stable pods. Use it as the first step in a canary stage. Insert verification or approval steps after it before promoting with a Rolling Deploy step.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and artifact source.
- **A Kubernetes infrastructure:** Go [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect your cluster and namespace.
- **A Harness delegate in target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying the connector and namespace. Go [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Kubernetes Canary Deploy step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Kubernetes Canary Deploy`. | Required |
| **Instances Unit Type** | Whether the **Instances** value represents a pod `count` or a `percentage` of the replicas defined in your manifest. | Required |
| **Instances** | The number of canary pods (count) or the percentage of total desired replicas (percentage). For example, if your manifest specifies `replicas: 4` and you set 50%, Harness deploys 2 canary pods. Harness rounds up when the result is fractional. | Required |
| **Skip Dry Run** | When enabled, skips the `kubectl apply --dry-run` pre-validation before the actual apply. Default: `false`. | Optional |
| **Use Traffic Shift** | When enabled, activates traffic routing configuration on this step to split live traffic between stable and canary. | Optional |
| **Kubeconfig Path** | Path to the kubeconfig file. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Target namespace. Default: `${{infra.namespace}}`. | Optional |
| **Release Name** | Name used to track Harness release history. Default: `${{infra.releaseName}}`. | Optional |
| **Log Level** | Verbosity of step logs. Default: `info`. | Optional |

:::warning One workload per canary stage
Canary deployments support exactly one Kubernetes Deployment workload per stage. If your service manifests define multiple Deployment objects, the stage fails. Use the [Kubernetes Apply step](./k8s-apply) to deploy additional objects separately.
:::

---

## How the step works

When the step runs, it performs three internal actions:

1. **Kubernetes Canary Prepare Action:** Reads your manifests, computes the canary replica count from the instances setting, appends `-canary` to the workload name, adds the `harness.io/track=canary` label to pod specs, and writes the modified manifests to the workspace. A canary service is cloned from the primary service with `-canary` appended to its name.

2. **Kubernetes Apply Action:** Applies the prepared canary manifests using `kubectl apply`. This creates the canary Deployment and canary Service alongside the existing stable workload.

3. **Kubernetes Steady State Check Action:** Polls the cluster until all canary pods reach `Running` status and pass readiness checks, or until the step timeout is reached.

---

## Traffic routing configuration

When **Use Traffic Shift** is enabled, a traffic routing section appears on the step. The following fields control how Harness splits live traffic between the stable and canary versions:

| Field | Description |
|-------|-------------|
| **Traffic Shift Command Timeout** | Maximum time Harness waits for the traffic shift operation to complete. Default: `5m`. |
| **Provider** | The traffic management provider: `istio` (creates an Istio VirtualService) or `k8s-native` (uses a Kubernetes HTTPRoute). |
| **Resource Name** | Name of the VirtualService or HTTPRoute resource. Default: `traffic-split-${{service.name}}`. |
| **Hosts** | Hostnames the routing rules apply to. Add one or more host entries matching the service DNS name. |
| **Gateways** | Istio gateway names to attach the VirtualService to. Required for external traffic when using Istio. Leave empty for mesh-internal traffic only. |
| **Configure Routes** | Weighted route definitions splitting traffic between stable and canary destinations. Weights across all routes must sum to 100. |

---

## Step outputs

The following output variables are available for use in downstream steps.

| Output variable | Description |
|-----------------|-------------|
| `canaryWorkloads` | The name of the canary workload created by this step. Used to auto-populate the Canary Delete step. |
| `isOpenshift` | Whether the deployment targets an OpenShift cluster. Passed to subsequent steps. |

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before being terminated.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go [Kubernetes canary deployment](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-deployment-strategies/canary) to understand the full canary deployment flow.
- Go [Kubernetes Canary Delete](./k8s-canary-delete) to configure the step that removes the canary workload after validation.
