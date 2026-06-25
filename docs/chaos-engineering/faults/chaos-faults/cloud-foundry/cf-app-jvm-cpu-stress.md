---
id: cf-app-jvm-cpu-stress
title: CF app JVM CPU stress
sidebar_label: CF App JVM CPU Stress
description: Drive CPU saturation inside the JVM of a Cloud Foundry app instance so you can test how the application and the platform react to sustained CPU pressure.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app jvm cpu stress
  - jvm cpu
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-jvm-cpu-stress
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-jvm-cpu-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app JVM CPU stress is a Cloud Foundry chaos fault that drives high CPU usage inside the JVM process of one or more instances of a Java-based `app` in `organization`/`space`. The stress lasts for `duration` seconds and is then released.

Use this fault to validate how the application, the CF platform, and downstream consumers behave under sustained JVM CPU pressure: whether response latencies stay within SLO, whether the JVM's autoscaling decisions are sensible, whether the platform scales additional instances, and whether alerts fire only when the workload actually degrades.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Throughput limits:** Measure the application's behavior at the edge of its compute envelope.
- **Autoscaler validation:** Confirm horizontal scaling rules trigger correctly and pull traffic away from the stressed instance.
- **Thread pool tuning:** Check whether thread pools handle requests gracefully under contention.
- **Alert thresholds:** Distinguish transient spikes from sustained pressure that should page on-call.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models.
- **CF and BOSH credentials:** The LCI host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured.
- **Target identifiers:** You know the `organization`, `space`, `app`, and the `boshDeployment` that manages the cluster.
- **Java app:** The target app is a Java workload. The fault relies on the JVM exposing a debug agent on `port` (default `9091`).
- **`javaHome`:** Either the `JAVA_HOME` environment variable is set on the container, or you provide `javaHome` explicitly.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Java apps deployed to Cloud Foundry (TAS, PCF, open-source) | Supported |
| Non-Java workloads (Node.js, Python, Go) | Not supported (use [CF app network latency](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-network-latency) for protocol-level stress) |

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
| `deploymentModel` | LCI placement model. One of `model-1` or `model-2`. For `model-1`, `boshDeployment` and `faultInjectorLocation` are not required. | (required) |
| `organization` | CF organization that owns the app. | (required) |
| `space` | CF space within the organization. | (required) |
| `app` | Java app to stress. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `cpu` | Number of CPU cores to saturate inside the JVM. | `2` |
| `port` | Port exposed by the JVM agent inside the container. | `9091` |
| `javaHome` | Value of `JAVA_HOME`. Not required if the Java binary is already on the container's `PATH`. | `""` |
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

Authenticates to Cloud Foundry and BOSH, locates the target app instance(s), attaches an agent to the JVM process via the JVM debug port, and drives `cpu` cores worth of CPU usage inside the JVM for `duration` seconds. The agent is detached on completion and CPU usage returns to baseline.

---

## Expected behavior during fault execution

- Process CPU on the affected instance rises toward 100% of `cpu` cores.
- Application response latencies typically rise; throughput may dip.
- Autoscalers may scale the app out if scale-up thresholds are reached.
- After the fault ends, CPU returns to baseline and latencies recover.

### Signals to watch

- **Latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert P95 stays within SLO.
- **Instance count:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `cf app <name>` and verify autoscaling behavior.

---

## Recovery and cleanup

- The JVM agent is detached at the end of `duration`, releasing CPU pressure.
- If the experiment is aborted, the fault still attempts to detach the agent before exiting.

---

## Limitations

- Targets the JVM process inside the container, not the host. Other workloads on the same Diego cell are unaffected.
- Requires JVM debug port (`port`) reachable inside the container.
- Recovery time depends on the workload re-establishing its steady state after the stress is removed.

---

## Troubleshooting

<Troubleshoot
  issue="CF app JVM CPU stress fails with 'JAVA_HOME not found' in Harness Chaos Engineering"
  mode="docs"
  fallback="Set the javaHome tunable to the absolute path of the JDK on the app container (for example, /usr/lib/jvm/openjdk). If you do not know the path, run cf ssh <app> -c 'echo $JAVA_HOME' from the LCI host."
/>

<Troubleshoot
  issue="Cannot attach to JVM debug port"
  mode="docs"
  fallback="Confirm the app exposes a JVM agent on the port you configured (default 9091). For Java buildpack apps, set JBP_CONFIG_DEBUG: enabled=true,port=9091 as an app env var, restage the app, and retry."
/>

<Troubleshoot
  issue="CPU usage does not return to baseline after the experiment"
  mode="docs"
  fallback="The agent may have failed to detach. Restart the affected app instance: cf restart-app-instance <app> <index>. If the issue persists, restage the app to release any leaked threads."
/>

---

## Common configurations

### Stress multiple cores

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-cpu-stress
  labels:
    name: app-jvm-cpu-stress
spec:
  cfAppJVMChaos/inputs:
    duration: 60s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    cpu: 4
```

### Target multiple instances

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-cpu-stress
  labels:
    name: app-jvm-cpu-stress
spec:
  cfAppJVMChaos/inputs:
    duration: 30s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    cpu: 2
    instanceAffectedPercentage: 50
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app JVM memory stress](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-memory-stress): Apply heap or non-heap memory pressure instead of CPU stress.
- [CF app JVM trigger GC](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-trigger-gc): Force a garbage collection cycle to test pause-time behavior.
