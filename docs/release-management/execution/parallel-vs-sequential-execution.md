---
title: Parallel vs Sequential Execution
slug: /release-orchestration/execution/parallel-vs-sequential-execution
description: Learn how to model processes with parallel and sequential execution
sidebar_position: 4
---

You can model processes that contain different sequences of execution in terms of parallel and sequential execution.

## Modeling Execution Sequences

### Phase Dependencies
Phases can have dependencies preconfigured. For example:
- The **test phase** has dependencies on the **build phase**
- The **validation phase** has dependencies on the **build phase**
- Phases execute in the order defined by their dependencies

### Activity Dependencies
Activities within each phase can also have dependencies. For example:
- **Activity 3** (a manual pipeline or automated activity) and **Activity 3.1** (a manual activity) are dependent on **Activity 2** (an automated pipeline activity)
- Activities execute in the order defined by their dependencies

## Execution Patterns

### Sequential Execution
When activities have dependencies, they execute sequentially:
- Activities wait for their dependencies to complete
- Execution follows the dependency chain

### Parallel Execution
When activities don't have dependencies on each other, they can execute in parallel:
- Independent activities can run simultaneously
- Execution is optimized for speed

With this structure, it is possible to model complex release processes and execute them using a release.

## Related Topics

- [Executing a release](./executing-a-release.md)
- [Activity Execution Flow](./activity-execution-flow.md)
- [Activity Dependencies](../activities/activity-dependencies.md)

