---
title: Probes & Actions
description: Monitor system health and automate responses during chaos experiments
sidebar_position: 4
---

# Probes & Actions

Probes and actions are essential components of chaos experiments that enable you to monitor system health and automate responses during failure injection. They provide the observability and control mechanisms needed for safe and effective chaos engineering.

## What are Probes?

Probes are monitoring mechanisms that continuously check system health during chaos experiments:
- **Health checks**: Verify that critical services remain functional
- **Performance monitoring**: Track response times, throughput, and resource usage
- **Business metrics**: Monitor user experience and business impact
- **Safety validation**: Ensure experiments don't cause excessive damage

## What are Actions?

Actions are automated responses triggered by probe results or experiment conditions:
- **Rollback triggers**: Automatically stop experiments when thresholds are breached
- **Remediation steps**: Execute corrective actions during failures
- **Notification systems**: Alert teams about experiment status and results
- **Data collection**: Gather additional information for analysis

## Types of Probes

### HTTP Probes
Monitor web services and APIs:

```yaml
# Basic HTTP health check
http_probe:
  name: "api-health-check"
  url: "https://api.example.com/health"
  method: "GET"
  expected_status: 200
  timeout: "5s"
  interval: "10s"
  
# Advanced HTTP probe with validation
http_probe:
  name: "user-service-probe"
  url: "https://api.example.com/users/123"
  method: "GET"
  headers:
    Authorization: "Bearer ${API_TOKEN}"
  expected_status: 200
  response_validation:
    json_path: "$.user.status"
    expected_value: "active"
  timeout: "3s"
  interval: "15s"
```

### Command Probes
Execute system commands to check health:

```yaml
# Database connection check
command_probe:
  name: "database-connection"
  command: "pg_isready"
  args: ["-h", "localhost", "-p", "5432", "-U", "app_user"]
  expected_exit_code: 0
  timeout: "10s"
  interval: "30s"
  
# Custom application health check
command_probe:
  name: "app-health-script"
  command: "/opt/app/health-check.sh"
  expected_output_contains: "HEALTHY"
  timeout: "15s"
  interval: "20s"
```

### Kubernetes Probes
Monitor Kubernetes resources:

```yaml
# Pod readiness check
k8s_probe:
  name: "pod-readiness"
  resource_type: "pod"
  namespace: "production"
  label_selector: "app=web-service"
  field_selector: "status.phase=Running"
  expected_count: ">= 2"
  interval: "10s"
  
# Service endpoint availability
k8s_probe:
  name: "service-endpoints"
  resource_type: "endpoints"
  namespace: "production"
  resource_name: "web-service"
  expected_ready_addresses: ">= 1"
  interval: "15s"
```

### Prometheus Probes
Query metrics from Prometheus:

```yaml
# Response time monitoring
prometheus_probe:
  name: "response-time-check"
  endpoint: "http://prometheus:9090"
  query: "histogram_quantile(0.95, http_request_duration_seconds_bucket)"
  expected_value: "< 0.5"  # Less than 500ms
  interval: "30s"
  
# Error rate monitoring
prometheus_probe:
  name: "error-rate-check"
  endpoint: "http://prometheus:9090"
  query: "rate(http_requests_total{status=~'5..'}[5m])"
  expected_value: "< 0.01"  # Less than 1% error rate
  interval: "60s"
```

### Custom Probes
Create application-specific health checks:

```yaml
# Business metric probe
custom_probe:
  name: "order-processing-rate"
  type: "business-metric"
  endpoint: "https://metrics.example.com/orders/rate"
  authentication:
    type: "api-key"
    key: "${METRICS_API_KEY}"
  expected_value: "> 100"  # More than 100 orders per minute
  interval: "60s"
  
# User experience probe
custom_probe:
  name: "user-login-success"
  type: "synthetic-transaction"
  script: "/scripts/login-test.js"
  expected_result: "success"
  timeout: "30s"
  interval: "120s"
```

## Types of Actions

### Rollback Actions
Automatically stop experiments when conditions are met:

