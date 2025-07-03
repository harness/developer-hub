---
title: Monitoring & Observability
description: Integrate chaos engineering with monitoring and observability tools for comprehensive system insights
sidebar_position: 1
---

# Monitoring & Observability Integration

Integrate Harness Chaos Engineering with your monitoring and observability stack to gain deep insights into system behavior during chaos experiments and ensure comprehensive failure detection.

## Overview

Monitoring integration enables you to:
- **Real-Time Visibility**: Monitor system behavior during chaos experiments
- **Automated Detection**: Identify failures and anomalies automatically
- **Impact Assessment**: Measure the blast radius of chaos experiments
- **Recovery Tracking**: Monitor system recovery after experiments

## Supported Platforms

### Prometheus & Grafana
- **Metrics Collection**: Comprehensive metrics during chaos experiments
- **Custom Dashboards**: Specialized dashboards for chaos engineering
- **Alerting Rules**: Automated alerts based on chaos experiment results
- **Long-Term Storage**: Historical analysis of system resilience

**Key Features:**
- PromQL queries for chaos-specific metrics
- Grafana annotations for experiment timelines
- Alert manager integration
- Custom exporters for chaos metrics

**Integration Example:**
```yaml
# Prometheus scrape config for chaos metrics
scrape_configs:
  - job_name: 'chaos-experiments'
    static_configs:
      - targets: ['chaos-exporter:8080']
    scrape_interval: 15s
    metrics_path: /metrics
```

**Grafana Dashboard Queries:**
```promql
# Response time during chaos experiments
histogram_quantile(0.95, 
  rate(http_request_duration_seconds_bucket[5m])
) and on() chaos_experiment_active == 1

# Error rate correlation with chaos events
rate(http_requests_total{status=~"5.."}[5m]) 
  and on() chaos_experiment_active == 1
```

### Datadog
- **APM Integration**: Application performance monitoring during chaos
- **Infrastructure Monitoring**: Host and container metrics
- **Log Correlation**: Correlate logs with chaos experiment events
- **Custom Metrics**: Business and application-specific metrics

**Key Features:**
- Distributed tracing during experiments
- Anomaly detection algorithms
- Custom dashboards and alerts
- Integration with incident management

**Integration Example:**
```python
# Datadog custom metrics for chaos experiments
from datadog import initialize, statsd

# Track chaos experiment metrics
statsd.increment('chaos.experiment.started', 
                tags=['experiment:pod-delete', 'env:staging'])
statsd.histogram('chaos.recovery.time', recovery_time,
                tags=['service:api', 'experiment:network-latency'])
```

### New Relic
- **Full-Stack Observability**: End-to-end monitoring during chaos
- **AI-Powered Insights**: Automatic anomaly detection
- **Custom Events**: Track chaos experiment lifecycle
- **Business Impact Analysis**: Revenue and user experience metrics

**Key Features:**
- Distributed tracing
- Error tracking and analysis
- Custom dashboards
- Alert policies and notifications

### Splunk
- **Log Analysis**: Comprehensive log analysis during experiments
- **Machine Learning**: Anomaly detection and pattern recognition
- **Custom Searches**: Chaos-specific log queries
- **Real-Time Monitoring**: Live monitoring during experiments

**Key Features:**
- SPL (Search Processing Language) queries
- Custom dashboards and visualizations
- Alert actions and notifications
- Integration with ITSM tools

### Elastic Stack (ELK)
- **Log Aggregation**: Centralized logging during chaos experiments
- **Search and Analysis**: Powerful search capabilities
- **Visualization**: Kibana dashboards for chaos insights
- **Machine Learning**: Anomaly detection in logs and metrics

**Key Features:**
- Elasticsearch for storage and search
- Logstash for data processing
- Kibana for visualization
- Beats for data collection

**Integration Example:**
```json
// Elasticsearch query for chaos experiment logs
{
  "query": {
    "bool": {
      "must": [
        {"match": {"chaos.experiment.active": true}},
        {"range": {"@timestamp": {"gte": "now-1h"}}}
      ]
    }
  },
  "aggs": {
    "error_rate": {
      "terms": {"field": "log.level"}
    }
  }
}
```

### AppDynamics
- **Application Performance**: Deep application insights
- **Business Transaction Monitoring**: End-user experience tracking
- **Infrastructure Visibility**: Server and database monitoring
- **Root Cause Analysis**: Automated problem detection

**Key Features:**
- Code-level visibility
- Business transaction correlation
- Dynamic baselines
- Automated alerting

### Dynatrace
- **AI-Powered Monitoring**: Automatic problem detection
- **Full-Stack Monitoring**: Applications, infrastructure, and user experience
- **Root Cause Analysis**: Automated problem correlation
- **Business Impact Analysis**: Revenue and user impact tracking

**Key Features:**
- OneAgent for automatic instrumentation
- Davis AI for problem detection
- Custom metrics and events
- Integration with DevOps tools

## Integration Patterns

### Pre-Experiment Monitoring
Establish baseline metrics before chaos injection:
```yaml
monitoring-workflow:
  - collect-baseline-metrics
  - set-alert-thresholds
  - start-chaos-experiment
  - monitor-during-experiment
  - analyze-post-experiment
```

