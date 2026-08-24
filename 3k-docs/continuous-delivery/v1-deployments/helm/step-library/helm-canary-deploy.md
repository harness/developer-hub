---
title: Helm Canary Deploy
description: Install a separate canary Helm release alongside the stable release with a controlled instance count or percentage.
sidebar_position: 2
---

The Helm Canary Deploy step installs a separate Helm release alongside the stable release and waits for canary workloads to reach steady state. Harness derives the canary release name by appending `-canary` to the stable release name. Insert verification or approval steps after this step before promoting with a Helm Basic Deploy step.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Helm service:** Go [Helm services](/3k-docs/continuous-delivery/v1-deployments/helm/helm-services) to set up a service with a chart source and values files.
- **A Helm infrastructure:** Go [Helm infrastructure](/3k-docs/continuous-delivery/v1-deployments/helm/helm-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Helm stage requires a `runtime` block specifying a connector and namespace. Go [Helm runtime configuration](/3k-docs/continuous-delivery/v1-deployments/helm/overview#helm-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Helm Canary Deploy step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Helm Canary Deploy`. | Required |
| **Instance Count** | Whether the **Instances** value represents a pod `count` or a `percentage` of the total replicas. | Required |
| **Instances** | The number of instances (count) or fraction of instances (percentage) to include in the canary release. When set to `percentage`, enter a value between 1 and 100. | Required |
| **Ignore Failed Release History** | When enabled, proceeds with deployment even if the previous Helm release has a failed status. Use this to recover from a broken release without manual cleanup. Default: `false`. | Optional |
| **Skip Steady State Check** | When enabled, skips waiting for canary workloads to reach ready status after deployment. Default: `false`. | Optional |
| **Run Chart Tests** | When enabled, runs `helm test` against the canary release after a successful deployment. Default: `false`. | Optional |
| **Skip Cleanup** | When enabled, skips cleanup of a failed first canary release. Use this to inspect resources left behind after a failed initial install. Default: `false`. | Optional |
| **Print Manifests** | When enabled, logs the full rendered chart manifest to the step output with secrets redacted. Default: `false`. | Optional |
| **Server-Side Rendering** | When enabled, passes `--server` to `helm template` so manifests are rendered against the live cluster rather than locally. Default: `false`. | Optional |
| **Environment Variables** | Additional environment variables to pass into the Helm plugin execution. | Optional |
| **Command Flags** | Additional flags to append to the `helm upgrade` command, for example `--atomic` or `--cleanup-on-fail`. | Optional |

---

## How the step works

When the step runs, it performs the following actions in order:

1. **Canary release name generation:** Harness derives the canary release name by appending `-canary` to the stable release name. For example, if the stable release is `release-50fd6a`, the canary release is `release-50fd6a-canary`. The canary release name is emitted as an output variable for use in downstream steps.

2. **Release history check:** Runs `helm history` on the canary release name. If no canary release exists, Harness proceeds with a fresh install. If **Ignore Failed Release History** is enabled and the canary has a failed status, Harness clears it before upgrading.

3. **Helm upgrade:** Runs `helm upgrade --install <canary-release-name> <chart-path>` with the resolved instance count or percentage applied. Helm tracks the canary as a separate release with its own revision history.

4. **Steady state check:** Polls the cluster until all canary workloads reach ready status. Skipped if **Skip Steady State Check** is enabled.

---

## Step outputs

The following output variable is available for use in downstream steps.

| Output variable | Description |
|-----------------|-------------|
| `canaryRelease` | The name of the canary Helm release. Auto-populates the **Release Name** field of the Helm Canary Delete step as `<+stage.steps.helmCanaryDeployStep.output.outputVariables.canaryRelease>`. |

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before being terminated.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go [Helm canary deployment](../helm-deployment-strategies/canary.md) to understand the full canary deployment flow.
- Go [Helm Canary Delete](./helm-canary-delete.md) to configure the step that removes the canary release after validation.
- Go [Helm Rollback](./helm-rollback.md) to review the rollback step reference.
