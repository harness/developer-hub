---
title: Helm Basic Deploy
description: Run helm upgrade --install against the target cluster and wait for all workloads to reach steady state.
sidebar_position: 1
---

The Helm Basic Deploy step runs `helm upgrade --install` against the target cluster and waits for all workloads to reach steady state. Use this step as the single execution step in a basic stage, or as the promotion step at the end of a canary stage after the canary release is removed.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Helm service:** Go to [Helm services](/3k-docs/continuous-delivery/v1-deployments/helm/helm-services) to set up a service with a chart source and values files.
- **A Helm infrastructure:** Go to [Helm infrastructure](/3k-docs/continuous-delivery/v1-deployments/helm/helm-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Helm stage requires a `runtime` block specifying a connector and namespace. Go to [Helm runtime configuration](/3k-docs/continuous-delivery/v1-deployments/helm/overview#helm-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Helm Basic Deploy step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Helm Basic Deploy`. | Required |
| **Ignore Failed Release History** | When enabled, proceeds with deployment even if the previous Helm release has a failed status. Use this to recover from a broken release without manual cleanup. Default: `false`. | Optional |
| **Skip Steady State Check** | When enabled, skips waiting for all deployed workloads to reach ready status after `helm upgrade --install`. Default: `false`. | Optional |
| **Run Chart Tests** | When enabled, runs `helm test` against the release after a successful deployment. Default: `false`. | Optional |
| **Skip Cleanup** | When enabled, skips cleanup of a failed first release. Use this to inspect resources left behind after a failed initial install. Default: `false`. | Optional |
| **Print Manifests** | When enabled, logs the full rendered chart manifest to the step output with secrets redacted. Default: `false`. | Optional |
| **Server-Side Rendering** | When enabled, passes `--server` to `helm template` so manifests are rendered against the live cluster rather than locally. Default: `false`. | Optional |
| **Environment Variables** | Additional environment variables to pass into the Helm plugin execution. | Optional |
| **Command Flags** | Additional flags to append to the `helm upgrade` command, for example `--atomic` or `--cleanup-on-fail`. | Optional |

---

## How the step works

When the step runs, it performs the following actions in order:

1. **Input validation:** Resolves and prints all input parameters, including the release name, chart path, values files, Helm flags, namespace, and credentials. Prints `PARAM VALIDATION: All looks good` before proceeding.

2. **Release history check:** Runs `helm history` to inspect the current state of the release. If no release exists, Harness proceeds with a fresh install. If **Ignore Failed Release History** is enabled and the last release has a failed status, Harness clears it before upgrading.

3. **Helm upgrade:** Runs `helm upgrade --install <release-name> <chart-path>` with all resolved values files and command flags. Helm creates a new revision on the release.

4. **Steady state check:** Polls the cluster until all Deployment, StatefulSet, and DaemonSet workloads in the release reach ready status. Skipped if **Skip Steady State Check** is enabled.

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before being terminated.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go to [Helm basic deployment](../helm-deployment-strategies/basic.md) to understand the full basic deployment flow.
- Go to [Helm Rollback](./helm-rollback.md) to configure the rollback step for this strategy.
- Go to [Helm Delete](./helm-delete.md) to review release cleanup settings.
