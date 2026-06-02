---
id: pod-jvm-kafka-latency
title: Pod JVM Kafka latency
sidebar_label: Pod JVM Kafka Latency
description: Add a configurable delay to Kafka producer or consumer calls from a JVM running in a target Kubernetes pod, scoped by topic, so you can test timeout, back-pressure, and lag behavior under slow Kafka traffic.
keywords:
  - chaos engineering
  - pod jvm kafka latency
  - kafka chaos
  - jvm fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - jvm-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod JVM Kafka latency is a Kubernetes pod-level chaos fault that adds a configurable delay to Kafka client calls from a JVM running in a target container, scoped to a chosen topic and client mode, for a configurable duration. Only matched calls are slowed; other Kafka traffic and other code paths run at normal speed. When the fault ends, Kafka calls return to baseline latency immediately.

Use this fault to test how a Java service behaves when Kafka becomes slow on a specific code path: a partition leader that takes longer to ack produces, a consumer side processing messages slowly, or a degraded cluster on one topic.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Producer timeout sensitivity:** When `send().get()` takes 2 seconds instead of 50 ms, does the application respect `request.timeout.ms` and shed load, or does it block?
- **Consumer lag growth:** Slow consumer-side processing and verify whether the application catches up after the fault or rebalances.
- **In-flight buffer pressure:** Slow producer ack and see whether `buffer.memory` fills up and triggers application-level back-pressure.
- **End-to-end SLO impact:** Does the added Kafka latency push request p99 over your SLO, or does the design absorb it?
- **Circuit breaker behavior:** Does a circuit breaker around the slow operation trip and recover correctly when the fault ends?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pod is Running:** The Java application pod is in the `Running` state.
- **Java agent attach available:** The Java process allows agent attach. Utilities such as `ps`, `pgrep`, and `bash` are present in the container, and the JVM is not built with a restricted runtime that strips attach modules.
- **Kafka client in classpath:** The target JVM uses the Apache Kafka Java client and produces to or consumes from the configured `KAFKA_TOPIC` in the configured `KAFKA_MODE`.
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

Configure the following fault parameters when you add Pod JVM Kafka latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Kafka filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `KAFKA_MODE` | Client mode to target. One of `producer` (publish-side) or `consumer` (subscribe-side). | `"producer"` |
| `KAFKA_TOPIC` | Target Kafka topic name. Empty matches all topics for the configured mode. | `""` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched Kafka operations to delay, between `0` and `100`. `0` delays none; `100` delays every match. | `0` |

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
Producer-side latency surfaces as slow `send().get()` and increased in-flight buffer use. Consumer-side latency surfaces as slow `poll()` returns and growing lag. Target the mode that matches the failure you want to validate.
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

Attaches a Java agent to the target JVM and intercepts Kafka client operations matching `KAFKA_MODE` and `KAFKA_TOPIC` to add `LATENCY` milliseconds to each matched call on the configured percentage, for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Matched Kafka operations take longer by approximately `LATENCY` ms. Other topics and the unmatched mode run normally.
- Caller-side metrics (request latency, in-flight buffer use, consumer lag) rise to reflect the added delay.
- Clients with timeouts shorter than `LATENCY` cancel the call and may retry.
- Consumer applications may see growing lag if `LATENCY` per poll exceeds the processing budget.
- Tracing systems show the matched Kafka span growing by `LATENCY` ms.

:::info When the fault ends
Kafka calls return to baseline latency immediately. Calls in flight finish at the delayed time and then the system returns to normal.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Producer latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `kafka_producer_request_latency_avg`.
- **Consumer lag:** Use a Prometheus probe on `kafka_consumer_lag` or your dashboard's lag metric.
- **End-to-end latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against an endpoint that triggers a produce or consume.

---

## Verify the fault execution effect

While the experiment is running, confirm operations are slower:

1. **Time a request that triggers the matched operation.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -w "time=%{time_total}\n" -o /dev/null -s http://<service>:<port>/<endpoint>
   ```

2. **Confirm in tracing.**

   The Kafka span for the matched operation should be approximately `LATENCY` ms longer than its baseline.

---

## Recovery and cleanup

- **End of duration:** Kafka calls return to baseline latency automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Lag drainage:** Consumer lag built up during the fault may take time to drain. Allow normal processing to catch up, or scale consumers temporarily if needed.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Non-JVM and non-Kafka workloads:** This fault targets the Apache Kafka Java client inside a JVM.
- **Streams API:** Applications using Kafka Streams may attribute latency to internal operators rather than client calls; behavior depends on the topology.

---

## Troubleshooting

<Troubleshoot
  issue="Pod JVM Kafka latency experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No latency observed during pod-jvm-kafka-latency"
  mode="docs"
  fallback="The most common causes are: KAFKA_MODE does not match what the application uses (producer vs consumer); KAFKA_TOPIC does not match the topic the application produces/consumes; TRANSACTION_PERCENTAGE is 0 (default); or the path uses Kafka Streams. Re-run with TRANSACTION_PERCENTAGE=100, empty KAFKA_TOPIC, and a larger LATENCY to confirm."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-jvm-kafka-latency in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

---

## Related faults

- [Pod JVM Kafka exception](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-kafka-exception): Throw an exception from Kafka client calls instead of slowing them.
- [Pod JVM Solace latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-solace-latency): Solace equivalent for the Solace Java client.
- [Pod JVM method latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-latency): Generic Java method-level latency injection.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
