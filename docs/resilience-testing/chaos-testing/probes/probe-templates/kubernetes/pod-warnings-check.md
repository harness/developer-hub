---
id: pod-warnings-check
title: Pod Warnings Check
sidebar_label: Pod Warnings Check
description: Built-in Command Probe template that checks for warning events on Kubernetes pods during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - kubernetes probe
  - pod warning events
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - kubernetes-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod Warnings Check is a built-in Command Probe template that checks for warning events on the targeted Kubernetes pods during a chaos experiment. Use it to detect problems such as image pull errors, scheduling failures, and resource constraints that surface as warning events while a fault is injected. You select pods by label, by name, or by the owning workload kind and namespace.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Kubernetes event API, and prints `[Pass]` when no warning events are found on the targeted pods. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Monitor pod health indicators during chaos experiments.
- Detect configuration issues during experiments.
- Validate application behavior under stress.
- Identify potential problems before they become critical.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name validate-pod-failure`. The utility resolves the target pods from `TARGET_LABELS`, `TARGET_NAMES`, `TARGET_KIND`, and `TARGET_NAMESPACE`, reads their events through the Kubernetes API, and prints `[Pass]` when no warning events are present. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure installed in the target cluster.
- **Namespace access:** Access to the target namespace and pods.
- **RBAC permissions:** Permissions for the chaos service account to query pod events.

---

## Probe properties

### Command

```bash
healthchecks -name validate-pod-failure
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that no warning events were found on the targeted pods.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of labels used to filter pods (for example, `app=nginx`). | No | - |
| `TARGET_NAMES` | Comma-separated list of target pod names. | No | - |
| `TARGET_NAMESPACE` | Namespace of the target pods. | Yes | - |
| `TARGET_KIND` | Kind of the owning workload (for example, `deployment`, `statefulset`, `daemonset`). | No | `deployment` |
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
  issue="Pod Warnings Check probe fails because warning events were found"
  mode="general"
  fallback="The targeted pods have warning events, which is the condition this probe detects. Run kubectl describe pod or kubectl get events --field-selector type=Warning in the target namespace to read the warnings, then address the underlying cause such as failed image pulls, scheduling failures, or readiness probe failures."
/>

<Troubleshoot
  issue="Pod Warnings Check probe fails because no pods matched the target"
  mode="general"
  fallback="The selectors did not resolve any pods. Confirm that TARGET_LABELS, TARGET_NAMES, TARGET_NAMESPACE, and TARGET_KIND match running pods. An empty match is treated as a failure."
/>

<Troubleshoot
  issue="Pod Warnings Check probe fails with a forbidden or RBAC error"
  mode="general"
  fallback="The chaos service account does not have permission to read pods or events in the target namespace. Grant get and list on pods and events for the chaos service account in that namespace, then rerun the experiment."
/>

---

## Related probe templates

- [Pod Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-status-check): Validate that pods stay in the Running state.
- [Container Restart Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/container-restart-check): Validate that container restart counts stay within a threshold.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
