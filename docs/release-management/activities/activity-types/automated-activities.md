---
title: Automated Activities
slug: /release-orchestration/activities/activity-types/automated-activities
description: Learn about automated activities and how to configure them
sidebar_position: 1
---

Automated activities execute without human intervention, enabling efficient and consistent release execution. These activities run automatically when their dependencies are satisfied, allowing releases to progress smoothly through multiple phases without manual steps.

## What are Automated Activities?

An automated activity is an activity that encapsulates a pipeline. It executes as part of a process when its dependencies are met, running the underlying pipeline automatically and handling the execution lifecycle without requiring human input.

## Pipeline Activities

Pipeline activities are the primary type of automated activities used in release orchestration. These activities encapsulate pipelines by containing or referencing a Harness pipeline that performs the actual work. When the activity executes, activity variables are mapped to pipeline inputs, allowing you to pass configuration and data from the release orchestration layer down to the pipeline execution.

The system tracks pipeline execution status automatically, providing visibility into what's happening at each step. Pipeline outputs can be captured and used in subsequent activities, enabling you to pass data between activities and build complex workflows where later steps depend on results from earlier ones.

## Example (YAML)

This example shows an activity in a process referencing a pipeline. The activity is defined within a phase and references a specific pipeline that will execute when this activity runs.

```yaml
phase:
  id: deploy_phase
  name: Deploy to Staging1 Phase
  activities:
    - activity: WaitingActivity
      id: WaitingActivity
      name: WaitingActivity
      depends-on: []
      data:
        pipeline:
          pipeline: default/MyProject/MyPipeline
          inputSet: {}
```

## Best Practices

### Idempotency

Design activities to be idempotent so they're safe to retry without causing problems. Idempotent activities produce no side effects when repeated and deliver consistent results regardless of how many times they execute.

This is especially important in release orchestration where activities might be retried due to transient failures or manual intervention.

### Error Handling

Implement robust error handling that provides clear error messages when things go wrong. Use appropriate retry strategies for transient failures, and ensure failure notifications are sent to the right people so issues can be addressed quickly.

Good error handling makes debugging easier and helps releases recover from problems automatically when possible.

### Logging

Ensure proper logging throughout the activity execution so you have visibility into what happened. Execution logs should capture the flow of operations, and error details should provide enough context to diagnose issues.

Performance metrics help you understand how long activities take and identify bottlenecks.

### Testing

Test automated activities thoroughly before using them in production releases. Unit testing verifies individual components work correctly, integration testing ensures activities work well with the rest of the release process, and failure scenario testing helps you understand how activities behave when things go wrong.

## Related Topics

- [Activities Overview](../activities-overview.md)
- [Manual Activities](./manual-activities.md)
- [Activity Dependencies](../activity-dependencies.md)

