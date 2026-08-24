---
title: Kubernetes Blue Green Stage Scale Down
description: Clean up the old pod set after a successful blue-green swap to free cluster resources.
sidebar_position: 16
---

The Kubernetes Blue Green Stage Scale Down step removes the old pod set after a successful blue-green swap. Add it after the Swap Services Selectors step when you want to free cluster resources once you are confident the new version is stable.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Kubernetes Blue Green Stage Scale Down step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Kubernetes Blue Green Stage Scale Down`. | Required |
| **Kubeconfig Path** | Path to the kubeconfig file. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Target namespace. Default: `${{infra.namespace}}`. | Optional |
| **Release Name** | Name used to look up the release history for the old pod set. Default: `${{infra.releaseName}}`. | Optional |
| **Log Level** | Verbosity of step logs. Default: `info`. | Optional |

:::warning Release name must be unique per namespace
When deploying multiple services to the same namespace using blue-green, each service must have a unique release name. If multiple services share the same release name, the Scale Down step may incorrectly identify which deployment to scale down.
:::

---

## How the step works

The step removes the following resources for the old (inactive) pod set:

- HorizontalPodAutoscaler and PodDisruptionBudget resources
- Deployments, DeploymentConfigs, and StatefulSets
- DaemonSets (scaled to zero replicas)

:::info Resources are deleted, not scaled to zero
The Scale Down step deletes workload resources rather than setting replicas to zero. This prevents HPA from overriding a zero-replica state on subsequent deployments. HPA and PDB resources deleted during Scale Down are not recreated during rollback; they require redeployment to restore.
:::

---

## Advanced settings

- **Timeout duration:** Maximum time the step can run before Harness terminates it.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go to [Kubernetes blue-green deployment](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-deployment-strategies/blue-green) to understand when to use this step in the blue-green flow.
- Go to [Kubernetes Blue Green Swap Services Selectors](./k8s-blue-green-swap-services) to configure the step that routes production traffic before scale-down.
