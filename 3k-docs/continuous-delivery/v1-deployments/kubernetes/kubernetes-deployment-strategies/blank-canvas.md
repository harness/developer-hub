---
title: Blank canvas Kubernetes deployment
description: Build a Kubernetes stage from scratch using the Apply step, without a managed rolling, canary, or blue-green strategy.
sidebar_position: 4
---

The managed deployment strategies (rolling, canary, and blue-green) add opinionated step sequences and release tracking to your stage. The blank canvas approach uses the **Kubernetes Apply** step directly. You compose only the steps you need, in the order that fits your workflow. There is no automatic rollback and no release history tracking unless you add those steps yourself.

Use the blank canvas approach when:

- You are deploying resources that do not need a managed release strategy: Jobs, ConfigMaps, CronJobs, or supporting infrastructure.
- You want full control over step ordering and do not want Harness to pre-populate a step sequence.
- You are applying manifests that are not Deployment workloads and do not need steady-state verification.

---

## Before you begin

Before you configure a blank canvas stage, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up a service with manifests and an artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs the deployment steps against your cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying the connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## How it works

When you select **Deploy without a strategy** (or start with a blank stage and add steps manually), Harness does not pre-populate any steps. You add a **Kubernetes Apply** step as the primary deploy action, then layer in any validation, patching, or cleanup steps your workflow requires.

The **Kubernetes Apply** step calls `kubectl apply` directly. It:

- Compiles manifests from your service definition (fetching from Git, inline, or Helm as configured).
- Applies the compiled manifests to the cluster in the target namespace.
- Does not track a release number or store release history in a cluster secret.
- Does not perform automatic steady-state verification unless you add a **Kubernetes Steady State Check** step after it.
- Does not support automatic rollback. If the step fails, the pipeline follows the failure strategy you configure.

---

## Configure the Kubernetes Apply step

The following parameters are available on the **Kubernetes Apply** step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Kubernetes Apply`. | Required |
| **Skip Dry Run** | When enabled, skips the `kubectl apply --dry-run` check before applying manifests. Default: `false`. | Optional |
| **Skip Steady State Check** | When enabled, Harness does not wait for workloads to reach steady state after applying. Default: `false`. | Optional |
| **Manifest Path** | One or more relative paths to the manifest files to apply, derived from the service configuration. | Optional |
| **Kubeconfig Path** | Path to the kubeconfig file, derived from the infrastructure configuration. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Target namespace on the cluster. Default: `${{infra.namespace}}`. | Optional |
| **Release Name** | Name for this release. Default: `${{infra.releaseName}}`. | Optional |
| **Command Flags** | Additional flags passed to the `kubectl apply` command, such as `--server-side` or `--force-conflicts`. | Optional |
| **Dry Run Only** | When enabled, runs only the dry run and does not apply manifests to the cluster. Default: `false`. | Optional |
| **Release Pruning** | When enabled, removes resources from a previous release that are no longer in the current manifest. Default: `false`. | Optional |
| **Print Manifests** | When enabled, prints the full resolved manifest to the step log before applying. Default: `false`. | Optional |
| **Server Side Apply** | When enabled, passes `--server-side` to `kubectl apply`. Requires Kubernetes 1.18 or later. Default: `false`. | Optional |
| **Log Level** | Verbosity of step logs. Default: `info`. | Optional |

:::info No automatic rollback
The **Kubernetes Apply** step does not store release history. If the step fails, the pipeline follows the failure strategy you configure, but Harness cannot automatically re-apply the previous release. To support rollback, use a rolling, canary, or blue-green strategy, or add explicit rollback steps to your stage.
:::

The step also exposes the following output variables for use in downstream steps:

| Output variable | Description |
|-----------------|-------------|
| `releaseNumber` | The release sequence number for this apply. |
| `managedWorkloads` | Comma-separated list of workloads managed by this apply, for example `harness-delegate-ng/Deployment/hello-app`. |
| `manifest` | Path to the consolidated manifest file written by this step. |

To skip a specific manifest file from the apply operation, add `# harness.io/skip-file-for-deploy` as a comment at the top of that file. Harness reads this annotation and excludes the file from the apply.

Go to [Kubernetes Apply step reference](../step-library/k8s-apply) to review the full reference and supported workload types.

---

## Pipeline YAML

The minimal blank canvas stage uses a single Apply step:

```yaml
pipeline:
  stages:
    - name: k8s-apply
      id: k8s_apply
      service:
        type: kubernetes
        items:
          - id: <your-service-id>
      environment:
        id: <your-environment-id>
        deploy-to: <your-infrastructure-id>
      steps:
        - name: Kubernetes Apply
          id: k8sApplyStep
          template:
            uses: k8sApplyStep
            with:
              skip_steady_state_check: false
      runtime:
        kubernetes:
          namespace: <target-namespace>
          connector: <your-kubernetes-connector-id>
```

---

## Steps to add before the Apply step

You can add validation steps before the Apply step to catch issues before any changes reach the cluster.

### Kubernetes Dry Run

The **Kubernetes Dry Run** step runs `kubectl apply --dry-run` on your compiled manifests and shows what would change without modifying the cluster. Add it before the Apply step to catch manifest errors early. Go to [Kubernetes Dry Run step reference](../step-library/k8s-dry-run) to review configuration details.

```yaml
- name: Kubernetes Dry Run
  id: k8sDryRunStep
  template:
    uses: k8sDryRunStep
```

### Kubernetes Diff

