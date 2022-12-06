---
title: Tanzu Application Service Deployment Overview
description: A summary of Harness Pivotal implementation.
# sidebar_position: 2
helpdocs_topic_id: ekaesq5wwg
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the concept of a Harness Tanzu Application Service (TAS, formerly Pivotal Cloud Foundry) deployment by describing the high-level steps involved.

Pivotal Cloud Foundry (PCF) was purchased by VMWare and renamed to Tanzu Application Service (TAS). For a quick tutorial, see the [Tanzu Application Service Quickstart](https://docs.harness.io/article/hy819vmsux-pivotal-cloud-foundry-quickstart).

For detailed instructions on using TAS in Harness, see the [Tanzu Application Service How-tos](https://docs.harness.io/category/tanzu-application-service-(https://docs.harness.ioformerly-pivotal)).

### Before You Begin

Before learning about Harness TAS deployments, you should have an understanding of [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### What Does Harness Need Before You Start?

A Harness TAS deployment requires the following:

* Artifact: For example, a Docker image of NGINX from Docker Hub.
* Target TAS Organization and Space for the deployment.

### What Does Harness Deploy?

Harness takes the artifacts and TAS specs you provide and deploys them to the target TAS Organization and Space.

You can use CLI plugins in your deployments. The App Autoscaler plugin has first-class support in Harness, enabling you to ensure app performance and control the cost of running apps. See [Use CLI Plugins in Harness Tanzu Deployments](../../pcf-deployments/use-cli-plugins-in-harness-pcf-deployments.md).

### What Does a Harness TAS Deployment Involve?

The following list describes the major steps of a Harness TAS deployment:



|  |  |  |
| --- | --- | --- |
| **Step** | **Name** | **Description and Links** |
| 1 | Install the Harness **Delegate** in your target TAS infrastructure.  | Typically, the Delegate is installed in the target space where you will deploy your application(s).If you are running your TAS Cloud in AWS, you can use a Shell Script Delegate run on an EC2 instance in the same VPC and subnet as your TAS Cloud, or an ECS Delegate run in an ECS cluster in the same VPC. |
| 2 | Add a Harness **Artifact Server**. | Add a Harness **Artifact Server**. For example, a Docker Registry Artifact Server that connects to the Docker registry where your Docker images are located, or the public Docker Hub. |
| 3 | Add a **Cloud Provider**. | A Cloud Provider is a connection to your TAS API endpoint URL. For example, **api.run.pivotal.io**. |
| 4 | Create the Harness **Application** for your TAS CD Pipeline. | The Harness Application represents a group of microservices, their deployment pipelines, and all the building blocks for those pipelines. Harness represents your release process using a logical group of one or more entities: Services, Environments, Workflows, Pipelines, Triggers, and Infrastructure Provisioners. Applications organize all of the entities and configurations in Harness CD.See [Create an Application](https://docs.harness.io/article/bucothemly-application-configuration). |
| 5 | Create the Harness **Service** using the TAS Deployment Type. | Add your TAS specs and any config variables and files. |
| 6 | Create the Harness **Environment** and Infrastructure Definition for your target TAS org and space, and any overrides. | Using the Harness Cloud Provider you set up, you can select the target TAS org and space for your deployment.You can also override any Service settings, such as manifest values. This enables you to use a single Service with multiple Harness Environments. |
| 7 | Create the Canary, Blue/Green, or Basic deployment Harness **Workflow**. | The Workflow deploys the artifact(s), TAS apps and routes defined in the Harness Service to the org and space in the Harness Infrastructure Definition. |
| 8 | Deploy the Workflow. | Once you've deployed a Workflow, learn how to improve your TAS CD: <br />&bull;&nbsp; [Workflows](https://docs.harness.io/article/m220i1tnia-workflow-configuration) <br />&bull;&nbsp;  [Triggers](https://docs.harness.io/article/xerirloz9a-add-a-trigger-2) <br />&bull;&nbsp; [Infrastructure Provisioners Overview](https://docs.harness.io/article/o22jx8amxb-add-an-infra-provisioner) |

### Next Steps

Read the following topics to build on what you've learned:

* [Tanzu Application Service (TAS) Quickstart](https://docs.harness.io/article/hy819vmsux-pivotal-cloud-foundry-quickstart)
* [TAS How-tos](https://docs.harness.io/category/tanzu-application-service-(https://docs.harness.ioformerly-pivotal))

