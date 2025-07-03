---
title: APM Probes
description: Integrate with Application Performance Monitoring tools for comprehensive validation
sidebar_position: 7
---

# APM Probes

APM (Application Performance Monitoring) probes integrate with popular monitoring and observability platforms to validate application performance, user experience, and business metrics during chaos experiments. They provide deep insights into how failures impact real user experience and business operations.

## What are APM Probes?

APM probes connect with external monitoring platforms to query metrics, run synthetic tests, and validate application performance during chaos experiments. They extend your validation capabilities beyond basic infrastructure monitoring.

**Supported Platforms:**
- **Datadog**: Metrics, synthetics, and APM data
- **Dynatrace**: Application performance and user experience
- **New Relic**: Application monitoring and synthetic tests
- **AppDynamics**: Business transaction monitoring
- **Splunk**: Log analysis and metrics
- **Custom APM**: Via HTTP/API integrations

## Datadog Probes

### **Metrics Validation**
```yaml
probe:
  - name: "datadog-response-time"
    type: "datadogProbe"
    mode: "Continuous"
    runProperties:
      probeTimeout: "30s"
      interval: "60s"
    datadogProbe/inputs:
      site: "datadoghq.com"
      query: "avg:http.response_time{service:user-api}"
      queryType: "metrics"
      evaluationWindow: "5m"
      comparator:
        type: "float"
        criteria: "<"
        value: "0.5"  # Response time < 500ms
      datadogCredentialsSecretName: "datadog-secret"
```

### **Synthetic Test Monitoring**
```yaml
probe:
  - name: "datadog-synthetic-test"
    type: "datadogProbe"
    mode: "EOT"  # Only EOT mode supported for synthetics
    datadogProbe/inputs:
      site: "datadoghq.com"
      syntheticsTestId: "abc-123-def"
      queryType: "synthetics"
      comparator:
        type: "string"
        criteria: "equal"
        value: "passed"
      datadogCredentialsSecretName: "datadog-secret"
```

### **Business Metrics**
```yaml
probe:
  - name: "datadog-business-metrics"
    type: "datadogProbe"
    mode: "OnChaos"
    datadogProbe/inputs:
      site: "datadoghq.com"
      query: "sum:orders.completed{env:production}.as_rate()"
      queryType: "metrics"
      evaluationWindow: "10m"
      comparator:
        type: "float"
        criteria: ">"
        value: "100"  # > 100 orders per second
      datadogCredentialsSecretName: "datadog-secret"
```

## Dynatrace Probes

### **Application Performance**
```yaml
probe:
  - name: "dynatrace-response-time"
    type: "dynatraceProbe"
    mode: "Continuous"
    dynatraceProbe/inputs:
      endpoint: "https://abc123.live.dynatrace.com"
      entitySelector: "type(SERVICE),tag(environment:production)"
      metricSelector: "builtin:service.response.time"
      resolution: "5m"
      comparator:
        type: "float"
        criteria: "<"
        value: "500"  # < 500ms
      dynatraceCredentialsSecretName: "dynatrace-secret"
```

### **User Experience Monitoring**
```yaml
probe:
  - name: "dynatrace-user-experience"
    type: "dynatraceProbe"
    mode: "OnChaos"
    dynatraceProbe/inputs:
      endpoint: "https://abc123.live.dynatrace.com"
      entitySelector: "type(APPLICATION)"
      metricSelector: "builtin:apps.web.userActionDuration.load"
      resolution: "5m"
      comparator:
        type: "float"
        criteria: "<"
        value: "2000"  # Page load < 2s
      dynatraceCredentialsSecretName: "dynatrace-secret"
```

## New Relic Probes

### **Application Metrics**
```yaml
probe:
  - name: "newrelic-apdex-score"
    type: "httpProbe"  # Using HTTP probe for New Relic API
    mode: "Continuous"
    httpProbe/inputs:
      url: "https://api.newrelic.com/v2/applications/12345/metrics/data.json"
      method: "GET"
      headers:
        X-Api-Key: "${NEW_RELIC_API_KEY}"
      criteria: "=="
      responseCode: "200"
      # Additional validation can be done on response body
```