The **Kubernetes Diff** step runs `kubectl diff` against your compiled manifests and surfaces the delta between the current cluster state and the desired manifest state. Add it before the Apply step to preview changes. Go to [Kubernetes Diff step reference](../step-library/k8s-diff) to review configuration details.

```yaml
- name: Kubernetes Diff
  id: k8sDiffStep
  template:
    uses: k8sDiffStep
```

---

## Steps to add after the Apply step

You can add verification and operational steps after the Apply step to validate the deployment or clean up resources.

### Kubernetes Steady State Check

The **Kubernetes Steady State Check** step polls the cluster until all workloads reach `Running` status and pass readiness checks. Add it after the Apply step when your manifests include Deployment workloads. Go to [Kubernetes Steady State Check step reference](../step-library/k8s-steady-state-check) to review configuration details.

```yaml
- name: Kubernetes Steady State Check
  id: k8sSteadyStateCheckStep
  template:
    uses: k8sSteadyStateCheckStep
    with:
      release_name: '<+infra.releaseName>'
```

### Kubernetes Scale

The **Kubernetes Scale** step scales a workload replica count up or down. Add it after the Apply step to pre-warm a deployment or reduce replicas after deployment. Go to [Kubernetes Scale step reference](../step-library/k8s-scale) to review configuration details.

```yaml
- name: Kubernetes Scale
  id: k8sScaleStep
  template:
    uses: k8sScaleStep
    with:
      workload: default/Deployment/my-app
      instances: 3
      instances_unit_type: count
```

### Kubernetes Patch

The **Kubernetes Patch** step applies a partial JSON or YAML patch to a live workload without redeploying from manifests. Use it to update labels, annotations, or configuration on a running workload. Go to [Kubernetes Patch step reference](../step-library/k8s-patch) to review configuration details.

```yaml
- name: Kubernetes Patch
  id: k8sPatchStep
  template:
    uses: k8sPatchStep
    with:
      workload: default/Deployment/my-app
      merge_strategy: strategic
      content: '{"spec":{"replicas":2}}'
```

### Kubernetes Delete

The **Kubernetes Delete** step removes resources from the cluster by name, manifest path, or release name. Add it after Apply to clean up Jobs, temporary resources, or old releases. Go to [Kubernetes Delete step reference](../step-library/k8s-delete) to review configuration details.

```yaml
- name: Kubernetes Delete
  id: k8sDeleteStep
  template:
    uses: k8sDeleteStep
    with:
      resources:
        - default/Job/migration-job
```

### Kubernetes Rollout

The **Kubernetes Rollout** step runs `kubectl rollout` subcommands against workloads. Use `restart` to bounce pods after a ConfigMap or Secret update, or `status` to wait for a rollout to complete. Go to [Kubernetes Rollout step reference](../step-library/k8s-rollout) to review configuration details.

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

---

## Example: deploy a Job with cleanup

This stage applies a manifest that contains a Kubernetes Job, waits for steady state, then deletes the Job after it completes:

```yaml
pipeline:
  stages:
    - name: run-migration
      id: run_migration
      service:
        type: kubernetes
        items:
          - id: migration-service
      environment:
        id: production
        deploy-to: production-infra
      steps:
        - name: Kubernetes Apply
          id: k8sApplyStep
          template:
            uses: k8sApplyStep
            with:
              skip_steady_state_check: false
        - name: Kubernetes Steady State Check
          id: k8sSteadyStateCheckStep
          template:
            uses: k8sSteadyStateCheckStep
            with:
              release_name: '<+infra.releaseName>'
        - name: Kubernetes Delete
          id: k8sDeleteStep
          template:
            uses: k8sDeleteStep
            with:
              resources:
                - default/Job/migration-job
      runtime:
        kubernetes:
          namespace: production
          connector: my-k8s-connector
```

---

## Example: validate before apply

This stage runs a dry run and diff before applying manifests, so you can catch errors and preview changes without a manual approval gate:

```yaml
pipeline:
  stages:
    - name: k8s-validated-apply
      id: k8s_validated_apply
      service:
        type: kubernetes
        items:
          - id: my-service
      environment:
        id: staging
        deploy-to: staging-infra
      steps:
        - name: Kubernetes Dry Run
          id: k8sDryRunStep
          template:
            uses: k8sDryRunStep
        - name: Kubernetes Diff
          id: k8sDiffStep
          template:
            uses: k8sDiffStep
        - name: Kubernetes Apply
          id: k8sApplyStep
          template:
            uses: k8sApplyStep
            with:
              skip_steady_state_check: false
        - name: Kubernetes Steady State Check
          id: k8sSteadyStateCheckStep
          template:
            uses: k8sSteadyStateCheckStep
            with:
              release_name: '<+infra.releaseName>'
      runtime:
        kubernetes:
          namespace: staging
          connector: my-k8s-connector
```

---

## Limitations

:::warning No automatic rollback
The **Kubernetes Apply** step does not track a release number or store release history. If the step fails, the pipeline follows the failure strategy you configure, but Harness cannot automatically re-apply the previous release. To support rollback, use a rolling or blue-green strategy, or add explicit rollback steps to your stage.
:::

---

## Next steps

- Go to [Kubernetes rolling deployment](./rolling) to use a managed strategy with automatic rollback.
- Go to [Kubernetes canary deployment](./canary) to validate traffic incrementally before full promotion.
- Go to [Kubernetes blue-green deployment](./blue-green) to deploy with zero downtime and instant rollback.
- Go to [Kubernetes Apply step reference](../step-library/k8s-apply) to review the full field reference for the Apply step.
