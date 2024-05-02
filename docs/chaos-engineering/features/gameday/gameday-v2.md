---
title: Run a GameDay (V2)
sidebar_position: 3
description: Guide to creating and executing a GameDay
---

This section describes how to create and execute [GameDay](/docs/chaos-engineering/features/gameday/introduction-to-gameday.md) V2.

- If you are an existing HCE user, head to GameDay V1 to create and execute a GameDay.

- Fulfill the [prerequisites](/docs/chaos-engineering/features/gameday/run-gameday#prerequisites) and [plan your GameDay](/docs/chaos-engineering/features/gameday/run-gameday#plan-your-gameday) before creating one.

### Start a GameDay run

- If you have created your GameDay earlier, select **Start New Run** to run the GameDay; otherwise, [create a GameDay](#create-a-gameday).

 ![](./static/v2/gameday-runs-0.png)

### Create a GameDay

1. To create a GameDay, click **+New GameDay**.

 ![](./static/v2/click-gameday-1.png)

### Add stakeholder and role

2. Add stakeholder names, their roles, and whether they are allowed to approve a GameDay run. Only a stakeholder can approve or reject a GameDay run. Click **Next: Select Prerequisites**.

 ![](./static/v2/add-stakeholder-3.png)

### Create prerequisites

You can create prerequisites for your GameDay that would:
 * Validate environment health.
 * Check the availability of relevant chaos tools.
 * Check if the chaos tools are configured with the right chaos artefact sources.
 * Check the availability of the team members.

3. Select **+ Add prerequisite**.

 ![](./static/v2/create-prereq-4.png)

4. Enter a name and a description (optional). Click **Save**.

 ![](./static/v2/save-pre-5.png)

5. Click **Next: Select Experiments** to select chaos experiments to execute.

 ![](./static/v2/list-prereq-6.png)

### Select experiments

6. Select an environment, an infrastructure type, an infrastructure, and a ChaosHub. Select the chaos experiment and click **Add Experiment to GameDay**.

 ![](./static/v2/select-experiments-9.png)

7. Click **Save** (or **Discard** if you don't want to proceed). You can edit or delete experiments in this step.

 ![](./static/v2/save-gameday-10.png)

:::tip
* Click the experiment to view the details of the selected experiment.

 ![](./static/v2/select-exp-11.png)
:::

### Check prerequisites

8. Once the stakeholder approves the GameDay run, you can proceed.

 ![](./static/v2/get-approval-12.png)

:::info note
- A stakeholder can reject the run and state reasons in the comments.

 ![](./static/v2/add-or-edit-14.png)
:::

9. Click **Next: Check prerequisites** to validate whether the prerequisites you mentioned earlier have been fulfilled.

 ![](./static/v2/check-prereq-15.png)

10. HCE checks if the prerequisites are fulfilled. If one of them is not fulfilled, you will not be able to execute the experiments.

 ![](./static/v2/pending-prereq-16.png)

:::tip
- You can add comments about the prerequisite validation.
 ![](./static/v2/comment-prereq-18.png)
:::

### Execute experiments

11. Once all the prerequisites are fulfilled, click **Next: Run experiments**.

 ![](./static/v2/comment-added-19.png)

12. Once all the experiments complete execution, click **Done Running Experiments**.

 ![](./static/v2/done-exp-21.png)

:::info note
- Select **Terminate GameDay Run** to stop GameDay execution. Click **Terminate this run** to confirm.

 ![](./static/v2/terminal-run-29.png)

- Click **Add/View Notes** to note your findings about the GameDay.

 ![](./static/v2/experiment-notes-22.png)
:::

13. Once the experiments complete execution, you can view the summary of the runs and the run observations. Click **Complete GameDay Run**.

 ![](./static/v2/complete-25.png)

:::info note
- Select **Done Running Experiments** to complete the run. If your chaos experiments have faults that have not run, they will be marked **Skipped**.

 ![](./static/v2/done-running-28.png)
:::

### Download report

14. Click **Download Run Report** to download the report.

 ![](./static/v2/download-27.png)

### View experiment execution

- Click the experiment in the GameDay to view manifest details. Click **View Execution** to see more.

 ![](./static/v2/experiment-details-23.png)

## Conclusion

Congratulations on scheduling (or running) your GameDay! Based on the results, you can take steps to improve the resilience of your application.