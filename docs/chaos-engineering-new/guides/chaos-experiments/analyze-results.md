---
title: Analyze Results
description: Understand resilience scores, interpret experiment outcomes, and derive actionable insights
sidebar_position: 4
---

# Analyze Results

Master the art of chaos experiment analysis to transform raw execution data into actionable insights that improve your system's resilience. This guide covers resilience scoring, result interpretation, and continuous improvement strategies.

## Results Overview

After experiment execution, Harness provides comprehensive analysis through:

- **Resilience Scoring**: Quantitative measurement of system resilience
- **Performance Metrics**: System behavior during fault injection
- **Probe Analysis**: Health validation results and trends
- **Execution Timeline**: Detailed chronology of experiment phases
- **Insights & Recommendations**: AI-powered suggestions for improvement

---

## Resilience Scoring

### Understanding the Score

The **Resilience Score** is a quantitative measure (0-100%) that indicates how well your system handled the chaos experiment:

```
Resilience Score = (Sum of all Fault Resilience) / (Sum of all Fault Weights) × 100
```

#### Score Interpretation
- **90-100%**: Excellent resilience, system handled all failures gracefully
- **75-89%**: Good resilience, minor issues detected
- **60-74%**: Moderate resilience, some significant issues found
- **40-59%**: Poor resilience, major problems identified
- **0-39%**: Critical issues, immediate attention required



### Calculation Components

#### Fault Weight
Each fault in your experiment has an assigned weight (1-10) representing its importance:

| Weight | Priority | Use Case |
|--------|----------|----------|
| 1-3 | Low | Non-critical component failures |
| 4-6 | Medium | Important service disruptions |
| 7-10 | High | Critical system failures |

#### Probe Success Rate
The percentage of successful probe validations during fault execution:

```
Probe Success Rate = (Successful Probes / Total Probes) × 100
```

#### Fault Resilience Calculation
```
Fault Resilience = Fault Weight × Probe Success Rate
```

### Example Calculation

**Experiment**: E-commerce Platform Resilience Test

| Fault | Weight | Probes | Successful | Success Rate | Fault Resilience |
|-------|--------|--------|------------|--------------|------------------|
| Pod Delete | 8 | 10 | 9 | 90% | 720 |
| Network Latency | 6 | 8 | 6 | 75% | 450 |
| CPU Stress | 4 | 6 | 5 | 83% | 332 |
| **Totals** | **18** | **24** | **20** | **83%** | **1502** |

**Overall Resilience Score**: 1502 ÷ 18 = **83.4%**

---

## Result Analysis Dashboard

### Executive Summary

The results dashboard provides a high-level overview:

#### Key Metrics
- **Overall Resilience Score**: Primary success indicator
- **Experiment Duration**: Total execution time
- **Faults Executed**: Number of successful fault injections
- **Probes Passed**: Percentage of successful health validations
- **System Impact**: Resource utilization during experiment

#### Status Indicators
- **Passed**: All criteria met, system resilient
- **Partial**: Some issues detected, review recommended
- **Failed**: Significant problems found, action required



### Detailed Analysis

#### Fault-by-Fault Breakdown
Each fault provides detailed metrics:

```yaml
# Example fault analysis
fault: "pod-delete-frontend"
status: "completed"
duration: "120s"
impact:
  podsAffected: 3
  recoveryTime: "45s"
  userImpact: "minimal"
probes:
  total: 12
  passed: 10
  failed: 2
  successRate: 83.3%
metrics:
  avgResponseTime: "250ms"
  errorRate: "2.1%"
  throughputDrop: "15%"
```

#### Timeline Analysis
Understand the experiment flow:

1. **Pre-Chaos Phase** (0-30s): Baseline establishment
2. **Fault Injection** (30-150s): Active chaos introduction
3. **Recovery Phase** (150-180s): System stabilization
4. **Post-Chaos Validation** (180-210s): Final health checks

---

## Performance Impact Analysis

### System Metrics

#### Resource Utilization
Track how chaos affects system resources:

**CPU Usage**
```
Baseline: 45% → Peak: 78% → Recovery: 47%
Impact: 33% increase during fault injection
Recovery Time: 2 minutes to baseline
```

**Memory Consumption**
```
Baseline: 2.1GB → Peak: 2.8GB → Recovery: 2.2GB
Impact: 33% increase, no memory leaks detected
Recovery Time: 1.5 minutes to baseline
```

**Network I/O**
```
Baseline: 150 Mbps → Peak: 89 Mbps → Recovery: 145 Mbps
Impact: 41% throughput reduction during network fault
Recovery Time: 30 seconds to baseline
```



#### Application Metrics

**Response Time Analysis**
- **P50 Latency**: 120ms → 180ms → 125ms
- **P95 Latency**: 300ms → 850ms → 320ms
- **P99 Latency**: 500ms → 1200ms → 520ms

