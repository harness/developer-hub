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

This way, there is an easy flow of variables and ease of use for end users to understand the minimum set of inputs they have to provide.

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

## Best Practices

### Clear Mapping
Use clear mappings:
- **Descriptive Names**: Clear variable names
- **Documentation**: Document mappings
- **Examples**: Provide examples

### Error Handling
Handle mapping errors:
- **Default Values**: Provide defaults
- **Error Messages**: Clear errors
- **Fallbacks**: Fallback values

## Related Topics

- [Inputs and Variables Overview](./overview.md)
- [Default Values and Overrides](./default-values-and-overrides.md)
- [Global Variables](./variable-types/global-variables.md)

