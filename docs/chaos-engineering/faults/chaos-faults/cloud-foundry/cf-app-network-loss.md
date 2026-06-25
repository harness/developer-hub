---
id: cf-app-network-loss
title: CF app network loss
sidebar_label: CF App Network Loss
description: Drop a configurable percentage of egress packets from a Cloud Foundry app instance so you can test retry, timeout, and circuit-breaker behavior.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app network loss
  - packet loss
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-network-loss
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-network-loss
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app network loss is a Cloud Foundry chaos fault that drops `packetLossPercentage` percent of egress packets from one or more app instances of `app` in `organization`/`space`. You can restrict the loss to specific destination hosts, IP ranges, source ports, or destination ports. The fault lasts for `duration` seconds.

Use this fault to test how the app and its callers handle a flaky or congested network: TCP retransmissions, application-level retries, timeouts, circuit-breaker decisions, and downstream error propagation.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Retry resilience:** Confirm the app retries lost requests within budget instead of giving up immediately or piling on.
- **Timeout tuning:** Validate timeouts are set high enough to absorb the added retransmissions.
- **Circuit-breaker thresholds:** Confirm the breaker opens at the configured loss/error rate.
- **Targeted partition:** Drop traffic only to a specific dependency to test single-dependency failure modes.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models.
- **CF and BOSH credentials:** The LCI host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured.
- **Target identifiers:** You know the `organization`, `space`, `app`, and the `boshDeployment`.
- **Network interface:** You know the interface name inside the container (typically `eth0`).
- **Destinations:** You know the host(s), IP range(s), or port(s) you want to disrupt. Leave blank to affect all egress.

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
| `app` | App whose egress traffic loses packets. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `packetLossPercentage` | Percentage of egress packets to drop (0-100). | `100` |
| `networkInterface` | Network interface inside the container. | `eth0` |
| `destinationHosts` | Comma-separated list of hostnames to affect. Leave empty to affect all egress. | `""` |
| `destinationIPs` | Comma-separated list of destination IPs or CIDRs to affect. | `""` |
| `sourcePorts` | Comma-separated list of source ports to affect. | `""` |
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

Authenticates to Cloud Foundry and BOSH, locates the target app instance(s), and installs a traffic-shaping rule on `networkInterface` inside the container's network namespace that drops `packetLossPercentage`% of packets matching the configured destinations/ports. The rule is removed when `duration` elapses.

---

## Expected behavior during fault execution

- TCP connections to affected destinations experience retransmissions; round-trip time may rise.
- Application-level retries fire if configured; otherwise requests fail with timeout or connection-reset errors.
- After the fault ends, packet loss returns to baseline.

### Signals to watch

- **Caller error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert error rate stays within SLO.
- **TCP retransmissions:** Inspect host-level network metrics on the cell hosting the affected instance.

---

## Recovery and cleanup

- The traffic-shaping rule is removed at the end of `duration`.
- If the experiment is aborted, the fault still attempts to remove the rule before exiting.

---

## Limitations

- Operates on the egress side only. Ingress packet loss is not simulated.
- Without a destination filter, ALL egress traffic loses packets, which can break control-plane communication.
- At `packetLossPercentage: 100`, the destination is effectively unreachable; use [CF app stop](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-stop) or [CF app route unmap](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-route-unmap) for cleaner outage simulation.

---

## Troubleshooting

<Troubleshoot
  issue="CF app network loss: no observable failures in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm packetLossPercentage is set (the default of 100 drops all matching traffic). Confirm networkInterface matches the interface inside the container. Confirm destination filters match actual traffic."
/>

<Troubleshoot
  issue="App becomes completely unreachable during the experiment"
  mode="docs"
  fallback="With no destination filters and packetLossPercentage of 100, all egress (including health checks and platform calls) is dropped. Add destinationHosts or destinationIPs to scope the loss to your dependency."
/>

---

## Common configurations

### Drop 50% of traffic to one downstream

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-network-loss
  labels:
    name: app-network-loss
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
    packetLossPercentage: 50
    destinationHosts: payments-api.internal
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app network latency](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-network-latency): Delay packets instead of dropping them.
- [CF app network corruption](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-network-corruption): Corrupt packets so the receiver discards them.
