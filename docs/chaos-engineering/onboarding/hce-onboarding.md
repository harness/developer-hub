---
sidebar_position: 4
title: Overview
description: An overview of onboarding with HCE
---

This topic describes the typical steps to execute a chaos experiment, and delves into how you can deploy the HCE application in two different modes, that is, [automated onboarding](/docs/chaos-engineering/onboarding/single-click-onboarding) and [guided onboarding](/docs/chaos-engineering/onboarding/guided-onboarding).

## Before you begin

* [What is chaos engineering?](/docs/chaos-engineering/get-started/overview)
* [Delegate-driven Harness infrastructure](/docs/chaos-engineering/onboarding/harness-infra/harness-infra.md)
* [Key concepts](/docs/chaos-engineering/architecture-and-security/architecture/components)

:::tip
Currently, this feature is behind the feature flag `CHAOS_V2_ENABLED`. Contact [Harness support](mailto:support@harness.io) to enable the feature.
:::

## Steps to create and execute a HCE experiment

You can execute a chaos experiment by:

1. [Fulfilling the resource requirements](/docs/chaos-engineering/get-started/prerequisites/prerequisites.md): In this step, you can create resources or get the required permissions to create the necessary resources.
2. [Adding an environment](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-1-create-an-environment): A chaos experiment is performed within a chaos environment that houses the necessary infrastructure.
3. [Adding a chaos infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-2-add-a-chaos-infrastructure): The required chaos infrastructure is created within a chaos environment.
4. [Validating the chaos infrastructure installation](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-3-validate-the-chaos-infrastructure-installation): Once you create your chaos infrastructure, ensure that it has been created in the right manner.
5. [Creating a demo application](/docs/chaos-engineering/get-started/tutorials/first-chaos-engineering#creating-a-demo-application-and-observability-infrastructure): You can either create a demo application or use your application on which you can execute chaos experiments.
6. [Creating and running a chaos experiment](/docs/chaos-engineering/features/experiments/construct-and-run-custom-chaos-experiments.md): Once you have set up your application, you can decide which resources to target and execute the chaos experiments on.

The steps mentioned earlier required some reading and exploring, but if you want a head start to your chaos journey, enter [automated onboarding](/docs/chaos-engineering/onboarding/single-click-onboarding) and [guided onboarding](/docs/chaos-engineering/onboarding/guided-onboarding). These onboarding methods will guide you in creating and executing chaos experiments with the click of a button, without the hassle of explicitly creating environment, infrastructure and other entities!

## Automated and guided onboarding

You can execute chaos experiments without explicitly installing the environment or infrastructure or creating an experiment by specifying tunables.

1. To get hands-on experience, navigate to the **Chaos** module and select **Overview**. Select **Select a cluster**, where you can choose between [automated](/docs/chaos-engineering/onboarding/single-click-onboarding.md) and [guided](/docs/chaos-engineering/onboarding/guided-onboarding.md) onboarding.

![](./static/onboard/onboard-1.png)

2. If you choose **Yes, in a single step!**, go to [automated onboarding](/docs/chaos-engineering/onboarding/single-click-onboarding.md), and if you choose **No, I will choose**, go to [guided onboarding](/docs/chaos-engineering/onboarding/guided-onboarding.md).

![](./static/onboard/onboard-2.png)

:::tip
- Previously, HCE provided a dedicated chaos infrastructure to execute chaos experiments. With the current updates, the `chaos-runner` is transient and you can execute chaos experiments by installing **Harness delegate**, thereby eliminating the need to install Harness chaos infrastructure and other additional components.
- Go to [Harness Delegate-driven infrastructure](/docs/chaos-engineering/onboarding/harness-infra/harness-infra.md) to know more.
- Once you have installed Harness delegate, you can reuse it to execute experiments, [discover services](/docs/chaos-engineering/features/service-discovery/intro-service-discovery), [create network maps](/docs/chaos-engineering/features/network-maps/intro-network-map) and so on.
:::

## Prerequisites to automated and guided onboarding

HCE requires that you install a chaos infrastructure in your environment before using one of the onboarding methods (guided or automated). While using one of the onboarding methods, you can simply select the infrastructure (you installed earlier) for use by the chaos experiment.

:::tip
Once you use a chaos infrastructure for one of the onboarding methods, you need to create a new infrastructure for the second onboarding method. You can't use the same infrastructure more than once. The UI shows whether the infrastructure is already in use, if so, create a new one.
:::

### Steps to create an infrastructure for onboarding

1. Navigate to **Continuous Delivery & GitOps** module.

    ![](./static/guided/nav-cd-1.png)

2. Select **Environments**.

    ![](./static/guided/env-2.png)

3. Select one of the environments you created earlier or create a new environment. In this section, you will understand how to use a previously created environment. Go to [create a new environment](/docs/chaos-engineering/get-started/tutorials/first-chaos-engineering#step-2-create-an-environment) to create a new environment.

    ![](./static/guided/select-env-3.png)

4. Select **Infrastructure Definitions** tab and select **Infrastructure Definition**. This opens the modal to create a new infrastructure.

    ![](./static/guided/infra-def-4.png)

5. Provide a name, method to set up infrastructure, deployment type, infrastructure type, and cluster details such as connector and namespace. Other fields are not mandatory so you can skip specifying values for those. Select **Save**.

    ![](./static/guided/id-5.png)
    ![](./static/guided/id-6.png)
    ![](./static/guided/connector.png)
    ![](./static/guided/id-7.png)

This creates a new infrastructure in the environment you specify.

## Next steps

* [Automated onboarding](/docs/chaos-engineering/onboarding/single-click-onboarding)
* [Guided onboarding](/docs/chaos-engineering/onboarding/guided-onboarding)
