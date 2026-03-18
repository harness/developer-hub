---
title: Catalog Auto-Discovery & Population Overview
sidebar_position: 1
sidebar_label: Overview
description: Discover services from  integrations and sync them to the IDP Catalog
keywords:
  - catalog auto-discovery
  - cd auto-discovery
  - hierarchy entities
tags:
  - catalog-discovery
  - platform-cd
  - cd-auto-discovery
---

Integrations allow you to fetch data from Harness modules as well as third-party tools and services, and use that data to **create new catalog entities** or **enrich existing ones**. This gives you a unified, always-up-to-date view of your services and their metadata directly in the IDP Catalog.

The following integrations are currently available under the `IDP_INTEGRATIONS` feature flag:

- [**Harness CD**](./harness-cd.md) — Import CD services with customizable DORA metrics and deployment data.
- [**ServiceNow CMDB**](./servicenow-cmdb.md) — Sync CMDB records into the catalog with configurable field mappings.

Each integration follows a common workflow: configure the integration, review discovered entities, and choose whether to **register** them as new catalog entities or **merge** them into existing ones.

:::info
Before you begin your integrations journey, please ensure that:

1. The **`IDP_INTEGRATIONS`** feature flag is enabled for your account. Contact [Harness Support](mailto:support@harness.io) to enable it.
2. You have the required **RBAC permissions** to manage integrations. All integration operations require the **IDP Integration Edit** permission (`IDP_INTEGRATION_EDIT`) on the **IDP Integration** resource type (`IDP_INTEGRATION`).

:::

---

## Key Concepts

All integrations share the following concepts and workflow patterns.

### Discovered vs. Imported Entities

When an integration is enabled, it fetches data from the source system and surfaces the results in the **Discovered** tab of that integration. Discovered entities are not yet part of your catalog — they are candidates awaiting your action.

Once you review a discovered entity, you can choose one of two import actions:

- **Register** — Creates a new catalog entity from the discovered data.
- **Merge** — Links the discovered data to an existing catalog entity, enriching it with additional fields and metadata from the integration source. The existing entity's data is preserved; the integration data is layered on top.

After importing, entities appear in the **Imported** tab, which shows the relationship between the source record and the corresponding IDP catalog entity.

Customers have the option of turning on **Auto-import** for integrations. This will automatically import all discovered entities without needing the manual effort of reviewing discovered entities.

### Correlation Fields

Some integrations (e.g. ServiceNow CMDB) support a **Correlation field**, which is a catalog field (such as `name`) used to automatically match discovered entities to existing catalog entities. When a correlation match is found, the integration pre-selects the **Merge** option and populates the target entity dropdown, reducing manual effort.

### Integration Status on Entity Overview

Each catalog entity can optionally display an **Integrations** card on its Overview page. This card shows which integrations are connected to the entity and their current status (for example, **Connected** or **Not configured**). As you enable and merge additional integrations, this card updates to reflect the enriched data sources.

---

## Plugins vs. Integrations

Harness IDP leverages the open-source Backstage framework and is compatible with the full ecosystem of over 250 open-source Backstage plugins. However, there is an important architectural distinction between **plugins** and **integrations** that affects how data flows through the platform.

Most (not all) Backstage **Plugins** are frontend-only, which means the data they display is fetched at render time and **not persisted in the catalog**. This means plugin data is not available for use in scorecards, self-service workflows, aggregation rules, or AI-powered features. It exists only as a visual widget on the entity page.

**Integrations**, by contrast, ingest data directly into the catalog data store. Every field brought in through an integration — whether it's a DORA metric from Harness CD, an MTTR value from ServiceNow, or a dependency relationship from Kubernetes — can be **stored as part of the catalog entity**. The data that lives in the catalog is available across the entire IDP platform:

- **Scorecards** can reference integration-ingested properties to measure engineering standards and compliance.
- **Self-service workflows** can use catalog data as inputs or conditions.
- **Aggregation rules** can roll up metrics across hierarchy levels (for example, averaging deployment frequency from services up to a Project or Organization).
- **AI-powered features** can reason over the full catalog data model, including all integration-enriched fields.

In short, plugins are useful for displaying contextual information on entity pages, while integrations are the recommended approach for populating the catalog with data that needs to be queryable, scorable, and actionable across IDP.

---
