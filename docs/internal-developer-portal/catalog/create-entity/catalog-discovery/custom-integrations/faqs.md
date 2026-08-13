---
title: Custom Integration FAQs
sidebar_label: Custom Integration FAQs
description: Frequently asked questions about Harness IDP Custom Integrations, covering setup, correlation, webhooks, troubleshooting, and data management.
sidebar_position: 5
keywords:
  - custom integration
  - faq
  - troubleshooting
---

## General

<details>
<summary>How is a Custom Integration different from Catalog Auto-Discovery?</summary>

Catalog Auto-Discovery pulls from a fixed set of supported tools and creates or enriches catalog entities. A Custom Integration works with any tool that can send an HTTP request, and it attaches activity records to entities that already exist rather than creating them.

Go to [Choose the right mechanism](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/overview#choose-the-right-mechanism) for a comparison with the Catalog Ingestion API as well.

</details>

<details>
<summary>Does ingesting data change my catalog-info.yaml or entity metadata?</summary>

No. Ingested records are stored against the entity and displayed on its page. The entity's `owner`, `name`, and `spec` fields are not modified, and the YAML you authored is untouched.

If you want to change a field on an entity, use the [Catalog Ingestion API](/docs/internal-developer-portal/catalog/integrate-tools/catalog-ingestion-api) instead.

</details>

<details>
<summary>Do I need the Initial Configuration that other integrations require?</summary>

No. The [Initial Configuration](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/initial-config) with a Kubernetes connector, namespace, and Docker settings applies to catalog discovery integrations, which run data collection in your cluster. Custom Integrations do not collect anything; your systems push data to Harness, so no infrastructure setup is needed.

</details>

<details>
<summary>Can one integration handle both builds and deployments?</summary>

No. Each integration is bound to a single data schema chosen at creation. Create one integration per data kind. A Jenkins pipeline that reports builds, deployments, and security findings pushes to three integrations, which is the intended pattern.

</details>

<details>
<summary>Which tools can I ingest from?</summary>

Any tool that can make an authenticated HTTP request or fire a webhook. Common examples are Jenkins, GitHub Actions, and CircleCI for builds and deployments, SonarQube or SonarCloud for quality, scanner plugins for security findings, and PagerDuty for incidents.

</details>

---

## Setup and configuration

<details>
<summary>Should I choose API or Webhook?</summary>

It depends on your source tool: 

* If the tool can send outbound webhooks, choose **Webhook**. You register the generated URL in the tool and it sends data to Harness on its own, so there is no code for you to write or maintain.

* If the tool cannot send webhooks, choose **API** and push the records yourself from a script or a pipeline step.

</details>

<details>
<summary>What can I change after creating an integration?</summary>

You can edit the **Integration Name** and the **Catalog YAML Path** of the Correlation Mapping.

The ingestion mode, data schema, Id, and the Ingested Data Path of the Correlation Mapping are fixed after creation. To change any of those, create a new integration.

</details>

<details>
<summary>When should I use JWT versus HMAC for a webhook?</summary>

Use **JWT** if the source tool lets you add custom headers to its webhook, so it can pass a Harness token. Harness then authenticates it like any other Harness API call.

Use **HMAC** if the tool signs its payloads but does not allow custom headers. Harness verifies the signature using the shared secret from the tool. PagerDuty is a common example.

</details>

<details>
<summary>Can I store the HMAC secret in an external secret manager?</summary>

No. The HMAC signing secret must be stored in the [Harness Secret Manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview). Third-party secret managers are not supported for this field.

</details>

<details>
<summary>Where do I get the HMAC secret?</summary>

It depends on the tool:

- Tools that generate the secret for you, such as PagerDuty, issue it when you add the webhook and do not accept your own value. Create the webhook there first, copy the secret into a [Harness text secret](/docs/platform/secrets/add-use-text-secrets), then select that secret while configuring the integration.
- Tools that let you supply the secret, such as GitHub, accept a value you choose. Create the [Harness text secret](/docs/platform/secrets/add-use-text-secrets) first, then paste the same value into the tool's webhook settings.

Tools in the first group often display the secret only once, so store it immediately.

</details>

---

## Correlation and linking

<details>
<summary>What should I map in Correlation Mapping?</summary>

Map a value the sending system already knows to the catalog path that holds the same value. A CI pipeline knows the service name and repository URL it is building, so mapping `service` to `metadata.name` is a reliable choice.

Matching is exact. Partial matching, pattern matching, and other operators are not supported.

</details>

<details>
<summary>Should I use Correlation Mapping or entity_ref?</summary>

Prefer Correlation Mapping. It is configured once on the integration and works without the sender knowing anything about IDP.

Use `entity_ref` only when the sending system genuinely knows the entity reference, such as `component:default/payment-service`. Most pipelines do not.

</details>

<details>
<summary>My data ingested successfully but nothing shows on the entity page.</summary>

Work through these in order:

1. **Layout not configured** - This is the most common cause. A tab for that data kind must be added to the entity layout. Go to [Configure the layout](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/view-data-in-catalog#configure-the-layout).
2. **Correlation did not match** - Matching is exact, so confirm the value your payload sends is identical to the value at the catalog path, with no case or formatting differences.
3. **No entity linkage at all.** If the integration has no Correlation Mapping and your records carry no `entity_ref`, records are stored but not linked to any entity and will never appear on a page. Add `entity_ref` directly to the payload to bypass correlation entirely. Find the correct value on the entity's detail page under **Identity → entityRef**, for example `component:account/sampleservice`.
4. **Scope mismatch** - An entity cannot see integrations created in a different project. Go to [Scope](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/overview#scope).

</details>

<details>
<summary>Can an account-level integration send data to entities in a project?</summary>

Yes. Entities can use integrations at their own scope and at any parent scope, so an account-level integration reaches entities in every organization and project. An integration created inside one project, however, is not available to entities in another project.

</details>

---

## Ingesting data

<details>
<summary>How do I update a record instead of creating a duplicate?</summary>

Send the same `identifier`. Harness treats `identifier` as the record's key, so a second push with a matching identifier updates the existing record.

This is how a build reports `RUNNING` and then `SUCCESS` as one record, and how an incident moves from triggered to resolved in place.

</details>

<details>
<summary>What happens if I map identifier to a value that is not unique?</summary>

Records sharing that value overwrite each other, and you lose data. Always map `identifier` to something genuinely unique and stable in the source system, such as an incident ID or a build run ID.

</details>

<details>
<summary>Can I ingest without an identifier?</summary>

Only with the **Custom** schema, where `identifier` is optional. If you omit it, Harness assigns each record an internal ID and those records cannot be updated by a later push. Every push creates a new record.

The six out-of-the-box schemas require `identifier`.

</details>

<details>
<summary>Why was my record rejected?</summary>

Open the [Events tab](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/ingest-data#monitor-ingestion-with-the-events-tab) and look for an `Entity rejected` event. Its description gives the reason, most commonly a schema validation failure because a required field is missing or has the wrong type.

For webhook integrations, also verify the payload mapping against a real payload from the tool. Payload shapes often differ between event types, so a mapping that works for one event can fail for another.

</details>

<details>
<summary>How do I make a record link back to the source tool?</summary>

Include a `url` field in the record. The record name becomes a link to that URL on the entity page, letting users jump from a row straight to the build, incident, or report in the original tool.

</details>

---

## Managing data

<details>
<summary>What is the difference between suspending and deleting?</summary>

**Suspend** stops ingestion and keeps your history. New data is rejected, and data already ingested still appears in the catalog. You can re-enable at any time.

**Delete** removes the integration configuration, the data ingested through it, and its event history. It cannot be undone.

Use Suspend when a source is misbehaving and you want to stop the flow without losing what you have.

</details>

<details>
<summary>Does deleting an integration delete my catalog entities?</summary>

No. Entities are unaffected. Only the records that this integration contributed are removed, so its tab stops showing that data.

</details>

<details>
<summary>Can I delete individual records?</summary>

Yes, for API-based integrations, using the Delete endpoint on the **Overview** tab. You can delete by identifier, by entity, or by type, using one filter per request. Go to [Delete ingested records](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/ingest-data#delete-ingested-records).

Webhook-based integrations do not expose a delete endpoint. To remove their data, delete the integration.

</details>

<details>
<summary>Why does my integration not expose a Delete endpoint?</summary>

Delete is available for API-based integrations only. Webhook-based integrations show just the webhook URL on the Overview tab.

</details>

---

## Displaying data

<details>
<summary>How do I change which columns appear on the entity page?</summary>

Edit the integration and adjust the **Column** selections in the [Schema Fields Table](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/custom-integrations/create-custom-integration#schema-fields-table). Only selected fields become columns. Every field remains visible in the record details panel, so leaving a field unselected hides it from the table without losing it.

</details>

<details>
<summary>Why do I not see the Integration or Type filter on the tab?</summary>

Both filters appear only when they would be useful. The **Integration** filter appears when more than one integration has contributed data of that kind to the entity. The **Type** filter appears when the ingested records carry a `type` value.

</details>

<details>
<summary>Can I show data from several integrations in one tab?</summary>

Yes, and this happens automatically. A tab is bound to a data kind rather than to a specific integration, so every integration pushing that kind of data to the entity appears in the same tab, with the Integration filter available to separate them.

</details>
