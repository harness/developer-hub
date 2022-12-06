---
title: IIS (.NET) Deployments Overview
description: A summary of Harness IIS (.NET) implementation.
# sidebar_position: 2
helpdocs_topic_id: bq9938fbk8
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the concept of a Harness IIS (.NET) deployment by describing the high-level steps involved.

For a quick tutorial, see [IIS (.NET) Quickstart](https://docs.harness.io/article/2oo63r9rwb-iis-net-quickstart).

For detailed instructions on using IIS (.NET) in Harness, see the [IIS (.NET)](https://docs.harness.io/category/iis-(https://docs.harness.io.net)-deployments) How-tos.

### Before You Begin

Before learning about Harness IIS (.NET) deployments, you should have an understanding of [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### Video Summary

Here is a quick primer on deploying Microsoft IIS .NET applications and Microsoft .NET Core container applications using Harness Continuous Delivery.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/udWD4LoG_R4" />


### What Does Harness Need Before You Start?

A Harness IIS (.NET) deployment requires the following:

* Templates: IIS website, application, or virtual directory. Harness automatically creates the Deployment Specifications for these templates, which you can customize.
* Target infrastructure: For example, an AWS region and load balancer or an Azure subscription and resource group.

It is important to note that a site contains one or more applications, an application contains one or more virtual directories, and a virtual directory maps to a physical directory on a computer. To use Harness to deploy IIS sites, applications, and virtual directories, the IIS structural requirements (site > application > virtual directory) must be established on the Windows instances.

### What Does Harness Deploy?

Harness takes the IIS website, application, or virtual directory templates and deployment specifications you provide, and creates an IIS website, application, or virtual directory in your target infrastructure.

You can create a Harness Pipeline that runs three Workflows to deploy the IIS website, application, or virtual directory in succession.

### What Does a Harness IIS (.NET) Deployment Involve?

The following list describes the major steps of a Harness IIS (.NET) deployment:



|  |  |  |
| --- | --- | --- |
| **Step** | **Name** | **Description and Links** |
| 1 | Install the Harness **Delegate** in your target infrastructure, such as an EC2 subnet. | Typically, the Shell Script or ECS Delegate is installed in the same subnet where you will deploy your application(s).For Azure deployments, you can run the Delegate on a Linux VM in your Azure VPC (such as Ubuntu) or simply ensure that the Delegate has network access to resources in your Azure VPC |
| 2 | Add a Harness **Artifact Server**. | Add a connection to the Artifact Server where Harness can pull the IIS website, application, or virtual directory template.If you are using the same Cloud Provider as artifact server, then you can skip this step. |
| 3 | Add a **Cloud Provider**. | A Cloud Provider is a connection to your cloud platform account, such as AWS or Azure. You can also connect to a physical server.For example, an AWS Cloud Provider can be used to connect to S3 and obtain the IIS templates Harness will use to create new website, application, or virtual directory templates. |
| 4 | Create the Harness **Application** for your IIS (.NET) CD Pipeline. | The Harness Application represents a group of microservices/apps, their deployment pipelines, and all the building blocks for those pipelines. Harness represents your release process using a logical group of one or more entities: Services, Environments, Workflows, Pipelines, Triggers, and Infrastructure Provisioners. Applications organize all of the entities and configurations in Harness CD. |
| 5 | Create the Harness **Service** using the **Windows Remote Management (WinRM)** Deployment Type. | Add an IIS website, application, or virtual directory template in a Harness Service, revise the Deployment Specification, and any config variables and files. |
| 6 | Create the Harness **Environment** and Infrastructure Definition for your deployment, and any overrides. | Using the Harness Cloud Provider you set up, you can select the target environment for your deployment.You can also override any Service settings. This enables you to use a single Service with multiple Harness Environments. |
| 7 | Create the Website, Application, and Virtual Directory deployments in Harness Basic **Workflows**. | The Workflow deploys the Website, Application, and Virtual Directory templates defined in the Harness Service to the environment in the Harness Infrastructure Definition. |
| 8 | Deploy the Workflow. | Once you've deployed a Workflow, learn how to improve your IIS (.NET) CD: <br />&bull;&nbsp; [Workflows](https://docs.harness.io/article/m220i1tnia-workflow-configuration) <br />&bull;&nbsp; [Triggers](https://docs.harness.io/article/xerirloz9a-add-a-trigger-2) <br />&bull;&nbsp; [Infrastructure Provisioners Overview](https://docs.harness.io/article/o22jx8amxb-add-an-infra-provisioner) |

### Next Steps

Read the following topics to build on what you've learned:

* [IIS (.NET) Quickstart](https://docs.harness.io/article/2oo63r9rwb-iis-net-quickstart)
* [IIS (.NET)](https://docs.harness.io/category/iis-(https://docs.harness.io.net)-deployments) How-tos

