---
title: Helm Blue Green Swap
description: Switch service selectors to route production traffic to the new workload after a blue-green deploy.
sidebar_position: 5
---

The Helm Blue Green Swap step routes production traffic to the new workload by swapping the selectors between the primary and stage services. Run this step after the Helm Blue Green Deploy step and any intermediate validation or approval steps.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Helm service:** Go [Helm services](/3k-docs/continuous-delivery/v1-deployments/helm/helm-services) to set up a service with chart source and values files.
- **A Helm infrastructure:** Go [Helm infrastructure](/3k-docs/continuous-delivery/v1-deployments/helm/helm-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Helm stage requires a `runtime` block specifying a connector and namespace. Go [Helm runtime configuration](/3k-docs/continuous-delivery/v1-deployments/helm/overview#helm-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Helm Blue Green Swap step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Helm Blue Green Swap`. | Required |
| **Environment Variables** | Additional environment variables to pass into the Helm plugin execution. | Optional |
| **Command Flags** | Additional flags to append to the Helm command. | Optional |

---

## How the step works

The step reads the current Helm release manifest to locate the stage service, identified by the `harness.io/service-type: stage` label. It then reads the `harness.io/primary-service` annotation on that service to determine the primary service name and fetches the primary service from the cluster.

Harness swaps the selector values between the two services:

- The primary service selector is updated to point to the new workload, routing production traffic to the new version.
- The stage service selector is updated to point to the previous workload.

Both workloads continue running after the swap. The next deployment detects the new stable state and deploys the following version to the stage side again.

---

## Rollback

In the rollback group, the swap step is pre-wired to the service names captured by the Blue Green Deploy step:

```text
${{rollback.data.PLUGIN_STABLE_SERVICE}}
${{rollback.data.PLUGIN_STAGE_SERVICE}}
```

If the failure occurred before the swap ran, the rollback swap is a no-op and the previous version continues serving production traffic. If the swap had already occurred, the rollback re-swaps the selectors to restore the previous version as primary.

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before it is terminated.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go [Helm blue-green deployment](../helm-deployment-strategies/blue-green.md) to understand the full blue-green deployment flow.
- Go [Helm Blue Green Deploy](./helm-blue-green-deploy.md) to review the deploy step reference.
