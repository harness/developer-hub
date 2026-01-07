---
title: Phase Dependencies
slug: /release-orchestration/phases/phase-dependencies
description: Learn how to configure dependencies between phases to control execution order
sidebar_position: 3
---

Phase dependencies control the execution order of phases in a release process. Understanding and properly configuring dependencies is essential for ensuring releases execute in the correct sequence.

## What are Phase Dependencies?

Phase dependencies define which phases must complete before another phase can start. They ensure:
- Correct execution order
- Prerequisites are met
- Data and artifacts are available
- Validation occurs before deployment

## Dependency Types

### Sequential Dependencies
One phase must complete before another starts:

```yaml
process:
  phases:
    - phase:
        id: build_phase
        name: Build Phase
        depends-on: []
    - phase:
        id: test_phase
        name: Test Phase
        depends-on:
          - build_phase
    - phase:
        id: deploy_phase
        name: Deploy Phase
        depends-on:
          - test_phase
```

**Execution Flow:**
```
Build → Test → Deploy
```

### Multiple dependencies
One phase can depend on multiple phases. In the following example, `PhasEnd1` depends on multiple phases:

```yaml
process:
  phases:
    - phase:
        id: PhasEnd1
        name: PhasEnd1
        depends-on:
          - deploy_phase
          - Phase000U
          - test_phase
          - build_phase
```

## Dependency Configuration

### Basic Dependency
Simple dependency declaration:

```yaml
phase:
  id: test_phase
  name: Test Phase
  depends-on:
    - build_phase
```

## Common Dependency Patterns

### Linear Chain
Sequential phases in a chain:
```
Phase 1 → Phase 2 → Phase 3 → Phase 4
```

## Best Practices

### Minimize Dependencies
Only add necessary dependencies:
- **Recommended:** Essential prerequisites
- **Avoid:** Unnecessary blocking

### Clear Dependency Logic
Make dependencies explicit and understandable:
- Use descriptive phase names
- Document dependency reasons
- Avoid implicit dependencies

### Optimize for Parallelism
Structure dependencies to enable parallel execution:
- Identify independent phases
- Minimize sequential bottlenecks
- Group related dependencies

### Validate Early
Check dependencies during process creation:
- Validate dependency chains
- Detect cycles
- Identify unreachable phases

## Troubleshooting

### Phase Not Starting
Check:
- All dependencies completed successfully
- No blocking conditions
- Phase is not skipped
- No errors in dependencies

### Unexpected Execution Order
Verify:
- Dependency configuration
- Conditional logic
- Parallel execution settings
- Phase status

## Related Topics

- [Phases Overview](./phases-overview.md)
- [Creating Phases](./creating-phases.md)
- [Activity Dependencies](../activities/activity-dependencies.md)