**Error Rate Tracking**
- **Baseline Error Rate**: 0.1%
- **Peak Error Rate**: 3.2%
- **Recovery Error Rate**: 0.2%

**Throughput Impact**
- **Baseline RPS**: 1000
- **Minimum RPS**: 650
- **Recovery RPS**: 980

### Comparative Analysis

#### Before vs. During vs. After
```yaml
phases:
  before:
    avgResponseTime: 120ms
    errorRate: 0.1%
    throughput: 1000 RPS
    
  during:
    avgResponseTime: 280ms
    errorRate: 2.8%
    throughput: 720 RPS
    
  after:
    avgResponseTime: 125ms
    errorRate: 0.2%
    throughput: 980 RPS
```

#### Trend Analysis
- **Recovery Speed**: How quickly metrics return to baseline
- **Overshoot**: Whether metrics exceed baseline during recovery
- **Stability**: Consistency of performance post-recovery

---

## Probe Analysis

### Probe Types and Results

#### HTTP Probes
Monitor service availability and response quality:

```yaml
httpProbe:
  name: "frontend-health"
  results:
    totalChecks: 60
    successfulChecks: 54
    failedChecks: 6
    successRate: 90%
    avgResponseTime: 145ms
    timeouts: 2
    errors:
      - "503 Service Unavailable" (4 occurrences)
      - "Connection timeout" (2 occurrences)
```

#### Command Probes
Validate system-level functionality:

```yaml
cmdProbe:
  name: "database-connectivity"
  results:
    totalExecutions: 30
    successfulExecutions: 28
    failedExecutions: 2
    successRate: 93.3%
    avgExecutionTime: 2.1s
    errors:
      - "Connection refused" (2 occurrences)
```

#### Kubernetes Probes
Check cluster and application health:

```yaml
k8sProbe:
  name: "pod-status-check"
  results:
    totalChecks: 45
    successfulChecks: 42
    failedChecks: 3
    successRate: 93.3%
    observations:
      - "3 pods in Pending state during fault injection"
      - "All pods recovered to Running state within 60s"
```

### Probe Failure Analysis

#### Common Failure Patterns
1. **Timeout Failures**: Probes timing out during high load
2. **Connection Failures**: Network connectivity issues
3. **Authentication Failures**: Security-related probe failures
4. **Resource Failures**: Insufficient resources for probe execution

#### Root Cause Investigation
```yaml
# Example probe failure analysis
probeFailure:
  probe: "api-health-check"
  failureTime: "2024-01-15T10:23:45Z"
  duration: "45s"
  rootCause: "Backend service overwhelmed"
  evidence:
    - "Response time increased to 5000ms"
    - "CPU utilization peaked at 95%"
    - "Connection pool exhausted"
  resolution: "Increase backend replicas and connection pool size"
```

---

## Insights and Recommendations

### AI-Powered Analysis

Harness provides intelligent insights based on experiment results:

#### Automated Recommendations
- **Performance Optimization**: Identify bottlenecks and suggest improvements
- **Resilience Gaps**: Highlight areas needing attention
- **Configuration Tuning**: Recommend parameter adjustments
- **Architecture Improvements**: Suggest design changes

#### Pattern Recognition
- **Failure Correlation**: Identify relationships between different failures
- **Recovery Patterns**: Understand how your system recovers from faults
- **Seasonal Trends**: Track resilience changes over time
- **Comparative Benchmarks**: Compare against industry standards



### Actionable Insights

#### High-Priority Issues
```yaml
criticalFindings:
  - issue: "Database connection pool exhaustion"
    impact: "High"
    recommendation: "Increase connection pool size from 10 to 25"
    effort: "Low"
    
  - issue: "Frontend service single point of failure"
    impact: "High"
    recommendation: "Implement load balancer health checks"
    effort: "Medium"
```

#### Improvement Opportunities
```yaml
optimizations:
  - area: "Auto-scaling configuration"
    current: "Manual scaling triggers"
    recommended: "Implement HPA with custom metrics"
    expectedImprovement: "30% faster recovery"
    
  - area: "Circuit breaker implementation"
    current: "No circuit breakers"
    recommended: "Add circuit breakers to external service calls"
    expectedImprovement: "Prevent cascading failures"
```

---

## Historical Analysis

### Trend Tracking

#### Resilience Score Trends
Track how your system's resilience evolves over time:

```
Month 1: 72% → Month 2: 78% → Month 3: 85% → Month 4: 88%
Trend: +16% improvement over 4 months
```

#### Performance Trends
Monitor key performance indicators:

- **Recovery Time**: Decreasing from 5 minutes to 2 minutes
- **Error Rate**: Reduced from 5% to 1.5% during chaos
- **Throughput Impact**: Minimized from 50% to 20% degradation

#### Experiment Evolution
See how your experiments have matured:

- **Complexity**: From single faults to multi-fault scenarios
- **Coverage**: Expanded from 3 services to 15 services
- **Frequency**: Increased from monthly to weekly execution



