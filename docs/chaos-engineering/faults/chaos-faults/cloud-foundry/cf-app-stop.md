---
id: cf-app-stop
title: CF app stop
sidebar_label: CF App Stop
description: Stop a Cloud Foundry app for a configurable duration, then restart it, so you can test how the platform and dependents react when the app goes offline.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app stop
  - app resilience
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-stop
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-stop
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFSecrets from './shared/cf-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app stop is a Cloud Foundry chaos fault that stops the target app (`app` in `organization`/`space`) for `duration` seconds, then starts it back up. It exercises how the Cloud Foundry platform, upstream routers, and downstream consumers behave when an app is gracefully taken offline and brought back.

Use this fault to validate disaster-recovery behaviors such as the platform restarting the app, the router rejecting traffic during the outage, blue/green peers absorbing requests, and alerting firing inside SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Outage absorption:** Validate that consumers (gateways, other apps) handle the stopped app cleanly: retries, fallbacks, circuit breakers.
- **Platform recovery:** Confirm Cloud Foundry brings the app back to a healthy state when the fault re-starts it.
- **Alert fidelity:** Verify health-check based alerts (`/health`, route probes) fire inside the alerting SLA.
- **Runbook validation:** Practice the on-call response to a CF app outage in a controlled window.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed on a machine that can reach the Cloud Foundry API and UAA endpoints. Go to [Cloud Foundry chaos deployment](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-chaos-components-and-their-deployment-architecture) to read the supported deployment models.
- **CF credentials:** `CF_API_ENDPOINT`, `CF_USERNAME`, `CF_PASSWORD`, and `UAA_SERVER_ENDPOINT` available to the chaos infrastructure (see [Authentication](#authentication)).
- **Target identifiers:** You know the `organization`, `space`, and `app` name as registered in CF.
- **Permissions:** The CF user holds the roles described in [Permissions required](#permissions-required).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Cloud Foundry on TAS, PCF, or open-source CF deployments | Supported |
| Kubernetes-only deployments (no Cloud Foundry control plane) | Not supported (use the [Kubernetes pod faults](/docs/chaos-engineering/faults/chaos-faults/kubernetes/)) |

---

## Permissions required

**On Cloud Foundry.** The CF user authenticating as `CF_USERNAME` needs both read and write scopes on the target app:

| Action | Required role (any) | Required OAuth scope (any) |
| --- | --- | --- |
| List apps the user can access | `SpaceDeveloper`, `SpaceAuditor`, `OrgManager`, or `OrgAuditor` | `cloud_controller.read`, `cloud_controller.global_auditor`, `cloud_controller.admin` |
| Stop the target app (set state to `STOPPED`) | `SpaceDeveloper` in the app's space | `cloud_controller.write`, `cloud_controller.admin` |
| Start the target app (set state to `STARTED`) | `SpaceDeveloper` in the app's space | `cloud_controller.write`, `cloud_controller.admin` |

---

## Authentication

| Layer | Where to provide | Tunables |
| --- | --- | --- |
| Cloud Foundry API | `/etc/linux-chaos-infrastructure/cf.env` on the LCI host (or environment / config file) | `CF_API_ENDPOINT`, `CF_USERNAME`, `CF_PASSWORD`, `UAA_SERVER_ENDPOINT` |
| vSphere (only when `faultInjectorLocation: vSphere`) | `/etc/linux-chaos-infrastructure/vsphere.env` | `GOVC_URL`, `GOVC_USERNAME`, `GOVC_PASSWORD`, `GOVC_INSECURE`, `VM_NAME`, `VM_USERNAME`, `VM_PASSWORD` |

Full key/format reference is in [CF secrets](#cf-secrets) and [vSphere secrets](#vsphere-secrets) below.

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `organization` | Cloud Foundry organization that owns the target app. | (required) |
| `space` | CF space within the organization. | (required) |
| `app` | Name of the app to stop. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `duration` | Total chaos duration. The app stays stopped for this period before it is restarted. | `30s` |
| `faultInjectorLocation` | Where the fault-injector runs relative to the LCI. Supports `local` and `vSphere`. Go to [Fault injector location](#fault-injector-location). | `local` |
| `faultInjectorPort` | Local port used by the fault-injector. If unavailable, a random port in `50320-51320` is picked. Go to [Fault injector port](#fault-injector-port). | `50320` |
| `skipSSLValidation` | Skip SSL validation when calling CF APIs. Go to [Skip SSL validation](#skip-ssl-validation). | `false` |
| `rampTime` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time). | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to the Cloud Foundry API, locates the app in `organization`/`space`, sets its state to `STOPPED`, waits `duration` seconds, and then sets the state back to `STARTED`. Recovery completes when CF reports the app `STARTED` and healthy.

---

## Expected behavior during fault execution

- The app's CF status transitions to `STOPPED`; its instances are drained and removed.
- Requests routed to the app fail (typically 502/503 from the CF router) until the fault re-starts the app.
- After the fault ends, CF starts the app and health checks return successful before traffic is restored.

### Signals to watch

- **App availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against a public route on the app.
- **Downstream errors:** Probe a consumer that depends on the app; assert it returns its expected fallback response, not a 5xx.

---

## Recovery and cleanup

- The fault re-starts the app automatically when `duration` elapses.
- If the experiment is aborted, the fault still attempts to start the app before exiting.

---

## Limitations

- Stops the entire app, not individual instances. To affect a subset, use [CF app container kill](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-container-kill) with `instanceAffectedPercentage`.
- The app must already be in `STARTED` state at experiment start.

---

## Troubleshooting

<Troubleshoot
  issue="CF app stop fails with 'app not found' in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify the organization, space, and app values match what is registered in Cloud Foundry (case-sensitive). Run cf app <name> from the LCI host to confirm visibility under the same CF user."
/>

<Troubleshoot
  issue="CF API call fails with TLS certificate error"
  mode="docs"
  fallback="If your CF API uses a self-signed or internal CA certificate, set skipSSLValidation: true on the fault, or install the trusted CA on the chaos infrastructure host."
/>

<Troubleshoot
  issue="App is still STOPPED after the experiment ends"
  mode="docs"
  fallback="The fault attempts to restart the app on cleanup. If the start failed (for example, due to insufficient memory in the org/space quota), start the app manually with cf start <app> and investigate the platform logs."
/>

---

## Common configurations

### Fault injector location

The `faultInjectorLocation` input determines where the fault-injector utility runs:

- `local`: Runs on the same host as the LCI. Use this when the LCI host can reach the CF API directly.
- `vSphere`: Runs on a remote vSphere-managed VM. Use this when the chaos infrastructure is deployed separately from the network path that reaches CF.

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-stop
  labels:
    name: app-stop
spec:
  cfAppStop/inputs:
    duration: 30s
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
```

### Skip SSL validation

Set `skipSSLValidation: true` when calling a CF API that uses a self-signed or internal CA certificate.

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-stop
  labels:
    name: app-stop
spec:
  cfAppStop/inputs:
    duration: 30s
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    skipSSLValidation: true
```

### Fault injector port

Set `faultInjectorPort` to override the default `50320`. If the chosen port is already in use, the fault-injector picks a random port in `50320-51320`.

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-stop
  labels:
    name: app-stop
spec:
  cfAppStop/inputs:
    duration: 30s
    faultInjectorLocation: local
    app: cf-app
    organization: dev-org
    space: dev-space
    faultInjectorPort: 50331
```

---

<CFSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app container kill](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-container-kill): Kill a single app container instance instead of stopping the whole app.
- [CF app route unmap](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-route-unmap): Disconnect the app from its route without stopping the app itself.
