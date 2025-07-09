---
title: Run & Schedule Experiments
description: Execute chaos experiments safely with monitoring and scheduling options
sidebar_position: 3
redirect_from:
  - /docs/chaos-engineering/guides/chaos-experiments/run-schedule-exp
---

# Run & Schedule Experiments

Learn how to execute chaos experiments safely, monitor their progress in real-time, and set up automated scheduling for continuous resilience validation.

## Execution Overview

Harness Chaos Engineering provides multiple execution modes to fit different testing scenarios:

- **Immediate Execution**: Run experiments on-demand for quick validation
- **Scheduled Execution**: Automate experiments with cron-based scheduling
- **Pipeline Integration**: Include experiments in CI/CD workflows
- **Targeted Execution**: Run specific experiments on selected infrastructure

---

## Pre-Execution Checklist

Before running any chaos experiment, ensure:

### System Readiness
- **Target System Health**: Verify applications are running normally
- **Infrastructure Status**: Confirm chaos infrastructure is connected
- **Resource Availability**: Ensure sufficient system resources
- **Monitoring Setup**: Validate observability tools are active

### Team Coordination
- **Stakeholder Notification**: Inform relevant teams about the experiment
- **Maintenance Windows**: Avoid conflicts with deployments or maintenance
- **Escalation Plan**: Have incident response procedures ready
- **Rollback Strategy**: Confirm automatic and manual rollback options

### Safety Validation
- **Blast Radius Review**: Verify experiment scope is appropriate
- **Probe Configuration**: Ensure health checks are properly configured
- **Timeout Settings**: Set appropriate experiment duration limits
- **Emergency Contacts**: Have key personnel available during execution

---

## Immediate Execution

### Quick Run

For immediate experiment execution:

1. **Navigate** to your experiment in the Experiments list
2. **Click** the **Run** button
3. **Confirm** execution parameters
4. **Monitor** real-time progress



### Execution Parameters

#### Runtime Configuration
```yaml
# Example runtime parameters
execution:
  runMode: "immediate"
  timeout: "30m"
  cleanupPolicy: "delete"
  
safety:
  maxConcurrentExperiments: 3
  blastRadiusLimit: "25%"
  autoRollbackThreshold: "80%"
```

#### Environment Overrides
- **Target Namespace**: Override default namespace
- **Resource Limits**: Adjust CPU/memory constraints
- **Network Policies**: Modify connectivity rules
- **Custom Variables**: Set experiment-specific values

---

## Real-Time Monitoring

### Execution Dashboard

The experiment execution dashboard provides:

#### **Status Overview**
- Current execution phase
- Overall progress percentage
- Active fault status
- Probe validation results

#### **Real-Time Metrics**
- System resource utilization
- Application performance metrics
- Network connectivity status
- Error rates and response times

#### **Timeline View**
- Experiment phase progression
- Fault injection timeline
- Probe execution history
- Event log with timestamps



### Monitoring Integration

#### Prometheus Integration
```yaml
# Prometheus query examples
# CPU utilization during experiment
rate(cpu_usage_total[5m])

# Memory consumption
container_memory_usage_bytes / container_spec_memory_limit_bytes

# Network latency
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

#### Grafana Dashboards
- **System Health**: CPU, memory, disk, network metrics
- **Application Performance**: Response times, error rates, throughput
- **Experiment Progress**: Fault status, probe results, timeline
- **Comparative Analysis**: Before/during/after experiment metrics

### Alert Configuration

Set up alerts for experiment monitoring:

```yaml
# Example alert rules
alerts:
  - name: "experiment-failure-rate-high"
    condition: "probe_success_rate < 0.8"
    action: "stop_experiment"
    
  - name: "system-resource-exhausted"
    condition: "cpu_utilization > 0.9"
    action: "notify_team"
    
  - name: "application-unavailable"
    condition: "http_success_rate < 0.5"
    action: "emergency_rollback"
```

---

## Experiment Scheduling

### One-Time Scheduling

#### Schedule for Specific Time
1. **Select** your experiment
2. **Click** **Schedule** tab
3. **Choose** "Run Once at Specific Time"
4. **Set** date and time
5. **Configure** notification preferences



#### Scheduling Options
- **Immediate**: Execute as soon as possible
- **Delayed Start**: Run after specified delay
- **Specific DateTime**: Execute at exact time
- **Business Hours**: Run during defined work hours only

### Recurring Schedules

#### Cron-Based Scheduling
Create recurring experiment schedules using cron expressions:

```bash
# Every day at 2 AM
0 2 * * *

# Every Monday at 9 AM
0 9 * * 1

# Every 6 hours
0 */6 * * *

# First day of every month at midnight
0 0 1 * *
```

#### Schedule Templates
- **Daily Health Check**: Basic resilience validation
- **Weekly Stress Test**: Comprehensive system testing
- **Monthly Disaster Recovery**: Full failover scenarios
- **Quarterly Chaos GameDay**: Organization-wide exercises



### Advanced Scheduling

#### Conditional Execution
```yaml
# Execute only if conditions are met
conditions:
  - type: "system_health"
    threshold: "healthy"
  - type: "deployment_status"
    value: "stable"
  - type: "traffic_level"
    range: "normal"
```

#### Multi-Environment Scheduling
- **Development**: Aggressive testing with high frequency
- **Staging**: Production-like scenarios with moderate frequency
- **Production**: Conservative testing with careful scheduling

---

## Pipeline Integration

### Harness CD Pipeline

#### Add Chaos Step
1. **Open** your CD pipeline
2. **Add** a new step
3. **Select** "Chaos Engineering"
4. **Choose** your experiment
5. **Configure** execution parameters

```yaml
# Pipeline step configuration
- step:
    type: Chaos
    name: Resilience Validation
    identifier: chaos_validation
    spec:
      experiment: "microservices-resilience-test"
      timeout: "15m"
      onFailure:
        action: "rollback_deployment"