```yaml
# Automatic experiment termination
rollback_action:
  name: "emergency-stop"
  trigger:
    probe: "error-rate-check"
    condition: "probe_failed"
    consecutive_failures: 3
  action:
    type: "stop-experiment"
    reason: "Error rate exceeded threshold"
    
# Gradual rollback with notification
rollback_action:
  name: "graceful-rollback"
  trigger:
    probe: "response-time-check"
    condition: "value > 1.0"  # Response time > 1 second
  action:
    type: "gradual-stop"
    steps:
      - notify_team: "Response time degraded"
      - reduce_blast_radius: "50%"
      - wait: "60s"
      - stop_experiment: "Performance impact too high"
```

### Notification Actions
Alert teams about experiment status:

```yaml
# Slack notification
notification_action:
  name: "slack-alert"
  trigger:
    probe: "api-health-check"
    condition: "probe_failed"
  action:
    type: "slack"
    webhook_url: "${SLACK_WEBHOOK_URL}"
    message: "🚨 Chaos experiment affecting API health"
    channel: "#chaos-engineering"
    
# Email notification
notification_action:
  name: "email-alert"
  trigger:
    experiment_status: "failed"
  action:
    type: "email"
    recipients: ["team@example.com"]
    subject: "Chaos Experiment Failed: ${EXPERIMENT_NAME}"
    template: "experiment-failure-template"
```

### Remediation Actions
Execute corrective measures during experiments:

```yaml
# Auto-scaling trigger
remediation_action:
  name: "scale-up-service"
  trigger:
    probe: "response-time-check"
    condition: "value > 0.8"  # Response time > 800ms
  action:
    type: "kubernetes-scale"
    resource: "deployment/web-service"
    namespace: "production"
    replicas: "+2"  # Add 2 more replicas
    
# Circuit breaker activation
remediation_action:
  name: "enable-circuit-breaker"
  trigger:
    probe: "database-connection"
    condition: "probe_failed"
  action:
    type: "feature-flag"
    flag_name: "database-circuit-breaker"
    value: "enabled"
    provider: "launchdarkly"
```

### Data Collection Actions
Gather additional information during experiments:

```yaml
# Log collection
data_collection_action:
  name: "collect-logs"
  trigger:
    experiment_phase: "fault-injection-start"
  action:
    type: "log-collection"
    sources: ["application-logs", "system-logs"]
    duration: "experiment-duration + 5m"
    storage: "s3://chaos-logs/${EXPERIMENT_ID}/"
    
# Metrics snapshot
data_collection_action:
  name: "metrics-snapshot"
  trigger:
    probe: "any-probe-failed"
  action:
    type: "metrics-export"
    source: "prometheus"
    query_range: "5m"
    format: "json"
    destination: "experiment-artifacts"
```

## Probe Configuration Best Practices

### Timing and Intervals
- **Baseline period**: Run probes before experiment starts
- **Appropriate intervals**: Balance monitoring frequency with system load
- **Timeout settings**: Set realistic timeouts for probe execution
- **Grace periods**: Allow time for systems to stabilize

```yaml
probe_timing:
  baseline_duration: "2m"      # Monitor before experiment
  probe_interval: "15s"        # Check every 15 seconds
  probe_timeout: "10s"         # Timeout individual probes
  failure_threshold: 3         # Require 3 consecutive failures
  success_threshold: 2         # Require 2 consecutive successes
```

### Threshold Setting
- **Realistic thresholds**: Based on normal system behavior
- **Buffer zones**: Account for normal variation
- **Business impact**: Align with business requirements
- **Gradual degradation**: Use multiple threshold levels

```yaml
threshold_examples:
  response_time:
    warning: "500ms"    # Yellow alert
    critical: "1000ms"  # Red alert, consider rollback
    
  error_rate:
    warning: "1%"       # Acceptable degradation
    critical: "5%"      # Unacceptable impact
    
  availability:
    warning: "99%"      # Minor impact
    critical: "95%"     # Major impact
```

### Probe Reliability
- **Probe redundancy**: Use multiple probes for critical checks
- **Probe isolation**: Ensure probes don't interfere with experiments
- **Probe validation**: Test probes independently
- **Fallback mechanisms**: Handle probe failures gracefully

## Action Configuration Best Practices

### Rollback Strategies
- **Conservative thresholds**: Err on the side of safety
- **Gradual rollback**: Reduce impact before stopping completely
- **Manual override**: Always allow manual intervention
- **Clear communication**: Explain why rollback occurred

