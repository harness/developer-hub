---
title: Action Types & Triggers
description: Comprehensive guide to different action types and trigger mechanisms
sidebar_position: 2
---

# Action Types & Triggers

This guide provides detailed information about different action types, trigger mechanisms, and response patterns available in chaos engineering actions. Learn how to choose the right action type for your specific use case and configure triggers effectively.

## Action Categories

### **Safety Actions**
Protect your systems by automatically responding to dangerous conditions.

#### **Emergency Stop Actions**
```yaml
action:
  - name: "emergency-circuit-breaker"
    type: "safety"
    priority: "critical"
    trigger:
      probe: "service-availability"
      condition: "failure"
      consecutive_failures: 2
    response:
      type: "stop_experiment"
      immediate: true
      cleanup: true
      reason: "Service completely unavailable - emergency stop"
      notifications:
        - type: "pagerduty"
          severity: "critical"
        - type: "slack"
          channel: "#incidents"
```

#### **Graceful Degradation Actions**
```yaml
action:
  - name: "graceful-degradation"
    type: "safety"
    trigger:
      probe: "performance-monitor"
      condition: "threshold_exceeded"
      threshold: "response_time > 2s"
      duration: "2m"
    response:
      type: "feature_flag"
      flag: "enable-fallback-mode"
      value: true
      duration: "10m"
      message: "Enabling fallback mode due to performance degradation"
```

#### **Rate Limiting Actions**
```yaml
action:
  - name: "adaptive-rate-limiting"
    type: "safety"
    trigger:
      probe: "error-rate-monitor"
      condition: "threshold_exceeded"
      threshold: "error_rate > 5%"
    response:
      type: "api_gateway"
      action: "update_rate_limit"
      rate_limit: "{{ .current_rate * 0.7 }}"  # Reduce by 30%
      duration: "5m"
```

### **Notification Actions**
Keep stakeholders informed about experiment status and results.

#### **Real-time Alerts**
```yaml
actions:
  # Slack notifications
  - name: "slack-real-time-updates"
    type: "notification"
    trigger:
      event: "probe_result"
      condition: "any_change"
    response:
      type: "slack"
      webhook_url: "${SLACK_WEBHOOK_URL}"
      channel: "#chaos-monitoring"
      template: |
        📊 **Probe Update**: {{ .probe.name }}
        Status: {{ .probe.status | emoji }}
        Value: {{ .probe.value }}
        Experiment: {{ .experiment.name }}
        Time: {{ .timestamp | format_time }}
  
  # Microsoft Teams notifications
  - name: "teams-critical-alerts"
    type: "notification"
    trigger:
      probe: "critical-service-health"
      condition: "failure"
    response:
      type: "teams"
      webhook_url: "${TEAMS_WEBHOOK_URL}"
      card:
        title: "🚨 Critical Service Alert"
        subtitle: "Chaos experiment detected service failure"
        facts:
          - name: "Service"
            value: "{{ .experiment.target }}"
          - name: "Experiment"
            value: "{{ .experiment.name }}"
          - name: "Duration"
            value: "{{ .failure_duration }}"
```

#### **Email Reporting**
```yaml
action:
  - name: "executive-summary-email"
    type: "notification"
    trigger:
      event: "experiment_complete"
    response:
      type: "email"
      smtp_server: "smtp.company.com"
      recipients: 
        - "executives@company.com"
        - "sre-team@company.com"
      subject: "Chaos Engineering Weekly Summary - {{ .week }}"
      template: "executive-summary"
      attachments:
        - "experiment-results.pdf"
        - "resilience-metrics.csv"
```

#### **Custom Webhook Notifications**
```yaml
action:
  - name: "custom-dashboard-update"
    type: "notification"
    trigger:
      event: "experiment_start"
    response:
      type: "webhook"
      url: "https://dashboard.company.com/api/chaos/events"
      method: "POST"
      headers:
        Authorization: "Bearer ${DASHBOARD_API_TOKEN}"
        Content-Type: "application/json"
      payload:
        event_type: "experiment_started"
        experiment_id: "{{ .experiment.id }}"
        target_service: "{{ .experiment.target }}"
        estimated_duration: "{{ .experiment.duration }}"
        risk_level: "{{ .experiment.risk_level }}"
```

### **Remediation Actions**
Automatically fix issues when they're detected.

