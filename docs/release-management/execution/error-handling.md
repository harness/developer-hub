---
title: Error handling
slug: /release-orchestration/execution/error-handling
description: Learn how to handle failures and input-required steps during execution
sidebar_position: 3
---

During release execution, activities can fail or pause while waiting for input. When this happens, you need to decide how to proceed. The execution view and activity execution history provide the context you need to choose the right action: retry the activity, ignore the failure, or fix the underlying issue before continuing.

## Retry

The retry action is your go-to option when a failure appears to be transient or when you've already addressed the underlying issue. When you retry an activity, it re-runs using the same configuration and inputs that were used in the original attempt.

This works well for temporary problems like network timeouts, service unavailability, or other issues that might resolve themselves on a second attempt.

If the root cause has been resolved—perhaps you fixed a configuration issue or a dependent service came back online—the retry will succeed and the release continues normally. The retry action is logged in the execution history, so you can track how many attempts were made and whether the issue was resolved.

## Ignore

Sometimes an activity failure doesn't need to block the rest of the release. The ignore action lets you skip a failed activity and move execution forward to the next activity in the sequence. This is useful when an activity is non-critical for the rest of the execution, or when the failure doesn't impact downstream activities.

When you ignore a failed activity, it's marked as skipped or ignored in the execution status, but the action remains visible in the execution history for full traceability. This ensures you have a complete record of what happened, even though the release continued past the failure.

For example, if a pipeline activity fails but you know it's not required for the release to succeed, you can ignore it and the release moves on to the next activity without stopping.

## Fix and continue

When you need to correct an underlying issue before the release can proceed, the fix and continue workflow gives you the flexibility to address the problem and then resume execution. This is the right choice when the failure indicates a real problem that needs to be resolved, not just a transient issue.

The typical flow works like this: first, you fix the underlying issue, which might involve updating a pipeline configuration, correcting a deployment script, or resolving a dependency problem. If the fix requires different inputs than what was originally provided, you can update those inputs through the Input Store.

Once the issue is resolved and inputs are updated if needed, you retry the activity and the release continues from that point.

This approach lets you address real problems without having to restart the entire release, which saves time and preserves the work that's already been completed successfully.

## On hold / input required

Some activities enter an "on hold" or "input required" state during execution. This happens when the activity needs human intervention before it can proceed. Manual activities that require approvals or sign-offs will naturally enter this state, but other activities might also pause if they need additional information that wasn't provided at release start.

When an activity moves to this state, the system can send notifications to the relevant owners or approvers, alerting them that their input is needed. These notifications include context about what's needed and provide a direct link to the activity so they can provide the required input quickly.

Once the input is provided—whether it's an approval decision, additional configuration, or information needed to proceed—the activity can continue and the release resumes execution.

This state is different from a failure because the activity hasn't actually failed; it's simply waiting for the necessary input to continue. The release remains in a paused state until the required input is provided, giving you control over when execution proceeds.

## Related Topics

- [Executing a release](./executing-a-release.md)

