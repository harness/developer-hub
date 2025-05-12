---
title: GitOps Agent Metrics
description: Learn about enabling GitOps Agent Metrics
sidebar_position: 10
redirect_from:
  - /docs/continuous-delivery/gitops/create-cluster-with-iam
---

:::info

All new metrics are available only from gitops-agent version 0.91.0 and upwards. Please ensure that you are up-to-date if you are unable to find or use GitOps Agent Metrics.

:::

## Overview
The GitOps Agent exposes internal metrics on port `2112` at the `/metrics` endpoint. These metrics are useful for monitoring the performance and health of the agent, and can be scraped using tools like [Prometheus](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/user-guides/running-exporters.md).


Metrics are enabled by default in the GitOps agent and exposed through a Kubernetes Service:- 

- Metrics are served from the agent’s container on port `2112` at `/metrics`.
- If these metrics are not exposed by default, you must explicitly [expose](#exposing-metrics-for-scraping) this port.
- All metrics reset when the GitOps agent pod restarts.

## Exposing Metrics for Scraping

This is already done in the default agent installation but here are the configs that control the exposing of metrics for agent.

### Values overrides for Helm-based Agent Installation

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

### For Agent installed through Kubernetes manifests directly
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

## Available Metrics

| Metric Name | Type | Description | Min. Req. Agent Version |
| --- | --- | --- | --- |
| `entities_count` | Gauge | Number of entities being managed by the GitOps agent, grouped by label "entity_type". | v0.91.0 |
| `task_complete_processing_time` | Histogram | Time a task spends in the agent from fetch to response.  | v0.91.0 |
| `http_request_duration` | Histogram | Time taken to complete HTTP requests to Harness. | v0.91.0 |
| `http_request_payload_size` | Histogram | Size (in bytes) of payloads sent in HTTP requests. | v0.91.0 |
| `reconciler_duration` (ADVANCED) | Histogram | Time taken for one reconciliation cycle (in milliseconds). | v0.91.0 |
| `task_receiver_channel_blocked_time` (ADVANCED) | Histogram | Wait time before task is picked up by a processor. | v0.91.0 |
| `task_execution_time` (ADVANCED) | Histogram | Time taken to execute a task (includes Argo CD work). | v0.91.0 |
| `task_response_sender_channel_blocked_time` (ADVANCED) | Histogram | Time a completed task waits before sending response. | v0.91.0 |

:::info

The "ADVANCED" metrics will be useful once you run into non-obvious scaling issues and will be helpful in identifying which moving component is the bottleneck and scale workloads accordingly. 
Most basic scale issues can be tackled with a combination of either HA(high availability) mode, HPA and spec increases.

:::

### Useful information about task metrics
The gitops agent has 3 concurrent worker pools controlled by the env vars, `GITOPS_AGENT_NUM_FETCHERS`, `GITOPS_AGENT_NUM_PROCESSORS`, `GITOPS_AGENT_NUM_RESPONDERS`. 
The **FETCHER** fetches a task from harness, hands it to a **PROCESSOR** and then the result is picked up by a **RESPONDER** and sent back to harness.

`task_receiver_channel_blocked_time` observes the time tasks spend within the agent waiting for a **PROCESSOR** worker to pick them up.

`task_response_sender_channel_blocked_time` observes the time a completed task spends within the agent waiting for a **RESPONDER** worker to send its response back to harness.

`task_execution_time` is the time a **PROCESSOR** worker actually spent on the task, i.e. it is the time in between the above two channels once a **PROCESSOR** picks up a task.

`task_complete_processing_time` is the overall time spent by the task within the agent. 
This is the sum of the above 3 metrics:

`task_receiver_channel_blocked_time + task_execution_time + task_response_sender_channel_blocked_time` 

This sum usually is equal to `task_complete_processing_time` for each task.

This information can be used to debug instances where the obvious reason why the gitops agent is taking too long is not clear.

For example if there are sporadic issues with tasks not completing properly and there is a spike in `task_response_sender_channel_blocked_time` you can increase `GITOPS_AGENT_NUM_RESPONDERS` so that there's more **RESPONDER** workers and there is no blocking of task results being sent to gitops.


### Understanding Histogram Metrics

Most metrics are histograms and include these vectors below corresponding to each metric:

`_count`: Number of samples.

`_sum`: Sum of all samples.

`_bucket`: Buckets representing value ranges.

To calculate averages for example:
```promql
rate(task_complete_processing_time_sum[5m]) / rate(task_complete_processing_time_count[5m])
```

## Example Prometheus Queries (PromQL)

Based on the above explanations you may also set alerts as required here.

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