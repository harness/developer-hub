---
title: Key concepts
description: Key concepts for Harness CD & GitOps
helpdocs_topic_id: cqgeblt4uh
helpdocs_category_id: dxej4ug0n5
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 2
redirect_from:
  - /docs/continuous-delivery/getting-started/key-concepts
  - /docs/continuous-delivery/get-started/cd-pipeline-basics
---

For details on Harness' Key Concepts, go to [Learn Harness' Key Concepts](../../get-started/key-concepts.md).

## Introduction

This table explains how to map your existing CD needs to the key Harness concepts outlined on this page.

|       **Your CD Process**         |     **Harness CD Concept**                |
| --------------------------------- | ----------------------------------------- |
| What you are deploying            | Service and Service Definition            |
| Where you are deploying it        | Environment and Infrastructure Definition |
| How you are deploying it          | Steps and Failure Strategy                |
| When you want it deployed         | Triggers                                  |
| Who can approve deployment stages | Approval Steps and Stages                 |

## Service

A Harness Service is a logical construct that represents your microservices and other workloads. Each Service can be deployed, monitored, or changed independently.

When a Service is added to the stage in a Pipeline, you define its Service Definition. Service Definitions represent the real artifacts, manifests, and variables of a Service. They are the actual files and variable values. You can also propagate and override a Service in subsequent stages by selecting its name in that stage's Service settings.

For examples, go to:

* [Kubernetes Services](../deploy-srv-diff-platforms/kubernetes/kubernetes-services.md)
* [Propagate and Override CD Services](../x-platform-cd-features/services/propagate-and-override-cd-services.md)

### Service Instance

A logical Service when deployed onto the infrastructure of choice comes into existence in the form of service instances. For example, a Kubernetes service when deployed with a replica count of 3 leads to creation of 3 service instances. Hence, the **Service Instance** term in Harness represents the number of instances of a service running at any given moment (pods in case of Kubernetes, hosts in case of SSH-based deployments, etc).

Harness periodically tracks the count of running Service Instances every 10 minutes and stores it in the Harness database.

Harness uses a Service-based license model to charge Harness customers using its Continuous Delivery module.

For more information, go to [Service-based Licensing and Usage for CD](./service-licensing-for-cd.md).

## Environment

Environments represent your deployment targets logically (QA, Prod, etc). You can add the same Environment to as many Stages as you need.

### Infrastructure Definition

Infrastructure Definitions represent an Environment's infrastructure physically. They are the actual target clusters, hosts, etc.

For an example, go to [Kubernetes Infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure.md).
## Pipeline

A CD Pipeline is a series of Stages where each Stage deploys a Service to an Environment. It can perform many additional CD operations, including, but not limited to:

* Propagating Services and their definitions across Stages.
* Approvals using integrations like Jira and ServiceNow.
* Synchronizing stage deployments using barriers.
* Notifications.
* and many other operations.

### Stage

A CD Stage is a subset of a Pipeline that contains the logic to perform one major segment of the deployment process. Stages are based on the different milestones of your release process, such as dev, qa, and prod releases, and approvals.

See the following:

* [Add a Stage](/docs/platform/pipelines/add-a-stage.md)
* [Add a Stage Template Quickstart](/docs/platform/templates/add-a-stage-template.md)
* [Stage and Step Conditional Execution Settings](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)

### Step

Steps perform the CD operations like applying a manifest, asking for approval, rollback, and so on. Harness automatically adds the steps you need for the deployment strategy you select. You can then add additional steps to perform many other operations. You can run steps in parallel and apply execution conditions and failure strategies to them individually or as step groups.

For examples, go to:

* [Create a Kubernetes Rolling Deployment](../deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment.md)
* [Create a Kubernetes Canary Deployment](../deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment.md)
* [Create a Kubernetes Blue Green Deployment](../deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment.md)
* [Shell Script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step)
* [HTTP step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/http-step)

## Connectors

Connectors contain the information necessary to integrate and work with 3rd party tools such as Git providers, artifact repos, and target infrastructure.

Harness uses Connectors at Pipeline runtime to authenticate and perform operations with a 3rd party tool.

For example, a GitHub Connector authenticates with a GitHub account and repo and fetches files as part of a deploy Stage.

For example, go to:

* [Add a Kubernetes Cluster Connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector)
* [Docker Connector Settings Reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference)
* [Git Connector Settings Reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference)

### Permissions

The third-party credentials used in Harness connectors require different permissions depending on your deployment type (Kubernetes, ECS, Serverless, etc) and the tasks your pipelines will perform in those platforms.

For example, if your Pipeline deploys a Docker image to a Kubernetes cluster, you will need a Connector that can pull the images and any related manifests from their repositories. Also, you will need another Connector that can push the image to the target cluster and create any objects you need (Secrets, Deployments, etc).

## Delegates

The Harness Delegate is a software service you install in your environment that connects to the Harness Manager and performs tasks using your container orchestration platforms, artifact repositories, monitoring systems, etc.

### Credentials and permissions

The Delegate uses the credentials set up in the Connectors used by the Pipeline to perform deployment tasks.

The Delegate also needs permissions in the target environment to execute deployment tasks. These permissions are granted in the Delegate config file or the environment account you use when installing the Delegate.

## Variables

Pipeline and Stage variables are custom variables you can add and reference in your Pipeline and Stage. They're available across the Pipeline. You can propagate and override their values in later stages.

For more information, go to [Built-in Harness Variables Reference](../../platform/variables-and-expressions/harness-variables.md).

## Triggers

You can run your Pipelines manually or use triggers to initiate their execution.

You can trigger a Pipeline based on Git events, manifest changes, schedules, new artifacts, etc.

For examples, go to:

* [Trigger Pipelines on a New Artifact](../../platform/triggers/trigger-on-a-new-artifact.md)
* [Trigger Pipelines on New Helm Chart](../../platform/triggers/trigger-pipelines-on-new-helm-chart.md)
* [Trigger Pipelines using Git Events](../../platform/triggers/triggering-pipelines.md)

## Advanced settings

Pipelines, Stages, and steps have advanced settings to control the flow of operations.

### Input sets and overlays

Harness input sets are collections of runtime inputs for a pipeline provided before execution.

Overlays are groups of input sets. Overlays enable you to provide several input sets when executing a pipeline.

With input sets and overlays, you can make a single pipeline template that can be used for multiple scenarios. Each scenario can be defined in an input set or overlay and simply selected at runtime.

For more information, go to [Input sets and overlays](../../platform/pipelines/input-sets.md).

### Conditional executions

You can set conditions on when you run Stages and steps. For example, `Execute This Stage Only if Prior Pipeline or Stage Failed`.

The stage Conditional Execution applies to all steps that do not have their own Conditional Execution. A step's Conditional Execution overrides its stage's Conditional Execution.

For more information, go to [Stage and Step Conditional Execution Settings](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md).

### Failure strategies

A failure strategy defines how your Stages and steps handle different failure conditions.

The failure strategy contains error conditions that must occur for the strategy to apply, and actions to take when the conditions occur.

Failure strategies are a critical pipeline design component that determine what fails a step or stage and what to do when the failure occurs.

For more information, go to [Step and Stage Failure Strategy References](/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps.md).


