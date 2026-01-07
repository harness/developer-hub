---
title: Activity Execution Flow
slug: /release-orchestration/execution/activity-execution-flow
description: Understand how activities are executed and their execution flow
sidebar_position: 3
---

Activities execute based on their dependencies and type.

## Activity Execution

### Pipeline Activities
Pipeline activities (automated activities) execute by:
- Triggering the associated Harness pipeline
- Passing activity inputs to the pipeline
- Tracking pipeline execution status
- Capturing pipeline outputs

### Manual Activities
Manual activities execute by:
- Going into an "on hold" or "waiting for input" state
- Sending notifications to assigned users
- Waiting for users to record their inputs and finalize them
- Completing once user provides sign-off or input

### Subprocess Activities
Subprocess activities execute by:
- Invoking the nested process
- Executing the subprocess phases and activities
- Propagating status back to the parent process

## Dependencies

Activities execute based on their dependencies:
- Activities wait for their dependencies to complete
- Dependencies can be configured between activities within a phase
- Dependencies control the execution order

## Related Topics

- [Executing a release](./executing-a-release.md)
- [Parallel vs Sequential Execution](./parallel-vs-sequential-execution.md)
- [Error handling](./error-handling.md)

