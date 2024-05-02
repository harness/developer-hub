---
title: Run a GameDay (V1)
sidebar_position: 2
description: Guide to creating and executing a GameDay
redirect_from:
   - /docs/chaos-engineering/configure-chaos-experiments/gameday/run-gameday
---

This section describes how to create and execute a [GameDay](/docs/chaos-engineering/features/gameday/introduction-to-gameday.md).

## Prerequisites

1. HCE account
2. Access to a cluster

## Plan your GameDay

Address the following questions before proceeding to run a GameDay:

1. Which services should I test?
2. What is the goal of the GameDay?
3. What should I verify or determine by the end of the GameDay?

Once these questions have a viable answer, you can proceed to create a GameDay.

If you are new to HCE, head to [GameDay V2](/docs/chaos-engineering/features/gameday/gameday-v2.md) and follow the steps to create and run a GameDay

### Create a GameDay

1. To create a GameDay, click **+New GameDay**.

      ![](./static/run-gameday/1-landing-page.png)

2. Add details such as **GameDay name**, **Objectives**, and **Description** (optional). Click **Next-> Select Chaos Experiments**.

   ![](./static/run-gameday/2-create-new-gameday.png)

### Add experiments to the GameDay

3. After creating a GameDay, add experiments to the GameDay by clicking **New Chaos Experiment**.

   ![](./static/run-gameday/3-add-experiments-to-gameday.png)

4. You can add experiments by selecting the ones available in the ChaosHub.

   ![](./static/run-gameday/4-list-experiments-from-chaoshub.png)

### Add infrastructure

5. Select a chaos infrastructure. Click **Add experiments to the GameDay**.

   ![](./static/run-gameday/6-add-experiments-to-gameday.png)

   :::tip
   You can add up to 20 experiments to every GameDay, and every chaos experiment can be executed on a different chaos infrastructure.
   :::

6. This will lead you to a page that lists the experiments you selected for the current GameDay. You can add or delete experiments from this page.

   ![](./static/run-gameday/7-add-multiple-experiments.png)

7. Select the experiment to see a preview of the experiment's pipeline.

   ![](./static/run-gameday/8-view-exp.png)

8. After adding the experiments to the GameDay, click **Save**.

   ![](./static/run-gameday/9-save-experiment.png)

### Schedule or run the GameDay

9. Now that you have the experiments in the GameDay, you are all set to schedule or run them.

   ![](./static/run-gameday/10-gameday-created.png)

10. Click **Start GameDay**. This creates experiments within your GameDay.

      ![](./static/run-gameday/11-start-gameday.png)

11. Clicking GameDay leads you to the page that contains the experiments associated with the GameDay.

      ![](./static/run-gameday/12-gameday-in-progress.png)

12. On this page, you can **Run** the experiment.

      ![](./static/run-gameday/13-gameday-details.png)

13. Click **Run Experiment**. This begins the execution of the experiment.

      ![](./static/run-gameday/14-run-experiment.png)


### Record the conclusion and action items

14. You can add a summary of the experiments in the GameDay by clicking **Add/View Notes**.

      ![](./static/run-gameday/15-summary-at-exp-level.png)

15. You can mark a GameDay run as complete by clicking **Mark Run as Complete**. After this action, you will not be able to rerun the experiments inside the GameDay run. This completed run serves as a checkpoint within the GameDay that helps keep track of how the application fared during a specific situation.

      ![](./static/run-gameday/17-run-complete.png)

## Conclusion

Congratulations on scheduling (or running) your first GameDay! Based on the results, you can take steps to improve the resilience of your application.