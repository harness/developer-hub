---
id: locust-loadgen
title: Locust loadgen
sidebar_label: Locust Loadgen
description: Generate a configurable load against a target host with a Locust script for a configurable duration so you can test how the workload behaves under sustained traffic.
keywords:
  - chaos engineering
  - locust loadgen
  - load chaos
  - load testing
tags:
  - chaos-engineering
  - load-faults
redirect_from:
  - /docs/chaos-engineering/chaos-faults/load/locust-loadgen
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Locust loadgen is a chaos fault that runs a [Locust](https://locust.io) load-test script against `HOST` from `REPLICA` helper pods inside the chaos infrastructure cluster for `TOTAL_CHAOS_DURATION` seconds, then stops. Each runner spawns `USERS` virtual users at `SPAWN_RATE` users per second. The Locust task file is supplied via a ConfigMap mounted at `CONFIG_MAP_FILE` (default `/tmp/config.py`), so the load profile is fully driven by the script.

Use this fault to test how a target workload behaves under sustained Python-driven synthetic load: whether application latency stays inside the SLA, whether autoscaling kicks in, whether circuit breakers and rate limiters work as expected, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **API latency under load:** When `USERS` virtual users hit `HOST` at `SPAWN_RATE` users/second, does p95/p99 stay inside the SLA?
- **Autoscaling fidelity:** Does HPA, KEDA, or a custom autoscaler add capacity inside the alerting SLA?
- **Rate limiting and quotas:** Does the rate limiter return `429`s correctly under sustained burst traffic without leaking errors downstream?
- **OAuth/credentialed APIs:** Use `GRANT_TYPE=client_credentials` (or another grant) in the Locust script to test authenticated endpoints under load.
- **Distributed load:** Drive load from `REPLICA` runner pods (pinned to `NODE_NAMES`) to spread egress and avoid hitting per-pod limits.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the cluster running the chaos infrastructure.
- **Locust task file:** A ConfigMap in the chaos infrastructure namespace that contains the Locust `config.py` mounted at `CONFIG_MAP_FILE`. Provide it through the helper pod spec.
- **Target host reachable:** `HOST` is reachable from the chaos infrastructure cluster.
- **Image accessible:** `LOAD_IMAGE` (default `chaosnative/locust-loadgen:latest`) is pullable from the cluster, or mirror it to your own registry and override the tunable.
- **Node selectors (optional):** If `NODE_NAMES` is set, the runner pods are scheduled only on the listed nodes (comma-separated).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Self-hosted Kubernetes (1.21+) | Supported |
| Managed Kubernetes (EKS, GKE, AKS, OKE) | Supported |
| OpenShift | Supported |
| Targets running on AWS, Azure, GCP, or any reachable host | Supported |

---

## Permissions required

This fault is classified as a **Basic** Load fault. The chaos service account needs the following Kubernetes RBAC permissions.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: hce
  name: locust-loadgen
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["create", "delete", "get", "list", "patch", "deletecollection", "update"]
  - apiGroups: [""]
    resources: ["events"]
    verbs: ["create", "get", "list", "patch", "update"]
  - apiGroups: [""]
    resources: ["pods/log"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["litmuschaos.io"]
    resources: ["chaosengines", "chaosexperiments", "chaosresults"]
    verbs: ["create", "delete", "get", "list", "patch", "update"]
  - apiGroups: ["batch"]
    resources: ["jobs"]
    verbs: ["create", "delete", "get", "list", "deletecollection"]
  - apiGroups: [""]
    resources: ["configmaps", "secrets"]
    verbs: ["get", "list", "watch"]
```

---

## Fault tunables

Configure the following fault parameters when you add Locust loadgen to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `HOST` | URL of the target host (for example `https://api.example.com`). | `https://google.com` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault, in seconds. Locust runs for this period. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `60` |
| `USERS` | Number of concurrent virtual users per runner pod. | `300` |
| `SPAWN_RATE` | Number of virtual users to spawn per second. | `300` |
| `LOAD_TYPE` | Type of load produced by the script (used by the Locust task to choose a profile, for example `load`, `spike`, `stress`). | `load` |
| `GRANT_TYPE` | OAuth grant type used by the script when the target needs credentials (for example `client_credentials`). | `client_credentials` |
| `REPLICA` | Number of runner pods to launch. Total virtual users equal `USERS x REPLICA`. | `3` |
| `NODE_NAMES` | Comma-separated node names where runner pods are scheduled. Empty means any node. | `""` |
| `CONFIG_MAP_FILE` | Path inside the runner pod where the Locust task file is mounted from the supplied ConfigMap. | `/tmp/config.py` |
| `LOAD_IMAGE` | Container image used to run Locust inside each runner pod. | `chaosnative/locust-loadgen:latest` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Sample Locust task

The ConfigMap mounted at `CONFIG_MAP_FILE` contains the Locust task file. A minimal `config.py`:

```python
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(0.5, 1.5)

    @task
    def index(self):
        self.client.get("/")

    @task(3)
    def health(self):
        self.client.get("/health")
```

Go to the [Locust documentation](https://docs.locust.io) to read the task reference.

---

## Fault execution in brief

Launches `REPLICA` runner pods running `LOAD_IMAGE`, mounts the Locust task file from the ConfigMap at `CONFIG_MAP_FILE`, runs `locust` against `HOST` with `USERS` concurrent virtual users at `SPAWN_RATE` per second for `TOTAL_CHAOS_DURATION`, then tears the runner pods down.

---

## Expected behavior during fault execution

- The target host sees sustained synthetic traffic for `TOTAL_CHAOS_DURATION` seconds at the rate driven by `USERS`, `SPAWN_RATE`, and `REPLICA`.
- Application metrics on the target (latency, throughput, error rate) shift in line with the load profile.
- Autoscalers (HPA, KEDA) may add capacity if CPU/RPS thresholds are reached.
- After the duration ends, the runner pods are deleted; traffic from the fault stops within seconds.

:::info When the fault ends
The chaos pod stops Locust and deletes the runner pods when `TOTAL_CHAOS_DURATION` elapses. Synthetic traffic stops within seconds; in-flight requests complete naturally.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the application's request-duration histogram and assert p95/p99 stays inside the SLA.
- **Error rate:** Use a Prometheus probe on the application's 5xx counter and assert it stays below threshold.
- **Autoscaling reaction:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `kubectl get hpa <name>` to assert replicas grew.

---

## Verify the fault execution effect

1. **Watch the runner pod logs for Locust output.**

   ```bash
   kubectl logs -n <chaos-infra-namespace> -l name=locust-load-generator -f
   ```

   You should see Locust's per-second stats lines (RPS, response times, failures).

2. **Inspect target metrics.**

   Use your APM tool (Prometheus, Datadog, New Relic) to confirm RPS and latency rose during the chaos window and recovered afterwards.

3. **Confirm the runner pods were cleaned up.**

   ```bash
   kubectl get pods -n <chaos-infra-namespace> -l name=locust-load-generator
   ```

   The pods should be gone after the experiment ends.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops Locust and deletes the runner pods when `TOTAL_CHAOS_DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also stops Locust and cleans up the runner pods.
- **Manual recovery:** If the runner pods survive an abort, delete them with `kubectl delete pods -n <chaos-infra-namespace> -l name=locust-load-generator`.
- **Workload recovery:** Application metrics recover as soon as synthetic traffic stops; HPA-driven replicas scale back in over the autoscaler cooldown.

---

## Limitations

- **Single host per run:** The fault drives load against one `HOST`; running against many hosts requires that the script address them inside one task file.
- **Distributed runners are independent:** Each runner pod tracks its own users and statistics; aggregate them in the target's APM, not in the per-pod logs.
- **No mid-flight reconfigure:** Changes to `USERS`, `SPAWN_RATE`, or the task file require re-running the experiment.
- **Cluster network egress:** Synthetic traffic leaves the chaos infrastructure cluster; egress costs and per-host rate limits apply.

---

## Troubleshooting

<Troubleshoot
  issue="Locust loadgen runner pods fail to start in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the ConfigMap containing config.py exists in the chaos infrastructure namespace and is mounted at CONFIG_MAP_FILE. If NODE_NAMES is set, verify each node name matches kubectl get nodes exactly."
/>

<Troubleshoot
  issue="Locust runner pod stuck in ImagePullBackOff"
  mode="docs"
  fallback="LOAD_IMAGE defaults to chaosnative/locust-loadgen:latest. If your cluster cannot reach docker.io, mirror the image to a registry you can reach and set LOAD_IMAGE to that path."
/>

<Troubleshoot
  issue="Target host not reachable from the chaos infrastructure cluster"
  mode="docs"
  fallback="Confirm HOST is reachable from inside the cluster: kubectl run debug --image=alpine --rm -it -- wget HOST. Adjust network policies, security groups, or egress rules to allow traffic from the chaos infra namespace."
/>

<Troubleshoot
  issue="Locust reports zero RPS or all failures"
  mode="docs"
  fallback="Check the task file (config.py) and confirm self.client points at a valid path under HOST. If HOST needs authentication, confirm the task fetches an OAuth token using GRANT_TYPE and attaches it to subsequent calls."
/>

---

## Related faults

- [K6 loadgen](/docs/chaos-engineering/faults/chaos-faults/load/k6-loadgen): Generate load with k6 (JavaScript-based) instead of Locust.
- [Pod HTTP latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-latency): Inject latency on the server side instead of driving load from outside.
- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog): Stress server CPU instead of driving traffic.
