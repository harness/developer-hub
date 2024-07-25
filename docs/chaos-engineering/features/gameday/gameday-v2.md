---
title: Run a GameDay
sidebar_position: 3
description: Guide to creating and executing a GameDay
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/gameday/run-gameday
- /docs/chaos-engineering/configure-chaos-experiments/gameday/gameday-v2
---

This section describes how to create and execute [GameDay](/docs/chaos-engineering/features/gameday/introduction-to-gameday).

## Before you begin
- Fulfill the [prerequisites](/docs/chaos-engineering/features/gameday/introduction-to-gameday#prerequisites-to-execute-a-gameday) and [plan your GameDay](/docs/chaos-engineering/features/gameday/introduction-to-gameday#plan-your-gameday) before creating one.
- GameDay requires an active chaos infrastructure. If you don't have one, go to [create a new infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-2-add-a-chaos-infrastructure) to create one.

### Start a GameDay run

If you have created your GameDay earlier, select **Start New Run** to run the GameDay; otherwise, [create a GameDay](#create-a-gameday).

 ![](./static/v2/gameday-runs-0.png)

### Create a GameDay

1. Select **+New GameDay**.

    ![](./static/v2/click-gameday-1.png)

### Add stakeholder and role

2. Add stakeholder names, their roles, and whether they are required to approve a GameDay run. Anyone can approve or reject a GameDay run. Select **Next: Select Prerequisites**.

    ![](./static/v2/add-stakeholder-3.png)

### Create prerequisites

You can create prerequisites for your GameDay to:
 * Validate environment health.
 * Check the availability of relevant chaos tools.
 * Check if the chaos tools are configured with the right chaos artefact sources.
 * Check the availability of the team members.

3. Select **+ Add prerequisite**.

    ![](./static/v2/create-prereq-4.png)

4. Enter a title and a description (optional). Select **Save**.

    ![](./static/v2/save-pre-5.png)

### Select experiments

5. Select **Next: Select Experiments** to select chaos experiments to execute.

    ![](./static/v2/new-exp-6.png)

6. Select an environment, an infrastructure type, an infrastructure, and a ChaosHub. Select the chaos experiment and select **Add Experiment to GameDay**.

    ![](./static/v2/select-experiments-9.png)

7. Select **Save** (or **Discard** if you don't want to proceed). You can add a new experiment, edit or delete existing experiments in this step.

    ![](./static/v2/save-gameday-10.png)

### Check prerequisites

8. Once the stakeholders approve the GameDay run, you can proceed.

    ![](./static/v2/get-approval-12.png)

:::info note
- A stakeholder can reject the run and state reasons in the comments.

 ![](./static/v2/add-or-edit-14.png)
:::

9. Select **Next: Check prerequisites** to validate whether the prerequisites you mentioned earlier have been fulfilled.

    ![](./static/v2/check-prereq-15.png)

10. You can verify if the prerequisites are fulfilled, and check them. If one of them is not fulfilled, you will not be able to execute the experiments.

    ![](./static/v2/pending-prereq-16.png)

:::tip
- You can add comments about the prerequisite validation.
 ![](./static/v2/comment-prereq-18.png)
:::

### Execute experiments

11. Once all the prerequisites are fulfilled, select **Next: Run experiments**.

    ![](./static/v2/comment-added-19.png)

12. Once all the experiments complete execution, select **Done Running Experiments**.

    ![](./static/v2/done-exp-21.png)

:::info note
- Select **Terminate GameDay Run** to stop GameDay execution. Select **Terminate this run** to confirm.

 ![](./static/v2/terminal-run-29.png)

- Select **Add/View Notes** to note your findings about experiments in the GameDay.

 ![](./static/v2/experiment-notes-22.png)
:::

13. Once the experiments complete execution, select **Complete GameDay Run**. You can view the summary of the runs and the run observations.

    ![](./static/v2/complete-25.png)

:::info note
- Select **Done Running Experiments** to complete the run. If your chaos experiments have faults that have not run, they will be marked **Skipped**.

 ![](./static/v2/done-running-28.png)
:::

## View GameDay run report

To view the GameDay run report, navigate to your GameDay run and select **View Report**.

    ![](./static/v2/view-report.png)

### Download GameDay run report

1. To download the report, select **Download Report** on the page where you view the GameDay run report.

    ![](./static/v2/download-report.png)

2. Select **Save** and specify a name for the file (or use the default name provided).

    ![](./static/v2/save-report.png)

## Conclusion

Congratulations on scheduling (or running) your GameDay! Based on the results, you can take steps to improve the resilience of your application.