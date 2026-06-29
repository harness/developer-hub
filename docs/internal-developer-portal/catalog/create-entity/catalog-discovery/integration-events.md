---
title: Integration Events
description: Monitor sync and lifecycle activity for Airbyte-based integrations in Harness IDP. Understand event types, statuses, and how to use the Events tab.
sidebar_label: Integration Events
sidebar_position: 12
---

import DocImage from '@site/src/components/DocImage';

The **Events** tab is available for every Airbyte-based integration. It logs all sync runs, integration lifecycle events, import operations, and entity unlink events for that integration. Use it to verify that scheduled syncs are completing, confirm that imports finished successfully, and investigate failures.

:::info
* The Events tab is available for the following integrations: [Bitbucket Cloud](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/bitbucket-cloud), [Datadog](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/datadog), [Dynatrace](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/dynatrace), [GitHub](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/github), [Google Cloud](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/gcp), [PagerDuty](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/pagerduty), [ServiceNow CMDB](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/servicenow-cmdb), and [SonarQube](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/sonarqube). It is not available for Harness CD, Kubernetes integration, and Platform integrations.

* Events are retained for 180 days. Events older than 180 days are automatically removed and cannot be recovered.

:::

---

## Access the Events tab

1. In Harness IDP, go to **Configure** → **Integrations**.
2. Find your integration card and click **View**.
3. On the integration detail page, click the **Events** tab.

    <DocImage path={require('./static/integration-events.png')} />

---

## Filter events

Two dropdowns let you narrow the event list:

- **Event Type**: Filters by the kind of action that generated the event. Go to [Event type reference](#event-type-reference) for the full list.
- **Status**: Filters by outcome. Available values are **Success**, **Partial Success**, **Running**, and **Failed**.

    <DocImage path={require('./static/events-filters.gif')} />

The event list refreshes automatically every minute. Click **Refresh events** in the top right to reload the list immediately.

---

## Event table columns

The event list displays the following columns for each event.

<DocImage path={require('./static/event-table-columns.png')} />

| Column | Description |
|---|---|
| **Event Name** | The name of the event as shown in the UI, indicating the action and its outcome. |
| **Status** | The result of the event: **Success**, **Partial Success**, **Running**, or **Failed**. |
| **Description** | A brief summary of the event outcome, including record counts where applicable. |
| **Started** | The date and time when the event began. |
| **Last Updated** | The most recent timestamp for this event. |
| **Triggered By** | The actor that initiated the event, such as **System** for scheduled syncs. |

---

## Event details panel

Click any event row to open a details panel on the right side of the page.

<DocImage path={require('./static/integration-event-details.png')} />

| Field | Description |
|---|---|
| **Integration ID** | The unique identifier of the integration. |
| **Started At** | The exact date and time the event started. |
| **Last Updated** | The most recent update timestamp. |
| **Duration** | How long the event took to complete. |
| **Records Synced** | The number of records processed during the event. |
| **Trigger Source** | What initiated the event: `scheduled` for automated syncs, or `manual` when triggered using the **Sync** button. |
| **Streams** | The data streams involved in this event, such as the resource types being synced. |
| **Description** | A summary of the event outcome. |

---

## Event type reference

| Event Type | Status | Event Name |
|---|---|---|
| **Sync run** | Running | Syncing records |
| | Success | Sync completed |
| | Partial Success | Sync partially completed |
| | Failed | Sync failed |
| **Integration created** | Running | Creating integration |
| | Success | Integration created |
| | Failed | Integration creation failed |
| **Integration updated** | Running | Updating integration |
| | Success | Integration updated |
| | Failed | Integration update failed |
| **Integration enabled** | Running | Enabling integration |
| | Success | Integration enabled |
| | Failed | Integration enable failed |
| **Integration disabled** | Running | Disabling integration |
| | Success | Integration disabled |
| | Failed | Integration disable failed |
| **Entities manual import** | Running | Starting manual import |
| | Success | Manual import complete |
| | Partial Success | Manual import partially completed |
| | Failed | Manual import unsuccessful |
| **Auto import** | Running | Auto-importing \<kind\> |
| | Success | \<kind\> auto-imported |
| | Partial Success | \<kind\> auto-import partially completed |
| | Failed | \<kind\> auto-import failed |
| **Entities unlink** | Running | Unlinking entities |
| | Success | Entities unlinked |
| | Partial Success | Entities partially unlinked |
| | Failed | Unlink failed |

:::info
For **Auto import** events, `<kind>` is replaced by the actual entity kind being processed, such as `resource` or `component`.

For integration lifecycle events (Integration created, updated, enabled, and disabled), a **Failed** status covers both full failures and partial failures.

For **Sync run** events, a **Failed** status can indicate one of three conditions: the sync encountered an error, the sync got stuck and was marked stale by the system, or a newer sync started before this one completed and overrode it.
:::