#### **Auto-Scaling Actions**
```yaml
actions:
  # Horizontal Pod Autoscaling
  - name: "hpa-response"
    type: "remediation"
    trigger:
      probe: "cpu-utilization"
      condition: "threshold_exceeded"
      threshold: "cpu_usage > 70%"
      duration: "3m"
    response:
      type: "kubernetes"
      action: "scale"
      resource: "deployment/{{ .experiment.target }}"
      scaling:
        min_replicas: 2
        max_replicas: 10
        target_cpu_percent: 60
        scale_up_stabilization: "60s"
        scale_down_stabilization: "300s"
  
  # Vertical Pod Autoscaling
  - name: "vpa-response"
    type: "remediation"
    trigger:
      probe: "memory-pressure"
      condition: "threshold_exceeded"
      threshold: "memory_usage > 80%"
    response:
      type: "kubernetes"
      action: "update_resources"
      resource: "deployment/{{ .experiment.target }}"
      resources:
        requests:
          memory: "{{ .current_memory * 1.5 }}"
        limits:
          memory: "{{ .current_memory * 2 }}"
```

#### **Service Mesh Actions**
```yaml
actions:
  # Istio traffic shifting
  - name: "traffic-shift-remediation"
    type: "remediation"
    trigger:
      probe: "service-error-rate"
      condition: "threshold_exceeded"
      threshold: "error_rate > 10%"
    response:
      type: "istio"
      action: "traffic_shift"
      virtual_service: "{{ .experiment.target }}-vs"
      destinations:
        - subset: "v1"
          weight: 100
        - subset: "v2"
          weight: 0
      timeout: "30s"
  
  # Circuit breaker configuration
  - name: "circuit-breaker-activation"
    type: "remediation"
    trigger:
      probe: "downstream-service-health"
      condition: "failure"
      consecutive_failures: 5
    response:
      type: "istio"
      action: "destination_rule"
      resource: "{{ .experiment.target }}-dr"
      circuit_breaker:
        consecutive_errors: 3
        interval: "30s"
        base_ejection_time: "30s"
        max_ejection_percent: 50
```

#### **Database Actions**
```yaml
actions:
  # Connection pool adjustment
  - name: "db-connection-pool-tuning"
    type: "remediation"
    trigger:
      probe: "db-connection-pool-usage"
      condition: "threshold_exceeded"
      threshold: "pool_usage > 90%"
    response:
      type: "database"
      action: "update_connection_pool"
      database: "{{ .experiment.target }}"
      pool_size: "{{ .current_pool_size * 1.5 }}"
      max_pool_size: 100
  
  # Read replica failover
  - name: "read-replica-failover"
    type: "remediation"
    trigger:
      probe: "primary-db-health"
      condition: "failure"
      duration: "30s"
    response:
      type: "database"
      action: "promote_replica"
      replica: "{{ .experiment.target }}-replica-1"
      update_dns: true
      notification: true
```

### **Data Collection Actions**
Gather additional information for analysis and debugging.

#### **Log Collection Actions**
```yaml
actions:
  # Centralized log collection
  - name: "failure-log-collection"
    type: "data_collection"
    trigger:
      probe: "service-health"
      condition: "failure"
    response:
      type: "log_collection"
      sources:
        - type: "kubernetes"
          resource: "pods"
          selector: "app={{ .experiment.target }}"
          since: "10m"
        - type: "file"
          path: "/var/log/application.log"
          lines: 1000
      destination:
        type: "s3"
        bucket: "chaos-logs"
        prefix: "failures/{{ .experiment.id }}/{{ .timestamp }}"
  
  # Distributed tracing collection
  - name: "trace-collection"
    type: "data_collection"
    trigger:
      probe: "latency-spike"
      condition: "threshold_exceeded"
      threshold: "p95_latency > 1s"
    response:
      type: "jaeger"
      action: "collect_traces"
      service: "{{ .experiment.target }}"
      time_range: "5m"
      operation: "{{ .slow_operation }}"
      export_format: "json"
```

