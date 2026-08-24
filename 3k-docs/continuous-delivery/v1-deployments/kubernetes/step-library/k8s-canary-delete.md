---
title: Kubernetes Canary Delete
description: Remove the canary workload after validation or on rollback.
sidebar_position: 15
---

The Kubernetes Canary Delete step removes the canary workload and all canary-suffixed resources created by the Canary Deploy step. It runs after validation in the main flow and as the first rollback step if the canary stage fails.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect your cluster and namespace.
- **A Harness delegate in target cluster:** The delegate runs deployment steps in your cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Configure the step

The following parameters are available on the Kubernetes Canary Delete step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for this step. Default: `Kubernetes Canary Delete`. | Required |
| **Resource Name** | Reference to the canary workload to delete. Auto-populated from the Canary Deploy step output: `<+stage.steps.k8sCanaryDeployStep.output.outputVariables.canaryWorkloads>`. | Required |
| **Kubeconfig Path** | Path to the kubeconfig file. Default: `${{infra.kube_config_path}}`. | Optional |
| **Namespace** | Kubernetes namespace where the canary workload runs. Default: `${{infra.namespace}}`. | Optional |
| **Log Level** | Verbosity of step logs. Default: `info`. | Optional |
| **OpenShift Mode** | Enable when deploying to an OpenShift cluster. Auto-populated from the Canary Deploy step output. | Optional |
| **Command Flags** | Additional flags passed to the underlying `kubectl delete` command. Use JSON format: `[{"Delete": "--force --grace-period=0"}]`. | Optional |

The **Resource Name** field is auto-populated when you use this step after a Canary Deploy step. You do not need to change it.

---

## How the step works

The step retrieves the canary workload name from the **Resource Name** input and runs `kubectl delete` targeting the canary Deployment. All canary-suffixed resources tracked in the release history are deleted, including:

- The canary Deployment
- The cloned canary Service
- Any canary-suffixed ConfigMaps, Secrets, HorizontalPodAutoscalers, and PodDisruptionBudgets

The stable workload and stable service are not affected.

---

## Rollback configuration

In the rollback section of a canary stage, the **Resource Name** field is pre-wired to the canary workload list captured at deploy time:

```text
${{rollback.data.PLUGIN_CANARY_WORKLOADS}}
```

The **OpenShift Mode** field is similarly pre-wired:

```text
${{rollback.data.HARNESS_IS_OPENSHIFT}}
```

These ensure rollback always targets the exact canary resources that were created, even if the deployment partially succeeded.

---

## Advanced settings

- **Timeout duration:** Maximum time the step is allowed to run before being terminated.
- **On failure:** Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy:** Configure a looping strategy to run this step over a list of values.
- **Conditional execution:** Run this step only when a specified condition is true.

---

## Next steps

- Go to [Kubernetes canary deployment](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-deployment-strategies/canary) to understand the full canary deployment flow.
- Go to [Kubernetes Canary Deploy](./k8s-canary-deploy) to review the deploy step reference.
