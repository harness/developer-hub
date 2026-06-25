---
id: cf-app-jvm-memory-stress
title: CF app JVM memory stress
sidebar_label: CF App JVM Memory Stress
description: Drive heap or non-heap memory pressure inside the JVM of a Cloud Foundry app instance so you can test how the application reacts to sustained memory exhaustion.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app jvm memory stress
  - jvm memory
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-jvm-memory-stress
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-jvm-memory-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app JVM memory stress is a Cloud Foundry chaos fault that drives sustained memory pressure inside the JVM of one or more instances of a Java-based `app`. You choose whether the pressure targets the heap or non-heap (metaspace, code cache) via the `memoryType` tunable. The fault runs for `duration` seconds and then releases the pressure.

Use this fault to validate the application's behavior near the memory limit: garbage-collection pause times, `OutOfMemoryError` handling, autoscaling decisions, and downstream consumer experience while the JVM is constrained.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Heap saturation:** Test the app's reaction to a near-full heap (latency spikes, GC pressure, OOM events).
- **Non-heap saturation:** Surface class-loading bugs or runaway metaspace consumption.
- **Autoscaler validation:** Confirm memory-based scaling rules trigger correctly.
- **GC tuning:** Identify GC settings that cause excessive pause times under pressure.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models.
- **CF and BOSH credentials:** The LCI host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured.
- **Target identifiers:** You know the `organization`, `space`, `app`, and the `boshDeployment` that manages the cluster.
- **Java app:** The target app is a Java workload exposing a JVM debug agent on `port` (default `9091`).
- **`javaHome`:** Either `JAVA_HOME` is set on the container, or you provide `javaHome` explicitly.

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
| `app` | Java app to stress. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `memoryType` | Memory region to fill. One of `heap` or `non-heap`. | `heap` |
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

Authenticates to Cloud Foundry and BOSH, locates the target app instance(s), attaches an agent to the JVM via the debug port, and allocates memory in the region selected by `memoryType` until the configured pressure is reached. The pressure is held for `duration` seconds and released on completion.

---

## Expected behavior during fault execution

- JVM heap (or non-heap) utilization climbs toward its limit.
- Garbage collection runs more frequently and pause times typically rise.
- The app may experience `OutOfMemoryError` if the configured workload exceeds the limit; the platform may restart the instance.
- After the fault ends, memory utilization returns to baseline.

### Signals to watch

- **GC behavior:** Inspect JVM GC metrics (pause time, frequency).
- **Latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert P95 latency stays within SLO.
- **Instance health:** Watch `cf app <name>` for `CRASHED` instances during heavy heap pressure.

---

## Recovery and cleanup

- The JVM agent is detached when `duration` elapses, releasing memory.
- If the JVM crashed with `OutOfMemoryError`, Cloud Foundry restarts the instance automatically.

---

## Limitations

- Targets the JVM process inside the container, not the host.
- Requires the JVM debug port (`port`) to be reachable inside the container.
- `non-heap` pressure may not always trigger expected behavior if your JVM has high non-heap limits.

---

## Troubleshooting

<Troubleshoot
  issue="CF app JVM memory stress fails with 'JAVA_HOME not found' in Harness Chaos Engineering"
  mode="docs"
  fallback="Set the javaHome tunable to the absolute path of the JDK on the container (for example, /usr/lib/jvm/openjdk). Confirm with cf ssh <app> -c 'echo $JAVA_HOME'."
/>

<Troubleshoot
  issue="App keeps crashing during heap stress"
  mode="docs"
  fallback="If the app crashes repeatedly with OutOfMemoryError, the configured pressure exceeds the heap limit. Reduce duration, decrease the targeted region's size, or increase the app's memory quota with cf scale -m."
/>

<Troubleshoot
  issue="Memory does not return to baseline after the experiment"
  mode="docs"
  fallback="Trigger a full GC with the CF app JVM trigger GC fault, or restage the app: cf restage <app>."
/>

---

## Common configurations

### Pressure on non-heap

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-memory-stress
  labels:
    name: app-jvm-memory-stress
spec:
  cfAppJVMChaos/inputs:
    duration: 60s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    memoryType: non-heap
```

### Stress multiple instances

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-memory-stress
  labels:
    name: app-jvm-memory-stress
spec:
  cfAppJVMChaos/inputs:
    duration: 30s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    memoryType: heap
    instanceAffectedPercentage: 50
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app JVM CPU stress](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-cpu-stress): Apply CPU pressure instead of memory pressure.
- [CF app JVM trigger GC](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-trigger-gc): Force a GC cycle to test pause-time behavior.
