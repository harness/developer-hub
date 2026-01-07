---
title: Global Variables
slug: /release-orchestration/inputs-and-variables/variable-types/global-variables
description: Learn about global variables and how to use them across the entire release
sidebar_position: 1
---

Global variables are inputs that are defined at the process (release) level and shared across all phases and activities.

## What are Global Variables?

Global variables are:
- **Process-Wide**: Available in all phases and activities
- **Highest Scope**: Broadest variable scope
- **Release-Specific**: Unique to each release
- **Configurable**: Can be set per release

## Examples

Following are examples of global variables:

- **Release version** or release name
- **Account/org/project identifiers** (where needed)
- **Change request ID** applying to the full release
- **Feature flag rollout strategy** used across phases

## Characteristics

- **Highest-level scope**: Available everywhere in the release
- **Typically stable**: Usually stable across the lifecycle of that release execution
- **Evaluated via expression engine**: Evaluated via the shared pipeline expression engine

## Benefits of Variable Scopes

Together, the three variable scopes provide:

- **Activity variables**: Fine-grained, per-step configuration
- **Phase variables**: Per-phase context, reducing duplication
- **Global variables**: Release-wide context, enabling consistent naming, evidence, and correlations

These are stored and resolved by Release Orchestration and the orchestration engine to create the final executable graphs.

## Defaults and overrides

Global variables can have default values and can be overridden for a specific execution when needed.

## Best Practices

### Meaningful Names
Use descriptive names:
- **Recommended:** `deployment_timeout`
- **Avoid:** `timeout1`

### Documentation
Document variables:
- Purpose
- Expected values
- Default values
- Usage examples

### Default Values
Provide sensible defaults:
- Common use cases
- Safe values
- Well-documented
- Overridable

## Related Topics

- [Inputs and Variables Overview](../overview.md)
- [Phase Variables](./phase-variables.md)
- [Activity Variables](./activity-variables.md)
- [Variable Mapping](../variable-mapping.md)

