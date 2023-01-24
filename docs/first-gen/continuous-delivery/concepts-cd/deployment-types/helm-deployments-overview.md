---
title: Native Helm Deployments Overview
description: A summary of Harness Helm implementation.
# sidebar_position: 2
helpdocs_topic_id: 583ojfgg49
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/lbhf2h71at).Harness includes both Kubernetes and Helm deployments, and you can use Helm charts in both. Harness [Kubernetes](../../kubernetes-deployments/kubernetes-deployments-overview.md) integration allows you to use your own Helm chart (remote or local), and Harness executes the Kubernetes API calls to build everything without Helm and Tiller (for Helm v2) needing to be installed in the target cluster. See [Link Resource Files or Helm Charts in Git Repos](../../kubernetes-deployments/link-resource-files-or-helm-charts-in-git-repos.md).This topic describes the concept of a Harness **Native Helm** deployment by describing the high-level steps involved.

For a quick tutorial on using Helm with a Harness Kubernetes deployment, see the [Helm Quickstart](https://docs.harness.io/article/2aaevhygep-helm-quickstart).

Harness supports Helm v2 and v3.

### Before You Begin

Before learning about Harness Helm-based Kubernetes deployments, you should have an understanding of [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### Native Helm or Kubernetes Deployments?

Harness includes both Kubernetes and Helm deployments, and you can use Helm charts in both. Here's the difference:

* Harness [Kubernetes Deployments](../../kubernetes-deployments/kubernetes-deployments-overview.md) allow you to use your own Kubernetes manifests or a Helm chart (remote or local), and Harness executes the Kubernetes API calls to build everything without Helm and Tiller needing to be installed in the target cluster.  
Harness Kubernetes deployments also support all deployment strategies (Canary, Blue/Green, Rolling, etc).
* For Harness [Native Helm Deployments](../../helm-deployment/helm-deployments-overview.md), you must always have Helm and Tiller (for Helm v2) running on one pod in your target cluster. Tiller makes the API calls to Kubernetes in these cases. You can perform a Basic or Rolling deployment strategy only (no Canary or Blue Green). For Harness Native Helm v3 deployments, you no longer need Tiller, but you are still limited to Basic or Rolling deployments.
	+ **Versioning:** Harness Kubernetes deployments version all objects, such as ConfigMaps and Secrets. Native Helm does not.
	+ **Rollback:** Harness Kubernetes deployments will roll back to the last successful version. Native Helm will not. If you did 2 bad Native Helm deployments, the 2nd one will just rollback to the 1st. Harness will roll back to the last successful version.

### What Does Harness Need Before You Start?

A Harness **Native Helm** deployment requires the following:

* Artifact: For example, a Docker image of NGINX from Docker Hub.
* Kubernetes cluster: You will need a target cluster for the Harness Delegate, your application, and your Kubernetes workloads. A Kubernetes Delegate requires at least 8GB RAM, and so your cluster should have enough RAM to host the Delegate and your applications and workloads.
* Helm and Tiller **for Helm v2 only**: Helm and Tiller installed and running on one pod in the cluster.
	+ **If you are using Helm v3:** You do not need Tiller installed. Tiller is not used in Helm v3.
	+ When you install and run a new Harness Delegate, [Harness includes Helm 3 support automatically](https://docs.harness.io/article/ymw96mf8wy-use-custom-helm-binaries-on-harness-delegates).
* Helm chart: For example, a Bitnami Helm chart for NGINX from their Github repo.

### What Does Harness Deploy?

Harness takes the artifacts and Helm chart and version you provide and deploys the artifact to the target Kubernetes cluster.

### What Does a Harness Helm Deployment Involve?

The following list describes the major steps of a Harness Helm deployment:



|  |  |  |
| --- | --- | --- |
| **Step** | **Name** | **Description and Links** |
| 1 | Install the Harness Kubernetes or Helm **Delegate**.  | Typically, the Kubernetes or Helm Delegate is installed in the target cluster where you will deploy your application(s).You can also install the Helm Delegate using Rancher. |
| 2 | Add a Harness **Artifact Server**. | Add a Harness **Artifact Server**. For example, a Docker Registry Artifact Server that connects to the Docker registry where your Docker images are located, or the public Docker Hub. |
| 3 | Add a Helm Chart or Source Repository. | Add your Helm chart using a Helm Chart or Source Repository. |
| 4 | Add a **Cloud Provider**. | A Cloud Provider is a connection to your Kubernetes cluster.You can add a Kubernetes Cluster Cloud Provider (recommended) or a Cloud Provider for the cloud platform where the cluster is hosted, such as a Google Cloud Platform Cloud Provider. A Kubernetes Cluster Cloud Provider will connect to any cluster on any platform.In you use a Kubernetes Cluster Cloud Provider, you can use the Delegate installed in your cluster for authentication. |
| 5 | Create the Harness **Application** for your Kubernetes CD Pipeline. | The Harness Application represents a group of microservices/apps, their deployment pipelines, and all the building blocks for those pipelines. Harness represents your release process using a logical group of one or more entities: Services, Environments, Workflows, Pipelines, Triggers, and Infrastructure Provisioners. Applications organize all of the entities and configurations in Harness CD. |
| 6 | Create the Harness **Service** using the **Native Helm** Deployment Type. | Add your Helm charts and any config variables and files. |
| 7 | Create the Harness **Environment** and Infrastructure Definition for your target Kubernetes clusters, and any overrides. | Using the Harness Cloud Provider you set up, you can select the target Kubernetes cluster and namespace for your deployment.You can also override any Service settings, such as manifest values. This enables you to use a single Service with multiple Harness Environments. |
| 8 | Create the Basic Helm deployment Harness **Workflow**. | The Workflow deploys the artifact(s) and Kubernetes workloads defined in the Harness Service Helm charts to the cluster and namespace in the Harness Infrastructure Definition. |
| 9 | Deploy the Workflow. | Once you've deployed a Workflow, learn how to improve your Kubernetes CD: <br />&bull;&nbsp; [Workflows](https://docs.harness.io/article/m220i1tnia-workflow-configuration) <br />&bull;&nbsp;  [Triggers](https://docs.harness.io/article/xerirloz9a-add-a-trigger-2)  <br />&bull;&nbsp;  [Infrastructure Provisioners Overview](https://docs.harness.io/article/o22jx8amxb-add-an-infra-provisioner) |

### Next Steps

Read the following topics to build on what you've learned:

* [Helm How-tos](https://docs.harness.io/category/native-helm-deployments)
* Blog on Helm support in Harness Kubernetes deployments, [Helm Support for Harness Continuous Delivery](https://harness.io/2019/05/helm-support-for-harness-continuous-delivery/).

