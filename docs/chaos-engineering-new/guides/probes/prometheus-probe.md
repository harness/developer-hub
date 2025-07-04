---
title: Prometheus Probes
description: Validate metrics and SLOs using Prometheus queries
sidebar_position: 6
---

# Prometheus Probes

Prometheus probes enable metrics-based validation during chaos experiments by executing PromQL queries against Prometheus servers. They're essential for validating Service Level Indicators (SLIs), monitoring performance metrics, and ensuring your observability stack remains functional during failures.

## What are Prometheus Probes?

Prometheus probes execute **PromQL queries** against Prometheus endpoints and validate the results against specified criteria. They bridge the gap between chaos experiments and your observability infrastructure.

**Key Capabilities:**
- **Metrics Validation**: Query and validate system metrics
- **SLI/SLO Monitoring**: Track Service Level Indicators
- **Performance Analysis**: Monitor application performance trends
- **Anomaly Detection**: Identify unusual metric patterns
- **Threshold Monitoring**: Alert on metric boundary violations
- **Time-Series Analysis**: Analyze metrics over time windows
- **Alerting Validation**: Ensure monitoring systems remain functional

## Quick Start

### **Basic CPU Usage Check**
```yaml
probe:
  - name: "cpu-usage-check"
    type: "promProbe"
    mode: "Continuous"
    runProperties:
      probeTimeout: "10s"
      interval: "30s"
      attempt: 3
    promProbe/inputs:
      endpoint: "http://prometheus.monitoring.svc.cluster.local:9090"
      query: "avg(cpu_usage_percent{job='kubernetes-nodes'}) * 100"
      comparator:
        type: "float"
        criteria: "<"
        value: "80.0"  # CPU usage should be less than 80%
```

### **HTTP Error Rate Validation**
```yaml
probe:
  - name: "error-rate-check"
    type: "promProbe"
    mode: "OnChaos"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: |
        (
          sum(rate(http_requests_total{status=~"5.."}[5m])) /
          sum(rate(http_requests_total[5m]))
        ) * 100
      comparator:
        type: "float"
        criteria: "<"
        value: "5.0"  # Error rate should be less than 5%
```

## Common PromQL Patterns

### **Error Rate Monitoring**
```yaml
# HTTP 5xx error rate
query: |
  (
    sum(rate(http_requests_total{status=~"5.."}[5m])) /
    sum(rate(http_requests_total[5m]))
  ) * 100

# Application error rate
query: |
  sum(rate(application_errors_total[5m])) /
  sum(rate(application_requests_total[5m])) * 100
```

### **Latency Monitoring**
```yaml
# 95th percentile response time
query: |
  histogram_quantile(0.95, 
    sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
  )

# Average response time
query: |
  avg(http_request_duration_seconds{job="api-server"})
```

### **Throughput Monitoring**
```yaml
# Requests per second
query: |
  sum(rate(http_requests_total[5m]))

# Successful requests per minute
query: |
  sum(rate(http_requests_total{status=~"2.."}[1m])) * 60
```

### **Resource Utilization**
```yaml
# CPU usage by pod
query: |
  avg by (pod) (cpu_usage_percent{namespace="production"})

# Memory usage percentage
query: |
  (memory_usage_bytes / memory_limit_bytes) * 100

# Disk usage
query: |
  (disk_used_bytes / disk_total_bytes) * 100
```

## Common Use Cases

### **1. SLI/SLO Validation**
```yaml
probes:
  # Availability SLI
  - name: "availability-sli"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: |
        (
          sum(up{job="api-server"}) /
          count(up{job="api-server"})
        ) * 100
      comparator:
        type: "float"
        criteria: ">="
        value: "99.9"  # 99.9% availability SLO
  
  # Latency SLI
  - name: "latency-sli"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: |
        histogram_quantile(0.95,
          sum(rate(http_request_duration_seconds_bucket{job="api-server"}[5m])) by (le)
        )
      comparator:
        type: "float"
        criteria: "<"
        value: "0.5"  # 95th percentile < 500ms
```

### **2. Application Performance Monitoring**
```yaml
probes:
  # Response time validation
  - name: "response-time-check"
    type: "promProbe"
    mode: "OnChaos"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: "avg(http_request_duration_seconds{service='user-api'})"
      comparator:
        type: "float"
        criteria: "<"
        value: "0.2"  # Average response time < 200ms
  
  # Throughput validation
  - name: "throughput-check"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: "sum(rate(http_requests_total{service='user-api'}[1m]))"
      comparator:
        type: "float"
        criteria: ">"
        value: "100"  # > 100 requests per second
```

### **3. Infrastructure Monitoring**
```yaml
probes:
  # Node resource usage
  - name: "node-cpu-check"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: "avg(100 - (avg by (instance) (rate(node_cpu_seconds_total{mode='idle'}[5m])) * 100))"
      comparator:
        type: "float"
        criteria: "<"
        value: "75.0"  # Average CPU usage < 75%
  
  # Memory usage
  - name: "memory-usage-check"
    type: "promProbe"
    mode: "OnChaos"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: |
        (
          (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) /
          node_memory_MemTotal_bytes
        ) * 100
      comparator:
        type: "float"
        criteria: "<"
        value: "85.0"  # Memory usage < 85%
```

