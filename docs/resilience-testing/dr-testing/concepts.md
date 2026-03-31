---
title: DR Testing Concepts
sidebar_label: Concepts
sidebar_position: 2
description: Core concepts and terminology for Harness DR Testing
---

This page explains the key terms and concepts you will encounter when working with Harness DR Testing.

## Disaster Recovery Testing

Disaster Recovery (DR) Testing is the practice of proactively validating that your systems can recover from catastrophic scenarios - region outages, data center failures, database corruption, or critical service unavailability. Instead of discovering gaps in your DR plan during an actual disaster, DR testing lets you find and fix them in a controlled environment.

## RTO and RPO

Two metrics define the targets your DR plan must meet:

### Recovery Time Objective (RTO)

The maximum acceptable time for a system to be restored to full operation after a failure. For example, an RTO of 15 minutes means your system must be back online within 15 minutes of a disaster event.

DR tests validate that your actual recovery procedures can meet the RTO by timing failover steps from initiation to completion.

### Recovery Point Objective (RPO)

The maximum acceptable amount of data loss measured in time. For example, an RPO of 1 hour means your backup or replication system must capture data at least every hour, so no more than 1 hour of data is lost in a disaster.

DR tests validate RPO by checking backup recency and data consistency after a simulated recovery.

## Pipeline-Based DR Tests

In Harness, each DR test is a **pipeline stage**. This design gives you:

- **Full orchestration**: Chain multiple steps (validation, failover, verification, notification) in sequence or in parallel
- **Reusability**: Save DR pipelines as templates and reuse them across projects
- **Auditability**: Every execution is logged in Execution History with step-level results
- **Integration**: Use any standard Harness step type - shell scripts, HTTP calls, approvals, notifications - in your DR workflow

## Pipeline Studio

The Pipeline Studio is the visual editor where you configure DR test stages. It opens automatically when you click **Continue in Pipeline Studio** after creating a DR test. The studio has four tabs:

- **Overview**: Stage name, description, objective, timeout, and stage variables
- **Environment**: The Harness environment and Chaos Infrastructure the stage targets, and the stage-level failure strategy
- **Execution**: The step canvas where you build the recovery workflow using DR-specific and standard steps
- **Advanced**: Delegate selector, conditional execution, looping strategy, and step-level failure strategy

## DR Step Types

The Step Library includes three step types under the **Disaster Recovery** category:

- **Chaos Probe**: Validates the health of a Kubernetes workload (e.g., checks if target pods are running). Used for pre- and post-disaster validation.
- **Chaos Fault**: Injects a failure into the system (e.g., pod-delete, network-loss, CPU stress). Simulates the disaster scenario being tested.
- **Chaos Action**: Executes a predefined chaos action from your Resilience Testing module.

A typical DR workflow follows the **Probe → Fault → Probe** pattern:

1. **Chaos Probe** — Verify baseline health (pre-disaster)
2. **Chaos Fault** — Inject the failure
3. **Chaos Probe** — Verify recovery (post-disaster)

This pattern validates that the system recovers to a healthy state after the simulated disaster. You can add standard Harness steps (shell scripts, HTTP calls, approvals, notifications) alongside DR steps for a complete recovery workflow.

## Environments and Infrastructure

A **Harness environment** represents a deployment target (e.g., production, staging, DR site). DR tests are scoped to an environment, which determines where recovery steps execute.

A **Chaos Infrastructure** is a Kubernetes-connected agent that executes Chaos Fault and Chaos Probe steps. When configuring a DR test stage, you select both an environment and an infrastructure.

Environments and infrastructure let you:
- Separate production DR tests from staging validation runs
- Apply different governance policies per environment
- Target specific clusters for fault injection and health validation
- Track which environment and infrastructure each DR test execution targeted

## Failure Strategy

A failure strategy defines what Harness does when a step or stage encounters an error. For DR tests, this is important because:

- Some failures should trigger a **rollback** to preserve system state
- Some failures are expected and should be **ignored** to allow the pipeline to continue
- Critical failures may warrant a **manual intervention** before proceeding

You can define failure strategies at two levels:
- **Environment tab**: Applies to the entire stage
- **Advanced tab**: Provides additional actions including manual intervention and looping-aware options

## Conditional Execution

Conditional execution controls whether a stage runs based on the state of the pipeline. In DR testing, this is useful for:

- Running a rollback stage only if the failover stage failed
- Always running a notification stage regardless of pipeline outcome
- Executing a verification stage only if a specific condition is met (via JEXL expression)

## Looping Strategy

A looping strategy runs a stage multiple times in a single pipeline execution. For DR testing, this is useful for:

- **Matrix**: Test DR across multiple regions or environments in one run
- **Repeat**: Re-run a recovery step a fixed number of times (e.g., retry failover attempts)
- **Parallelism**: Run multiple DR scenario iterations concurrently to reduce total test time

## Stage Variables

Stage variables are key-value pairs scoped to a DR test stage. They can be referenced in step configurations using Harness expressions, making your pipelines dynamic. For example:

- `<+stage.variables.targetRegion>` - the region being tested
- `<+stage.variables.backupTimestamp>` - the backup snapshot to restore from

## Next Steps

- [Get Started with DR Testing](./get-started): Create and run your first DR test
- [Pipeline Stage Reference](./pipeline-stage-reference): Full field reference for all configuration options
