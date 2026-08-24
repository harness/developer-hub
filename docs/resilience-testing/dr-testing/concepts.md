---
title: DR Testing Concepts
sidebar_label: Concepts
sidebar_position: 20
description: Core concepts and terminology for Harness DR Testing
keywords:
  - disaster recovery
  - RTO
  - RPO
  - DRTest
  - failure strategy
  - rollback
tags:
  - disaster-recovery
  - resilience-testing
---

This page explains the key terms and concepts you encounter when working with Harness DR Testing.

---

## Disaster Recovery Testing

Disaster Recovery (DR) Testing validates that your systems can recover from catastrophic scenarios such as region outages, data center failures, database corruption, or critical service unavailability. Instead of discovering gaps in your DR plan during an actual disaster, DR testing finds and fixes them in a controlled environment.

---

## RTO and RPO

Two metrics define the targets your DR plan must meet.

### Recovery Time Objective (RTO)

The maximum acceptable time for a system to be restored to full operation after a failure. For example, an RTO of 15 minutes means your system must be back online within 15 minutes of a disaster event.

DR tests validate that your recovery procedures can meet the RTO by timing failover steps from initiation to completion.

### Recovery Point Objective (RPO)

The maximum acceptable amount of data loss measured in time. For example, an RPO of 1 hour means your backup or replication system must capture data at least every hour.

DR tests validate RPO by checking backup recency and data consistency after a simulated recovery.

---

## Pipeline-based DR tests

In Harness, each DR test is a pipeline with a **Disaster Recovery** stage (`type: DRTest`). This design gives you:

- **Full orchestration:** Chain validation, failover, verification, and notification in sequence or in parallel.
- **Reusability:** Save DR pipelines or steps as templates and reuse them across projects.
- **Auditability:** Every execution is logged in Execution History with step-level results.
- **Integration:** Use any standard Harness step type alongside Chaos Probe, Chaos Fault, and Chaos Action.

You can create a DR test from **Resilience Testing → DR Tests**, or add a **Disaster Recovery** stage to an existing pipeline from Pipeline Studio.

---

## Pipeline Studio

Pipeline Studio is the visual editor where you configure DR stages. It opens when you select **Continue in Pipeline Studio** after creating a DR test, or when you open a pipeline that already has a Disaster Recovery stage. The stage has four tabs:

- **Overview:** Stage name, description, objective, timeout, and stage variables.
- **Environment:** The Harness environment the stage targets, and the stage-level failure strategy.
- **Execution:** The step canvas for the forward workflow, plus a **Rollback** path for compensating steps.
- **Advanced:** Delegate selector, conditional execution, looping strategy, and additional failure strategy actions.

---

## DR step types

The Step Library includes Resilience Testing steps you add from **Add Step → Add Step**:

- **Chaos Probe:** Validates a condition against your system, such as pod health or an HTTP response. Used for pre- and post-disaster validation.
- **Chaos Fault:** Injects a failure into the system, such as pod delete or network loss. Simulates the disaster scenario.
- **Chaos Action:** Runs a predefined chaos action from Resilience Testing.

Each of these steps selects its own chaos infrastructure as `<environment>/<infrastructure>`. The Environment tab does not set infrastructure for the whole stage.

You can also add **Harness Approval** and other standard Harness steps in the same stage. Approval, fault, and probe steps are available in the library; an empty Disaster Recovery stage can still be saved.

A typical DR workflow follows the **Probe → Fault → Probe** pattern:

1. **Chaos Probe** to verify baseline health.
2. **Chaos Fault** to inject the failure.
3. **Chaos Probe** to verify recovery.

---

## Environments and infrastructure

A **Harness environment** represents a deployment target such as production, staging, or a DR site. The Disaster Recovery stage selects an environment on the Environment tab.

A **chaos infrastructure** is the Kubernetes-connected agent that executes Chaos Fault, Chaos Probe, and Chaos Action steps. You select it on each step, not on the stage Environment tab.

Environments and infrastructure let you:

- Separate production DR tests from staging validation runs.
- Apply different governance policies per environment.
- Target specific clusters for fault injection and health validation.
- Track which environment and infrastructure each step used.

---

## Failure strategy and Rollback

A failure strategy defines what Harness does when a step or stage encounters an error. For DR tests this matters because:

- Some failures should trigger a **rollback** to preserve system state.
- Some failures are expected and should be **ignored** so the pipeline can continue.
- Critical failures may warrant **manual intervention** before proceeding.

You can define failure strategies on the Environment tab and on the Advanced tab.

The Execution tab also has an **Execution \| Rollback** toggle. Put compensating steps on the Rollback canvas, then use **Rollback Stage** or **Rollback Pipeline** in a failure strategy when you want that path to run. Rollback is not invoked automatically on probe failure unless your failure strategy says so.

---

## Conditional Execution

Conditional execution controls whether a stage runs based on pipeline state. In DR testing this is useful for:

- Running a notification or cleanup stage only if the failover stage failed.
- Always running a notification stage regardless of pipeline outcome.
- Executing a verification stage only when a JEXL condition is met.

---

## Looping Strategy

A looping strategy runs a stage multiple times in a single pipeline execution:

- **Matrix:** Test DR across multiple regions or environments in one run.
- **Repeat:** Re-run a recovery step a fixed number of times.
- **Parallelism:** Run multiple DR scenario iterations concurrently.

---

## Stage Variables

Stage variables are key-value pairs scoped to a DR test stage. Reference them in step configurations with Harness expressions, for example:

- `<+stage.variables.targetRegion>` for the region under test.
- `<+stage.variables.backupTimestamp>` for the backup snapshot to restore from.

---

## Next steps

- [Get Started with DR Testing](./get-started): Create and run your first DR test.
- [Pipeline Stage Reference](./pipeline-stage-reference): Full field reference for configuration options.
