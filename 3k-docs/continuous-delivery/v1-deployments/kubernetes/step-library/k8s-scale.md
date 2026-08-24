---
title: Kubernetes Scale
description: Scale a Kubernetes workload to a specific number of instances or a percentage of current instances.
sidebar_position: 10
---

The Kubernetes Scale step changes the number of running pods for a workload to a target count or percentage. Use it to scale up before a load event, scale down to save resources, or adjust a canary workload during a canary stage.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and an artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect your cluster and namespace.
- **A Harness delegate in your target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying a connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Add the Kubernetes Scale step

To add the step:

1. In your pipeline, go to the Kubernetes stage.
2. Select **+ Add Step** in the execution section.
3. Search for **Kubernetes Scale** and select it.
4. Configure the step parameters described below.
5. Select **Apply Changes**.

---

## Configure the step

The following parameters are available on the Kubernetes Scale step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for the step in the pipeline. | Required |
| **Workload** | The workload to scale, in `[namespace/]Kind/Name` format. For example, `default/Deployment/my-app`. | Required |
| **Instance Selection** | Whether to scale by instance count or percentage. Select **Count** or **Percentage**. | Required |
| **Instances** | The target number of pods (when Count is selected) or the percentage of current replicas to scale to (when Percentage is selected). | Required |
| **Kubeconfig Path** | Path to the kubeconfig file, derived from the infrastructure configuration. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Default namespace to use when the workload field does not include one. | Optional |
| **Release Name** | Release name for pod label lookup. Default: `${{infra.releaseName}}`. | Optional |
| **Timeout** | Maximum time the step can run before it is marked as failed. Default: `5m`. | Optional |

---

## Set the workload

Enter the workload in `[namespace/]Kind/Name` format:

- `default/Deployment/my-app`: scales the Deployment named `my-app` in the `default` namespace
- `Deployment/my-app`: uses the namespace configured in the **Namespace** field or derived from the infrastructure

Supported workload types are Deployment and DaemonSet. Only one workload can be specified per step.

You can use a Harness expression in the Workload field to reference a workload from a preceding step. This is useful in canary deployments where you target the canary workload by name:

```text
<+stages.[Stage_Id].spec.execution.steps.[Step_Id].output.outputVariables.canaryWorkload>
```

---

## Configure instance count or percentage

**Count** scales the workload to the exact number of pods you enter.

**Percentage** scales to a percentage of the workload's current replica count. For example, if the workload has 10 replicas and you enter `50`, the step scales it to 5 replicas.

:::info Percentage must be a whole number
Harness does not support decimal percentages. Enter whole numbers only, for example, `50`, not `50.5`. The step fails if a decimal value is provided.
:::

To remove all running pods without deleting the workload resource, enter `0` in the **Instances** field.

---

## YAML example

```yaml
- name: Kubernetes Scale
  id: k8sScaleStep
  template:
    uses: k8sScaleStep
    with:
      workload: "default/Deployment/my-app"
      instances: "2"
      instances_unit_type: "count"
```

To scale to a percentage of current replicas:

```yaml
- name: Kubernetes Scale
  id: k8sScaleStep
  template:
    uses: k8sScaleStep
    with:
      workload: "default/Deployment/my-app"
      instances: "50"
      instances_unit_type: "percentage"
```

---

## Read the step output

The step log shows the current replica count, the target replica count, and the result of the scale operation.

After the step runs, reference the pod list in downstream steps:

```text
<+steps.[Step_Id].output.outputVariables.pods>
```

---

## Advanced settings

The following advanced settings are available on the Kubernetes Scale step.

- **Timeout duration**: Maximum time the step is allowed to run before being terminated.
- **On failure**: Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy**: Configure a looping strategy to run this step over a list of values.
- **Conditional execution**: Run this step only when a specified condition is true.

---

## Limitations in the unified platform

:::warning Unsupported features in the unified platform

The following feature is available in the standard Harness Kubernetes Scale step but is not supported in the unified platform.

**Skip Steady State Check**: In the standard platform, the Scale step includes a built-in steady-state check that runs after scaling, controlled by the `skipSteadyStateCheck` flag. In the unified platform, this check is not built into the Scale step. To verify workload health after scaling, add a [Kubernetes Steady State Check](./k8s-steady-state-check) step after the Scale step.

:::

---

## Next steps

- Go to [Kubernetes Steady State Check](./k8s-steady-state-check) to verify workload health after scaling.
- Go to [Kubernetes Apply](./k8s-apply) to apply manifests before scaling.
- Go to [Failure strategies](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps) to configure what happens when the Scale step fails.
