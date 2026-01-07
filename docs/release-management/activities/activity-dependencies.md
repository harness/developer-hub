---
title: Activity Dependencies
slug: /release-orchestration/activities/activity-dependencies
description: Learn how to configure dependencies between activities to control execution order
sidebar_position: 3
---

Activity dependencies control the execution order of activities within a phase. Properly configuring dependencies ensures activities execute in the correct sequence.

## What are Activity Dependencies?

Activity dependencies define which activities must complete before another activity can start. They ensure:
- Correct execution order
- Prerequisites are met
- Data and artifacts are available
- Validation occurs in proper sequence

## Dependency Types

### Sequential Dependencies
One activity must complete before another starts:

```yaml
phase:
  activities:
    - activity: AutoPipe
      id: AutoPipe
      name: AutoPipe90
      depends-on: []
    - activity: AutoPipe
      id: AutoPipe12
      name: AutoPipe12
      depends-on:
        - AutoPipe
```

**Execution Flow:**
```
Build → Test → Deploy
```

### Parallel Execution
Activities with no dependencies can run in parallel:

```yaml
phase:
  activities:
    - activity: AutoPipe
      id: AutoPipe
      name: AutoPipe90
      depends-on: []
    - activity: AutoPipe
      id: ManualTestUIUI
      name: ManualTestUIUI
      description: doc
      depends-on: []
```

**Execution Flow:**
```
Build Service A ─┐
Build Service B ─┼→ Integration Test
Build Service C ─┘
```

### Conditional Dependencies
Dependencies that depend on conditions:

```yaml
phase:
  activities:
    - activity: AutoPipe
      id: AutoPipe12
      name: AutoPipe12
      depends-on:
        - AutoPipe
    - activity: AutoPipe
      id: TestActivity00
      name: TestActivity00
      depends-on:
        - AutoPipe12
      if: <+90>
```

## Dependency Configuration

### Basic Dependency
Simple dependency declaration:

```yaml
activity:
  name: "Activity B"
  depends-on:
    - ActivityA
```

### Multiple Dependencies
Activity depends on multiple activities:

An activity can list multiple prerequisite activity IDs under `depends-on`.

## Common Dependency Patterns

### Linear Chain
Sequential activities in a chain:
```
Activity 1 → Activity 2 → Activity 3 → Activity 4
```

## Best Practices

### Minimize Dependencies
Only add necessary dependencies:
- **Recommended:** Essential prerequisites
- **Avoid:** Unnecessary blocking

### Clear Dependency Logic
Make dependencies explicit and understandable:
- Use descriptive activity names
- Document dependency reasons
- Avoid implicit dependencies

### Optimize for Parallelism
Structure dependencies to enable parallel execution:
- Identify independent activities
- Minimize sequential bottlenecks
- Group related dependencies

### Validate Early
Check dependencies during process creation:
- Validate dependency chains
- Detect cycles
- Identify unreachable activities

## Troubleshooting

### Activity Not Starting
Check:
- All dependencies completed successfully
- No blocking conditions
- Activity is not skipped
- No errors in dependencies

### Unexpected Execution Order
Verify:
- Dependency configuration
- Conditional logic
- Parallel execution settings
- Activity status

## Related Topics

- [Activities Overview](./activities-overview.md)
- [Phase Dependencies](../phases/phase-dependencies.md)
- [Parallel vs Sequential Execution](../execution/parallel-vs-sequential-execution.md)

