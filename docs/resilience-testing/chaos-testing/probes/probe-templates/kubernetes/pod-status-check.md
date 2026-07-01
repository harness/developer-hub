---
id: pod-status-check
title: Pod Status Check
sidebar_label: Pod Status Check
description: Built-in Command Probe template that validates the current state of Kubernetes pods during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - kubernetes probe
  - pod status
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - kubernetes-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod Status Check is a built-in Command Probe template that validates the current state of Kubernetes pods during a chaos experiment. It confirms that the targeted pods reach the expected `Running` state, which makes it one of the most fundamental checks for application availability. You select pods by label, by name, or by the owning workload kind and namespace.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Kubernetes API, and prints `[Pass]` when every targeted pod is healthy. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Verify that pods stay in the `Running` state during chaos experiments.
- Validate pod health after failures and restarts.
- Monitor application availability continuously.
- Confirm that pods recover to a healthy state after disruptions.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name pod-level`. The utility resolves the target pods from `TARGET_LABELS`, `TARGET_NAMES`, `TARGET_KIND`, and `TARGET_NAMESPACE`, queries the Kubernetes API, and prints `[Pass]` when every resolved pod is in a healthy `Running` state. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure installed in the target cluster.
- **Namespace access:** Access to the target namespace and pods.
- **RBAC permissions:** Permissions for the chaos service account to query pod status.

---

## Probe properties

### Command

```bash
healthchecks -name pod-level
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that every targeted pod is in a healthy `Running` state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of labels used to filter pods (for example, `app=nginx,tier=frontend`). | No | - |
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
  issue="Pod Status Check probe fails because no pods matched the target"
  mode="general"
  fallback="The selectors did not resolve any pods. Confirm that TARGET_LABELS, TARGET_NAMES, and TARGET_NAMESPACE match running pods, and that TARGET_KIND matches the owning workload. An empty match is treated as a failure."
/>

<Troubleshoot
  issue="Pod Status Check probe fails with a forbidden or RBAC error"
  mode="general"
  fallback="The chaos service account does not have permission to read pods in the target namespace. Grant get and list on pods for the chaos service account in that namespace, then rerun the experiment."
/>

<Troubleshoot
  issue="Pod Status Check probe times out before pods reach Running"
  mode="general"
  fallback="The pods did not reach a healthy Running state within STATUS_CHECK_TIMEOUT. Increase STATUS_CHECK_TIMEOUT and the run-property timeout, and inspect the pods with kubectl describe pod to find pending, crash-loop, or image-pull issues."
/>

---

## Related probe templates

- [Container Restart Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/container-restart-check): Validate that container restart counts stay within a threshold.
- [Pod Replica Count Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-replica-count-check): Validate that a workload keeps its minimum healthy replicas.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
