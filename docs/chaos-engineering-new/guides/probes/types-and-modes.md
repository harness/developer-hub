---
title: Probe Types & Execution Modes
description: Understanding different probe types and their execution modes
sidebar_position: 2
---

# Probe Types & Execution Modes

This guide covers the different types of probes available and their execution modes, helping you choose the right monitoring strategy for your chaos experiments.

## Execution Modes

Probe execution modes determine **when** and **how often** probes run during your chaos experiments. Choose the right mode based on your validation requirements.

### **SoT (Start of Test)**
Executes **before** chaos injection begins.

```yaml
probe:
  name: "baseline-check"
  type: "httpProbe"
  mode: "SOT"  # Runs only at start
  httpProbe/inputs:
    url: "https://api.example.com/health"
    method: "GET"
```

**Use Cases:**
- Validate system baseline health
- Ensure prerequisites are met
- Confirm system readiness for chaos

### **EoT (End of Test)**
Executes **after** chaos injection completes.

```yaml
probe:
  name: "recovery-check"
  type: "httpProbe"
  mode: "EOT"  # Runs only at end
  httpProbe/inputs:
    url: "https://api.example.com/health"
    method: "GET"
```

**Use Cases:**
- Validate system recovery
- Confirm hypothesis post-chaos
- Check for lingering effects

### **Edge Mode**
Executes **both** before and after chaos injection.

```yaml
probe:
  name: "comparison-check"
  type: "httpProbe"
  mode: "Edge"  # Runs at start AND end
  httpProbe/inputs:
    url: "https://api.example.com/metrics"
    method: "GET"
```

**Use Cases:**
- Compare pre vs post-chaos states
- Measure impact of chaos
- Most common validation pattern

### **Continuous Mode**
Executes **throughout** the entire experiment duration.

```yaml
probe:
  name: "ongoing-monitoring"
  type: "httpProbe"
  mode: "Continuous"
  runProperties:
    probePollingInterval: "10s"  # Check every 10 seconds
  httpProbe/inputs:
    url: "https://api.example.com/health"
    method: "GET"
```

**Use Cases:**
- Real-time monitoring
- Performance validation
- Continuous health checks

### **OnChaos Mode**
Executes **only during** chaos injection period.

```yaml
probe:
  name: "chaos-impact-check"
  type: "httpProbe"
  mode: "OnChaos"
  runProperties:
    probePollingInterval: "5s"
  httpProbe/inputs:
    url: "https://api.example.com/health"
    method: "GET"
```

**Use Cases:**
- Monitor immediate chaos impact
- Fault-specific validation
- Performance during failure

## Probe Types Overview

### **HTTP Probes**
Monitor web services, APIs, and HTTP endpoints.

```yaml
httpProbe:
  name: "api-health-check"
  url: "https://api.example.com/health"
  method: "GET"
  expected_status: 200
  timeout: "5s"
```

**Best For:**
- Web service availability
- API response validation
- Performance monitoring
- Load balancer health checks

### **Kubernetes Probes**
Validate Kubernetes resources and cluster state.

```yaml
k8sProbe:
  name: "pod-availability"
  resource: "pods"
  namespace: "production"
  fieldSelector: "status.phase=Running"
  expectedCount: 3
```

**Best For:**
- Pod availability checks
- Resource state validation
- Cluster health monitoring
- Deployment status verification

### **Command Probes**
Execute custom commands and scripts.

```yaml
cmdProbe:
  name: "database-connection"
  command: "pg_isready -h db.example.com -p 5432"
  expectedExitCode: 0
  source: "inline"
```

**Best For:**
- Custom validation logic
- Database connectivity
- File system checks
- Application-specific tests

### **Prometheus Probes**
Query metrics from Prometheus monitoring.

```yaml
promProbe:
  name: "cpu-usage-check"
  query: "avg(cpu_usage_percent) < 80"
  endpoint: "http://prometheus:9090"
  comparator:
    criteria: "=="
    value: "1"
```

**Best For:**
- Performance metrics validation
- Resource utilization checks
- Custom metric queries
- SLI/SLO validation

### **APM Probes**
Integrate with Application Performance Monitoring tools.

#### **Datadog Probe**
```yaml
datadogProbe:
  name: "response-time-check"
  query: "avg:http.response_time{service:user-api}"
  threshold: 200
```

#### **Dynatrace Probe**
```yaml
dynatraceProbe:
  name: "user-experience-check"
  entitySelector: "type(SERVICE),tag(environment:production)"
  metricSelector: "builtin:service.response.time"
```

**Best For:**
- Application performance monitoring
- User experience validation
- Business metric tracking
- Advanced analytics

### **SLO Probes**
Validate Service Level Objectives and error budgets.

```yaml
sloProbe:
  name: "availability-slo"
  sloId: "user-service-availability"
  threshold: "99.9%"
  evaluationWindow: "5m"
```

**Best For:**
- SLO compliance validation
- Error budget monitoring
- Service reliability checks
- Business impact assessment

## Common Use Cases

### **1. Network Partitioning Tests**
```yaml
# Validate service mesh resilience
probes:
  - name: "service-connectivity"
    type: "httpProbe"
    mode: "Continuous"
    httpProbe/inputs:
      url: "http://service-a.production.svc.cluster.local/health"
  
  - name: "fallback-mechanism"
    type: "cmdProbe"
    mode: "OnChaos"
    cmdProbe/inputs:
      command: "curl -f http://fallback-service/health"
```

