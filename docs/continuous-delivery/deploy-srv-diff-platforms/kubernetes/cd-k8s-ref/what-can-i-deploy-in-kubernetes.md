---
title: What can I deploy in Kubernetes?
description: Differences between managed and unmanaged workloads.
sidebar_position: 1
helpdocs_topic_id: efnlvytc6l
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness deployments involve different strategies and steps. These strategies and steps support different Kubernetes objects as managed and unmanaged workloads.

This topic describes the differences between Harness managed and unmanaged workloads and the objects supported by each deployment strategy.

## Managed and Unmanaged Workloads

In Harness, a **managed** Kubernetes workload is a Kubernetes object deployed and managed to steady state. If steady state is not reached, the deployment is considered a failure and the Failure Strategy is executed (typically rollback).

An unmanaged workload is a workload deployed separate from your primary workload, such as [Kubernetes Jobs](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/run-kubernetes-jobs). Harness does not track these workload versions or perform rollback on them.

## Canary and Blue Green Strategies

Harness Canary and Blue Green steps support a single **Deployment** or **StatefulSet** workload as a managed entity. You cannot deploy 0 or more than 1 **Deployment** or **StatefulSet** workload.

## Rolling (Rollout) Strategy

Rolling strategy steps support Deployment, StatefulSet, or DaemonSet as **managed** workloads, but not other workloads such as Jobs.

## Apply Step

The [Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step) can deploy any workloads or objects in any strategy as a managed workload. You can select whether or not to skip steady state check.

## OpenShift

Harness supports OpenShift [DeploymentConfig](https://docs.openshift.com/container-platform/4.1/applications/deployments/what-deployments-are.html) in OpenShift clusters as a managed workload across Canary, Blue Green, and Rolling deployment strategies. Use `apiVersion: apps.openshift.io/v1` and not `apiVersion: v1`.

## Deploy Unmanaged Workloads using Annotation

To deploy an object outside of the managed workloads in any strategy, you use the Harness [annotation](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-annotations-and-labels) to make it unmanaged: `harness.io/direct-apply: "true"|"false"`. Set to `true` to make a manifest an unmanaged workload.

For example, Harness Canary and Blue Green steps support a single **Deployment** or **StatefulSet** workload as a managed entity, but you can deploy additional workloads as unmanaged using the `harness.io/direct-apply` annotation.

The following tables list the differences between the managed and unmanaged workloads for the different Kubernetes steps.

## Managed Workloads Table

In Harness, a **managed** Kubernetes workload is a Kubernetes object deployed and managed to steady state. If steady state is not reached, the deployment is considered a failure and the Failure Strategy is executed (typically rollback).


|  | **Apply** | **Rolling** | **Rollback** | **Blue Green** | **Canary** | **Scale** |
| --- | --- | --- | --- | --- | --- | --- |
| **Deployment** | Yes | Yes | Yes | Yes<br/>1 Deployment or StatefulSet mandatory/allowed | Yes<br/>1 Deployment or StatefulSet mandatory/allowed | Yes |
| **StatefulSet** | Yes | Yes | Yes | Yes<br/>1 Deployment or StatefulSet mandatory/allowed | Yes<br/>1 Deployment or StatefulSet mandatory/allowed | Yes |
| **DaemonSet** | Yes | Yes | Yes | No | No | Yes |
| **HorizontalPodAutoscaler** | No | No | No | Yes<br/>Behind the feature flag, `CDS_SUPPORT_HPA_AND_PDB_NG`. | Yes<br/>Behind the feature flag, `CDS_SUPPORT_HPA_AND_PDB_NG`. | No |
| **PodDisruptionBudget** | No | No | No | Yes<br/>Behind the feature flag, `CDS_SUPPORT_HPA_AND_PDB_NG`. | Yes<br/>Behind the feature flag, `CDS_SUPPORT_HPA_AND_PDB_NG`. | No |
| **CRDs** | Yes | Yes | Yes | No | No | No |
| **Any Object** | Yes | No | No | No | No | No |

## Unmanaged Workloads Table

To deploy an object outside of the managed workloads in any strategy, you use the Harness [annotation](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-annotations-and-labels) to make it unmanaged: `harness.io/direct-apply: "true"|"false"`. Set to `true` to make a manifest an unmanaged workload.

For example, Harness Canary and Blue/Green steps support a single **Deployment** or **StatefulSet** workload as a managed entity, but you can deploy additional workloads as unmanaged using the `harness.io/direct-apply:true` annotation.



|  | **Apply** | **Rolling** | **Rollback** | **Blue Green** | **Canary** | **Scale** |
| --- | --- | --- | --- | --- | --- | --- |
| **Any Object** | Yes | Yes | No | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | No |

