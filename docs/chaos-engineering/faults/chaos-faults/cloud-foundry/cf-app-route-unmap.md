---
id: cf-app-route-unmap
title: CF app route unmap
sidebar_label: CF App Route Unmap
description: Temporarily unmap a route from a Cloud Foundry app so you can test how upstream consumers behave when the app becomes unreachable via that route.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app route unmap
  - route disruption
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-route-unmap
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-route-unmap
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFSecrets from './shared/cf-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app route unmap is a Cloud Foundry chaos fault that detaches a specific route (`host`, `path`, optional `port`) from `app` in `organization`/`space` for `duration` seconds, then re-maps it. The app itself keeps running; only its inbound route is disrupted.

Use this fault to validate how consumers behave when an app stops being reachable via one of its routes: gateway retries, fallback responses, alerting on 404s from the router, and DNS-level fallbacks.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Gateway resilience:** Confirm an upstream gateway or load balancer fails over correctly when one route returns 404 from the CF router.
- **Failover routes:** Validate that secondary routes mapped to the same app continue serving traffic.
- **Consumer behavior:** Test consumer retry, fallback, and circuit-breaker logic when a known endpoint disappears.
- **Operational drills:** Practice the runbook for unintentional route removal.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) that can reach the Cloud Foundry API and UAA endpoints.
- **CF credentials:** `CF_API_ENDPOINT`, `CF_USERNAME`, `CF_PASSWORD`, and `UAA_SERVER_ENDPOINT` available on the LCI host.
- **Target identifiers:** You know the `organization`, `space`, `app`, `host`, and (if non-root) `path` and `port` of the route to unmap.
- **Route mapping exists:** The route is currently mapped to the app (run `cf routes` to confirm).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Cloud Foundry (TAS, PCF, open-source) | Supported |
| Apps with only a default route | Supported (the default route is unmapped and re-mapped) |

---

## Permissions required

| Action | Required role | Required OAuth scope |
| --- | --- | --- |
| List apps and routes the user can access | `SpaceDeveloper`, `SpaceAuditor`, `OrgManager`, or `OrgAuditor` | `cloud_controller.read` or `cloud_controller.admin` |
| Unmap and re-map the route | `SpaceDeveloper` in the app's space | `cloud_controller.write` or `cloud_controller.admin` |

---

## Authentication

| Layer | Where to provide | Tunables |
| --- | --- | --- |
| Cloud Foundry API | `/etc/linux-chaos-infrastructure/cf.env` on the LCI host | `CF_API_ENDPOINT`, `CF_USERNAME`, `CF_PASSWORD`, `UAA_SERVER_ENDPOINT` |
| vSphere (only when `faultInjectorLocation: vSphere`) | `/etc/linux-chaos-infrastructure/vsphere.env` | `GOVC_URL`, `GOVC_USERNAME`, `GOVC_PASSWORD`, `GOVC_INSECURE`, `VM_NAME`, `VM_USERNAME`, `VM_PASSWORD` |

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `organization` | CF organization that owns the app. | (required) |
| `space` | CF space within the organization. | (required) |
| `app` | Name of the app whose route is unmapped. | (required) |
| `host` | Host (subdomain) component of the route to unmap. For example, `my-app` for `my-app.apps.example.com`. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `path` | Path component of the route. Leave empty to target the root route. | `""` |
| `port` | TCP port of the route. Required only for TCP routes. | `""` |
| `duration` | Total chaos duration. The route is re-mapped after this period. | `30s` |
| `faultInjectorLocation` | Where the fault-injector runs. Supports `local` and `vSphere`. | `local` |
| `faultInjectorPort` | Local port used by the fault-injector. | `50320` |
| `skipSSLValidation` | Skip SSL validation when calling CF APIs. | `false` |
| `rampTime` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to Cloud Foundry, locates the route specified by `host`/`path`/`port` mapped to `app`, calls the CF API to unmap it, waits `duration` seconds, then re-maps the same route. Consumers hitting the route during the fault receive 404 from the CF router because the route no longer points at any app.

---

## Expected behavior during fault execution

- Requests to the unmapped route receive `404 Not Found` from the Cloud Foundry router.
- The app itself continues to serve other routes normally.
- After the fault ends, the route is re-mapped and requests succeed again.

### Signals to watch

- **Route reachability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the route under test and assert the expected failure mode during the chaos window.
- **Secondary route health:** Probe alternative routes mapped to the same app and confirm they keep returning 2xx.

---

## Recovery and cleanup

- The fault re-maps the route automatically when `duration` elapses.
- If the experiment is aborted, the fault still attempts to re-map the route on exit.

---

## Limitations

- Affects only the specific route identified by `host`/`path`/`port`. Other routes on the same app are unaffected.
- The fault does not delete the route from CF, only its mapping to the app. The route definition itself remains.

---

## Troubleshooting

<Troubleshoot
  issue="CF app route unmap fails with 'route not found' in Harness Chaos Engineering"
  mode="docs"
  fallback="Run cf routes from the LCI host as CF_USERNAME and confirm the host/path/port combination is currently mapped to the app. The host must be the subdomain only (not the full FQDN)."
/>

<Troubleshoot
  issue="Route was not re-mapped after the experiment ended"
  mode="docs"
  fallback="The fault attempts a re-map on cleanup. If it failed, manually re-map with cf map-route <app> <domain> --hostname <host> --path <path>."
/>

---

## Common configurations

### Unmap a path-based route

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-route-unmap
  labels:
    name: app-route-unmap
spec:
  cfAppRouteUnmap/inputs:
    duration: 60s
    faultInjectorLocation: local
    app: cf-app
    organization: dev-org
    space: dev-space
    host: my-app
    path: /api/v1
```

### Unmap a TCP route

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-route-unmap
  labels:
    name: app-route-unmap
spec:
  cfAppRouteUnmap/inputs:
    duration: 30s
    faultInjectorLocation: local
    app: cf-app
    organization: dev-org
    space: dev-space
    host: my-app
    port: "1024"
```

---

<CFSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app stop](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-stop): Stop the entire app rather than only its route.
- [CF app container kill](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-container-kill): Kill a container instance instead of unmapping a route.
