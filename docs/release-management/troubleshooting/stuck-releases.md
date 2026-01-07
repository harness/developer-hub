---
title: Stuck Releases
slug: /release-orchestration/troubleshooting/stuck-releases
description: Learn how to identify and resolve stuck releases
sidebar_position: 2
---

Stuck releases are releases that are not progressing. This guide helps identify and resolve them.

## Identifying Stuck Releases

### Signs of Stuck Release
- **No Progress**: No progress for extended period
- **Pending Status**: Stuck in pending status
- **Waiting**: Waiting for dependencies
- **Blocked**: Blocked by approvals

## Common Causes

### Dependency Issues
Dependencies not met:
- **Failed Dependencies**: Dependencies failed
 - **Blocked activities**: An activity is waiting on a prior activity to complete

### Approval Issues
Approvals blocking:
- **Pending Approvals**: Approvals pending
- **Missing Approvers**: Approvers not assigned

## Resolution

### Dependency Resolution
Resolve dependencies:
- **Check Status**: Check dependency status
 - **Fix and continue**: Fix the underlying issue (for example, a pipeline error) and continue execution
 - **Retry or ignore**: Retry a failed activity or ignore it and continue (based on your process requirements)

### Approval Resolution
Resolve approvals:
- **Check Approvals**: Check approval status
- **Assign Approvers**: Assign approvers
 - **Complete sign-off**: Complete the manual activity by recording inputs/sign-off so the release can proceed

## Related Topics

- [Common Issues](./common-issues.md)
- [Variable Mapping Errors](./variable-mapping-errors.md)
- [Execution Failures](./execution-failures.md)

