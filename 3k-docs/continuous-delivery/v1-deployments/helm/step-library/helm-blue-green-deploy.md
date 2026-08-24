---
title: Helm Blue Green Deploy
description: Deploy the new chart version to the stage service and wait for it to reach steady state before a traffic swap.
sidebar_position: 4
---

The Helm Blue Green Deploy step deploys a new version of your chart to the stage side of a blue-green deployment and waits for the new workloads to reach steady state. The primary service continues routing all production traffic to the existing workload until the Helm Blue Green Swap step runs.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Helm service:** Go [Helm services](/3k-docs/continuous-delivery/v1-deployments/helm/helm-services) to set up a service with a chart source and values files.
- **A Helm infrastructure:** Go [Helm infrastructure](/3k-docs/continuous-delivery/v1-deployments/helm/helm-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs the deployment steps in the cluster.
- **Runtime configuration:** Every Helm stage requires a `runtime` block specifying a connector and namespace. Go [Helm runtime configuration](/3k-docs/continuous-delivery/v1-deployments/helm/overview#helm-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Helm Blue Green Deploy step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Helm Blue Green Deploy`. | Required |
| **Ignore Failed Release History** | When enabled, proceeds with deployment even if the previous Helm release has a failed status. Use this to recover from a broken release without manual cleanup. Default: `false`. | Optional |
| **Skip Steady State Check** | When enabled, skips waiting for the new workloads to reach ready status after deployment. Default: `false`. | Optional |
| **Run Chart Tests** | When enabled, runs `helm test` against the new release after a successful deployment. Default: `false`. | Optional |
| **Skip Cleanup** | When enabled, skips cleanup of a failed first release. Use this to inspect resources left behind after a failed initial install. Default: `false`. | Optional |
| **Print Manifests** | When enabled, logs the full rendered chart manifest to the step output with secrets redacted. Default: `false`. | Optional |
| **Server-Side Rendering** | When enabled, passes `--server` to `helm template` so manifests are rendered against the live cluster rather than locally. Default: `false`. | Optional |
| **Environment Variables** | Additional environment variables to pass into the Helm plugin execution. | Optional |
| **Command Flags** | Additional flags to append to the `helm upgrade` command, for example `--atomic` or `--cleanup-on-fail`. | Optional |

---

## How the step works

When the step runs, it performs the following actions in order:

1. **Input validation:** Resolves and prints all input parameters. Prints `PARAM VALIDATION: All looks good` before proceeding.

2. **Service detection:** Reads the existing Helm release manifest and locates the stage service using the `harness.io/service-type: stage` label and the primary service using the `harness.io/service-type: primary` label.

3. **Helm upgrade:** Runs `helm upgrade --install` with the new chart version. The step deploys the new workload alongside the existing one. The step updates the stage service selector to route to the new workload; the primary service continues pointing to the existing workload unchanged.

4. **Steady state check:** Polls the cluster until the new workloads reach ready status. The step skips this check if **Skip Steady State Check** is enabled.

---

## Step outputs

The following output variables are available for use in downstream steps.

| Output variable | Description |
|-----------------|-------------|
| `stableService` | The name of the service currently routing production traffic. Auto-populates the Helm Blue Green Swap step. |
| `stageService` | The name of the service currently routing stage traffic. Auto-populates the Helm Blue Green Swap step. |

---

## Advanced settings

- **Timeout duration:** Maximum time the step can run before Harness terminates it.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go [Helm blue-green deployment](../helm-deployment-strategies/blue-green.md) to understand the full blue-green deployment flow.
- Go [Helm Blue Green Swap](./helm-blue-green-swap.md) to configure the step that routes production traffic to the new workload.
- Go [Helm Rollback](./helm-rollback.md) to review the rollback step reference.
