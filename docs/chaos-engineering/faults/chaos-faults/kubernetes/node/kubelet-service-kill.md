---
id: kubelet-service-kill
title: Kubelet service kill
sidebar_label: Kubelet Service Kill
description: Stop the kubelet on a Kubernetes node to simulate node loss without rebooting, and test eviction, rescheduling, and recovery behavior.
keywords:
  - chaos engineering
  - kubelet service kill
  - node notready
  - kubelet
  - pod eviction
  - kubernetes node fault
tags:
  - chaos-engineering
  - node-faults
  - lifecycle-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/kubelet-service-kill
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/kubelet-service-kill
  - /docs/chaos-engineering/chaos-faults/kubernetes/kubelet-service-kill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Kubelet service kill is a Kubernetes node-level chaos fault that stops the kubelet on a target node for a configurable duration. Harness Chaos Engineering schedules a privileged helper pod (`harness/chaos-ddcr-faults`) on the node, which enters the host's PID namespace and stops the kubelet systemd service. Without a running kubelet, the node lease stops renewing, the controller-manager marks the node `NotReady`, and the taint manager evicts the pods. When the fault duration ends, the helper restarts the kubelet and the node rejoins the cluster.

Use this fault to simulate a kubelet-only outage: a misconfigured upgrade that breaks the kubelet binary, a configuration push that crashes the kubelet on startup, or an operator stopping the kubelet for in-place maintenance. The cluster's reaction is similar to a network partition or a sudden reboot, but the node itself stays up and recovers faster.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Stateful workload recovery from kubelet-only outage:** Do databases, message brokers, and StatefulSet replicas (PostgreSQL, Kafka, Cassandra, etcd) survive the eviction cascade and recover within your SLO?
- **Difference between kubelet outage and full node loss:** Does your alerting distinguish a kubelet outage (where the underlying VM and applications keep running but become unobservable) from a real node loss?
- **Eviction window tuning:** Are `tolerationSeconds` on critical workloads tuned correctly, so that short kubelet hiccups do not unnecessarily evict pods?
- **DaemonSet and CNI agent behavior:** When the kubelet returns, do DaemonSets, CNI agents, and other critical infrastructure pods come back cleanly?
- **PVC and storage reattachment:** Do PVs detach from the `NotReady` node and reattach to the rescheduling node, especially for cloud block storage backed by attach/detach controllers?
- **Faster-recovery alternative to node-restart:** Use this fault when you want the `NotReady` signal without paying the full cost of a reboot, for example to test eviction repeatedly in an experiment loop.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Kubelet runs as a systemd service:** The fault stops the kubelet via `systemctl stop kubelet`. On nodes that run the kubelet differently (containerized, static manifest only, supervisord-managed), this fault does not work.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods with `hostPID` and the required capabilities in the chaos namespace. The helper pod must enter the host's PID namespace to control systemd.
- **Container runtime socket:** The chaos infrastructure has access to the container runtime socket on the target nodes.
- **Node readiness:** Target nodes are in `Ready` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Chaos infrastructure isolation:** The chaos infrastructure pods are not scheduled on the node you are about to take down. If they are evicted along with everything else, the fault loses observability and may fail to restart the kubelet.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EKS | Supported |
| Azure AKS | Supported |
| Google GKE | Supported |
| Red Hat OpenShift | Supported |
| Rancher | Supported |
| VMware Tanzu | Supported |
| Self-managed Kubernetes (CNCF-certified) | Supported |

---

## Permissions required

The fault runs under the chaos infrastructure's service account. The account must be able to perform the following operations against the target cluster.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Create the helper pod that stops and restarts the kubelet on the target node |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream logs from the helper pod for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `nodes` (`""`) | `get`, `list` | Discover target nodes and validate selectors |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope.

---

## Fault tunables

Configure the following fault parameters when you add Kubelet service kill to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration the kubelet stays stopped before it is restarted, in seconds. | `60` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_NODE` | Name of the node whose kubelet to stop. | `""` |
| `NODE_LABEL` | Label selector for choosing the target node when `TARGET_NODE` is not set. Go to [target nodes with labels](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels) to read more. | `""` |
| `SEQUENCE` | When multiple nodes match the label selector, kill kubelets `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning Default duration crosses the eviction window only partially
At the default `TOTAL_CHAOS_DURATION` of 60 seconds, the node will flip to `NotReady` (after roughly 50 seconds of missed lease renewals), but pods typically will not be evicted because the default `tolerationSeconds` is 300 seconds. To exercise the eviction path, raise `TOTAL_CHAOS_DURATION` to at least 400 seconds, or set lower `tolerationSeconds` on the workloads under test.
:::