### **Synthetic Monitoring**
```yaml
probe:
  - name: "newrelic-synthetic-check"
    type: "cmdProbe"  # Using command probe for New Relic CLI
    mode: "EOT"
    cmdProbe/inputs:
      command: |
        curl -H "Api-Key: $NEW_RELIC_API_KEY" \
        "https://synthetics-api.newrelic.com/synthetics/api/v3/monitors/12345/script" \
        | jq -r '.status'
      source: "inline"
      comparator:
        type: "string"
        criteria: "equal"
        value: "SUCCESS"
```

## AppDynamics Probes

### **Business Transaction Monitoring**
```yaml
probe:
  - name: "appdynamics-transaction-time"
    type: "httpProbe"
    mode: "Continuous"
    httpProbe/inputs:
      url: "https://mycompany.saas.appdynamics.com/controller/rest/applications/MyApp/metric-data"
      method: "GET"
      headers:
        Authorization: "Bearer ${APPDYNAMICS_TOKEN}"
      criteria: "=="
      responseCode: "200"
      # Query specific business transaction metrics
```

### **Error Rate Monitoring**
```yaml
probe:
  - name: "appdynamics-error-rate"
    type: "cmdProbe"
    mode: "OnChaos"
    cmdProbe/inputs:
      command: |
        curl -H "Authorization: Bearer $APPDYNAMICS_TOKEN" \
        "https://mycompany.saas.appdynamics.com/controller/rest/applications/MyApp/problems/healthrule-violations" \
        | jq '.[] | select(.severity=="CRITICAL") | length'
      source: "inline"
      comparator:
        type: "int"
        criteria: "equal"
        value: "0"  # No critical violations
```

## Splunk Probes

### **Log Analysis**
```yaml
probe:
  - name: "splunk-error-analysis"
    type: "cmdProbe"
    mode: "OnChaos"
    cmdProbe/inputs:
      command: |
        curl -k -u admin:password \
        "https://splunk.example.com:8089/services/search/jobs/export" \
        -d 'search=search index=app_logs ERROR | stats count' \
        -d 'output_mode=json' | jq -r '.result.count'
      source: "inline"
      comparator:
        type: "int"
        criteria: "<"
        value: "10"  # Less than 10 errors
```

### **Performance Metrics**
```yaml
probe:
  - name: "splunk-performance-check"
    type: "httpProbe"
    mode: "Continuous"
    httpProbe/inputs:
      url: "https://splunk.example.com:8089/services/search/jobs/export"
      method: "POST"
      headers:
        Authorization: "Basic ${SPLUNK_CREDENTIALS}"
      body: "search=index=metrics sourcetype=performance | stats avg(response_time)"
      criteria: "=="
      responseCode: "200"
```

## Common Use Cases

### **1. End-to-End User Experience**
```yaml
probes:
  # Datadog synthetic test
  - name: "user-journey-test"
    type: "datadogProbe"
    mode: "EOT"
    datadogProbe/inputs:
      site: "datadoghq.com"
      syntheticsTestId: "user-login-journey"
      queryType: "synthetics"
      comparator:
        type: "string"
        criteria: "equal"
        value: "passed"
      datadogCredentialsSecretName: "datadog-secret"
  
  # Dynatrace user experience
  - name: "real-user-monitoring"
    type: "dynatraceProbe"
    mode: "Continuous"
    dynatraceProbe/inputs:
      endpoint: "https://abc123.live.dynatrace.com"
      entitySelector: "type(APPLICATION)"
      metricSelector: "builtin:apps.web.userActionDuration.load"
      comparator:
        type: "float"
        criteria: "<"
        value: "3000"  # Page load < 3s
```

