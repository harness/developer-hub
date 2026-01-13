---
title: Default Values and Overrides
slug: /release-orchestration/inputs-and-variables/default-values-and-overrides
description: Learn how to set default values and override them at different levels
sidebar_position: 5
---

Default values make it easier to execute the same process repeatedly by reducing the amount of information users need to provide each time.

Overrides let you adjust inputs for a specific execution without changing the process structure, giving you flexibility to handle exceptions and special cases while maintaining a consistent base configuration.

## Default values

Variables can carry a default value that's used when no specific value is provided during execution. If you execute a release multiple times, such as on a weekly schedule, defaults significantly reduce the amount of data users must enter.

This makes the release process more efficient and reduces the chance of errors from missing or incorrect inputs.

Default values work particularly well for values that remain consistent across most executions but occasionally need to change. By providing sensible defaults, you create a smoother experience for users while still maintaining the flexibility to customize when needed.

## Overrides

When you pre-execute or execute a release, you can override defaults if a different value is required for that specific run. This override mechanism allows you to handle exceptions without modifying the process definition, making it easy to adapt to special circumstances while keeping the standard configuration intact.

Overrides are particularly useful when you need to use a different build target, change a rollout strategy, or adjust any other configuration for a one-time execution.

The system respects these overrides and uses them instead of the default values for that specific release execution.

## Example

If a process uses three global variables as the minimum required inputs, you have flexibility in how you handle them. For standard runs, you can keep the default values that were defined in the process, allowing the release to execute with minimal user input.

For an exception run that requires different behavior, such as a different build target or rollout strategy, you can override one or more values to customize that specific execution without affecting the process definition or future runs.

## Best Practices

### Sensible Defaults

Provide sensible defaults that work for common use cases. These defaults should be safe values that won't cause issues if used as-is, and they should be well-documented so users understand what they're getting.

Make sure these defaults are easy to override when needed, ensuring users aren't locked into default behavior when their situation requires something different.

### Clear Overrides

Make overrides explicit and clear so it's obvious when a value has been overridden from its default. Document overrides where possible, especially in team environments where multiple people might be working with the same release process.

This documentation helps others understand why a particular value was changed and what the override accomplishes.

## Related Topics

- [Inputs and Variables Overview](./overview.md)
- [Variable Mapping](./variable-mapping.md)
- [Global Variables](./variable-types/global-variables.md)

