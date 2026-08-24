---
title: Kubernetes Patch
description: Modify a specific Kubernetes workload in place without redeploying the full manifest.
sidebar_position: 12
---

The Kubernetes Patch step applies a targeted change to a deployed workload using `kubectl patch`. Use it to update a specific field, such as replica count, image tag, or resource limit, without triggering a full redeployment.

:::info One workload per step
The Patch step accepts a single workload. If you provide a comma-separated list, the step fails. Add multiple Patch steps to modify more than one workload.
:::

---

## Add the Kubernetes Patch step

To add the step:

1. In your pipeline, go to the Kubernetes stage.
2. Select **+ Add Step** in the execution section.
3. Search for **Kubernetes Patch** and select it.
4. Configure the step parameters described below.
5. Select **Apply Changes**.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and an artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying the connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Kubernetes Patch step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for the step in the pipeline. | Required |
| **Workload** | The workload to patch, in `[namespace/]Kind/Name` format. For example, `default/Deployment/my-app`. | Required |
| **Merge Strategy Type** | The patch strategy to use: `strategic`, `merge`, or `json`. | Required |
| **Patch File Paths** | One or more paths to patch files on disk. Either this or **Patch Content** must be provided, but not both. | Conditional |
| **Patch Content** | Inline patch as a JSON or YAML string. Either this or **Patch File Paths** must be provided, but not both. | Conditional |
| **Kubeconfig Path** | Path to the kubeconfig file, derived from the infrastructure configuration. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Target namespace on the cluster. Used when the workload field does not include a namespace. | Optional |
| **Release Name** | Release name for tracking. Default: `${{infra.releaseName}}`. | Optional |
| **Command Flags** | Additional flags passed to the `kubectl patch` command. | Optional |
| **Timeout** | Maximum time the step can run before it is marked as failed. Default: `5m`. | Optional |

---

## Choose a merge strategy

**Strategic** applies changes to specific fields while preserving existing values in all other fields. This is the recommended strategy for most Kubernetes resources and handles list merging (for example, merging a container entry without removing other containers).

**Merge** replaces the targeted fields with exactly what you provide. If you supply a `containers` list, it replaces the entire list. Use this when you want a predictable full replacement of a sub-field.

**JSON** lets you specify precise operations (`add`, `remove`, `replace`, `move`, `copy`, and `test`) using JSON Patch format (RFC 6902). Use this when you need to target a specific array index or apply conditional logic.

---

## Provide the patch

You must provide the patch content in one of two ways.

**Patch File Paths:** provide the path to one or more patch files already present on the Harness workspace. Paths are relative to the manifest workspace directory. You can add multiple paths using **+ Add**.

**Patch Content:** provide the patch inline as a string. This is the most common approach for simple patches. The string can be JSON or YAML depending on the strategy.

You cannot provide both. If both are set, the step fails.

---

## YAML example

```yaml
- name: Kubernetes Patch
  id: k8sPatchStep
  template:
    uses: k8sPatchStep
    with:
      workload: Deployment/hello-app
      merge_strategy: strategic
      content: '{"spec":{"replicas":2}}'
```

Using a patch file:

```yaml
- name: Kubernetes Patch
  id: k8sPatchStep
  template:
    uses: k8sPatchStep
    with:
      workload: default/Deployment/hello-app
      merge_strategy: json
      files:
        - kubernetes/patches/image-update.yaml
```

---

## Step outputs

After the step runs, the following output variables are available for use in downstream steps.

| Output variable | Description |
|-----------------|-------------|
| `resources` | The resource patched by the step. Reference with `<+steps.[Step_Id].output.outputVariables.resources>`. |
| `managed_workloads` | The managed workload names affected by the patch. |
| `patch_action_time` | Timestamp of when the patch was applied. |
| `release_name` | The release name used for this step. |

---

## Advanced settings

The following advanced settings are available on the Kubernetes Patch step.

- **Timeout duration**: Maximum time the step is allowed to run before being terminated.
- **On failure**: Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy**: Configure a looping strategy to run this step over a list of values.
- **Conditional execution**: Run this step only when a specified condition is true.

---

## Limitations in the unified platform

:::warning Unsupported features in the unified platform

The following features are available in the standard Harness Kubernetes Patch step but are not supported in the unified platform.

**Record Change Cause**: In the standard platform, you can enable **Record Change Cause** to annotate the patched resource with the `kubernetes.io/change-cause` annotation, recording what changed and when. This option is not available in the unified platform.

**Rollback**: Patched resources are not rolled back if a subsequent step or stage fails. Rollback only restores the resources managed by the deployment strategy (rolling, canary, or blue-green), not fields modified by a standalone Patch step. Design your pipeline to handle patch failures explicitly using failure strategies.

:::

---

## Next steps

- Go to [Kubernetes Apply](./k8s-apply) to apply full manifests before patching specific fields.
- Go to [Kubernetes Steady State Check](./k8s-steady-state-check) to verify workload health after patching.
- Go to [Failure strategies](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps) to configure what happens when the Patch step fails.
