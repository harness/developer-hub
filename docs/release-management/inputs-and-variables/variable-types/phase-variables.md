---
title: Phase Variables
slug: /release-orchestration/inputs-and-variables/variable-types/phase-variables
description: Learn about phase variables and how to scope variables to phases
sidebar_position: 2
---

Phase variables are inputs that are shared across all activities in a phase.

## What are Phase Variables?

Phase variables are:
- **Phase-Scoped**: Available only in the phase
- **Inherited**: Can inherit from global
- **Phase-Specific**: Unique to the phase
- **Isolated**: Isolated from other phases

## Examples

Following are examples of phase variables:

- **Environment name** for the phase ("staging", "prod")
- **Region** for a wave ("us-east-1", "eu-west-1")
- **Common change ticket ID** for all activities in the "Change Management" phase

## Characteristics

- **Scoped to the phase**: All activities within that phase can reference them via expressions
- **Avoid duplication**: Allow you to avoid duplicating the same value on each activity
- **Evaluated by expression engine**: Evaluated by the same expression engine reused from pipeline service

## Conceptual Example

- **Phase**: "Staging Deployment"
- **Phase variable**: `env = "staging"`
- **Activities**:
  - "Deploy Service A" uses `env` to select environment
  - "Run smoke tests" uses `env` to choose test environment

## Defining Phase Variables

Phase variables are typically mapped from global variables so users provide only the minimum set of inputs at execution time.

## Using Phase Variables

### Variable Resolution
Resolution order:
1. Phase variables
2. Global variables
3. Process defaults

## Variable Isolation

### Phase Isolation
Variables isolated per phase:
- **Phase A**: Has its own variables
- **Phase B**: Has its own variables
- **No Sharing**: Variables don't share
- **Clear Scope**: Clear boundaries

## Best Practices

### Appropriate Scope
Use phase variables when:
- Variable only needed in phase
- Phase-specific configuration
- Isolated phase logic
- Phase-specific defaults

### Clear Naming
Use descriptive names:
- **Recommended:** `deployment_max_retries`
- **Avoid:** `retries`

## Related Topics

- [Inputs and Variables Overview](../overview.md)
- [Global Variables](./global-variables.md)
- [Activity Variables](./activity-variables.md)
- [Variable Mapping](../variable-mapping.md)