#### **Metrics Snapshot Actions**
```yaml
actions:
  # Prometheus metrics snapshot
  - name: "metrics-baseline-capture"
    type: "data_collection"
    trigger:
      event: "experiment_start"
    response:
      type: "prometheus"
      action: "query_range"
      queries:
        - name: "cpu_usage"
          query: "avg(cpu_usage_percent{service='{{ .experiment.target }}'})"
        - name: "memory_usage"
          query: "avg(memory_usage_percent{service='{{ .experiment.target }}'})"
        - name: "request_rate"
          query: "sum(rate(http_requests_total{service='{{ .experiment.target }}'}[5m]))"
      time_range: "1h"
      step: "1m"
      output: "/tmp/baseline-metrics-{{ .experiment.id }}.json"
  
  # Custom metrics collection
  - name: "business-metrics-snapshot"
    type: "data_collection"
    trigger:
      event: "experiment_complete"
    response:
      type: "custom_metrics"
      collector: "business-metrics-collector"
      metrics:
        - "orders_per_minute"
        - "revenue_per_minute"
        - "user_satisfaction_score"
        - "conversion_rate"
      time_range: "{{ .experiment.duration }}"
```

### **Configuration Actions**
Dynamically adjust experiment parameters and system configuration.

#### **Experiment Parameter Adjustment**
```yaml
actions:
  # Adaptive chaos intensity
  - name: "adaptive-chaos-intensity"
    type: "configuration"
    trigger:
      probe: "business-impact-monitor"
      condition: "threshold_exceeded"
      threshold: "revenue_impact > 500"
    response:
      type: "update_experiment"
      parameters:
        chaos_percentage: "{{ max(.current_percentage * 0.5, 10) }}"
        fault_duration: "{{ .current_duration * 0.8 }}"
      message: "Reducing chaos intensity due to business impact"
  
  # Dynamic target adjustment
  - name: "expand-chaos-scope"
    type: "configuration"
    trigger:
      probe: "resilience-validation"
      condition: "success"
      consecutive_successes: 5
    response:
      type: "update_experiment"
      parameters:
        target_replicas: "{{ .current_targets + 1 }}"
        chaos_percentage: "{{ min(.current_percentage * 1.2, 50) }}"
      message: "Expanding chaos scope due to good resilience"
```

#### **Feature Flag Management**
```yaml
actions:
  # Feature flag toggle
  - name: "feature-flag-safety-toggle"
    type: "configuration"
    trigger:
      probe: "new-feature-performance"
      condition: "threshold_exceeded"
      threshold: "error_rate > 2%"
    response:
      type: "feature_flag"
      provider: "launchdarkly"
      flag: "new-checkout-flow"
      value: false
      environment: "{{ .experiment.environment }}"
      reason: "Disabling due to high error rate during chaos test"
  
  # Gradual rollout adjustment
  - name: "rollout-percentage-adjustment"
    type: "configuration"
    trigger:
      probe: "canary-health"
      condition: "success"
      duration: "10m"
    response:
      type: "feature_flag"
      flag: "canary-deployment"
      value: "{{ min(.current_percentage + 10, 100) }}"
      gradual: true
      step_duration: "5m"
```

## Trigger Mechanisms

### **Probe-Based Triggers**
React to probe results and conditions:

```yaml
trigger:
  # Simple probe condition
  probe: "service-health"
  condition: "failure"
  
  # Complex probe conditions
  probe: "response-time"
  condition: "threshold_exceeded"
  threshold: "avg_response_time > 500ms"
  consecutive_occurrences: 3
  duration: "2m"
  
  # Multiple probe conditions
  probes:
    - name: "cpu-usage"
      condition: "threshold_exceeded"
      threshold: "cpu > 80%"
    - name: "memory-usage"
      condition: "threshold_exceeded"
      threshold: "memory > 90%"
  logic: "AND"  # AND, OR, NOT
```

### **Event-Based Triggers**
Respond to experiment lifecycle events:

```yaml
trigger:
  # Experiment lifecycle events
  event: "experiment_start"     # experiment_start, experiment_end, experiment_pause
  event: "probe_result"         # Any probe result
  event: "fault_injection"      # When fault is injected
  event: "fault_recovery"       # When fault is recovered
  
  # Custom events
  event: "custom_event"
  event_data:
    source: "external_monitor"
    severity: "high"
    
  # Event filtering
  event: "probe_result"
  filters:
    probe_name: "critical-*"    # Wildcard matching
    status: "failure"
    severity: ["high", "critical"]
```

### **Time-Based Triggers**
Execute actions on schedules or delays:

