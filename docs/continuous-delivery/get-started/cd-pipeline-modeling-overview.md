---
title: CD pipeline modeling overview
description: This topic describes how to model your CD practices in Harness.
sidebar_position: 4
helpdocs_topic_id: s5mcwujxxy
helpdocs_category_id: dxej4ug0n5
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how you use the Harness Continuous Delivery Abstraction Model.

### How do I model my CD practices in Harness?

Continuous Delivery is modeled using Pipelines and Stages.

In each Stage, you define **what** you want to deploy using Services, **where** you want to deploy it using Environments, and **how** you want to deploy it using Execution steps.

For example, a **Service** uses your Kubernetes manifests and Docker image, an **Environment** connects to your dev cluster, and Harness automatically generates an **Execution** using a Rolling Deployment step.

![pipeline overview](./static/cd-pipeline-modeling-overview-02.png)

The image above shows you the order for modeling a CD stage:

1. Create a pipeline.
2. Add a CD stage.
3. Define a service.
4. Target an environment and infrastructure.
5. Select execution steps.

You can model visually, using code, or via the REST API.

#### Pipeline Studio (Visual)

Model your process visually using a guided sequence:

![picture 1](./static/7974db787c16c8eb7cb108d856d86aa65a32914b82d356f21a9fe97f6184d2f1.png)

#### YAML Builder

Model your process in code using a full-featured YAML editor:

![](./static/cd-pipeline-modeling-overview-03.png)

For more details, go to [Harness YAML Quickstart](../../platform/8_Pipelines/harness-yaml-quickstart.md) and [YAML Reference: Pipelines](../../platform/8_Pipelines/w_pipeline-steps-reference/yaml-reference-cd-pipeline.md).

#### REST API

Model your process using a full-featured REST API:

![](./static/cd-pipeline-modeling-overview-04.png)

For more details, go to [Get started with Harness APIs](/docs/platform/Resource-Development/APIs/api-quickstart).

### How do I automate my CD process in Harness?

Harness Continuous Delivery provides Triggers for automating the execution of Pipelines, multiple settings for adding conditions to how the Pipeline executes and rolls back, and Approvals to ensure that the Pipeline only proceeds when safe to do so.

#### Triggers

Automate the execution of a Pipeline in response to changes in manifests/specs, artifacts, or on a schedule:

![](./static/cd-pipeline-modeling-overview-05.png)

For more details, go to [Triggers](/docs/category/triggers).

#### Conditions

Set when, if, and how a Stage executes and what to do if it fails:

![](./static/cd-pipeline-modeling-overview-06.png)

For more details, go to [Stage and Step Conditional Execution Settings](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md).

#### Approvals

Add checks at any point in your process to ensure that deployments are safe:

![](./static/cd-pipeline-modeling-overview-07.png)

For more details, go to [Approvals](/docs/category/approvals).

### Verification

Harness' Continuous Verification (CV) approach simplifies verification.

Harness CV integrates with your APMs and logging tools to:

* Verify that the deployed service is running safely and perform automatic rollbacks.
* Apply machine learning to every deployment to identify and flag anomalies in future deployments.

![](./static/cd-pipeline-modeling-overview-08.png)

For more details, go to [Verify Deployments with the Verify Step](../verify/verify-deployments-with-the-verify-step.md).

### Summary

This topic provided a high level overview of how you can model your software delivery process in Harness Continuous Delivery Pipelines and Stages.

For more details and example, go to:

* [CD tutorials](/tutorials/cd-pipelines/)
* [CD overview and key concepts](./cd-pipeline-basics.md)
* [Service-based licensing and usage for CD](./service-licensing-for-cd.md)
* [Deployment concepts and strategies](../manage-deployments/deployment-concepts.md)

