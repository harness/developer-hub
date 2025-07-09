---
title: Probe Best Practices
description: Advanced strategies and best practices for effective probe design and implementation
sidebar_position: 9
redirect_from:
  - /docs/chaos-engineering/use-harness-ce/probes/use-probe
---

# Probe Best Practices

This guide provides advanced strategies, design patterns, and best practices for implementing effective probes in your chaos engineering experiments. Learn how to design robust validation strategies that provide meaningful insights while maintaining system safety.

## Design Principles

### **1. Hypothesis-Driven Validation**
Design probes that directly validate your chaos experiment hypothesis:

```yaml
# Poor: Generic health check
probe:
  - name: "generic-health"
    type: "httpProbe"
    httpProbe/inputs:
      url: "http://service/health"

# Good: Hypothesis-specific validation
experiment:
  hypothesis: "User authentication remains available during database failover"
  probes:
    - name: "auth-service-availability"
      type: "httpProbe"
      mode: "Continuous"
      httpProbe/inputs:
        url: "http://auth-service/login"
        method: "POST"
        body: '{"username":"test","password":"test"}'
    
    - name: "auth-response-time"
      type: "httpProbe"
      mode: "Continuous"
      httpProbe/inputs:
        url: "http://auth-service/validate"
        expected_response_time: "500ms"
```

### **2. Layered Validation Strategy**
Implement multiple validation layers for comprehensive coverage:

```yaml
probes:
  # Infrastructure Layer
  - name: "pod-availability"
    type: "k8sProbe"
    k8sProbe/inputs:
      resource: "pods"
      operation: "present"
      expectedCount: 3
  
  # Service Layer
  - name: "service-connectivity"
    type: "httpProbe"
    httpProbe/inputs:
      url: "http://service/health"
  
  # Application Layer
  - name: "business-logic-validation"
    type: "cmdProbe"
    cmdProbe/inputs:
      command: "python /scripts/validate_business_logic.py"
  
  # User Experience Layer
  - name: "end-to-end-journey"
    type: "datadogProbe"
    datadogProbe/inputs:
      syntheticsTestId: "user-journey-test"
```

### **3. SMART Probe Criteria**
Ensure your probes follow SMART principles:

```yaml
# Specific, Measurable, Achievable, Relevant, Time-bound
probe:
  - name: "api-response-time-sla"  # Specific: API response time
    type: "httpProbe"
    mode: "Continuous"
    runProperties:
      probeTimeout: "5s"           # Time-bound: 5 second timeout
      probePollingInterval: "10s"  # Time-bound: Check every 10 seconds
    httpProbe/inputs:
      url: "https://api.example.com/users"
      method: "GET"
      criteria: "<"                # Measurable: Less than threshold
      responseTime: "200ms"        # Achievable: Realistic 200ms target
      # Relevant: Critical user-facing API
```

## Execution Modes Strategy

### **Mode Selection Guidelines**

#### **Start of Test (SoT)**
Use for baseline validation and prerequisites:

```yaml
probes:
  # Validate system is ready for chaos
  - name: "baseline-performance"
    type: "promProbe"
    mode: "SOT"
    promProbe/inputs:
      query: "avg(cpu_usage_percent) < 70"
  
  # Ensure required resources exist
  - name: "prerequisite-check"
    type: "k8sProbe"
    mode: "SOT"
    k8sProbe/inputs:
      resource: "configmaps"
      operation: "present"
      fieldSelector: "metadata.name=app-config"
```

#### **End of Test (EoT)**
Use for recovery validation and cleanup verification:

```yaml
probes:
  # Validate system recovery
  - name: "post-chaos-health"
    type: "httpProbe"
    mode: "EOT"
    httpProbe/inputs:
      url: "http://service/health"
      expected_status: 200
  
  # Verify cleanup completed
  - name: "cleanup-validation"
    type: "k8sProbe"
    mode: "EOT"
    k8sProbe/inputs:
      resource: "pods"
      operation: "absent"
      labelSelector: "chaos-test=true"
```

