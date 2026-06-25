---
id: cf-app-jvm-method-latency
title: CF app JVM method latency
sidebar_label: CF App JVM Method Latency
description: Add artificial latency to a specific JVM method inside a Cloud Foundry app instance so you can test how slow downstream calls cascade through the system.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app jvm method latency
  - jvm method latency
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-jvm-method-latency
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-jvm-method-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app JVM method latency is a Cloud Foundry chaos fault that adds `latency` milliseconds of delay to every invocation of a specific JVM method (`class`.`method`) inside a running Java app. The fault lasts for `duration` seconds, after which the method runs at its normal speed again.

Use this fault to simulate a slow downstream dependency (database, third-party API, internal service) at the method boundary, and validate timeouts, retries, fallbacks, and circuit-breaker thresholds in callers.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Timeout tuning:** Confirm caller timeouts trip before user-visible SLAs are violated.
- **Retry budget:** Validate the caller does not pile on retries that amplify the slowdown.
- **Circuit-breaker thresholds:** Confirm the breaker opens after the configured threshold.
- **End-to-end SLO:** Measure how much a single slow method contributes to the overall request budget.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models.
- **CF and BOSH credentials:** The LCI host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured.
- **Target identifiers:** You know the `organization`, `space`, `app`, and the `boshDeployment`.
- **Java app:** The target app exposes a JVM agent on `port` (default `9091`).
- **Method signature:** You know the fully qualified class and method to target.

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
| `app` | Java app whose method is targeted. | (required) |
| `class` | Fully qualified class name. | (required) |
| `method` | Method on `class` to instrument. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `latency` | Latency added per method call, in milliseconds. | `2000` |
| `port` | JVM agent port inside the container. | `9091` |
| `javaHome` | Value of `JAVA_HOME`. | `""` |
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

Authenticates to Cloud Foundry and BOSH, locates the target app instance(s), attaches an agent to the JVM via the debug port, and installs a rule that sleeps for `latency` milliseconds before each invocation of `class.method` completes. The rule is removed when `duration` elapses.

---

## Expected behavior during fault execution

- Every invocation of the targeted method takes at least `latency` ms longer than usual.
- Caller-side response times rise; timeouts may trip if `latency` exceeds the configured budget.
- Thread pools that serve the method may saturate, causing back-pressure on the rest of the app.
- After the fault ends, response times return to baseline.

### Signals to watch

- **End-to-end latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert P95 latency.
- **Thread pool depth:** Inspect app-level metrics (active threads, queue length) for back-pressure signals.

---

## Recovery and cleanup

- The instrumentation is removed at the end of `duration`.
- Active in-flight calls completed during the fault may still observe the added latency.

---

## Limitations

- Matches methods by name only; overloaded methods on the same class all receive the added latency.
- Latency is added synchronously inside the method body and counts against the caller's thread.

---

## Troubleshooting

<Troubleshoot
  issue="CF app JVM method latency: target method runs at normal speed"
  mode="docs"
  fallback="The method may not have been invoked during the chaos window, or it was JIT-inlined before the agent attached. Generate traffic that exercises the endpoint, or restart the app instance before re-running."
/>

<Troubleshoot
  issue="Latency value seems off"
  mode="docs"
  fallback="latency is in milliseconds, not seconds. 2000 means 2 seconds. Re-check the value if the perceived delay is far larger than expected."
/>

---

## Common configurations

### Add 500 ms to a method

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-method-latency
  labels:
    name: app-jvm-method-latency
spec:
  cfAppJVMChaos/inputs:
    duration: 60s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    class: com.example.OrderService
    method: lookupCustomer
    latency: 500
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app JVM method exception](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-method-exception): Make the same method fail instead of slow.
- [CF app network latency](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-network-latency): Add latency at the network layer instead of inside the JVM.
