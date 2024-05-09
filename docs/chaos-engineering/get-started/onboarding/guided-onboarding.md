---
sidebar_position: 3
title: Guided onboarding
description: Guided onboarding with HCE
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes the following operations:
1. [Create an environment with single click.](#select-an-environment)
2. [Create an infrastructure with single click.](#select-an-infrastructure)
3. [Automatically discover services on your cluster.](#automatically-create-discovery-agent)
4. [Create network maps with a single click.](#create-network-maps)
5. [Choose the chaos experiments to run.](#create-chaos-experiments)
6. [View the resilience of chaos experiments.](#view-resilience-score)

## Before you begin, review the following:

* [What is chaos engineering?](/docs/chaos-engineering/get-started/overview)
* [Onboarding overview](/docs/chaos-engineering/get-started/onboarding/hce-onboarding.md)
* [HCE single-click onboarding](/docs/chaos-engineering/get-started/onboarding/single-click-onboarding.md)

## Steps to discover services, create network maps, and execute chaos experiments

1. Navigate to the **Chaos** module and select **Overview** to find the onboarding option.

    ![](./static/guided/select-cluster-0.png)

### Choose between automatic and customizable experiment creation

2. Select **No, I will choose** as you will create network maps and execute chaos experiments in this step.

    ![](./static/guided/select-1.png)

### Select an environment

3. Select an environment from a list of environments and click **Next**. It may take a while to set up the environment.

    ![](./static/guided/select-env-2.png)

### Select an infrastructure

4. Select an infrastructure from the list of infrastructure and select **Next**.

    ![](./static/guided/select-infra-3.png)

5. The next step verifies some permissions by running pre-configured checks, after which you can click **Next**.

    ![](./static/guided/run-checks-4.png)

### Automatically create Discovery Agent

6. HCE creates the discovery agent that automatically discovers services for your application. The next step (optional) collects information about blocked namespaces, service discovery periods, etc. To know how to use a custom discovery agent, go to [customize discovery agent](/docs/chaos-engineering/features/service-discovery/service-discovery-usage.md).

7. Once you complete the steps mentioned earlier, HCE looks for services in your cluster (which may take a while).

    ![](./static/guided/discover-services-6.png)

### Create Network Maps

8. Once HCE discovers the services, the UI lists them for your reference. Click **Create Network Maps**.

    ![](./static/guided/discovery-complete-7.png)

9. HCE prompts you to select one of the options to create network maps automatically or not.

### Choose between automatic and customizable network map creation

<Tabs>
 <TabItem value="Automatic">

9a. Select **Yes** to automatically create network maps. Select **Create Network Maps**.

    ![](./static/guided/create-map-8.png)

9b. You will find network map recommendations from HCE based on the discovered services.

    ![](./static/guided/creating-9.png)

</TabItem>

<TabItem value="Customize">

9a. Select **No, I will choose** to customize network map creation and select **Create Network Maps**.

    ![](./static/guided/network-map-11.png)

9b. Enter a **Network Map Name**, **Tag** (optional), and **Description** (optional). Select **Confirm**.

    ![](./static/guided/new-map-12.png)

This creates network maps and lists them on the UI.

    ![](./static/guided/save-map-14.png)

9c. To select and save some or all the created network maps, select **Save network map**.

    ![](./static/guided/created-nm-15.png)

</TabItem>
</Tabs>

### Create chaos experiments

10. HCE lists the network maps for you to choose from. Choose one and select **Next: Create Chaos Experiments**.

    ![](./static/guided/list-map-10.png)

11. You can choose between **Basic**, **Intermediate**, and **Advanced** chaos experiments (categorized based on their blast radius). Select **Create Experiments** to initiate the process.

    ![](./static/guided/choose-exp-17.png)

12. Based on your choice, HCE creates chaos experiments and lists the network maps associated with the experiments on the UI. Select **Complete** or **Exit**.

    ![](./static/guided/done-creating-19.png)

### Execute chaos experiments

13. Click **Run** to execute the chaos experiments.

    ![](./static/guided/sample-exp-20.png)

Congratulations! You have successfully:

 - Discovered services
 - Created network maps
 - Created chaos experiments
 - Executed the chaos experiments
    ![](./static/guided/summary-21.png)

### View resilience score

- Once the experiments you selected complete their execution, you can see the resilience score of these experiments.

    ![](./static/guided/res-score-22.png)

- You can check the resilience summary once you fulfill the checklist requirements.

    ![](./static/guided/view-progress-23.png)

- You can click **View** to see the progress of different clusters executing various chaos experiments.

    ![](./static/guided/view-cluster-res-24.png)



## Next steps

Don't forget to check other walkthroughs! Some of them are listed below.

* [Run your first chaos experiment](/docs/chaos-engineering/get-started/tutorials/first-chaos-engineering.md)
* [Executing experiments in a sandbox](/docs/chaos-engineering/certifications/run-experiments-in-sandbox.md)
* [Create chaos experiments from scratch](/docs/chaos-engineering/get-started/tutorials/chaos-experiment-from-blank-canvas.md)
