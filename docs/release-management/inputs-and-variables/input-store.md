---
title: Input Store
slug: /release-orchestration/inputs-and-variables/input-store
description: Learn about the input store and how to manage reusable inputs
sidebar_position: 2
---

Activities are parameterized to allow reuse, which means the definition of an activity is separate from its inputs. This separation enables you to create generic activity templates that can be used in different contexts with different configurations.

The Activity Template holds the generic definition of the function, describing what the activity does and what inputs it requires. The Input Store holds the concrete values for a given process, phase, or activity instance within an execution.

This separation allows you to reuse the same activity template multiple times with different input values, making your processes more flexible and maintainable.

## What is the Input Store?

The Input Store is a collection of input sets for a process. There can be different sets of inputs for the same process, allowing you to execute a release multiple times with different values.

This capability is essential for running the same release process with different configurations, such as deploying to different environments or using different build artifacts.

In the demo flow, you typically interact with the Input Store when you pre-execute or execute a release and provide the minimum required inputs. This is where you supply the concrete values that will be used for that specific release execution, either accepting defaults or overriding them as needed.

## What the Input Store holds

The Input Store holds concrete values at multiple levels of the release hierarchy. It stores process-level inputs that apply to the entire release, phase-level inputs that are specific to individual phases, and activity instance inputs that are unique to specific activities within an execution.

For automated activities, these activity instance inputs map directly to pipeline inputs, allowing you to pass values from the release orchestration layer down to the underlying pipeline execution.

## Defaults and overrides

To support repeated executions of the same process, the Input Store provides mechanisms for defaults and overrides. Inputs and variables can have default values that are used when no specific value is provided, reducing the amount of information users need to enter for routine executions.

You can override these values at execution time when needed, giving you the flexibility to customize a specific release execution without modifying the process definition or default values.

## Related Topics

- [Inputs and Variables Overview](./overview.md)
- [Variable Mapping](./variable-mapping.md)
- [Default Values and Overrides](./default-values-and-overrides.md)

