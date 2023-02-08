---
title: Services and environments overview
description: Learn the basics of CD services and environments.
sidebar_position: 3
helpdocs_topic_id: 9ryi1ay01f
helpdocs_category_id: dxej4ug0n5
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes Harness Continuous Delivery (CD) services and environments.


If you are new to Harness, please review [Harness key concepts](../../../getting-started/learn-harness-key-concepts.md) and [CD pipeline modeling overview](cd-pipeline-modeling-overview.md).


### Services and environments summary

Let's review services and environments:

* **Services represent your microservices and other workloads.**
	+ Each service contains a **Service Definition** that defines your deployment artifacts, manifests or specifications, configuration files, and service-specific variables.
* **Environments represent your deployment targets (QA, Prod, etc).**
	+ Each Environment contains one or more **Infrastructure Definitions** that list your target clusters, hosts, namespaces, etc.


Let's look at how you can create and manage services and environments.

### Creating services

Services can be created from inside or outside of a Pipeline.

To create a Service from outside of a pipeline, you use **Services** in the navigation pane.

![](./static/services-and-environments-overview-09.png)

To create a service from inside of a Pipeline, select **New Service** in the **Services** tab of a new CD stage.

![](./static/services-and-environments-overview-10.png)

When you create the new service you define its **Service Definition**. For example, Kubernetes **Service Definition** with a Kubernetes manifest and Docker artifact.

Once the service and its service definition are saved, you can select it in any pipeline.

When you select the service in a pipeline, you can select **Edit Service** to edit its **Service Definition**.

### Creating and using environments

Environments can be created from inside or outside of a pipeline.

To create an environment from inside of a pipeline, select **New Environment** in the **Infrastructure** tab of a new CD stage.

![](./static/services-and-environments-overview-11.png)

To create an Environment from outside of a pipeline, you use **Environments** in the navigation pane.

![](./static/services-and-environments-overview-12.png)

Next you can define all of its settings:

* **Infrastructure Definitions:** represent one or more environment infrastructures.
  * Infrastructure Definitions are the actual clusters, hosts, etc., where Harness deploys a Service.
  * For example, you might have a QA Environment with separate Kubernetes clusters (Infrastructure Definitions) for each Service you want to test.
  * You can add multiple Infrastructure Definitions to a single Environment and select one when you add the Environment to a stage.
* **Configuration:** the default Environment configuration, including variables, manifests, specifications, and config files that will be used every time the Environment is used in a stage.
* **Service Overrides:** override specific Services. You select a Service and define what will be overridden whenever that Service is deployed to this Environment.
* **GitOps Clusters:** adding Harness GitOps Clusters to an Environment lets you select them as the deployment target in stages. For more information on Harness GitOps, see [Harness GitOps Basics](../../cd-gitops/harness-git-ops-basics.md).

### Infrastructure definitions

Infrastructure definitions represent an environment's infrastructures physically. They are the actual clusters, hosts, namespaces, etc, where you are deploying a service.

An environment can have multiple **Infrastructure Definitions**. 

![](./static/services-and-environments-overview-13.png)

When you select an environment in a stage, you can select the **Infrastructure Definition** to use for that stage.

![](./static/services-and-environments-overview-14.png)

### Configuration

In the environment **Configuration**, you can manage the **Name**, **Description**, **Tags**, and **Environment Type** of the environment.

![](./static/services-and-environments-overview-15.png)

You can also set default manifests, specifications, config files, and variables to use whenever Harness deploys a service to this Environment.

For example, a stage has a Kubernetes service with a manifest but whenever that service is deployed to the **QA** environment, the manifest in that environment's **Configuration** overwrites the namespace of with the manifest in the service with `QA`.

### Service overrides

Service overrides are different from **Environment Configuration** in the following ways:

* Environment **Configuration**: applies to every Service that is used with the Environment.
* Environment **Service Overrides**: applies to specific services you select. Whenever that service is used with that environment, the **Service Override** is applied.


### Override priority

When you are using Environment Configuration and Service Override to override Service settings, it's important to understand the priority of the overrides.

The priority from top to bottom is:

1. Environment Service Overrides
2. Environment Configuration
3. Service Settings


![](./static/services-and-environments-overview-16.png)

### Values YAML overrides and merges

You can specify values YAML files at the environment's **Service Overrides** and **Configuration**, and the service itself.

Here is an example of specifying it at the environment's **Configuration**:

![](./static/services-and-environments-overview-17.png)

When you have a values yaml file at two or more of the environment **Service Overrides**, **Environment Configuration**, and the service itself, Harness merges the files into a single values YAML for deployment. This merging is performed at pipeline execution runtime.

