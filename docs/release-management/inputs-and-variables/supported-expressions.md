---
title: Supported Expressions
slug: /release-orchestration/inputs-and-variables/supported-expressions
description: Reference guide for all supported expressions in Release Orchestration
sidebar_position: 10
---

Release Orchestration supports Harness expressions for dynamically referencing inputs, outputs, and variables across releases, processes, phases, and activities. These expressions are evaluated at runtime, allowing you to pass values between execution contexts and use runtime data to control release behavior.

---

## What you will learn from this topic

- How to [reference release and process inputs](#release-and-process-inputs) in your configurations.
- How to [reference phase and activity outputs](#phase-and-activity-outputs) to chain workflows.
- How to [use conditional expressions](#conditional-expressions-ifcondition) to control activity execution.

---

## Expression syntax

Use Harness JEXL expressions wrapped in `<+...>`. 

Example:

```
<+releaseInput.global.DeployVersion>
```

Expressions are evaluated at runtime and resolve to the actual values from your release inputs, activity outputs, or variables.

---

## Release and Process Inputs

Use these expressions to reference input values provided when creating or executing a release.

| Expression | Description | Example |
|---|---|---|
| `<+releaseInput.global.<name>>` | References a global release input available across all phases and activities | `<+releaseInput.global.DeployVersion>` |
| `<+releaseInput.phase.<name>>` | References a phase-scoped input available only to activities within that phase | `<+releaseInput.phase.Region>` |
| `<+activityInput.<name>>` | References an activity-specific input available only within that activity | `<+activityInput.environment>` |

---

## Phase and Activity Outputs

Use these expressions to reference outputs from completed phases or activities.

| Expression | Description | Example |
|---|---|---|
| `<+process.<phaseId>.output.<name>>` | References an output produced by an entire phase | `<+process.phase1.output.phaseOutput1>` |
| `<+process.<phaseId>.<activityId>.output.<name>>` | References an output from a specific activity within a phase | `<+process.phase1.activityA.output.pipelineName>` |

---

## Conditional Expressions (`ifCondition`)

Use conditional expressions in the `ifCondition` field to control whether an activity executes based on runtime values.

| Expression | Description | Example |
|---|---|---|
| Boolean | Compares values against `true` or `false` | `<+<+activityInput.shouldDeploy> == true>` |
| String | Compares text values using `==` or `!=` | `<+<+activityInput.env> == "prod">` |
| Combined | Uses `&&` (AND) or `\|\|` (OR) to evaluate multiple conditions | `<+<+<+activityInput.deploy> == true> && <+<+releaseInput.global.enableProd> == true>>` |

---

## Related Topics

- [Inputs and Variables Overview](./overview.md) - Learn about the input and variable system
- [Variable Mapping](./variable-mapping.md) - Map variables between activities and pipelines
- [Input Store](./input-store.md) - Manage input sets for releases
- [Global Variables](./variable-types/global-variables.md) - Release-level variables
- [Phase Variables](./variable-types/phase-variables.md) - Phase-scoped variables
- [Activity Variables](./variable-types/activity-variables.md) - Activity-scoped variables
