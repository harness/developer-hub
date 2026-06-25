---
id: cf-app-network-duplication
title: CF app network duplication
sidebar_label: CF App Network Duplication
description: Duplicate a configurable percentage of egress packets from a Cloud Foundry app instance so you can test deduplication logic and idempotency assumptions.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app network duplication
  - packet duplication
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-network-duplication
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-network-duplication
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app network duplication is a Cloud Foundry chaos fault that duplicates `packetDuplicationPercentage` percent of egress packets from one or more instances of `app`. You can restrict the duplication to specific destination hosts, IP ranges, source ports, or destination ports. The fault lasts for `duration` seconds.

Use this fault to validate idempotency assumptions at the application layer (HTTP requests, database writes, message-bus consumers) and to test that the receiver's protocol layer handles duplicates correctly without amplifying the noise.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Idempotency check:** Confirm that duplicated requests do not cause double writes, double charges, or double messages.
- **Deduplication logic:** Validate the deduplication keys used by message-bus consumers actually work.
- **Protocol behavior:** Test that the receiver tolerates duplicate TCP segments without performance regression.
- **Observability:** Verify duplicate-request counts surface in metrics with the right tags.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models.
- **CF and BOSH credentials:** The LCI host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured.
- **Target identifiers:** You know the `organization`, `space`, `app`, and the `boshDeployment`.
- **Network interface:** You know the interface name inside the container (typically `eth0`).
- **Destinations:** You know the host(s), IP range(s), or port(s) to affect.

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
| `app` | App whose egress traffic is duplicated. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `packetDuplicationPercentage` | Percentage of egress packets to duplicate (0-100). | `100` |
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

Authenticates to Cloud Foundry and BOSH, locates the target app instance(s), and installs a traffic-shaping rule on `networkInterface` inside the container's network namespace that duplicates `packetDuplicationPercentage`% of packets matching the configured destinations/ports. The rule is removed when `duration` elapses.

---

## Expected behavior during fault execution

- The receiver's TCP stack discards duplicate segments cleanly; throughput on the wire rises.
- For UDP-based protocols, the receiver may observe duplicate datagrams at the application layer.
- After the fault ends, network behavior returns to baseline.

### Signals to watch

- **Application duplicate counts:** Confirm deduplication metrics catch the duplicates without amplification.
- **Throughput on the wire:** Observe inflated egress volume during the experiment.

---

## Recovery and cleanup

- The traffic-shaping rule is removed at the end of `duration`.

---

## Limitations

- Operates on the egress side only.
- TCP-based traffic mostly absorbs duplication transparently; effects are most visible on UDP or application-layer protocols.

---

## Troubleshooting

<Troubleshoot
  issue="CF app network duplication: no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="TCP-based traffic typically absorbs duplication transparently. To validate the fault is active, inspect outbound packet counters on the cell during the experiment; you should see roughly packetDuplicationPercentage% more egress packets."
/>

---

## Common configurations

### Duplicate UDP traffic to a metric collector

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-network-duplication
  labels:
    name: app-network-duplication
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
    packetDuplicationPercentage: 50
    destinationIPs: 10.0.0.42
    destinationPorts: "8125"
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app network corruption](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-network-corruption): Corrupt packets to test parser robustness.
- [CF app network loss](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-network-loss): Drop packets to test retransmission and retry behavior.
