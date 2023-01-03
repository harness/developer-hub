---
title: CD overview and key concepts
description: This topic covers CD Pipeline basics to get you ready to start building Pipelines easily.
sidebar_position: 1
helpdocs_topic_id: cqgeblt4uh
helpdocs_category_id: dxej4ug0n5
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic covers CD Pipeline basics to get you ready to start building Pipelines easily.

For details on Harness' Key Concepts, see [Learn Harness' Key Concepts](../../../getting-started/learn-harness-key-concepts.md).

### Pipelines

A CD Pipeline is a series of Stages where each Stage deploys a Service to an Environment.

A CD Pipeline can perform many additional CD operations, including, but not limited to:

* Propagating Services and their definitions across Stages.
* Approvals using integrations like Jira and ServiceNow.
* Synchronizing stage deployments using barriers.
* Notifications.
* and many other operations.

### Stages

A CD Stage is a subset of a Pipeline that contains the logic to perform one major segment of the deployment process. Stages are based on the different milestones of your release process, such as dev, qa, and prod releases, and approvals.

This table explains how Stages perform your CD operations:



|                                   |                                           |
| --------------------------------- | ----------------------------------------- |
| **Your CD Process**                           | **CD Pipelines**                          |
| What you are deploying            | Service and Service Definition            |
| Where you are deploying it        | Environment and Infrastructure Definition |
| How you are deploying it          | Execution steps and Failure Strategy      |
| When you want it deployed         | Triggers                                  |
| Who can approve deployment stages | Approval steps and stages                 |


See the following:

* [Add a Stage](../../../platform/8_Pipelines/add-a-stage.md)
* [Add a Stage Template Quickstart](../../../platform/13_Templates/add-a-stage-template.md)
* [Stage and Step Conditional Execution Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)

### Services

A Service represents your microservices and other workloads.

A Service is an entity to be deployed, monitored, or changed independently.

When a Service is added to the stage in a Pipeline, you define its Service Definition. Service Definitions represent the real artifacts, manifests, and variables of a Service. They are the actual files and variable values.

You can also propagate and override a Service in subsequent stages by selecting its name in that stage's Service settings.

For examples, see:

* [Kubernetes Services](../../cd-services/k8s-services/kubernetes-services.md)
* [Propagate and Override CD Services](../../cd-services/cd-services-general/propagate-and-override-cd-services.md)

### Service Instance

A **Service Instance** is the number of running Service instances at any given moment (pods in case of Kubernetes, hosts in case of SSH-based deployments, etc).

Harness periodically tracks the count of running Service Instances every 10 minutes and stores it in the Harness database.

Harness uses a Service-based license model to charge Harness customers using its Continuous Delivery module.

See [Service-based Licensing and Usage for CD](service-licensing-for-cd.md).

### Environments and Infrastructure

Environments represent your deployment targets logically (QA, Prod, etc). You can add the same Environment to as many Stages as you need.

Infrastructure Definitions represent an Environment's infrastructure physically. They are the actual target clusters, hosts, etc.

For an example, see [Kubernetes Infrastructure](../../cd-infrastructure/kubernetes-infra/define-your-kubernetes-target-infrastructure.md).

### Execution Steps

Execution steps perform the CD operations like applying a manifest, asking for approval, rollback, and so on.

Harness automatically adds the steps you need for the deployment strategy you select. You can then add additional steps to perform many other operations.

You can run steps in parallel and apply execution conditions and failure strategies to them individually or as step groups.

For examples, see:

* [Create a Kubernetes Rolling Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-rolling-deployment.md)
* [Create a Kubernetes Canary Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-canary-deployment.md)
* [Create a Kubernetes Blue Green Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-blue-green-deployment.md)
* [Using Shell Scripts in CD Stages](../../cd-execution/cd-general-steps/using-shell-scripts.md)
* [Using HTTP Requests in CD Pipelines](../../cd-execution/cd-general-steps/using-http-requests-in-cd-pipelines.md)

### Connectors

