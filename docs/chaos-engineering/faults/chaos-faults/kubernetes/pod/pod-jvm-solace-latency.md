---
id: pod-jvm-solace-latency
title: Pod JVM Solace latency
sidebar_label: Pod JVM Solace Latency
description: Add a configurable delay to Solace publisher or subscriber calls from a JVM running in a target Kubernetes pod, scoped by topic or queue, so you can test timeout and back-pressure behavior under slow Solace messaging.
keywords:
  - chaos engineering
  - pod jvm solace latency
  - solace chaos
  - jvm fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - jvm-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod JVM Solace latency is a Kubernetes pod-level chaos fault that adds a configurable delay to Solace messaging calls from a JVM running in a target container, scoped to a chosen destination and client mode, for a configurable duration. Only matched calls are slowed; other Solace traffic and other code paths run at normal speed. When the fault ends, Solace calls return to baseline latency immediately.

Use this fault to test how a Java service behaves when Solace becomes slow on a specific code path: a broker under heavy load, a slow subscriber that affects flow control, or a degraded link to the broker on one destination.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Publisher timeout sensitivity:** When publish takes 2 seconds instead of 50 ms, does the application respect timeouts and shed load, or does it block?
- **Subscriber back-pressure:** Slow processing on the subscriber side and verify whether flow control prevents the broker from over-delivering.
- **Queue-depth growth:** Confirm whether slow subscribers cause queues to back up and how the application reacts.
- **End-to-end SLO impact:** Does the added Solace latency push request p99 over your SLO?
- **Circuit breaker behavior:** Does a circuit breaker around the slow operation trip and recover correctly when the fault ends?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pod is Running:** The Java application pod is in the `Running` state.
- **Java agent attach available:** The Java process allows agent attach. Utilities such as `ps`, `pgrep`, and `bash` are present in the container, and the JVM is not built with a restricted runtime that strips attach modules.
- **Solace client in classpath:** The target JVM uses a supported Solace Java messaging client (for example the Solace JMS client) and exercises the configured `STREAM`, `SOLACE_DESTINATION_TYPE`, `SOLACE_MODE`, and `SOLACE_APPROACH`.
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

Configure the following fault parameters when you add Pod JVM Solace latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Solace filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `STREAM` | Name of the Solace topic or queue to target. | `""` |
| `SOLACE_MODE` | Client mode to target. One of `publisher` (publish-side) or `subscriber` (subscribe-side). | `"publisher"` |
| `SOLACE_DESTINATION_TYPE` | Destination type. One of `topic` or `queue`. | `"topic"` |
| `SOLACE_APPROACH` | Client API approach. For example `jms`. | `"jms"` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched Solace operations to delay, between `0` and `100`. `0` delays none; `100` delays every match. | `0` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LATENCY` | Delay to add to each matched operation, in milliseconds. | `2000` |
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

:::tip Match mode to scenario
Publisher-side latency surfaces as slow publish calls. Subscriber-side latency surfaces as slow message handling and growing queue depth. Target the mode that matches the failure you want to validate.
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

Attaches a Java agent to the target JVM and intercepts Solace client operations matching `STREAM`, `SOLACE_MODE`, `SOLACE_DESTINATION_TYPE`, and `SOLACE_APPROACH` to add `LATENCY` milliseconds to each matched call on the configured percentage, for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Matched Solace operations take longer by approximately `LATENCY` ms. Other destinations and the unmatched mode run normally.
- Caller-side metrics (request latency, queue depth, in-flight count) rise to reflect the added delay.
- Clients with timeouts shorter than `LATENCY` cancel the call and may retry.
- Subscriber applications may see growing queue depth on the broker if processing slows below the publish rate.
- Tracing systems show the matched Solace span growing by `LATENCY` ms.

:::info When the fault ends
Solace calls return to baseline latency immediately. Calls in flight finish at the delayed time and then the system returns to normal.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Publish latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on your application's Solace latency metric.
- **Subscriber queue depth:** Use a Prometheus probe on broker-side queue depth to detect backlog growth.
- **End-to-end latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against an endpoint that triggers a publish.

---

## Verify the fault execution effect

While the experiment is running, confirm operations are slower:

1. **Time a request that triggers the matched operation.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -w "time=%{time_total}\n" -o /dev/null -s http://<service>:<port>/<endpoint>
   ```

2. **Confirm in tracing.**

   The Solace span for the matched operation should be approximately `LATENCY` ms longer than its baseline.

---

## Recovery and cleanup

- **End of duration:** Solace calls return to baseline latency automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Backlog drainage:** Allow time for normal processing to drain queue depth that built up during the fault, or scale subscribers temporarily if needed.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Non-JVM and non-Solace workloads:** This fault targets Solace Java messaging clients inside a JVM.

---

## Troubleshooting

<Troubleshoot
  issue="Pod JVM Solace latency experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No latency observed during pod-jvm-solace-latency"
  mode="docs"
  fallback="The most common causes are: STREAM does not match the topic or queue name; SOLACE_MODE does not match what the application uses; SOLACE_DESTINATION_TYPE or SOLACE_APPROACH do not match the client library; or TRANSACTION_PERCENTAGE is 0 (default). Re-run with TRANSACTION_PERCENTAGE=100 and a larger LATENCY to confirm."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-jvm-solace-latency in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

---

## Related faults

- [Pod JVM Solace exception](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-solace-exception): Throw an exception from Solace calls instead of slowing them.
- [Pod JVM Kafka latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-kafka-latency): Kafka equivalent for the Apache Kafka Java client.
- [Pod JVM method latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-latency): Generic Java method-level latency injection.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
