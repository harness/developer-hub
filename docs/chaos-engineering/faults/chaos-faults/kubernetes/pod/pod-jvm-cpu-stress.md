---
id: pod-jvm-cpu-stress
title: Pod JVM CPU stress
sidebar_label: Pod JVM CPU Stress
description: Generate sustained CPU load inside a JVM running in a target Kubernetes pod to test how the application behaves when its Java process is starved of CPU.
keywords:
  - chaos engineering
  - pod jvm cpu stress
  - java chaos
  - jvm fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - jvm-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/spring-boot/spring-boot-cpu-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod JVM CPU stress is a Kubernetes pod-level chaos fault that drives a configurable number of CPU cores inside a JVM running in a target container for a configurable duration. Only the targeted JVM is loaded; other processes in the pod and other pods on the node are unaffected. When the fault ends, the JVM's CPU usage returns to baseline immediately.

Use this fault to test how a Java application behaves when its own JVM is starved of CPU: heavy GC pressure, slow request handling, dropped scheduled tasks, or probe failures caused by the JVM not getting a CPU slice in time.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **CPU-throttling resilience:** When the JVM hits its container CPU limit, do request handlers slow down gracefully or do timeouts cascade?
- **Garbage collection under pressure:** Does pause time grow noticeably when CPU is saturated, and does the application stay responsive?
- **Scheduled-task drift:** Do `@Scheduled` jobs and timers fall behind when CPU is tight, and does the application recover when CPU returns?
- **Probe sensitivity:** Are readiness and liveness probes resilient to short CPU spikes, or do they oscillate the pod in and out of service?
- **Right-sizing CPU requests:** Verify whether the configured CPU request is enough headroom for the workload under realistic burst conditions.

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

Configure the following fault parameters when you add Pod JVM CPU stress to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CPU` | Number of CPU cores to keep busy inside the JVM. | `2` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

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

:::tip Pick CPU to match the container limit
Set `CPU` close to the container's `resources.limits.cpu` to simulate full saturation. Setting it higher than the limit relies on the kernel CFS scheduler to throttle the burn loop, but does not amplify pressure beyond the limit.
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

Attaches a Java agent to the target JVM and starts `CPU` busy threads inside that JVM for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- The JVM's CPU usage rises to consume `CPU` cores' worth of compute, up to the container's CPU limit.
- Application request latency increases, garbage-collection pause times grow, and scheduled tasks may drift.
- If the container's CPU limit is exceeded, Linux CFS throttling kicks in and the JVM blocks on CPU for short intervals.
- Liveness or readiness probes may fail if their handlers cannot acquire CPU within the probe's `timeoutSeconds`.

:::info When the fault ends
The busy threads exit and CPU returns to baseline within seconds. Threads queued during the stress run resume at normal speed.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **JVM CPU usage:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `process_cpu_usage` or `container_cpu_usage_seconds_total` to confirm saturation.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against a representative endpoint to detect latency rise.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod oscillates `NotReady`.

---

## Verify the fault execution effect

While the experiment is running, confirm the JVM is hot:

1. **Check container CPU usage.**

   ```bash
   kubectl top pod -n <namespace> <target-pod> --containers
   ```

   The targeted container's CPU should approach the requested or limit value.

2. **Confirm JVM-side load.**

   If JMX or a JVM exporter is exposed, check `process_cpu_usage` or per-thread CPU; the busy threads should be visible as long-running compute.

---

## Recovery and cleanup

- **End of duration:** Busy threads exit and CPU returns to baseline automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Stuck JVM:** If the application is wedged by CPU starvation that persists, restart the pod to clear the state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Non-JVM processes:** This fault targets a Java process. Use Pod CPU hog for CPU stress at the container level.
- **JVMs without agent attach:** Some minimal JVM images strip the modules needed for agent attach. Confirm with `jcmd <pid> help` inside the container before relying on this fault.

---

## Troubleshooting

<Troubleshoot
  issue="Pod JVM CPU stress experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Agent attach fails for pod-jvm-cpu-stress"
  mode="docs"
  fallback="The most common causes are: the JVM is built without the modules needed for agent attach; JAVA_HOME is not detectable from PATH (set it explicitly); BYTEMAN_PORT is already in use; or the container image is missing ps or bash. Confirm with kubectl exec <pod> -- jcmd 1 help and adjust JAVA_HOME or BYTEMAN_PORT accordingly."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-jvm-cpu-stress in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="CPU usage stays high after pod-jvm-cpu-stress ends"
  mode="docs"
  fallback="If the elevated CPU persists, the agent may have failed to clean up. Restart the target pod to reset, and capture chaos pod logs before the next run."
/>

---

## Related faults

- [Pod JVM trigger GC](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-trigger-gc): Force garbage collection to test pause sensitivity.
- [Pod JVM method exception](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-exception): Inject an exception in a Java method.
- [Pod JVM method latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-latency): Add latency to a Java method invocation.
- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog): Generate container-wide CPU stress (not JVM-specific).
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
