---
title: Audit
sidebar_label: Audit
description: Use the Harness CLI to read the audit trail, filter audit events by date, resource type, action, and principal, and inspect the YAML diff of a change.
sidebar_position: 8
keywords:
  - harness cli
  - audit
  - audit trail
  - audit event
  - compliance
---

The Harness audit trail records every create, update, and delete across every Harness module. The CLI gives you read-only access to that trail, so you can answer who changed what and when from your terminal or from a script, and inspect the exact YAML diff of a change.

This page covers all Audit resources and actions available in the CLI.

---

## What you will learn in this topic

By the end of this page, you will know how to:

- List audit events and understand the default time window.
- Filter events by date range, resource type, action, and principal.
- Retrieve a single event with the YAML diff of the change.

---

## Before you begin

- **Harness CLI installed and authenticated:** For setup steps, see [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate).
- **Audit view permissions:** Reading the audit trail requires view access on the audit trail at the scope you query. For more information about the permission model, see [Audit trail](/docs/platform/governance/audit-trail).

---

## Audit events

An audit event is one recorded change to one resource. Every create, update, and delete in Harness produces an event, and the audit trail is read-only: you can query events but never modify them.

### List audit events

By default the command returns events from the last seven days.

```sh
harness list audit_event
harness list audit_event --all --format json
harness list audit_event --limit 50
```

### Filter audit events

Narrow the trail with these flags:

- **`--from`:** Start of the time window.
- **`--to`:** End of the time window.
- **`--resource-type`:** Restricts results to one resource type.
- **`--action`:** Restricts results to one action, such as a create or a delete.
- **`--principal`:** Restricts results to changes made by one user or service account.

```sh
harness list audit_event --from <start_date> --to <end_date>
harness list audit_event --resource-type <resource_type>
harness list audit_event --action <action>
harness list audit_event --principal <email|uid|id>
harness list audit_event --resource-type <resource_type> --action <action> --from <start_date>
```

### Get an audit event

Retrieve a single event. The response includes the YAML diff of the change, so you can see the before and after state of the resource.

```sh
harness get audit_event <audit_event_id>
harness get audit_event <audit_event_id> --format json
```

---

## Related articles

- [Governance](/docs/platform/harness-cli/harness-cli-commands/governance-commands): Manage the OPA policies that gate the changes the audit trail records.
- [Audit trail](/docs/platform/governance/audit-trail): Understand the full audit model and streaming options.
- [Platform](/docs/platform/harness-cli/harness-cli-commands/platform-commands): Manage account resources, connectors, and secrets.
