---
id: k6-loadgen
title: K6 loadgen
sidebar_label: K6 Loadgen
description: Generate a configurable load against a target endpoint with a k6 script for a configurable duration so you can test how the workload behaves under sustained traffic.
keywords:
  - chaos engineering
  - k6 loadgen
  - load chaos
  - load testing
tags:
  - chaos-engineering
  - load-faults
redirect_from:
  - /docs/chaos-engineering/chaos-faults/load/k6-loadgen
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

K6 loadgen is a chaos fault that runs a [k6](https://k6.io) load-test script against a target endpoint from a helper pod inside the chaos infrastructure cluster for `TOTAL_CHAOS_DURATION` seconds, then stops. The script is read from a Kubernetes secret (`SCRIPT_SECRET_NAME`/`SCRIPT_SECRET_KEY`) and run by the official Grafana k6 runner image (`LOAD_IMAGE`), so the load profile (smoke, spike, stress, soak) is fully driven by the script.

Use this fault to test how a target workload behaves under sustained synthetic load: whether application latency stays inside the SLA, whether autoscaling kicks in, whether circuit breakers and rate limiters work as expected, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **API latency under load:** When the script drives `N` virtual users against a REST endpoint, does p95/p99 stay inside the SLA?
- **Autoscaling fidelity:** Does HPA, KEDA, or a custom autoscaler add capacity inside the alerting SLA?
- **Rate limiting:** Does the rate limiter return `429`s correctly under sustained burst traffic without leaking errors downstream?
- **Continuous validation in pipelines:** Catch performance regressions early by running k6 scripts as part of a CI/CD pipeline.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the cluster running the chaos infrastructure.
- **k6 script secret:** A Kubernetes secret in the chaos infrastructure namespace containing the k6 JavaScript file. The default key is `script.js`. Create it with:

  ```bash
  kubectl create secret generic k6-script \
    --from-file=script.js=<path-to-script>.js \
    -n <chaos-infrastructure-namespace>
  ```

- **Target endpoint reachable:** The endpoint addressed in the k6 script (`http.get('https://...')`) is reachable from the chaos infrastructure cluster.
- **Image accessible:** `LOAD_IMAGE` (default `ghcr.io/grafana/k6-operator:latest-runner`) is pullable from the cluster, or mirror it to your own registry and override the tunable.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Self-hosted Kubernetes (1.21+) | Supported |
| Managed Kubernetes (EKS, GKE, AKS, OKE) | Supported |
| OpenShift | Supported |
| Targets running on AWS, Azure, GCP, or any reachable endpoint | Supported |

---

## Permissions required

This fault is classified as a **Basic** Load fault. The chaos service account needs the following Kubernetes RBAC permissions.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: hce
  name: k6-loadgen
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
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list"]
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

Configure the following fault parameters when you add K6 loadgen to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SCRIPT_SECRET_NAME` | Name of the Kubernetes secret in the chaos infrastructure namespace that holds the k6 JavaScript file. | (required) |
| `SCRIPT_SECRET_KEY` | Key inside the secret that points to the k6 script (for example `script.js`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault, in seconds. k6 runs for this period regardless of the duration declared inside the script. | `60` |
| `LOAD_IMAGE` | Container image used to run k6 inside the helper pod. | `ghcr.io/grafana/k6-operator:latest-runner` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Sample k6 script

The contents of the secret are passed straight to k6. Any script supported by the runner image works.

```javascript
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 50,
  duration: "60s",
};

