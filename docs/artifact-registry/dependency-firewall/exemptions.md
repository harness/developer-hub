---
title: Dependency Exemptions
description: Request, review, and manage temporary exemptions that allow blocked or warned dependencies to be used through Harness Artifact Registry's Dependency Firewall.
sidebar_label: Exemptions
sidebar_position: 3
keywords:
  - dependency-firewall
  - exemptions
  - policy-violations
  - approvals
  - governance
tags:
  - artifact-registry
  - dependency-firewall
  - exemptions
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

When Dependency Firewall flags a package version as **Blocked** or **Warning**, an exemption is the supported way to grant temporary access. A developer files a request with a business justification and remediation plan, an approver reviews it, and on approval the version becomes usable for a fixed duration. After the duration elapses the exemption expires and the original policy verdict applies again.

## Roles

| Role | Responsibilities |
|---|---|
| **Requester** | Any AR user with download access to artifacts in the project. Files exemption requests from the Policy Violations tab and can edit or withdraw pending requests. |
| **Exemption Approver** | Reviews requests and approves or rejects them from the Exemptions tab. The same person can be both Requester and Approver. |

## Prerequisites

- Dependency Firewall is enabled. Go to the [Dependency Firewall overview](/docs/artifact-registry/dependency-firewall/overview) to enable it on your upstream proxy registries.
- At least one upstream proxy registry has produced a `Warning` or `Blocked` policy violation.
- For approval actions, the user holds the **Exemption Approver** role on the project.

## Exemption Lifecycle

Every exemption moves through these states:

| State | How it gets there | What it allows |
|---|---|---|
| `PENDING` | Requester submits the form. | The version stays under its original `Warning` or `Blocked` verdict. |
| `APPROVED` | Approver approves the request. The duration timer starts now. | The version becomes usable until expiry. |
| `REJECTED` | Approver rejects the request. | The original verdict stands. |
| `EXPIRED` | The approved duration has elapsed. | The original verdict applies again. A new request is required to renew. |

The **Exemptions** tab summary cards (`Total`, `Approved`, `Rejected`, `Pending`, `Expired`) and the row **Status** column both reflect these states.

## Request an Exemption

Requesters file an exemption from a specific row on the Policy Violations tab.

1. Open **Dependency Firewall** in the project's left navigation and stay on the **Policy Violations** tab.
2. Find the dependency and version you need access to. The **Status** column shows `WARNING` or `BLOCKED`.
3. On the row, open the overflow menu (`⋮`) and choose **Request Exemption**.

<DocImage
  path={require('./static/request-exemption-menu.png')}
  alt="Policy Violations tab showing 2,193 total violations split across 2,138 Blocked and 55 Warning, with a Blocked row's overflow menu open and Request Exemption highlighted"
  title="Open Request Exemption from the row overflow on the Policy Violations tab"
  width="100%"
/>

4. Fill in the slide-out form. Package Name and Version are pre-filled from the violation row.

   | Field | Description |
   |---|---|
   | **Package Name** | Pre-filled. Read-only. |
   | **Version** | Pre-filled. Add additional versions in the same field if more than one is needed. |
   | **Exemption duration (in days)** | Number of days the exemption stays active once approved. |
   | **Business justification** | Why the exemption is necessary for your operation. |
   | **Remediation plan** | How and when you plan to upgrade or replace the dependency. |

5. Click **Send Exemption Request**. The request enters the `PENDING` state and is visible to every Exemption Approver on the Exemptions tab.

<DocImage
  path={require('./static/request-exemption-form.png')}
  alt="Request dependency exemption slide-out with Package Name, Version, Exemption duration, Business justification, and Remediation plan fields"
  title="Request dependency exemption form"
  width="60%"
/>

:::tip Route exemption events to Slack, email, or other channels
Approvers are not notified by default when a request is filed. To push exemption activity to Slack, Microsoft Teams, email, PagerDuty, webhooks, or Datadog, configure a **Centralised Notification** rule for Artifact Registry. Two events are available today:

- `Dependency Firewall Exemption Requested`: fires when a new request is submitted.
- `Dependency Firewall Exemption Status Changed`: fires on a status transition.

