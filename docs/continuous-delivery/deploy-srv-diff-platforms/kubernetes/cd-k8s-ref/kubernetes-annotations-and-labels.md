---
title: Kubernetes annotations and labels
description: Use Kubernetes annotations and labels in your manifests.
sidebar_position: 7
helpdocs_topic_id: u7h63vxg7z
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to use annotations and labels to select objects you defined in your manifests.

## Annotations

To see annotations in action, see [Deploy Manifests Separately using Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step) and [Ignore a Manifest](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/ignore-a-manifest-file-during-deployment). Annotations are a way to pass additional metadata for resources to Harness. For a description of Annotations, go to [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) from Kubernetes.

The following Annotations can be put on resource specifications in the Harness Service **Manifests** section.

| **Annotation** | **Value** | **Usage** |
| --- | --- | --- |
| `harness.io/skip-versioning` | "true"|"false" | By default, all the ConfigMap and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) resources are versioned by Harness. Corresponding references in PodSpec are also updated with versions.Set to `true` to exclude versioning of a resource (for example ConfigMap or Secret). |
| `harness.io/direct-apply` | "true"|"false" | Set to `true` to make a manifest an unmanaged workload.A **managed** workload in Harness is a workload taken to steady state and verified at steady state. If it fails to reach steady state, rollback occurs.An **unmanaged** workload is simply run without checking for steady state.For example, a Canary Deployment requires a minimum of 1 Deployment or StatefulSet as a managed workload. You can deploy additional workloads in the deployment by using the `harness.io/direct-apply: true` for the additional workload manifest.See [What Can I Deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes). |
| `harness.io/primary-service` | "true"|"false" | Identifies the primary Kubernetes service in a Blue/Green deployment. |
| `harness.io/stage-service` | "true"|"false" | Identifies the Kubernetes stage service in a Blue/Green deployment. |

## Labels

The following labels are applied by Harness during deployment.

| **Label** | **Value** | **Usage** |
| --- | --- | --- |
| `harness.io/release-name` | `release name` | Applied on pods. Harness uses a release name for tracking releases, rollback, etc. You can supply a release name in an Environment's Infrastructure Definition **Release Name** field. |
| `harness.io/track` | `canary` \| `stable` | Applied on pods in a Canary deployment. |
| `harness.io/color` | `blue` \| `green` | Applied on pods in a Blue/Green deployment. |

## Next steps

* [Kubernetes Releases and Versioning](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-releases-and-versioning)

