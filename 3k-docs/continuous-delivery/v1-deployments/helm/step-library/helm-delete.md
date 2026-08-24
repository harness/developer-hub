---
title: Helm Delete
description: Uninstall a Helm release and remove all associated Kubernetes resources from the cluster.
sidebar_position: 7
---

The Helm Delete step runs `helm uninstall` to remove a Helm release and all its associated Kubernetes resources from the cluster. Use it to clean up a release after deployment, tear down a test environment, or as a standalone cleanup step in a pipeline.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Helm service:** Go to [Helm services](/3k-docs/continuous-delivery/v1-deployments/helm/helm-services) to set up a service with a chart source and values files.
- **A Helm infrastructure:** Go to [Helm infrastructure](/3k-docs/continuous-delivery/v1-deployments/helm/helm-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Helm stage requires a `runtime` block specifying a connector and namespace. Go to [Helm runtime configuration](/3k-docs/continuous-delivery/v1-deployments/helm/overview#helm-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Helm Delete step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Helm Delete`. | Required |
| **Release Name** | The name of the Helm release to uninstall. When left empty, Harness uses the release name derived from the infrastructure definition. | Optional |
| **Dry Run** | When enabled, runs the uninstall in dry-run mode without making any changes to the cluster. Use this to preview which resources would be removed. Default: `false`. | Optional |
| **Environment Variables** | Additional environment variables to pass into the Helm plugin execution. | Optional |
| **Command Flags** | Additional flags to append to the `helm uninstall` command. | Optional |

---

## How the step works

The step runs `helm uninstall <release-name> --namespace <namespace>` and removes all Kubernetes resources tracked in that Helm release from the cluster. Helm also removes the release history entry from the namespace.

If **Dry Run** is enabled, Harness runs `helm uninstall --dry-run` and prints the resources that would be deleted without making any changes to the cluster.

---

## Advanced settings

- **Timeout duration:** Maximum time the step can run before Harness terminates it.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go to [Helm Basic Deploy](./helm-basic-deploy.md) to review the deploy step reference.
- Go to [Helm Rollback](./helm-rollback.md) to review the rollback step reference.
