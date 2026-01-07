---
title: End-to-End Release Walkthrough
slug: /release-orchestration/examples-and-walkthroughs/end-to-end-release-walkthrough
description: Complete walkthrough of a release from creation to completion
sidebar_position: 2
---

This walkthrough demonstrates the complete lifecycle of a release from creation through execution to completion.

## Step 1: Create or select a process

- Create a process using Harness AI (or select an existing process).
- Review phases, activities, dependencies, and owners.
<!-- Screenshot: create process using Harness AI -->

## Step 2: Add activities from the Activity Store

- Add reusable activities to phases.
- Use pipeline activities for automated steps and manual activities for sign-off and input capture.
<!-- Screenshot: activity store -->

## Step 3: Model and schedule the release

- Create a release from the process.
- Configure cadence (on demand, scheduled, or recurring release group).
- Open the release in the Release Calendar.
<!-- Screenshot: model releases + release calendar -->

## Step 4: Pre-execute and provide inputs

- Pre-execute the release (or wait for the scheduled time).
- Provide the minimum required inputs using the Input Store.
<!-- Screenshot: pre-execute + inputs -->

## Step 5: Execute and monitor

- Monitor phase and activity progress.
- Review the activity execution history.
- If needed, retry, ignore, or fix-and-continue.
<!-- Screenshot: execution + execution history -->

## Step 6: Manual sign-off (when required)

- When a phase is waiting for approval, complete the manual activity and record sign-off inputs.
<!-- Screenshot: manual sign-off -->

## Related Topics

- [Multi-Service Release Example](./multi-service-release-example.md)

