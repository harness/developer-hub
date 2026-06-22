---
id: kubelet-density
title: Kubelet density
sidebar_label: Kubelet Density
description: Create a configurable number of pods on a target Kubernetes node so you can test how the node, kubelet, and workload behave during a sudden pod-storm.
keywords:
  - chaos engineering
  - kubelet density
  - kube resilience
  - kubernetes fault
tags:
  - chaos-engineering
  - kube-resilience
  - kubernetes-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/kube-resilience/kubelet-density
- /docs/chaos-engineering/chaos-faults/kube-resilience/kubelet-density
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Kubelet density is a chaos fault that creates `POD_COUNT` pods on the target Kubernetes node (`TARGET_NODE`) for `TOTAL_CHAOS_DURATION`, then deletes them. The pods are scheduled with a node selector or affinity that pins them to the target node, so the kubelet on that node has to handle a sudden burst of pod-create requests in a short window.

Use this fault to test how a node, the kubelet, the container runtime, and any co-located workloads behave under a pod-storm: whether the kubelet stays responsive, whether image pulls and CNI setup keep up, whether the HPA reacts correctly, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Kubelet resilience:** When `POD_COUNT` pods land on `TARGET_NODE` at once, does the kubelet stay responsive (heartbeats, status updates) inside its SLA?
- **Pod-create throughput:** Does the API server / scheduler / kubelet handle the burst inside the target latency, or do scheduling backlogs and `ContainerCreating` queues build up?
- **HPA fidelity:** Does horizontal pod autoscaling react inside the alerting SLA when load suddenly grows on the targeted node?
- **Topology constraints:** Do node selectors, tolerations, affinity/anti-affinity, topology spread constraints, and zone distribution stay enforced during a pod-storm?
- **Workload impact:** Do co-located workloads on the same node degrade (CPU, memory, network) when the storm hits, and do their alerts fire correctly?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the cluster running the chaos infrastructure.
- **Target node reachable:** `TARGET_NODE` exists in the cluster and is in `Ready` state. If `TARGET_NODE` is empty, the fault selects a random ready node.
- **Headroom on the target node:** The node has enough allocatable CPU, memory, pod count (kubelet `--max-pods`), and image-pull bandwidth to host `POD_COUNT` extra pods.
- **Image accessible:** `POD_IMAGE` is pullable from the cluster (or the default `gcr.io/google_containers/pause-amd64:3.0` is reachable).
- **RBAC granted:** The chaos service account has the permissions listed under [Permissions required](#permissions-required).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Self-hosted Kubernetes (1.21+) | Supported |
| Managed Kubernetes (EKS, GKE, AKS, OKE) | Supported |
| OpenShift | Supported |
| Minikube / Kind | Supported (use small `POD_COUNT` values) |
| Cluster autoscaler enabled | Supported (the fault targets one node, so autoscaler should not interfere) |

---

## Permissions required

This fault is classified as an **Advanced** Kube-resilience fault. The chaos service account needs the following Kubernetes RBAC permissions in the namespace where the helper pods are created (or cluster-scoped if `TARGET_NAMESPACE` differs from the chaos namespace).

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: hce
  name: kubelet-density
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["create", "delete", "get", "list", "patch", "deletecollection", "update"]
  - apiGroups: [""]
    resources: ["events"]
    verbs: ["create", "get", "list", "patch", "update"]
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list"]
  - apiGroups: ["litmuschaos.io"]
    resources: ["chaosengines", "chaosexperiments", "chaosresults"]
    verbs: ["create", "delete", "get", "list", "patch", "update"]
  - apiGroups: [""]
    resources: ["pods/log"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["get", "list"]
  - apiGroups: ["batch"]
    resources: ["jobs"]
    verbs: ["create", "delete", "get", "list", "deletecollection"]
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["get", "list"]
```

---

## Fault tunables

Configure the following fault parameters when you add Kubelet density to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_NODE` | Name of the target node where the storm pods are created. Leave empty to pick a random ready node. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault, in seconds. The pods stay running on the target node for this period. | `60` |
| `POD_COUNT` | Number of pods to create on the target node during the chaos window. | `50` |
| `TARGET_NAMESPACE` | Namespace where the storm pods are created. Empty defaults to the chaos infrastructure namespace. | `""` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Pod template parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `POD_IMAGE` | Container image for each storm pod. The default is a small `pause` image so the storm exercises kubelet, not the runtime. | `gcr.io/google_containers/pause-amd64:3.0` |
| `POD_SELECTOR` | Label selector applied to the storm pods (also used to clean them up at the end). | `{name: kubelet-density-app}` |
| `POD_TEMPLATE_CM` | Name of a ConfigMap that contains a custom pod template (`spec` only). Empty uses the default template. | `""` |
| `POD_TEMPLATE_PATH` | Path inside the ConfigMap mount where the pod template YAML is read from. | `/templates/pod.yml` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Schedules `POD_COUNT` pods (each using `POD_IMAGE` or the template from `POD_TEMPLATE_CM`) onto `TARGET_NODE`, waits for `TOTAL_CHAOS_DURATION`, then deletes every pod matching `POD_SELECTOR` from `TARGET_NAMESPACE`.

---

## Expected behavior during fault execution

- The target node sees a sudden burst of `Pending` → `ContainerCreating` → `Running` transitions for `POD_COUNT` extra pods.
- Kubelet metrics (`kubelet_runtime_operations_duration_seconds`, `kubelet_pod_start_duration_seconds`) shift upward.
- Node allocatable resources shrink; co-located workloads may degrade on CPU, memory, network, or PIDs.
- The HPA on the workload (if configured) may scale up in response to the load.
- After the duration ends, the storm pods are deleted; node resources return to baseline as the runtime tears them down.

:::info When the fault ends
The chaos pod deletes every pod matching `POD_SELECTOR` in `TARGET_NAMESPACE`. Node-level usage and kubelet metrics return to baseline within a few seconds as the runtime reclaims resources.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Kubelet health:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `kubelet_pod_start_duration_seconds` and assert the p95 stays inside the SLA.
- **Pod scheduling:** Use a Prometheus probe on `scheduler_pending_pods` and assert the queue drains within the expected window.
- **Workload availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint served by pods that share the target node.
- **Autoscaling:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `kubectl get hpa <name> -o jsonpath='{.status.currentReplicas}'` and assert the HPA reacted.

---

## Verify the fault execution effect

While the experiment is running, confirm the storm pods were created and then cleaned up:

1. **List the storm pods on the target node.**

   ```bash
   kubectl get pods -n <TARGET_NAMESPACE> -l name=kubelet-density-app -o wide
   ```

   The output should list `POD_COUNT` pods, all scheduled on `TARGET_NODE`, during the chaos window.

2. **Inspect the node's pod density.**

   ```bash
   kubectl describe node <TARGET_NODE> | grep -E "Non-terminated Pods|Allocatable|Allocated"
   ```

   Allocated CPU / memory / pod count should rise during the chaos window and fall back afterwards.

3. **Inspect kubelet log on the node (if you have SSH).**

   ```bash
   sudo journalctl -u kubelet -n 200 --no-pager | grep -E "PodWorkers|SyncLoop|image"
   ```

   Look for pod-create activity during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod deletes every pod matching `POD_SELECTOR` in `TARGET_NAMESPACE` when `TOTAL_CHAOS_DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the cleanup delete.
- **Manual recovery:** If the storm pods survive an abort, delete them with `kubectl delete pods -n <TARGET_NAMESPACE> -l name=kubelet-density-app`.
- **Workload recovery:** Co-located workloads recover as soon as the storm pods are removed; the HPA may scale back in over its own cooldown.

---

## Limitations

- **Single node per run:** Each fault run targets one node (`TARGET_NODE`). Use multiple experiments to stress more than one node.
- **Kubelet `max-pods`:** If `POD_COUNT` plus the node's existing pods exceeds the kubelet `--max-pods` (default `110`), the extras stay `Pending`.
- **Image pull contention:** If `POD_IMAGE` is large or not cached, image-pull bandwidth dominates the storm; use the default `pause` image to focus on kubelet behaviour.
- **Cluster autoscaler:** When enabled, the cluster autoscaler may not react because the fault targets one specific node, not unschedulable pods.
- **No mid-flight resize:** `POD_COUNT` cannot be adjusted during the chaos window; abort and re-run to change it.

---

## Troubleshooting

<Troubleshoot
  issue="Kubelet density storm pods stay Pending in Harness Chaos Engineering"
  mode="docs"
  fallback="The target node may not have allocatable headroom for POD_COUNT extra pods. Check kubectl describe node TARGET_NODE for Allocatable vs Allocated. Either reduce POD_COUNT or pick a less-loaded node."
/>

<Troubleshoot
  issue="ImagePullBackOff on storm pods"
  mode="docs"
  fallback="POD_IMAGE must be reachable from every node in the cluster. The default gcr.io/google_containers/pause-amd64:3.0 is small and widely cached. If your nodes cannot reach gcr.io, mirror the image to your own registry and pass it via POD_IMAGE."
/>

<Troubleshoot
  issue="Storm pods landed on a different node"
  mode="docs"
  fallback="Confirm TARGET_NODE matches kubectl get nodes exactly. If TARGET_NODE is empty, the fault picks a random ready node. Check taints on the target node (kubectl describe node) - the default template does not tolerate taints."
/>

<Troubleshoot
  issue="Storm pods remained after the experiment ended"
  mode="docs"
  fallback="If the cleanup delete failed (for example because the chaos pod aborted ungracefully), run kubectl delete pods -n TARGET_NAMESPACE -l name=kubelet-density-app to remove them manually."
/>

---

## Related faults

- [Node CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-cpu-hog): Stress CPU on a node instead of overloading the kubelet with pod creates.
- [Node memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-memory-hog): Stress memory on a node instead of pod density.
- [Pod delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete): Delete existing pods instead of creating a burst.
