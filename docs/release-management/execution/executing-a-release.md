---
title: Executing a Release
slug: /release-orchestration/execution/executing-a-release
description: Learn how to execute a release and monitor its progress
sidebar_position: 2
---

This guide walks you through the complete release execution process, from starting a release to monitoring its progress and handling any issues that arise along the way. Understanding how execution works helps you effectively manage releases and respond quickly when intervention is needed.

## What is release execution?

Release execution is the process of running a release according to the phases, activities, and dependencies you've defined in your release process. When you execute a release, the system follows your process definition step by step, running activities in the correct order and respecting dependencies between them.

During execution, you can track what's happening at multiple levels. The release level shows you the overall progress, while phase and activity views give you detailed insight into what's currently running, what's completed, and what's waiting for input.

This multi-level visibility helps you understand exactly where your release is in the process and identify any bottlenecks or issues that need attention.

## Starting execution

You have flexibility in when and how you start a release execution. On-demand execution starts the release immediately when you trigger it, which works well for urgent deployments or when you're ready to proceed right away.

Scheduled execution lets you plan ahead by setting a specific date and time for the release to begin automatically. This is useful for coordinating releases with maintenance windows or ensuring releases happen during business hours.

If you've scheduled a release but need to start it earlier than planned, you can use pre-execution to begin the release before its scheduled time. This gives you the planning benefits of scheduling while maintaining the flexibility to move forward when everything is ready.

## Monitoring execution

Once a release starts executing and moves into the running state, you gain real-time visibility into what's happening. The monitoring interface shows you which activities are currently executing, which have completed successfully, and which are waiting for input or have encountered issues.

### Status monitoring

The monitoring interface provides status information at multiple levels to help you understand the release's current state. The overall status shows you the release's current state—whether it's running, has succeeded, failed, or is on hold waiting for input.

This high-level view gives you an immediate sense of whether the release is progressing normally or needs attention.

At the phase level, you can see which phases have completed successfully, which are currently running, and which are waiting for approval or other manual input. This helps you understand the release's progress through its major stages and identify where it might be paused or blocked.

The activity view shows the execution status of individual activities, giving you the most granular view of what's happening. You can see which activities are running, which have completed, and which have failed or are waiting for input.

The activity execution history provides a complete record of each activity's execution, including any errors that occurred with specific pipelines or activities, which is invaluable for troubleshooting issues.

## Handling failures and input-required steps

When an activity fails or requires input, the release doesn't necessarily stop—you have several options for how to proceed. The error handling system provides actions that let you respond appropriately based on the situation.

If an activity fails due to a transient issue, you can retry it without making any changes. This works well for network timeouts, temporary service unavailability, or other issues that might resolve themselves on a second attempt.

For failures that aren't critical to the release's success, you can choose to ignore the failure and continue execution, allowing the release to proceed even though that particular activity didn't complete.

When you need to fix an underlying issue before continuing, the fix and continue option lets you address the problem and then resume execution from where it left off. This is useful when you've identified the root cause and can resolve it quickly, avoiding the need to restart the entire release.

Manual activities require human input before they can proceed, and these appear as "on hold" or "input required" in the execution status. When activities enter this state, the overall release process shows a message indicating how many activities require your input, and notifications are sent to the designated approvers or users.

These inputs might be approval decisions, additional information needed beyond what was provided at release start, or fixes for issues that were discovered during execution.

## Completion

Releases complete with one of several possible statuses depending on how execution proceeded. A Success status means all required phases completed successfully, indicating the release achieved its intended outcome.

A Failed status indicates that at least one critical phase failed and no recovery action was applied, meaning the release didn't complete as intended.

If your release process is modeled to allow partial success, you might see a PartialSuccess status. This occurs when some phases succeeded while others failed or were skipped, which can happen in complex releases where not all components need to succeed for the release to be considered acceptable.

Understanding these completion statuses helps you determine whether a release achieved its goals and what follow-up actions might be needed.

## Related Topics

- [Activity Execution Flow](./activity-execution-flow.md)
- [Error handling](./error-handling.md)