#### **Edge Mode**
Use for before/after comparison:

```yaml
probe:
  - name: "performance-impact-measurement"
    type: "promProbe"
    mode: "Edge"
    promProbe/inputs:
      query: "avg(http_request_duration_seconds)"
      # Compares performance before and after chaos
```

#### **Continuous Mode**
Use for real-time monitoring:

```yaml
probe:
  - name: "service-availability-monitoring"
    type: "httpProbe"
    mode: "Continuous"
    runProperties:
      probePollingInterval: "15s"
    httpProbe/inputs:
      url: "http://critical-service/health"
```

#### **OnChaos Mode**
Use for chaos-specific validation:

```yaml
probe:
  - name: "failover-mechanism-validation"
    type: "cmdProbe"
    mode: "OnChaos"
    cmdProbe/inputs:
      command: "check_failover_active.sh"
      # Only validates during active chaos injection
```

## Performance Optimization

### **Efficient Probe Configuration**

#### **Optimize Polling Intervals**
```yaml
# Poor: Too frequent polling
# ❌ Poor: Too frequent polling
runProperties:
  probePollingInterval: "1s"  # Excessive load

# ✅ Good: Balanced polling
runProperties:
  probePollingInterval: "30s"  # Reasonable for most cases
  
# ✅ Good: Context-appropriate intervals
probes:
  - name: "critical-service-check"
    runProperties:
      probePollingInterval: "10s"  # Frequent for critical services
  
  - name: "batch-job-status"
    runProperties:
      probePollingInterval: "5m"   # Less frequent for batch processes
```

#### **Efficient Query Design**
```yaml
# ❌ Poor: Expensive Prometheus query
promProbe/inputs:
  query: "sort_desc(sum by (instance) (cpu_usage_percent))[0:5]"

# ✅ Good: Optimized query
promProbe/inputs:
  query: "avg(cpu_usage_percent{job='kubernetes-nodes'})"
```

#### **Resource-Conscious Command Probes**
```yaml
# ❌ Poor: Resource-intensive command
cmdProbe/inputs:
  command: "find / -name '*.log' -exec grep ERROR {} \\;"

# ✅ Good: Targeted and efficient
cmdProbe/inputs:
  command: "grep -c ERROR /var/log/app.log | head -100"
```

### **Timeout and Retry Strategy**

#### **Adaptive Timeouts**
```yaml
probes:
  # Fast internal services
  - name: "internal-api-check"
    runProperties:
      probeTimeout: "5s"
      attempt: 2
  
  # Slower external services
  - name: "external-api-check"
    runProperties:
      probeTimeout: "30s"
      attempt: 3
  
  # Database queries
  - name: "database-query-check"
    runProperties:
      probeTimeout: "15s"
      attempt: 1  # Don't retry expensive operations
```

#### **Circuit Breaker Pattern**
```yaml
probe:
  - name: "service-with-circuit-breaker"
    type: "httpProbe"
    runProperties:
      probeTimeout: "10s"
      attempt: 3
      interval: "5s"
      stopOnFailure: true  # Stop experiment if critical service fails
```

## Safety and Reliability

### **Fail-Safe Probe Design**

#### **Graceful Degradation**
```yaml
probes:
  # Primary validation
  - name: "primary-service-check"
    type: "httpProbe"
    runProperties:
      stopOnFailure: false  # Continue even if this fails
  
  # Fallback validation
  - name: "fallback-service-check"
    type: "httpProbe"
    runProperties:
      stopOnFailure: true   # Stop if fallback also fails
```

#### **Safety Thresholds**
```yaml
probe:
  - name: "error-rate-safety-check"
    type: "promProbe"
    mode: "Continuous"
    runProperties:
      stopOnFailure: true
    promProbe/inputs:
      query: "sum(rate(http_requests_total{status=~'5..'}[5m])) / sum(rate(http_requests_total[5m])) * 100"
      comparator:
        criteria: "<"
        value: "10.0"  # Stop if error rate exceeds 10%
```

