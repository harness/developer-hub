---
title: Key Concepts
description: Essential Harness Chaos Engineering concepts and terminology
sidebar_position: 4
redirect_from:
  - /docs/chaos-engineering/concepts
  - /docs/chaos-engineering/get-started/key-concepts
  - /docs/chaos-engineering/architecture-and-security/architecture/components
  - /docs/chaos-engineering/architecture-and-security/architecture
  - /docs/chaos-engineering/technical-reference/architecture/kubernetes
  - /docs/chaos-engineering/technical-reference/architecture/linux
  - /docs/chaos-engineering/architecture-and-security/architecture/control-plane
  - /docs/category/architecture-and-security
  - /docs/category/architecture
  - /docs/chaos-engineering/chaos-infrastructure/linux-chaos-infrastructure-advanced-management
  - /docs/chaos-engineering/features/chaos-infrastructure/linux-chaos-infrastructure-advanced-management
  - /docs/chaos-engineering/features/chaos-infrastructure/windows-chaos-infrastructure
  - /docs/chaos-engineering/features/chaos-infrastructure/openshift-infra
  - /docs/chaos-engineering/chaos-infrastructure/openshift-infra
  - /docs/chaos-engineering/concepts/deployment-architecture
  - /docs/chaos-engineering/concepts/explore-architecture
  - /docs/chaos-engineering/concepts/chaos101
  - /docs/category/understand-concepts
---

# Key Concepts

This guide covers the essential terminology and concepts for Harness Resilience Testing.

## Chaos Engineering

Chaos Engineering is the discipline of experimenting on a system to build confidence in its capability to withstand turbulent and unexpected conditions in production.

### Core Principles

#### Steady State Hypothesis

The **steady state** represents your system's normal operating condition. Before running chaos experiments, you define:
- Measurable system outputs that indicate normal behavior
- Baseline metrics using Service Level Objectives (SLOs)
- Acceptable thresholds for system performance

**Example**: "Our API should maintain 99.9% availability with response times under 200ms during normal operations."

#### Blast Radius

The scope of impact a chaos experiment can have on your system. Best practices:
- Start small with non-critical systems or components
- Gradually increase experiment scope as confidence grows
- Use infrastructure controls to limit impact
- Implement automatic rollback mechanisms

#### Hypothesis-Driven Testing

Each chaos experiment follows a scientific approach:
1. **Identify** the steady state and specify SLOs
2. **Hypothesize** what will happen when a fault is injected
3. **Inject** the failure in a controlled manner with minimal blast radius
4. **Validate** whether the system maintains steady state and meets SLOs

### Key Components

#### Chaos Experiments

A [chaos experiment](./chaos-testing/experiments) is a set of operations coupled together to inject faults into a target resource and validate the system's resilience. Each experiment:
- Targets specific infrastructure or application components
- Injects one or more chaos faults in a defined sequence
- Uses probes to validate system behavior
- Can include custom actions for notifications or integrations
- Generates a resilience score based on results

#### Chaos Faults

[Chaos faults](/docs/chaos-engineering/faults/chaos-faults) are pre-built failure scenarios that simulate real-world issues:

#### Fault Categories
- **Kubernetes Faults**: Pod deletions, container kills, resource stress
- **Cloud Platform Faults**: AWS, GCP, Azure service disruptions
- **Infrastructure Faults**: CPU stress, memory exhaustion, network latency, disk pressure
- **Application Faults**: Service failures, error injection, timeout simulation

Harness provides 200+ ready-to-use chaos faults in the Enterprise ChaosHub.

#### Resilience Probes

[Resilience probes](./chaos-testing/probes) are health validation mechanisms that run during chaos experiments to verify your system maintains its steady state:

#### Probe Modes
- **Continuous Mode**: Monitor throughout experiment duration
- **Edge Mode**: Check at specific experiment phases (before, during, after)
- **OnChaos Mode**: Validate only during fault injection

#### Probe Types
- **HTTP Probe**: Validate API endpoints and services
- **Command Probe**: Execute custom commands and validate output
- **Prometheus Probe**: Query Prometheus metrics
- **Datadog Probe**: Query Datadog metrics
- **Dynatrace Probe**: Query Dynatrace metrics

#### Actions

[Actions](./chaos-testing/actions) are custom tasks that execute within experiments:
- Send notifications to Slack, PagerDuty, or email
- Trigger webhooks for external integrations
- Execute custom scripts or commands
- Add delays between experiment steps
- Integrate with monitoring and observability tools

#### ChaosHub

A [ChaosHub](./chaos-testing/chaoshub) is a centralized repository for reusable chaos engineering resources:

#### Enterprise ChaosHub
- Provided by Harness with 200+ chaos faults
- Regularly updated with new faults and improvements
- Available across all projects and organizations

#### Custom ChaosHub
- Create your own hub for organization-specific resources
- Store custom experiment templates
- Share probe templates across teams
- Version control using Git integration

#### Chaos Infrastructure

[Chaos infrastructure](./chaos-testing/infrastructure/infrastructures) represents the target environment where chaos experiments execute:

#### Deployment Models
- **Agent-Based**: Deploy chaos agents on Linux or Windows hosts
- **Agentless**: Use Harness Delegate for Kubernetes and cloud resources

