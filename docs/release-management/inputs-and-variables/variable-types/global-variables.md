---
title: Global Variables
slug: /release-orchestration/inputs-and-variables/variable-types/global-variables
description: Learn about global variables and how to use them across the entire release
sidebar_position: 1
---

Global variables are inputs that are defined at the process (release) level and shared across all phases and activities. They provide the broadest variable scope in the hierarchy, making them ideal for configuration that applies to the entire release and needs to be consistent across all phases and activities.

## What are Global Variables?

Global variables are process-wide, meaning they're available in all phases and activities throughout the release. They represent the highest scope in the variable hierarchy, providing the broadest reach for configuration values.

Each global variable is unique to its release, allowing you to configure values that are specific to that particular release execution. These variables are configurable and can be set per release, giving you flexibility to customize the release behavior without modifying the underlying process definition.

## Examples

Global variables work well for values that need to be consistent across the entire release. Common examples include the release version or release name, which typically remains constant throughout all phases.

Account, organization, or project identifiers are another good use case when these need to be referenced across multiple phases. A change request ID that applies to the full release is often defined as a global variable, as is a feature flag rollout strategy that's used across multiple phases.

## Characteristics

Global variables have the highest-level scope, making them available everywhere in the release. They're typically stable across the lifecycle of that release execution, meaning their values don't change once the release begins. These variables are evaluated via the shared pipeline expression engine, which provides consistent evaluation behavior across all phases and activities.

## Benefits of Variable Scopes

Together, the three variable scopes provide complementary capabilities. Activity variables offer fine-grained, per-step configuration for individual activities. Phase variables provide per-phase context, reducing duplication across activities within the same phase.

Global variables provide release-wide context, enabling consistent naming, evidence collection, and correlations across the entire release. These variables are stored and resolved by Release Orchestration and the orchestration engine to create the final executable graphs that drive release execution.

## Defaults and overrides

Global variables can have default values assigned when they're created, which provides a baseline configuration for the release. These defaults ensure the release can execute successfully even if no specific values are provided.

You can override these defaults for a specific execution when needed, allowing you to customize the release behavior without modifying the process definition.

## Best Practices

### Meaningful Names

Use descriptive names that clearly indicate what the variable represents and how it's used. For example, use `deployment_timeout` rather than a generic name like `timeout1`.

Good naming makes it easier to understand the variable's purpose and reduces confusion when working with multiple variables.

### Documentation

Document your global variables thoroughly to help users understand how to use them correctly. Include the variable's purpose, expected values, default values, and usage examples.

This documentation becomes especially valuable when multiple team members need to work with the same release process.

### Default Values

Provide sensible defaults that work for common use cases. These defaults should be safe values that won't cause issues if used as-is, and they should be well-documented so users understand what they're getting.

Make sure these defaults are overridable, allowing users to customize them when their specific use case requires different values.

## Related Topics

- [Inputs and Variables Overview](../overview.md)
- [Phase Variables](./phase-variables.md)
- [Activity Variables](./activity-variables.md)
- [Variable Mapping](../variable-mapping.md)

