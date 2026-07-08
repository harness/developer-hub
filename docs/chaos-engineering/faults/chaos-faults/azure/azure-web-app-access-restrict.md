---
id: azure-web-app-access-restrict
title: Azure web app access restrict
sidebar_label: Azure Web App Access Restrict
description: Add an Access Restriction rule to one or more Azure App Service web apps for a configurable duration so you can test how clients behave when traffic to the web app is blocked.
keywords:
  - chaos engineering
  - azure web app access restrict
  - azure fault
  - app service
tags:
  - chaos-engineering
  - azure-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-web-app-access-restrict
- /docs/chaos-engineering/chaos-faults/azure/azure-web-app-access-restrict
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Azure web app access restrict is an Azure chaos fault that adds an Access Restriction rule (`RULE_NAME`) to one or more App Service web apps listed in `AZURE_WEB_APP_NAMES` (in `RESOURCE_GROUP`, subscription `AZURE_SUBSCRIPTION_ID`) with `ACTION` against `IP_ADDRESS_BLOCK` at priority `PRIORITY` for `TOTAL_CHAOS_DURATION` seconds, then removes the rule. With the defaults (`Deny` against `0.0.0.0/0`), the web app rejects every inbound request from the front-end with `403 Forbidden` while the rule is in effect.

Use this fault to test how clients behave when traffic to an App Service web app is blocked without the app being stopped: whether Traffic Manager / Front Door reroute traffic, whether dependent services degrade gracefully, and whether monitoring detects the outage within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Web app blocked at the front-end:** When the Access Restriction returns 403 to every caller, do Traffic Manager / Front Door route around the web app inside the failover SLA?
- **Subset blocked:** Set `IP_ADDRESS_BLOCK` to a specific subnet to simulate blocking a single caller (for example, the API gateway).
- **Monitoring fidelity:** Do alerts on `Http4xx` or `Http403` fire inside the alerting SLA?
- **Recovery rehearsal:** Validate the runbook for removing an Access Restriction in case one is left over from a misconfiguration.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target web apps reachable:** Each entry in `AZURE_WEB_APP_NAMES` exists in `RESOURCE_GROUP`.
- **Azure credentials available:** Service principal File Secret, workload identity, or managed identity.
- **RBAC granted:** The principal includes the role listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| App Service (Windows or Linux plans) | Supported |
| Function Apps | Supported (same `Microsoft.Web/sites/config` actions apply) |
| App Service Environment (ASE) v3 | Supported |

---

## Permissions required

The Azure principal used by the chaos pod needs the following role on the target resource group or subscription.

**Recommended built-in role:** `Website Contributor`

**Custom role (minimum actions):**

```json
{
  "Name": "Harness Chaos Web App Access Restrict",
  "Actions": [
    "Microsoft.Web/sites/read",
    "Microsoft.Web/sites/config/read",
    "Microsoft.Web/sites/config/write"
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

Configure the following fault parameters when you add Azure web app access restrict to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_WEB_APP_NAMES` | Comma-separated list of web app names. | (required) |
| `RESOURCE_GROUP` | Resource group that contains the web apps. | (required) |

**Rule parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `RULE_NAME` | Name of the Access Restriction rule the fault creates. | `chaos-experiment-rule` |
| `ACTION` | Rule action: `Deny` (block) or `Allow` (whitelist). | `Deny` |
| `PRIORITY` | Priority of the rule (lower numbers take precedence). | `300` |
| `IP_ADDRESS_BLOCK` | CIDR block that the rule applies to. | `0.0.0.0/0` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The rule stays in effect for this period. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `60` |
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

Updates the `ipSecurityRestrictions` of each web app in `AZURE_WEB_APP_NAMES` to add an entry named `RULE_NAME` with action `ACTION`, priority `PRIORITY`, applied to `IP_ADDRESS_BLOCK`. Waits for `TOTAL_CHAOS_DURATION`, then removes the rule and writes back the config.

---

## Expected behavior during fault execution

- The web app's front-end immediately enforces the new rule; matching traffic receives `403 Forbidden` (Deny) or non-matching traffic receives `403 Forbidden` (Allow with a narrow IP block).
- Existing connections may stay open briefly before the front-end recycles them.
- Azure Monitor shows a spike in `Http4xx` / `Http403` on the affected web apps.
- After the duration ends, the rule is removed and the web app accepts traffic normally again.

:::info When the fault ends
The chaos pod removes the rule from `ipSecurityRestrictions` and writes back the config. Front-end enforcement reverts within seconds.
:::

### Signals to watch

- **External availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) from a caller in the affected IP range and assert `403` during the chaos window.
- **Failover:** If Traffic Manager / Front Door is in front, use an HTTP probe on the public endpoint and assert it stays available.

---

## Verify the fault execution effect

1. **Inspect the Access Restrictions on the web app.**

   ```bash
   az webapp config access-restriction show \
     --resource-group <rg> \
     --name <webapp>
   ```

   You should see an entry named `RULE_NAME` during the chaos window and none after.

2. **Hit the web app URL from a caller in the blocked range.**

   ```bash
   curl -i https://<webapp>.azurewebsites.net
   ```

   Expect `403 Forbidden` during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the `RULE_NAME` rule from each web app's `ipSecurityRestrictions`.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the rule.
- **Manual recovery:** Run `az webapp config access-restriction remove --resource-group <rg> --name <webapp> --rule-name <RULE_NAME>` for any web app that still has the rule.

---

## Limitations

- **Front-end enforcement:** Access Restrictions are enforced at the App Service front-end; in-region private endpoints may bypass them depending on configuration.
- **Same-subscription targeting:** A single experiment targets one `AZURE_SUBSCRIPTION_ID`.
- **Rule name collision:** If a rule named `RULE_NAME` already exists, the API call fails. Override `RULE_NAME` per experiment.
- **PRIORITY collisions:** If `PRIORITY` collides with an existing rule, the API call fails; pick an unused priority (300 is the default).

---

## Troubleshooting

<Troubleshoot
  issue="Azure web app access restrict fails with rule already exists in Harness Chaos Engineering"
  mode="docs"
  fallback="A rule named RULE_NAME (default chaos-experiment-rule) already exists on the web app. Remove it with az webapp config access-restriction remove -g <rg> -n <webapp> --rule-name <name>, or set RULE_NAME to a unique value."
/>

<Troubleshoot
  issue="Azure web app access restrict fails with AuthorizationFailed"
  mode="docs"
  fallback="The Azure principal is missing Microsoft.Web/sites/config/write. Assign Website Contributor (or a custom role with the listed actions) on the target resource group or subscription."
/>

<Troubleshoot
  issue="Rule was not removed after the experiment ended"
  mode="docs"
  fallback="If the chaos pod exited before cleanup, run az webapp config access-restriction remove --resource-group <rg> --name <webapp> --rule-name <RULE_NAME>. Inspect the chaos pod logs to root-cause why cleanup failed."
/>

---

## Related faults

- [Azure web app stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-web-app-stop): Stop the web app entirely instead of blocking traffic with a rule.
- [Azure instance stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-stop): Stop a VM hosting the workload instead of an App Service web app.
