---
title: Experiment-Level Probes
description: Learn how to configure and use probes at the experiment level for comprehensive chaos validation
sidebar_position: 9
---

This topic describes how to configure and use probes at the experiment level in Harness Chaos Engineering. Experiment-level probes provide comprehensive validation across multiple faults within a single experiment, enabling holistic resilience assessment.

## What are Experiment-Level Probes?

Experiment-level probes are resilience validation checks that operate across the entire chaos experiment lifecycle, rather than being scoped to individual faults. These probes provide:

- **Global Validation**: Monitor system health across all faults in an experiment
- **End-to-End Assessment**: Validate overall system behavior from start to finish
- **Cross-Fault Correlation**: Understand how multiple faults interact and affect system resilience
- **Comprehensive Monitoring**: Track metrics and health indicators throughout the experiment

Unlike fault-specific probes that validate individual chaos injections, experiment-level probes assess the cumulative impact of all chaos activities within an experiment.

## Evolution from Traditional Probes

### Traditional Fault-Level Probes
In earlier versions of Harness CE, probes were primarily configured at the fault level within individual experiment specifications. Each fault had its own set of probes that validated only the specific chaos injection.

**Limitations:**
- Probes were isolated to individual faults
- No visibility into cross-fault interactions
- Difficult to assess overall experiment success
- Limited correlation between different chaos activities
- Redundant probe configurations across similar faults

### Modern Experiment-Level Probes
Current Harness CE supports experiment-level probes that are configured at the ChaosEngine root level, providing global validation across all faults within an experiment. These probes can monitor system health throughout the entire experiment lifecycle, from pre-chaos baseline establishment through post-chaos validation.

## Probe Configuration Levels

### 1. Global Experiment Level
Probes configured at the ChaosEngine root level apply to the entire experiment. These probes monitor system-wide health indicators and run across all faults within the experiment. Global probes are ideal for:

- **System Availability Monitoring**: Continuously check application endpoints
- **Performance Baseline Tracking**: Monitor key performance indicators
- **SLA Compliance Validation**: Ensure service level agreements are maintained
- **Cross-Fault Correlation**: Understand how multiple faults interact

### 2. Fault-Specific Level
Probes configured within individual experiment specifications target specific fault behaviors. These probes validate the immediate impact and recovery of individual chaos injections, such as pod recovery times or specific resource state changes.

### 3. Hybrid Configuration
Combining both global and fault-specific probes provides the most comprehensive validation coverage. This approach allows for system-wide monitoring while maintaining specific validation for individual fault impacts.

## Probe Execution Modes for Experiments

### Edge Mode
Executes at the beginning and end of the entire experiment, providing boundary validation for the complete chaos testing cycle.

**Use Cases:**
- Baseline establishment before chaos
- Final validation after all faults complete
- SLA compliance verification
- Performance regression detection

### Continuous Mode
Runs throughout the entire experiment duration, providing real-time monitoring during all fault executions.

**Use Cases:**
- Real-time system monitoring
- Performance trend analysis
- Availability tracking
- Resource utilization monitoring

### Start of Test (SoT)
Executes only at the beginning of the experiment, ensuring all prerequisites are met before chaos injection begins.

**Use Cases:**
- Environment readiness checks
- Dependency validation
- Configuration verification
- Security compliance checks

### End of Test (EoT)
Executes only at the end of the experiment, performing final validation and cleanup verification.

**Use Cases:**
- Cleanup verification
- Final state validation
- Report generation
- Audit trail creation

## Probe Types for Experiment-Level Validation

### HTTP Probes
Monitor application endpoints throughout the experiment by sending HTTP requests to validate API availability, response codes, and response content. These probes can be configured with various HTTP methods (GET, POST, PUT, DELETE) and can validate both response codes and response body content.

### Prometheus Probes
Track metrics and Service Level Indicators (SLIs) across the experiment by executing PromQL queries against Prometheus endpoints. These probes can monitor performance metrics, error rates, availability percentages, and custom business metrics throughout the experiment lifecycle.

### Kubernetes Probes
Validate cluster and resource states by checking Kubernetes resources using Group-Version-Resource (GVR) specifications. These probes can verify resource presence, absence, creation, or deletion, and can use field selectors and label selectors for precise targeting.

### Command Probes
Execute custom validation scripts or commands to perform specialized checks that other probe types cannot handle. These probes can run shell commands, scripts, or binaries and validate their exit codes or output content.

### SLO Probes
Monitor Service Level Objectives by integrating with Harness SRM (Service Reliability Management) to validate that SLOs are maintained during chaos experiments. These probes can check error budgets and SLI compliance.

## Advanced Configuration Patterns

### Probe Chaining
Link probes to create dependent validation flows where the output of one probe becomes the input for another. This enables complex validation scenarios such as baseline measurement followed by performance comparison, or multi-step validation workflows.

### Conditional Probes
Execute probes based on specific experiment conditions such as environment type, infrastructure configuration, or runtime parameters. This allows for environment-specific validation without duplicating experiment configurations.

### Multi-Infrastructure Probes
Validate across different infrastructure types within a single experiment, such as combining Kubernetes cluster health checks with external service validation or cloud provider resource monitoring.

## Probe Success Criteria and Experiment Outcomes

