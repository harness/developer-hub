---
id: cf-app-jvm-trigger-gc
title: CF app JVM trigger GC
sidebar_label: CF App JVM Trigger GC
description: Trigger a full garbage collection cycle inside the JVM of a Cloud Foundry app instance so you can measure pause time and tail-latency impact.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app jvm trigger gc
  - jvm garbage collection
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-jvm-trigger-gc
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-jvm-trigger-gc
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app JVM trigger GC is a Cloud Foundry chaos fault that forces a full garbage-collection cycle inside the JVM of one or more instances of a Java-based `app`. The cycle runs once per affected instance; the fault holds the chaos window for `duration` seconds before exiting.

Use this fault to surface tail-latency regressions caused by long GC pauses, validate that long pauses do not trigger health-check failures or cascading retries, and test alert thresholds tuned around GC behavior.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Pause-time validation:** Measure the worst-case stop-the-world pause and assert it stays within the latency SLO.
- **Health check tuning:** Confirm liveness/readiness probes do not falsely fail during a full GC.
- **Tail latency:** Quantify the P99/P999 latency cost of a full GC in production-shaped traffic.
- **Memory leak triage:** Combined with metrics, distinguish a true leak from healthy memory churn.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models.
- **CF and BOSH credentials:** The LCI host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured.
- **Target identifiers:** You know the `organization`, `space`, `app`, and the `boshDeployment` that manages the cluster.
- **Java app:** The target app exposes a JVM agent on `port` (default `9091`).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Java apps deployed to Cloud Foundry | Supported |
| Non-Java workloads | Not supported |

---

## Permissions required

| Action | Requirement |
| --- | --- |
| List apps the CF user can access | `SpaceDeveloper`, `SpaceAuditor`, `OrgManager`, or `OrgAuditor`; scopes `cloud_controller.read` or `cloud_controller.admin` |
| List BOSH deployments | BOSH user with `bosh.read` scope |
| SSH to a Diego cell via BOSH | BOSH UAA token with `bosh.ssh` or `bosh.admin` scope |
| Attach the JVM agent to the target container | Operator with `sudo` or root on the cell host |

---

## Authentication

| Layer | Where to provide | Tunables |
| --- | --- | --- |
| Cloud Foundry API + BOSH director | `/etc/linux-chaos-infrastructure/cf.env` on the LCI host | `CF_API_ENDPOINT`, `CF_USERNAME`, `CF_PASSWORD`, `UAA_SERVER_ENDPOINT`, `BOSH_CLIENT`, `BOSH_CLIENT_SECRET`, `BOSH_CA_CERT`, `BOSH_ENVIRONMENT` |
| vSphere (only when `faultInjectorLocation: vSphere`) | `/etc/linux-chaos-infrastructure/vsphere.env` | `GOVC_URL`, `GOVC_USERNAME`, `GOVC_PASSWORD`, `GOVC_INSECURE`, `VM_NAME`, `VM_USERNAME`, `VM_PASSWORD` |

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `deploymentModel` | LCI placement model. One of `model-1` or `model-2`. | (required) |
| `organization` | CF organization that owns the app. | (required) |
| `space` | CF space within the organization. | (required) |
| `app` | Java app whose JVM is targeted. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `port` | JVM agent port inside the container. | `9091` |
| `javaHome` | Value of `JAVA_HOME`. Not required if the Java binary is on the container's `PATH`. | `""` |
| `instanceAffectedPercentage` | Percentage of instances to target. `0` targets exactly one. | `0` |
| `boshDeployment` | BOSH deployment name. Required for `deploymentModel: model-2`. | `""` |
| `faultInjectorLocation` | `local` or `vSphere`. Required for `deploymentModel: model-2`. | `local` |
| `faultInjectorPort` | Local port used by the fault-injector. | `50320` |
| `duration` | Total chaos duration. | `30s` |
| `skipSSLValidation` | Skip SSL validation when calling CF APIs. | `false` |
| `rampTime` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to Cloud Foundry and BOSH, locates the target app instance(s), attaches an agent to the JVM via the debug port, and invokes a full garbage collection cycle on the affected instance. The fault then holds the chaos window for `duration` seconds before exiting.

---

## Expected behavior during fault execution

- The JVM pauses briefly (typically tens to hundreds of milliseconds depending on heap size and collector).
- Tail latencies on in-flight requests rise during the pause.
- After the GC completes, heap usage drops sharply and latencies return to baseline.

### Signals to watch

- **GC pause:** Inspect JVM GC logs or metrics for a full collection event matching the experiment window.
- **Tail latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert P99 stays within SLO.

---

## Recovery and cleanup

- The JVM resumes normal operation immediately after the GC cycle completes.
- The agent is detached at the end of `duration`.

---

## Limitations

- Triggers a single full GC per affected instance; not a sustained pressure load (use [CF app JVM memory stress](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-memory-stress) for that).
- Pause time is determined by the JVM's collector and heap size, not by the fault.

---

## Troubleshooting

<Troubleshoot
  issue="CF app JVM trigger GC fails to attach to the JVM"
  mode="docs"
  fallback="Confirm the app exposes a JVM agent on the configured port (default 9091). For Java buildpack apps, set JBP_CONFIG_DEBUG: enabled=true,port=9091 as an app env var and restage."
/>

<Troubleshoot
  issue="No GC pause was observed"
  mode="docs"
  fallback="Some collectors (for example, G1, ZGC) may complete a full GC quickly enough that no perceptible pause appears in your probes. Verify the cycle ran by checking the JVM GC logs."
/>

---

## Common configurations

### Trigger GC on multiple instances

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-trigger-gc
  labels:
    name: app-jvm-trigger-gc
spec:
  cfAppJVMChaos/inputs:
    duration: 30s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    instanceAffectedPercentage: 100
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app JVM memory stress](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-memory-stress): Apply sustained memory pressure that may itself trigger GCs.
- [CF app JVM CPU stress](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-cpu-stress): Apply CPU pressure inside the JVM.
