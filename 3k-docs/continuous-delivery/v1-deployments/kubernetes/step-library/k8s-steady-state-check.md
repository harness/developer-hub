---
title: Kubernetes Steady State Check
description: Wait for Kubernetes workloads to reach a healthy running state after a deployment or scale operation.
sidebar_position: 6
---

The Kubernetes Steady State Check step watches workloads until all pods are running and ready, or until the step times out. Use it after a Kubernetes Apply step, a Scale step, or any operation that modifies workloads but does not have a built-in wait.

Most Harness deployment strategies, Rolling, Canary, and Blue-Green, include a steady-state check automatically. Use the standalone step when you deploy with the Apply step, use custom or unmanaged workloads, or disable the built-in check on another step and want to defer it.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and an artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect your cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying a connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Add the Kubernetes Steady State Check step

To add the step:

1. In your pipeline, go to the Kubernetes stage.
2. Select **+ Add Step** in the execution section.
3. Search for **Kubernetes Steady State Check** and select it.
4. Configure the step parameters described below.
5. Select **Apply Changes**.

---

## Configure the step

The following parameters are available on the Kubernetes Steady State Check step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for the step in the pipeline. | Required |
| **Kubeconfig Path** | Path to the kubeconfig file, derived from the infrastructure configuration. Default: `${{infra.kube_config_path}}`. | Required |
| **Manifest Path** | One or more relative paths to the manifest files containing the workloads to watch. Harness resolves workload identifiers from these files. | Conditional* |
| **Managed Workloads** | Comma-separated or JSON array of workloads managed by a preceding step, in `namespace/Kind/resource-name` format. For example, `default/Deployment/my-app`. | Conditional* |
| **Custom Workloads** | Comma-separated or JSON array of unmanaged workloads to watch, in `namespace/Kind/resource-name` format. | Conditional* |
| **Namespace** | Target namespace on the cluster. Default: `default`. | Optional |
| **Release Name** | Release name used to identify the cluster release secret. Default: `${{infra.releaseName}}`. | Optional |
| **Timeout** | Maximum time the step waits for workloads to reach steady state. Default: `10m`. | Optional |

*At least one of **Manifest Path**, **Managed Workloads**, or **Custom Workloads** is required. The step fails with a configuration error if all three are empty.

---

## Specify workloads to watch

You can identify workloads in three ways, and you can combine them:

**Manifest Path:** Provide the path to a rendered manifest file. Harness parses the file to find all managed workload resources and watches them. This is the most common approach when using the step after a Kubernetes Apply step.

Use the output expression from a preceding Apply step to pass the manifest path automatically:

```text
<+steps.[Apply_Step_Id].output.outputVariables.manifest>
```

**Managed Workloads:** Specify workloads by identity in `namespace/Kind/resource-name` format. Use this when you know the workloads explicitly or want to watch workloads from a preceding step by expression:

```text
<+steps.[Apply_Step_Id].output.outputVariables.managedWorkloads>
```

**Custom Workloads:** Specify workloads that Harness does not manage as part of a release. Use the same `namespace/Kind/resource-name` format.

---

## Supported workload types

The step supports the following workload types:

- Deployment
- DaemonSet
- Job
- DeploymentConfig (OpenShift)

---

## YAML example

```yaml
- name: Kubernetes Steady State Check
  id: k8sSteadyStateCheck
  template:
    uses: k8sSteadyStateCheck
    with:
      managed_workloads: '<+steps.k8sApplyStep.output.outputVariables.managedWorkloads>'
      timeout: "10m"
```

To watch workloads from a manifest path:

```yaml
- name: Kubernetes Steady State Check
  id: k8sSteadyStateCheck
  template:
    uses: k8sSteadyStateCheck
    with:
      manifest_path: '<+steps.k8sApplyStep.output.outputVariables.manifest>'
      timeout: "10m"
```

---

## How the step works

When the step runs, Harness does the following:

1. Resolves the list of workloads from the manifest path, managed workloads, or custom workloads inputs.
2. Opens a watch connection to the Kubernetes API for each workload.
3. Waits until each workload reports all pods running and ready, or until the overall step timeout is reached.
4. On success, runs `kubectl describe` on each watched resource and logs the output.

The step uses Kubernetes Watch API calls with a 5-minute timeout per watch call. If a watch call times out, Harness opens a new watch call and continues waiting until the overall step timeout is reached.

---

## Read the step output

The step log shows each workload being watched and the final pod status for each resource.

The step exposes the following output variables you can reference in downstream steps.

| Output variable | Description |
|-----------------|-------------|
| `pods` | Details of the pods after the steady-state check completes. Reference with `<+steps.[Step_Id].output.outputVariables.pods>`. |
| `skipped` | Boolean indicating whether the steady-state check was skipped. |

---

## Advanced settings

The following advanced settings are available on the Kubernetes Steady State Check step.

- **Timeout duration**: Maximum time the step is allowed to run before being terminated.
- **On failure**: Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy**: Configure a looping strategy to run this step over a list of values.
- **Conditional execution**: Run this step only when a specified condition is true.

---

## Troubleshooting

**Step times out before workloads are ready**

The default timeout is `10m`. If your workloads take longer to reach steady state, for example, if image pulls are slow or init containers run long, increase the **Timeout** value on the step.

**Step fails with "KUBECONFIG_PATH is required"**

The Kubeconfig Path field cannot be empty. Verify that your infrastructure connector is configured and that the kubeconfig path expression resolves correctly for your environment.

**Step fails with "at least one of manifest path, managed workloads, or custom workloads must be provided"**

You must specify at least one workload source. If you are using this step after a Kubernetes Apply step, pass the `managedWorkloads` output expression from the Apply step into the **Managed Workloads** field.

---

## Next steps

- Go to [Kubernetes Apply](./k8s-apply) to apply manifests before checking steady state.
- Go to [Kubernetes Scale](./k8s-scale) to scale workloads before verifying health.
- Go to [Failure strategies](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps) to configure what happens when the steady-state check fails.
