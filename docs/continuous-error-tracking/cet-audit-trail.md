---
title: Audit trail
description: View audit events for CET.
sidebar_position: 7
---


# CET Audit trail

Your Harness account [Audit Trail](/docs/platform/governance/audit-trail/audit-trail.md) includes events for CET changes.

## CET events in the Audit Trail

To access the Audit Trail, in your Harness project, navigate to **Account Settings** > **Audit Trail**.  

The Account Audit Trail page is displayed.

The Account Audit Trail includes the following CET events:

- User activity such as login
- Creation, revocation, or deletion of CET Agent Tokens
- Edits, updates, or deletions of critical events

Each event in the Account Audit Trail list provides the following details:

- Action: Describes the specific activity, such as logging in or deleting.
- Resource name and type: Identifies the resource type and its name where the event occurred. For example, monitored service, agent, or user.
- Organization and project: Name of the organization and the project in which the event occurred.

When you click on a resource name, you will be directed to the corresponding event page. For instance, clicking on an **Agent Token** resource will take you to the Agent Token listing page, while clicking on a **Monitored Service** resource will redirect you to the monitored services listing page.


<docimage path={require('./static/cet-audit-trail-list.png')} />


## Event summary page

To see more information about a particular event, select the messaging icon next to it. The Event Summary page appears, displaying the following information:

- Date and time when the event occurred.
- Username associated with the event.
- Details of the activity. For example, an update.
- Type and name of the resource.

You can also see a snapshot of changes in YAML format by expanding YAML Difference.


<docimage path={require('./static/cet-audit-trail-event-summary.png')} />