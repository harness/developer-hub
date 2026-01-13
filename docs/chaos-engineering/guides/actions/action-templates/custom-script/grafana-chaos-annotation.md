---
id: grafana-chaos-annotation
---

# Grafana Chaos Annotation {#introduction}

Grafana chaos annotation action annotates the grafana dashboard to highlight the chaos duration.

## Infrastructure type

- **Kubernetes**

## Use cases

Grafana Chaos Annotation action helps you:
- Visualize chaos injection periods directly on Grafana dashboards
- Correlate chaos events with metrics, logs, and alerts
- Track experiment timeline alongside application performance metrics
- Improve incident analysis and post-chaos debugging
- Create visual markers for chaos engineering activities

---

## Overview

This action creates annotations on Grafana dashboards to mark the start and duration of chaos experiments. Annotations appear as vertical lines or regions on your dashboards, making it easy to correlate chaos events with system behavior and performance metrics.

### Action type
**Custom Script Action**

### Prerequisites

- Grafana instance with API access enabled
- Grafana API token with annotation write permissions
- Dashboard UID where annotations will be created
- Kubernetes cluster with chaos infrastructure installed
- Network connectivity from chaos infrastructure to Grafana API endpoint

---

## Action properties

### Script details

The action executes a custom script that:
1. Authenticates with Grafana API using the provided token
2. Creates an annotation at the start of chaos injection
3. Updates the annotation with end time after chaos completion
4. Tags the annotation for easy filtering and identification

### Command and Arguments

**Command**: `actions`

**Arguments**:
- `-name grafana-chaos-annotation`
- `-uid <dashboard-uid>` (optional)

### Environment variables

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

## Action definition

You can define this action in your chaos experiment as follows:

### Basic annotation with username/password

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
        - "abc123def456"
      env:
        - name: GRAFANA_URL
          value: "https://grafana.example.com"
        - name: GRAFANA_USERNAME
          value: "admin"
        - name: GRAFANA_PASSWORD
          valueFrom:
            secretKeyRef:
              name: grafana-secret
              key: password
        - name: DASHBOARD_UID
          value: "abc123def456"
        - name: MODE
          value: "SOT"
        - name: ADDITIONAL_TAGS
          value: "chaos,kubernetes,pod-delete"
    runProperties:
      timeout: 30s
      interval: 1s
      iterations: 1
      maxRetries: 1
```

### Continuous mode annotation

```yaml
action:
  - name: "grafana-continuous-annotation"
    type: "customScript"
    customScript/inputs:
      command: "actions"
      args:
        - "-name"
        - "grafana-chaos-annotation"
        - "-uid"
        - "xyz789uvw012"
      env:
        - name: GRAFANA_URL
          value: "https://grafana.example.com"
        - name: GRAFANA_USERNAME
          valueFrom:
            secretKeyRef:
              name: grafana-secret
              key: username
        - name: GRAFANA_PASSWORD
          valueFrom:
            secretKeyRef:
              name: grafana-secret
              key: password
        - name: DASHBOARD_UID
          value: "xyz789uvw012"
        - name: MODE
          value: "Continuous"
        - name: ADDITIONAL_TAGS
          value: "chaos,network,latency,production"
    runProperties:
      timeout: 45s
      interval: 5s
      iterations: 1
      initialDelay: 5s
      maxRetries: 2
```

---

## Best practices

1. **Secure credentials**: Store Grafana username and password in Kubernetes secrets and reference them using `valueFrom.secretKeyRef`
2. **Choose appropriate MODE**: Use `SOT` (Start of Test) for marking experiment start, `EOT` (End of Test) for completion, or `Continuous` for ongoing annotations
3. **Consistent tagging**: Use the `ADDITIONAL_TAGS` field with consistent tags across experiments for easier filtering and analysis
4. **Dashboard UID**: Ensure the dashboard UID is correct and accessible by the provided credentials
5. **Dashboard organization**: Create dedicated dashboards for chaos experiments or use specific panels
6. **Retention policies**: Configure Grafana annotation retention policies to manage storage

---

## Troubleshooting

### Common issues

**Authentication failures**
- Verify username and password are correct
- Check user has appropriate permissions to create annotations
- Ensure credentials are properly stored in Kubernetes secrets
- Verify the user account is not locked or disabled

**Dashboard not found**
- Verify dashboard UID is correct (check Grafana dashboard settings)
- Check user has access to the specified dashboard
- Ensure dashboard exists in the specified Grafana instance
- Confirm the dashboard is not in a restricted folder

**Network connectivity**
- Verify chaos infrastructure can reach Grafana URL
- Check firewall rules and network policies
- Validate DNS resolution for Grafana endpoint
- Ensure HTTPS/HTTP protocol is correctly specified in GRAFANA_URL

**MODE configuration**
- Use valid MODE values: `SOT`, `EOT`, or `Continuous`
- Ensure MODE matches your experiment phase requirements
- Check that Continuous mode is appropriate for your use case

---

## Next Steps

- [Learn about Datadog Chaos Event](./datadog-chaos-event)
- [Explore Custom Script Actions](../../custom-script-action)
- [Create experiments with actions](/docs/chaos-engineering/guides/chaos-experiments/create-experiments)