```yaml
trigger:
  # Scheduled execution
  schedule: "0 */6 * * *"       # Every 6 hours
  schedule: "@hourly"           # Predefined schedules
  
  # Delayed execution
  delay: "5m"                   # 5 minutes after experiment start
  delay_from: "experiment_start"
  
  # Periodic execution
  interval: "30s"               # Every 30 seconds
  max_executions: 10            # Limit total executions
```

### **Threshold-Based Triggers**
React when metrics cross defined thresholds:

```yaml
trigger:
  # Simple threshold
  probe: "cpu-usage"
  threshold: "cpu_percent > 80"
  
  # Complex threshold with multiple conditions
  probe: "performance-metrics"
  threshold: |
    (response_time > 1000 AND error_rate > 5) OR
    (cpu_usage > 90 OR memory_usage > 95)
  
  # Threshold with hysteresis
  probe: "load-average"
  threshold:
    upper: "load > 5.0"         # Trigger when load > 5.0
    lower: "load < 3.0"         # Reset when load < 3.0
    hysteresis: true
```

### **Composite Triggers**
Combine multiple trigger conditions:

```yaml
trigger:
  type: "composite"
  conditions:
    - type: "probe"
      probe: "service-health"
      condition: "failure"
    - type: "time"
      duration: "5m"              # Must persist for 5 minutes
    - type: "event"
      event: "business_hours"     # Only during business hours
  logic: "ALL"                    # ALL, ANY, MAJORITY
```

## Response Patterns

### **Immediate Response**
Execute actions immediately when triggered:

```yaml
response:
  type: "immediate"
  action: "stop_experiment"
  timeout: "30s"
  retry_on_failure: false
```

### **Delayed Response**
Wait before executing the action:

```yaml
response:
  type: "delayed"
  delay: "2m"
  action: "scale_service"
  parameters:
    replicas: 5
  cancellable: true  # Can be cancelled if conditions change
```

### **Conditional Response**
Execute different actions based on conditions:

```yaml
response:
  type: "conditional"
  conditions:
    - if: "{{ .environment == 'production' }}"
      then:
        type: "pagerduty"
        severity: "critical"
    - if: "{{ .experiment.risk_level == 'high' }}"
      then:
        type: "stop_experiment"
        immediate: true
    - else:
        type: "slack"
        channel: "#chaos-engineering"
```

### **Parallel Response**
Execute multiple actions simultaneously:

```yaml
response:
  type: "parallel"
  actions:
    - type: "notification"
      target: "slack"
    - type: "data_collection"
      target: "logs"
    - type: "remediation"
      target: "auto_scale"
  wait_for_all: false  # Don't wait for all to complete
  timeout: "60s"
```

### **Sequential Response**
Execute actions in sequence:

```yaml
response:
  type: "sequential"
  actions:
    - type: "pause_experiment"
      duration: "30s"
    - type: "collect_diagnostics"
      timeout: "60s"
    - type: "resume_experiment"
      condition: "diagnostics_clean"
  stop_on_failure: true
```

## Advanced Trigger Patterns

### **Sliding Window Triggers**
```yaml
trigger:
  probe: "error-rate"
  condition: "threshold_exceeded"
  threshold: "error_rate > 5%"
  window:
    type: "sliding"
    duration: "10m"
    evaluation_interval: "1m"
    min_data_points: 5
```

### **Rate-Limited Triggers**
```yaml
trigger:
  probe: "service-failure"
  condition: "failure"
  rate_limit:
    max_triggers: 3
    time_window: "1h"
    backoff: "exponential"
    max_backoff: "30m"
```

### **Correlation-Based Triggers**
```yaml
trigger:
  type: "correlation"
  primary_probe: "service-a-health"
  secondary_probe: "service-b-health"
  correlation:
    type: "both_failing"
    time_window: "5m"
    confidence: 0.8
```

## Next Steps

- [**Configuration Examples**](./configuration.md) - Detailed configuration examples
- [**Integration Patterns**](./integrations.md) - Platform-specific integrations
- [**Best Practices**](./best-practices.md) - Action design best practices
- [**Troubleshooting**](./troubleshooting.md) - Common issues and solutions

---

*Understanding action types and triggers is crucial for building effective automated responses in your chaos experiments. Choose the right patterns for your specific use cases and requirements.*
