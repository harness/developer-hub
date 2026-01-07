---
title: Subprocess Activities
slug: /release-orchestration/activities/activity-types/subprocess-activities
description: Learn about subprocess activities and how to compose processes from other processes
sidebar_position: 3
---

Subprocess activities allow you to include other processes as activities within a process, enabling process composition and reusability.

## What are Subprocess Activities?

Within Release Orchestration's "process" model, **Sub Processes** are a natural extension: smaller, reusable processes invoked from a parent process.

A **Process** is defined as:
- Release (process) YAML → phases → activities

A **Sub Process** is another process definition that:
- Can be invoked from a parent process as a specialized activity or phase
- Has its own phases, activities, and inputs

Subprocess activities enable:
- **Process Composition**: Build complex processes from simpler ones
- **Reusability**: Reuse common process patterns
- **Modularity**: Break down large processes
- **Template Usage**: Use process templates

## When Do You Need Sub Processes?

Sub Processes make sense when:

### 1. You Have Repeatable Flows Reused Across Multiple Releases

Example: a standard "Security & Compliance" flow:
- Run security scans
- Collect approvals
- Generate evidence

This can be modeled once as a process, then called from multiple main release processes.

### 2. You Need Modularity for Large Releases

Very large releases may:
- Cover multiple domains (frontend, backend, data, infra)
- Exceed comfort limits for a single process file
- Model each domain as a sub process and orchestrate them from a parent

### 3. You Want Independent Evolution of Parts of the Release

Teams that own specific segments (e.g., infra, security) can evolve their sub processes independently. The parent process references a stable interface (inputs/outputs) rather than duplicating logic.

### 4. You Need Different Cadences or Reuse Patterns

A sub process might be run:
- As part of a release
- Or manually / on a different cadence for validation, dry-runs, or recurring operations

## Architectural Note

Sub Processes are just other process YAMLs executed via the same orchestration engine, wired into the parent via activity/template glue and shared InputStore.

## Configuration

### Basic Configuration
```yaml
activity:
  name: "Deploy Service"
  type: "subprocess"
  process: "Standard Service Deployment"
```

### Input Mapping
Map inputs to subprocess:
```yaml
activity:
  name: "Deploy Service A"
  type: "subprocess"
  process: "Service Deployment Template"
  inputs:
    service_name: "Service A"
    environment: "${target_environment}"
    version: "${service_a_version}"
```

### Variable Mapping
Map variables to subprocess:
```yaml
activity:
  name: "Deploy Service"
  type: "subprocess"
  process: "Service Deployment"
  variables:
    deployment_timeout: "${global.deployment_timeout}"
    rollback_enabled: true
```

### Output Mapping
Capture subprocess outputs:
```yaml
activity:
  name: "Deploy Service"
  type: "subprocess"
  process: "Service Deployment"
  outputs:
    deployment_id: "${subprocess.deployment_id}"
    deployment_status: "${subprocess.deployment_status}"
```

## Subprocess Execution

### Execution Context
Subprocess executes in its own context:
- **Isolated Variables**: Variable scope isolation
- **Independent Status**: Separate execution status
- **Own Dependencies**: Subprocess dependencies
- **Separate Logs**: Independent logging

### Status Propagation
Subprocess status affects parent:
- **Success**: Subprocess completes successfully
- **Failure**: Subprocess fails, parent handles
- **Skipped**: Subprocess skipped, parent continues
- **In Progress**: Subprocess executing

### Error Handling
Handle subprocess errors:
```yaml
activity:
  name: "Deploy Service"
  type: "subprocess"
  process: "Service Deployment"
  on_failure: "stop"  # or "continue", "retry"
```

## Nested Process Structure

### Process Hierarchy
Processes can be nested multiple levels:
```
Main Process
  └─ Phase 1
      └─ Subprocess Activity
          └─ Nested Process
              └─ Phase A
                  └─ Activity
```

### Variable Scope
Variable scoping in nested processes:
- **Global**: Available at all levels
- **Process**: Available within process
- **Phase**: Available within phase
- **Activity**: Available within activity

## Best Practices

### Process Design
Design processes for reuse:
- **Self-Contained**: Minimal external dependencies
- **Configurable**: Accept inputs and variables
- **Documented**: Clear purpose and usage

### Error Handling
Handle subprocess errors appropriately:
- **Stop on Critical**: Fail fast on critical errors
- **Continue on Non-Critical**: Allow non-critical failures
- **Retry Logic**: Implement retries where appropriate
- **Error Reporting**: Clear error messages

### Performance
Consider performance implications:
- **Execution Time**: Subprocess execution time
- **Parallel Execution**: Enable parallel subprocesses
- **Resource Usage**: Resource consumption
- **Caching**: Cache results where possible

## Related Topics

- [Activities Overview](../activities-overview.md)
- [Process Modeling](../../processes/process-modeling.md)
- [Modeling complex processes](../../processes/process-modeling.md#modeling-complex-release-processes)

