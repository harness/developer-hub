---
title: Timeline View of Experiment
sidebar_position: 6
---

This topic introduces **Timeline View** and demonstrates how you can use it to visually analyze and track the progress of your chaos experiments.

## Before you begin, review the following

- [Chaos Experiment](/docs/chaos-engineering/guides/chaos-experiments/)
- [Create Chaos Experiment](/docs/chaos-engineering/guides/chaos-experiments/create-experiments)

:::info note
This feature is currently behind the feature flag `CHAOS_NG_EXPERIENCE`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

## What is Timeline View?
**Timeline View** provides a visual representation of all events associated with a **chaos experiment** during execution. It displays each event with their respective **timestamps**. 
For example, if a chaos experiment has a resilience probe configured, the timeline view displays it and the time when the probe execution began.

In the diagram below, you can see pod delete fault and its probe running serially with container kill and pod delete faults (along with their respective probes) running in parallel in the timeline view.

	![timeline view 2](./static/timeline/view-2.png)

The steps outlined below describe the process that occurs from the moment a chaos experiment begins execution until its completion.

- **Step 1:** Chaos injection starts → Begin event logging on the timeline along with timestamp.
- **Step 2:** Probe validation runs → Continue logging.
- **Step 3:** Pod deletion executes → Event appears with metadata.
- **Step 4:** Rollback/Cleanup occurs → Logged with metadata.
- **Step 5:** Experiment completes → Entire sequence available for review.

## Why Use Timeline View?
- **Enhanced Visibility and Accurate Debugging** – Timeline view provides a clear view of all experiment-related actions in a chronological sequence and easily identify when and where failures occurred during the experiment.
- **Event Metadata Access** – Clicking on events reveal detailed information about their execution, helping you pinpoint issues or failures.
- **Better Experiment Analysis** – Helps in understanding the effect of chaos faults and probes over time.

## How Does Timeline View Work?

Clicking on an event displays the metadata, providing insights such as configuration, parameters provided, status of the experiment/fault (if the execution is complete), logs, and so on helping you track the precise execution flow of the experiment.

1. **Start a Chaos Experiment** – When an experiment begins, Timeline View starts recording events.
2. **Events are Logged with Timestamps** – Each action (for example, chaos injection, probe execution, result) appears on the timeline.
3. **Click on an Event to View Metadata** – Selecting an event displays additional details like:
   - **Event type** (for example, fault injection, probe validation, rollback)
   - **Start and end time**
   - **Execution result (Success/Failure)**
   - **Additional metadata** (logs, system status, error details)
4. **Monitor the Experiment Flow** – The timeline continuously updates in real-time, providing an ongoing overview of the experiment's progress.
5. **Analyze the Experiment Outcome** – Once the experiment completes, use the timeline to review and analyze the execution details.

## How to View the Timeline?
- Select the experiment you want to run or create one, and click **Run**. Once the experiment begins execution, you can see the **View Timeline View** on the screen. 

	![timeline view](./static/timeline/view-timeline-1.png)

- Clicking the expriment gives the experiment name, tunables, and status of the experiment.

	![experiment information view](./static/timeline/exp-info-4.png)

- Clicking the probe gives the details, logs, and status of the probe.
	
	![probe information view](./static/timeline/probe-info-3.png)


## Conclusion
**Timeline View** allows you to visually track and analyze the full scope of chaos experiments, helping pinpoint issues thereby contributing to improve the resilience of the application.
