---
id: cf-app-network-corruption
title: CF app network corruption
sidebar_label: CF App Network Corruption
description: Corrupt a configurable percentage of egress packets from a Cloud Foundry app instance so you can test how TCP retransmissions and protocol handlers cope.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app network corruption
  - packet corruption
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-network-corruption
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-network-corruption
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app network corruption is a Cloud Foundry chaos fault that corrupts `packetCorruptionPercentage` percent of egress packets from one or more instances of `app`. You can restrict the corruption to specific destination hosts, IP ranges, source ports, or destination ports. The fault lasts for `duration` seconds.

Use this fault to validate TCP-level resilience, protocol parsers, and application retry budgets in conditions that look like a flaky NIC or a flapping fiber. Corrupted packets are typically discarded by the receiver's stack, triggering retransmissions and longer round-trip times.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Retransmission overhead:** Quantify how TCP retransmissions due to corruption affect end-to-end latency.
- **Parser robustness:** Test that protocol parsers reject malformed frames cleanly rather than crashing.
- **Retry budgets:** Confirm application retries do not amplify the slowdown.
- **Network monitoring:** Validate that L4 monitoring detects elevated retransmission rates and alerts within SLA.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models.
- **CF and BOSH credentials:** The LCI host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured.
- **Target identifiers:** You know the `organization`, `space`, `app`, and the `boshDeployment`.
- **Network interface:** You know the interface name inside the container (typically `eth0`).
- **Destinations:** You know the host(s), IP range(s), or port(s) to affect. Leave blank to affect all egress.

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
| `app` | App whose egress traffic is corrupted. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `packetCorruptionPercentage` | Percentage of egress packets to corrupt (0-100). | `100` |
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

Authenticates to Cloud Foundry and BOSH, locates the target app instance(s), and installs a traffic-shaping rule on `networkInterface` inside the container's network namespace that corrupts `packetCorruptionPercentage`% of packets matching the configured destinations/ports. The rule is removed when `duration` elapses.

---

## Expected behavior during fault execution

- Corrupted packets are discarded by the receiver's TCP stack, triggering retransmissions.
- Effective throughput drops; round-trip time rises.
- Application-level error rate may rise if retries exhaust the configured budget.
- After the fault ends, network behavior returns to baseline.

### Signals to watch

- **Caller latency and error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the app or its dependency.
- **TCP retransmissions:** Inspect host-level network metrics on the cell hosting the affected instance.

---

## Recovery and cleanup

- The traffic-shaping rule is removed at the end of `duration`.

---

## Limitations

- Operates on the egress side only.
- Corruption is applied to the payload bytes; the receiver's checksum check rejects the packet. Protocols without a checksum (rare) may not detect the corruption.

---

## Troubleshooting

<Troubleshoot
  issue="CF app network corruption: no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm networkInterface matches the interface inside the container. Confirm destination filters match traffic that is actually flowing. Inspect TCP retransmission counters on the cell to verify the rule is active."
/>

---

## Common configurations

### Corrupt traffic to one downstream

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-network-corruption
  labels:
    name: app-network-corruption
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
    packetCorruptionPercentage: 30
    destinationHosts: payments-api.internal
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app network loss](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-network-loss): Drop packets cleanly instead of corrupting them.
- [CF app network duplication](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-network-duplication): Duplicate packets and test deduplication logic.
