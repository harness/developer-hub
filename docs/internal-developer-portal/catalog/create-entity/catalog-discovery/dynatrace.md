---
title: Dynatrace Integration
description: Auto-discover Dynatrace services and import them into the IDP Catalog with problems, SLO tracking, and service health context.
sidebar_position: 3
sidebar_label: Dynatrace
keywords:
  - dynatrace
  - integration
  - catalog discovery
  - observability
  - SLO
---

import DocImage from '@site/src/components/DocImage';
import DocVideo from '@site/src/components/DocVideo';

The Dynatrace integration automatically discovers services from your [Dynatrace](https://www.dynatrace.com/) account and brings them into the [IDP Catalog](/docs/internal-developer-portal/catalog/overview). Once discovered, entities can be registered as new catalog entries or merged into existing ones.

For each service, the integration collects the following resources from Dynatrace:

| Resource | What it provides |
|---|---|
| **Service** | Core metadata from Dynatrace such as service name, type, and related entity information. |
| **Monitor** | Monitor metrics and health summary using queries. |
| **Problems** | Issues and anomalies detected by Dynatrace, fetched from the start date you configure during setup. |
| **SLO** | Service Level Objective data associated with the service. Requires a platform token. |

---

## Before you begin

The following are needed to get the integration running:

* Ensure the feature flags `IDP_CATALOG_CD_AUTO_DISCOVERY` and `IDP_INTEGRATIONS` are enabled. Contact [Harness Support](mailto:support@harness.io) to enable them.
* You have the required RBAC permissions to manage integrations. All integration operations require the `IDP_INTEGRATION_EDIT` permission on the `IDP_INTEGRATION` resource type.
* A [Dynatrace connector](/docs/platform/connectors/monitoring-and-logging-systems/connect-to-monitoring-and-logging-systems#add-dynatrace) is configured in Harness with Dynatrace Classic URL (format: `https://xxxxxxxx.live.dynatrace.com/`) and an API Token (access token in Dynatrace). You can also create the connector during the integration setup. Ensure the access token must have the following scopes:
  - `entities.read`
  - `problems.read`
  - `metrics.read`
  -  Any one of `ReadSyntheticData`, `ExternalSyntheticIntegration`, and `DataExport` (required for monitor data)
* (Optional) A Dynatrace platform token with the `slo:slos:read` scope if you want SLO data to flow into IDP.

:::info Proxy Configuration
If your environment blocks outbound third-party traffic and routes it through a proxy, you will need to configure proxy settings on your Harness Delegate. Once configured there, the proxy settings are automatically picked up by IDP integrations. No additional setup is needed on the integration side.

Go to [Configure delegate proxy settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings) to configure proxy settings on your Harness Delegate.
:::

---

## Enable the Dynatrace Integration

### 1. Navigate to the Integrations Page

1. In Harness, open the **Internal Developer Portal**.

2. From the left sidebar, click **Configure**.

3. In the left navigation menu, click **Integrations**.

   <DocImage path={require('./static/bb-integration-nav.png')} />

4. On the Integrations page, click **+ New Integration** at the top.

5. Select **Dynatrace** from the integration type picker. You will be taken to the **Dynatrace Integration** configuration page.

### 2. Configure Setup & Connectivity

This section connects Harness IDP to your Dynatrace account.

<DocImage path={require('./static/dt-setup-connectivity.png')} />

1. Enter a name in the **Integration Name** field. This name appears on the integration card on the **Integrations** page (e.g., `Dynatrace PreQA Observability`).

2. Click the **Choose Dynatrace connector** dropdown and select the Dynatrace connector you want to use to pull data into IDP.

   :::info Don't have a Dynatrace connector yet?
   If no connectors appear in the dropdown, you need to first [create a Dynatrace connector](/docs/platform/connectors/monitoring-and-logging-systems/connect-to-monitoring-and-logging-systems#add-dynatrace) (classic) in Harness. Once saved, it will appear in the dropdown.

   <DocVideo src="https://www.youtube.com/embed/zgeXCSll3Oc" />
   :::

3. (Optional) In the **Platform token** field, enter a Dynatrace platform token if you want to collect SLO data too. Leave it empty if you do not need SLO data to flow into IDP. The platform token must have the scope `slo:slos:read` included.

### 3. Configure Mapping & Correlation

This section defines how Dynatrace services are mapped to IDP catalog entities and how they are correlated with existing records.

<DocImage path={require('./static/dt-mapping-correlation.png')} />

#### Service Entity

The Service Entity mapping imports Dynatrace services as catalog components.

1. Ensure the **Service Entity** toggle is turned on.

2. Under **Entity Registration Behavior**, choose how services are brought into the catalog:
   - **Register & Merge** *(Default)* - Registers new entities and updates existing ones when a match is found. This is the recommended option for most setups.
   - **Register** - Creates new catalog entities from Dynatrace. Does not merge with existing entities.
   - **Merge** - Links discovered services to existing catalog entities. Matching entities are recommended automatically, but you can choose a different one.

3. The default **Kind** is `Component` and **Type** is `Service`. These are pre-configured and apply to all Dynatrace service imports.

4. Under **Correlation Mapping**, the **Ingested Data Path** and **Catalog YAML Path** both default to `name`, meaning services are matched by name. You can change this to any other field pair if your setup requires a different matching strategy.

5. Optionally, click **Configure** next to **Configure fields** to customize which Dynatrace fields are synced to the catalog. By default, all available fields are selected.

   <DocImage path={require('./static/dt-field-config.gif')} />

### 4. Configure Advanced Settings

The **Advanced Settings** section controls the sync frequency and how far back in time Dynatrace data is fetched.

<DocImage path={require('./static/dt-advanced-settings.png')} />

1. Select an **Update Frequency** from the dropdown to control how often IDP polls Dynatrace for new data.

   Available options: `10 min`, `30 min`, `1 hour`, `3 hours`, `6 hours`, `12 hours`, `1 day`, `2 days`, `7 days`.

2. Set a **Start date** to define how far back Dynatrace Problems data should be fetched. The default is set to one month before the date of integration creation. The earliest you can go back is six months.

   :::warning
   The start date cannot be changed after the integration is created. Set it carefully before clicking **Confirm & Enable**.
   :::

3. Once all sections are configured, click **Confirm & Enable**.

The integration is now enabled and IDP begins syncing data from Dynatrace. Discovered services appear in the [**Discovered** tab](#discovered-tab).

---

## Discover and Import Dynatrace Entities

This section covers how to view the Dynatrace services discovered by the integration and import them into your IDP Catalog.

### Discovered Tab

After the integration runs, all Dynatrace services detected appear in the **Discovered** tab. If no services appear yet, the sync may still be in progress. Use the **Sync** button at the top right to manually trigger a refresh if needed.

<DocImage path={require('./static/dt-discovering.png')} />

Once discovery completes, each discovered service appears with its name, recommended catalog action, kind, type, and detection date. You can bring entities into the catalog using one of the following actions:

- **Register** *(shown as Recommended when no matching catalog entity exists)* - Creates a new catalog entity populated with Dynatrace metadata.
- **Merge** - Links the discovered entity to an existing catalog entity, enriching it with Dynatrace data. If IDP finds a catalog entity with a matching name, **Merge** is pre-selected and the suggested entity is shown automatically.

:::tip Bulk Import
Select multiple entities using the checkboxes and click **Import selected entities** at the bottom of the page to import them all at once.
:::

### Imported Tab

The **Imported** tab displays all Dynatrace services that have been brought into the catalog.

<DocImage path={require('./static/dt-imported.png')} />

It displays the following data:

| Column | Description |
|---|---|
| **Dynatrace Services** | The name of the service from Dynatrace, along with its import status (e.g., **Merged**). |
| **Entity** | The linked IDP catalog entity and its ID. |
| **Kind** | The catalog entity kind (e.g., `component`). |
| **Type** | The catalog entity type (e.g., `service`). |
| **Scope** | The Harness account scope the entity belongs to. |
| **Imported** | The timestamp when the entity was imported. |

:::caution Unlink an Imported Entity
To stop syncing a specific entity without deleting the catalog entity, use the three-dot menu on any row and select **Unlink**. This stops sync updates while keeping the IDP entity and its existing data intact.
:::

### Events Tab

The **Events** tab provides a log of sync activity for this integration, including discovery runs, import actions, and any errors encountered during sync. Use this tab to troubleshoot unexpected behavior or verify that a sync completed successfully.

<DocImage path={require('./static/dt-events.png')} />

---

## View Dynatrace Entities in the Catalog

:::info
The UI to visualize this data on catalog entity pages will be available in the upcoming release.
:::

Once imported, Dynatrace entities are available in the **Catalog** section of IDP as standard catalog entities.

Each imported Dynatrace service is registered with:

- **Kind:** `Component`
- **Type:** `Service`
- **Scope:** The Harness account the integration belongs to

Open any entity to view its Overview, Scorecards, and other configured tabs.

<DocImage path={require('./static/dt-catalog-entity.gif')} />

### Ingested Properties

To inspect the raw data ingested from Dynatrace, open the entity and click **View YAML**, then select **Ingested Properties** in the Entity Inspector.

Ingested properties are stored in two sections of the entity YAML:

- **`metadata.integration`** - Tracks which Dynatrace integration instances are linked to this entity, including the entity action (e.g., `MERGE`) and the linked entity UUID.
- **`integration_properties.DynaTrace`** - Contains the Dynatrace-specific data for the entity, including fields synced from the Dynatrace service.

<DocImage path={require('./static/dt-ingested-properties.gif')} />

---

## Manage the Dynatrace Integration

### Edit the Integration

To update the integration name, switch the Dynatrace connector, or change the mapping and correlation settings, navigate to the **Integrations** page, find your Dynatrace integration card, and click **View**. From there, click **Configuration** to open the edit screen.

### Suspend Auto-Discovery

If auto-discovery is suspended, new entities will not appear in the **Discovered** tab. Existing imported entities remain unchanged in the catalog and the sync between Dynatrace and their corresponding IDP entities will stop.

To suspend auto-discovery:

1. Go to **Integrations** and open your Dynatrace integration using the **View** button.
2. Click **Configuration** at the top.
3. In the **Danger Zone** section, click **Suspend**.
4. Confirm the action.

You may re-enable it at any time by following the same steps.
