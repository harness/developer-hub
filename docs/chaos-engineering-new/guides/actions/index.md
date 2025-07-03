---
title: Actions
description: Automate responses and remediation during chaos experiments
sidebar_position: 1
---

# Actions

Actions are automated responses that execute based on probe results, experiment conditions, or predefined triggers during chaos experiments. They enable intelligent automation, self-healing capabilities, and dynamic experiment control to enhance safety and effectiveness.

## What are Actions?

Actions are **automated workflows** that respond to specific conditions during chaos experiments. They bridge the gap between observation (probes) and response (remediation), enabling your chaos experiments to be more intelligent and self-managing.

**Key Capabilities:**
- **Safety Automation**: Automatically stop experiments when safety thresholds are breached
- **Self-Healing**: Trigger remediation workflows when issues are detected
- **Intelligent Alerting**: Send contextual notifications based on experiment state
- **Data Collection**: Gather additional information when specific conditions occur
- **Dynamic Configuration**: Adjust experiment parameters based on real-time conditions
- **Workflow Integration**: Trigger external systems and processes

## Quick Start

### **Basic Safety Action**
```yaml
action:
  - name: "stop-on-high-error-rate"
    type: "conditional"
    trigger:
      probe: "error-rate-monitor"
      condition: "failure"
    response:
      type: "stop_experiment"
      message: "Stopping experiment due to high error rate"
```

### **Notification Action**
```yaml
action:
  - name: "alert-on-slo-violation"
    type: "notification"
    trigger:
      probe: "slo-validation"
      condition: "failure"
    response:
      type: "webhook"
      url: "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
      payload:
        text: "SLO violation detected in chaos experiment: {{ .experiment.name }}"
        channel: "#chaos-engineering"
```

## Action Types

### **Safety Actions**
Automatically protect your systems during experiments:

```yaml
actions:
  # Stop experiment on critical failure
  - name: "emergency-stop"
    type: "safety"
    trigger:
      probe: "critical-service-health"
      condition: "failure"
      consecutive_failures: 3
    response:
      type: "stop_experiment"
      reason: "Critical service failure detected"
      cleanup: true
  
  # Pause experiment for investigation
  - name: "pause-on-anomaly"
    type: "safety"
    trigger:
      probe: "performance-monitor"
      condition: "threshold_exceeded"
      threshold: "response_time > 5s"
    response:
      type: "pause_experiment"
      duration: "10m"
      message: "Pausing for performance investigation"
```

### **Notification Actions**
Keep teams informed about experiment status:

```yaml
actions:
  # Slack notification
  - name: "slack-alert"
    type: "notification"
    trigger:
      event: "experiment_start"
    response:
      type: "slack"
      webhook_url: "${SLACK_WEBHOOK_URL}"
      channel: "#chaos-engineering"
      message: |
        Chaos Experiment Started
        Name: {{ .experiment.name }}
        Target: {{ .experiment.target }}
        Duration: {{ .experiment.duration }}
  
  # Email notification
  - name: "email-summary"
    type: "notification"
    trigger:
      event: "experiment_complete"
    response:
      type: "email"
      recipients: ["team@company.com"]
      subject: "Chaos Experiment Results: {{ .experiment.name }}"
      template: "experiment-summary"
```

### **Remediation Actions**
Automatically fix issues when detected:

```yaml
actions:
  # Scale up replicas on high load
  - name: "auto-scale-on-load"
    type: "remediation"
    trigger:
      probe: "cpu-utilization"
      condition: "threshold_exceeded"
      threshold: "cpu_usage > 80%"
    response:
      type: "kubernetes"
      action: "scale"
      resource: "deployment/web-server"
      replicas: "{{ .current_replicas + 2 }}"
  
  # Restart unhealthy pods
  - name: "restart-unhealthy-pods"
    type: "remediation"
    trigger:
      probe: "pod-health-check"
      condition: "failure"
    response:
      type: "kubernetes"
      action: "delete"
      resource: "pods"
      selector: "app=web-server,health=unhealthy"
```

### **Data Collection Actions**
Gather additional information when needed:

```yaml
actions:
  # Collect logs on failure
  - name: "collect-failure-logs"
    type: "data_collection"
    trigger:
      probe: "service-availability"
      condition: "failure"
    response:
      type: "command"
      command: |
        kubectl logs -n production deployment/api-server --since=5m > /tmp/failure-logs-$(date +%s).log
        aws s3 cp /tmp/failure-logs-*.log s3://chaos-logs/
  
  # Capture metrics snapshot
  - name: "metrics-snapshot"
    type: "data_collection"
    trigger:
      event: "experiment_start"
    response:
      type: "prometheus"
      query: "up{job='kubernetes-pods'}"
      output: "/tmp/baseline-metrics.json"
```

### **Dynamic Configuration Actions**
Adjust experiment parameters in real-time:

