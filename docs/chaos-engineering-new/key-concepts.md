---
title: Key Concepts
description: Essential chaos engineering concepts and terminology
sidebar_position: 4
---

# Key Concepts

Understanding these fundamental concepts is essential for effectively implementing chaos engineering in your organization. This guide covers the core terminology, principles, and methodologies you'll encounter.

## Core Principles

### 1. Steady State Hypothesis
The **steady state** represents your system's normal operating condition. Before introducing chaos, you must:
- Define measurable system outputs that indicate normal behavior
- Establish baseline metrics (response time, error rate, throughput)
- Set acceptable thresholds for system performance
- Document expected system behavior under normal conditions

**Example**: "Our API should maintain 99.9% availability with response times under 200ms during normal operations."

### 2. Real-World Events
Chaos experiments should simulate realistic failure scenarios that could occur in production:
- **Hardware Failures**: Server crashes, network outages, disk failures
- **Software Failures**: Application crashes, memory leaks, deadlocks
- **Human Errors**: Misconfigurations, accidental deletions, deployment mistakes
- **External Dependencies**: Third-party service outages, API rate limiting

### 3. Production Environment Testing
While you can start with staging environments, the most valuable insights come from production testing:
- Production has unique characteristics not replicated in staging
- Real user traffic patterns reveal different failure modes
- Actual data volumes and complexity expose hidden issues
- Production testing builds genuine confidence in system resilience

### 4. Continuous Automation
Chaos engineering should be integrated into your regular operations:
- Automated experiment scheduling and execution
- Integration with CI/CD pipelines
- Continuous monitoring and alerting
- Regular review and improvement of experiments

### 5. Minimize Blast Radius
Start small and gradually increase experiment scope:
- Begin with non-critical systems or components
- Limit the number of affected users or services
- Use feature flags to control experiment impact
- Implement automatic rollback mechanisms

## Key Terminology

### Experiment Components

#### Hypothesis
A testable prediction about system behavior during failure conditions.
- **Format**: "Given [normal conditions], when [failure is introduced], then [expected outcome]"
- **Example**: "Given normal traffic load, when the primary database becomes unavailable, then the system should failover to the secondary database within 30 seconds"

#### Fault Injection
The deliberate introduction of failures into a system.
- **Infrastructure Faults**: CPU stress, memory exhaustion, network latency
- **Application Faults**: Service failures, error injection, timeout simulation
- **Platform Faults**: Container kills, node failures, resource constraints

#### Blast Radius
The scope and potential impact of a chaos experiment.
- **Narrow**: Single service or component
- **Medium**: Multiple related services
- **Wide**: Entire system or user base

#### Rollback
The process of stopping an experiment and returning the system to normal state.
- **Manual Rollback**: Human-initiated experiment termination
- **Automatic Rollback**: System-triggered based on predefined conditions
- **Time-based Rollback**: Automatic termination after specified duration

### System Resilience Concepts

#### Fault Tolerance
The ability of a system to continue operating despite component failures.
- **Redundancy**: Multiple instances of critical components
- **Graceful Degradation**: Reduced functionality instead of complete failure
- **Circuit Breakers**: Automatic failure detection and isolation

#### High Availability
The characteristic of a system to remain operational over time.
- **Uptime**: Percentage of time system is operational
- **SLA**: Service Level Agreement defining availability commitments
- **MTBF**: Mean Time Between Failures
- **MTTR**: Mean Time To Recovery

#### Disaster Recovery
The process of restoring system functionality after a major failure.
- **RTO**: Recovery Time Objective (maximum acceptable downtime)
- **RPO**: Recovery Point Objective (maximum acceptable data loss)
- **Backup Strategies**: Data protection and restoration procedures
- **Failover Procedures**: Switching to backup systems

### Monitoring and Observability

#### Observability
The ability to understand system internal state from external outputs.
- **Metrics**: Quantitative measurements of system behavior
- **Logs**: Detailed records of system events and activities
- **Traces**: Request flow through distributed systems
- **Dashboards**: Visual representation of system health

#### Service Level Indicators (SLIs)
Specific metrics that measure service performance.
- **Availability**: Percentage of successful requests
- **Latency**: Time to process requests
- **Throughput**: Number of requests processed per unit time
- **Error Rate**: Percentage of failed requests

#### Service Level Objectives (SLOs)
Target values for SLIs that define acceptable service performance.
- **Availability SLO**: "99.9% of requests should succeed"
- **Latency SLO**: "95% of requests should complete within 200ms"
- **Error Rate SLO**: "Less than 0.1% of requests should result in errors"

## Experiment Types

### Infrastructure Experiments
Target underlying infrastructure components:
- **Resource Exhaustion**: CPU, memory, disk space consumption
- **Network Disruption**: Latency, packet loss, bandwidth throttling
- **Hardware Simulation**: Server failures, disk corruption
- **Power and Cooling**: Data center infrastructure failures

### Application Experiments
Focus on application-level failures:
- **Service Dependencies**: External service unavailability
- **Database Failures**: Connection timeouts, query failures
- **Memory Issues**: Memory leaks, garbage collection pressure
- **Configuration Errors**: Invalid settings, missing parameters

### Platform Experiments
Target container and orchestration platforms:
- **Container Failures**: Pod deletions, container kills
- **Node Failures**: Worker node unavailability
- **Resource Constraints**: CPU/memory limits, storage issues
- **Network Policies**: Service mesh disruptions

## Safety Measures

### Pre-flight Checks
Validations performed before experiment execution:
- **System Health**: Verify normal operation before introducing chaos
- **Resource Availability**: Ensure sufficient capacity for experiment
- **Dependency Status**: Check external service availability
- **Team Readiness**: Confirm monitoring and response capabilities

### Guardrails
Automated safety mechanisms that protect against excessive damage:
- **Automatic Rollback**: Trigger experiment termination based on metrics
- **Blast Radius Limits**: Restrict experiment scope and impact
- **Time Limits**: Maximum experiment duration
- **Resource Limits**: Prevent excessive resource consumption

### Monitoring and Alerting
Comprehensive observation during experiments:
- **Real-time Metrics**: Continuous monitoring of system health
- **Anomaly Detection**: Automatic identification of unusual behavior
- **Alert Escalation**: Notification procedures for experiment issues
- **Dashboard Visibility**: Clear visualization of experiment progress

## Best Practices

### Experiment Design
- Start with clear, testable hypotheses
- Define success and failure criteria upfront
- Plan for multiple scenarios and edge cases
- Document expected outcomes and actual results

### Team Collaboration
- Involve cross-functional teams in experiment planning
- Establish clear roles and responsibilities
- Conduct post-experiment reviews and retrospectives
- Share learnings across the organization

### Continuous Improvement
- Regularly review and update experiments
- Expand experiment scope based on confidence and experience
- Automate repetitive experiments
- Build chaos engineering into development workflows

### Risk Management
- Always have rollback procedures ready
- Start with low-risk experiments
- Gradually increase complexity and scope
- Maintain comprehensive documentation

## Getting Started with Concepts

Now that you understand these key concepts, you can:
1. **Design Your First Experiment**: Apply these concepts to create a simple chaos experiment
2. **Explore Advanced Topics**: Dive deeper into specific areas in our [Concepts](./concepts) section
3. **Follow Tutorials**: Practice with hands-on examples in our [Tutorials](./tutorials) section
4. **Learn Best Practices**: Discover industry best practices and patterns

Understanding these concepts provides the foundation for successful chaos engineering implementation. As you gain experience, these principles will guide you in creating more sophisticated and valuable experiments.
