---
id: container-kill
title: Container kill
sidebar_label: Container Kill
description: Kill a specific container inside a Kubernetes pod to test restart loops, sidecar resilience, probe tuning, and multi-container coordination.
keywords:
  - chaos engineering
  - container kill
  - container restart
  - sidecar resilience
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - lifecycle-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/container-kill
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/container-kill
  - /docs/chaos-engineering/chaos-faults/kubernetes/container-kill
  - /docs/chaos-engineering/technical-reference/chaos-faults/spring-boot/spring-boot-app-kill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Container kill is a Kubernetes pod-level chaos fault that terminates a single container inside a target pod by sending a configurable signal (default `SIGKILL`). The container's pod stays running; the kubelet restarts the killed container in place, incrementing its restart count.

Use this fault to test what happens when one container in a multi-container pod dies without taking the whole pod down: how the surviving sidecars react, whether the restarted container reconciles its state on startup, and how long the pod is `NotReady` while the container restarts.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Sidecar resilience:** When the main application container dies, do logging, service-mesh, and auth sidecars survive cleanly? When a sidecar dies, does the main container survive?
- **Probe tuning:** Are liveness and readiness probes configured to detect the restart and remove the pod from service quickly, then re-add it when the container is healthy again?
- **Cold-start behavior:** Does the restarted container come up within a window your callers can tolerate, and does it correctly rejoin state (cache, connection pool, leader-election, queue offsets)?
- **CrashLoopBackOff thresholds:** With repeated container kills (`TOTAL_CHAOS_DURATION` larger than `CHAOS_INTERVAL`), does the workload tip into `CrashLoopBackOff`, and do your alerts and runbooks handle that correctly?
- **Connection draining at the container layer:** With `SIGNAL: SIGTERM` instead of the default `SIGKILL`, does the container honor a graceful-shutdown handler before exit?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The pods containing the target container are in the `Running` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. The fault uses the container runtime to deliver the signal directly to the container PID.
- **Container runtime access:** The chaos infrastructure can reach the container runtime on the target nodes. The default `containerd` socket path is mounted automatically.
- **Workload selector defined:** The chaos experiment knows the target workload (`Deployment`, `StatefulSet`, `DaemonSet`, `Rollout`, etc.) by kind, namespace, and either names or labels.

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
| GKE Autopilot | Supported with [Autopilot setup](/docs/resilience-testing/chaos-testing/gke-autopilot) |
| EKS Fargate, ACI virtual nodes | Not supported (no access to container runtime sockets) |

---

## Permissions required

The fault runs under the chaos infrastructure's service account.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Discover target pods and run the chaos pod on the same node |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream chaos pod logs for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `configmaps` (`""`) | `get`, `list` | Mount configuration into the chaos pod when specified |
| `deployments`, `statefulsets`, `replicasets`, `daemonsets` (`apps`) | `get`, `list` | Resolve the parent controller for each target pod |
| `replicationcontrollers` (`""`) | `get`, `list` | Resolve the parent controller for legacy workloads |
| `deploymentconfigs` (`apps.openshift.io`) | `get`, `list` | Resolve the parent controller on OpenShift |
| `rollouts` (`argoproj.io`) | `get`, `list` | Resolve the parent controller for Argo Rollouts |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |
| `chaosengines`, `chaosexperiments`, `chaosresults` (`litmuschaos.io`) | `get`, `list`, `create`, `patch`, `update`, `delete` | Manage the chaos engine, experiment, and result CRDs |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope.

---

## Fault tunables