Connectors contain the information necessary to integrate and work with 3rd party tools such as Git providers, artifact repos, and target infrastructure.

Harness uses Connectors at Pipeline runtime to authenticate and perform operations with a 3rd party tool.

For example, a GitHub Connector authenticates with a GitHub account and repo and fetches files as part of a deploy Stage.

For example, see:

* [Add a Kubernetes Cluster Connector](../../../platform/7_Connectors/add-a-kubernetes-cluster-connector.md)
* [Docker Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/docker-registry-connector-settings-reference.md)
* [Git Connector Settings Reference](../../../platform/7_Connectors/ref-source-repo-provider/git-connector-settings-reference.md)

#### Permissions

Connectors require different permissions depending on your deployment environment and the tasks your Pipeline performs.

For example, if your Pipeline deploys a Docker image to a Kubernetes cluster, you will need a Connector that can pull the images and any related manifests from their repositories. Also, you will need another Connector that can push the image to the target cluster and create any objects you need (Secrets, Deployments, etc).

### Delegates

The Harness Delegate is a software service you install in your environment that connects to the Harness Manager and performs tasks using your container orchestration platforms, artifact repositories, monitoring systems, etc.

For examples, see:

* [Delegate Installation Overview](../../../platform/2_Delegates/delegate-installation-overview.md)
* [Install a Kubernetes Delegate](../../../platform/2_Delegates/delegate-guide/install-a-kubernetes-delegate.md)
* [Install a Docker Delegate](../../../platform/2_Delegates/delegate-install-docker/install-a-docker-delegate.md)

#### Credentials and Permissions

The Delegate uses the credentials set up in the Connectors used by the Pipeline to perform deployment tasks.

The Delegate also needs permissions in the target environment to execute deployment tasks. These permissions are granted in the Delegate config file or the environment account you use when installing the Delegate.

### Variables

Pipeline and Stage variables are custom variables you can add and reference in your Pipeline and Stage. They're available across the Pipeline. You can propagate and override their values in later stages.

See [Built-in Harness Variables Reference](../../../platform/12_Variables-and-Expressions/harness-variables.md).

### Triggers

You can run your Pipelines manually or use triggers to initiate their execution.

You can trigger a Pipeline based on Git events, manifest changes, schedules, new artifacts, etc.

For examples, see:

* [Trigger Pipelines on a New Artifact](../../../platform/11_Triggers/trigger-on-a-new-artifact.md)
* [Trigger Pipelines on New Helm Chart](../../../platform/11_Triggers/trigger-pipelines-on-new-helm-chart.md)
* [Trigger Pipelines using Git Events](../../../platform/11_Triggers/triggering-pipelines.md)

### Advanced Settings

Pipelines, Stages, and steps have advanced settings to control the flow of operations.

#### Inputs and Overlays

Harness Input Sets are collections of runtime inputs for a Pipeline provided before execution.

Overlays are groups of Input Sets. Overlays enable you to provide several Input Sets when executing a Pipeline.

With Input Sets and Overlays, you can make a single Pipeline template that can be used for multiple scenarios. Each scenario can be defined in an Input Set or Overlay and simply selected at runtime.

See [Input Sets and Overlays](../../../platform/8_Pipelines/input-sets.md).

#### Conditional Executions

You can set conditions on when you run Stages and steps. For example, `Execute This Stage Only if Prior Pipeline or Stage Failed`.

The stage Conditional Execution applies to all steps that do not have their own Conditional Execution. A step's Conditional Execution overrides its stage's Conditional Execution.

See [Stage and Step Conditional Execution Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md).

#### Failure Strategies

A failure strategy defines how your Stages and steps handle different failure conditions.

The failure strategy contains error conditions that must occur for the strategy to apply, and actions to take when the conditions occur.

Failure strategies are a critical pipeline design component that determine what fails a step or stage and what to do when the failure occurs.

See [Step and Stage Failure Strategy References](../../../platform/8_Pipelines/define-a-failure-strategy-on-stages-and-steps.md).

