---
title: Overview
sidebar_position: 3
canonical_url: https://www.harness.io/blog/get-started-with-harness-chaos-engineering-free-plan
redirect_from:
    - /docs/chaos-engineering/onboarding/hce-onboarding
---

This topic describes how you can get a hands-on experience executing chaos experiments without fulfilling the [prerequisites for Harness CE SaaS](/docs/chaos-engineering/getting-started/prerequisites).

You can get hands-on experience executing chaos experiments without fulfilling the prerequisites. You can achieve this in two ways:
- [Automated Onboarding](/docs/chaos-engineering/getting-started/onboarding/automated-onboarding)
- [Guided onboarding](/docs/chaos-engineering/getting-started/onboarding/guided-onboarding)

## Before you begin, review the following:

- [All about chaos engineering](/docs/chaos-engineering/concepts/chaos101)
- [Get Started With Harness CE](/docs/chaos-engineering/getting-started/saas/)

## Prerequisites to Onboarding

Harness CE requires you to install Harness Delegate in your environment before using one of the onboarding methods. 
    - [Create an environment](/docs/chaos-engineering/getting-started/saas/#step-3-create-an-environment)
    - Install [Delegate](/docs/chaos-engineering/use-harness-ce/infrastructures/types/ddcr/installation) 
        - [Create Connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector/#add-a-kubernetes-cluster-connector)
    
When using one of the onboarding methods, select the Delegate (that you installed earlier) for use by the chaos experiment.

:::tip
- Once you use a chaos infrastructure for one of the onboarding methods, the second onboarding method will require you to create a new infrastructure. 
- You can't use the same infrastructure more than once. 
- The UI indicates whether the infrastructure is already in use; if so, create a new one.
:::

## Steps to Create an Infrastructure for Onboarding

1. Navigate to **Continuous Delivery & GitOps** module and select **Environments**.

2. Select one of the environments you created earlier or [create a new environment](/docs/chaos-engineering/getting-started/saas/#step-3-create-an-environment).

3. Select **Infrastructure Definitions** tab and select **Infrastructure Definition**. This opens the modal to create a new infrastructure.

    ![](./static/intro/infra-def-4.png)

4. Provide a name, method to set up infrastructure (select **inline**), deployment type (select **Kubernetes**), and infrastructure type (select **Kubernetes**) or follow [this interactive demo](/docs/chaos-engineering/use-harness-ce/infrastructures/types/ddcr/installation).

    ![](./static/intro/id-5.png)

5. Select a connector or [create one](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector/#add-a-kubernetes-cluster-connector), and click **Apply Selected**.

    ![](./static/intro/connector.png)

6. Provide cluster details such as connector and namespace. Other fields are not mandatory so you can skip specifying values for those. Select **Save**.

    ![](./static/intro/id-7.png)

This creates a new infrastructure in the environment you specify.


## Onboarding

1. Go to the **Chaos** module and select **Overview**. Select **Select a cluster**, where you can choose between [automated](/docs/chaos-engineering/getting-started/onboarding/automated-onboarding) and [guided](/docs/chaos-engineering/getting-started/onboarding/guided-onboarding) onboarding.

    ![](./static/intro/onboard-1.png)

2. If you choose **Yes, in a single step!**, go to [automated onboarding](/docs/chaos-engineering/getting-started/onboarding/automated-onboarding.md), and if you choose **No, I will choose**, go to [guided onboarding](/docs/chaos-engineering/getting-started/onboarding/guided-onboarding.md).

    ![](./static/intro/onboard-2.png)

:::tip
- Previously, Harness CE provided a dedicated chaos infrastructure to execute chaos experiments. With the current updates, the `chaos-runner` is transient and you can execute chaos experiments by installing **Harness delegate**, thereby eliminating the need to install Harness chaos infrastructure and other additional components.
- Once you have installed Harness delegate, you can reuse it to execute experiments, discover services, create application maps and so on.
:::


## Next steps

* [Automated Onboarding](/docs/chaos-engineering/getting-started/onboarding/automated-onboarding)
* [Guided Onboarding](/docs/chaos-engineering/getting-started/onboarding/guided-onboarding)