Configure the following fault parameters when you add Container kill to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The fault iterates container kills across this window. | `60` |
| `CHAOS_INTERVAL` | Time between successive container kills in seconds. | `10` |
| `SIGNAL` | POSIX signal sent to the container's PID 1. Common values are `SIGKILL` (default), `SIGTERM`, `SIGABRT`. | `SIGKILL` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_CONTAINER` | Name of the container to kill inside the target pod. Empty selects the first container in the pod spec. | `""` |
| `TARGET_PODS` | Comma-separated list of pod names. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `NODE_LABEL` | Label selector to filter target pods by the node they run on. Empty disables node-based filtering. | `""` |
| `POD_AFFECTED_PERCENTAGE` | Percentage of the workload's pods on which the target container is killed. `0` means one pod. | `0` |
| `SEQUENCE` | When multiple pods are targeted, kill `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `CONTAINER_RUNTIME` | Container runtime on the target nodes. One of `containerd`, `docker`, `crio`. | `containerd` |
| `SOCKET_PATH` | Path to the container runtime socket on the target node. Set to match `CONTAINER_RUNTIME`. | `/run/containerd/containerd.sock` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning Container kill vs Pod delete
Container kill terminates one container inside the pod; the pod stays scheduled and the kubelet restarts the container in place (incrementing `RESTARTS`). [Pod delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete) removes the whole pod and lets the controller schedule a replacement on any Ready node. Pick the one that matches the failure you want to simulate.
:::

### Configure for your container runtime

Set `CONTAINER_RUNTIME` and `SOCKET_PATH` to match the runtime on the target node:

| `CONTAINER_RUNTIME` | `SOCKET_PATH` |
| --- | --- |
| `containerd` (default) | `/run/containerd/containerd.sock` |
| `docker` | `/var/run/docker.sock` |
| `crio` | `/var/run/crio/crio.sock` |

---

## Fault execution in brief

Sends the configured POSIX signal (default `SIGKILL`) to the target container inside the selected pods at the configured interval, so the kubelet restarts the container in place while the pod itself stays scheduled.

---

## Expected behavior during fault execution

- The targeted container exits with the status corresponding to the signal (`137` for `SIGKILL`, `143` for `SIGTERM`). The pod's `RESTARTS` counter increments.
- With `SIGKILL`, the container is killed immediately and any in-flight work is lost. With `SIGTERM`, the container can run a graceful-shutdown handler up to its own timeout before the kubelet forcibly removes it.
- The kubelet's restart policy (`Always` for Deployment/StatefulSet pods) recreates the container in the same pod. The pod's IP and PVC bindings do not change.
- During the restart window, the container is `NotReady`. The kubelet removes the pod from any `Service` whose `readinessProbe` it fails.
- Sibling containers in the same pod (sidecars, init artifacts that have already completed) keep running. They are not directly affected.
- If `CHAOS_INTERVAL` is shorter than the container's startup time and the restart back-off, the container enters `CrashLoopBackOff` and the kubelet delays each successive restart by an increasing penalty (capped at 5 minutes).

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, no further signals are sent. The container is left in whatever state its most recent restart produced. If it is healthy, the pod returns to `Ready` once probes pass.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Application availability:** Watch p99 latency and error rate. A spike that does not subside after the kubelet restarts the container points to slow cold-start or unhealthy probe tuning. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to assert direct endpoint health.
- **Restart count:** Track `kube_pod_container_status_restarts_total` for the affected container. The counter should match the number of fault iterations (one per `CHAOS_INTERVAL`). Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to verify.
- **Probe and restart events:** Look for kubelet events with reason `Killing`, `Started`, and `BackOff`. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the pod enters `CrashLoopBackOff` unexpectedly.

---

## Verify the fault execution effect

While the experiment is running, confirm that the target container is actually restarting:

1. **Watch the pod's container restart counter.**

   ```bash
   kubectl get pod -n <namespace> <pod-name> -o jsonpath='{.status.containerStatuses[*].restartCount}{"\n"}'
   ```

   The restart count for the targeted container should increase by one per `CHAOS_INTERVAL`.

2. **Inspect the last terminated state.**

   ```bash
   kubectl describe pod -n <namespace> <pod-name> | grep -A 5 'Last State'
   ```

   The `Last State` block should show `Terminated` with the exit code that matches the signal you sent (`137` for `SIGKILL`).

3. **Check container readiness during the fault.**

   ```bash
   kubectl get pod -n <namespace> <pod-name> -o jsonpath='{.status.containerStatuses[*].ready}{"\n"}'
   ```

   The targeted container should briefly report `false` during each kill, then `true` once the kubelet restarts it.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the fault stops sending signals. The container settles into whatever state its most recent restart produced.
- **CrashLoopBackOff:** If the container hits its restart back-off cap (5 minutes), the fault still ends on schedule, but the container may take additional minutes to settle. Investigate the underlying crash before re-running.
- **Restarted container picks up new image only if pulled:** The kubelet restarts the same container image that was already on the node. To force a fresh pull, change the image tag or use [Pod delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete) instead.
- **Sidecars are not restarted:** Only the target container is touched. If your debugging suggests the sidecar also needs to restart, use [Pod delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete) to restart every container in the pod.
- **Abort the experiment early:** Stopping the experiment from Chaos Studio prevents any further signals. Any restart already in flight completes normally.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Pods with `restartPolicy: Never`:** Killing the container exits the pod permanently. The pod is not recreated by the kubelet, and the workload's controller (if any) must do the recreation.
- **Init containers:** This fault targets running containers in the `containers:` array. Init containers have already exited by the time the fault starts and cannot be signaled.
- **Static pods:** Pods managed directly by the kubelet (not by the API server) ignore the chaos infrastructure's coordination and may behave inconsistently after a kill.

---

## Troubleshooting

<Troubleshoot
  issue="Container kill experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node, missing RBAC for the chaos service account, or a PodSecurity admission policy blocking privileged pods. Confirm the service account has the permissions listed above and the chaos namespace has the required Pod Security level."
/>

<Troubleshoot
  issue="Container kill runs but the target container is never killed"
  mode="docs"
  fallback="The most common causes are: TARGET_CONTAINER does not match any container in the pod spec, CONTAINER_RUNTIME or SOCKET_PATH does not match the runtime on the target node, or POD_AFFECTED_PERCENTAGE resolved to zero pods. Verify the container name with kubectl get pod <name> -o jsonpath='{.spec.containers[*].name}' and confirm the runtime by SSHing to the node and inspecting the socket file."
/>

<Troubleshoot
  issue="Container restarts trigger CrashLoopBackOff during container kill"
  mode="docs"
  fallback="CHAOS_INTERVAL may be shorter than the container's startup time, so the kubelet's exponential restart back-off kicks in. Either raise CHAOS_INTERVAL above the container's startup time or shorten TOTAL_CHAOS_DURATION so the back-off does not compound. Inspect the back-off state with kubectl describe pod <name>."
/>

<Troubleshoot
  issue="Connection to container runtime fails for container-kill in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. If your nodes use Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock. Confirm the path by SSHing to the node and running ls -l on each candidate socket file."
/>

---

## Related faults

- [Pod delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete): Delete the whole pod rather than a single container.
- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog): Pressure a container's CPU instead of killing it outright.
- [Pod memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-memory-hog): Allocate memory until the kernel OOM-kills the container.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