Overriding occurs when the higher priority setting has the same `name:value` pair as a lower priority setting.

Let's look at two examples.

#### Merging values YAML name:value pairs

An environment's **Service Overrides** values YAML has the name:value pair `servicePort: 80` but no `replicas` name:value.

A service's **Service Definition** has a values YAML with `replicas: 2` but no `servicePort` name:value.

At runtime, the two values YAML files are merged into one.

The `servicePort: 80` from the environment **Service Overrides** values YAML is merged with the **Service Definition**'s `replicas: 2` in the values YAML:

![](./static/services-and-environments-overview-18.png)

#### Fully overriding values YAML name:value pairs

An environment's **Service Overrides** values YAML has the name:value pairs `replicas: 2` and `servicePort: 80`. 

A service's **Service Definition** has a values YAML with `replicas: 4` and `servicePort: 8080`. 

At runtime, the name:value pairs from the environment **Service Overrides** values YAML fully override the service values YAML. The `replicas: 2` and `servicePort: 80` from the environment **Service Overrides** are used.

![](./static/services-and-environments-overview-19.png)

### Config files and variables are completely overridden

Config files are a black box that can contain multiple formats and content, such as YAML, JSON, plain text, etc. Consequently, they cannot be overridden like Values YAML files.

Variables cannot be partially overridden either. They are completely replaced.

When you have **Config files** at two or more of the environment **Service Overrides**, **Configuration**, and the service itself, the standard override priority is applied.

When you have **Variables** with the same name at two or more of the environment **Service Overrides**, **Configuration**, and the service itself, the standard override priority is applied.

### GitOps Clusters

When you use Harness GitOps you can add GitOps Clusters to an Environment. 

To learn more about Harness GitOps, go to [Harness GitOps Basics](../../cd-gitops/harness-git-ops-basics.md). 

Next, when you create a Pipeline, you can select the Environment and the GitOps Cluster(s) to use.

![](./static/services-and-environments-overview-20.png)

GitOps Clusters are used in a PR Pipeline. A PR Pipeline creates and merges a Git PR on the config.json for a destination cluster as part of an ApplicationSet. The PR Pipeline runs, merges a change to the config.json, and a GitOps Sync on the ApplicationSet is initiated.

GitOps Clusters are not used in standard CD Pipelines. Only when using GitOps.

### Runtime Inputs and Expressions in Services and Environments

If you use Runtime Inputs in your Services and Environments, users will need to provide values for these when they run Pipeline using these Services and Environments.

If you use Expressions in your Services and Environments, Harness must be able to resolve these expressions when users run Pipeline using these Services and Environments.

Select Runtime input for Service and Environment.

![](./static/services-and-environments-runtime-input-01.png)

When you run the pipeline, you can select the Service and Environment as runtime inputs.

![](./static/services-and-environments-runtime-input-02.png)

For more information on Runtime Inputs and Expressions, go to [Fixed Values, Runtime Inputs, and Expressions](../../../platform/20_References/runtime-inputs.md).

### Services and Environments RBAC

Please review these key RBAC uses cases for Services and Environments.

For extensive information on Harness RBAC, go to [Harness Role-Based Access Control Overview](../../../platform/4_Role-Based-Access-Control/1-rbac-in-harness.md) and [Harness Role-Based Access Control Quickstart](../../../platform/4_Role-Based-Access-Control/10-set-up-rbac-pipelines.md).


#### Access permission is needed to deploy to a service or environment

One of the most important advantages of services and environments is the ability to define roles that determines who can deploy them.

In order for a role to allow deployments using services and/or environments, the role must have the access permission enabled for services and/or environments.

![](./static/services-and-environments-overview-21.png)

The **View**, **Create**, **Edit**, **Delete**, and **Manage** permissions enable you to deploy a service and environment.

If a role does not have the **Access** permission for **Environments**, a user or user group assigned that role cannot deploy to any environment.

If a role does not have the **Access** permission for **Services**, a user or user group assigned that role cannot deploy any service.

#### Restrict access to specific services or environments for a user or user group

You can restrict a user or user group to using specific services and environments only. The process is the same for services and environments. 

Let's look at an example using environments.

If you want to restrict a user or user group to deploy to a specific environment only, do the following:

1. create a resource group and select the environment.
2. Create a Role and give the user or user group permissions. The **Access** permission is needed for deployments.
3. Assign the role and resource group to the user or user group.

![](./static/services-and-environments-overview-22.png)

### Environment groups

Environment groups are simple a way to group environments so you can assign permissions to multiple environments in a role.

![](./static/services-and-environments-overview-23.png)

