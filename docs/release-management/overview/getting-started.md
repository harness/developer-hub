---
title: Getting started
slug: /release-orchestration/overview/getting-started
sidebar_position: 1
---

Release Orchestration helps you model a release process, connect it to releases on a cadence, and execute that process with visibility into phases and activities.

## Before you begin

- Confirm you have access to the **Release Orchestration** module in Harness.
- Identify the owners who will be responsible for phases in your process (for example, Development, QA, and DevOps).

## Step 1: Create a process (AI-first)

1. In the Release Orchestration module, open **Processes**.
2. Create a new process using **Harness AI**, then provide a prompt that describes your release flow end-to-end.
3. Review the generated process:
   - The process is created with **phases** (logical groups of work) and **activities** (units of work in a phase).
   - Owners can be assigned per phase based on your prompt.
4. Save the process.

<!-- Screenshot to add: process creation prompt and generated phases/owners. -->

### Example prompt

Use a prompt like this as a starting point:

```text
Create a process for a multi-service release.
Include phases for planning and coordination, build, testing/validation, feature flag enablement, deployment, monitoring, and rollback/documentation.
Assign phase owners for Development, QA, and DevOps.
```

## Step 2: Add activities from the Activity Store

1. Open the process you created.
2. For each phase, add activities from the **Activity Store**.
3. Configure automated activities to encapsulate the pipelines you want to run.

<!-- Screenshot to add: selecting an activity from Activity Store and adding it to a phase. -->

## Step 3: Model dependencies (sequential and parallel)

As needed, define dependencies:

- **Phase dependencies**: For example, Testing depends on Build.
- **Activity dependencies**: For example, a manual activity depends on a pipeline activity.

<!-- Screenshot to add: a process showing dependencies across phases and activities. -->

## Step 4: Connect the process to releases on a cadence

1. Open **Release Calendar**.
2. Create (or open) a **Release Group** with the cadence you want (for example, recurring every Thursday and running for two days).
3. Link the release group’s releases to the process you created so each release executes using that process.

<!-- Screenshot to add: release group cadence and the linked process. -->

## Step 5: Pre-execute a release and provide inputs

1. From the Release Calendar, open a specific release.
2. Review the linked process and choose **Pre-execute** (or let it run at the scheduled time).
3. Provide inputs for the execution:
   - A process can have multiple **input instances** so you can run the same process multiple times with different input values.
   - Inputs can be managed as an **Input Store** (different sets of inputs for the same process).

<!-- Screenshot to add: input selection / input store before execution. -->

## Step 6: Execute and monitor

During execution, you can track:

- Activity-level status (running, succeeded, failed, on hold)
- Phase-level progress
- Overall process execution status

If an automated activity fails, you can remediate by choosing actions such as **retry** or **ignore** (based on your situation) to continue the execution.

If the execution is waiting for sign-off, complete the **manual activity** by providing the required inputs and approval.

<!-- Screenshot to add: execution view with activity history, remediation actions, and a manual activity waiting for approval. -->

## Next steps

- [Overview](./what-is-release-orchestration.md)
- [Key Concepts](./key-concepts.md)
- [Applications](./use-cases.md)

