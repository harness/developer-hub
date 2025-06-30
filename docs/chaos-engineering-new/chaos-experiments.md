---
title: Chaos Experiments
description: Learn how to create, configure, and manage chaos experiments
sidebar_position: 1
---

# Chaos Experiments

Chaos experiments are the core of chaos engineering - controlled tests that intentionally introduce failures to validate system resilience. This guide covers everything you need to know about creating and managing effective chaos experiments.

## What are Chaos Experiments?

A chaos experiment is a controlled procedure that:
- **Introduces specific failures** into your system
- **Measures system behavior** during the failure
- **Validates your hypothesis** about system resilience
- **Provides insights** for improving system reliability

## Experiment Lifecycle

### 1. Planning Phase
- **Define hypothesis**: What do you expect to happen?
- **Set success criteria**: How will you measure resilience?
- **Choose target scope**: Which systems will be affected?
- **Plan safety measures**: How will you limit blast radius?

### 2. Design Phase
- **Select fault types**: Network, CPU, memory, application faults
- **Configure parameters**: Duration, intensity, target selection
- **Set up monitoring**: Probes, metrics, and observability
- **Define rollback conditions**: When to stop the experiment

### 3. Execution Phase
- **Pre-flight checks**: Validate system health before starting
- **Run experiment**: Execute the planned chaos injection
- **Monitor in real-time**: Watch system behavior and metrics
- **Automatic rollback**: Stop if safety thresholds are breached

### 4. Analysis Phase
- **Review results**: Analyze system behavior and metrics
- **Validate hypothesis**: Did the system behave as expected?
- **Document findings**: Record insights and improvements
- **Plan follow-up**: Schedule regular re-testing

## Experiment Types

### Infrastructure Experiments
Target underlying infrastructure components:

#### **Resource Stress**
- **CPU Stress**: Consume CPU resources to test auto-scaling
- **Memory Stress**: Exhaust memory to validate OOM handling
- **Disk Stress**: Fill disk space or stress I/O operations
- **Network Stress**: Add latency, packet loss, or bandwidth limits

#### **Component Failures**
- **Pod/Container Kill**: Terminate running containers
- **Node Failure**: Simulate entire node unavailability
- **Service Disruption**: Stop critical system services
- **Storage Failures**: Simulate disk or volume failures

### Application Experiments
Focus on application-level resilience:

#### **Service Dependencies**
- **External Service Failures**: Simulate third-party service outages
- **Database Unavailability**: Test database failover mechanisms
- **API Rate Limiting**: Simulate API throttling scenarios
- **Authentication Failures**: Test auth service disruptions

#### **Application Faults**
- **HTTP Error Injection**: Return specific HTTP error codes
- **Response Delays**: Add latency to API responses
- **Memory Leaks**: Simulate gradual memory consumption
- **Configuration Errors**: Test invalid configuration handling

### Platform Experiments
Target container and orchestration platforms:

#### **Kubernetes Faults**
- **Pod Deletion**: Random or targeted pod termination
- **Resource Limits**: Apply CPU/memory constraints
- **Network Policies**: Disrupt service-to-service communication
- **Volume Failures**: Simulate persistent volume issues

#### **Cloud Provider Faults**
- **Instance Termination**: Stop cloud instances
- **AZ Failures**: Simulate availability zone outages
- **Load Balancer Issues**: Disrupt traffic distribution
- **Managed Service Failures**: Test cloud service dependencies

## Experiment Configuration

### Target Selection
Choose what to target in your experiments:

```yaml
# Example: Target selection criteria
targets:
  - type: "kubernetes"
    namespace: "production"
    labels:
      app: "web-service"
    percentage: 50  # Affect 50% of matching pods
  
  - type: "aws-ec2"
    region: "us-west-2"
    tags:
      Environment: "prod"
    count: 2  # Affect 2 instances
```

### Fault Configuration
Define the specific fault to inject:

```yaml
# Example: CPU stress configuration
fault:
  type: "cpu-stress"
  parameters:
    cpu_cores: 2
    cpu_load: 80
    duration: "5m"
  
# Example: Network latency configuration
fault:
  type: "network-latency"
  parameters:
    latency: "100ms"
    jitter: "10ms"
    duration: "10m"
```

### Success Criteria
Define what constitutes a successful experiment:

```yaml
# Example: Success criteria
success_criteria:
  - metric: "response_time_p95"
    threshold: "< 500ms"
    
  - metric: "error_rate"
    threshold: "< 1%"
    
  - metric: "availability"
    threshold: "> 99%"
```

## Best Practices

### Start Small
- **Begin with staging environments** before production
- **Limit blast radius** to minimize impact
- **Use short durations** for initial experiments
- **Target non-critical systems** first

### Gradual Expansion
- **Increase scope** as confidence grows
- **Add more fault types** progressively
- **Extend to production** with proper safeguards
- **Involve more team members** in planning

### Safety First
- **Always have rollback plans** ready
- **Set up comprehensive monitoring** before experiments
- **Use automatic rollback conditions** to prevent damage
- **Communicate with stakeholders** about planned experiments

### Continuous Learning
- **Document all findings** and insights
- **Share results** with the broader team
- **Update system designs** based on learnings
- **Schedule regular re-testing** to validate improvements

## Common Experiment Patterns

### Resilience Validation
Test how well your system handles expected failures:
- **Database failover testing**
- **Load balancer failure scenarios**
- **Auto-scaling validation**
- **Circuit breaker testing**

### Dependency Testing
Validate behavior when dependencies fail:
- **Third-party service outages**
- **Internal service failures**
- **Network partitions**
- **Authentication service disruptions**

### Performance Testing
Understand system behavior under stress:
- **Resource exhaustion scenarios**
- **Traffic spike simulation**
- **Slow dependency responses**
- **Memory pressure testing**

### Recovery Testing
Validate disaster recovery procedures:
- **Data center failures**
- **Multi-region failover**
- **Backup and restore procedures**
- **Emergency response protocols**

## Monitoring and Observability

### Key Metrics to Track
- **Response times**: API and service response latencies
- **Error rates**: HTTP errors, application exceptions
- **Throughput**: Requests per second, transaction rates
- **Resource utilization**: CPU, memory, disk, network
- **Business metrics**: User experience, revenue impact

### Alerting Setup
Configure alerts for experiment monitoring:
- **Experiment start/stop notifications**
- **Threshold breach alerts**
- **Automatic rollback triggers**
- **Post-experiment summary reports**

## Troubleshooting Experiments

### Common Issues
- **Experiments won't start**: Check permissions and connectivity
- **Unexpected results**: Validate hypothesis and success criteria
- **System instability**: Review blast radius and safety measures
- **Monitoring gaps**: Ensure comprehensive observability coverage

### Debugging Steps
1. **Review experiment logs** for error messages
2. **Check target system health** before and during experiments
3. **Validate monitoring setup** and probe configurations
4. **Verify network connectivity** and permissions
5. **Analyze system dependencies** and potential side effects

## Next Steps

Ready to create your first experiment? Here's what to do next:

1. **[Set up Probes & Actions](./probes-actions)** - Learn about monitoring and automated responses
2. **[Explore GameDays](./gamedays)** - Organize team-wide chaos engineering exercises
3. **[Build Pipelines](./pipelines)** - Automate chaos testing in your CI/CD workflows
4. **[Check Integrations](./integrations)** - Connect with your existing monitoring tools

:::tip Pro Tip
Start with simple experiments like pod deletion or CPU stress, then gradually work your way up to more complex scenarios. The key is to build confidence and learn from each experiment!
:::