### Comparative Analysis

#### Environment Comparison
```yaml
environments:
  development:
    resilienceScore: 92%
    note: "Aggressive testing environment"
    
  staging:
    resilienceScore: 87%
    note: "Production-like with some differences"
    
  production:
    resilienceScore: 85%
    note: "Conservative testing with real traffic"
```

#### Team Performance
Track different teams' resilience improvements:

- **Platform Team**: 15% improvement in infrastructure resilience
- **Frontend Team**: 22% improvement in UI fault tolerance
- **Backend Team**: 18% improvement in API resilience

---

## Reporting and Communication

### Executive Reports

#### Summary Dashboard
Create executive-friendly summaries:

```yaml
executiveSummary:
  overallHealth: "Good"
  resilienceScore: 85%
  keyFindings:
    - "System handles pod failures gracefully"
    - "Network latency causes user experience degradation"
    - "Database connection pooling needs optimization"
  recommendedActions:
    - "Implement connection pool tuning (High Priority)"
    - "Add network retry logic (Medium Priority)"
    - "Enhance monitoring coverage (Low Priority)"
```

#### Risk Assessment
```yaml
riskProfile:
  high:
    - "Single database instance creates availability risk"
  medium:
    - "Frontend service lacks proper circuit breakers"
  low:
    - "Monitoring gaps in non-critical services"
```

### Technical Reports

#### Detailed Analysis
Provide comprehensive technical details:

- **Methodology**: Experiment design and execution approach
- **Results**: Complete metrics and probe outcomes
- **Analysis**: Root cause analysis and pattern identification
- **Recommendations**: Specific technical improvements

#### Incident Correlation
Link chaos experiment findings to production incidents:

```yaml
incidentCorrelation:
  - incident: "INC-2024-001"
    date: "2024-01-10"
    chaosExperiment: "database-failover-test"
    correlation: "Experiment predicted 3-minute recovery time, actual incident took 2.8 minutes"
    validation: "Chaos engineering accurately predicted system behavior"
```

---

## Continuous Improvement

### Feedback Loop

#### Experiment Refinement
Use results to improve future experiments:

1. **Adjust Fault Parameters**: Fine-tune intensity and duration
2. **Enhance Probe Coverage**: Add more comprehensive health checks
3. **Expand Scope**: Include additional system components
4. **Increase Complexity**: Combine multiple fault types

#### System Improvements
Translate insights into system enhancements:

1. **Architecture Changes**: Implement recommended design improvements
2. **Configuration Updates**: Apply suggested parameter adjustments
3. **Monitoring Enhancements**: Add missing observability coverage
4. **Process Improvements**: Update incident response procedures

### Success Metrics

#### Resilience Maturity
Track your organization's chaos engineering maturity:

**Level 1: Basic**
- ✅ Regular experiment execution
- ✅ Basic result analysis
- ✅ Simple improvement implementation

**Level 2: Intermediate**
- ✅ Automated experiment scheduling
- ✅ Comprehensive result analysis
- ✅ Systematic improvement tracking

**Level 3: Advanced**
- ✅ Predictive resilience modeling
- ✅ Organization-wide chaos culture
- ✅ Continuous resilience optimization

---

## Troubleshooting Analysis Issues

### Common Problems

#### Incomplete Results
**Symptoms**: Missing metrics or probe data
**Solutions**:
- Check monitoring system connectivity
- Verify probe configuration
- Review experiment execution logs
- Validate data collection permissions

#### Inconsistent Scores
**Symptoms**: Resilience scores vary significantly between runs
**Solutions**:
- Standardize baseline conditions
- Account for external factors
- Increase probe frequency
- Extend observation periods

#### Misleading Insights
**Symptoms**: Recommendations don't align with system behavior
**Solutions**:
- Validate probe accuracy
- Review fault configuration
- Check for external influences
- Correlate with production metrics

### Best Practices

#### Analysis Excellence
- **Comprehensive Review**: Examine all available data sources
- **Context Awareness**: Consider external factors affecting results
- **Trend Analysis**: Look at patterns over time, not just single experiments
- **Validation**: Correlate findings with production behavior

#### Communication Effectiveness
- **Audience-Appropriate**: Tailor reports to stakeholder needs
- **Actionable Insights**: Focus on implementable recommendations
- **Clear Priorities**: Rank findings by impact and effort
- **Follow-Up**: Track implementation of recommendations

## Next Steps

After mastering result analysis:

1. **[Create Experiments](./create-experiments)** - Build new experiment scenarios
2. **[Experiment Management](./manage-experiments)** - Organize and maintain your experiment library
3. **[Gamedays](../gamedays)** - Scale chaos engineering across your organization
4. **[Actions](../actions)** - Automate responses to experiment results

Transform your chaos experiment results into a continuous improvement engine that drives your system's resilience to new heights. Remember: the goal isn't just to break things—it's to learn, improve, and build confidence in your system's ability to handle real-world failures.
