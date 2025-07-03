---
title: SLO Probes
description: Validate Service Level Objectives and error budgets during chaos experiments
sidebar_position: 8
---

# SLO Probes

SLO (Service Level Objective) probes validate error budgets and service reliability metrics during chaos experiments. They integrate with Harness Service Reliability Management (SRM) to ensure your chaos experiments don't violate established service level objectives and help maintain reliability standards.

## What are SLO Probes?

SLO probes connect with **Harness SRM** to monitor error budget consumption during chaos experiments. They help ensure that chaos engineering practices align with business reliability requirements and don't compromise service level agreements.

**Key Capabilities:**
- **Error Budget Monitoring**: Track error budget consumption during chaos
- **SLO Compliance**: Ensure experiments don't violate service objectives
- **Reliability Validation**: Maintain service reliability standards
- **Impact Assessment**: Measure chaos impact on business metrics
- **Early Warning**: Alert when error budgets are at risk
- **Compliance Reporting**: Generate reliability compliance reports

## Quick Start

### **Basic Error Budget Validation**
```yaml
probe:
  - name: "api-availability-slo"
    type: "sloProbe"
    mode: "EOT"  # SLO probes only support EOT mode
    runProperties:
      probeTimeout: "60s"
      attempt: 3
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "user-api-availability-slo"
      evaluationTimeout: "10m"
      comparator:
        type: "float"
        criteria: ">"
        value: "90.0"  # Error budget should remain > 90%
      insecureSkipVerify: false
```

### **Response Time SLO Validation**
```yaml
probe:
  - name: "response-time-slo"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "api-response-time-slo"
      evaluationTimeout: "15m"
      comparator:
        type: "float"
        criteria: ">="
        value: "95.0"  # Maintain 95% of error budget
      authToken: "${HARNESS_API_TOKEN}"
```

## SLO Types and Examples

### **1. Availability SLOs**
```yaml
probe:
  - name: "service-availability-slo"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "microservice-availability"
      evaluationTimeout: "5m"
      comparator:
        type: "float"
        criteria: ">"
        value: "99.0"  # 99% availability target
      # Validates that service remains available during chaos
```

### **2. Latency SLOs**
```yaml
probe:
  - name: "latency-slo-validation"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "api-latency-p95"
      evaluationTimeout: "10m"
      comparator:
        type: "float"
        criteria: "<"
        value: "10.0"  # Less than 10% error budget consumption
      # Ensures 95th percentile latency remains within bounds
```

### **3. Error Rate SLOs**
```yaml
probe:
  - name: "error-rate-slo"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "service-error-rate"
      evaluationTimeout: "8m"
      comparator:
        type: "float"
        criteria: ">"
        value: "85.0"  # Maintain 85% of error budget
      # Validates error rates stay within acceptable limits
```

### **4. Throughput SLOs**
```yaml
probe:
  - name: "throughput-slo-check"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "api-throughput-slo"
      evaluationTimeout: "12m"
      comparator:
        type: "float"
        criteria: ">="
        value: "90.0"  # Maintain 90% of error budget
      # Ensures throughput remains within SLO bounds
```

## Common Use Cases

### **1. Microservices Reliability Testing**
```yaml
probes:
  # User service availability
  - name: "user-service-availability"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "user-service-99-9-availability"
      evaluationTimeout: "10m"
      comparator:
        type: "float"
        criteria: ">"
        value: "95.0"  # Keep 95% of error budget
  
  # Order service latency
  - name: "order-service-latency"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "order-service-p95-latency"
      evaluationTimeout: "10m"
      comparator:
        type: "float"
        criteria: "<"
        value: "15.0"  # Less than 15% budget consumption
```

### **2. API Gateway Resilience**
```yaml
probes:
  # Gateway availability
  - name: "gateway-availability-slo"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "api-gateway-availability"
      evaluationTimeout: "15m"
      comparator:
        type: "float"
        criteria: ">="
        value: "98.0"  # Maintain 98% of error budget
  
  # Gateway response time
  - name: "gateway-response-time-slo"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "gateway-response-time"
      evaluationTimeout: "15m"
      comparator:
        type: "float"
        criteria: "<"
        value: "20.0"  # Less than 20% budget consumption
```

### **3. Database Performance Validation**
```yaml
probe:
  - name: "database-performance-slo"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "database-query-performance"
      evaluationTimeout: "20m"
      comparator:
        type: "float"
        criteria: ">"
        value: "90.0"  # Maintain 90% of error budget
      # Validates database performance during chaos
```

### **4. Business Critical Services**
```yaml
probes:
  # Payment service reliability
  - name: "payment-service-slo"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "payment-processing-reliability"
      evaluationTimeout: "30m"
      comparator:
        type: "float"
        criteria: ">"
        value: "99.5"  # Very strict for payment processing
  
  # Authentication service
  - name: "auth-service-slo"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      platformEndpoint: "https://app.harness.io/gateway/cv/api"
      sloIdentifier: "authentication-service-slo"
      evaluationTimeout: "10m"
      comparator:
        type: "float"
        criteria: ">="
        value: "97.0"  # Maintain 97% of error budget
```

## Configuration Options

