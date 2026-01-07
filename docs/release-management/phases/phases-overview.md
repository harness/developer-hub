---
title: Overview
slug: /release-orchestration/phases/phases-overview
description: Learn about phases and how they structure release processes
sidebar_position: 1
---

import DocImage from '@site/src/components/DocImage';

Phases are major milestones or stages in a release process. They provide logical grouping of activities and help organize complex release workflows across teams, tools, and environments.

## What is a Phase?

A **phase** represents a distinct stage in the release lifecycle. Within a process blueprint, phases organize the workflow into manageable, sequential or parallel stages, each containing one or more activities that contribute to a specific milestone.

Phases serve as logical containers that:
- Group related activities together by purpose or ownership
- Define major checkpoints in the delivery pipeline
- Enable clear handoffs between teams (for example, Development to QA to Operations)
- Support conditional execution based on the outcome of previous phases

Common phases include:
- **Planning & Coordination**: Gathering requirements, creating release plans, and aligning stakeholders
- **Branch Cut**: Creating release branches and preparing source code for build
- **Build**: Source code compilation, artifact generation, and packaging
- **Pre-Deployment Validation**: Testing, security scans, and quality gates
- **QA Testing**: Functional testing, regression testing, and sign-off
- **Deployment**: Deploying artifacts to target environments (staging, UAT, production)
- **Post-Deployment**: Verification, monitoring, and validation
- **Rollback**: Reversal activities if issues are detected

## Why Phases Matter

Phases provide structure and clarity to complex release processes:

**Organizational Alignment**: Each phase can be owned by a specific team (Development, QA, DevOps, Security), making responsibilities explicit and reducing coordination overhead.

**Progress Visibility**: Stakeholders can track which phase a release is in, understand what's been completed, and anticipate what's next.

**Gating and Control**: Phases enable approval gates and checkpoints, ensuring prerequisites are met before advancing to critical stages like production deployment.

**Reusability and Consistency**: Once modeled in a process blueprint, phases ensure every release follows the same validated workflow, reducing variability and risk.

## Phase Structure and Characteristics

Phases provide logical grouping and structure to release processes through several key components and characteristics:

### Core Components

A phase consists of:

- **Name**: Descriptive identifier that clearly communicates the phase's purpose
- **Description**: Detailed explanation of what the phase accomplishes and why it exists
- **Activities**: The actual tasks within the phase (automated pipelines, manual approvals, or subprocesses)
- **Dependencies**: Defines which phases must complete before this phase can start
- **Owners**: The team or individuals responsible for executing and signing off on the phase
- **Variables**: Phase-scoped variables that activities within the phase can reference
- **Gates and Approvals**: Optional checkpoints that must be satisfied before the phase can proceed

### Execution Flow

Phases typically execute in sequence, but can also run in parallel when independent:
- **Sequential**: One phase completes before the next begins (for example, Build → Test → Deploy)
- **Parallel**: Independent phases can execute concurrently (for example, Security Scan and Performance Testing)
- **Conditional**: Phases can be skipped or executed based on runtime conditions or approvals

### Ownership and Collaboration

Each phase can have designated owners:
- **Team Ownership**: Assign phases to Development, QA, Operations, or Security teams
- **Handoffs**: Clear ownership enables smooth transitions between teams
- **Accountability**: Owners are responsible for completing phase activities and providing sign-offs

### Status Tracking

Each phase has its own status, providing real-time visibility:
- **Pending**: Not yet started; waiting for dependencies or schedule
- **In Progress**: Currently executing activities within the phase
- **Completed**: Successfully finished; all activities completed
- **Failed**: Encountered errors; remediation or rollback may be required
- **Skipped**: Intentionally bypassed due to conditions or approvals
- **On Hold**: Paused; waiting for manual approvals or inputs

### Example Phase

Here's a typical Build phase definition:

