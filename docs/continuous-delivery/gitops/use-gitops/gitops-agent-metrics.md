---
title: GitOps Agent Metrics
description: Learn about enabling GitOps Agent Metrics
sidebar_position: 10
redirect_from:
  - /docs/continuous-delivery/gitops/create-cluster-with-iam
---

## Enabling GitOps Agent Metrics Server
The GitOps Agent exposes internal metrics on port `2112` at the `/metrics` endpoint. These metrics are useful for monitoring the performance and health of the agent, and can be scraped using tools like [Prometheus](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/user-guides/running-exporters.md).

### Metrics Feature Overview
Metrics are enabled by default in the GitOps agent:- 

- Metrics are served from the agent’s container on port `2112` at `/metrics`.
- If these metrics are not exposed by default, so you must explicitly [expose](#enabling-gitops-agent-metrics-server) this port.
- All metrics reset when the GitOps agent pod restarts.

### Exposing Metrics for Scraping

#### If You Are Using Helm

1. **Enable metrics service** by setting the following value in your Helm overrides file:
```yaml
agent:
  metrics:
    enabled: true

```
2. **To enable Prometheus ServiceMonitor** (if you're using Prometheus Operator):
```yaml
agent:
  metrics:
    serviceMonitor:
      enabled: true

```
:::info note
Avoid using a `LoadBalancer` type service if you're running multiple agent pods. In such cases, using a `ServiceMonitor` ensures metrics from all replicas are correctly scraped. For more details, refer to the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/user-guides/running-exporters.md) guide on running exporters.
:::

Alternatively, you can pass the values directly during the Helm installation:
```bash
helm install harness-agent <chart-path> \
  --set agent.metrics.enabled=true \
  --set agent.metrics.serviceMonitor.enabled=true
```

#### If You Are Using Kubernetes Manifests
To expose the metrics port `(2112)` manually, apply the following Kubernetes Service manifest in the same namespace as your GitOps agent:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: gitops-agent-metrics
  namespace: <your-agent-namespace>
  labels:
    app.kubernetes.io/name: harness-gitops-agent-metrics
    app.kubernetes.io/component: gitops-agent
    app.kubernetes.io/part-of: harness-gitops
spec:
  type: ClusterIP
  ports:
    - name: http-metrics
      protocol: TCP
      port: 2112
      targetPort: metrics
  selector:
    app.kubernetes.io/name: harness-gitops-agent
```
Once the service is created, you can test locally by port-forwarding:
```bash
kubectl port-forward svc/gitops-agent-metrics 2112:2112 -n <your-agent-namespace>
```
Visit `http://localhost:2112/metrics` to confirm the metrics endpoint is accessible.

### Available Metrics

| Metric Name | Type | Description |
| --- | --- | --- |
| `entities_count` | Gauge | Number of entities being managed by the GitOps agent, labeled by entity type. |
| `task_complete_processing_time` | Histogram | Time a task spends in the agent from fetch to response. |
| `http_request_duration` | Histogram | Time taken to complete HTTP requests to Harness. |
| `http_request_payload_size` | Histogram | Size (in bytes) of payloads sent in HTTP requests. |
| `task_receiver_channel_blocked_time` | Histogram | Wait time before task is picked up by a processor. |
| `task_execution_time` | Histogram | Time taken to execute a task (includes Argo CD work). |
| `task_response_sender_channel_blocked_time` | Histogram | Time a completed task waits before sending response. |
| `reconciler_duration` | Histogram | Time taken for one reconciliation cycle (in milliseconds). |

### Understanding Histogram Metrics

Most metrics are histograms and include:
`_count`: Number of samples.
`_sum`: Sum of all samples.
`_bucket`: Buckets representing value ranges.

To calculate averages:
```promql
rate(task_complete_processing_time_sum[5m]) / rate(task_complete_processing_time_count[5m])
```

### Example Prometheus Queries (PromQL)

#### Average HTTP Request Duration
```promql
rate(http_request_duration_sum[5m]) / rate(http_request_duration_count[5m])
```

#### 95th Percentile HTTP Payload Size
```promql
histogram_quantile(0.95, rate(http_request_payload_size_bucket[5m]))
```

#### 95th Percentile Task Execution Time
```promql
histogram_quantile(0.95, rate(task_execution_time_bucket[5m]))
```

#### [Advanced] 95th Percentile Receiver Channel Block Time
```promql
histogram_quantile(0.95, rate(task_receiver_channel_blocked_time_bucket[5m]))
```
**Tip**: If this increases under load, scale `GITOPS_AGENT_NUM_PROCESSORS`.
Recommended max: 16 for agents with 1 vCPU.

#### [Advanced] 95th Percentile Responder Channel Block
```promql
histogram_quantile(0.95, rate(task_response_sender_channel_blocked_time_bucket[5m]))
```
**Tip**: If this increases under load, scale `GITOPS_AGENT_NUM_RESPONDERS`.