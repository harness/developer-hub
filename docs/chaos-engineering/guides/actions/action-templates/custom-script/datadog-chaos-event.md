---
id: datadog-chaos-event
---

# Datadog Chaos Event {#introduction}

It creates an event for the datadog dashboard to highlight the chaos injection.

### Infrastructure type

- **Kubernetes**

#### Use cases

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

#### Action type
**Custom Script Action**

#### Prerequisites

- Datadog account with API access
- Datadog API key and Application key
- Kubernetes cluster with chaos infrastructure installed
- Network connectivity from chaos infrastructure to Datadog API endpoint
- Appropriate permissions to create events in Datadog

---

## Action properties

#### Script details

The action executes a custom script that:
1. Authenticates with Datadog API using the provided API key
2. Creates an event at the specified point in the chaos experiment
3. Tags events for filtering and correlation
4. Supports different modes for event creation timing

#### Command and Arguments

**Command**: `actions`

**Arguments**:
- `-name datadog-chaos-event`

#### Environment variables

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

## Parameters

The following YAML snippet illustrates the use of these tunables:

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
        # URL of the Datadog instance
        - name: DATADOG_URL
          value: "https://api.datadoghq.com"
        # Datadog API key for authentication
        - name: DATADOG_API_KEY
          valueFrom:
            secretKeyRef:
              name: datadog-secret
              key: api-key
        # Title of the event
        - name: DATADOG_EVENT_TITLE
          value: "Chaos Experiment Started: Pod Delete"
        # Text description of the chaos event
        - name: DATADOG_EVENT_TEXT
          value: "Starting pod delete chaos in production namespace"
        # Mode of operation: start or end
        - name: MODE
          value: "start"
        # Comma-separated tags for the event
        - name: DATADOG_EVENT_TAGS
          value: "chaos,kubernetes,pod-delete,production"
        # Alert type: error, warning, info, or success
        - name: DATADOG_EVENT_ALERT_TYPE
          value: "warning"
    runProperties:
      timeout: "30s"
      interval: "1s"
      iterations: 1
      maxRetries: 1
      initialDelay: ""
```
---



## Next Steps

- [Learn about Grafana Chaos Annotation](./grafana-chaos-annotation)
- [Explore Custom Script Actions](../../custom-script-action)
- [Create experiments with actions](/docs/chaos-engineering/guides/chaos-experiments/create-experiments)
- [Datadog Events API Documentation](https://docs.datadoghq.com/api/latest/events/)