### **Platform Integration**
```yaml
sloProbe/inputs:
  platformEndpoint: "https://app.harness.io/gateway/cv/api"  # Harness SRM endpoint
  sloIdentifier: "my-service-availability-slo"              # SLO identifier from SRM
  evaluationTimeout: "10m"                                   # Time window for evaluation
```

### **Authentication**
```yaml
# Using API token
sloProbe/inputs:
  authToken: "${HARNESS_API_TOKEN}"
  
# Using service account
sloProbe/inputs:
  serviceAccount: "chaos-slo-validator"
  
# Skip TLS verification (development only)
sloProbe/inputs:
  insecureSkipVerify: true
```

### **Error Budget Thresholds**
```yaml
comparator:
  type: "float"
  criteria: ">"          # Greater than threshold
  # criteria: ">="       # Greater than or equal
  # criteria: "<"        # Less than threshold
  # criteria: "<="       # Less than or equal
  # criteria: "=="       # Equal to threshold
  # criteria: "!="       # Not equal to threshold
  value: "90.0"          # Percentage threshold
```

## Error Budget Calculation

### **Understanding Error Budget**
Error budget represents the amount of unreliability you can tolerate while still meeting your SLO:

```
Error Budget = 100% - SLO Target
Example: 99.9% SLO = 0.1% Error Budget
```

### **Probe Validation Logic**
```yaml
# Example: 99.9% availability SLO
# Error Budget: 0.1% (43.2 minutes per month)
# During 10-minute chaos experiment:
# Acceptable error budget consumption: ~1.44 minutes

probe:
  - name: "availability-budget-check"
    type: "sloProbe"
    mode: "EOT"
    sloProbe/inputs:
      sloIdentifier: "service-availability-99-9"
      evaluationTimeout: "10m"
      comparator:
        type: "float"
        criteria: ">"
        value: "80.0"  # Keep 80% of error budget remaining
```

## Troubleshooting

### **Common Issues**

#### **Authentication Failures**
```yaml
# Problem: 401/403 errors
# Solution: Verify API token and permissions
sloProbe/inputs:
  authToken: "${VALID_HARNESS_API_TOKEN}"
  # Ensure token has SRM read permissions
```

#### **SLO Not Found**
```yaml
# Problem: SLO identifier not found
# Solution: Verify SLO exists in SRM
sloProbe/inputs:
  sloIdentifier: "correct-slo-identifier"  # Check SRM dashboard
```

#### **Evaluation Timeout Issues**
```yaml
# Problem: Evaluation timeout too short
# Solution: Increase timeout for longer experiments
sloProbe/inputs:
  evaluationTimeout: "30m"  # Increase for longer chaos experiments
```

#### **Platform Endpoint Errors**
```yaml
# Problem: Cannot connect to platform
# Solution: Verify endpoint URL and network connectivity
sloProbe/inputs:
  platformEndpoint: "https://app.harness.io/gateway/cv/api"  # Correct endpoint
```

### **Debugging Tips**

1. **Verify SLO Configuration**: Check SLO setup in Harness SRM
2. **Validate Authentication**: Test API token independently
3. **Check Error Budget**: Ensure sufficient error budget exists
4. **Monitor Evaluation Time**: Align timeout with experiment duration
5. **Test Connectivity**: Verify network access to Harness platform

## Best Practices

### **SLO Design Guidelines**
- **Align with Business Goals**: SLOs should reflect user experience
- **Set Realistic Targets**: Based on historical performance data
- **Regular Review**: Update SLOs as systems evolve
- **Layer SLOs**: Different SLOs for different service tiers

### **Probe Configuration**
- **Appropriate Timeouts**: Match evaluation window to experiment duration
- **Conservative Thresholds**: Leave buffer for unexpected variations
- **Multiple SLOs**: Validate different aspects (availability, latency, errors)
- **Regular Testing**: Validate SLO probe configuration regularly

### **Error Budget Management**
- **Monitor Consumption**: Track error budget usage over time
- **Reserve Budget**: Keep buffer for chaos experiments
- **Trend Analysis**: Understand error budget consumption patterns
- **Alert Thresholds**: Set alerts before budget exhaustion

## Integration with Chaos Engineering

### **Experiment Planning**
```yaml
# Plan experiments based on available error budget
experiment:
  name: "microservice-resilience-test"
  probes:
    - name: "pre-experiment-budget-check"
      type: "sloProbe"
      mode: "EOT"
      # Ensure sufficient error budget before starting
```

### **Continuous Validation**
```yaml
# Use SLO probes in CI/CD pipelines
pipeline:
  stages:
    - chaos_experiment:
        probes:
          - slo_validation
    - deployment:
        condition: slo_validation.success
```

### **Governance and Compliance**
```yaml
# Enforce SLO compliance in all chaos experiments
governance:
  required_probes:
    - type: "sloProbe"
      minimum_threshold: "90.0"
  # Prevent experiments that would violate SLOs
```

## Next Steps

- [**Best Practices**](./best-practices.md) - Advanced probe strategies
- [**Actions**](../actions/index.md) - Automated responses to probe results
- [**Integrations**](../../integrations/index.md) - Platform-specific integrations
- [**Security**](../../security/index.md) - Secure probe configuration

---

*SLO probes ensure your chaos engineering practices align with business reliability requirements. Use them to maintain service level objectives while building system resilience.*