Go to [Artifact Registry Notifications](/docs/platform/notifications/centralised-notification#artifact-registry-notifications) to walk through the rule wizard, and [Notification settings](/docs/platform/notifications/notifications-overview) to review the supported channels and account-level controls. Notification rules can be scoped to all organizations or specific organizations.
:::

## Review and Decide on a Request

Approvers act on `PENDING` requests from the Exemptions tab.

1. Open **Dependency Firewall** and switch to the **Exemptions** tab.
2. Click the **Pending Exemptions** summary card to filter the table, or use **Registries**, **Package Types**, or **Search** to narrow the list.
3. Click **Details** on the row to open the request.
4. Review the **Dependency Information** and **Exemption Details** (requested date, requested duration, business justification, remediation plan).
5. Click **Approve** or **Reject** in the page header.

<DocImage
  path={require('./static/exemption-details.png')}
  alt="Exemption detail page for a Pending request on the Polly nuget-upstream package, showing the Exemption ID in the header, dependency information, exemption details, and Approve and Reject buttons"
  title="Exemption detail page used by approvers"
  width="100%"
/>

The status updates immediately on the Exemptions tab. The decision is final, the request cannot be re-opened. To make further changes the requester must submit a new request.

When a request is **Approved**, the exact `package@version` is pulled into the corresponding upstream proxy registry and becomes available for use through that registry. Subsequent pulls of that version succeed instead of being blocked by the firewall, until the exemption expires.

## Track Exemptions

The Exemptions tab provides a view of every exemption at the current scope and its current state.

<DocImage
  path={require('./static/exemptions-list.png')}
  alt="Exemptions tab showing 55 total exemptions with the lifecycle states broken down across Approved, Rejected, Pending, and Expired summary cards, and a table of requests across npm, nuget, and go upstream proxies in PENDING, APPROVED, and EXPIRED states"
  title="Exemptions tab with summary cards and a request list spanning every lifecycle state"
  width="100%"
/>

The table columns are:

| Column | Notes |
|---|---|
| **Package Name** | Dependency name with its package-type icon. |
| **Versions** | Version or versions covered by the exemption. |
| **Upstream Registry** | Upstream proxy that surfaced the violation. |
| **Status** | Current lifecycle state. |
| **Requested At** | Submission time. |
| **Updated At** | Last status change (approval, rejection, edit). |
| **Expires At** | For `APPROVED` requests, the absolute expiry timestamp. Pending requests do not expire. |

Use the **Registries** and **Package Types** dropdowns or the **Search** box to scope the list.

## Edit or Withdraw a Pending Request

Any user with download permission at the current scope can modify a pending request. Once a request reaches `APPROVED` or `REJECTED` it is locked.

1. On the **Exemptions** tab, find the row in `PENDING` status.
2. Open the row overflow menu (`⋮`).
3. Choose **Edit Exemption** to update the duration, justification, or remediation plan, or **Delete** to withdraw the request.

<DocImage
  path={require('./static/exemption-row-menu.png')}
  alt="Exemptions tab with a Pending row's overflow menu open, showing Edit Exemption and Delete options. Other rows in the table are in PENDING and APPROVED states."
  title="Edit or Delete options on a Pending exemption row"
  width="100%"
/>

## Troubleshooting

<Troubleshoot
  issue="Request Exemption is missing from the row overflow on the Policy Violations tab"
  mode="fallback-only"
  fallback="Confirm Dependency Firewall is enabled for the upstream proxy that produced the violation, and that the violation status is Warning or Blocked. Passed versions cannot be exempted because they are not violations."
/>

<Troubleshoot
  issue="My exemption was approved but the dependency still appears as Blocked when fetched"
  mode="fallback-only"
  fallback="Confirm the exemption covers the exact version you are requesting (versions are matched precisely), the upstream proxy on the exemption matches the proxy you are pulling through, and the exemption status on the Exemptions tab is APPROVED rather than EXPIRED."
/>

<Troubleshoot
  issue="An approved exemption has expired and the dependency is blocked again"
  mode="fallback-only"
  fallback="Expired exemptions are not auto-renewed. Open the Policy Violations tab, choose Request Exemption on the dependency again, and submit a fresh request with an updated remediation plan."
/>

<Troubleshoot
  issue="Approvers did not receive a notification when an exemption was submitted"
  mode="fallback-only"
  fallback="Approver notifications are not sent by default. Configure a Centralised Notification rule for Artifact Registry on the Dependency Firewall Exemption Requested event and route it to the channel of your choice. Go to [Artifact Registry Notifications](/docs/platform/notifications/centralised-notification#artifact-registry-notifications) to walk through the rule wizard."
/>

## Next steps

- [Dependency Firewall overview](/docs/artifact-registry/dependency-firewall/overview)
- [Configure Policies and Policy Sets](/docs/artifact-registry/dependency-firewall/configure-policies)
- [Artifact Registry webhooks](/docs/artifact-registry/manage-registries/ar-webhooks)