### **2. Pod Failure Scenarios**
```yaml
# Monitor pod recovery and scaling
probes:
  - name: "pod-count-validation"
    type: "k8sProbe"
    mode: "Continuous"
    k8sProbe/inputs:
      resource: "pods"
      namespace: "production"
      labelSelector: "app=web-server"
      operation: "present"
  
  - name: "service-availability"
    type: "httpProbe"
    mode: "Edge"
    httpProbe/inputs:
      url: "https://api.example.com/health"
```

### **3. Resource Exhaustion Tests**
```yaml
# Monitor performance under resource pressure
probes:
  - name: "cpu-utilization"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      query: "avg(cpu_usage_percent) < 90"
      endpoint: "http://prometheus:9090"
  
  - name: "memory-usage"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      query: "avg(memory_usage_percent) < 85"
```

### **4. Latency Injection Tests**
```yaml
# Validate performance under network delays
probes:
  - name: "response-time-check"
    type: "httpProbe"
    mode: "Continuous"
    httpProbe/inputs:
      url: "https://api.example.com/search"
      method: "GET"
      responseTimeout: "2s"  # Expect response within 2s
  
  - name: "user-experience-metric"
    type: "datadogProbe"
    mode: "OnChaos"
    datadogProbe/inputs:
      query: "avg:http.response_time{service:search-api} < 1000"
```

## Impact on Resilience Score

Probes directly influence your experiment's **Resilience Score** using this formula:

```
Resilience Score = Σ(Weight(fault) × ProbeSuccessPercentage(fault)) / Σ Weight(fault)
```

### **Probe Success Calculation**
- **Successful Probe**: 100% success
- **Failed Probe**: 0% success
- **Continuous Probes**: Average success across all executions

### **Example Calculation**
```yaml
experiment:
  faults:
    - name: "pod-delete"
      weight: 10
      probes:
        - name: "api-health"     # 100% success
        - name: "db-connection"  # 80% success (4/5 checks passed)
        
# Fault Success = (100 + 80) / 2 = 90%
# Resilience Score = (10 × 90) / 10 = 90%
```

## Probe Chaining

**Probe chaining** allows you to use results from one probe in subsequent probes, enabling complex validation workflows.

:::info YAML Only Feature
Probe chaining is currently only available in YAML manifests and supports Command Probes.
:::

### **Basic Chaining Example**
```yaml
probes:
  - name: "get-pod-name"
    type: "cmdProbe"
    cmdProbe/inputs:
      command: "kubectl get pods -l app=web -o jsonpath='{.items[0].metadata.name}'"
      comparator:
        type: "string"
        criteria: "contains"
        value: "web"
    mode: "SOT"
    
  - name: "check-pod-logs"
    type: "cmdProbe"
    cmdProbe/inputs:
      # Using result from first probe
      command: "kubectl logs {{ .get-pod-name.ProbeArtifacts.Register }} | grep -c ERROR"
      comparator:
        type: "int"
        criteria: "equal"
        value: "0"
    mode: "EOT"
```

### **Advanced Chaining Pattern**
```yaml
probes:
  - name: "discover-service-endpoint"
    type: "cmdProbe"
    cmdProbe/inputs:
      command: "kubectl get svc web-service -o jsonpath='{.spec.clusterIP}'"
    mode: "SOT"
    
  - name: "validate-service-health"
    type: "cmdProbe"
    cmdProbe/inputs:
      command: "curl -f http://{{ .discover-service-endpoint.ProbeArtifacts.Register }}:8080/health"
    mode: "Continuous"
    
  - name: "check-service-metrics"
    type: "cmdProbe"
    cmdProbe/inputs:
      command: "curl -s http://{{ .discover-service-endpoint.ProbeArtifacts.Register }}:8080/metrics | grep -c 'http_requests_total'"
    mode: "EOT"
```

## Best Practices

### **Mode Selection Guidelines**
- **Use SoT/EoT** for simple before/after comparisons
- **Use Edge** for impact measurement
- **Use Continuous** for real-time monitoring
- **Use OnChaos** for fault-specific validation

### **Probe Configuration Tips**
- **Set Realistic Timeouts**: Avoid false negatives
- **Choose Appropriate Intervals**: Balance accuracy vs performance
- **Use Meaningful Names**: Make probes self-documenting
- **Monitor Probe Performance**: Track probe execution time

### **Common Pitfalls**
- **Too Aggressive Timeouts**: Causing false failures
- **Excessive Probe Frequency**: Overwhelming the system
- **Insufficient Validation**: Missing critical checks
- **Complex Probe Logic**: Making debugging difficult

## Next Steps

- [**HTTP Probes**](./http-probe.md) - Web service monitoring
- [**Kubernetes Probes**](./kubernetes-probe.md) - Container orchestration validation
- [**Command Probes**](./command-probe.md) - Custom validation scripts
- [**Prometheus Probes**](./prometheus-probe.md) - Metrics-based validation
- [**Best Practices**](./best-practices.md) - Advanced probe strategies

---

*Choose the right probe types and modes to build comprehensive validation for your chaos experiments.*
