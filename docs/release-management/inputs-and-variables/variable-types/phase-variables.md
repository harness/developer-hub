---
title: Phase Variables
slug: /release-orchestration/inputs-and-variables/variable-types/phase-variables
description: Learn about phase variables and how to scope variables to phases
sidebar_position: 2
---

Phase variables are inputs that are shared across all activities in a phase. They provide an intermediate scope between global and activity variables, making them ideal for configuration that applies to all activities within a specific phase but may differ between phases.

## What are Phase Variables?

Phase variables are scoped to the phase where they're defined, making them available only within that specific phase. They can inherit values from global variables if those values aren't overridden at the phase level.

Each phase can have its own unique set of variables, and these variables are isolated from other phases, providing clear boundaries for phase-specific configuration.

## Examples

Phase variables work well for values that need to be consistent across all activities within a phase but may differ between phases. Common examples include the environment name for the phase, such as "staging" or "prod", which all activities in that phase will use.

A region for a wave deployment, like "us-east-1" or "eu-west-1", is another good use case. A common change ticket ID that applies to all activities in a "Change Management" phase is often defined as a phase variable.

## Characteristics

Phase variables are scoped to the phase, meaning all activities within that phase can reference them via expressions. This scoping allows you to avoid duplicating the same value on each activity, reducing configuration overhead and ensuring consistency.

These variables are evaluated by the same expression engine reused from the pipeline service, providing consistent evaluation behavior across all activities.

## Conceptual Example

Consider a "Staging Deployment" phase with a phase variable `env = "staging"`. All activities within this phase can reference this variable. For example, the "Deploy Service A" activity uses `env` to select the environment, and the "Run smoke tests" activity uses `env` to choose the test environment.

This ensures all activities in the phase use the same environment value without each activity needing to define it separately.

## Defining Phase Variables

Phase variables are typically mapped from global variables so users provide only the minimum set of inputs at execution time. This mapping approach reduces the number of values users need to provide while still allowing phase-specific customization.

For example, a global variable might define a base environment name, and phase variables can derive specific environment values from it.

## Using Phase Variables

### Variable Resolution

The system resolves variables in this order: phase variables are checked first, then global variables, and finally process defaults.

This resolution order ensures that phase-specific values take precedence over global values, allowing you to override global defaults at the phase level when needed.

## Variable Isolation

### Phase Isolation

Variables are isolated per phase. Phase A has its own variables, and Phase B has its own variables. Variables don't share between phases, providing clear boundaries for variable scope.

This isolation means you can have different values for the same variable name in different phases without conflicts.

## Best Practices

### Appropriate Scope

Use phase variables when the variable is only needed within a single phase, for phase-specific configuration, for isolated phase logic, or when you need phase-specific defaults that differ from global defaults.

This helps keep your variable hierarchy clean and makes it easier to understand which values apply where.

### Clear Naming

Use descriptive names that make it clear what the variable represents and how it's used. For example, use `deployment_max_retries` rather than a generic name like `retries`.

Good naming becomes especially important when you have multiple phases that might use similar but different variables.

## Related Topics

- [Inputs and Variables Overview](../overview.md)
- [Global Variables](./global-variables.md)
- [Activity Variables](./activity-variables.md)
- [Variable Mapping](../variable-mapping.md)