---

## Fault execution in brief

The cluster cannot tell the difference between a kubelet that has been stopped and a kubelet that has lost its network. Both produce the same signal: node lease renewals stop. The eviction path is therefore identical to [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss):

| Stage | What happens |
| --- | --- |
| Stop | Helper enters host PID namespace, runs `systemctl stop kubelet`. The kubelet exits cleanly. Application pods on the node keep running because their containers are managed by the container runtime, not the kubelet. |
| Lease expiry | After roughly `node-monitor-grace-period` (40 to 50 seconds), the controller-manager flips the node to `Ready=Unknown` and applies the `node.kubernetes.io/unreachable:NoExecute` taint. |
| Eviction | Pods tolerate the taint for `tolerationSeconds: 300` by default. After that, the taint manager evicts them. Deployment pods reschedule on other Ready nodes. |
| Restart | At the end of `TOTAL_CHAOS_DURATION`, the helper runs `systemctl start kubelet`. The kubelet renews its lease, the controller-manager removes the taint, and the node is `Ready` again. |

---

## Expected behavior during fault execution

- The application containers on the node keep running while the kubelet is stopped. The container runtime (`containerd` or equivalent) owns them; the kubelet only watches them.
- Liveness and readiness probes are executed by the kubelet, so they stop firing while it is down. Container restarts triggered by failing probes do not happen during the outage.
- New pod placement on the node is blocked because the scheduler cannot get the node's status and the kubelet cannot acknowledge admission. Pods already scheduled but not yet started by the kubelet may remain in `ContainerCreating`.
- The `NotReady` transition and the `NoExecute` taint follow the same defaults as a network partition: roughly 50 seconds for `node-monitor-grace-period` and 300 seconds for `tolerationSeconds`.
- When the kubelet restarts, it picks up the existing containers via the container runtime and resumes managing them. It does not recreate anything that was already running. Probes resume firing immediately.
- StatefulSet pods that were evicted but whose containers are still alive on the node leave the controller in an awkward state when the kubelet returns: the controller sees a `Terminating` pod that the kubelet now reports as `Running`. Force-delete is usually required to reconcile.

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Cluster state:** Run `kubectl get node <name> -w` to confirm the `NotReady` → `Ready` cycle and `kubectl get pods --field-selector spec.nodeName=<name> -o wide -w` to track eviction. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) or the [node status check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/node-status-check) template to validate that the node returns to `Ready` within your acceptable window.
- **Application service-level indicators:** Watch error rate and request availability for workloads whose pods are on the affected node. The signal that matters is whether traffic continued to flow (because the containers themselves are still running) or whether the eviction took out enough replicas to break the workload. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint health.
- **Platform signals:** Track PV attach/detach metrics, controller-manager taint events, and kubelet logs once it returns. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) or an [APM probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail the experiment when the node does not return to `Ready` within the expected window.

---

## Verify the fault execution effect

While the experiment is running, confirm that the kubelet is actually stopped. From a workstation with `kubectl` access:

1. **Confirm the helper pod is on the target node.**

   ```bash
   kubectl get pods -n <chaos-namespace> -o wide | grep kubelet-service-kill-helper
   ```

   The pod's `NODE` column must match the target node and its status must be `Running`.

2. **Watch the node transition to `NotReady`.**

   ```bash
   kubectl get node <target-node> -w
   ```

   Expect `Ready` → `NotReady` within roughly one minute, then `NotReady` → `Ready` after `TOTAL_CHAOS_DURATION` ends.

3. **Inspect kubelet status on the node** (from a debug pod):

   ```bash
   kubectl debug node/<target-node> -it --image=ubuntu -- chroot /host \
     bash -c "systemctl status kubelet"
   ```

   While the fault is active, the status should be `inactive (dead)`. After the fault, it should return to `active (running)`.

4. **Verify application containers kept running.**

   ```bash
   kubectl debug node/<target-node> -it --image=ubuntu -- chroot /host \
     bash -c "crictl ps | head"
   ```

   The user-workload containers should remain in the runtime's process list while the kubelet is stopped, even though the kubelet's view of them is frozen.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the helper restarts the kubelet. Lease renewals resume within seconds, the controller-manager removes the `NoExecute` taint, and the node returns to `Ready`.
- **Evicted Deployment pods do not migrate back:** Pods that were evicted during the outage stay on the replacement nodes the scheduler placed them on.
- **Terminating StatefulSet pods:** Force-delete to release the StatefulSet identity slot:

  ```bash
  kubectl delete pod <pod-name> -n <namespace> --force --grace-period=0
  ```

- **Pods stuck in `ContainerCreating`:** Pods scheduled onto the node during the outage may stay in `ContainerCreating` until the kubelet returns. They normally proceed automatically once it does.
- **If the helper pod is killed mid-experiment:** The kubelet may stay stopped past `TOTAL_CHAOS_DURATION`. Restart it manually:

  ```bash
  kubectl debug node/<target-node> -it --image=ubuntu -- chroot /host \
    bash -c "systemctl start kubelet"
  ```

- **Abort the experiment early:** Stop the experiment from Harness Chaos Studio. The helper pod terminates and starts the kubelet back up before exiting.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes, GKE Autopilot):** Fargate and ACI virtual nodes do not expose a manageable kubelet. GKE Autopilot does not allow the privileged `hostPID` access this fault requires.
- **Nodes where kubelet is not a systemd service:** Some distributions run the kubelet as a static-pod manifest managed by the container runtime, or under a different init system. `systemctl stop kubelet` does nothing on those nodes.
- **Windows nodes:** The kubelet on Windows is a Windows service, not a systemd unit. Use a Windows-equivalent fault.
- **Single-node clusters:** Stopping the kubelet on the only node takes the entire cluster control plane down for the duration. The chaos infrastructure itself loses observability.
- **Co-located chaos infrastructure:** If the chaos infrastructure pods live on the affected node, they may be evicted by the `NoExecute` taint long before they can restart the kubelet. Schedule chaos infrastructure on a node outside the blast radius.
- **Short durations only:** At the default `TOTAL_CHAOS_DURATION` of 60 seconds, you observe the `NotReady` transition but not pod eviction (which requires crossing `tolerationSeconds: 300`). To test eviction, raise the duration beyond 5 minutes or lower the workload's `tolerationSeconds`.

