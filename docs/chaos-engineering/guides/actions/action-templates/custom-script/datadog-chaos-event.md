---
id: datadog-chaos-event
---

# Datadog Chaos Event {#introduction}

It creates an event for the datadog dashboard to highlight the chaos injection.

## Infrastructure type

- **Kubernetes**

## Use cases

Datadog Chaos Event action helps you:
- Create events in Datadog to mark chaos experiment execution
- Track chaos injection alongside application metrics and traces
- Enable correlation between chaos events and system behavior
- Enhance observability during resilience testing
- Integrate chaos engineering with existing Datadog monitoring workflows
- Facilitate incident analysis and post-mortem reviews

---

## Overview

This action creates events in Datadog to mark the start and end of chaos experiments. Events appear in the Datadog Events Explorer and can be overlaid on dashboards, making it easy to correlate chaos activities with system metrics, logs, and APM traces.

### Action type
**Custom Script Action**

### Prerequisites

- Datadog account with API access
- Datadog API key and Application key
- Kubernetes cluster with chaos infrastructure installed
- Network connectivity from chaos infrastructure to Datadog API endpoint
- Appropriate permissions to create events in Datadog

---

## Action properties

### Script details

The action executes a custom script that:
1. Authenticates with Datadog API using the provided API key
2. Creates an event at the specified point in the chaos experiment
3. Tags events for filtering and correlation
4. Supports different modes for event creation timing

### Command and Arguments

**Command**: `actions`

**Arguments**:
- `-name datadog-chaos-event`

### Environment variables

| Variable | Description | Required | Default | Example |
|----------|-------------|----------|---------|---------|
| `DATADOG_URL` | URL of the Datadog instance | Yes | - | `https://api.datadoghq.com` |
| `DATADOG_API_KEY` | Datadog API key for authentication | Yes | - | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `DATADOG_EVENT_TITLE` | Title of the event | Yes | - | `Chaos Experiment: Pod Delete` |
| `DATADOG_EVENT_TEXT` | Text description of the chaos event | Yes | - | `Deleting pods in production namespace` |
| `MODE` | Mode of operation for the event | No | `start` | `start`, `end` |
| `DATADOG_EVENT_TAGS` | Comma-separated tags for the event | No | - | `chaos,k8s,production,pod-delete` |
| `DATADOG_EVENT_ALERT_TYPE` | Alert type (error, warning, info, success) | No | `info` | `warning`, `error`, `info`, `success` |

---

## Run properties

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `timeout` | Maximum time to wait for the action to complete (e.g., `30s`, `1m`, `5m`) | String | 30s |
| `interval` | Time between action executions (e.g., `1s`, `5s`, `10s`) | String | 1s |
| `iterations` | Number of times the action should execute | Integer | 1 |
| `maxRetries` | Number of retry attempts before marking the action as failed | Integer | 1 |
| `initialDelay` | Initial delay before starting the action (e.g., `0s`, `10s`, `30s`) | String | - |

---

## Action definition

You can define this action in your chaos experiment as follows:

### Basic event creation

```yaml
action:
  - name: "datadog-chaos-event-start"
    type: "customScript"
    customScript/inputs:
      command: "actions"
      args:
        - "-name"
        - "datadog-chaos-event"
      env:
        - name: DATADOG_URL
          value: "https://api.datadoghq.com"
        - name: DATADOG_API_KEY
          valueFrom:
            secretKeyRef:
              name: datadog-secret
              key: api-key
        - name: DATADOG_EVENT_TITLE
          value: "Chaos Experiment Started: Pod Delete"
        - name: DATADOG_EVENT_TEXT
          value: "Starting pod delete chaos in production namespace"
        - name: MODE
          value: "start"
        - name: DATADOG_EVENT_TAGS
          value: "chaos,kubernetes,pod-delete,production"
        - name: DATADOG_EVENT_ALERT_TYPE
          value: "warning"
    runProperties:
      timeout: 30s
      interval: 1s
      iterations: 1
      maxRetries: 1
```

### Event with end mode

```yaml
action:
  - name: "datadog-chaos-event-end"
    type: "customScript"
    customScript/inputs:
      command: "actions"
      args:
        - "-name"
        - "datadog-chaos-event"
      env:
        - name: DATADOG_URL
          value: "https://api.datadoghq.eu"
        - name: DATADOG_API_KEY
          valueFrom:
            secretKeyRef:
              name: datadog-secret
              key: api-key
        - name: DATADOG_EVENT_TITLE
          value: "Chaos Experiment Completed: Network Latency"
        - name: DATADOG_EVENT_TEXT
          value: "Network latency chaos experiment completed successfully"
        - name: MODE
          value: "end"
        - name: DATADOG_EVENT_TAGS
          value: "chaos,network,latency,completed"
        - name: DATADOG_EVENT_ALERT_TYPE
          value: "success"
    runProperties:
      timeout: 30s
      interval: 1s
      iterations: 1
      maxRetries: 2
```

