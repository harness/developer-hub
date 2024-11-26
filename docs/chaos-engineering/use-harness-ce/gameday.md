---
id: GameDay
sidebar_position: 3
canonical_url: https://www.harness.io/blog/chaos-engineering
title: GameDay
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/gameday/introduction-to-gameday
- /docs/chaos-engineering/features/gameday/introduction-to-gameday
- /docs/category/gameday
- /docs/chaos-engineering/concepts/explore-concepts/GameDay
---

This section describes what a GameDay is, why it is essential, how a typical GameDay is run, and its outcomes.

### What is a GameDay?

GameDay is a methodology used by teams to practice chaos engineering. These teams execute chaos experiments on the application during a specific period. It is a template to schedule and execute one or more chaos experiments across your applications.
It determines the incident response process, that is, how well your application responds/behaves during an outage, and how quickly and effectively it returns to normalcy.

### Why is a GameDay important?

In general, GameDays helps apply a fatal scenario to your application in a safe environment, thereby determining the application's resilience and verifying the system at scale.

At every step in implementing a GameDay, you will either find a glitch in the system that you can address or gain confidence in your application.

### Steps in a GameDay

A GameDay typically involves the following steps:

1. Run chaos experiments on your application,
2. Observe the impact of the failure,
3. Discuss the technical outcomes.

To watch a video on GameDay, go to [GameDay](https://youtu.be/X-4Ripb4e2c) that describes how you can schedule a GameDay execution.

:::tip
GameDays help decide the type of failure the system would undergo based on the nature of the chaos experiments present within GameDay. Hence, HCE strongly recommends you begin with easy use cases with minimal blast radius, such as breaking one container, degrading one instance, and making one availability zone unavailable. Later, you can delve into more complex failures, such as failing an entire service or affecting a large percentage of requests.
:::

### How to execute a GameDay?
Running a GameDay using HCE's GameDay feature involves the following steps:

1. Plan your GameDay
2. Create a GameDay and specify the details
3. Add experiments to the GameDay and save it
4. Schedule or run the GameDay
5. Record the conclusion and action items

:::info note
Once you create a GameDay in HCE, you can run it multiple times. HCE saves information about every run, which includes the date, summary, and any notes you add.
:::

### Prerequisites to execute a GameDay

1. HCE account
2. Access to a cluster
3. Appropriate permissions to execute a GameDay

### Permissions required

ChaosHubs are associated with chaos experiments, hence you need permissions to create new experiments and modify exisiting experiments. Chaos experiments, in turn, are executed in a chaos infrastructure, hence you need to have access to **create/edit** and **view** the **chaos infrastructure**. Go to **Project Settings** -> **Access Control** -> **Roles** and create a new role or ask your project admin to create an appropriate role.

![](./static/gameday/perms-reqd.png)

### Plan your GameDay

Address the following questions before proceeding to run a GameDay:

1. Which services should I test?
2. What is the goal of the GameDay?
3. What should I verify or determine by the end of the GameDay?

Once these questions have a viable answer, you can proceed to create a GameDay.

Creating a GameDay involves two steps:

1. Specifying details about the GameDay,
2. Adding chaos experiments to the GameDay.

### Start a GameDay run

If you have created your GameDay earlier, select **Start New Run** to run the GameDay; otherwise, [create a GameDay](#create-a-gameday).

 ![](./static/gameday/gameday-runs-0.png)

### Create a GameDay

1. Go to **Chaos** module, select **GameDay** and click **+New GameDay**.

2. Add stakeholder names, their roles, and whether they are required to approve a GameDay run. Anyone can approve or reject a GameDay run. Select **Next: Select Prerequisites**.

    ![](./static/gameday/add-stakeholder-3.png)

You can create prerequisites for your GameDay to:
 * Validate environment health.
 * Check the availability of relevant chaos tools.
 * Check if the chaos tools are configured with the right chaos artefact sources.
 * Check the availability of the team members.

3. Select **+ Add prerequisite**. Enter a title and a description (optional). Select **Save**.

    ![](./static/gameday/create-prereq-4.png)

5. Select **Next: Select Experiments** to select chaos experiments to execute.

    ![](./static/gameday/new-exp-6.png)

6. Select an environment, an infrastructure type, an infrastructure, and a ChaosHub. Select the chaos experiment and select **Add Experiment to GameDay**.

    ![](./static/gameday/select-experiments-9.png)

7. Select **Save** (or **Discard** if you don't want to proceed). You can add a new experiment, edit or delete existing experiments in this step.

    ![](./static/gameday/save-gameday-10.png)

8. Once the stakeholders approve the GameDay run, you can proceed.

    ![](./static/gameday/get-approval-12.png)

:::info note
- A stakeholder can reject the run and state reasons in the comments.

  ![](./static/gameday/add-or-edit-14.png)
:::

9. Select **Next: Check prerequisites** to validate whether the prerequisites you mentioned earlier have been fulfilled.

    ![](./static/gameday/check-prereq-15.png)

10. You can verify if the prerequisites are fulfilled, and check them. If one of them is not fulfilled, you will not be able to execute the experiments.

    ![](./static/gameday/pending-prereq-16.png)

:::tip
- You can add comments about the prerequisite validation.

  ![](./static/gameday/comment-prereq-18.png)
:::

11. Once all the prerequisites are fulfilled, select **Next: Run experiments**.

    ![](./static/gameday/comment-added-19.png)

12. Once all the experiments complete execution, select **Done Running Experiments**.

    ![](./static/gameday/done-exp-21.png)

:::info note
- Select **Terminate GameDay Run** to stop GameDay execution. Select **Terminate this run** to confirm.

 ![](./static/gameday/terminal-run-29.png)

- Select **Add/View Notes** to note your findings about experiments in the GameDay.

 ![](./static/gameday/experiment-notes-22.png)
:::

13. Once the experiments complete execution, select **Complete GameDay Run**. You can view the summary of the runs and the run observations.

    ![](./static/gameday/complete-25.png)

:::info note
- Select **Done Running Experiments** to complete the run. If your chaos experiments have faults that have not run, they will be marked **Skipped**.

 ![](./static/gameday/done-running-28.png)
:::

## View GameDay run report

To view the GameDay run report, navigate to your GameDay run and select **View Report**.

    ![](./static/gameday/view-report.png)

### Download GameDay run report

1. To download the report, select **Download Report** on the page where you view the GameDay run report.

    ![](./static/gameday/download-report.png)

2. Select **Save** and specify a name for the file (or use the default name provided).

    ![](./static/gameday/save-report.png)

## Conclusion

Congratulations on scheduling (or running) your GameDay! Based on the results, you can take steps to improve the resilience of your application.