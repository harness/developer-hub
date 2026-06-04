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

## Capturing Pipeline Outputs

Pipeline activities can capture output variables from pipeline executions. This allows you to extract dynamic values generated during pipeline execution (such as version numbers, artifact URLs, or configuration IDs) and use them as inputs to later activities.

### Defining Activity Outputs

Configure the `outputs` section in your activity to capture pipeline output variables:

```yaml
activity:
  id: build_activity
  name: Build Application
  outputs:
    # Capture output variable from pipeline
    ARTIFACT_VERSION: <+pipeline.stages.build_stage.spec.execution.steps.build_step.output.outputVariables.VERSION>
    ARTIFACT_URL: <+pipeline.stages.build_stage.spec.execution.steps.publish_step.output.outputVariables.ARTIFACT_URL>
  pipeline:
    pipeline: org/project/build_pipeline
```

### Output Expression Syntax

The expression to capture a pipeline output variable follows this structure:

```
<+pipeline.stages.<STAGE_ID>.spec.execution.steps.<STEP_ID>.output.outputVariables.<VAR_NAME>>
```

**Example:**
- Stage ID: `build_stage`
- Step ID: `build_step`  
- Output variable name: `VERSION`
- Expression: `<+pipeline.stages.build_stage.spec.execution.steps.build_step.output.outputVariables.VERSION>`

### Pipeline Output Variable Requirements

For an output variable to be captured, the pipeline step must define it in the `outputVariables` section:

```yaml
- step:
    type: ShellScript
    name: Build
    spec:
      script: |
        VERSION="v1.2.3"
        export VERSION="$VERSION"
      outputVariables:
        - name: VERSION
          type: String
          value: VERSION
```

:::tip
Test your pipeline manually before creating the activity to verify that output variables are generated correctly. Check the step's Output tab in the pipeline execution view.
:::

## Using Activity Outputs in Later Activities

Once an activity captures outputs, those values can be passed to subsequent activities through [process input configuration](/docs/release-orchestration/inputs-and-variables/variable-mapping).

**Example workflow:**
1. Build activity outputs: `ARTIFACT_VERSION = "v1.2.3"`
2. Deploy activity expects input: `VERSION`
3. Process input maps: `VERSION: <+phase.build.activity.build_app.outputs.ARTIFACT_VERSION>`

Go to [Passing Activity Outputs](/docs/release-orchestration/examples-and-walkthroughs/passing-activity-outputs) for a complete walkthrough.

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