```yaml
actions:
  # Reduce chaos intensity on high impact
  - name: "adaptive-intensity"
    type: "configuration"
    trigger:
      probe: "business-impact-monitor"
      condition: "threshold_exceeded"
      threshold: "revenue_impact > 1000"
    response:
      type: "update_experiment"
      parameters:
        chaos_intensity: "{{ .current_intensity * 0.5 }}"
        message: "Reducing intensity due to business impact"
  
  # Extend experiment duration on interesting results
  - name: "extend-on-discovery"
    type: "configuration"
    trigger:
      probe: "anomaly-detector"
      condition: "anomaly_detected"
    response:
      type: "update_experiment"
      parameters:
        duration: "{{ .current_duration + 300 }}"  # Add 5 minutes
```

## Common Use Cases

### **1. Multi-Layer Safety Net**
```yaml
actions:
  # Layer 1: Warning threshold
  - name: "warning-alert"
    type: "notification"
    trigger:
      probe: "error-rate-monitor"
      condition: "threshold_exceeded"
      threshold: "error_rate > 5%"
    response:
      type: "slack"
      message: "Warning: Error rate elevated to {{ .probe.value }}%"
  
  # Layer 2: Critical threshold
  - name: "critical-intervention"
    type: "safety"
    trigger:
      probe: "error-rate-monitor"
      condition: "threshold_exceeded"
      threshold: "error_rate > 10%"
    response:
      type: "stop_experiment"
      reason: "Critical error rate threshold exceeded"
  
  # Layer 3: Emergency stop
  - name: "emergency-stop"
    type: "safety"
    trigger:
      probe: "service-availability"
      condition: "failure"
      consecutive_failures: 2
    response:
      type: "stop_experiment"
      cleanup: true
      reason: "Service completely unavailable"
```

### **2. Intelligent Experiment Orchestration**
```yaml
actions:
  # Start secondary experiment on primary success
  - name: "cascade-experiment"
    type: "orchestration"
    trigger:
      event: "experiment_success"
      experiment: "primary-resilience-test"
    response:
      type: "start_experiment"
      experiment: "secondary-load-test"
      parameters:
        target: "{{ .primary.target }}"
        intensity: "medium"
  
  # Rollback on experiment failure
  - name: "auto-rollback"
    type: "orchestration"
    trigger:
      event: "experiment_failure"
      severity: "high"
    response:
      type: "trigger_pipeline"
      pipeline: "emergency-rollback"
      parameters:
        service: "{{ .experiment.target }}"
        version: "{{ .experiment.baseline_version }}"
```

### **3. Comprehensive Monitoring and Alerting**
```yaml
actions:
  # Real-time dashboard update
  - name: "dashboard-update"
    type: "monitoring"
    trigger:
      event: "probe_result"
      frequency: "every_result"
    response:
      type: "webhook"
      url: "https://dashboard.company.com/api/chaos-status"
      method: "POST"
      payload:
        experiment: "{{ .experiment.name }}"
        probe: "{{ .probe.name }}"
        status: "{{ .probe.status }}"
        timestamp: "{{ .timestamp }}"
  
  # Incident creation on failure
  - name: "create-incident"
    type: "incident_management"
    trigger:
      probe: "critical-service-health"
      condition: "failure"
      duration: "5m"  # Sustained failure
    response:
      type: "pagerduty"
      service_key: "${PAGERDUTY_SERVICE_KEY}"
      incident:
        title: "Chaos Experiment Detected Service Degradation"
        description: "Service {{ .experiment.target }} showing sustained failures"
        severity: "high"
```

### **4. Automated Recovery and Healing**
```yaml
actions:
  # Circuit breaker activation
  - name: "activate-circuit-breaker"
    type: "remediation"
    trigger:
      probe: "downstream-service-health"
      condition: "failure"
      consecutive_failures: 3
    response:
      type: "feature_flag"
      flag: "circuit-breaker-{{ .experiment.target }}"
      value: "enabled"
      duration: "10m"
  
  # Auto-scaling response
  - name: "scale-on-load"
    type: "remediation"
    trigger:
      probe: "resource-utilization"
      condition: "threshold_exceeded"
      threshold: "cpu_usage > 70%"
    response:
      type: "kubernetes"
      action: "scale"
      resource: "deployment/{{ .experiment.target }}"
      min_replicas: 3
      max_replicas: 10
      target_cpu: 60
```

## Action Configuration

### **Trigger Conditions**
```yaml
trigger:
  # Probe-based triggers
  probe: "service-health-check"
  condition: "failure"              # success, failure, timeout
  consecutive_failures: 3          # Number of consecutive failures
  threshold: "response_time > 1s"   # Custom threshold condition
  duration: "5m"                   # Sustained condition duration
  
  # Event-based triggers
  event: "experiment_start"        # experiment_start, experiment_end, probe_result
  frequency: "once"                # once, every_occurrence, rate_limited
  
  # Time-based triggers
  schedule: "*/5 * * * *"          # Cron expression
  delay: "30s"                     # Delay after trigger condition
```

