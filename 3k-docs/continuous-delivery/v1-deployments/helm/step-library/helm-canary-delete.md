---
title: Helm Canary Delete
description: Uninstall the canary Helm release after validation or on rollback.
sidebar_position: 3
---

The Helm Canary Delete step runs `helm uninstall` on the canary release to remove all canary workloads from the cluster. It runs after validation in the main flow and as the first rollback step if the canary stage fails. The stable release is not affected.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Helm service:** Go to [Helm services](/3k-docs/continuous-delivery/v1-deployments/helm/helm-services) to set up your service chart source and values files.
- **A Helm infrastructure:** Go to [Helm infrastructure](/3k-docs/continuous-delivery/v1-deployments/helm/helm-infrastructure) to connect your cluster and namespace.
- **A Harness delegate in your target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Helm stage requires a `runtime` block specifying the connector and namespace. Go to [Helm runtime configuration](/3k-docs/continuous-delivery/v1-deployments/helm/overview#helm-runtime-configuration) to understand the required fields.

---

## Configure the step

The **Release Name** field is auto-populated from the Canary Deploy step output when you use this step in a canary stage:

```text
<+stage.steps.helmCanaryDeployStep.output.outputVariables.canaryRelease>
```

You do not need to change this value.

The following parameters are available on the Helm Canary Delete step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Helm Canary Delete`. | Required |
| **Release Name** | The name of the canary Helm release to uninstall. Auto-populated from the Canary Deploy step output. Do not modify this value unless you use a custom canary release name. | Required |

---

## How the step works

The step runs `helm uninstall <canary-release-name> --namespace <namespace>`. All Kubernetes resources tracked in the canary Helm release are removed from the cluster. The stable release and its resources are not affected.

---

## Rollback configuration

In the rollback sequence of a canary stage, the **Release Name** field is pre-wired to the canary release name captured at deploy time:

```text
${{rollback.data.PLUGIN_CANARY_RELEASE_NAME}}
```

The step runs conditionally only when `${{rollback.data.PLUGIN_CANARY_RELEASE_NAME != ''}}`, so it is skipped automatically if the stage failed before the canary release was created.

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before being terminated.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go to [Helm canary deployment](../helm-deployment-strategies/canary.md) to understand the full canary deployment flow.
- Go to [Helm Canary Deploy](./helm-canary-deploy.md) to review the deploy step reference.
