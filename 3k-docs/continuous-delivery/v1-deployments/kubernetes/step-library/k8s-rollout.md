---
title: Kubernetes Rollout
description: Run kubectl rollout subcommands against Kubernetes workloads identified by name, manifest path, or release name.
sidebar_position: 14
---

The Kubernetes Rollout step runs a `kubectl rollout` subcommand against one or more workloads. Use it to restart pods to pick up a new ConfigMap or Secret, pause or resume an in-progress rollout, check rollout status, or undo the last rollout on a workload.

---

## Add the Kubernetes Rollout step

To add the step:

1. In your pipeline, go to the Kubernetes stage.
2. Click **+ Add Step** in the **Execution** section.
3. Search for **Kubernetes Rollout** and select it.
4. Configure the step parameters described below.
5. Click **Apply Changes**.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and an artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying a connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Kubernetes Rollout step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for the step in the pipeline. | Required |
| **Command** | The `kubectl rollout` subcommand to run. One of: `restart`, `resume`, `status`, `undo`, `pause`, `history`. | Required |
| **Kubeconfig Path** | Path to the kubeconfig file, derived from the infrastructure configuration. Default: `${{infra.kube_config_path}}`. | Required |
| **Resources** | Comma-separated list of workloads to target, in `namespace/Kind/name` format. For example, `default/Deployment/my-app`. | Conditional* |
| **Manifest Paths** | Comma-separated list of rendered manifest file paths. Harness parses the files and runs the rollout command on each workload defined in them. | Conditional* |
| **Release Name** | The Harness release name. Harness resolves the workloads associated with this release and runs the rollout command against them. | Conditional* |
| **Namespace** | Cluster namespace. Default: `default`. | Optional |
| **Command Flags** | Additional flags passed to the `kubectl rollout` command. Use JSON format: `[{"Rollout": "--watch=false"}]`. | Optional |
| **Timeout** | Maximum time the step can run before it is marked as failed. Default: `5m`. | Optional |

*At least one of **Resources**, **Manifest Paths**, or **Release Name** must be provided.

---

### Choose a rollout command

| Command | What it does |
|---------|-------------|
| `restart` | Triggers a rolling restart of all pods in the workload. Use this to force pods to reload a ConfigMap or Secret without changing the deployment spec. |
| `resume` | Resumes a rollout that was previously paused with `pause`. |
| `status` | Waits for the rollout to complete and returns success or failure based on whether all pods became ready. The step fails if the rollout does not complete within the timeout. |
| `undo` | Rolls back the workload to the previous revision. |
| `pause` | Pauses an in-progress rollout. No further pods are replaced until the rollout is resumed. |
| `history` | Prints the rollout history for the workload to the step log. |

---

## YAML example

```yaml
- name: Kubernetes Rollout
  id: k8sRolloutStep
  template:
    uses: k8sRolloutStep
    with:
      command: restart
      resources:
        - default/Deployment/my-app
```

To run a rollout restart on all workloads in a release:

```yaml
- name: Kubernetes Rollout
  id: k8sRolloutStep
  template:
    uses: k8sRolloutStep
    with:
      command: restart
      release_name: '<+infra.releaseName>'
```

---

## Advanced settings

The following advanced settings are available on the Kubernetes Rollout step.

- **Timeout duration**: Maximum time the step is allowed to run before being terminated.
- **On failure**: Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy**: Configure a looping strategy to run this step over a list of values.
- **Conditional execution**: Run this step only when a specified condition is true.

---

## Next steps

- Go to [Kubernetes Apply](./k8s-apply) to apply manifests before running a rollout command.
- Go to [Kubernetes Steady State Check](./k8s-steady-state-check) to verify workload health after a restart.
- Go to [Failure strategies](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps) to configure what happens when the Rollout step fails.
