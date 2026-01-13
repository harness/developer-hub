---
title: Subprocess Activities
slug: /release-orchestration/activities/activity-types/subprocess-activities
description: Learn about subprocess activities and how to compose processes from other processes
sidebar_position: 3
---

Subprocess activities allow you to include other processes as activities within a process, enabling process composition and reusability. This powerful feature lets you build complex release workflows by combining simpler, reusable process components.

## What are Subprocess Activities?

Within Release Orchestration's "process" model, Sub Processes are a natural extension: smaller, reusable processes invoked from a parent process. A Process is defined as a release (process) YAML that contains phases, which in turn contain activities. A Sub Process is another process definition that can be invoked from a parent process as a specialized activity or phase, and it has its own phases, activities, and inputs.

Subprocess activities enable process composition, allowing you to build complex processes from simpler ones. They provide reusability by letting you reuse common process patterns across multiple releases.

They support modularity by helping you break down large processes into manageable components, and they enable template usage so you can create standardized process templates that can be invoked with different configurations.

## When Do You Need Sub Processes?

Sub Processes make sense in several scenarios where you need more flexibility or organization than a single flat process can provide.

### 1. You Have Repeatable Flows Reused Across Multiple Releases

When you have standard workflows that appear in multiple releases, subprocesses help you avoid duplication. For example, a standard "Security & Compliance" flow that includes running security scans, collecting approvals, and generating evidence can be modeled once as a process, then called from multiple main release processes.

This ensures consistency while reducing maintenance overhead.

### 2. You Need Modularity for Large Releases

Very large releases may cover multiple domains like frontend, backend, data, and infrastructure, or they may exceed comfort limits for a single process file.

In these cases, you can model each domain as a sub process and orchestrate them from a parent process, making the overall release structure more manageable and easier to understand.

### 3. You Want Independent Evolution of Parts of the Release

When different teams own specific segments of a release, such as infrastructure or security, subprocesses allow those teams to evolve their processes independently.

The parent process references a stable interface defined by inputs and outputs rather than duplicating logic, so teams can improve their subprocesses without affecting the parent process structure.

### 4. You Need Different Cadences or Reuse Patterns

A sub process might be run as part of a release, or it might be executed manually or on a different cadence for validation, dry-runs, or recurring operations.

This flexibility lets you reuse the same process definition in multiple contexts, whether it's part of a larger release or a standalone operation.

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

Subprocess executes in its own context with variable scope isolation, meaning variables defined in the subprocess don't interfere with the parent process unless explicitly mapped. The subprocess has independent execution status, separate from the parent, and manages its own dependencies.

It also maintains separate logs, making it easier to troubleshoot issues within the subprocess without sifting through parent process logs.

### Status Propagation

The subprocess status affects the parent process in different ways depending on the outcome. When the subprocess completes successfully, the parent can proceed. If the subprocess fails, the parent handles the failure according to its error handling configuration.

If the subprocess is skipped, the parent continues execution. While the subprocess is executing, it shows an "In Progress" status that the parent process tracks.

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

Variable scoping in nested processes follows a hierarchy where global variables are available at all levels, process variables are available within the process, phase variables are available within the phase, and activity variables are available within the activity.

This scoping ensures that variables don't leak between processes unintentionally while still allowing you to pass values where needed.

## Best Practices

### Process Design

Design processes for reuse by making them self-contained with minimal external dependencies. Processes should be configurable, accepting inputs and variables that allow them to be used in different contexts.

They should also be well-documented with clear purpose and usage information so other teams can understand how to use them effectively.

### Error Handling

Handle subprocess errors appropriately based on the severity and impact of the failure. Stop on critical errors to fail fast and prevent cascading problems, but continue on non-critical failures when the release can proceed safely.

Implement retry logic where appropriate for transient failures, and ensure error reporting provides clear error messages that help diagnose and fix issues quickly.

### Performance

Consider performance implications when using subprocesses. Be aware of subprocess execution time and how it affects overall release duration.

Enable parallel execution of subprocesses when they don't depend on each other, which can significantly reduce total execution time. Monitor resource consumption to ensure subprocesses don't overwhelm your infrastructure, and cache results where possible to avoid redundant work.

## Related Topics

- [Activities Overview](../activities-overview.md)
- [Process Modeling](../../processes/process-modeling.md)
- [Modeling complex processes](../../processes/process-modeling.md#modeling-complex-release-processes)

