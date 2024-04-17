---
sidebar_position: 2
title: Guided onboarding
description: Set up infrastructure with a single click and execute chaos experiments.
---

This guide guides you through setting up the chaos infrastructure, executing chaos experiments, and viewing the resilience dashboard with single clicks.

## Before you begin

* [Overview of HCE onboarding](/docs/chaos-engineering/get-started/onboarding/hce-onboarding.md)

### Execute chaos experiments

1. Navigate to the left nav bar and click **Overview**. Click **Select a Cluster** to choose a cluster so that you can execute chaos experiments.

![select cluster](./static/guided/select-cluster-1.png)

2. Select an environment from the list and click **Next**.

![select env](./static/guided/select-env-2.png)

3. Select the target infrastructure on which you want to execute the chaos experiments. Click **Apply**.

![select infrastructure](./static/guided/select-infra-3.png)

4. Based on your inputs earlier, HCE discovers services in your cluster (that is, **service discovery**) to create chaos experiments.

![service discovery](./static/guided/service-discovery-4.png)

5. HCE automatically creates chaos experiments and selects a few experiments to execute.

![create experiment](./static/guided/create-exp-5.png)

6. HCE chooses to execute safe chaos experiments, that is, experiments that have a low blast radius.

![execute experiment](./static/guided/exec-exp-6.png)

### View logs and resilience dashboard

7. You can see the status of the chaos experiment execution, as well as view the experiment execution. You can also see the resilience score of the experiment if you click **View Resilience Dashboard**.

![experiment status](./static/guided/exp-status-7.png)

8. To view the experiment execution logs, click **View Execution** which opens on a new page. Here, you can see the logs of the experiment.

![error log](./static/guided/error-log-8.png)

### View the progress of an experiment

1. You can view the progress of a chaos experiment you created earlier. Click **View Progress**.

![view progress](./static/guided/view-progress-9.png)

2. Click **View** on the infrastructure where you executed the chaos experiment.
![cluster view](./static/guided/cluster-view-10.png)

## Conclusion
Congratulations! You completed the guided HCE onboarding. Now you are all set to explore the chaos faults and build resilience of your application.