export default function () {
  const res = http.get("https://api.example.com/health");
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(0.3);
}
```

Go to the [k6 documentation](https://grafana.com/docs/k6/latest/) to read the script reference and the [test-type catalog](https://grafana.com/docs/k6/latest/testing-guides/test-types/) (smoke, load, stress, spike, soak).

---

## Fault execution in brief

Reads the k6 script from `SCRIPT_SECRET_NAME`/`SCRIPT_SECRET_KEY`, mounts it into a helper pod that runs `LOAD_IMAGE`, executes `k6 run` for `TOTAL_CHAOS_DURATION` seconds, then tears the helper pod down.

---

## Expected behavior during fault execution

- The target endpoint sees sustained synthetic traffic for `TOTAL_CHAOS_DURATION` seconds at the rate driven by the script's `vus` and `duration` settings.
- Application metrics on the target (latency, throughput, error rate) shift in line with the load profile.
- Autoscalers (HPA, KEDA) may add capacity if CPU/RPS thresholds are reached.
- After the duration ends, the helper pod is deleted; traffic from the fault stops within seconds.

:::info When the fault ends
The chaos pod stops `k6 run` and deletes the helper pod when `TOTAL_CHAOS_DURATION` elapses. Synthetic traffic stops within seconds; in-flight requests complete naturally.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the application's request-duration histogram and assert p95/p99 stays inside the SLA.
- **Error rate:** Use a Prometheus probe on the application's 5xx counter and assert it stays below threshold.
- **Autoscaling reaction:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `kubectl get hpa <name>` to assert replicas grew.

---

## Verify the fault execution effect

1. **Watch the helper pod logs for k6 output.**

   ```bash
   kubectl logs -n <chaos-infra-namespace> -l name=k6-load-generator -f
   ```

   You should see k6's checks-passed / failed lines and the final summary table.

2. **Inspect target metrics.**

   Use your APM tool (Prometheus, Datadog, New Relic) to confirm RPS and latency rose during the chaos window and recovered afterwards.

3. **Confirm the helper pod was cleaned up.**

   ```bash
   kubectl get pods -n <chaos-infra-namespace> -l name=k6-load-generator
   ```

   The pod should be gone after the experiment ends.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops k6 and deletes the helper pod when `TOTAL_CHAOS_DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also stops k6 and cleans up the helper pod.
- **Manual recovery:** If the helper pod survives an abort, delete it with `kubectl delete pods -n <chaos-infra-namespace> -l name=k6-load-generator`.
- **Workload recovery:** Application metrics recover as soon as synthetic traffic stops; HPA-driven replicas scale back in over the autoscaler cooldown.

---

## Limitations

- **Single endpoint per script:** The script controls the targets; running k6 against many endpoints requires that the script address them.
- **Cluster network egress:** Synthetic traffic leaves the chaos infrastructure cluster; egress costs and per-host rate limits apply.
- **No mid-flight reconfigure:** Script changes require re-uploading the secret and re-running the experiment.
- **Image hosted on GHCR:** The default `LOAD_IMAGE` pulls from `ghcr.io`. If your cluster cannot reach GHCR, mirror the image to your own registry and override `LOAD_IMAGE`.
- **Script-driven duration:** If the script declares a longer `duration` than `TOTAL_CHAOS_DURATION`, the fault still terminates at `TOTAL_CHAOS_DURATION`; align both for accurate reporting.

---

## Troubleshooting

<Troubleshoot
  issue="K6 loadgen secret not found in Harness Chaos Engineering"
  mode="docs"
  fallback="The secret SCRIPT_SECRET_NAME must exist in the chaos infrastructure namespace (the namespace where the chaos infra runs). Create it with kubectl create secret generic <name> --from-file=script.js=<path> -n <namespace>."
/>

<Troubleshoot
  issue="K6 helper pod stuck in ImagePullBackOff"
  mode="docs"
  fallback="LOAD_IMAGE defaults to ghcr.io/grafana/k6-operator:latest-runner. If your cluster cannot reach ghcr.io, mirror the image to a registry you can reach and set LOAD_IMAGE to that path."
/>

<Troubleshoot
  issue="Target endpoint not reachable from the chaos infrastructure cluster"
  mode="docs"
  fallback="Confirm the URL inside the k6 script is reachable from inside the cluster: kubectl run debug --image=alpine --rm -it -- wget <url>. Adjust network policies, security groups, or egress rules to allow traffic from the chaos infra namespace."
/>

<Troubleshoot
  issue="K6 exited with 'unknown protocol'"
  mode="docs"
  fallback="The script must use a supported k6 module (k6/http, k6/grpc, k6/ws). Validate the script locally with k6 run script.js before pushing it as a secret."
/>

---

## Related faults

- [Locust loadgen](/docs/chaos-engineering/faults/chaos-faults/load/locust-loadgen): Generate load with Locust (Python-based) instead of k6.
- [Pod HTTP latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-latency): Inject latency on the server side instead of driving load from outside.
- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog): Stress server CPU instead of driving traffic.
