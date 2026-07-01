---
id: node-status-check
title: Node Status Check
sidebar_label: Node Status Check
description: Built-in Command Probe template that validates the current state of Kubernetes nodes during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - kubernetes probe
  - node status
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - kubernetes-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Node Status Check is a built-in Command Probe template that validates the current state of Kubernetes nodes during a chaos experiment. It confirms that the targeted nodes stay healthy and `Ready`, so you can assert that cluster capacity holds up while a node-level fault is injected. You select nodes by name or by label.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Kubernetes API, and prints `[Pass]` when every targeted node is healthy. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Verify that nodes stay healthy during chaos experiments.
- Validate node recovery after failures.
- Monitor cluster health during node-level chaos.
- Confirm node availability during infrastructure disruptions.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name node-level`. The utility resolves the target nodes from `TARGET_NODE`, `TARGET_NODES`, or `NODE_LABEL`, queries the Kubernetes API, and prints `[Pass]` when every resolved node is in a healthy state. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure installed in the target cluster.
- **Node access:** Access to the cluster nodes you want to check.
- **RBAC permissions:** Permissions for the chaos service account to query node status.

---

## Probe properties

### Command

```bash
healthchecks -name node-level
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that every targeted node is in a healthy state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_NODE` | Comma-separated list of nodes to check. Provide one of `TARGET_NODE`, `TARGET_NODES`, or `NODE_LABEL`. | Conditional | - |
| `TARGET_NODES` | Comma-separated list of nodes to check. Provide one of `TARGET_NODE`, `TARGET_NODES`, or `NODE_LABEL`. | Conditional | - |
| `NODE_LABEL` | Node label used to list nodes to check (for example, `node-role.kubernetes.io/worker=`). Provide one of `TARGET_NODE`, `TARGET_NODES`, or `NODE_LABEL`. | Conditional | - |
| `STATUS_CHECK_TIMEOUT` | Maximum time in seconds to wait for the status check. | No | `180` |
| `STATUS_CHECK_DELAY` | Delay in seconds between status checks. | No | `2` |

:::info Node selection
Provide at least one of `TARGET_NODE`, `TARGET_NODES`, or `NODE_LABEL`.
:::

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
  issue="Node Status Check probe fails because no nodes matched the target"
  mode="general"
  fallback="The selectors did not resolve any nodes. Confirm that the values in TARGET_NODE or TARGET_NODES match node names exactly, or that NODE_LABEL matches a label applied to the nodes. An empty match is treated as a failure."
/>

<Troubleshoot
  issue="Node Status Check probe fails with a forbidden or RBAC error"
  mode="general"
  fallback="The chaos service account does not have permission to read nodes. Nodes are cluster-scoped, so grant get and list on nodes through a ClusterRole and ClusterRoleBinding for the chaos service account, then rerun the experiment."
/>

<Troubleshoot
  issue="Node Status Check probe times out before the node becomes Ready"
  mode="general"
  fallback="The node did not return to a Ready state within STATUS_CHECK_TIMEOUT. Increase STATUS_CHECK_TIMEOUT and the run-property timeout, and inspect the node with kubectl describe node to find NotReady conditions, taints, or kubelet issues."
/>

---

## Related probe templates

- [Pod Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-status-check): Validate that pods stay in the Running state.
- [Pod Replica Count Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-replica-count-check): Validate that a workload keeps its minimum healthy replicas.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
