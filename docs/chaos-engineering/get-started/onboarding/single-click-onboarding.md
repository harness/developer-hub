---
sidebar_position: 2
title: Automated onboarding
description: Set up infrastructure with a single click and execute chaos experiments.
---

This topic guides you through setting up the chaos infrastructure, executing chaos experiments, and viewing the resilience dashboard with single clicks.

## Before you begin

* [Overview of HCE onboarding.](/docs/chaos-engineering/get-started/onboarding/hce-onboarding.md)

### Execute chaos experiments

1. In the left menu, select **Overview** and then select **Select a Cluster** where you can choose a cluster so that you can execute chaos experiments.

     ![select cluster](./static/single-click/select-cluster-1.png)

2. Select an environment from the list and select **Next**.

    ![select env](./static/single-click/select-env-2.png)

3. Select the target infrastructure on which you want to execute the chaos experiments. Select **Apply**.

    ![select infrastructure](./static/single-click/select-infra-3.png)

4. Based on your inputs earlier, HCE discovers services in your cluster (that is, **service discovery**) to create chaos experiments.

    ![service discovery](./static/single-click/service-discovery-4.png)

5. HCE automatically creates chaos experiments and selects a few experiments to execute.

    ![create experiment](./static/single-click/create-exp-5.png)

6. HCE chooses to execute safe chaos experiments, that is, experiments that have a low blast radius.

    ![execute experiment](./static/single-click/exec-exp-6.png)

### View logs and resilience dashboard

7. You can see the status of the chaos experiment execution, as well as view the experiment execution. You can also see the resilience score of the experiment if you select **View Resilience Dashboard**.

    ![experiment status](./static/single-click/exp-status-7.png)

8. To view the experiment execution logs, select **View Execution** which opens on a new page. Here, you can see the logs of the experiment.

    ![error log](./static/single-click/error-log-8.png)

### View the progress of an experiment

1. You can view the progress of a chaos experiment you created earlier. Select **View Progress**.

    ![view progress](./static/single-click/view-progress-9.png)

2. Select **View** on the infrastructure where you executed the chaos experiment.
    ![cluster view](./static/single-click/cluster-view-10.png)

## Conclusion
Congratulations! You completed the automated HCE onboarding. Now you are all set to [explore the chaos faults](/docs/chaos-engineering/chaos-faults/) and build resilient applications.
