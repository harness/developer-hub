---
id: pod-replica-count-check
title: Pod Replica Count Check
sidebar_label: Pod Replica Count Check
description: Built-in Command Probe template that validates whether a Kubernetes workload keeps its minimum healthy replica count during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - kubernetes probe
  - replica count
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - kubernetes-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod Replica Count Check is a built-in Command Probe template that validates whether a Kubernetes workload keeps at least a minimum number of healthy replicas during a chaos experiment. Use it to confirm that a Deployment, StatefulSet, or DaemonSet maintains availability while a fault removes or disrupts pods. You select the workload by label, by name, or by the owning workload kind and namespace.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Kubernetes API, and prints `[Pass]` when the workload has at least `MINIMUM_HEALTHY_REPLICA_COUNT` healthy replicas. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Verify that deployments maintain the desired replica count.
- Validate auto-scaling behavior during load chaos.
- Monitor application availability during pod failures.
- Confirm high availability during chaos experiments.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name validate-pod-replica`. The utility resolves the target workloads from `TARGET_LABELS`, `TARGET_NAMES`, `TARGET_KIND`, and `TARGET_NAMESPACE`, queries the Kubernetes API, and prints `[Pass]` when the number of healthy replicas is at or above `MINIMUM_HEALTHY_REPLICA_COUNT`. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure installed in the target cluster.
- **Namespace access:** Access to the target namespace and resources.
- **RBAC permissions:** Permissions for the chaos service account to query resource status.

---

## Probe properties

### Command

```bash
healthchecks -name validate-pod-replica
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that the workload has at least the minimum required healthy replicas.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of labels used to filter resources (for example, `app=nginx,tier=frontend`). | No | - |
| `TARGET_NAMES` | Comma-separated list of target resource names. | No | - |
| `TARGET_NAMESPACE` | Namespace of the target resources. | Yes | - |
| `TARGET_KIND` | Kind of the target resource (for example, `deployment`, `statefulset`, `daemonset`). | No | `deployment` |
| `MINIMUM_HEALTHY_REPLICA_COUNT` | Minimum healthy replica count required for the target. | No | `1` |
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
  issue="Pod Replica Count Check probe fails because the workload dropped below the minimum"
  mode="general"
  fallback="The number of healthy replicas is below MINIMUM_HEALTHY_REPLICA_COUNT, which usually means the injected fault removed more pods than the workload could replace in time. Inspect the workload with kubectl get deployment or kubectl describe to confirm replica counts, check whether the cluster has capacity to schedule replacements, and increase STATUS_CHECK_TIMEOUT so the probe waits for recovery."
/>

<Troubleshoot
  issue="Pod Replica Count Check probe fails because no resources matched the target"
  mode="general"
  fallback="The selectors did not resolve any workloads. Confirm that TARGET_LABELS, TARGET_NAMES, and TARGET_NAMESPACE match the workload, and that TARGET_KIND matches the resource type (deployment, statefulset, or daemonset). An empty match is treated as a failure."
/>

<Troubleshoot
  issue="Pod Replica Count Check probe fails with a forbidden or RBAC error"
  mode="general"
  fallback="The chaos service account does not have permission to read the target workload in the namespace. Grant get and list on the relevant resource type (deployments, statefulsets, or daemonsets) and on pods for the chaos service account, then rerun the experiment."
/>

---

## Related probe templates

- [Pod Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-status-check): Validate that pods stay in the Running state.
- [Pod Startup Time Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-startup-time-check): Validate that pods start within a duration.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
