---
title: 2 - ECS Connectors and Providers Setup
description: Describes how to connect Harness to your artifact repository and to your target AWS ECS cluster.
sidebar_position: 300
helpdocs_topic_id: gpu36fl1y0
helpdocs_category_id: df9vj316ec
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to set up Harness to connect to your artifact repository and to the target AWS ECS cluster.

* **Artifact Repository** - To connect Harness to your artifact repository, you set up an Artifact Server in Harness.
* **AWS ECS Cluster** - To connect Harness to your ECS environment, you need to set up an AWS Cloud Provider in Harness. The AWS Cloud Provider you set up below uses Delegate Selectors as described in [Harness ECS Delegate](harness-ecs-delegate.md).

If your artifacts are in AWS along with your target ECS cluster, you can simply add a Harness AWS Cloud Provider and use it for all ECS deployment connections.

### Add an Artifact Server

Harness integrates with many different types of repositories and artifact providers. We call these Artifact Servers, and they help you pull your artifacts into your Harness Applications.

Add an Artifact Server for your artifact repository to your Harness account as described in [Add Artifact Servers](https://docs.harness.io/article/7dghbx1dbl-configuring-artifact-server).

Later, when you set up a Harness Service, you will use the Artifact Server to select the artifact you want to deploy:

![](./static/ecs-connectors-and-providers-setup-00.png)

If you are using Amazon Elastic Container Registry (ECR) for your artifacts, you can simply add an AWS Cloud Provider to manage your artifact and AWS deployment environment connections. Setting up an AWS Cloud Provider is described below.### Add an AWS Cloud Provider

Harness Cloud Providers represent the infrastructure of your applications, such as your ECS cluster. In this section, we will cover how to add an AWS Cloud Provider that uses the IAM role of the Harness ECS Delegate by using the Delegate Selectors.

Adding a Delegate Selector to your Delegate was discussed earlier in [Harness ECS Delegate](harness-ecs-delegate.md).

1. In **Harness**, click **Setup**.
2. Click **Cloud Providers**. The **Cloud Providers** page appears.
3. Click **Add Cloud Provider**. The **Cloud Provider** dialog appears.
4. In **Type**, select **Amazon Web Services**.
5. In **Display Name**, enter a name for the Cloud Provider, such as **aws-ecs**.
6. Select the **Assume IAM Role on Delegate** option.
7. In **Delegate Selector**, enter the Selector you gave the ECS Delegate listed in the **Harness Installations** page.
8. Click **SUBMIT**. The Cloud Provider is added.

For more information about setting up an AWS Cloud Provider, see [Add Cloud Providers](https://docs.harness.io/article/whwnovprrb-cloud-providers).

### Next Step

Now that you have an Artifact Server and AWS Cloud Provider, you can create your Harness Application and define your ECS service in its Harness Service:

* [3 - ECS Services](ecs-services.md)