### **Probe Isolation**
```yaml
# ❌ Poor: Probes affecting each other
probes:
  - name: "load-test-probe"
    type: "cmdProbe"
    cmdProbe/inputs:
      command: "ab -n 1000 -c 10 http://service/api"  # Generates load
  
  - name: "performance-check"
    type: "httpProbe"  # Affected by load test above

# ✅ Good: Isolated probe validation
probes:
  - name: "performance-check"
    type: "httpProbe"
    httpProbe/inputs:
      url: "http://service/health"  # Lightweight endpoint
      headers:
        X-Probe-Type: "health-check"  # Identify probe traffic
```

## Observability and Debugging

### **Probe Instrumentation**

#### **Meaningful Probe Names**
```yaml
# ❌ Poor: Generic names
probes:
  - name: "probe1"
  - name: "check"
  - name: "test"

# ✅ Good: Descriptive names
probes:
  - name: "user-auth-api-availability"
  - name: "database-connection-pool-health"
  - name: "payment-service-response-time-sla"
```

#### **Structured Logging**
```yaml
probe:
  - name: "structured-validation"
    type: "cmdProbe"
    cmdProbe/inputs:
      command: |
        echo "PROBE_START: user-service-validation"
        result=$(curl -s http://user-service/health)
        echo "PROBE_RESULT: $result"
        echo "PROBE_END: user-service-validation"
        test "$result" = "healthy"
```

### **Probe Monitoring**

#### **Meta-Monitoring**
```yaml
# Monitor probe execution itself
probe:
  - name: "probe-execution-monitor"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      query: "increase(chaos_probe_executions_total[5m])"
      comparator:
        criteria: ">"
        value: "0"  # Ensure probes are executing
```

#### **Probe Performance Tracking**
```yaml
probe:
  - name: "probe-latency-monitor"
    type: "promProbe"
    promProbe/inputs:
      query: "avg(chaos_probe_duration_seconds) < 5"
      # Ensure probes complete within reasonable time
```

## Advanced Patterns

### **Probe Chaining Strategies**

#### **Sequential Validation**
```yaml
probes:
  # Step 1: Get service endpoint
  - name: "discover-service-endpoint"
    type: "k8sProbe"
    mode: "SOT"
    k8sProbe/inputs:
      resource: "services"
      operation: "present"
      fieldSelector: "metadata.name=user-service"
  
  # Step 2: Validate service using discovered endpoint
  - name: "validate-discovered-service"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "curl -f http://{{ .discover-service-endpoint.ProbeArtifacts.Register }}:8080/health"
```

#### **Conditional Validation**
```yaml
probes:
  # Check if feature flag is enabled
  - name: "feature-flag-check"
    type: "httpProbe"
    mode: "SOT"
    httpProbe/inputs:
      url: "http://config-service/flags/new-feature"
  
  # Only validate new feature if flag is enabled
  - name: "new-feature-validation"
    type: "httpProbe"
    mode: "Continuous"
    condition: "{{ .feature-flag-check.ProbeArtifacts.Register }} == 'enabled'"
    httpProbe/inputs:
      url: "http://service/new-feature"
```

### **Multi-Environment Validation**
```yaml
probes:
  # Production validation
  - name: "prod-service-health"
    type: "httpProbe"
    httpProbe/inputs:
      url: "https://api.production.com/health"
      headers:
        Authorization: "Bearer ${PROD_TOKEN}"
  
  # Staging validation
  - name: "staging-service-health"
    type: "httpProbe"
    httpProbe/inputs:
      url: "https://api.staging.com/health"
      headers:
        Authorization: "Bearer ${STAGING_TOKEN}"
```

## Probe Governance