```yaml
rollback_strategy:
  levels:
    - threshold: "warning"
      action: "reduce_blast_radius"
      reduction: "50%"
      
    - threshold: "critical"
      action: "stop_experiment"
      delay: "30s"  # Allow time for manual override
      
  manual_override:
    enabled: true
    timeout: "60s"  # Time to respond to override prompt
```

### Notification Management
- **Appropriate urgency**: Match notification urgency to impact
- **Avoid spam**: Use rate limiting and grouping
- **Clear context**: Include relevant experiment information
- **Escalation paths**: Define when to escalate to management

```yaml
notification_management:
  rate_limiting:
    max_notifications: 5
    time_window: "10m"
    
  escalation:
    - level: "team"
      delay: "0m"
      channels: ["slack", "email"]
      
    - level: "management"
      delay: "15m"
      condition: "experiment_still_failing"
      channels: ["phone", "email"]
```

## Monitoring Experiment Health

### Real-Time Dashboards
Create dashboards to monitor experiment progress:
- **Probe status**: Visual indicators of probe health
- **System metrics**: Key performance indicators
- **Experiment timeline**: Progress through experiment phases
- **Action history**: Log of automated actions taken

### Alerting Integration
Integrate with existing alerting systems:
- **PagerDuty**: For critical experiment failures
- **Slack/Teams**: For team notifications
- **Email**: For detailed reports and summaries
- **SMS**: For urgent escalations

### Historical Analysis
Track probe and action effectiveness over time:
- **Probe reliability**: How often probes correctly identify issues
- **Action effectiveness**: Whether actions successfully mitigate problems
- **False positive rates**: Unnecessary rollbacks or alerts
- **Response times**: How quickly issues are detected and resolved

## Advanced Probe Patterns

### Composite Probes
Combine multiple checks into single probe:

```yaml
composite_probe:
  name: "service-health-composite"
  logic: "AND"  # All sub-probes must pass
  probes:
    - name: "http-health"
      type: "http"
      url: "https://api.example.com/health"
      
    - name: "database-connection"
      type: "command"
      command: "pg_isready -h db.example.com"
      
    - name: "cache-availability"
      type: "redis"
      host: "redis.example.com"
      command: "ping"
```

### Conditional Probes
Run probes based on experiment conditions:

```yaml
conditional_probe:
  name: "failover-validation"
  condition: "fault_type == 'database-failure'"
  probe:
    type: "http"
    url: "https://api.example.com/db-health"
    expected_response: "using_secondary_db"
```

### Synthetic Transaction Probes
Test complete user workflows:

```yaml
synthetic_probe:
  name: "user-journey-test"
  type: "synthetic-transaction"
  steps:
    - action: "login"
      url: "https://app.example.com/login"
      credentials: "${TEST_USER_CREDS}"
      
    - action: "navigate"
      url: "https://app.example.com/dashboard"
      expected_element: "#user-dashboard"
      
    - action: "api-call"
      url: "https://api.example.com/user/profile"
      expected_status: 200
      
  success_criteria: "all_steps_completed"
  timeout: "60s"
```

## Getting Started

### Basic Setup
1. **Identify critical metrics**: Determine what to monitor during experiments
2. **Start with simple probes**: Begin with HTTP and command probes
3. **Set conservative thresholds**: Use safe limits initially
4. **Test probe reliability**: Validate probes work correctly
5. **Add basic rollback actions**: Implement automatic experiment termination

### Progressive Enhancement
1. **Add more probe types**: Expand to Prometheus and custom probes
2. **Implement notifications**: Set up team alerting
3. **Add remediation actions**: Automate corrective responses
4. **Create composite probes**: Combine multiple health checks
5. **Build dashboards**: Visualize experiment health in real-time

## Next Steps

Ready to implement comprehensive monitoring for your chaos experiments?

1. **[Design Chaos Experiments](./chaos-experiments)** - Plan experiments with proper monitoring
2. **[Organize GameDays](./gamedays)** - Use probes to monitor GameDay exercises
3. **[Build Pipelines](./pipelines)** - Integrate probes into automated workflows
4. **[Explore Integrations](./integrations)** - Connect with your monitoring tools

:::tip Monitoring First
Always set up comprehensive probes and actions before running chaos experiments. Good monitoring is the foundation of safe and effective chaos engineering!
:::
