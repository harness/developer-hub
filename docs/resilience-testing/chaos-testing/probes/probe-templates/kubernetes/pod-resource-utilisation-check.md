---
id: pod-resource-utilisation-check
title: Pod Resource Utilisation Check
sidebar_label: Pod Resource Utilisation Check
description: Built-in Command Probe template that validates whether Kubernetes pod CPU or memory usage stays within a limit during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - kubernetes probe
  - pod resource utilisation
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - kubernetes-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod Resource Utilisation Check is a built-in Command Probe template that validates whether the CPU or memory usage of Kubernetes pods stays within a defined limit during a chaos experiment. Use it to confirm that a workload does not exceed its resource budget while a fault stresses the application. You select pods by label, by name, or by the owning workload kind and namespace.

The probe runs the `healthchecks` utility bundled in the chaos probe image, reads pod metrics from the Kubernetes Metrics API, and prints `[Pass]` when usage for the selected `METRIC_TYPE` is at or below the configured limit. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Monitor resource usage during stress chaos experiments.
- Verify that resource limits are respected.
- Validate application performance under load.
- Confirm that pods do not exceed resource thresholds.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name pod-resource-metrics-check`. The utility resolves the target pods from `TARGET_LABELS`, `TARGET_NAMES`, `TARGET_KIND`, and `TARGET_NAMESPACE`, reads CPU or memory usage for the container in `TARGET_CONTAINER` from the Metrics API, and prints `[Pass]` when usage for the selected `METRIC_TYPE` is at or below `CPU_LIMIT` or `MEMORY_LIMIT`. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure installed in the target cluster.
- **Metrics server:** The Kubernetes metrics server installed and running in the cluster.
- **Namespace access:** Access to the target namespace and pods.
- **RBAC permissions:** Permissions for the chaos service account to query pod metrics.

---

## Probe properties

### Command

```bash
healthchecks -name pod-resource-metrics-check
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that pod resource utilisation is at or below the acceptable limit.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of labels used to filter pods. | No | - |
| `TARGET_NAMES` | Comma-separated list of target pod names. | No | - |
| `TARGET_NAMESPACE` | Namespace of the target pods. | Yes | - |
| `TARGET_KIND` | Kind of the owning workload (for example, `deployment`, `statefulset`, `daemonset`). | No | `deployment` |
| `TARGET_CONTAINER` | Name of the container to check resource metrics for. | No | - |
| `METRIC_TYPE` | Metric to check. Accepted values are `cpu` and `memory`. | No | `cpu` |
| `CPU_LIMIT` | Maximum allowed CPU usage in millicores. The usage must be at or below this value. | No | `1000` |
| `MEMORY_LIMIT` | Maximum allowed memory usage in MB. The usage must be at or below this value. | No | `1024` |
| `STATUS_CHECK_TIMEOUT` | Maximum time in seconds to wait for the status check. | No | `180` |
| `STATUS_CHECK_DELAY` | Delay in seconds between status checks. | No | `2` |

---

## Run properties

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `timeout` | Maximum time to wait for the probe to complete (for example, `30s`, `1m`, `5m`). | String | `180s` |
| `interval` | Time between probe executions (for example, `1s`, `5s`, `10s`). | String | `1s` |
| `attempt` | Number of retry attempts before the probe is marked as failed. | Integer | `1` |
| `pollingInterval` | Time between retry attempts (for example, `1s`, `5s`, `10s`). | String | - |
| `initialDelay` | Initial delay before the probe starts (for example, `0s`, `10s`, `30s`). | String | - |
| `stopOnFailure` | Stop the experiment if the probe fails. | Boolean | `false` |
| `verbosity` | Log verbosity level (`info`, `debug`, `trace`). | String | - |

---

## Troubleshooting

<Troubleshoot
  issue="Pod Resource Utilisation Check probe fails because usage exceeded the limit"
  mode="general"
  fallback="CPU or memory usage rose above CPU_LIMIT or MEMORY_LIMIT, which can be the expected result of a stress fault. Confirm that METRIC_TYPE matches the resource you want to bound, check live usage with kubectl top pod, and adjust the limit if the higher usage is acceptable for the workload."
/>

<Troubleshoot
  issue="Pod Resource Utilisation Check probe fails because metrics are unavailable"
  mode="general"
  fallback="The probe could not read pod metrics, usually because the Kubernetes metrics server is not installed or not ready. Verify that kubectl top pod returns data, install or repair metrics-server, and confirm the chaos service account can read the metrics.k8s.io API."
/>

<Troubleshoot
  issue="Pod Resource Utilisation Check probe fails because no pods matched the target"
  mode="general"
  fallback="The selectors did not resolve any pods, or TARGET_CONTAINER did not match a container in the resolved pods. Confirm that TARGET_LABELS, TARGET_NAMES, TARGET_NAMESPACE, and TARGET_KIND identify the workload, and that TARGET_CONTAINER matches a container name."
/>

---

## Related probe templates

- [Pod Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-status-check): Validate that pods stay in the Running state.
- [Container Restart Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/container-restart-check): Validate that container restart counts stay within a threshold.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
