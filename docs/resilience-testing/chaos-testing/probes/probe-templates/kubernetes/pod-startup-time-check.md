---
id: pod-startup-time-check
title: Pod Startup Time Check
sidebar_label: Pod Startup Time Check
description: Built-in Command Probe template that validates whether Kubernetes pods start within an acceptable duration during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - kubernetes probe
  - pod startup time
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - kubernetes-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod Startup Time Check is a built-in Command Probe template that validates whether Kubernetes pods start within an acceptable duration during a chaos experiment. Use it to confirm that applications initialize quickly after pod creation or restart, which matters during rollouts and recovery from disruption. You select pods by label, by name, or by the owning workload kind and namespace.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Kubernetes API, and prints `[Pass]` when all targeted pods start within `STARTUP_DURATION_CUTOFF`. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Validate that pods start within acceptable timeframes.
- Monitor deployment performance during rollouts.
- Detect slow startup issues during chaos experiments.
- Confirm that application readiness times stay optimal.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name validate-pod-startup-time`. The utility resolves the target pods from `TARGET_LABELS`, `TARGET_NAMES`, `TARGET_KIND`, and `TARGET_NAMESPACE`, excludes pods older than `AGE_CRITERIA`, and prints `[Pass]` when every remaining pod starts within `STARTUP_DURATION_CUTOFF`. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure installed in the target cluster.
- **Namespace access:** Access to the target namespace and pods.
- **RBAC permissions:** Permissions for the chaos service account to query pod status and events.

---

## Probe properties

### Command

```bash
healthchecks -name validate-pod-startup-time
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that all targeted pods started within the specified duration.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of labels used to filter pods (for example, `app=nginx`). | No | - |
| `TARGET_NAMES` | Comma-separated list of target pod names. | No | - |
| `TARGET_NAMESPACE` | Namespace of the target pods. | Yes | - |
| `TARGET_KIND` | Kind of the owning workload (for example, `deployment`, `statefulset`, `daemonset`). | No | `deployment` |
| `AGE_CRITERIA` | Pods older than this age, in seconds, are excluded from the check. | No | `300` |
| `STARTUP_DURATION_CUTOFF` | All pods must start within this duration, in seconds. | No | `300` |
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
  issue="Pod Startup Time Check probe fails because pods started too slowly"
  mode="general"
  fallback="One or more pods took longer than STARTUP_DURATION_CUTOFF to become ready. Inspect the pods with kubectl describe pod to find slow image pulls, init containers, or readiness probe delays, then either tune the workload or raise STARTUP_DURATION_CUTOFF if the longer startup is acceptable."
/>

<Troubleshoot
  issue="Pod Startup Time Check probe fails because no pods matched the target"
  mode="general"
  fallback="The selectors did not resolve any pods, or all matching pods were excluded by AGE_CRITERIA. Confirm that TARGET_LABELS, TARGET_NAMES, TARGET_NAMESPACE, and TARGET_KIND match the workload, and that AGE_CRITERIA is large enough to include the pods you want to check."
/>

<Troubleshoot
  issue="Pod Startup Time Check probe fails with a forbidden or RBAC error"
  mode="general"
  fallback="The chaos service account does not have permission to read pods or events in the target namespace. Grant get and list on pods and events for the chaos service account in that namespace, then rerun the experiment."
/>

---

## Related probe templates

- [Pod Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-status-check): Validate that pods stay in the Running state.
- [Pod Replica Count Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-replica-count-check): Validate that a workload keeps its minimum healthy replicas.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
