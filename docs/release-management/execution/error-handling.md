---
title: Error handling
slug: /release-orchestration/execution/error-handling
description: Learn how to handle failures and input-required steps during execution
sidebar_position: 3
---

During execution, an activity can fail or pause waiting for input. Use the execution view and activity execution history to decide whether to **retry**, **ignore**, or **fix and continue**.

## Retry

Retry an activity when the failure is transient or after you’ve addressed the underlying issue.

- Retry re-runs the same activity using the existing configuration and inputs.
- If the root cause is resolved, the activity can complete and the release continues.

## Ignore

Ignore is useful when an activity is non-critical for the rest of the execution.

- Ignoring marks the failed activity as skipped/ignored and moves execution to the next activity.
- The ignore action remains visible in execution history for traceability.

Example from the demo: when a pipeline activity fails, you can **ignore** it and the release moves on to the next activity.

## Fix and continue

Use fix-and-continue when you need to correct the underlying issue and then resume execution.

Common flow:

1. Fix the underlying issue (for example, update the pipeline or configuration).
2. Update inputs if needed (via Input Store).
3. Retry the activity and continue the release.

## On hold / input required

Some activities can move to an **on hold / input required** state.

- This can happen when manual input or sign-off is needed, or when additional information is required to proceed.
- When this happens, notifications can be sent to the relevant owners so they can provide the required input and resume execution.

## Related Topics

- [Executing a release](./executing-a-release.md)