### **4. Database Performance**
```yaml
probes:
  # Database connection pool
  - name: "db-connection-pool"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: "avg(database_connections_active / database_connections_max * 100)"
      comparator:
        type: "float"
        criteria: "<"
        value: "80.0"  # Connection pool usage < 80%
  
  # Query performance
  - name: "db-query-latency"
    type: "promProbe"
    mode: "OnChaos"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: "avg(database_query_duration_seconds{operation='SELECT'})"
      comparator:
        type: "float"
        criteria: "<"
        value: "0.1"  # Average query time < 100ms
```

### **5. Business Metrics**
```yaml
probes:
  # Order processing rate
  - name: "order-processing-rate"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: "sum(rate(orders_processed_total[5m]))"
      comparator:
        type: "float"
        criteria: ">"
        value: "10.0"  # > 10 orders per second
  
  # Revenue impact
  - name: "revenue-impact-check"
    type: "promProbe"
    mode: "OnChaos"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: "sum(rate(revenue_dollars_total[5m])) * 60"
      comparator:
        type: "float"
        criteria: ">"
        value: "1000.0"  # > $1000 per minute
```

## Advanced Configuration

### **Complex Multi-line Queries**
```yaml
probe:
  - name: "complex-sli-check"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      query: |
        (
          sum(
            rate(http_requests_total{
              job="api-server",
              status=~"2..|3.."
            }[5m])
          ) /
          sum(
            rate(http_requests_total{
              job="api-server"
            }[5m])
          )
        ) * 100
      comparator:
        type: "float"
        criteria: ">="
        value: "99.5"
```

### **Query from File** (YAML Only)
```yaml
probe:
  - name: "file-based-query"
    type: "promProbe"
    mode: "Continuous"
    promProbe/inputs:
      endpoint: "http://prometheus:9090"
      queryPath: "/queries/complex-sli.promql"
      comparator:
        type: "float"
        criteria: ">="
        value: "99.0"
```

### **Authentication**
```yaml
# Basic authentication
promProbe/inputs:
  endpoint: "http://prometheus:9090"
  query: "up"
  auth:
    credentials: "dXNlcm5hbWU6cGFzc3dvcmQ="  # base64 encoded username:password

# Token-based authentication
promProbe/inputs:
  endpoint: "http://prometheus:9090"
  query: "up"
  auth:
    credentialsFile: "/etc/secrets/prometheus-token"
```

## Comparator Options

### **Numeric Comparisons**
```yaml
comparator:
  type: "float"
  criteria: "<"      # Less than
  # criteria: ">"    # Greater than
  # criteria: "<="   # Less than or equal
  # criteria: ">="   # Greater than or equal
  # criteria: "=="   # Equal to
  # criteria: "!="   # Not equal to
  value: "95.0"
```

### **Range Validation**
```yaml
# Between two values
comparator:
  type: "float"
  criteria: "between"
  value: "90.0-99.0"  # Between 90% and 99%

# One of specific values
comparator:
  type: "float"
  criteria: "oneOf"
  value: "95.0,96.0,97.0"  # One of these values
```

## Troubleshooting

### **Common Issues**

#### **Query Syntax Errors**
```yaml
# Problem: Invalid PromQL syntax
# Solution: Test queries in Prometheus UI first
query: "avg(cpu_usage_percent)"  # Verify metric names exist
```

#### **No Data Returned**
```yaml
# Problem: Query returns no results
# Solution: Check metric availability and time ranges
query: "avg(cpu_usage_percent[5m])"  # Add time range if needed
```

#### **Authentication Failures**
```yaml
# Problem: 401/403 errors
# Solution: Verify credentials and permissions
promProbe/inputs:
  auth:
    credentials: "validBase64EncodedCredentials"
```

#### **Timeout Issues**
```yaml
# Problem: Queries timing out
# Solution: Optimize queries and increase timeout
runProperties:
  probeTimeout: "30s"  # Increase timeout for complex queries
```

### **Debugging Tips**

1. **Test Queries Independently**: Validate PromQL in Prometheus UI first
2. **Check Metric Availability**: Ensure metrics exist in the time range
3. **Verify Endpoint**: Confirm Prometheus server accessibility
4. **Validate Authentication**: Test credentials separately
5. **Check Time Windows**: Ensure queries cover appropriate time ranges

## Best Practices

### **Query Optimization**
- **Use Efficient Queries**: Avoid expensive operations like `sort_desc()`
- **Limit Query Complexity**: Avoid expensive aggregations
- **Use Recording Rules**: Pre-compute complex metrics
- **Optimize Polling**: Set appropriate probe intervals
- **Monitor Query Load**: Track Prometheus server performance

### **Probe Design**
- **Use Specific Queries**: Target exact metrics needed for validation
- **Optimize Query Performance**: Use efficient PromQL expressions
- **Set Appropriate Time Windows**: Match query ranges to validation needs
- **Handle Missing Data**: Account for gaps in metric collection

### **Monitoring Strategy**
- **Layer Your Metrics**: Infrastructure → Application → Business
- **Align with SLOs**: Use probes to validate service level objectives
- **Monitor Probe Health**: Track probe execution and success rates
- **Document Queries**: Maintain clear documentation for complex queries

## Next Steps

- [**APM Probes**](./apm-probes.md) - Application performance monitoring
- [**SLO Probes**](./slo-probe.md) - Service level objective validation
- [**Best Practices**](./best-practices.md) - Advanced probe strategies
- [**Actions**](../actions/index.md) - Automated responses to probe results

---

*Prometheus probes provide powerful metrics-based validation for your chaos experiments. Use them to ensure your monitoring and alerting systems work correctly under failure conditions.*
