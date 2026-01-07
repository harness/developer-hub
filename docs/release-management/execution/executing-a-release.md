---
title: Executing a Release
slug: /release-orchestration/execution/executing-a-release
description: Learn how to execute a release and monitor its progress
sidebar_position: 2
---

This guide covers release execution end-to-end: what happens when a release runs, how to start execution, what to monitor, and how to handle failures or input-required steps.

## What is release execution?

Release execution runs a release using the phases, activities, and dependencies defined in the connected process. During execution, you can track status at the release, phase, and activity levels and take action when input is required or an activity fails.

## Start execution

Releases can be executed in one of the following ways:

- **On-demand**: Execute immediately.
- **Scheduled**: Execute at a specific date and time.
- **Pre-executed**: Execute before the scheduled time.

## Monitor execution

Once a release starts executing and moves into running state, you can see what activities are getting executed and what's happening with each release.

### Status Monitoring

When monitoring a running release, you can see:
- **Overall Status**: Release status (Running, Success, Failed, etc.)
- **Phase Status**: Which phases are successful, which are waiting for approval (manual activities), which are running
- **Activity Status**: Individual activity execution status
- **Activity Execution History**: Shows status of each activity and any errors with respect to particular pipelines or activities

## Handle failures and input-required steps

If an activity fails or needs input, use **Error handling** for the available actions:

- **Retry** a failed activity.
- **Ignore** a failed activity and continue.
- **Fix and continue** when you need to correct the underlying issue and resume execution.
- Complete manual steps when an activity is **on hold / input required**.

If activities go into an "on hold" state, the overall process shows "there are X activities requiring your input" and notifications are sent to users. Inputs could be in the form of:
- An issue that needs to be fixed
- An additional input required apart from the release inputs

## Completion

Releases complete with one of the following statuses:
- **Success**: All required phases succeeded
- **Failed**: At least one critical phase failed and recovery was not applied
- **PartialSuccess** (if modeled): Some phases succeeded, others failed or skipped

## Related Topics

- [Activity Execution Flow](./activity-execution-flow.md)
- [Error handling](./error-handling.md)