```

#### Quality Gates
Use experiment results as deployment gates:

```yaml
# Quality gate configuration
qualityGates:
  - name: "resilience_score"
    threshold: 85
    action: "block_deployment"
    
  - name: "probe_success_rate"
    threshold: 95
    action: "require_approval"
```

### GitOps Integration

#### Experiment as Code
```yaml
# chaos-experiment.yaml
apiVersion: chaos.harness.io/v1
kind: ChaosExperiment
metadata:
  name: production-resilience-test
spec:
  schedule: "0 2 * * *"
  experiments:
    - name: "pod-delete-test"
      weight: 5
    - name: "network-latency-test"
      weight: 3
```

#### Version Control
- **Git Repository**: Store experiment definitions
- **Branch Strategy**: Separate environments and versions
- **Review Process**: Peer review for experiment changes
- **Automated Deployment**: CI/CD for experiment updates

---

## Execution States and Control

### Experiment States

| State | Description | Actions Available |
|-------|-------------|-------------------|
| **Queued** | Waiting for infrastructure availability | Cancel |
| **Running** | Active fault injection and monitoring | Stop, Monitor |
| **Completed** | Successfully finished all phases | View Results, Re-run |
| **Failed** | Encountered errors during execution | Debug, Retry |
| **Stopped** | Manually terminated by user | View Partial Results |
| **Timeout** | Exceeded maximum execution time | Review Configuration |

### Manual Control

#### Stop Experiment
- **Graceful Stop**: Complete current fault, skip remaining
- **Emergency Stop**: Immediate termination with rollback
- **Pause/Resume**: Temporarily halt execution (if supported)

#### Real-Time Adjustments
- **Extend Duration**: Increase experiment timeout
- **Modify Blast Radius**: Adjust affected resource percentage
- **Update Probes**: Add or modify validation checks
- **Change Parameters**: Adjust fault intensity or frequency

---

## Safety Mechanisms

### Automatic Rollback

#### Trigger Conditions
```yaml
# Automatic rollback configuration
rollback:
  triggers:
    - condition: "probe_failure_rate > 0.2"
      action: "immediate_rollback"
    - condition: "system_cpu > 0.95"
      action: "graceful_rollback"
    - condition: "error_rate > 0.1"
      action: "pause_and_alert"
```

#### Rollback Strategies
- **Immediate**: Stop all faults instantly
- **Graceful**: Complete current operations, then stop
- **Phased**: Gradually reduce fault intensity
- **Custom**: Execute user-defined rollback procedures

### Blast Radius Control

#### Resource Limits
```yaml
# Blast radius configuration
blastRadius:
  maxPodsAffected: 3
  maxPercentageAffected: 25
  excludeNamespaces: ["kube-system", "monitoring"]
  includeLabelSelector: "environment=staging"
```

#### Network Isolation
- **Namespace Boundaries**: Limit faults to specific namespaces
- **Network Policies**: Prevent cross-network impact
- **Service Mesh**: Use mesh policies for fine-grained control
- **Cloud Boundaries**: Respect cloud resource boundaries

---

## Troubleshooting Execution Issues

### Common Problems

#### Experiment Won't Start
**Symptoms**: Experiment stays in "Queued" state
**Solutions**:
- Check infrastructure connectivity
- Verify resource availability
- Review RBAC permissions
- Validate target application status

#### Unexpected Failures
**Symptoms**: Experiment fails with unclear errors
**Solutions**:
- Review experiment logs
- Check probe configurations
- Validate network connectivity
- Verify resource constraints

#### Performance Impact
**Symptoms**: System degradation beyond expected
**Solutions**:
- Reduce blast radius
- Adjust fault intensity
- Increase probe intervals
- Review resource limits

### Debugging Tools

#### Log Analysis
```bash
# View experiment logs
kubectl logs -n harness-chaos-smp chaos-operator-xxx

# Check infrastructure logs
kubectl describe chaosengine experiment-name

# Monitor system events
kubectl get events --sort-by='.lastTimestamp'
```

#### Metrics Investigation
- **Resource Utilization**: CPU, memory, disk, network
- **Application Metrics**: Response times, error rates
- **Infrastructure Health**: Node status, pod conditions
- **Network Connectivity**: Latency, packet loss, throughput

---

## Best Practices

### Execution Strategy
- **Start Small**: Begin with low-impact experiments
- **Gradual Increase**: Progressively expand scope and intensity
- **Regular Cadence**: Establish consistent testing schedules
- **Documentation**: Record all execution details and outcomes

### Team Coordination
- **Clear Communication**: Notify stakeholders before experiments
- **Defined Roles**: Assign responsibilities for monitoring and response
- **Escalation Procedures**: Have clear paths for issue resolution
- **Post-Experiment Reviews**: Conduct retrospectives for continuous improvement

### Monitoring Excellence
- **Comprehensive Coverage**: Monitor all critical system components
- **Baseline Establishment**: Know normal system behavior
- **Alert Tuning**: Avoid false positives while catching real issues
- **Dashboard Optimization**: Create clear, actionable visualizations

## Next Steps

After mastering experiment execution:

1. **[Analyze Results](./analyze-results)** - Understand resilience scores and insights
2. **[Manage Experiments](./manage-experiments)** - Organize and maintain your experiment library
3. **[Create Experiments](./create-experiments)** - Build new experiment scenarios

Ready to run your first experiment? Start with a simple, low-impact test during off-peak hours and gradually build confidence in your chaos engineering practices.
