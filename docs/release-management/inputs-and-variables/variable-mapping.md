---
title: Variable Mapping
slug: /release-orchestration/inputs-and-variables/variable-mapping
description: Learn how to map variables between different scopes and components
sidebar_position: 4
---

Variable mapping allows you to map values between different variable scopes, pass data between phases and activities, and transform variable values.

## What is Variable Mapping?

Variable mapping enables the flow of variables from global to phase to activity levels, creating an easy flow of variables and ease of use for end users to understand the minimum set of inputs they have to provide.

Variable mapping enables:
- **Scope Mapping**: Map between scopes (global → phase → activity)
- **Input Simplification**: Abstract pipeline inputs for users

## Variable Flow

The variable mapping flow works as follows:

1. **Global Variables** are defined at the process level (typically 3-5 key inputs)
2. **Phase Variables** get mapped to global variables
   - Example: Phase variable `build_target` gets mapped to a global variable
3. **Activity Variables** (for pipeline activities) get mapped to phase variables
   - Phase variables, in turn, get mapped to global variables
   - Activity variables map to the pipeline in case of an automated activity
4. **Activity Outputs** can be captured from pipeline executions and used as inputs to later activities
   - Outputs from one activity become inputs to subsequent activities
   - This enables dynamic workflows where values generated in early phases flow to later phases

This way, there is an easy flow of variables and ease of use for end users to understand the minimum set of inputs they have to provide.

## Activity Output Mapping

Activities can capture outputs from pipeline executions and make those values available to other activities. This is useful when you need to:

- Generate a dynamic value (version number, artifact URL) in one pipeline
- Use that value as input to multiple subsequent pipelines
- Maintain data consistency across different phases

### Configuring Activity Outputs

In the source activity (the one generating the value), define outputs that capture pipeline output variables:

```yaml
activity:
  id: generate_version
  outputs:
    RELEASE_VERSION: <+pipeline.stages.version_stage.spec.execution.steps.generate_step.output.outputVariables.VERSION>
```

### Mapping Outputs to Inputs

In the process input configuration, map the source activity's output to the destination activity's input:

```yaml
processInput:
  phases:
    - id: deployment
      activities:
        - id: deploy_activity
          inputs:
            VERSION: <+phase.generation.activity.generate_version.outputs.RELEASE_VERSION>
```

### Expression Syntax for Activity Outputs

To reference an activity's output in a process input:

```
<+phase.<PHASE_ID>.activity.<ACTIVITY_ID>.outputs.<OUTPUT_NAME>>
```

**Example:**
- Phase ID: `build_phase`
- Activity ID: `build_app`
- Output name: `ARTIFACT_URL`
- Expression: `<+phase.build_phase.activity.build_app.outputs.ARTIFACT_URL>`

:::important Phase Dependencies
When using activity outputs, ensure the destination phase depends on the source phase using `depends-on`. Without this dependency, phases may execute in parallel, and the output value won't be available when needed.
:::

Go to [Passing Activity Outputs](/docs/release-orchestration/examples-and-walkthroughs/passing-activity-outputs) to explore a complete walkthrough with examples.

## Benefits

### Simplified Input Requirements

By mapping variables from global → phase → activity:
- Users only need to provide the key inputs (typically global variables)
- The rest are mapped within the process
- Pipeline inputs are abstracted, making it easier for users who just want to execute and understand the inputs in a simple form

### Example Flow

For a complex release process with 3 global variables:
- **Global Variable 1**: `release_version`
- **Global Variable 2**: `environment`
- **Global Variable 3**: `deployment_strategy`

These global variables will in turn be mapped to:
- **Phase variables**: Each phase can have variables that map to global variables
- **Activity variables**: Each activity (especially pipeline activities) can have variables that map to phase variables

When executing the release, users only need to provide these 3 global variables, and the system handles the mapping to phase and activity variables automatically.

## Related Topics

- [Inputs and Variables Overview](./overview.md)
- [Default Values and Overrides](./default-values-and-overrides.md)
- [Global Variables](./variable-types/global-variables.md)

