---
title: What Can I Deploy in Kubernetes?
description: In Harness, a managed Kubernetes workload is a Deployment, StatefulSet, or DaemonSet object deployed and managed to steady state. Harness Canary and Blue/Green Workflow default steps support a single…
sidebar_position: 30
helpdocs_topic_id: 6ujb3c70fh
helpdocs_category_id: yp3yaavhla
helpdocs_is_private: false
helpdocs_is_published: true
---

In Harness, a **managed** Kubernetes workload is a Deployment, StatefulSet, or DaemonSet object deployed and managed to steady state.

Harness Canary and Blue/Green Workflow default steps support a single **Deployment** or **StatefulSet** workload as a managed entity.

Rolling Workflow default steps support Deployment, StatefulSet, or DaemonSet as **managed** workloads, but not Jobs.

You can deploy any Kubernetes workload in any Workflow type by using a Harness [annotation](versioning-and-annotations.md#annotations) to make it unmanaged (`harness.io/direct-apply`).

The [Apply Step](../../../../continuous-delivery/kubernetes-deployments/deploy-manifests-separately-using-apply-step.md) can deploy any workloads or objects in any Workflow type as a managed workload, including [Jobs](../../../../continuous-delivery/kubernetes-deployments/run-kubernetes-jobs.md). Workloads deployed with the Apply step are not rollback on failure.

**OpenShift:** Harness supports OpenShift [DeploymentConfig](https://docs.openshift.com/container-platform/4.1/applications/deployments/what-deployments-are.html) in OpenShift clusters as a managed workload across Canary, Blue Green, and Rolling deployment strategies. Please use `apiVersion: apps.openshift.io/v1` and not `apiVersion: v1`.

See [Using OpenShift with Harness Kubernetes](../../../../continuous-delivery/kubernetes-deployments/using-open-shift-with-harness-kubernetes.md).

### Rolling vs Apply

The following table lists the differences between the Rollout Deployment step (default in a Rolling Workflow type) and the Apply step (which may be used in any Workflow type).



|  |  |  |  |
| --- | --- | --- | --- |
|  | **Jobs** | **Rollback** | **Track to Steady State** |
| **Rollout Deployment step** | No | Yes | Yes |
| **Apply step** | Yes | No | Yes, by default. You can the skip steady state check using the **Skip Steady State Check** option.  |