### **Response Types**
```yaml
response:
  # Experiment control
  type: "stop_experiment"
  type: "pause_experiment"
  type: "resume_experiment"
  type: "update_experiment"
  
  # External integrations
  type: "webhook"
  type: "slack"
  type: "email"
  type: "pagerduty"
  
  # Infrastructure actions
  type: "kubernetes"
  type: "aws"
  type: "azure"
  type: "gcp"
  
  # Custom actions
  type: "command"
  type: "script"
  type: "api_call"
```

### **Conditional Logic**
```yaml
action:
  - name: "complex-condition-action"
    type: "conditional"
    trigger:
      conditions:
        - probe: "error-rate"
          condition: "threshold_exceeded"
          threshold: "error_rate > 5%"
        - probe: "response-time"
          condition: "threshold_exceeded"
          threshold: "avg_response_time > 500ms"
      logic: "AND"  # AND, OR, NOT
    response:
      type: "stop_experiment"
```

## Advanced Patterns

### **Action Chaining**
```yaml
actions:
  # Primary action
  - name: "detect-anomaly"
    type: "detection"
    trigger:
      probe: "anomaly-detector"
      condition: "anomaly_detected"
    response:
      type: "trigger_action"
      action: "investigate-anomaly"
  
  # Chained action
  - name: "investigate-anomaly"
    type: "investigation"
    response:
      type: "parallel"
      actions:
        - type: "collect-logs"
        - type: "capture-metrics"
        - type: "notify-team"
```

### **Conditional Action Execution**
```yaml
action:
  - name: "environment-aware-action"
    type: "conditional"
    trigger:
      probe: "service-failure"
      condition: "failure"
    response:
      type: "conditional"
      conditions:
        - if: "{{ .environment == 'production' }}"
          then:
            type: "pagerduty"
            severity: "critical"
        - if: "{{ .environment == 'staging' }}"
          then:
            type: "slack"
            channel: "#staging-alerts"
        - else:
            type: "log"
            level: "info"
```

### **Rate-Limited Actions**
```yaml
action:
  - name: "rate-limited-scaling"
    type: "remediation"
    trigger:
      probe: "high-load"
      condition: "threshold_exceeded"
    response:
      type: "kubernetes"
      action: "scale"
      rate_limit:
        max_executions: 3
        time_window: "10m"
        backoff: "exponential"
```

## Action Monitoring

### **Action Metrics**
```yaml
# Monitor action execution
metrics:
  - name: "action_executions_total"
    type: "counter"
    labels: ["action_name", "trigger_type", "status"]
  
  - name: "action_execution_duration_seconds"
    type: "histogram"
    labels: ["action_name", "response_type"]
  
  - name: "action_success_rate"
    type: "gauge"
    labels: ["action_name"]
```

### **Action Logging**
```yaml
logging:
  level: "info"
  format: "json"
  fields:
    - timestamp
    - experiment_id
    - action_name
    - trigger_condition
    - response_type
    - execution_status
    - duration
    - error_message
```

## Troubleshooting

### **Common Issues**

#### **Action Not Triggering**
```yaml
# Debug trigger conditions
debug:
  trigger_evaluation: true
  log_probe_results: true
  
# Verify probe configuration
probe:
  - name: "debug-probe"
    type: "httpProbe"
    debug: true  # Enable detailed logging
```

#### **Action Execution Failures**
```yaml
# Add error handling
response:
  type: "webhook"
  url: "https://api.example.com/action"
  retry:
    attempts: 3
    backoff: "exponential"
    max_delay: "60s"
  error_handling:
    on_failure: "log_and_continue"  # log_and_continue, stop_experiment, retry
```

#### **Performance Issues**
```yaml
# Optimize action execution
response:
  type: "async"  # Execute asynchronously
  timeout: "30s"
  resource_limits:
    cpu: "100m"
    memory: "128Mi"
```

## Best Practices

### **Design Guidelines**
- **Keep Actions Simple**: Focus on single, clear responsibilities
- **Plan for Failures**: Include error handling and fallback mechanisms
- **Set Appropriate Timeouts**: Prevent actions from hanging experiments
- **Use Descriptive Names**: Make action purposes clear

### **Safety Considerations**
- **Implement Circuit Breakers**: Prevent action storms
- **Monitor Action Performance**: Track execution time and success rates
- **Secure Credentials**: Use proper secret management
- **Test Actions Independently**: Validate action logic before integration

### **Operational Excellence**
- **Monitor Action Effectiveness**: Measure impact on experiment outcomes
- **Iterate and Improve**: Continuously refine action logic
- **Document Action Behavior**: Maintain clear documentation
- **Align with Business Goals**: Ensure actions support business objectives

## Next Steps

- [**Probes**](../probes/index.md) - Learn about probe configuration and best practices
- [**Integrations**](../../integrations/index.md) - Platform-specific integrations
- [**Security**](../../security/index.md) - Secure action configuration
- [**Best Practices**](../probes/best-practices.md) - Advanced strategies

---

*Actions transform your chaos experiments from passive observation to active intelligence. Use them to build self-healing, self-managing systems that respond intelligently to changing conditions.*
