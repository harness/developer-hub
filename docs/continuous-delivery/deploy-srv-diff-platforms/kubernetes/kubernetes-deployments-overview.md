---
title: Kubernetes deployments basics
description: High-level steps involved in a Harness Kubernetes deployment.
sidebar_position: 1
---

This topic describes the concept of a Harness Kubernetes deployment by describing the high-level steps involved.

For a quick tutorial, see the [Kubernetes deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart).

Learn [Harness' Key Concepts](/docs/getting-started/learn-harness-key-concepts) before you review Kubernetes deployment basics.

## Before you begin

A Harness Kubernetes deployment requires the following:

* Kubernetes manifests and values YAML files.
* Artifact, if not hardcoded in manifests or values file. For example, a Docker image of NGINX from Docker Hub.
* Kubernetes cluster: You will need a target cluster for the Harness Delegate, your app, and your Kubernetes workloads. Your cluster should have enough RAM to host the Delegate and your apps and workloads.

## What does Harness deploy?

Harness takes the artifacts and Kubernetes manifests you provide and deploys them to the target Kubernetes cluster. You can simply deploy Kubernetes objects via manifests. You can provide manifests using remote sources and Helm charts.

## What is a workload in Harness?

Harness deployments involve different strategies and steps. These strategies and steps support different Kubernetes objects as managed and unmanaged workloads.

Go to [what can I deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes) for details on each strategy and workload support.

The following tables provide a useful summary.

### Managed workloads table

In Harness, a **managed** Kubernetes workload is a Kubernetes object deployed and managed to steady state. If steady state is not reached, the deployment is considered a failure and the Failure Strategy is executed (typically rollback).

| **Apply** | **Rolling** | **Rollback** | **Blue Green** | **Canary** | **Scale** |
| --- | --- | --- | --- | --- | --- | --- |
| **Deployment** | Yes | Yes | Yes | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes |
| **StatefulSet** | Yes | Yes | Yes | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes |
| **DaemonSet** | Yes | Yes | Yes | No | No | Yes |
| **CRDs** | Yes | Yes | Yes | No | No | No |
| **Any Object** | Yes | No | No | No | No | No |

### Unmanaged workloads table

To deploy an object outside of the managed workloads in any strategy, you use the Harness [annotation](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-annotations-and-labels.md) to make it unmanaged: `harness.io/direct-apply: "true"|"false"`. Set to `true` to make a manifest an unmanaged workload.

For example, Harness Canary and Blue/Green steps support a single **Deployment** or **StatefulSet** workload as a managed entity, but you can deploy additional workloads as unmanaged using the `harness.io/direct-apply:true` annotation.

| **Apply** | **Rolling** | **Rollback** | **Blue Green** | **Canary** | **Scale** |
| --- | --- | --- | --- | --- | --- | --- |
| **Any Object** | Yes | Yes | No | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | Yes:<br/>1 Deployment or StatefulSet mandatory/allowed | No |

## What does a Harness Kubernetes deployment involve?

All the steps necessary can be performed inline with creating your CD pipeline. You can also set up resources like connectors in your resources and then select them within your pipeline.

The following list describes the major steps of a Harness Kubernetes deployment. We assume you have a [Harness project](/docs/platform/organizations-and-projects/projects-and-organizations) set up.

| **Step** | **Name** | **Description and Links** |
| --- | --- | --- |
| 1 | Install the Harness Kubernetes **Delegate** in your Kubernetes cluster.  | Typically, the Kubernetes Delegate is installed in the target cluster where you will deploy your application(s).<br/>Go to [install a Kubernetes Delegate](/docs/first-gen/firstgen-platform/account/manage-delegates/install-kubernetes-delegate/) for more information. |
| 2 | Add Harness **Connectors**. | Add a Harness **Connector** for you artifact repo and target cluster.<br/>For example, a Docker Registry Artifact Server that connects to the Docker registry where your Docker images are located, or the public Docker Hub.You can connect to specific target cloud platforms hosting your cluster or simply make a platform-agnostic connection to the cluster.<br/>This can be done inline while creating your Pipeline, or separately in your **Resources**.<br/>For more information, go to [connect to an Artifact repository](/docs/platform/Connectors/connect-to-an-artifact-repo) and [Kubernetes cluster connector settings reference](/docs/platform/Connectors/ref-cloud-providers/kubernetes-cluster-connector-settings-reference). |
| 3 | Define the Harness **Service** using the Kubernetes Deployment Type. | Add your Docker images and Kubernetes manifests and any config variables and files.<br/>For more information, go to[add container images for Kubernetes deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments). |
| 6 | Define the Harness **Environment** and infrastructure definition for your target Kubernetes clusters, and any overrides. | Using the Harness Connector you set up, you can select the target Kubernetes cluster and namespace for your deployment.<br/>For more information, go to [define your Kubernetes target infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-infra/define-your-kubernetes-target-infrastructure). |
| 7 | Add the Canary, Blue Green, or Rollout steps to the Deploy stage. | The stage deploys the artifact(s) and Kubernetes workloads defined in the Harness Service to the cluster and namespace in the Infrastructure Definition.<br/>For more information, go to [create a Kubernetes Rolling deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment),  [create a Kubernetes Canary deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment), [create a Kubernetes Blue Green deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment) |
| 8 | Deploy the pipeline. | Once you've deployed a Pipeline, learn how to improve your Kubernetes CD in [Kubernetes how-tos](/docs/category/kubernetes). | 

## Next Steps

Read the following topics to build on what you've learned:

* [Kubernetes deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart)
* [Kubernetes How-tos](/docs/category/kubernetes)