### Event with info alert type

```yaml
action:
  - name: "datadog-cpu-stress-event"
    type: "customScript"
    customScript/inputs:
      command: "actions"
      args:
        - "-name"
        - "datadog-chaos-event"
      env:
        - name: DATADOG_URL
          value: "https://api.us5.datadoghq.com"
        - name: DATADOG_API_KEY
          valueFrom:
            secretKeyRef:
              name: datadog-secret
              key: api-key
        - name: DATADOG_EVENT_TITLE
          value: "CPU Stress Test: 80% Load"
        - name: DATADOG_EVENT_TEXT
          value: "Applying 80% CPU stress to validate auto-scaling behavior"
        - name: MODE
          value: "start"
        - name: DATADOG_EVENT_TAGS
          value: "chaos,cpu,stress,autoscaling,production"
        - name: DATADOG_EVENT_ALERT_TYPE
          value: "info"
    runProperties:
      timeout: 30s
      interval: 1s
      iterations: 1
      initialDelay: 5s
      maxRetries: 1
```

---

## Best practices

1. **Secure credential storage**: Store Datadog API key in Kubernetes secrets and reference it using `valueFrom.secretKeyRef`
2. **Choose appropriate MODE**: Use `start` for marking experiment start and `end` for completion events
3. **Descriptive event titles**: Include experiment name, fault type, and target in `DATADOG_EVENT_TITLE`
4. **Comprehensive event text**: Provide context about the chaos experiment, expected impact, and duration in `DATADOG_EVENT_TEXT`
5. **Consistent tagging strategy**: Use `DATADOG_EVENT_TAGS` with consistent tags across experiments for easier filtering and correlation
6. **Alert type selection**: Choose appropriate `DATADOG_EVENT_ALERT_TYPE` values (info, warning, error, success) based on experiment severity
7. **Regional endpoints**: Use the correct `DATADOG_URL` for your Datadog region (e.g., `api.datadoghq.com`, `api.datadoghq.eu`, `api.us5.datadoghq.com`)

---

## Event correlation

### Correlating with metrics
Events created by this action appear on Datadog dashboards and can be correlated with:
- Application Performance Metrics (APM)
- Infrastructure metrics (CPU, memory, network)
- Custom metrics from your applications
- Log data and traces

### Filtering events
Use tags to filter chaos events in Datadog:
```
tags:chaos AND tags:production
tags:chaos AND tags:pod-delete
source:harness-chaos
```

### Event timeline
Events appear in:
- **Events Explorer**: Central view of all events
- **Dashboards**: Overlaid on graphs and charts
- **Service pages**: Associated with specific services
- **Host maps**: Linked to infrastructure components

---

## Troubleshooting

### Common issues

**Authentication failures**
- Verify `DATADOG_API_KEY` is correct and not expired
- Check API key has permission to create events
- Ensure API key is properly stored in Kubernetes secrets
- Validate the `DATADOG_URL` matches your account region

**Event not appearing**
- Check event was successfully created (verify API response)
- Verify `DATADOG_EVENT_TAGS` are correctly formatted (comma-separated, no spaces)
- Ensure event time is within acceptable range
- Check Datadog account has event ingestion enabled
- Verify the correct Datadog region URL is used

**Network connectivity**
- Verify chaos infrastructure can reach `DATADOG_URL`
- Check firewall rules and network policies
- Validate DNS resolution for Datadog API endpoint
- Test connectivity using curl or similar tools
- Ensure HTTPS protocol is correctly specified in `DATADOG_URL`

**MODE configuration**
- Use valid MODE values: `start` or `end`
- Ensure MODE matches your experiment phase (start at beginning, end at completion)
- Default MODE is `start` if not specified

**Alert type issues**
- Use valid `DATADOG_EVENT_ALERT_TYPE` values: `info`, `warning`, `error`, or `success`
- Default is `info` if not specified
- Choose alert type based on experiment severity and phase

**Rate limiting**
- Datadog API has rate limits for event creation
- Implement retry logic using `maxRetries` property
- Consider spacing out events if creating many in succession
- Monitor API usage in Datadog account settings

---

## Next Steps

- [Learn about Grafana Chaos Annotation](./grafana-chaos-annotation)
- [Explore Custom Script Actions](../../custom-script-action)
- [Create experiments with actions](/docs/chaos-engineering/guides/chaos-experiments/create-experiments)
- [Datadog Events API Documentation](https://docs.datadoghq.com/api/latest/events/)