### **Standardization Guidelines**

#### **Probe Templates**
```yaml
# Standard HTTP health check template
templates:
  http_health_check: &http_health
    type: "httpProbe"
    mode: "Continuous"
    runProperties:
      probeTimeout: "10s"
      interval: "30s"
      attempt: 3
    httpProbe/inputs:
      method: "GET"
      criteria: "=="
      responseCode: "200"

# Usage
probes:
  - name: "user-service-health"
    <<: *http_health
    httpProbe/inputs:
      url: "http://user-service/health"
  
  - name: "order-service-health"
    <<: *http_health
    httpProbe/inputs:
      url: "http://order-service/health"
```

#### **Mandatory Probe Requirements**
```yaml
# Enforce minimum probe requirements
governance:
  required_probes:
    - type: "httpProbe"
      name_pattern: "*-health-check"
      description: "All experiments must include service health validation"
    
    - type: "sloProbe"
      name_pattern: "*-slo-validation"
      description: "All experiments must validate SLO compliance"
```

### **Quality Gates**
```yaml
# Probe quality validation
quality_gates:
  probe_coverage:
    minimum_probes: 3
    required_modes: ["SOT", "Continuous", "EOT"]
  
  probe_performance:
    max_timeout: "60s"
    max_polling_interval: "5m"
  
  probe_reliability:
    min_success_rate: "95%"
    max_failure_tolerance: "2"
```

## Continuous Improvement

### **Probe Analytics**

#### **Success Rate Monitoring**
```yaml
# Track probe success rates over time
analytics:
  probe_success_rate:
    query: "avg_over_time(chaos_probe_success_rate[24h])"
    threshold: "95%"
    alert: "probe-success-rate-low"
```

#### **Performance Trending**
```yaml
# Monitor probe execution performance
analytics:
  probe_execution_time:
    query: "avg_over_time(chaos_probe_duration_seconds[7d])"
    trend_analysis: true
    optimization_threshold: "10s"
```

### **Feedback Loops**

#### **Automated Probe Optimization**
```yaml
# Automatically adjust probe intervals based on success rates
optimization:
  adaptive_intervals:
    high_success_rate: "increase_interval"  # Reduce frequency if always passing
    high_failure_rate: "decrease_interval"  # Increase frequency if failing
    timeout_optimization: "adjust_based_on_p95_response_time"
```

#### **Probe Effectiveness Scoring**
```yaml
# Score probes based on their effectiveness
scoring:
  criteria:
    - fault_detection_rate: 40%    # How often probe catches real issues
    - false_positive_rate: 30%     # How often probe fails incorrectly
    - execution_efficiency: 20%    # Resource usage and speed
    - business_relevance: 10%      # Alignment with business objectives
```

## Summary Checklist

### **Before Implementing Probes**
- [ ] Define clear hypothesis for each probe
- [ ] Choose appropriate probe types and modes
- [ ] Set realistic timeouts and thresholds
- [ ] Plan for probe isolation and safety
- [ ] Design meaningful probe names and descriptions

### **During Probe Development**
- [ ] Implement layered validation strategy
- [ ] Optimize for performance and resource usage
- [ ] Add proper error handling and logging
- [ ] Test probes independently before integration
- [ ] Document probe purpose and expected behavior

### **After Probe Deployment**
- [ ] Monitor probe success rates and performance
- [ ] Analyze probe effectiveness and business impact
- [ ] Continuously optimize based on feedback
- [ ] Maintain probe documentation and governance
- [ ] Share learnings and best practices with team

## Next Steps

- [**Actions**](../actions/index.md) - Automated responses to probe results
- [**Security**](../../security/index.md) - Secure probe configuration
- [**Troubleshooting**](../../resources/troubleshooting.md) - Common probe issues and solutions

---

*Effective probe design is the foundation of successful chaos engineering. Use these best practices to build robust validation strategies that provide meaningful insights while maintaining system safety.*
