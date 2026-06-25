---
id: cf-app-network-latency
title: CF app network latency
sidebar_label: CF App Network Latency
description: Inject network latency on the egress of a Cloud Foundry app instance so you can test how the app and its callers behave when downstream calls become slow.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app network latency
  - network latency
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-network-latency
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-network-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app network latency is a Cloud Foundry chaos fault that adds `networkLatency` milliseconds of delay (with optional `jitter`) on the egress traffic of one or more app instances of `app` in `organization`/`space`. You can restrict the delay to specific destination hosts, IP ranges, source ports, or destination ports. The fault lasts for `duration` seconds.

Use this fault to simulate a slow downstream dependency at the network layer, validate timeouts and retries inside the app, and quantify the end-to-end latency cost contributed by a single slow link.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Slow downstream rehearsal:** Simulate a slow database or third-party API and validate the app's timeout configuration.
- **Tail-latency budget:** Measure how an extra 100/500/1000 ms downstream impacts the user-visible P99.
- **Geo-latency simulation:** Approximate cross-region call latency to test caching and locality decisions.
- **Targeted partition:** Slow traffic only to a specific dependency without affecting the rest of the app.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models.
- **CF and BOSH credentials:** The LCI host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured.
- **Target identifiers:** You know the `organization`, `space`, `app`, and the `boshDeployment`.
- **Network interface:** You know the interface name inside the container (typically `eth0`).
- **Destinations:** You know the host(s), IP range(s), or port(s) you want to slow down. Leave blank to affect all egress.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Cloud Foundry (TAS, PCF, open-source) running on BOSH-managed Diego cells | Supported |

---

## Permissions required

| Action | Requirement |
| --- | --- |
| List apps the CF user can access | `SpaceDeveloper`, `SpaceAuditor`, `OrgManager`, or `OrgAuditor`; scopes `cloud_controller.read` or `cloud_controller.admin` |
| List BOSH deployments | BOSH user with `bosh.read` scope |
| SSH to a Diego cell via BOSH | BOSH UAA token with `bosh.ssh` or `bosh.admin` scope |
| Apply traffic-shaping rules inside the target container's namespace | Operator with `sudo` or root on the cell host |

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
| `app` | App whose egress traffic is delayed. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `networkLatency` | Added latency in milliseconds. | `2000` |
| `jitter` | Random variation around `networkLatency`, in milliseconds. | `0` |
| `networkInterface` | Network interface inside the container. | `eth0` |
| `destinationHosts` | Comma-separated list of hostnames to affect. Leave empty to affect all egress. | `""` |
| `destinationIPs` | Comma-separated list of destination IPs or CIDRs to affect. | `""` |
| `sourcePorts` | Comma-separated list of source ports to affect (egress from these ports). | `""` |
| `destinationPorts` | Comma-separated list of destination ports to affect. | `""` |
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

Authenticates to Cloud Foundry and BOSH, locates the target app instance(s), and installs a traffic-shaping rule on `networkInterface` inside the container's network namespace that delays packets matching the configured destinations/ports by `networkLatency` ms (±`jitter`). The rule is removed when `duration` elapses.

---

## Expected behavior during fault execution

- TCP round-trip times to the affected destinations rise by approximately `networkLatency` ms.
- Caller-side response times reflect the added delay; retries may stack if timeouts are too short.
- Throughput typically falls in proportion to the added round-trip time.
- After the fault ends, latency returns to baseline.

### Signals to watch

- **App latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a public route.
- **Downstream metrics:** Inspect the app's outbound call metrics (response time histograms) for the affected dependency.

---

## Recovery and cleanup

- The traffic-shaping rule is removed at the end of `duration`.
- If the experiment is aborted, the fault still attempts to remove the rule before exiting.

---

## Limitations

- Operates on the egress side of the affected instance only. Ingress traffic is not delayed.
- Without a destination filter (`destinationHosts`, `destinationIPs`, or port filters), ALL egress is affected, which may also slow control-plane health checks.

---

## Troubleshooting

<Troubleshoot
  issue="CF app network latency: no observable delay in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm networkInterface matches the interface inside the container (cf ssh <app> -c 'ip a'). Confirm destinationHosts or destinationIPs actually match the traffic you want to slow."
/>

<Troubleshoot
  issue="App health checks fail during the experiment"
  mode="docs"
  fallback="Without destination filters, control-plane traffic is also delayed. Add destinationHosts or destinationIPs to scope the delay to your dependency only."
/>

---

## Common configurations

### Slow only one downstream

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-network-latency
  labels:
    name: app-network-latency
spec:
  cfAppNetworkChaos/inputs:
    duration: 60s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    networkInterface: eth0
    networkLatency: 500
    jitter: 100
    destinationHosts: payments-api.internal
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app network loss](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-network-loss): Drop packets instead of delaying them.
- [CF app JVM method latency](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-method-latency): Add latency at a specific Java method instead of the network.
