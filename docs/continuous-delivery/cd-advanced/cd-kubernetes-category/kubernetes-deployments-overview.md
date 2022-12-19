---
title: Kubernetes Deployments Basics
description: This topic describes the high-level steps involved in a Harness Kubernetes Deployment.
sidebar_position: 1
helpdocs_topic_id: u29v1uc1mh
helpdocs_category_id: qfj6m1k2c4
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the concept of a Harness Kubernetes deployment by describing the high-level steps involved.

For a quick tutorial, see the [Kubernetes deployment tutorial](../../onboard-cd/cd-quickstarts/kubernetes-cd-quickstart.md).

## Before You Begin

Before learning about, you should have an understanding of the following:

* [Learn Harness' Key Concepts](../../../getting-started/learn-harness-key-concepts.md)

## What Does Harness Need Before You Start?

A Harness Kubernetes deployment requires the following:

1. Kubernetes manifests and values YAML files.
2. Artifact, if not hardcoded in manifests or values file. For example, a Docker image of NGINX from Docker Hub.
3. Kubernetes cluster: You will need a target cluster for the Harness Delegate, your app, and your Kubernetes workloads. Your cluster should have enough RAM to host the Delegate and your apps and workloads.

## What Does Harness Deploy?

Harness takes the artifacts and Kubernetes manifests you provide and deploys them to the target Kubernetes cluster. You can simply deploy Kubernetes objects via manifests. You can provide manifests using remote sources and Helm charts.

## What is a Workload in Harness?

Harness deployments involve different strategies and steps. These strategies and steps support different Kubernetes objects as managed and unmanaged workloads.

See [What Can I Deploy in Kubernetes?](../../cd-technical-reference/cd-k8s-ref/what-can-i-deploy-in-kubernetes.md) for details on each strategy and workload support.

The following tables provide a useful summary.

### Managed Workloads Table

In Harness, a **managed** Kubernetes workload is a Kubernetes object deployed and managed to steady state. If steady state is not reached, the deployment is considered a failure and the Failure Strategy is executed (typically rollback).



|  | **Apply** | **Rolling** | **Rollback** | **Blue Green** | **Canary** | **Scale** |
| --- | --- | --- | --- | --- | --- | --- |
| **Deployment** | Yes | Yes | Yes | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes |
| **StatefulSet** | Yes | Yes | Yes | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes |
| **DaemonSet** | Yes | Yes | Yes | No | No | Yes |
| **CRDs** | Yes | Yes | Yes | No | No | No |
| **Any Object** | Yes | No | No | No | No | No |

### Unmanaged Workloads Table

To deploy an object outside of the managed workloads in any strategy, you use the Harness [annotation](../../cd-technical-reference/cd-k8s-ref/kubernetes-annotations-and-labels.md) to make it unmanaged: `harness.io/direct-apply: "true"|"false"`. Set to `true` to make a manifest an unmanaged workload.

For example, Harness Canary and Blue/Green steps support a single **Deployment** or **StatefulSet** workload as a managed entity, but you can deploy additional workloads as unmanaged using the `harness.io/direct-apply:true` annotation.

|  | **Apply** | **Rolling** | **Rollback** | **Blue Green** | **Canary** | **Scale** |
| --- | --- | --- | --- | --- | --- | --- |
| **Any Object** | Yes | Yes | No | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | No |

## What Does a Harness Kubernetes Deployment Involve?

All the steps necessary can be performed inline with creating your CD Pipeline. You can also set up resources like Connectors in your Resources and then select them within your Pipeline.

The following list describes the major steps of a Harness Kubernetes deployment. We assume you have a [Harness Project](../../../platform/1_Organizations-and-Projects/1-projects-and-organizations.md) set up.

| **Step** | **Name** | **Description and Links** |
| --- | --- | --- |
| 1 | Install the Harness Kubernetes **Delegate** in your Kubernetes cluster.  | Typically, the Kubernetes Delegate is installed in the target cluster where you will deploy your application(s).<br/>See [Install a Kubernetes Delegate](../../../platform/2_Delegates/delegate-guide/install-a-kubernetes-delegate.md). |
| 2 | Add Harness **Connectors**. | Add a Harness **Connector** for you artifact repo and target cluster.<br/>For example, a Docker Registry Artifact Server that connects to the Docker registry where your Docker images are located, or the public Docker Hub.You can connect to specific target cloud platforms hosting your cluster or simply make a platform-agnostic connection to the cluster.<br/>This can be done inline while creating your Pipeline, or separately in your **Resources**.<br/>See [Connect to an Artifact Repo](../../../platform/7_Connectors/connect-to-an-artifact-repo.md) and [Kubernetes Cluster Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md). |
| 3 | Define the Harness **Service** using the Kubernetes Deployment Type. | Add your Docker images and Kubernetes manifests and any config variables and files.<br/>See [Add Container Images for Kubernetes Deployments](add-artifacts-for-kubernetes-deployments.md). |
| 6 | Define the Harness **Environment** and Infrastructure Definition for your target Kubernetes clusters, and any overrides. | Using the Harness Connector you set up, you can select the target Kubernetes cluster and namespace for your deployment.<br/>See [Define Your Kubernetes Target Infrastructure](../../cd-infrastructure/kubernetes-infra/define-your-kubernetes-target-infrastructure.md). |
| 7 | Add the Canary, Blue/Green, or Rollout steps to the Deploy stage. | The stage deploys the artifact(s) and Kubernetes workloads defined in the Harness Service to the cluster and namespace in the Infrastructure Definition.<br/>See: [Create a Kubernetes Rolling Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-rolling-deployment.md),  [Create a Kubernetes Canary Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-canary-deployment.md), [Create a Kubernetes Blue/Green Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-blue-green-deployment.md) |
| 8 | Deploy the Pipeline. | Once you've deployed a Pipeline, learn how to improve your Kubernetes CD in [Kubernetes how-tos](/docs/category/kubernetes). | 

## Next Steps

Read the following topics to build on what you've learned:

* [Kubernetes deployment tutorial](../../onboard-cd/cd-quickstarts/kubernetes-cd-quickstart.md) tutorial
* [Kubernetes How-tos](/docs/category/kubernetes)

