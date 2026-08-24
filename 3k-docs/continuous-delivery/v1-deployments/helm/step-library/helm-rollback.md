---
title: Helm Rollback
description: Revert a Helm release to a previous revision after a failed deployment.
sidebar_position: 6
---

The Helm Rollback step runs `helm rollback` to revert a Helm release to a previous revision. Harness adds this step automatically to the rollback sequence of every Helm stage and determines the target revision based on the deployment strategy.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Helm service:** Go to [Helm services](/3k-docs/continuous-delivery/v1-deployments/helm/helm-services) to set up a service with chart source and values files.
- **A Helm infrastructure:** Go to [Helm infrastructure](/3k-docs/continuous-delivery/v1-deployments/helm/helm-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Helm stage requires a `runtime` block specifying connector and namespace. Go to [Helm runtime configuration](/3k-docs/continuous-delivery/v1-deployments/helm/overview#helm-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Helm Rollback step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Helm Rollback`. | Required |
| **Skip Steady State Check** | When enabled, skips waiting for workloads to reach ready status after `helm rollback`. Default: `false`. | Optional |
| **Run Chart Tests** | When enabled, runs `helm test` against the release after a successful rollback. Default: `false`. | Optional |
| **Environment Variables** | Additional environment variables to pass into the Helm plugin execution. | Optional |
| **Command Flags** | Additional flags to append to the `helm rollback` command. | Optional |

---

## How the step works

The step reads the Helm release history to determine the rollback target revision, then runs `helm rollback <release-name> <revision>`.

For **basic deployments**, Harness targets the revision immediately before the failed upgrade. For example, if the current release is at revision 3, Harness rolls back to revision 2.

For **canary deployments**, the rollback step receives `PRE_CANARY_RELEASE_REVISION` from the canary deploy step's rollback data. This value takes precedence and causes the rollback to skip the canary revision entirely. For example, if the stable release is at revision 3 after the Helm Basic Deploy step, Harness rolls back to revision 1, not revision 2, which was the canary revision.

Rollback is skipped (not failed) when:

- No prior release exists in the cluster
- Only one revision exists with no earlier history to restore
- The target revision itself has a failed status

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before being terminated.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go to [Helm basic deployment](../helm-deployment-strategies/basic.md) to understand when rollback runs automatically.
- Go to [Helm canary deployment](../helm-deployment-strategies/canary.md) to understand the canary rollback flow.
- Go to [Helm Basic Deploy](./helm-basic-deploy.md) to review the deploy step reference.
