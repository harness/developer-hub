---
title: AI SRE Security
description: Learn about security measures applied to Harness AI SRE.
sidebar_position: 90
sidebar_label: Security
redirect_from:
- /docs/incident-response/resources/ai-sre-security
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness AI SRE includes security measures to protect incident data, ensuring confidentiality, integrity, and availability. It integrates with the Harness Platform's security features, including authentication, role-based access control (RBAC), audit trails, and secret management. 

Security measures include:

- Data encryption in transit (TLS 1.3) and at rest (AES 256)
- Role-based access controls to restrict incident data
- Secure API authentication for third-party integrations
- Audit logging for compliance tracking

## Security Measures

Harness AI SRE ensures incident security by restricting access, encrypting data, and logging all activities.

- **Access Management**: Supports authentication via SAML, OAuth, and API tokens.
- **Data Protection**: Encrypts incident metadata, logs, and communication history.
- **Automation & Runbook Security**: Ensures that only authorized users execute automated actions.
- **Audit & Compliance**: Logs every action for tracking and compliance reviews.

---

## Role-Based Access Control (RBAC)

AI SRE uses the Harness Platform's RBAC system. Roles are configured under **Organization**, **Account**, or **Project** settings → **Roles**.

:::note
AI SRE runs under its own dedicated Harness project. Apply roles at the **Project** level unless your organization requires broader account- or org-level access.
:::

### AI SRE Permissions

This section explains every permission available under the AI SRE resource group in Harness role-based access control (RBAC). Each permission describes what a person with that permission is allowed to do, and what they cannot do without it.

Permissions are grouped by resource type (the kind of thing being protected, e.g., Schedules or Runbooks). Within each resource, individual actions (View, Create, Edit, Delete, etc.) can be granted independently. A user only sees and can act on a resource if their assigned role includes the relevant action for that resource type.

:::tip
Granting an action is additive. For example, giving someone Edit on Schedules lets them change existing schedules, but they still cannot see those schedules unless they also have View, nor create new ones without Create. View is the foundation; most other actions are only useful alongside it.
:::

#### Escalation Policy

Escalation policies define who gets notified, and in what order, when an incident or alert needs attention and the first responder does not acknowledge it.

:::note
All authenticated users automatically have VIEW permission for escalation policies.
:::

| Action | What it lets the user do |
|---|---|
| View | See existing escalation policies and how they are configured. |
| Create | Add new escalation policies. |
| Edit | Modify an existing escalation policy — change escalation steps, timing, or who is notified. |
| Delete | Remove escalation policies. |

#### Incident

Incidents are the core records of an active or past disruption. This resource covers the incidents themselves and the templates used to standardize how incidents are created.

| Action | What it lets the user do |
|---|---|
| View | See incidents and their details (timeline, status, responders, etc.). |
| Create / Edit | Open new incidents and update existing ones, including status, fields, severity, assignments, and other incident details. |
| Send Status Update | Post status updates to an incident to communicate progress to stakeholders and subscribers. |
| Manage Templates | Create and configure incident templates that standardize how new incidents are structured and pre-populated. This is an administrative capability typically reserved for those who set up the incident process, not everyday responders. |

#### SLOs

Service Level Objectives (SLOs) define reliability targets for a service (for example, "99.9% availability") and track performance against them.

| Action | What it lets the user do |
|---|---|
| View | See defined SLOs and their current status against target. |
| Create | Define new SLOs. |
| Edit | Adjust an existing SLO's targets, thresholds, or configuration. |
| Delete | Remove SLOs. |

#### Schedule

On-call schedules determine who is responsible for responding at any given time. They underpin escalation and notification.

:::note
All authenticated users automatically have VIEW permission for schedules.
:::

| Action | What it lets the user do |
|---|---|
| View | See on-call schedules and who is currently on call. |
| Create | Build new on-call schedules. |
| Edit | Change an existing schedule — rotation order, shift timing, or participants. |
| Delete | Remove schedules. |

#### Schedule Override

A schedule override is a temporary, one-off change to an on-call schedule, for example, covering a shift for a colleague who is out, without permanently altering the underlying schedule.

:::note
All authenticated users automatically have VIEW permission for schedule overrides.
:::

| Action | What it lets the user do |
|---|---|
| View | See existing overrides applied to schedules. |
| Create | Add a temporary override (for example, swap or cover a shift). |
| Edit | Change an existing override's time range or assignee. |
| Delete | Remove an override and restore the original schedule for that period. |

#### Runbook

Runbooks are automated or guided procedures that help responders diagnose and remediate issues, often executed during an incident.

| Action | What it lets the user do |
|---|---|
| View | See runbooks and their steps. |
| Create | Add new runbooks. |
| Edit | Modify a runbook's steps, inputs, or logic. |
| Delete | Remove runbooks. |
| Incident Trigger | Configure a runbook to run in the context of an incident, allowing the runbook to be launched or triggered as part of incident response. |

#### Alerts

Alerts are signals from monitoring and observability sources that something may be wrong. This resource covers alerts and the templates that standardize how they are handled.

| Action | What it lets the user do |
|---|---|
| View | See incoming alerts and their details. |
| Create / Edit | Generate and update alerts, including changing their fields and status. |
| Manage Templates | Create and configure alert templates that standardize how incoming alerts are structured and processed. An administrative capability for those who set up alert handling. |

