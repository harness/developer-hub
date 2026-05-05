---
title: Executions Management
description: View and manage queued pipeline executions across your account
sidebar_position: 6
keywords:
  - executions
  - pipeline queue
  - queued pipelines
tags:
  - pipelines
---

The Executions Management page gives you account-level visibility into all queued pipeline executions. When pipelines are waiting to run, you can see exactly where they are in the queue and abort executions that are no longer needed.

:::info Feature Flag
This feature is behind the feature flag `PIPE_QUEUED_PIPELINE_OBSERVABILITY`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

## What queued executions are

When you trigger multiple pipelines simultaneously, Harness queues some executions based on resource constraints and concurrency limits you have configured. Instead of failing or rejecting new executions, the system holds them in a queue and runs them in order when resources become available.

Executions sit in the queue for three main reasons: the pipeline has resource constraints configured, the maximum concurrent executions limit has been reached, or the pipeline is waiting for another pipeline to release a lock it needs.

## Accessing the Executions Management page

To view queued executions, navigate to **Account Settings** and select **Security and Governance**. You will find **Executions Management** among the available options.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/executions-management-location.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

:::info Account Admin Required
Only users with Account Admin permissions can access the Executions Management page. This is an account-level view showing queued pipelines across all organizations and projects.
:::

## Queue behavior

Each row in the table represents a pipeline waiting to execute. The queue position shows where that pipeline sits in the global account queue - position 1 means it is next to run, position 2 is after that, and so on.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/executions-management-table.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

The table shows you the essential information about each queued execution. You will see the pipeline name and which project and organization it belongs to. The trigger summary tells you how the execution started - whether someone ran it manually, a cron schedule triggered it, or a webhook fired. The "Executed By" column shows who or what initiated the run.

:::note Queue Position
Queue positions are calculated globally across your entire account. When you apply filters to narrow down the list, the queue numbers stay the same - you might see positions 5, 240, and 1320 with gaps in between. Those gaps represent pipelines that are still in the queue but hidden by your current filters.
:::

## Filter queued pipelines

The filter panel helps you narrow down the list when you have many queued executions. You can filter by organization to see only pipelines from specific orgs. The project filter works together with the organization filter - when you select organizations, the project dropdown updates to show only projects within those orgs.

Priority filtering lets you focus on high, medium, or low priority executions. The status filter breaks down why pipelines are queued - whether they are in the standard queue, waiting due to concurrency limits, paused, waiting for an async operation, or waiting for a task to complete.

The timeframe filter helps you find pipelines queued during a specific period. You can choose Last 7 days, Last 30 days, Last 90 days, or set a custom date range. The search box at the top lets you find pipelines by name or identifier.

## Abort queued executions

Aborting a queued execution removes it from the queue before it starts running. You might need to abort executions when you have triggered the wrong pipeline, or when newer changes make an older deployment unnecessary.

### Abort a single execution

To abort a single execution, click the more actions menu (**⋮**) next to that pipeline and select **Abort**. Confirm the abort and the execution will be removed from the queue immediately.

### Bulk abort multiple executions

For multiple executions, use the checkboxes to select the ones you want to abort. Once you have selected at least one, the **Bulk Abort** button becomes active at the top of the list. Click it, review your selections, and confirm.

The system will attempt to abort each selected execution. Some aborts might fail if an execution has already started running or completed while you were making your selection. The bulk abort results will show you which ones succeeded and which ones could not be aborted.

:::warning Abort is immediate
Once you abort an execution, it is removed from the queue permanently. There is no way to resume it - you will need to trigger the pipeline again if you want it to run.
:::

## Common scenarios

### Abort outdated deployments

When multiple deployment pipelines queue up for the same service during active development, you often only need the latest one. Filter by the relevant project, select the older deployments in the queue, and bulk abort them to keep just the most recent one.

### Clean up test executions

If you are developing or testing pipelines and have accumulated many test runs in the queue, filter by your test project and bulk abort them. This frees up the queue for production pipelines that need to run.

### Identify bottlenecks

When you notice pipelines with very high queue positions (100+), it indicates a bottleneck. Look at the types of pipelines queued and their resource constraints. You might need to adjust concurrency limits, optimize pipeline execution time, or review resource constraint settings to reduce queue buildup.

## Limitations

The Executions Management page only shows queued executions. For running or completed pipelines, use the [Pipeline Execution History](/docs/platform/pipelines/executions-and-logs/view-and-compare-pipeline-executions) view instead.

You cannot reorder the execution queue or change priorities from this page. The queue order is determined by when executions were created and their configured priority settings.

Queue positions are calculated when the page loads. As executions complete and new ones are added, positions change. Refresh the page to see the current queue state.

The table displays a maximum of 100 executions per page.

## Related pages

- [View and compare pipeline executions](/docs/platform/pipelines/executions-and-logs/view-and-compare-pipeline-executions)
- [Pipeline execution graph](/docs/platform/pipelines/pipeline-execution-graph)
- [Barriers](/docs/platform/pipelines/barriers)