---

## Troubleshooting

<Troubleshoot
  issue="Kubelet service kill helper pod stays Pending or never schedules on the target node in Harness Chaos Engineering"
  mode="docs"
  fallback="Check the helper pod with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the helper does not tolerate, a PodSecurity admission policy blocking privileged or hostPID pods, or insufficient capacity on the node. Add the required tolerations, run the experiment in a namespace with privileged Pod Security level, or free resources on the node."
/>

<Troubleshoot
  issue="kubelet-service-kill helper reports 'Unit kubelet.service not loaded' on the target node"
  mode="docs"
  fallback="The node does not run the kubelet as a systemd service, or the unit is named differently (some distributions use kubelet.target or a wrapper unit). SSH or kubectl debug into the node and run systemctl list-units | grep -i kubelet to find the correct unit. This fault does not currently support runtime-specific kubelet wrappers; use Node restart for those distributions."
/>

<Troubleshoot
  issue="Node does not return to Ready after kubelet-service-kill completes"
  mode="docs"
  fallback="The helper pod was killed (often by the NoExecute taint it indirectly applied) before it could run systemctl start kubelet. Start the kubelet manually with kubectl debug node/<target-node> -it --image=ubuntu -- chroot /host bash -c 'systemctl start kubelet', then check journalctl -u kubelet on the node for startup errors. For future runs, ensure chaos infrastructure is scheduled on a different node."
/>

<Troubleshoot
  issue="Pods on the target node were not evicted during kubelet-service-kill"
  mode="docs"
  fallback="The default TOTAL_CHAOS_DURATION of 60 seconds is shorter than the default pod tolerationSeconds of 300 seconds. Pods notice the NotReady transition but the taint manager does not evict them within the experiment window. To test eviction, raise TOTAL_CHAOS_DURATION above 400 seconds or set lower tolerationSeconds on the workloads under test."
/>

<Troubleshoot
  issue="StatefulSet pods stay Terminating after kubelet-service-kill recovers"
  mode="docs"
  fallback="When the kubelet returns, it sees existing containers and reports them as Running, but the StatefulSet controller already marked the pod as Terminating during the outage. The controller will not recreate a pod that still exists with the same identity. Force-delete with kubectl delete pod <name> -n <namespace> --force --grace-period=0, then confirm the new pod takes over cleanly."
/>

---

## Related faults

- [Node restart](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-restart): Full node reboot. Same `NotReady` cascade but containers are killed too. Use it to test sudden node loss including container state loss.
- [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss): Same `NotReady` cascade caused by network partition rather than missing kubelet. Use it to test partition-handling specifically.
- [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain): Graceful eviction respecting PDB. Use it to test the planned-maintenance path.
- [Common node fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults): Shared environment variables for selecting target nodes across node faults.
