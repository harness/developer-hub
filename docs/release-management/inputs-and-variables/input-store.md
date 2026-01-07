---
title: Input Store
slug: /release-orchestration/inputs-and-variables/input-store
description: Learn about the input store and how to manage reusable inputs
sidebar_position: 2
---

Activities are parameterized. To allow reuse, the definition of an activity is separate from its inputs.

- The **Activity Template** holds the generic definition of the function
- The **InputStore** holds the concrete values for a given:
  - Process
  - Phase
  - Activity instance within an execution

## What is the Input Store?

The **Input Store** is a collection of input sets for a process. There can be different sets of inputs for the same process, allowing you to execute a release multiple times with different values.

In the demo flow, you typically interact with the Input Store when you **pre-execute** or **execute** a release and provide the minimum required inputs.

## What the Input Store holds

The Input Store holds concrete values for:

- **Process-level inputs**
- **Phase-level inputs**
- **Activity instance inputs** within an execution (for automated activities, these map to pipeline inputs)

## Defaults and overrides

To support repeated executions:

- Inputs and variables can have **default values**.
- You can **override** values at execution time when needed.

## Related Topics

- [Inputs and Variables Overview](./overview.md)
- [Variable Mapping](./variable-mapping.md)
- [Default Values and Overrides](./default-values-and-overrides.md)

