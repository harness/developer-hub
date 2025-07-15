---
title: Key Concepts
description: Essential Harness Chaos Engineering concepts and terminology
sidebar_position: 4
redirect_from:
  - /docs/chaos-engineering/concepts
---

# Key Concepts

Understanding these fundamental concepts is essential for effectively implementing chaos engineering with Harness. This guide covers the core terminology, principles, and Harness-specific components you'll encounter.

## What is Chaos Engineering?

Chaos engineering is a proactive approach that intentionally injects failures into your system to identify weaknesses and improve resilience before real issues occur. It's the discipline of performing experiments on software to build confidence in the system's capability to withstand turbulent and unexpected conditions.

**Key Point**: Chaos engineering isn't the same as software testing (manual or automated) which verifies that your system is working as expected. Instead, it assumes something **will** go wrong and helps you prepare for it.

## Core Principles

### 1. Steady State Hypothesis
The **steady state** represents your system's normal operating condition. In Harness Chaos Engineering, you:
- Define measurable system outputs that indicate normal behavior
- Establish baseline metrics using **Service Level Objectives (SLOs)**
- Set acceptable thresholds for system performance
- Use **Resilience Probes** to validate system health

**Example**: "Our API should maintain 99.9% availability with response times under 200ms during normal operations."

### 2. Controlled Fault Injection
Chaos experiments simulate realistic failure scenarios using **Chaos Faults**:
- **Infrastructure Faults**: CPU stress, memory exhaustion, network latency
- **Application Faults**: Service failures, error injection, timeout simulation
- **Platform Faults**: Container kills, node failures, resource constraints
- **Cloud Provider Faults**: AWS, GCP, Azure service disruptions

### 3. Minimal Blast Radius
Start small and gradually increase experiment scope:
- Begin with non-critical systems or components
- Use **Chaos Infrastructure** to control experiment execution
- Implement automatic rollback mechanisms
- Define clear boundaries for experiment impact

### 4. Hypothesis-Driven Experiments
Each chaos experiment follows a structured approach:
1. **Identify** the steady state and specify SLOs
2. **Hypothesize** around the impact a particular fault would cause
3. **Inject** the failure in a controlled manner with minimal blast radius
4. **Validate** whether the hypothesis is proven and system meets SLOs

## Harness Chaos Engineering Architecture

### Control Plane
The **Control Plane** is part of the Harness Platform responsible for:
- Orchestrating and managing chaos experiments
- Providing the web-based portal interface
- Storing experiment data and configurations
- Managing **ChaosHubs** and experiment templates

### Execution Plane
The **Execution Plane** resides in your network where experiments are executed:
- **Chaos Infrastructure**: Components that execute chaos experiments
- **Target Resources**: Applications and infrastructure where faults are injected
- **Chaos Agents**: Software components that perform fault injection

### Key Components

#### Chaos Infrastructure
A logical group of components in your network responsible for:
- Executing chaos experiments on target resources
- Communicating with the Control Plane
- Managing experiment lifecycle and results

**Types**:
- **Kubernetes Infrastructure**: For container-based applications
- **Linux Infrastructure**: For traditional server environments
- **Dedicated vs Harness Delegate**: Different deployment models

#### ChaosHub
A repository of chaos experiment templates and faults:
- **Enterprise ChaosHub**: Harness-provided hub with 200+ pre-built faults
- **Custom ChaosHub**: Organization-specific experiment templates
- **Fault Categories**: Organized by platform (AWS, Kubernetes, Linux, etc.)

#### Resilience Probes
Pluggable health checkers that validate experiment outcomes:
- **HTTP Probes**: Check service availability via HTTP requests
- **Command Probes**: Execute custom commands to validate system state
- **Kubernetes Probes**: Check pod/service status in Kubernetes
- **Prometheus Probes**: Query metrics from Prometheus

## Chaos Experiment Workflow

### Experiment Lifecycle
1. **Create Environment**: Set up logical grouping for your infrastructure
2. **Install Chaos Infrastructure**: Deploy agents in your target environment
3. **Design Experiment**: Select faults, configure parameters, add probes
4. **Execute Experiment**: Run the chaos experiment with monitoring
5. **Analyze Results**: Review outcomes and system behavior

### Experiment Components

#### Chaos Faults
Pre-built failure scenarios available in ChaosHubs:
- **Network Faults**: Latency, packet loss, bandwidth throttling
- **Resource Faults**: CPU stress, memory exhaustion, disk pressure
- **Application Faults**: Pod deletion, service disruption
- **Cloud Platform Faults**: AWS ECS stop, Azure VM restart, GCP function failure

#### Resilience Probes
Health validation mechanisms that run during experiments:
- **Continuous Mode**: Monitor throughout experiment duration
- **Edge Mode**: Check at specific experiment phases
- **OnChaos Mode**: Validate only during fault injection

#### Workflow Custom Resource (CR)
Defines the sequence of operations in a chaos experiment:
- Couples multiple faults together in specific order
- Includes custom actions like load generation
- Manages experiment execution flow

### Service Level Objectives (SLOs)
Define acceptable system performance during chaos:
- **Availability**: Percentage of successful operations
- **Latency**: Response time thresholds
- **Error Rate**: Acceptable failure percentage
- **Throughput**: Minimum processing capacity

## Harness-Specific Features

### Deployment Models
- **SaaS**: Fully managed cloud service with automatic updates
- **Self-Managed Enterprise Edition (SMP)**: On-premises deployment with full control
- **Feature Parity**: Both models support the same chaos engineering capabilities

### Integration Capabilities
- **Harness CD Pipelines**: Native integration with continuous delivery
- **GitOps**: Git-based experiment management and versioning
- **Observability**: Integration with monitoring and alerting systems
- **Service Discovery**: Automatic discovery of services and dependencies

### Advanced Features
- **ChaosGuard**: Governance and policy enforcement for experiments
- **GameDay**: Coordinated chaos engineering exercises
- **Application Maps**: Visualize and test service dependencies
- **Custom Image Registry**: Use private container registries for experiments

### Security and Governance
- **RBAC**: Role-based access control for experiments
- **Audit Logs**: Comprehensive tracking of all platform activities
- **Network Policies**: Control experiment execution boundaries
- **Compliance**: Support for regulatory and security requirements

## Getting Started

Now that you understand these key concepts, you can:

1. **Set Up Your Environment**: Create your first [environment and chaos infrastructure](./get-started)
2. **Run Your First Experiment**: Follow our [tutorials](./tutorials) to execute a simple chaos experiment
3. **Explore ChaosHub**: Browse the [Enterprise ChaosHub](./faults/chaos-faults) for available fault types
4. **Learn Advanced Features**: Discover [integrations](./integrations/cicd/jenkins) and governance capabilities

## Next Steps

- **[What's Supported](./whats-supported)**: Review supported platforms and deployment options
- **[SaaS vs Self-Managed](./on-premise-vs-saas)**: Choose the right deployment model
- **[Get Started Guide](./get-started)**: Begin your chaos engineering journey

Understanding these Harness-specific concepts provides the foundation for successful chaos engineering implementation. The platform's enterprise features and integrations make it easier to adopt chaos engineering practices at scale.
