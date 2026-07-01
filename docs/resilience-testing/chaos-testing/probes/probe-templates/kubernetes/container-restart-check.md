---
id: container-restart-check
title: Container Restart Check
sidebar_label: Container Restart Check
description: Built-in Command Probe template that validates whether container restart counts stay within an acceptable threshold during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - kubernetes probe
  - container restart count
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - kubernetes-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Container Restart Check is a built-in Command Probe template that validates whether the restart count of a container stays within an acceptable threshold during a chaos experiment. Use it to confirm that a workload does not enter a restart or crash loop while a fault stresses the application. You select pods by label, by name, or by the owning workload kind and namespace.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Kubernetes API, and prints `[Pass]` when the restart count of the targeted container is at or below `CONTAINER_RESTART`. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Verify that containers do not restart excessively during chaos experiments.
- Monitor container stability during resource stress.
- Validate application resilience to failures.
- Confirm that pods maintain healthy restart counts.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name validate-container-restart`. The utility resolves the target pods from `TARGET_LABELS`, `TARGET_NAMES`, `TARGET_KIND`, and `TARGET_NAMESPACE`, reads the restart count of the container named in `TARGET_CONTAINER`, and prints `[Pass]` when the count is at or below `CONTAINER_RESTART`. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure installed in the target cluster.
- **Namespace access:** Access to the target namespace and pods.
- **RBAC permissions:** Permissions for the chaos service account to query pod status.

---

## Probe properties

### Command

```bash
healthchecks -name validate-container-restart
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that container restart counts are at or below the acceptable threshold.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of labels used to filter pods (for example, `app=nginx,env=prod`). | No | - |
| `TARGET_NAMES` | Comma-separated list of target pod names. | No | - |
| `TARGET_NAMESPACE` | Namespace of the target pods. | Yes | - |
| `TARGET_KIND` | Kind of the owning workload (for example, `deployment`, `statefulset`, `daemonset`). | No | `deployment` |
| `TARGET_CONTAINER` | Name of the container to check the restart count for. | No | - |
| `CONTAINER_RESTART` | Maximum allowed restart count. The restart count must be equal to or less than this value. | No | `1` |
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
  issue="Container Restart Check probe fails because the container exceeded the restart threshold"
  mode="general"
  fallback="The container restart count is higher than CONTAINER_RESTART, which usually means the workload is crash-looping under the injected fault. Inspect the pod with kubectl describe pod and check container logs with kubectl logs --previous to find the crash cause, then either fix the workload or raise CONTAINER_RESTART if a higher count is acceptable."
/>

<Troubleshoot
  issue="Container Restart Check probe fails because no pods or containers matched"
  mode="general"
  fallback="The selectors did not resolve any pods, or TARGET_CONTAINER did not match a container in the resolved pods. Confirm that TARGET_LABELS, TARGET_NAMES, TARGET_NAMESPACE, and TARGET_KIND identify the workload, and that TARGET_CONTAINER matches a container name in the pod spec."
/>

<Troubleshoot
  issue="Container Restart Check probe fails with a forbidden or RBAC error"
  mode="general"
  fallback="The chaos service account does not have permission to read pods in the target namespace. Grant get and list on pods for the chaos service account in that namespace, then rerun the experiment."
/>

---

## Related probe templates

- [Pod Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-status-check): Validate that pods stay in the Running state.
- [Pod Warnings Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-warnings-check): Detect warning events in pod events.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
