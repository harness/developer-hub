---
sidebar_position: 1
title: Overview
description: An overview of onboarding with HCE
---

This topic describes the HCE versions and how to get started.

## Before you begin

* [What is chaos engineering?](/docs/chaos-engineering/get-started/overview)
* [Key concepts](/docs/chaos-engineering/architecture-and-security/architecture/components)

Harness Chaos Engineering is available in **SaaS** and **self-managed** versions.

1. **SaaS (Software-as-a-service)**: You either sign up or get invited to a specific project. You can also create a project if you have the necessary permissions. HCE helps manage the cluster.
2. **SMP (Self-managed platform)**: You create, manage and maintain your clusters. You are responsible for providing permissions to projects and handling issues associated with them.

## Steps to execute a HCE experiment

To create a chaos experiment, complete the following steps:

1. [Fulfill the resource requirements](/docs/chaos-engineering/get-started/tutorials/prerequisites.md): In this step, you can create resources or get the required permissions to create the necessary resources.
2. [Add an environment](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-1-create-an-environment): A chaos experiment is performed within a chaos environment that houses the necessary infrastructure.
3. [Add a chaos infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-2-add-a-chaos-infrastructure): The required chaos infrastructure is created within a chaos environment.
4. [Validate the chaos infrastructure installation](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-3-validate-the-chaos-infrastructure-installation): Once you create your chaos infrastructure, ensure that it has been created in the right manner.
5. [Create a demo application](/docs/chaos-engineering/get-started/tutorials/first-chaos-engineering#creating-a-demo-application-and-observability-infrastructure): You can either create a demo application or use your application on which you can execute chaos experiments.
6. [Create and run a chaos experiment](/docs/chaos-engineering/features/experiments/construct-and-run-custom-chaos-experiments.md): Once you have set up your application, you can decide which resources to target and execute the chaos experiments on.

## Automated and guided onboarding

1. To get hands-on experience executing chaos experiments, navigate to the **Chaos** module and select **Overview**. Select **Select a cluster**, where you can choose between automatic and customizable onboarding.

![](./static/onboard/onboard-1.png)

2. If you choose **Yes, in a single step!**, go to [automated onboarding](/docs/chaos-engineering/get-started/onboarding/single-click-onboarding.md), and if you choose **No, I will choose**, go to [guided onboarding](/docs/chaos-engineering/get-started/onboarding/guided-onboarding.md).

![](./static/onboard/onboard-2.png)

## Next steps

* [Automated onboarding](/docs/chaos-engineering/get-started/onboarding/single-click-onboarding.md)
* [Guided onboarding](/docs/chaos-engineering/get-started/onboarding/guided-onboarding.md)