#### Alert Rule

Alert rules define the conditions that turn raw signals into alerts — for example, routing, grouping, suppression, or which alerts should page someone.

| Action | What it lets the user do |
|---|---|
| Create | Define new alert rules. |
| Edit | Modify the conditions, routing, or behavior of an existing alert rule. |
| Delete | Remove alert rules. |

#### Service Directory

The service directory is the catalog of services being monitored — their owners, dependencies, and associated configuration.

| Action | What it lets the user do |
|---|---|
| View | See the services in the directory and their details. |
| Edit | Update a service's information, ownership, or configuration. |
| Delete | Remove a service from the directory. |
| Manage Subscriptions | Subscribe or unsubscribe from service update notifications. |

#### Third Party Integrations

Third party integrations connect AI SRE to external tools — monitoring systems, chat platforms, ticketing systems, and other services.

| Action | What it lets the user do |
|---|---|
| View | See which third party integrations are configured. |
| Edit | Set up or change integration settings, including connection details, field mappings, and credentials. |
| Delete | Remove an integration. |

#### Workspace

The workspace represents the overall AI SRE environment and its top-level settings.

| Action | What it lets the user do |
|---|---|
| Workspace Configure | Manage workspace-level configuration and settings. This is a high-level administrative permission affecting the AI SRE environment as a whole. |

### Quick Summary of Common Actions

| Action | General meaning |
|---|---|
| View | Read-only access — see the resource but make no changes. |
| Create | Add new instances of the resource. |
| Edit | Change existing instances. |
| Delete | Remove instances. |
| Create / Edit | Combined permission to both add new instances and update existing ones (used for Incidents and Alerts). |
| Send Status Update | Post status updates to communicate progress (used for Incidents). |
| Manage Templates | Administrative control over the templates that standardize a resource (used for Incidents and Alerts). |
| Manage Subscriptions | Subscribe or unsubscribe from notifications (used for Service Directory). |
| Incident Trigger | Allow a Runbook to be launched in the context of an incident. |
| Workspace Configure | Manage environment-wide AI SRE settings. |

### Creating Custom Roles

Custom roles can be created by combining the permissions above to match your organization's access requirements. Common role patterns include:

- **Admin role** — Grants full access (View, Create, Edit, Delete) to all AI SRE resources, plus Manage Templates for Incidents and Alerts, and Workspace Configure.
- **User role** — Grants operational access (View, Create, Edit) without Delete permissions. Includes Incident Trigger for runbooks but not Manage Templates or Workspace Configure.
- **Viewer role** — Grants read-only access (View only) to AI SRE resources.

Create roles that match your organization's needs using the available AI SRE permissions.

### Configure RBAC

1. Navigate to **Project Settings** → **Access Control** → **Roles**.
2. Select an existing role to edit, or click **New Role** to create one.
3. Under the **AI SRE** resource group, enable the permissions required for the role.
4. Assign the role to users or user groups under **Project Settings** → **Access Control** → **Users** or **User Groups**.

---

## Security Components

<Tabs>
<TabItem value="Incident Data Storage">
<div style={{ display: "none" }}>
### Incident Data Storage
</div>

Incident data, logs, and automation history are securely stored.

- Data is encrypted and retained per organization policies.
- Access is controlled through RBAC.

:::note Data Retention
Harness AI SRE retains incident logs and history based on your organization's settings.
:::

</TabItem>
<TabItem value="Secure Automation & Runbooks">
<div style={{ display: "none" }}>
### Secure Automation & Runbooks
</div>

Runbooks execute predefined automation securely.

- Actions run in a controlled environment.
- API requests require valid authentication.

:::tip API Security
Runbook executions require API keys or OAuth authentication for third-party integrations.
:::

</TabItem>
<TabItem value="Communication & Webhook Security">
<div style={{ display: "none" }}>
### Communication & Webhook Security
</div>

Harness AI SRE integrates with communication tools and on-call platforms through secure webhooks and APIs.

- Incoming webhooks receive incident alerts.
- Outbound notifications are not permitted.

</TabItem>
</Tabs>

---

## Operational Security

Harness AI SRE ensures security at every stage:

1. **Incident Creation & Logging**  
   - Incidents are created through authenticated sources (UI, API, webhooks).  
   - Data is encrypted before storage.

2. **Access & Role Management**  
   - RBAC controls who can access incidents, schedules, escalation policies, and SLOs.  
   - Roles are applied at the Project level for AI SRE. Authentication via OAuth/SAML is required.

3. **Automation Execution**  
   - Actions are logged for compliance.  
   - Only approved integrations execute via [Harness Delegates](/docs/platform/delegates/delegate-concepts/delegate-overview).

4. **Audit & Compliance Logging**  
   - Every action is recorded for compliance audits.  
   - Logs can be exported for security reviews.

5. **Third-Party Integration Security**  
   - OAuth tokens, API keys, and access scopes protect integrations.  
   - Secure connections use TLS 1.3 encryption.

---

## Best Practices

To enhance security in Harness AI SRE:

- Use RBAC policies to limit access. Apply roles at the Project level and create viewer roles for read-only users.
- Enable OAuth/SAML authentication.
- Review audit logs regularly.
- Use API tokens with least privilege.
- Encrypt webhook notifications.