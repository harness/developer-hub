---
id: time-chaos
title: Time chaos
sidebar_label: Time Chaos
description: Shift the wall-clock time observed by selected processes inside a target Kubernetes pod to test application behavior under clock skew, token expiry, and time-based scheduling errors.
keywords:
  - chaos engineering
  - time chaos
  - clock skew
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - state-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/time-chaos
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/time-chaos
  - /docs/chaos-engineering/chaos-faults/kubernetes/time-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Time chaos is a Kubernetes pod-level chaos fault that shifts the wall-clock or monotonic time observed by selected processes inside the target container by a configurable offset for a configurable duration. The pod's own filesystem timestamps, scheduled timers, and time-based logic see the shifted time; the node's clock and other pods are unaffected. When the fault ends, the pod's time returns to the host clock.

Use this fault to test how an application handles clock skew: a token that expires earlier or later than expected, a scheduler that fires at the wrong moment, a TLS certificate that appears expired (or not yet valid), or a distributed lock that misses its lease deadline.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Token and certificate expiry:** Shift time forward by an hour with `OFFSET=3600s`. Do JWTs reject as expired, and does the application refresh them? Do TLS handshakes fail with `certificate has expired`?
- **NTP drift simulation:** Inject a small offset (`OFFSET=30s`) to model gradual NTP drift. Does the application's clock-comparison logic (rate limits, idempotency keys, signed requests) still hold?
- **Distributed lock and lease deadlines:** A pod that thinks it is in the past keeps holding a lease the rest of the cluster considers expired. Does the leader-election protocol resolve cleanly?
- **Scheduled job firing:** Shift time forward past a scheduled timer. Does the in-process scheduler fire the job once it sees the new time, or does it miss the window?
- **Cron and time-based eviction:** Move time backward (`OFFSET=-3600s`) and verify whether logic that relies on monotonically increasing timestamps copes (database write-ahead logs, monotonic counters).

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The application pods you intend to target are in the `Running` state before the fault is launched.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Container runtime access:** The chaos pod can reach the container runtime socket on the target node (`/run/containerd/containerd.sock`, `/var/run/docker.sock`, or `/var/run/crio/crio.sock`).
- **Linux kernel supports time namespaces:** Time chaos relies on Linux time namespaces (kernel 5.6 or later). Confirm with `uname -r` on the target node.
- **Workload selector defined:** The chaos experiment knows the target workload by kind, namespace, and either names or labels.

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

Configure the following fault parameters when you add Time chaos to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `OFFSET` | Time offset applied to the target clock. Positive values move time forward; negative values move it backward. Accepts Go duration strings such as `30s`, `1h`, `-2h`. | `3600s` |
| `CLOCK_IDS` | Target clock(s) to shift. Common values: `CLOCK_REALTIME` (wall clock), `CLOCK_MONOTONIC` (monotonic timer). Comma-separated to shift multiple clocks. | `CLOCK_REALTIME` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod whose processes' clock to shift. Empty targets the first container in the pod spec. | `""` |
| `NODE_LABEL` | Label selector to filter target pods by the node they run on. Empty disables node-based filtering. | `""` |
| `POD_AFFECTED_PERCENTAGE` | Percentage of the workload's pods to target. `0` means one pod. | `0` |
| `SEQUENCE` | When multiple pods are targeted, inject `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `CONTAINER_RUNTIME` | Container runtime on the target nodes. One of `containerd`, `docker`, `crio`. | `containerd` |
| `SOCKET_PATH` | Path to the container runtime socket on the target node. Set to match `CONTAINER_RUNTIME`. | `/run/containerd/containerd.sock` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::tip Pick the right clock for the test
`CLOCK_REALTIME` affects wall-clock readings (logs, timestamps, token `exp` claims, certificate validity). `CLOCK_MONOTONIC` affects timeouts and elapsed-time calculations. Many libraries use one and not the other; match the clock to the code path you intend to break.
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

Shifts the time observed by processes in the target container by `OFFSET` on the clocks listed in `CLOCK_IDS`, so the application's reads of `time(2)`, `clock_gettime(2)`, and equivalent return values shifted by the configured amount, while the host clock and other pods are unaffected.

---

## Expected behavior during fault execution

- Processes running in the target container observe time shifted by `OFFSET`. New timestamps written to logs, set on files, or embedded in API responses reflect the shifted clock.
- Outside the container, the node's clock and other pods are not affected. Kubernetes control plane components (kubelet, API server) still see the real time.
- Applications that compare their clock to external timestamps (TLS certificate validity, JWT `exp` claims, OAuth tokens, distributed-lock leases) behave according to the offset: a forward shift makes things appear to have expired; a backward shift makes them appear not yet valid.
- Code that calls `gettimeofday`/`time` repeatedly continues to see consistent (shifted) time. Code that uses `CLOCK_MONOTONIC` for elapsed-time measurement is only affected if you include it in `CLOCK_IDS`.
- File modification timestamps for new writes inside the container reflect the shifted time. `ls -l` shows future or past dates accordingly.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the time offset is removed and processes in the container see the host clock again within seconds. File timestamps already written with shifted time remain as written.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **TLS handshake failures:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the application's TLS-error counter when shifting forward past a certificate's `notAfter`.
- **Token refresh rate:** Use a Prometheus probe on token-refresh counters to verify the application reissues credentials after the shifted time crosses `exp`.
- **Caller errors:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the calling service to detect `401`/`403` from token or signature validation failures.

---

## Verify the fault execution effect

While the experiment is running, confirm the time shift inside the pod:

1. **Read the current time from inside the container.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <TARGET_CONTAINER> -- date
   ```

   The reported time should differ from the host's time by approximately `OFFSET`.

2. **Compare against the host clock.**

   ```bash
   kubectl debug node/<node-name> -it --image=busybox -- date
   ```

   The node's `date` is unaffected by the fault. The delta between this and the pod's `date` confirms the offset.

---

## Recovery and cleanup

- **End of duration:** The time offset is removed automatically and the container's processes see the host clock.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to detach from the modified time namespace.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Linux kernel version:** Time namespaces require kernel 5.6 or later. On older kernels the fault fails to apply.
- **Already-established TLS connections:** Connections that completed handshake before the fault began are not re-validated against the shifted time. The fault changes how new handshakes are evaluated.
- **External time sources:** Code that fetches time from an external NTP-like service (rather than the local clock) bypasses the fault.
- **File timestamps persist:** Files written with shifted timestamps keep those timestamps after the fault ends. If your application depends on monotonically increasing file timestamps, plan recovery accordingly.

---

## Troubleshooting

<Troubleshoot
  issue="Time chaos experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Time offset does not apply during time-chaos"
  mode="docs"
  fallback="The most common causes are: the target node's Linux kernel is older than 5.6 and does not support time namespaces (check with uname -r); CLOCK_IDS does not include the clock the application actually uses (try CLOCK_REALTIME,CLOCK_MONOTONIC); or the application reads time from an external source (NTP, HTTP date header) rather than the local clock. Run date inside the target container during the fault and compare against the node's date to confirm whether the shift is in place."
/>

<Troubleshoot
  issue="Connection to container runtime fails for time-chaos in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Time stays shifted after time-chaos ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to detach from the modified time namespace. File timestamps written with shifted time during the fault remain as written; that is expected. If the runtime continues to show shifted time, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete): Test how the application recovers from sudden pod restarts.
- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog): Stress CPU instead of time.
- [Pod network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-latency): Add network delay; useful in combination with time chaos for testing distributed timeouts.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