### **2. Business Impact Assessment**
```yaml
probes:
  # Revenue tracking
  - name: "revenue-impact"
    type: "datadogProbe"
    mode: "OnChaos"
    datadogProbe/inputs:
      site: "datadoghq.com"
      query: "sum:revenue.dollars{env:production}.as_rate()"
      queryType: "metrics"
      evaluationWindow: "5m"
      comparator:
        type: "float"
        criteria: ">"
        value: "1000"  # > $1000/min
  
  # Transaction success rate
  - name: "transaction-success"
    type: "dynatraceProbe"
    mode: "Continuous"
    dynatraceProbe/inputs:
      entitySelector: "type(SERVICE),tag(business-critical)"
      metricSelector: "builtin:service.successRate"
      comparator:
        type: "float"
        criteria: ">"
        value: "95"  # > 95% success rate
```

### **3. Application Performance Validation**
```yaml
probes:
  # Database performance
  - name: "database-performance"
    type: "datadogProbe"
    mode: "Continuous"
    datadogProbe/inputs:
      query: "avg:postgresql.database.query_time{env:production}"
      queryType: "metrics"
      evaluationWindow: "5m"
      comparator:
        type: "float"
        criteria: "<"
        value: "0.1"  # < 100ms query time
  
  # Cache hit rate
  - name: "cache-hit-rate"
    type: "datadogProbe"
    mode: "OnChaos"
    datadogProbe/inputs:
      query: "avg:redis.info.keyspace_hits/(redis.info.keyspace_hits+redis.info.keyspace_misses)*100"
      queryType: "metrics"
      evaluationWindow: "5m"
      comparator:
        type: "float"
        criteria: ">"
        value: "90"  # > 90% cache hit rate
```

## Authentication Setup

### **Datadog Credentials**
```yaml
# Kubernetes Secret
apiVersion: v1
kind: Secret
metadata:
  name: datadog-secret
type: Opaque
stringData:
  DD_API_KEY: "your-datadog-api-key"
  DD_APP_KEY: "your-datadog-app-key"
```

### **Dynatrace Credentials**
```yaml
# Kubernetes Secret
apiVersion: v1
kind: Secret
metadata:
  name: dynatrace-secret
type: Opaque
stringData:
  DT_API_TOKEN: "your-dynatrace-api-token"
```

### **New Relic Credentials**
```yaml
# Environment variable or secret
NEW_RELIC_API_KEY: "your-newrelic-api-key"
NEW_RELIC_LICENSE_KEY: "your-newrelic-license-key"
```

## Best Practices

### **Query Optimization**
- **Use Efficient Queries**: Optimize for performance and cost
- **Limit Time Windows**: Use appropriate evaluation windows
- **Filter Data**: Use tags and filters to reduce data volume
- **Cache Results**: Avoid redundant API calls

### **Monitoring Strategy**
- **Focus on User Impact**: Monitor what affects users most
- **Layer Your Monitoring**: Infrastructure → Application → Business
- **Validate Critical Paths**: Test key user journeys
- **Track Business Metrics**: Monitor revenue, conversions, etc.

### **Cost Management**
- **Monitor API Usage**: Track API call costs
- **Optimize Polling Intervals**: Balance accuracy with cost
- **Use Efficient Queries**: Minimize data transfer
- **Cache Expensive Queries**: Avoid repeated expensive operations

## Troubleshooting

### **Common Issues**

#### **Authentication Failures**
```yaml
# Verify credentials are correct and have proper permissions
datadogCredentialsSecretName: "datadog-secret"  # Ensure secret exists
```

#### **Query Syntax Errors**
```yaml
# Test queries in the respective platform's UI first
query: "avg:http.response_time{service:api}"  # Verify metric names
```

#### **Rate Limiting**
```yaml
# Increase intervals to avoid API rate limits
runProperties:
  interval: "60s"  # Increase polling interval
```

#### **Data Availability**
```yaml
# Ensure metrics exist in the specified time window
evaluationWindow: "10m"  # Increase window if data is sparse
```

## Next Steps

- [**SLO Probes**](./slo-probe.md) - Service level objective validation
- [**Best Practices**](./best-practices.md) - Advanced probe strategies
- [**Actions**](../actions/index.md) - Automated responses to probe results
- [**Integrations**](../../integrations/index.md) - Platform-specific integrations

---

*APM probes provide comprehensive application performance validation during chaos experiments. Use them to ensure your monitoring stack and user experience remain intact during failures.*
