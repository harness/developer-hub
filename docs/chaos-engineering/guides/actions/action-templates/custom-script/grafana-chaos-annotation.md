---
id: grafana-chaos-annotation
---

# Grafana Chaos Annotation {#introduction}

Grafana chaos annotation action annotates the grafana dashboard to highlight the chaos duration.

#### Infrastructure type

- **Kubernetes**

#### Use cases

Grafana Chaos Annotation action helps you:
- Visualize chaos injection periods directly on Grafana dashboards
- Correlate chaos events with metrics, logs, and alerts
- Track experiment timeline alongside application performance metrics
- Improve incident analysis and post-chaos debugging
- Create visual markers for chaos engineering activities

---

## Overview

This action creates annotations on Grafana dashboards to mark the start and duration of chaos experiments. Annotations appear as vertical lines or regions on your dashboards, making it easy to correlate chaos events with system behavior and performance metrics.

#### Action type
**Custom Script Action**

#### Prerequisites

- Grafana instance with API access enabled
- Grafana username and password with annotation write permissions
- Dashboard UID where annotations will be created
- Kubernetes cluster with chaos infrastructure installed
- Network connectivity from chaos infrastructure to Grafana API endpoint

---

## Action properties

#### Script details

The action executes a custom script that:
1. Authenticates with Grafana API using username and password
2. Creates an annotation based on the specified mode (SOT/EOT/Continuous)
3. Tags the annotation for easy filtering and identification

#### Command and Arguments

**Command**: `actions`

**Arguments**:
- `-name grafana-chaos-annotation`
- `-uid <dashboard-uid>`

#### Environment variables

| Variable | Description | Required | Default | Example |
|----------|-------------|----------|---------|---------|
| `GRAFANA_URL` | URL of the Grafana instance | Yes | - | `https://grafana.example.com` |
| `GRAFANA_USERNAME` | Username for Grafana authentication | Yes | - | `admin` |
| `GRAFANA_PASSWORD` | Password for Grafana authentication | Yes | - | `your-password` |
| `DASHBOARD_UID` | Dashboard UID of the Grafana instance | Yes | - | `abc123def456` |
| `MODE` | Mode of operation for the annotation | Yes | - | `SOT`, `EOT`, `Continuous` |
| `ADDITIONAL_TAGS` | Additional tags for the annotation | No | - | `chaos,k8s,production` |

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
  - name: "grafana-chaos-annotation"
    type: "customScript"
    customScript/inputs:
      command: "actions"
      args:
        - "-name"
        - "grafana-chaos-annotation"
        - "-uid"
        - ""
      env:
        # URL of the Grafana instance
        - name: GRAFANA_URL
          value: "https://grafana.example.com"
        # Username for Grafana authentication
        - name: GRAFANA_USERNAME
          value: "admin"
        # Password for Grafana authentication
        - name: GRAFANA_PASSWORD
          valueFrom:
            secretKeyRef:
              name: grafana-secret
              key: password
        # Dashboard UID of the Grafana instance
        - name: DASHBOARD_UID
          value: "abc123def456"
        # Mode of operation: SOT (Start of Test), EOT (End of Test), or Continuous
        - name: MODE
          value: "SOT"
        # Additional tags for the annotation
        - name: ADDITIONAL_TAGS
          value: "chaos,kubernetes,pod-delete"
    runProperties:
      timeout: "30s"
      interval: "1s"
      iterations: 1
      maxRetries: 1
      initialDelay: ""
```



---

## Next Steps

- [Learn about Datadog Chaos Event](./datadog-chaos-event)
- [Explore Custom Script Actions](../../custom-script-action)
- [Create experiments with actions](/docs/chaos-engineering/guides/chaos-experiments/create-experiments)