#### Supported Targets
- Kubernetes clusters (EKS, GKE, AKS, OpenShift)
- Linux and Windows hosts
- AWS, GCP, Azure cloud resources
- VMware infrastructure

## Load Testing

Load Testing validates that your system can handle expected and peak traffic while maintaining performance and reliability.

### Virtual Users

A **virtual user** (VU) simulates a real user executing your defined scenario: sending HTTP requests, waiting for responses, and looping continuously for the duration of the test. The **Number of Users** setting controls peak concurrency.

### Load Profile

The load profile defines how virtual users are introduced over time:

- **Ramp-Up Phase**: Users increase linearly from 0 to the target count over the configured **Ramp-Up Duration**. This models realistic traffic growth and avoids an artificial cold-start spike.
- **Steady-State Phase**: After ramp-up, the full user count runs for the remaining test duration (`Test Duration - Ramp-Up Duration`).

### Scenario

A scenario is the sequence of HTTP requests each virtual user executes. A scenario can be defined visually in the UI editor or through a custom [Locust](https://locust.io/) Python script.

### Assertions

Assertions define per-request success criteria. Two types are supported:

- **Text**: Validates that the response body contains a specific string
- **Response Time**: Validates that the response arrives within a specified latency threshold

Requests that fail assertions are counted as errors in test results.

### Load Test Infrastructure

The infrastructure where load tests execute. Two target types are supported:

- **Linux VM**: A Linux host with the Harness chaos agent and load testing enabled. The agent runs the Locust process locally and streams metrics back to Harness.
- **Kubernetes**: A Kubernetes cluster with the Harness chaos agent (v1.85.3 or later). Load testing is enabled by default. The agent orchestrates a master pod and optional worker pods for scalable, distributed load generation.

See [Infrastructure Types](./chaos-testing/infrastructure/types) for setup instructions.

## Disaster Recovery Testing

Disaster Recovery Testing validates that backup systems, failover mechanisms, and recovery procedures work during catastrophic scenarios. Each DR test is a Harness pipeline stage, giving you full orchestration of failover, validation, and notification steps.

### RTO and RPO

- **Recovery Time Objective (RTO)**: The maximum acceptable time for a system to be restored to full operation after a failure. DR tests validate that your recovery procedures complete within this window.
- **Recovery Point Objective (RPO)**: The maximum acceptable amount of data loss measured in time. DR tests validate backup recency and data consistency after a simulated recovery.

### Pipeline-Based DR Tests

DR tests are built using Harness Pipeline Studio. Each DR test is a stage with four tabs:

- **Overview**: Stage name, objective, timeout, and stage variables
- **Environment**: Target Harness environment, Chaos Infrastructure, and stage-level failure strategy
- **Execution**: Step canvas where you compose the recovery workflow using DR-specific steps (Chaos Probe, Chaos Fault, Chaos Action) and standard Harness steps
- **Advanced**: Delegate selector, conditional execution, looping strategy, and step-level failure strategy

### Failure Strategy

Defines what happens when a step or stage encounters an error. You can handle specific failure types (Authentication Errors, Connectivity Errors, Timeout Errors, etc.) with actions like Rollback Pipeline, Retry Step, Abort, Manual Intervention, or Mark As Failure.

### Conditional Execution

Controls whether a stage runs based on pipeline state: on success (default), on failure, always, or via a custom JEXL expression. Useful for running rollback stages only when a failover stage fails.

See [DR Testing Concepts](./dr-testing/concepts) for a full breakdown of all concepts.

## Harness Resilience Testing Concepts

These concepts apply across all resilience testing activities in the Harness platform.

### Environments

Logical groupings of your infrastructure where tests are executed:
- Organize resources by purpose (dev, staging, production)
- Control access and permissions per environment
- Isolate test execution to specific infrastructure scopes

### Governance

Controls and policies to ensure safe, controlled testing:

#### RBAC (Role-Based Access Control)
Fine-grained permissions for who can:
- Create and modify tests
- Execute tests on specific infrastructure
- View results and analytics
- Manage governance policies

#### ChaosGuard

[ChaosGuard](./chaos-testing/governance/governance-in-execution) provides advanced governance specifically for chaos experiments:
- Define when experiments can run (time windows)
- Specify where experiments can execute (infrastructure scope)
- Control what faults can be injected (fault restrictions)
- Set approval requirements for high-risk tests

### Risks

Automated identification and tracking of system weaknesses:
- **Resilience Risks**: Potential failure points in your system
- **Performance Risks**: Bottlenecks and capacity issues
- **Compliance Risks**: Gaps in meeting RTO/RPO targets

Risks are discovered automatically and can be validated through targeted tests.

## Next Steps

Now that you understand the core concepts:

- [Architecture](./architecture): Learn about the control plane and execution plane architecture
- [Get Started with Chaos Testing](./chaos-testing/get-started): Run your first chaos experiment
- [Explore Chaos Faults](/docs/chaos-engineering/faults/chaos-faults): Browse 200+ ready-to-use fault scenarios
- [Set Up Governance](./chaos-testing/governance/rbac): Configure RBAC and ChaosGuard for safe testing 

