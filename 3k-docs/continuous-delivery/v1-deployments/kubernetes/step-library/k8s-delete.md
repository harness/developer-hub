---
title: Kubernetes Delete
description: Delete Kubernetes resources by name, manifest path, or release name.
sidebar_position: 5
---

The Kubernetes Delete step removes resources from a Kubernetes cluster. Use it to clean up resources that are no longer needed: for example, deleting a canary workload manually, removing a Job after it completes, or tearing down a full release.

---

## Before you begin

Before you configure the step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up service manifests and artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect your cluster and namespace.
- **A Harness delegate in target cluster:** The delegate runs deployment steps in the cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying the connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Add the Kubernetes Delete step

To add the step:

1. In your pipeline, go to the Kubernetes stage.
2. Select **+ Add Step** in the execution section.
3. Search for **Kubernetes Delete** and select it.
4. Configure the step parameters described below.
5. Select **Apply Changes**.

---

## Configure the step

The following parameters are available on the Kubernetes Delete step.

| Parameter | Description | Required |
|-----------|-------------|----------|
| **Name** | Display name for the step in the pipeline. | Required |
| **Kubeconfig Path** | Path to the kubeconfig file, derived from the infrastructure configuration. Default: `${{infra.kube_config_path}}`. | Required |
| **Resources** | Comma-separated list of resources to delete, in `namespace/Kind/name` format. For example, `default/Deployment/my-app,default/Service/my-svc`. | Conditional* |
| **Release Name** | The Harness release name. Harness deletes all resources associated with this release from the cluster release history. | Conditional* |
| **Manifest Paths** | Comma-separated list of manifest file paths. Harness parses the files and deletes all resources defined in them. | Conditional* |
| **Include Namespace Resources** | When enabled, includes namespace-scoped resources in the deletion. Default: `false`. | Optional |
| **Namespace** | Cluster namespace used when a resource entry does not include a namespace prefix. Default: `default`. | Optional |
| **Command Flags** | Additional flags passed to the `kubectl delete` command. Use JSON format: `[{"Delete": "--force --grace-period=0"}]`. | Optional |
| **Timeout** | Maximum time the step can run before it is marked as failed. Default: `5m`. | Optional |

*At least one of **Resources**, **Release Name**, or **Manifest Paths** must be provided. The step is skipped silently if all three are empty.

---

### Choose a deletion source

You can specify what to delete in three ways, and you can combine them:

**Resources:** Provide explicit resource identifiers in `namespace/Kind/name` format. Harness deletes each resource directly. Use this when you know the exact resources to delete.

**Release Name:** Provide the Harness release name. Harness looks up all resources tracked under that release in the cluster release history secret and deletes them. Use this when you want to tear down an entire managed release.

**Manifest Paths:** Provide paths to rendered manifest files on the Harness workspace. Harness parses each file, extracts the resource kinds and names, and deletes them. Use this when you want to delete exactly the resources defined in a set of manifests.

---

## YAML example

```yaml
- name: Kubernetes Delete
  id: k8sDeleteStep
  template:
    uses: k8sDeleteStep
    with:
      resources:
        - default/Deployment/my-app
        - default/Service/my-svc
```

To delete by release name:

```yaml
- name: Kubernetes Delete
  id: k8sDeleteStep
  template:
    uses: k8sDeleteStep
    with:
      release_name: '<+infra.releaseName>'
```

---

## Advanced settings

The following advanced settings are available on the Kubernetes Delete step.

- **Timeout duration**: Maximum time the step is allowed to run before being terminated.
- **On failure**: Define what happens if the step fails, such as retry, mark as success, or abort.
- **Strategy**: Configure a looping strategy to run this step over a list of values.
- **Conditional execution**: Run this step only when a specified condition is true.

---

## Next steps

- Go to [Kubernetes Apply](./k8s-apply) to apply resources before deleting them.
- Go to [Failure strategies](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps) to configure what happens when the Delete step fails.
