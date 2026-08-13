---
title: Custom Integration Overview
sidebar_label: Overview
description: Push data from your own tools into Harness IDP using a REST API or a webhook, and display it against your catalog entities without changing their metadata.
sidebar_position: 1
keywords:
  - custom integration
  - data ingestion
  - webhook
  - correlation
---

import DocImage from '@site/src/components/DocImage';

A **Custom Integration** lets you bring data from any external tool into Harness IDP and display it against the entities already in your Software Catalog. You push the data yourself, either with a REST API call or through a generated webhook URL, and IDP links each record to the right catalog entity.

Use it for the activity that happens around a service: builds, deployments, incidents, code-quality reports, and security scans/findings. If your data does not fit one of those shapes, you can define your own schema.

<DocImage path={require('./static/custom-integrations-list.png')} />

---

## Why use a Custom Integration

The conventional IDP integrations connect to a fixed set of supported tools and pull entities from them. A Custom Integration inverts that: you push the data, from any tool that can make an HTTP request or fire a webhook. That covers the cases auto-discovery cannot:

- A CI system that Harness IDP has no native integration for, such as Jenkins, CircleCI, or GitHub Actions.
- An internal or homegrown tool that only you run.
- A record type that is specific to your organization, using a schema you define.

The data is stored against the entity and shown in a dedicated tab on the entity page. Your entity's own definition is not rewritten: nothing in `catalog-info.yaml` changes, and the entity's owner, name, and `spec` are left alone.

---

## Before you begin

- The **`IDP_INTEGRATIONS`** and **`IDP_CUSTOM_INTEGRATION`** feature flags should be enabled for your account. Contact [Harness Support](https://www.harness.io/support) to enable it. Once enabled, you will see Custom Integration and Metrics in the Integrations section.
- You need permissions to create and edit integrations at the scope where you are working.
- For the **API** mode, you need either a Harness [Service Account Token (SAT)](/docs/platform/role-based-access-control/add-and-manage-service-account) or [Personal Access Token (PAT)](/docs/platform/automation/api/add-and-manage-api-keys#create-personal-api-keys-and-tokens).
- For the **Webhook** mode with HMAC authentication, you need the signing secret from the source tool, stored as a [Harness text secret](/docs/platform/secrets/add-use-text-secrets).
- After data is flowing, a one-time [layout configuration](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/view-data-in-catalog#configure-the-layout) is required per entity kind and type before the data appears on entity pages.

:::info
Custom Integrations do not require the [Initial Configuration](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/initial-config) (Kubernetes connector, namespace, and Docker settings) that catalog discovery integrations need. No data collection runs in your cluster, because your systems push the data to Harness.
:::

---

## Choose the right mechanism

Harness IDP offers three ways to get external data into the catalog. They do different things, and picking the wrong one is the most common source of confusion:

| Mechanism | What it does | Use it when |
| --- | --- | --- |
| [Catalog Auto-Discovery](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/overview) | Connects to a supported tool and registers or enriches catalog entities from it. | You want IDP to **create** entities from a supported source. |
| [Catalog Ingestion API](/docs/internal-developer-portal/catalog/integrate-tools/catalog-ingestion-api) | Writes property values onto entities that already exist. | You want to **change a field** on an entity. |
| [Custom Integration](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/overview) | Ingests records from any tool and displays them against entities. | You want to **attach activity** (builds, deploys, incidents, scans) to entities without altering them. |

:::info
Custom Integration is configured from the same **Integrations** page as the auto-discovery integrations. It behaves differently from them, though: it does not create catalog entities, and it does not connect outward to a tool.
:::

---

## Ingestion modes

You choose one mode per integration, and it cannot be changed after the integration is created.

| Mode | How data arrives | Authentication |
| --- | --- | --- |
| **API** | Your system calls the integration's Upsert endpoint. | JWT token (Harness [Service Account Token (SAT)](/docs/platform/role-based-access-control/add-and-manage-service-account) or [Personal Access Token (PAT)](/docs/platform/automation/api/add-and-manage-api-keys#create-personal-api-keys-and-tokens)) in the `x-api-key` header. |
| **Webhook** | An external tool posts to a generated webhook URL. | JWT token (Harness [Service Account Token (SAT)](/docs/platform/role-based-access-control/add-and-manage-service-account) or [Personal Access Token (PAT)](/docs/platform/automation/api/add-and-manage-api-keys#create-personal-api-keys-and-tokens)) or HMAC signature verification. |


:::tip Which ingestion mode to choose
Decide the mode according to your source tool:
* If the tool can send outbound webhooks, choose **Webhook**. PagerDuty, for example, posts incident updates to the generated URL on its own, so you write no code to get incidents into IDP.
* If the tool cannot send webhooks, choose **API** and push the data yourself. A Jenkins pipeline stage calling the Upsert endpoint after each build is the common case.
:::

:::info
The Delete API is available for API-based integrations only. Webhook-based integrations do not expose a delete endpoint.
:::

---

## Data schemas

Every integration is bound to one **data schema**, chosen at creation and fixed thereafter. Currently, six schemas are provided out of the box, and a custom one that lets you define your own:

* **Build**
* **Deployment**
* **Incidents**
* **Quality** 
* **Security issues** 
* **Security scans** 
* **Custom**

If you need to ingest two kinds of data, create two integrations. A single Jenkins pipeline can push data to three different Custom Integrations: one for builds, one for deployments, and one for security issues.

Go to [Ingest data](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/ingest-data) for the fields each schema accepts.

---

## How records find their entity

A record you push has to be matched to a catalog entity. There are two ways this happens, and you can use either:

- **Correlation Mapping**: You map a field in the incoming data to a path in the catalog entity YAML. IDP links the record to every entity where those two values are equal. This is configured on the integration.
- **`entity_ref` in the payload**: You include the entity reference directly in the record, and IDP links it to that entity without any matching.

Correlation Mapping is usually the better choice, because the system sending data rarely knows IDP entity references but almost always knows the service name or repository URL.

Go to [Configure Correlation Mapping](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/create-custom-integration#step-5-configure-correlation-mapping-optional) for details.

---

## Scope

Custom Integrations can be created at the account, organization, or project [scope](/docs/internal-developer-portal/rbac/scopes). Scope resolution follows the same rules as connectors and secrets: an entity can use integrations defined at its own scope and at any parent scope.

An integration created in one project is not available to entities in a different project.

---

## Next steps
 
- [Create a Custom Integration](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/create-custom-integration): Configure the integration in the UI.
- [Ingest data](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/ingest-data): Push records using the API or a webhook.
- [View data in the catalog](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/view-data-in-catalog): Surface the ingested data on entity pages.
- [Metrics](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/custom-metrics): Ingest time-series data and display it as charts on entity pages.
- [FAQs](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/faqs): Common questions and troubleshooting.