### Real-Time Alerting
Configure alerts for experiment anomalies:
```yaml
alert-rules:
  - name: "High Error Rate During Chaos"
    condition: error_rate > 5% AND chaos_active == true
    action: notify-team
  
  - name: "Response Time Degradation"
    condition: p95_latency > 2x_baseline AND chaos_active == true
    action: escalate-incident
```

### Correlation Analysis
Correlate chaos events with system metrics:
```yaml
correlation-queries:
  - chaos-start-time vs response-time-spike
  - experiment-type vs affected-services
  - recovery-time vs system-load
```

## Monitoring Strategies

### Golden Signals
Monitor the four golden signals during chaos experiments:

1. **Latency**: Response time distribution
2. **Traffic**: Request rate and volume
3. **Errors**: Error rate and types
4. **Saturation**: Resource utilization

### SLI/SLO Monitoring
- **Service Level Indicators**: Key metrics that matter to users
- **Service Level Objectives**: Target values for SLIs
- **Error Budgets**: Acceptable failure rates
- **Burn Rate**: Rate of error budget consumption

### Business Metrics
- **Conversion Rates**: Impact on business outcomes
- **Revenue Metrics**: Financial impact of failures
- **User Experience**: Customer satisfaction scores
- **Operational Metrics**: Support ticket volume

## Custom Metrics and Events

### Chaos-Specific Metrics
```prometheus
# Chaos experiment duration
chaos_experiment_duration_seconds{experiment="pod-delete", status="completed"}

# Recovery time after chaos
chaos_recovery_time_seconds{service="api", experiment="network-latency"}

# Blast radius measurement
chaos_affected_services_total{experiment="database-failover"}

# Resilience score
chaos_resilience_score{service="frontend", experiment="cpu-stress"}
```

### Event Tracking
```json
{
  "event_type": "chaos_experiment",
  "timestamp": "2024-01-15T10:30:00Z",
  "experiment_id": "exp-123",
  "experiment_type": "pod-delete",
  "target_service": "user-service",
  "status": "started",
  "metadata": {
    "environment": "staging",
    "duration": "300s",
    "blast_radius": "single-pod"
  }
}
```

## Alerting and Notifications

### Alert Categories
- **Experiment Failures**: When chaos experiments fail to execute
- **Unexpected Impact**: When blast radius exceeds expectations
- **Recovery Issues**: When systems don't recover as expected
- **Performance Degradation**: When SLOs are breached during experiments

### Notification Channels
- **Slack/Teams**: Real-time team notifications
- **PagerDuty**: Incident escalation for critical issues
- **Email**: Detailed experiment reports
- **Webhooks**: Integration with custom systems

### Alert Fatigue Prevention
- **Intelligent Grouping**: Group related alerts together
- **Dynamic Thresholds**: Adjust thresholds based on experiment type
- **Suppression Rules**: Suppress expected alerts during experiments
- **Escalation Policies**: Progressive alert escalation

## Dashboard Design

### Chaos Engineering Dashboard Components
- **Experiment Timeline**: Visual timeline of all experiments
- **System Health**: Real-time health indicators
- **Performance Metrics**: Key performance indicators
- **Error Tracking**: Error rates and types
- **Recovery Metrics**: Time to recovery measurements

### Dashboard Best Practices
- **Clear Visualization**: Easy-to-understand charts and graphs
- **Contextual Information**: Include experiment context in dashboards
- **Drill-Down Capability**: Ability to investigate anomalies
- **Mobile-Friendly**: Accessible on mobile devices

## Troubleshooting Monitoring Issues

### Common Problems
- **Missing Metrics**: Ensure all relevant metrics are collected
- **Alert Noise**: Too many false positive alerts
- **Delayed Detection**: Slow alert response times
- **Correlation Issues**: Difficulty linking chaos events to system behavior

### Debugging Strategies
- **Metric Validation**: Verify metric collection and accuracy
- **Alert Testing**: Test alert rules with synthetic data
- **Dashboard Review**: Regular review and optimization of dashboards
- **Feedback Loops**: Incorporate team feedback for improvements

## Best Practices

### Monitoring Setup
- **Comprehensive Coverage**: Monitor all system components
- **Baseline Establishment**: Establish clear performance baselines
- **Automated Collection**: Automate metric collection and analysis
- **Regular Review**: Regularly review and update monitoring strategies

### Alert Management
- **Meaningful Alerts**: Only alert on actionable issues
- **Clear Documentation**: Document alert meanings and responses
- **Regular Testing**: Test alert mechanisms regularly
- **Continuous Improvement**: Refine alerts based on experience

### Data Retention
- **Long-Term Storage**: Retain chaos experiment data for trend analysis
- **Efficient Storage**: Optimize storage costs while maintaining accessibility
- **Data Governance**: Implement proper data retention policies
- **Backup Strategies**: Ensure monitoring data is backed up

## Getting Started

1. **Assess Current Monitoring**: Evaluate existing monitoring capabilities
2. **Identify Gaps**: Determine what additional monitoring is needed
3. **Choose Integration Points**: Select key integration points with chaos experiments
4. **Implement Gradually**: Start with basic integration and expand over time
5. **Train Teams**: Ensure teams understand new monitoring capabilities
6. **Iterate and Improve**: Continuously refine monitoring based on experience

## Next Steps

- Explore specific monitoring tool integrations
- Learn about advanced alerting strategies
- Set up comprehensive chaos engineering dashboards
- Integrate monitoring with incident response processes
