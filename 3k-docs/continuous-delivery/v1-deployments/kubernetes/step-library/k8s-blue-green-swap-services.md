---
title: Kubernetes Blue Green Swap Services Selectors
description: Switch Kubernetes service selectors to route production traffic to the new pod set after a blue-green deploy.
sidebar_position: 3
---

The Kubernetes Blue Green Swap Services Selectors step updates service selectors to route production traffic to the new pod set and stage traffic to the old pod set. Run this step after validating the new version through the stage service.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect your cluster and namespace.
- **A Harness delegate in target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying the connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Configure the step

The **Stable Service** and **Stage Service** fields are auto-populated from the Blue Green Deploy step output when you use this step in a blue-green stage:

```text
${{stage.steps.k8sBlueGreenDeployStep.output.outputVariables.stableService}}
${{stage.steps.k8sBlueGreenDeployStep.output.outputVariables.stageService}}
```

You do not need to change these values.

The following parameters are available on the step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Kubernetes Blue Green Swap Services Selectors`. | Required |
| **Stable Service** | The name of the service currently receiving production traffic. Auto-populated from the Blue Green Deploy step output. | Required |
| **Stage Service** | The name of the service currently receiving stage traffic. Auto-populated from the Blue Green Deploy step output. | Required |
| **Kubeconfig Path** | Path to the kubeconfig file. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Target namespace where both services run. Default: `${{infra.namespace}}`. | Optional |
| **Release Name** | Name used to track Harness release history. Default: `${{infra.releaseName}}`. | Optional |
| **Working Directory** | Optional working directory for the swap operation. | Optional |
| **Log Level** | Verbosity of step logs. Default: `info`. | Optional |

---

## How the step works

The step updates the selector on each service to point to the new pod color:

- The primary service selector changes from the old color to the new color, routing production traffic to the new pod set.
- The stage service selector changes from the new color to the old color, routing stage traffic to the old pod set.

The color labels (`harness.io/color: blue` or `harness.io/color: green`) on the pod sets do not change; only the service selectors are updated. Both pod sets continue running after the swap.

---

## Rollback

In the rollback group, the step is pre-wired to the service names captured by the Blue Green Deploy step:

```text
${{rollback.data.PLUGIN_STABLE_SERVICE}}
${{rollback.data.PLUGIN_STAGE_SERVICE}}
```

If the failure occurred before the swap, the rollback swap is a no-op and the old version continues serving traffic. If the swap had already occurred, the rollback re-swaps selectors to restore the previous version as primary. The pod sets are not deleted; only the service selectors change.

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before being terminated.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go to [Kubernetes blue-green deployment](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-deployment-strategies/blue-green) to understand the full blue-green deployment flow.
- Go to [Kubernetes Blue Green Stage Scale Down](./k8s-blue-green-stage-scale-down) to clean up the old pod set after a successful swap.
