---
id: pod-jvm-trigger-gc
title: Pod JVM trigger GC
sidebar_label: Pod JVM Trigger GC
description: Force the JVM in a target Kubernetes pod to run garbage collection on a configurable schedule so you can test how the application behaves under repeated GC pauses.
keywords:
  - chaos engineering
  - pod jvm trigger gc
  - java garbage collection
  - jvm fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - jvm-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod JVM trigger GC is a Kubernetes pod-level chaos fault that forces a JVM running in a target container to run garbage collection repeatedly for a configurable duration. Only the targeted JVM is affected; other processes in the pod and other pods on the node are unaffected. When the fault ends, the JVM resumes normal GC scheduling immediately.

Use this fault to test how a Java application behaves under repeated GC pauses: spikes in request latency, missed scheduled tasks, paused background workers, or probe failures caused by the JVM stopping the world.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **GC-pause tolerance:** When the JVM stops the world more often than usual, do request handlers handle it gracefully or do upstream timeouts cascade?
- **GC algorithm comparison:** Compare CMS, G1, ZGC, and Shenandoah under forced GC pressure to validate the choice for your workload.
- **Heap-sizing validation:** Does the heap have enough headroom that forced GCs stay short, or does each cycle take seconds?
- **Probe sensitivity:** Are readiness and liveness probes resilient to short stop-the-world events?
- **JIT and warmup interaction:** Confirm that forced GC does not deoptimize hot paths in a way that hurts steady-state throughput.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pod is Running:** The Java application pod is in the `Running` state.
- **Java agent attach available:** The Java process allows agent attach. Utilities such as `ps`, `pgrep`, and `bash` are present in the container, and the JVM is not built with a restricted runtime that strips attach modules.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Container runtime access:** The chaos pod can reach the container runtime socket on the target node (`/run/containerd/containerd.sock`, `/var/run/docker.sock`, or `/var/run/crio/crio.sock`).
- **Workload selector defined:** The chaos experiment knows the target workload by kind, namespace, and either names or labels.

:::info JVM chaos uses the Byteman agent
This fault attaches a [Byteman](https://byteman.jboss.org/) agent to the target JVM over `BYTEMAN_PORT`. The port must be reachable from the chaos pod and must not be in use by the application.
:::

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
| `deployments`, `statefulsets`, `replicasets`, `daemonsets` (`apps`) | `get`, `list` | Resolve the target workload to the pods it owns |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions.

---

## Fault tunables

Configure the following fault parameters when you add Pod JVM trigger GC to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The JVM is asked to run GC repeatedly across this window. | `60` |

**JVM**

| Tunable | Description | Default |
| --- | --- | --- |
| `BYTEMAN_PORT` | Port on which the Byteman agent listens inside the container. Must not conflict with any port already in use. | `9091` |
| `JAVA_HOME` | Absolute path to the Java installation inside the container. Empty auto-detects from `PATH`. | `""` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod running the JVM. Empty targets the first container in the pod spec. | `""` |
| `NODE_LABEL` | Label selector to filter target pods by the node they run on. Empty disables node-based filtering. | `""` |
| `POD_AFFECTED_PERCENTAGE` | Percentage of the workload's pods to target. `0` means one pod. | `0` |
| `SEQUENCE` | When multiple pods are targeted, inject `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `CONTAINER_RUNTIME` | Container runtime on the target nodes. One of `containerd`, `docker`, `crio`. | `containerd` |
| `SOCKET_PATH` | Path to the container runtime socket on the target node. Set to match `CONTAINER_RUNTIME`. | `/run/containerd/containerd.sock` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Common pod selection tunables (`TARGET_WORKLOAD_KIND`, `TARGET_WORKLOAD_NAMESPACE`, `TARGET_WORKLOAD_NAMES`, `TARGET_WORKLOAD_LABELS`) are documented in [common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults). Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::tip Pair with GC logs
Enable GC logging on the target JVM (`-Xlog:gc*:file=/tmp/gc.log`) before the fault so you can compare pause counts and durations during and after the injection.
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

Attaches a Java agent to the target JVM and calls `System.gc()` repeatedly for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Garbage collection runs more often than usual. Each cycle stops the world for at least a brief moment, depending on the GC algorithm and heap size.
- Application request latency spikes during each pause; throughput drops correspondingly.
- GC logs show a higher rate of full collections (or cycles, for concurrent collectors).
- Allocator pressure may show as elevated CPU as the JVM compacts heap regions.

:::info When the fault ends
The JVM resumes normal GC scheduling immediately. Heap state and live objects are unchanged by the forced cycles.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **GC pause time:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `jvm_gc_pause_seconds` or equivalent micrometer/JMX metric.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a representative endpoint to detect tail-latency spikes.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod oscillates `NotReady`.

---

## Verify the fault execution effect

While the experiment is running, confirm GCs are running:

1. **Inspect GC counts.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <target-container> -- jstat -gc 1 1000 5
   ```

   `YGC` and `FGC` counters should increment faster than the application's baseline rate.

2. **Confirm application-level impact.**

   Watch the application's p99 latency or an HTTP probe. Latency spikes should correlate with the GC events.

---

## Recovery and cleanup

- **End of duration:** The JVM resumes normal GC scheduling automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Stuck JVM:** If the application is wedged, restart the pod to clear the state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Non-JVM processes:** This fault targets a Java process.
- **JVMs that ignore `System.gc()`:** Some configurations (`-XX:+DisableExplicitGC`) suppress explicit GC requests. Remove the flag or accept that this fault has no effect on that JVM.

---

## Troubleshooting

<Troubleshoot
  issue="Pod JVM trigger GC experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No GC activity observed during pod-jvm-trigger-gc"
  mode="docs"
  fallback="The most common causes are: the JVM was started with -XX:+DisableExplicitGC and ignores System.gc(); the wrong container is targeted (set TARGET_CONTAINER explicitly); JAVA_HOME is not detectable; or BYTEMAN_PORT is already in use. Verify with kubectl exec <pod> -- jstat -gc 1 1000 5 before and during the fault."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-jvm-trigger-gc in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

---

## Related faults

- [Pod JVM CPU stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-cpu-stress): Saturate CPU inside the JVM.
- [Pod JVM method latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-latency): Add latency to a Java method invocation.
- [Pod memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-memory-hog): Consume container memory until OOM.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
