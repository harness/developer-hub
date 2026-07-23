---
title: Executions Management
description: View and manage queued and running pipeline executions across your account.
sidebar_position: 6
keywords:
  - executions
  - pipeline queue
  - queued pipelines
  - running pipelines
tags:
  - pipelines
---

The **Executions Management** page gives you account-level visibility into all queued and running pipeline executions. You can see where queued executions sit in the queue, monitor executions that are currently running, and abort executions that are no longer needed.

:::note Feature flag
This feature is behind the feature flag `PIPE_QUEUED_PIPELINE_OBSERVABILITY`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

---

## What will you learn in this topic?

- How to [access Executions Management](#access-executions-management) and what queued and running executions represent.
- How to read the [queue behavior](#queue-behavior), including execution status.
- How to [filter executions](#filter-executions).
- How to [abort executions](#abort-executions).

---

## Access Executions Management

Go to **Account Settings**, select **Security and Governance**, and then select **Executions Management**.

<div align="center"><DocImage path={require('./static/executions-management-location.png')} alt="Executions Management location in Account Settings under Security and Governance" width="100%" /></div>

:::note Account Admin required
Only users with Account Admin permissions can access the **Executions Management** page. This is an account-level view showing queued and running pipelines across all organizations and projects.
:::

The **Executions Management** page lists two kinds of executions across your entire account:

- **Queued**: Executions that are waiting to run.
- **Running**: Executions that are currently running.

When you trigger multiple pipelines simultaneously, Harness queues some executions based on the resource constraints and concurrency limits you have configured. Instead of failing or rejecting new executions, Harness holds them in a queue and runs them in order when resources become available.

Executions sit in the queue for three main reasons: the pipeline has resource constraints configured, the maximum concurrent executions limit is reached, or the pipeline is waiting for another pipeline to release a lock it needs.

---

## Queue behavior

Each row represents a queued or running execution. The table shows the following information:

- **Queue No**: The execution's position in the global account queue, where position 1 is next to run. Running executions show a dash (`-`) because they are no longer in the queue.
- **Pipeline Name**: The pipeline name and its execution ID.
- **Status**: The execution state, such as **RUNNING** or a queued reason.
- **Project** and **Organization**: The project and organization the execution belongs to.
- **Trigger Summary**: The way the execution started, such as a manual run, a cron schedule, or a webhook.
- **Executed By**: The user or system that initiated the run.

<div align="center"><DocImage path={require('./static/executions-management-table.png')} alt="Executions Management table showing running executions with the Status column" width="100%" /></div>

:::note Queue position
Queue positions are calculated globally across your entire account. When you apply filters to narrow the list, the queue numbers stay the same. You might see positions such as 5, 240, and 1320 with gaps in between. Those gaps represent executions that are still queued but hidden by your current filters.
:::

---

## Filter executions

Use the **Filter** option to narrow the list. The available filters include:

- **Search**: Find executions by pipeline name or identifier.
- **Organization** and **Project**: Show executions from specific organizations and projects. The project filter updates to show only projects within the selected organizations.
- **Status**: Filter by execution state, including **Queued Execution Concurrency Reached**, **Queued Plan Creation**, and **Running**.
- **Priority**: Focus on high, medium, or low priority executions.
- **Trigger Type**: Filter by how the execution was triggered, such as a manual run, a cron schedule, or a webhook.
- **Pipeline Tags**: Filter by the tags applied to pipelines.
- **Timeframe**: Show executions from a specific period, such as the last 7, 30, or 90 days, or a custom range.

Select **Add Filter** to apply more filters. Select **Save** to keep a filter set, or **Reset** to clear all filters.

---

## Abort executions

You can abort both queued and running executions. Aborting a queued execution removes it from the queue before it starts. Aborting a running execution stops it. You might abort executions when you triggered the wrong pipeline, or when newer changes make an older execution unnecessary.

Perform the following steps to abort executions:

1. Select one or more executions using the checkboxes.
2. Select **Abort** at the top of the list. The button shows how many executions are selected.
3. Review your selection and confirm.

Harness attempts to abort each selected execution. Some aborts might fail if an execution completed while you were making your selection. The results show which aborts succeeded and which could not be completed.

:::warning Abort is permanent
Once you abort an execution, there is no way to resume it. Trigger the pipeline again if you want it to run.
:::

---

## Common scenarios

### Abort outdated deployments

When multiple deployment pipelines queue up for the same service during active development, you often need only the latest one. Filter by the relevant project, select the older executions, and abort them to keep just the most recent one.

### Clean up test executions

If you are developing or testing pipelines and have accumulated many test runs, filter by your test project and abort them. This frees up capacity for production pipelines that need to run.

### Identify bottlenecks

When you notice executions with very high queue positions (100+), it indicates a bottleneck. Look at the types of pipelines queued and their resource constraints. You might need to adjust concurrency limits, optimize pipeline execution time, or review resource constraint settings to reduce queue buildup.

---

## Limitations

The **Executions Management** page shows queued and running executions. For completed pipelines, use the <a href="/docs/platform/pipelines/executions-and-logs/view-and-compare-pipeline-executions" target="_blank" rel="noopener noreferrer">Pipeline Execution History</a> view instead.

You cannot reorder the execution queue or change priorities from this page. The queue order is determined by when executions were created and their configured priority settings.

Queue positions are calculated when the page loads. As executions complete and new ones are added, positions change. Refresh the page to see the current queue state.

The table displays a maximum of 100 executions per page.

---

## Next steps

- <a href="/docs/platform/pipelines/executions-and-logs/view-and-compare-pipeline-executions" target="_blank" rel="noopener noreferrer">View and compare pipeline executions</a>: Review completed executions and compare their details.
- <a href="/docs/platform/pipelines/pipeline-execution-graph" target="_blank" rel="noopener noreferrer">Pipeline execution graph</a>: Understand how an execution is visualized.
- <a href="/docs/platform/pipelines/barriers" target="_blank" rel="noopener noreferrer">Barriers</a>: Synchronize stages that run in parallel.