### Experiment Success Logic
The experiment passes only if ALL probes succeed:

```
Experiment Success = (All Global Probes Pass) AND (All Fault-Level Probes Pass)
```

### Probe Failure Handling
Configure how probe failures affect experiment execution by setting the `stopOnFailure` property. Critical probes can halt the experiment immediately upon failure, while informational probes can continue running to gather additional data.

### Resilience Score Impact
Experiment-level probes contribute to the overall resilience score:

```
Experiment Resilience Score = 
  (Σ(Fault Weight × Fault Probe Success) + Global Probe Success Weight) / 
  (Σ(Fault Weights) + Global Probe Weight)
```

## Best Practices

### 1. Probe Selection Strategy
- **Global Probes**: Use for system-wide health indicators
- **Fault Probes**: Use for specific fault impact validation
- **Hybrid Approach**: Combine both for comprehensive coverage

### 2. Execution Mode Selection
- **Edge**: For baseline and final validation
- **Continuous**: For real-time monitoring during chaos
- **SOT/EOT**: For specific pre/post-chaos checks

### 3. Performance Considerations
- Limit continuous probe frequency to avoid overhead
- Use appropriate timeouts to prevent hanging
- Consider probe execution cost in resource planning

### 4. Monitoring Strategy
**Recommended probe configuration approach:**

- **System Availability (Critical)**: Use HTTP probes in Continuous mode with stopOnFailure enabled
- **Performance Metrics (Informational)**: Use Prometheus probes in Edge mode for baseline comparison
- **Security Validation (Critical)**: Use Command probes in SOT mode to ensure security compliance before chaos injection
- **Recovery Validation (Critical)**: Use Kubernetes probes in EOT mode to verify system recovery

## Troubleshooting Experiment-Level Probes

### Common Issues

#### Probe Timeout
**Solution**: Increase timeout values in probe run properties and configure appropriate retry attempts to handle network latency or slow-responding services.

#### Continuous Probe Overhead
**Solution**: Optimize probe frequency by increasing intervals and polling intervals to reduce system overhead while maintaining adequate monitoring coverage.

#### Probe Dependency Failures
**Solution**: Add proper error handling in command probes and implement graceful degradation strategies for dependency validation failures.

### Debugging Steps

1. **Check Probe Logs**: Examine experiment execution logs for probe-specific errors
2. **Validate Probe Configuration**: Ensure probe syntax and parameters are correct
3. **Test Probe Independently**: Run probe commands manually to verify functionality
4. **Review Network Connectivity**: Ensure probes can reach target endpoints
5. **Verify Permissions**: Confirm probe execution has necessary permissions

## Integration with CI/CD

### Pipeline Integration
Integrate experiment-level probes into CI/CD pipelines by configuring probe parameters as pipeline variables. This allows for dynamic probe configuration based on deployment environments, application versions, or pipeline stages. Probes can validate deployment health, performance SLAs, and system readiness as part of automated testing workflows.

### GitOps Integration
Store experiment-level probe configurations in version control systems as part of GitOps workflows. This enables versioned probe configurations, peer review of probe changes, and automated deployment of probe updates alongside application deployments.

## Monitoring and Observability

### Probe Execution Tracking
Monitor probe execution through:

- **Experiment Timeline**: Visual representation of probe execution
- **Probe Status Dashboard**: Real-time probe health indicators
- **Execution Logs**: Detailed probe execution information
- **Metrics Export**: Probe results exported to monitoring systems

### Integration with APM Tools
Integrate experiment-level probes with Application Performance Monitoring (APM) tools such as Datadog, New Relic, Dynatrace, and Splunk. These integrations enable synthetic test execution, custom metric validation, and alert correlation during chaos experiments.

## Migration from Fault-Level to Experiment-Level Probes

### Assessment Phase
1. **Inventory Existing Probes**: Catalog current fault-level probes
2. **Identify Global Checks**: Determine which probes should be experiment-wide
3. **Plan Migration Strategy**: Develop phased migration approach

### Migration Steps
**Migration approach:**

1. **Identify Global Probes**: Move system-wide health checks to experiment level
2. **Retain Fault-Specific Probes**: Keep fault-specific validation at individual experiment level
3. **Implement Hybrid Configuration**: Combine both approaches for comprehensive coverage
4. **Update Probe Modes**: Adjust probe execution modes for experiment-level scope
5. **Validate Configuration**: Test migrated configurations in non-production environments

### Validation
- **Parallel Execution**: Run both configurations to compare results
- **Gradual Rollout**: Migrate experiments incrementally
- **Monitor Impact**: Track changes in experiment success rates and execution times

## Conclusion

Experiment-level probes represent a significant evolution in chaos engineering validation, providing:

- **Holistic Validation**: Comprehensive system health assessment
- **Improved Correlation**: Better understanding of fault interactions
- **Enhanced Observability**: Detailed insights into system behavior
- **Flexible Configuration**: Support for various validation patterns

By implementing experiment-level probes, organizations can:
- Achieve more accurate resilience assessments
- Reduce validation complexity
- Improve experiment reliability
- Enable better decision-making based on comprehensive data

Start by identifying system-wide health indicators that should be monitored throughout your chaos experiments, then gradually implement experiment-level probes to enhance your chaos engineering practice.
