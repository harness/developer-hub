---
title: Default Values and Overrides
slug: /release-orchestration/inputs-and-variables/default-values-and-overrides
description: Learn how to set default values and override them at different levels
sidebar_position: 5
---

Default values make it easier to execute the same process repeatedly. Overrides let you adjust inputs for a specific execution without changing the process structure.

## Default values

By default, variables can carry a default value. If you execute a release multiple times (for example, weekly), defaults reduce the amount of data users must enter.

## Overrides

When you pre-execute or execute a release, you can override defaults if a different value is required for that run.

## Example

If a process uses three global variables as the minimum required inputs, you can:

- Keep default values for standard runs.
- Override one or more values for an exception run (for example, a different build target or rollout strategy).

## Best Practices

### Sensible Defaults
Provide sensible defaults:
- **Common Use Cases**: Common values
- **Safe Values**: Safe defaults
- **Well-Documented**: Document defaults
- **Overridable**: Easy to override

### Clear Overrides
Make overrides clear:
- **Explicit**: Explicit overrides
- **Documented**: Document overrides

## Related Topics

- [Inputs and Variables Overview](./overview.md)
- [Variable Mapping](./variable-mapping.md)
- [Global Variables](./variable-types/global-variables.md)

