---
title: Kubernetes Deployments Overview (FirstGen)
description: Harness Kubernetes deployment high-level steps.
# sidebar_position: 2
helpdocs_topic_id: wnr5n847b1
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/u29v1uc1mh).This topic describes the concept of a Harness Kubernetes deployment by describing the high-level steps involved.

For a quick tutorial, see the [Kubernetes Quickstart](https://docs.harness.io/article/7in9z2boh6-kubernetes-quickstart) tutorial.

For detailed instructions on using Kubernetes in Harness, see the [Kubernetes How-tos](https://docs.harness.io/category/kubernetes-deployments).

This guide covers new Harness Kubernetes Deployment **Version 2** features. For **Version 1** Kubernetes and Helm deployment features, see [Harness Kubernetes v1 FAQ](https://docs.harness.io/article/dtu3ud1ok7-kubernetes-and-harness-faq).

### Before You Begin

Before learning about Harness Kubernetes deployments, you should have an understanding of [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### What Does Harness Need Before You Start?

A Harness Kubernetes deployment requires the following:

1. Artifact: For example, a Docker image of NGINX from Docker Hub.
2. Kubernetes cluster: You will need a target cluster for your application and the Harness Delegate, and your Kubernetes workloads. A Kubernetes Delegate requires at least 8GB RAM, and so your cluster should have enough RAM to host the Delegate and your applications and workloads.

### What Does Harness Deploy?

Harness takes the artifacts and Kubernetes manifests you provide and deploys them to the target Kubernetes cluster. You can simply deploy Kubernetes objects via manifests and you can provide manifests using remote sources and Helm charts.

See [What Can I Deploy in Kubernetes?](https://docs.harness.io/article/6ujb3c70fh).

### What Does a Harness Kubernetes Deployment Involve?

The following list describes the major steps of a Harness Kubernetes deployment:



|  |  |  |
| --- | --- | --- |
| **Step** | **Name** | **Description and Links** |
| 1 | Install the Harness Kubernetes **Delegate** in your Kubernetes cluster.  | Typically, the Kubernetes Delegate is installed in the target cluster where you will deploy your application(s).See [Connect to Your Target Kubernetes Platform](../../kubernetes-deployments/connect-to-your-target-kubernetes-platform.md). |
| 2 | Add a Harness **Artifact Server**. | Add a Harness **Artifact Server**. For example, a Docker Registry Artifact Server that connects to the Docker registry where your Docker images are located, or the public Docker Hub.See [Add Container Images for Kubernetes Deployments](../../kubernetes-deployments/add-container-images-for-kubernetes-deployments.md). |
| 3 | Add a **Cloud Provider**. | A Cloud Provider is a connection to your Kubernetes cluster.You can add a Kubernetes Cluster Cloud Provider (recommended) or a Cloud Provider for the cloud platform where the cluster is hosted, such as a Google Cloud Platform Cloud Provider. A Kubernetes Cluster Cloud Provider will connect to any cluster on any platform.In you use a Kubernetes Cluster Cloud Provider, you can use the Delegate installed in your cluster for authentication.See [Connect to Your Target Kubernetes Platform](../../kubernetes-deployments/connect-to-your-target-kubernetes-platform.md). |
| 4 | Create the Harness **Application** for your Kubernetes CD Pipeline. | The Harness Application represents a group of microservices, their deployment pipelines, and all the building blocks for those pipelines. Harness represents your release process using a logical group of one or more entities: Services, Environments, Workflows, Pipelines, Triggers, and Infrastructure Provisioners. Applications organize all of the entities and configurations in Harness CD.See [Application Components](https://docs.harness.io/article/bucothemly-application-configuration). |
| 5 | Create the Harness **Service** using the Kubernetes Deployment Type. | Add your Kubernetes manifests and any config variables and files.<br />See [Define Kubernetes Manifests](../../kubernetes-deployments/define-kubernetes-manifests.md). |
| 6 | Create the Harness **Environment** and Infrastructure Definition for your target Kubernetes clusters, and any overrides. | Using the Harness Cloud Provider you set up, you can select the target Kubernetes cluster and namespace for your deployment.You can also override any Service settings, such as manifest values. This enables you to use a single Service with multiple Harness Environments.<br />See [Define Your Kubernetes Target Infrastructure](../../kubernetes-deployments/define-your-kubernetes-target-infrastructure.md). |
| 7 | Create the Canary, Blue/Green, or Rollout deployment Harness **Workflow**. | The Workflow deploys the artifact(s) and Kubernetes workloads defined in the Harness Service to the cluster and namespace in the Harness Infrastructure Definition.<br />See: <br />&bull;&nbsp; [Create a Kubernetes Canary Deployment](../../kubernetes-deployments/create-a-kubernetes-canary-deployment.md) <br />&bull;&nbsp; [Create a Kubernetes Rolling Deployment](../../kubernetes-deployments/create-a-kubernetes-rolling-deployment.md) <br />&bull;&nbsp; [Create a Kubernetes Blue/Green Deployment](../../kubernetes-deployments/create-a-kubernetes-blue-green-deployment.md) |
| 8 | Deploy the Workflow. | Once you've deployed a Workflow, learn how to improve your Kubernetes CD: <br />&bull;&nbsp; [Workflows](https://docs.harness.io/article/m220i1tnia-workflow-configuration) <br />&bull;&nbsp;  [Triggers](https://docs.harness.io/article/xerirloz9a-add-a-trigger-2) <br />&bull;&nbsp;  [Provision Kubernetes Infrastructures](../../kubernetes-deployments/provision-kubernetes-infrastructures.md) |

:::note
In Harness, a workload is a Deployment, StatefulSet, or DaemonSet object deployed and managed to steady state. For Rolling Update deployments, you can deploy multiple managed workloads. For Canary and Blue/Green Workflow deployments, only one managed object may be deployed per Workflow by default. You can deploy additional objects using the **Apply Step**, but it is typically used for deploying Jobs controllers. See Apply Step in  [Deploy Manifests Separately using Apply Step](../../kubernetes-deployments/deploy-manifests-separately-using-apply-step.md).
:::

### Next Steps

Read the following topics to build on what you've learned:

* [Kubernetes Quickstart](https://docs.harness.io/article/7in9z2boh6-kubernetes-quickstart) tutorial
* [Kubernetes How-tos](../../kubernetes-deployments/kubernetes-deployments-overview.md)

