---
title: ECS Deployments Overview
description: An overview of ECS components and deployment steps.
sidebar_position: 100
helpdocs_topic_id: 08whoizbps
helpdocs_category_id: df9vj316ec
helpdocs_is_private: false
helpdocs_is_published: true
---

This guide explains how to use Amazon Elastic Container Service (ECS) with Harness.

New to using ECS with Harness? See [AWS ECS Quickstart](https://docs.harness.io/article/j39azkrevm-aws-ecs-deployments).In this guide, we will set up Harness for ECS, create a Harness Application, and deploy a public Docker image from Docker Hub to an existing ECS cluster using Harness. This deployment scenario is very popular and a walkthrough of all the steps involved will help you set up this scenario in Harness for your own microservices and apps.

Walk through this guide in the following order:

* [Component Overview](ecs-deployments-overview.md#component-overview)
* [Prerequisites](ecs-deployments-overview.md#prerequisites)
* [Deployment Overview](ecs-deployments-overview.md#deployment-overview)
* [1 - Harness ECS Delegate](harness-ecs-delegate.md)
* [2 - ECS Connectors and Providers Setup](ecs-connectors-and-providers-setup.md)
* [3 - ECS Services](ecs-services.md)
* [4 - ECS Environments](ecs-environments.md)
* [5 - ECS Basic and Canary Workflows](ecs-workflows.md)
* [6 - ECS Blue/Green Workflows](ecs-blue-green-workflows.md)
* [7 - ECS Setup in YAML](ecs-setup-in-yaml.md)
* [8 - ECS Troubleshooting](ecs-troubleshooting.md)

### Component Overview

The following table lists the ECS components and where they are set up in Harness, as well as the related Harness components that perform ECS deployment operations. For detailed explanations of ECS, see the [ECS Developer Guide](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html) from Amazon.



|  |  |  |
| --- | --- | --- |
| **Component** | **Description** | **Harness Location** |
| Harness Delegate | A software service you run in the same VPC as the ECS cluster to enable Harness to perform deployment operations. The Delegate does not need root privileges, and it only makes an outbound HTTPS connection to the Harness platform. | This guide will describe how to set up the Harness Delegate for ECS deployment.See [Harness ECS Delegate](harness-ecs-delegate.md). |
| Harness Cloud Provider | A Cloud Provider is a logical representation of your AWS infrastructure. Typically, a Cloud Provider is mapped to a AWS account, Kubernetes cluster, Google service account, Azure subscription, or a data center. | This guide will describe how to set up the AWS Cloud Provider for ECS deployment.For general information, see [ECS Connectors and Providers Setup](ecs-connectors-and-providers-setup.md). |
| ECS Task Definition | Describes the Docker containers to run (CPU, memory, environment variables, ports, etc) and represents your application. | Specified in the Harness Service, in Container Specification. |
| ECS Task | Instance of a Task Definition. Multiple Tasks can be created by one Task Definition, as demand requires. |  |
| ECS Service | Defines the minimum and maximum Tasks from one Task Definition to run at any given time, autoscaling, and load balancing. | This is specified in the Harness Service, in Service Specification. |
| ECS Cluster | A Cluster is a group of ECS Container Instances where you run your service tasks in order for them to be accessible. The container management service handles the cluster across one or more ECS Container Instance(s), including the scheduling, maintaining, and scaling requests to these instances. | ECS Clusters are selected in two Harness components:* The AWS Cloud Provider, via the IAM role for Delegate option.
* Harness application Environment, where you select the AWS Cloud provider, and your ECS cluster name. |
| Launch Types | There are two types: <br /><br />&bull;&nbsp; Fargate - Run containers without having to manage servers or clusters of Amazon EC2 instances.<br /> <br />&bull;&nbsp; EC2 - Run containers on a cluster of Amazon EC2 instances that you manage. | You specify the launch type to use when adding a Service Infrastructure to a Harness Environment. |
| Replica Scheduling Strategy | Places and maintains the desired number of tasks across your cluster. | This is specified in the Harness Service, in Service Specification. |
| Daemon Scheduling Strategy | As of July 2018, ECS has a daemon scheduling strategy that deploys exactly one task on each active container instance that meets all of the task placement constraints that you specify in your cluster.With a daemon strategy, a task is deployed onto each instance in a cluster to provide common supporting functionality. | This is specified in the Harness Service, in Service Specification. |
| awsvpc Network Mode | Provides each task with its own elastic network interface. Fargate task definitions require the awsvpc network mode. |  |
| Service Discovery | An ECS service can use the ECS Service Discovery to manage HTTP and DNS namespaces for ECS services via the AWS Cloud Map API actions. | This is specified in the Harness Service, in Service Specification. |
| Auto Scaling | Auto Scaling adjusts the ECS desired count up or down in response to CloudWatch alarms. | This is specified in the Harness Workflow ECS Service Setup command. |

### Prerequisites

* One or more existing ECS clusters:
	+ You will need an ECS cluster to deploy your ECS services using Harness.
	+ If you use a Harness ECS Delegate (recommended), you will need an ECS cluster for the Delegate. The steps for setting up an ECS Delegate are in [Harness ECS Delegate](harness-ecs-delegate.md).
* If you want to run a Harness Shell Script Delegate on an EC2 instance in the same VPC as the ECS cluster, ensure it meets the Harness [Delegate Requirements](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#delegate_requirements).
* IAM Role for the Harness Cloud Provider connection to AWS. The policies are listed in [ECS (Existing Cluster)](https://docs.harness.io/article/whwnovprrb-infrastructure-providers#ecs_existing_cluster) and also described in this document.

### Deployment Overview

This guide takes you through setting up ECS Deployment using the following steps:

1. Install and run the Harness ECS Delegate in an ECS cluster in your VPC.
2. Add an AWS Cloud Provider that uses the IAM role of the Harness ECS Delegate. You can also create a Cloud Provider that uses another AWS account with the required ECS permissions, but using the Delegate is the easiest method.
3. Create a Harness Application for ECS.
4. Add a Harness Service. We will cover the following ECS features when we add a service:
	1. Replica Strategy.
	2. Daemon Strategy.
	3. awsvpc Network Mode.
	4. Service Discovery.
5. Add an Environment and ECS Service Infrastructure.
6. Add a Workflow:
   * Canary Deployment with Replica Scheduling.
   * Basic Deployment with Daemon Scheduling.
   * Blue/Green Workflow.
7. Deploy an ECS Workflow.

### Rollbacks

See [ECS Rollbacks](https://docs.harness.io/article/d7rnemtfuz-ecs-rollback).

### Next Step

[1 - Harness ECS Delegate](harness-ecs-delegate.md)

