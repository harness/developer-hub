---
title: AWS ECS Deployments Overview
description: A summary of Harness AWS ECS implementation.
sidebar_position: 60
helpdocs_topic_id: 5z2kw34d7x
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the concept of a Harness ECS deployment by describing the high-level steps involved.

For a quick tutorial, see [AWS ECS Quickstart](https://docs.harness.io/article/j39azkrevm-aws-ecs-deployments).

For detailed instructions on using ECS in Harness, see the [AWS ECS How-tos](https://docs.harness.io/category/aws-ecs-deployments).

### Before You Begin

Before learning about Harness ECS deployments, you should have an understanding of [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### What Does Harness Need Before You Start?

A Harness ECS deployment requires the following:

1. Artifact: For example, a Docker image of NGINX from Docker Hub.
2. One or more existing ECS clusters:
	* You will need an ECS cluster to deploy your ECS services using Harness.
	* If you use a Harness ECS Delegate (recommended), you will need an ECS cluster for the Delegate. The steps for setting up an ECS Delegate are in [AWS ECS Quickstart](https://docs.harness.io/article/j39azkrevm-aws-ecs-deployments).
3. IAM Role for the Harness Cloud Provider connection to AWS. The policies are listed in [AWS ECS Quickstart](https://docs.harness.io/article/j39azkrevm-aws-ecs-deployments).

### What Does Harness Deploy?

Harness takes the artifact, ECS task definition, and service specification you provide, and deploys the artifact as a task in a new ECS service in the target ECS cluster.

### What Does a Harness ECS Deployment Involve?

The following list describes the major steps of a Harness ECS deployment:



|  |  |  |
| --- | --- | --- |
| **Step** | **Name** | **Description and Links** |
| 1 | Install the Harness ECS **Delegate** in your ECS cluster.  | Typically, the ECS Delegate is installed in the target cluster where you will deploy your application(s). |
| 2 | Add a Harness **Artifact Server**. | Add a Harness **Artifact Server**. For example, a Docker Registry Artifact Server that connects to the Docker registry where your Docker images are located, or the public Docker Hub. |
| 3 | Add an **AWS** **Cloud Provider**. | An AWS Cloud Provider is a connection to your AWS account.The AWS Cloud Provider is used to deploy the ECS services to the ECS cluster. |
| 4 | Create the Harness **Application** for your Kubernetes CD Pipeline. | The Harness Application represents a group of microservices, their deployment pipelines, and all the building blocks for those pipelines. Harness represents your release process using a logical group of one or more entities: Services, Environments, Workflows, Pipelines, Triggers, and Infrastructure Provisioners. Applications organize all of the entities and configurations in Harness CD. |
| 5 | Create the Harness **Service** using the Amazon EC2 Container Services (ECS) Deployment Type. | Add your ECS specs and any config variables and files.You can define specs for the following: <br />&bull;&nbsp; Replica Strategy   <br />&bull;&nbsp; Daemon Strategy   <br />&bull;&nbsp; awsvpc Network Mode   <br />&bull;&nbsp; Service Discovery |
| 6 | Create the Harness **Environment** and Infrastructure Definition for your target Kubernetes clusters), and any overrides. | Using the Harness Cloud Provider you set up, you can select the target Kubernetes cluster and namespace for your deployment.You can also override any Service settings, such as manifest values. This enables you to use a single Service with multiple Harness Environments. |
| 7 | Create the Canary, Blue/Green, or Rollout deployment Harness **Workflow**. | The Workflow deploys the artifact(s) and Kubernetes workloads defined in the Harness Service to the cluster and namespace in the Harness Infrastructure Definition. |
| 8 | Deploy the Workflow. | Once you've deployed a Workflow, learn how to improve your Kubernetes CD: <br />&bull;&nbsp; [Workflows](https://docs.harness.io/article/m220i1tnia-workflow-configuration) <br />&bull;&nbsp; [Triggers](https://docs.harness.io/article/xerirloz9a-add-a-trigger-2) <br />&bull;&nbsp; [Infrastructure Definitions](https://docs.harness.io/article/v3l3wqovbe-infrastructure-definitions) |

### Component Overview

The following table lists the ECS components and where they are set up in Harness, as well as the related Harness components that perform ECS deployment operations. For detailed explanations of ECS, see the [ECS Developer Guide](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html) from Amazon.



|  |  |  |
| --- | --- | --- |
| **Component** | **Description** | **Harness Location** |
| Harness Delegate | A software service you run in the same VPC as the ECS cluster to enable Harness to perform deployment operations. The Delegate does not need root privileges, and it only makes an outbound HTTPS connection to the Harness platform. | [AWS ECS Quickstart](https://docs.harness.io/article/j39azkrevm-aws-ecs-deployments) |
| Harness Cloud Provider | A Cloud Provider is a logical representation of your AWS infrastructure. Typically, a Cloud Provider is mapped to a AWS account, Kubernetes cluster, Google service account, Azure subscription, or a data center. | [AWS ECS Quickstart](https://docs.harness.io/article/j39azkrevm-aws-ecs-deployments) |
| ECS Task Definition | Describes the Docker containers to run (CPU, memory, environment variables, ports, etc) and represents your application. | Specified in the Harness Service, in Container Specification. |
| ECS Task | Instance of a Task Definition. Multiple Tasks can be created by one Task Definition, as demand requires. |  |
| ECS Service | Defines the minimum and maximum Tasks from one Task Definition to run at any given time, autoscaling, and load balancing. | This is specified in the Harness Service, in Service Specification. |
| ECS Cluster | A Cluster is a group of ECS Container Instances where you run your service tasks in order for them to be accessible. The container management service handles the cluster across one or more ECS Container Instance(s), including the scheduling, maintaining, and scaling requests to these instances. | ECS Clusters are selected in two Harness components: <br /><br />&bull;&nbsp; The AWS Cloud Provider, via the IAM role for Delegate option. <br /><br />&bull;&nbsp; Harness application Environment, where you select the AWS Cloud provider, and your ECS cluster name. |
| Launch Types | There are two types: <br /><br />&bull;&nbsp; Fargate - Run containers without having to manage servers or clusters of Amazon EC2 instances. <br /><br />&bull;&nbsp; EC2 - Run containers on a cluster of Amazon EC2 instances that you manage. | You specify the launch type to use when adding a Service Infrastructure to a Harness Environment. |
| Replica Scheduling Strategy | Places and maintains the desired number of tasks across your cluster. | This is specified in the Harness Service, in Service Specification. |
| Daemon Scheduling Strategy | As of July 2018, ECS has a daemon scheduling strategy that deploys exactly one task on each active container instance that meets all of the task placement constraints that you specify in your cluster.With a daemon strategy, a task is deployed onto each instance in a cluster to provide common supporting functionality. | This is specified in the Harness Service, in Service Specification. |
| awsvpc Network Mode | Provides each task with its own elastic network interface. Fargate task definitions require the awsvpc network mode. |  |
| Service Discovery | An ECS service can use the ECS Service Discovery to manage HTTP and DNS namespaces for ECS services via the AWS Cloud Map API actions. | This is specified in the Harness Service, in Service Specification. |
| Auto Scaling | Auto Scaling adjusts the ECS desired count up or down in response to CloudWatch alarms. | This is specified in the Harness Workflow ECS Service Setup command. |

### Next Steps

Read the following topics to build on what you've learned:

* [AWS ECS Quickstart](https://docs.harness.io/article/j39azkrevm-aws-ecs-deployments).
* [AWS ECS How-tos](https://docs.harness.io/category/aws-ecs-deployments).

