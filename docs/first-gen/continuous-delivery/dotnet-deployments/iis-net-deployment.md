---
title: IIS (.NET) Deployment Overview
description: Overview of deploying IIS Websites, IIS Applications, and IIS Virtual Directory.
sidebar_position: 10
helpdocs_topic_id: d485c2vy7e
helpdocs_category_id: 3lkbch7kgn
helpdocs_is_private: false
helpdocs_is_published: true
---

This guide will walk you through deploying an IIS Website, Application, and Virtual Directory using Harness. For all service types, Harness automatically creates the Deployment Specification, which you can customize.

Walk through this guide in the following order:

1. [Deployment Overview](iis-net-deployment.md#deployment-overview)
2. [Delegate and Connectors for IIS](1-delegate-and-connectors-for-iis.md)
3. [Services for IIS (.NET)](2-services-for-iis-net.md)
4. [IIS Environments in AWS and Azure](iis-environments.md)
5. [IIS Workflows and Pipelines](4-iis-workflows.md)
6. [Best Practices and Troubleshooting](5-best-practices-and-troubleshooting.md)

### Deployment Overview

Harness provides support for Microsoft IIS and .NET for Azure and AWS deployments. Your Harness applications support IIS in the following entities:

* **Services**: There are three IIS service types:
	+ IIS Website.
	+ IIS Application.
	+ IIS Virtual Directory.
	+ For all service types, Harness automatically creates the Deployment Specification, which you can customize.
* **Environments:** You can deploy your services to Windows instances in your enterprise network or VPC, such as AWS and Azure.
* **Workflows:** Harness provides Basic, Canary, Blue/Green, Multi-Phase, and Rolling Deployment options. Default Rollback, Notification, and Failure Strategies are provided and can be easily changed.
* **Pipelines and Triggers:** Create pipelines containing multiple workflows and triggers to run your workflows or pipelines automatically.

Harness provides PowerShell and WinRM support to execute workflows and communicate within the Microsoft ecosystem.

It is important to note that a site contains one or more applications, an application contains one or more virtual directories, and a virtual directory maps to a physical directory on a computer. To use Harness to deploy IIS sites, applications, and virtual directories, the IIS structural requirements (site > application > virtual directory) must be established on the Windows instances.

Before deploying the IIS website, application, or virtual directory to your Windows instances, there must be an existing [IIS Web Server Role](https://docs.microsoft.com/en-us/iis/web-hosting/web-server-for-shared-hosting/installing-the-web-server-role) on the instance. This ensures that the environment is ready for deployment. Harness IIS Website deployment requires the IIS Web Server Role. The Harness IIS Application and IIS Virtual Directory deployments require that an IIS Website exists. For more information, see [Installing IIS from the Command Line](5-best-practices-and-troubleshooting.md#installing-iis-from-the-command-line) below.For information about IIS sites, applications, and virtual directories, see [Understanding Sites, Applications, and Virtual Directories on IIS 7](https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/understanding-sites-applications-and-virtual-directories-on-iis).

#### Microsoft .NET and Azure Video Summary

Here is a quick primer on deploying Microsoft IIS .NET applications and Microsoft .NET Core container applications using Harness Continuous Delivery.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/udWD4LoG_R4" />

#### Deployment Preview

Deploying IIS websites, applications, or virtual directories using Harness is a simple process. It involves setting up your deployment environment, establishing a connection with Harness, and then using Harness to define your deployment goals.

Here are the major steps in an IIS (.NET) deployment:

1. Add connections:
	1. **WinRM Connection:** Add a WinRM connection in Harness to execute deployment steps on the remote Windows servers. The connection must use a user account with permission to execute commands on the Windows instances.
	2. **Cloud Provider:** Add a connection to the Cloud Provider where the IIS website, application, or virtual directory will be deployed, such as AWS or Azure.
	3. **Artifact Server:** Add a connection to the Artifact Server where Harness can pull the IIS website, application, or virtual directory artifacts.
2. **Application:** Add a Harness Application for your IIS website, application, or virtual directory. An application is a logical grouping of entities, such as services, environments, workflows, and triggers.
3. **Service:** Add a Harness Service in your Application for each IIS website, application, or virtual directory. This guide covers IIS Website, IIS Application, and IIS Virtual Directory.
4. **Environment:** Add a Harness Environment and an Infrastructure Definition that consists of a WinRM Deployment type and a Cloud Provider connection that specifies the deployment VPC, subnets, security groups, etc. Or, if the environment is a physical data center, specify the IP address.
5. **Workflow:** Add a Harness Workflow to deploy your website, application, or virtual directory. We will review the Workflow steps generated by Harness automatically.
6. **Deploy:** Deploy your Workflows in the following order in a Harness Pipeline:
	1. IIS Website Workflow.
	2. IIS Application Workflow.
	3. IIS Virtual Directory Workflow.
	4. Observe the deployment steps in real-time, and confirm in your VPC.
7. **Continuous Verification:** Once your deployments are successful, you can add verification steps into the workflow using your verification provider. For more information, see [Continuous Verification](https://docs.harness.io/article/myw4h9u05l-verification-providers-list).
8. **Refinements:** Add notification steps, failure strategy, and make your workflow a template for other users. For more information, see [Add a Workflow](https://docs.harness.io/article/m220i1tnia-workflow-configuration).

### Before You Begin

This guide assumes that you are familiar with Harness architecture and have downloaded the Harness delegate into your enterprise network or VPC. For more information, see:

* [Harness Requirements](https://docs.harness.io/article/70zh6cbrhg-harness-requirements)
* [Delegate Installation](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation)
* [Harness Architecture](https://docs.harness.io/article/de9t8iiynt-harness-architecture)
* [Configuration as Code](https://docs.harness.io/article/htvzryeqjw-configuration-as-code)

### Next Step

* [1 - Delegate and Connectors for IIS](1-delegate-and-connectors-for-iis.md)

