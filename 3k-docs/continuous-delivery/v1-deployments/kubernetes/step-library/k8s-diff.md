---
title: Kubernetes Diff
description: Compare the current state of the cluster with the desired state defined in your manifests.
sidebar_position: 8
---

import DocImage from '@site/src/components/DocImage';

The Kubernetes Diff step runs `kubectl diff` against your compiled manifests to show what would change if you applied them. Use this step anywhere in a Kubernetes stage to preview changes before they are applied.

Unlike the Kubernetes Dry Run step, which calls `kubectl apply --dry-run`, the Diff step calls `kubectl diff` and surfaces the delta between the current cluster state and the desired manifest state.

---

## Add the Kubernetes Diff step

To add the step:

1. In your pipeline, go to the Kubernetes stage.
2. Select **+ Add Step** in the execution section.
3. Search for **Kubernetes Diff** and select it.
4. Configure the step parameters described below.
5. Select **Apply Changes**.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand required fields.

---

## Configure the step

The following parameters are available on the Kubernetes Diff step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for the step in the pipeline. | Required |
| **Manifest Path** | One or more relative paths to the manifest files to diff, derived from the service configuration. | Optional |
| **Kubeconfig Path** | Path to the kubeconfig file, derived from the infrastructure configuration. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Target namespace on the cluster. Default: `default`. | Optional |
| **Release Name** | Name for this release. Default: `${{infra.releaseName}}`. | Optional |
| **Command Flags** | Additional flags passed to the `kubectl diff` command. | Optional |
| **Timeout** | Maximum time the step can run before it is marked as failed. Default: `5m`. | Optional |
| **Log Level** | Verbosity of step logs. Default: `info`. | Optional |
| **OpenShift Mode** | When enabled, Harness uses the `oc` client instead of `kubectl`. Default: `false`. | Optional |

The Kubernetes Diff step does not require a file path. It automatically uses the manifests configured in your service definition.

---

### Add command flags

To add a command flag:

1. In the step configuration, select **+ Add** next to **Command Flags**.
2. Enter the flag value.

Common flags include `--server-side` to run the diff using server-side apply semantics.

---

## YAML example

```yaml
- name: Kubernetes Diff
  id: k8sDiffStep
  template:
    uses: k8sDiffStep
```

---

## Read the step output

The step output shows the parameters used and the full diff output from `kubectl diff`, with added lines prefixed by `+` and removed lines prefixed by `-`.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/k8s-diff-action-log.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/k8s-diff-output.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

The step also exposes two output variables you can reference in downstream steps.

| Output variable | Description |
|-----------------|-------------|
| `manifestDiff` | The full diff output as a string. Reference it in downstream steps with `<+steps.[Step_Id].output.outputVariables.manifestDiff>`. |
| `exitValue` | The exit code from `kubectl diff`. `0` means no differences. `1` means differences exist. Greater than `1` indicates an error. |

Use `exitValue` in a conditional execution expression on a downstream step to branch your pipeline based on whether differences exist.

:::info Secret values in diff output
Harness actively sanitizes `Secret` resource values from the diff output. Both `data:` and `stringData:` field values are replaced before logging, including values embedded in `last-applied-configuration` annotations.
:::

---

## OpenShift support

When **OpenShift Mode** is enabled, Harness uses the `oc` client instead of `kubectl`. You can also leave this as `false` and Harness auto-detects OpenShift resources and switches clients automatically.

The Diff step is available only for Kubernetes stages. It is not available for Native Helm deployment stages. If your service uses Helm charts with the Kubernetes deployment type, the Diff step renders the Helm chart first and then diffs the rendered manifests.

---

## Advanced settings

The following advanced settings are available on the Kubernetes Diff step.

- **Timeout duration**: Maximum time the step is allowed to run before being terminated.
- **On failure**: Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy**: Configure a looping strategy to run this step over a list of values.
- **Conditional execution**: Run this step only when a specified condition is true.

---

## Next steps

- Go to [Kubernetes Apply](./k8s-apply) to apply the manifests after reviewing the diff.
- Go to [Kubernetes Dry Run](./k8s-dry-run) to validate manifests without comparing cluster state.
- Go to [Failure strategies](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps) to configure what happens when the diff step fails.
