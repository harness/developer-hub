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

* [Add a Stage](https://docs.harness.io/article/2chyf1acil-add-a-stage)
* [Add a Stage Template Quickstart](https://docs.harness.io/article/s3wrqjsg43-add-a-stage-template)
* [Stage and Step Conditional Execution Settings](https://docs.harness.io/article/i36ibenkq2-step-skip-condition-settings)

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

* [Add a Kubernetes Cluster Connector](https://docs.harness.io/article/1gaud2efd4-add-a-kubernetes-cluster-connector)
* [Docker Connector Settings Reference](https://docs.harness.io/article/u9bsd77g5a-docker-registry-connector-settings-reference)
* [Git Connector Settings Reference](https://docs.harness.io/article/tbm2hw6pr6-git-connector-settings-reference)

#### Permissions

Connectors require different permissions depending on your deployment environment and the tasks your Pipeline performs.

For example, if your Pipeline deploys a Docker image to a Kubernetes cluster, you will need a Connector that can pull the images and any related manifests from their repositories. Also, you will need another Connector that can push the image to the target cluster and create any objects you need (Secrets, Deployments, etc).

### Delegates

The Harness Delegate is a software service you install in your environment that connects to the Harness Manager and performs tasks using your container orchestration platforms, artifact repositories, monitoring systems, etc.

For examples, see:

* [Delegate Installation Overview](https://docs.harness.io/article/re8kk0ex4k-delegate-installation-overview)
* [Install a Kubernetes Delegate](https://docs.harness.io/article/f9bd10b3nj-install-a-kubernetes-delegate)
* [Install a Docker Delegate](https://docs.harness.io/article/cya29w2b99-install-a-docker-delegate)

#### Credentials and Permissions

The Delegate uses the credentials set up in the Connectors used by the Pipeline to perform deployment tasks.

The Delegate also needs permissions in the target environment to execute deployment tasks. These permissions are granted in the Delegate config file or the environment account you use when installing the Delegate.

### Variables

Pipeline and Stage variables are custom variables you can add and reference in your Pipeline and Stage. They're available across the Pipeline. You can propagate and override their values in later stages.

See [Built-in Harness Variables Reference](https://docs.harness.io/article/lml71vhsim-harness-variables).

### Triggers

You can run your Pipelines manually or use triggers to initiate their execution.

You can trigger a Pipeline based on Git events, manifest changes, schedules, new artifacts, etc.

For examples, see:

* [Trigger Pipelines on a New Artifact](https://docs.harness.io/article/c1eskrgngf-trigger-on-a-new-artifact)
* [Trigger Pipelines on New Helm Chart](https://docs.harness.io/article/54eqk0d1bd-trigger-pipelines-on-new-helm-chart)
* [Trigger Pipelines using Git Events](https://docs.harness.io/article/hndnde8usz-triggering-pipelines)

### Advanced Settings

Pipelines, Stages, and steps have advanced settings to control the flow of operations.

#### Inputs and Overlays

Harness Input Sets are collections of runtime inputs for a Pipeline provided before execution.

Overlays are groups of Input Sets. Overlays enable you to provide several Input Sets when executing a Pipeline.

With Input Sets and Overlays, you can make a single Pipeline template that can be used for multiple scenarios. Each scenario can be defined in an Input Set or Overlay and simply selected at runtime.

See [Input Sets and Overlays](https://docs.harness.io/article/3fqwa8et3d-input-sets).

#### Conditional Executions

You can set conditions on when you run Stages and steps. For example, `Execute This Stage Only if Prior Pipeline or Stage Failed`.

The stage Conditional Execution applies to all steps that do not have their own Conditional Execution. A step's Conditional Execution overrides its stage's Conditional Execution.

See [Stage and Step Conditional Execution Settings](https://docs.harness.io/article/i36ibenkq2-step-skip-condition-settings).

#### Failure Strategies

A failure strategy defines how your Stages and steps handle different failure conditions.

The failure strategy contains error conditions that must occur for the strategy to apply, and actions to take when the conditions occur.

Failure strategies are a critical pipeline design component that determine what fails a step or stage and what to do when the failure occurs.

See [Step and Stage Failure Strategy References](https://docs.harness.io/article/0zvnn5s1ph-define-a-failure-strategy-on-stages-and-steps).