```yaml
phase:
  id: build_phase
  name: Build Phase
  description: Responsible for source code compilation and validation, artifact generation and packaging, and security scanning and compliance checks.
  owners:
    - Development Team
  depends-on: []
  activities:
    - activity:
        id: branch_cut
        name: Branch Cut
        type: manual
    - activity:
        id: run_ci_pipeline
        name: Run CI Pipeline
        type: automated
        depends-on:
          - branch_cut
    - activity:
        id: security_scan
        name: Security Scan
        type: automated
        depends-on:
          - run_ci_pipeline
```

This example shows a Build phase with three activities: a manual branch cut, followed by an automated CI pipeline, and finally a security scan.

## Common Phase Patterns

Release processes can be structured in different ways depending on organizational needs and workflow complexity.

### Linear Phases
Sequential execution where each phase depends on the previous phase completing successfully:
```
Planning → Branch Cut → Build → QA Testing → Deploy to Staging → Deploy to Production → Monitoring
```

This pattern is ideal for straightforward releases where each stage must complete before the next begins.

### Parallel Phases
Independent execution where multiple phases can run concurrently:
```
Phase A: Security Scan ─┐
                        ├→ Integration Phase → Deployment Phase
Phase B: Performance Test ─┘
```

Use this pattern when phases don't have interdependencies and can execute simultaneously to reduce overall release duration.

### Conditional Phases
Execution based on runtime conditions, approvals, or outcomes:
```
Build Phase → QA Phase → [Approval Gate] → Production Deploy (if approved)
                                        └→ Rollback Phase (if rejected)
```

This pattern enables decision points where execution can branch based on test results, manual approvals, or other criteria.

### Multi-Environment Phases
Sequential deployment across multiple environments:
```
Build → Deploy to DEV → Deploy to QA → Deploy to UAT → Deploy to PROD1 → Deploy to PROD2 → Deploy to PROD3
```

This pattern is common in enterprise environments where releases must be validated across multiple environments before reaching production.

## Real-World Use Case: System Release at Harness

To illustrate how phases work in practice, consider the system release process at Harness:

**Week 1: Branch Cut and QA Validation**
- **Monday**: Automated branch cut job creates release branches and deploys to QA environment
- **Tuesday - Thursday Noon**: Alpha fixes phase allows developers to submit fixes with service owner approval
- **Thursday EOD**: QA sign-off phase requires stakeholder and QA approval before proceeding

**Week 2: Production Rollout**
- **Friday Morning**: Beta rollout phase deploys to Prod 0 cluster for soak testing
- **Monday - Friday**: Beta fixes phase allows fixes with service owner approval during soak period
- **Following Monday**: Prod 1 deployment phase begins
- **Wednesday**: Prod 2 deployment phase
- **Following Monday**: Prod 3 deployment phase completes the rollout

**Hotfix Handling**: Emergency hotfix phase can be triggered between production rollouts, thoroughly investigated, and deployed with sanity testing.

This multi-week, multi-phase process demonstrates how phases provide structure, checkpoints, and clear ownership across a complex enterprise release.

## Phases and Process Blueprints

Phases are defined once within a **process blueprint** and then reused across multiple releases:

**Process Blueprint**: The template that defines phases, their order, and their activities. For example, a "Weekly Release Process" blueprint might define Planning, Build, QA, and Deployment phases.

**Input-Driven Flexibility**: The same blueprint can adapt to different releases by accepting different inputs. For example, this week's release might include three services, while next week's includes five—same phases, different inputs.

**Reusability**: Once a process blueprint is defined, you can link it to multiple releases, ensuring consistency and reducing the effort required to model each release.

## Phases vs. Activities

It's important to understand the distinction:

- **Phase**: A logical grouping or stage (for example, "Build Phase" or "Deployment Phase")
- **Activity**: A single unit of work within a phase (for example, "Run CI Pipeline" or "Manual QA Sign-off")

Phases provide the structure; activities provide the execution. Together, they form a complete, executable release workflow.

## Related Topics

- [Creating Phases](./creating-phases.md)
- [Activities Overview](../activities/activities-overview.md)
- [Process Modeling](../processes/process-modeling.md)

