---
id: azure-web-app-stop
title: Azure web app stop
sidebar_label: Azure Web App Stop
description: Stop one or more Azure App Service web apps for a configurable duration, then start them again, so you can test how clients behave when the web app is unavailable.
keywords:
  - chaos engineering
  - azure web app stop
  - azure fault
  - app service
tags:
  - chaos-engineering
  - azure-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-web-app-stop
- /docs/chaos-engineering/chaos-faults/azure/azure-web-app-stop
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Azure web app stop is an Azure chaos fault that stops one or more App Service web apps listed in `AZURE_WEB_APP_NAMES` (in `RESOURCE_GROUP`, subscription `AZURE_SUBSCRIPTION_ID`) for `TOTAL_CHAOS_DURATION` seconds, then starts them again. While stopped, the web app returns `403 Web App Stopped` to all incoming requests.

Use this fault to test how clients behave when an App Service web app is unavailable: whether dependent services degrade gracefully, whether Traffic Manager / Front Door fail traffic over to a healthy region, and whether monitoring detects the outage within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Web app unavailable:** When the web app stops, do dependent services degrade gracefully?
- **Traffic Manager / Front Door:** Does traffic shift to a healthy region inside the failover SLA?
- **Slot-aware deployments:** With deployment slots configured, does the staging slot take production traffic correctly?
- **Monitoring fidelity:** Do alerts on `Microsoft.Web/sites/Availability` and HTTP-error metrics fire within the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target web apps reachable:** Each entry in `AZURE_WEB_APP_NAMES` exists in `RESOURCE_GROUP`.
- **Web app in `Running` state:** The fault refuses to stop a web app that is already `Stopped`.
- **Azure credentials available:** Service principal File Secret, workload identity, or managed identity.
- **RBAC granted:** The principal includes the role listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| App Service (Windows or Linux plans) | Supported |
| App Service slots (production only) | Supported |
| Function Apps | Supported (same Microsoft.Web actions apply) |
| App Service Environment (ASE) v3 | Supported |

---

## Permissions required

The Azure principal used by the chaos pod needs the following role on the target resource group or subscription.

**Recommended built-in role:** `Website Contributor`

**Custom role (minimum actions):**

```json
{
  "Name": "Harness Chaos Web App Stop",
  "Actions": [
    "Microsoft.Web/sites/read",
    "Microsoft.Web/sites/start/action",
    "Microsoft.Web/sites/stop/action"
  ],
  "AssignableScopes": ["/subscriptions/<SUBSCRIPTION_ID>"]
}
```

Go to [Azure fault permissions](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/fault-permissions) to read the full permission catalog.

---

## Authentication

Go to [Azure authentication methods](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/azure-authentication-methods) to set up Service principal, Workload identity, or Managed identity.

---

## Fault tunables

Configure the following fault parameters when you add Azure web app stop to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_WEB_APP_NAMES` | Comma-separated list of web app names. | (required) |
| `RESOURCE_GROUP` | Resource group that contains the web apps. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The web apps stay stopped for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple web apps are stopped: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_SUBSCRIPTION_ID` | Target Azure subscription ID. | `""` |
| `AZURE_CLIENT_ID` | Client ID of a user-assigned managed identity. | `""` |
| `AZURE_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the service principal JSON. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Calls the Azure App Service `stop` API on each web app in `AZURE_WEB_APP_NAMES` (in `RESOURCE_GROUP`), waits for `TOTAL_CHAOS_DURATION` seconds, then calls the `start` API to bring them back.

---

## Expected behavior during fault execution

- Each affected web app returns `403 Web App Stopped` (or `404 Site Not Available`) for the duration.
- Inbound HTTP/HTTPS connections to the web app are immediately closed.
- Traffic Manager / Front Door health probes start failing on the affected backends and traffic shifts.
- Azure Monitor `Microsoft.Web/sites/Availability` drops to 0.
- After the duration ends, the web apps restart; cold-start time depends on the runtime stack.

:::info When the fault ends
The chaos pod calls `start` on every targeted web app. The web app is reachable as soon as Azure marks it `Running`, typically within 5-30 seconds.
:::

### Signals to watch

- **Web app availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the web app URL and assert the expected error status during the chaos window.
- **Failover:** If Traffic Manager / Front Door is in front, use an HTTP probe on the public endpoint and assert it stays available.

---

## Verify the fault execution effect

1. **Inspect web app state.**

   ```bash
   az webapp show --resource-group <rg> --name <webapp> --query state
   ```

   The state should be `Stopped` during the chaos window and `Running` afterwards.

2. **Hit the web app URL.**

   ```bash
   curl -i https://<webapp>.azurewebsites.net
   ```

   The response should be `403 Web App Stopped` during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `start` on every web app.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also calls `start`.
- **Manual recovery:** Run `az webapp start --resource-group <rg> --name <webapp>` for any web app that stayed stopped.

---

## Limitations

- **Resource group scope:** All entries in `AZURE_WEB_APP_NAMES` must be in `RESOURCE_GROUP`.
- **Deployment slots:** The fault stops the production slot. To target a non-production slot, manage the slot separately.
- **Cold start:** Restart time depends on the runtime stack and app size; budget at least 30 seconds for large apps.

---

## Troubleshooting

<Troubleshoot
  issue="Azure web app stop fails with AuthorizationFailed in Harness Chaos Engineering"
  mode="docs"
  fallback="The Azure principal is missing Microsoft.Web/sites/stop/action or Microsoft.Web/sites/start/action. Assign Website Contributor (or a custom role with these actions) on the target resource group or subscription."
/>

<Troubleshoot
  issue="Web app did not return 403 during the chaos window"
  mode="docs"
  fallback="Verify the web app actually stopped with az webapp show -g <rg> -n <webapp> --query state. If state is Running, the chaos pod's stop call may have failed (check fault pod logs). Some custom error pages or front-end caches may also mask the 403."
/>

<Troubleshoot
  issue="Web app stayed Stopped after the experiment ended"
  mode="docs"
  fallback="Run az webapp start --resource-group <rg> --name <webapp> to start it manually. Inspect Azure Activity Log for failed start actions to root-cause why the chaos pod could not start it."
/>

---

## Related faults

- [Azure web app access restrict](/docs/chaos-engineering/faults/chaos-faults/azure/azure-web-app-access-restrict): Block traffic with an access restriction rule instead of stopping the web app.
- [Azure instance stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-stop): Stop a VM hosting the workload instead of an App Service web app.
