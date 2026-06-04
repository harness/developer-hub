---
title: Google Cloud Integration
description: Auto-discover Google Cloud resources and populate the IDP Catalog with infrastructure, compute, database, and AI resource metadata.
sidebar_position: 5
sidebar_label: Google Cloud
---

import DocVideo from '@site/src/components/DocVideo';

The Google Cloud integration connects to your GCP organization or folder and brings resources into the IDP Catalog, such as Compute Instances, GCS Buckets, Cloud Run services, BigQuery datasets, GKE clusters, and more. Once discovered, entities can be registered as new catalog entries, enriching them with GCP-sourced metadata such as asset type, location, state, and resource identifiers.

For each resource, the integration collects the following:

| Resource | What it provides |
|---|---|
| **GCP Resource** | Asset type, display name, location, state, organization and project identifiers, creation time, and resource-specific attributes such as machine type, labels, and network tags. |

---

## Before you begin

The following configurations are needed in Harness and GCP to get the integration running.

### Relevant Harness Configurations
 
* The feature flag `IDP_CATALOG_CD_AUTO_DISCOVERY` is enabled. Contact [Harness Support](mailto:support@harness.io) to enable it.
* You have the required RBAC permissions to manage integrations. All integration operations require the `IDP_INTEGRATION_EDIT` permission on the `IDP_INTEGRATION` resource type.
* A [GCP connector](https://www.youtube.com/watch?v=frNDU4Iv7zM) is configured in Harness using a service account JSON key. See [GCP configurations](#relevant-gcp-configurations) below for how to obtain the key.

### Relevant GCP Configurations
 
* **IAM role**: Grant `roles/cloudasset.viewer` to your service account at the **organization or folder level** (not project level) via [IAM & Admin](https://console.cloud.google.com/iam-admin/iam). For resource-specific access (e.g., Compute, BigQuery), also grant the relevant viewer roles such as `roles/compute.viewer` or `roles/bigquery.metadataViewer` at the same scope.
* **Service account key**: [Generate a JSON key](https://cloud.google.com/iam/docs/keys-create-delete) for your service account (**Keys** tab → **Add key** → **Create new key** → **JSON**) and upload it when creating the GCP connector in Harness.
* **Cloud Asset API**: [Enable `cloudasset.googleapis.com`](https://console.cloud.google.com/apis/library/cloudasset.googleapis.com) on the GCP project associated with the service account.

:::info Proxy Configuration
If your environment blocks outbound third-party traffic and routes it through a proxy, you'll need to configure proxy settings on your Harness Delegate. Once configured there, the proxy settings are automatically picked up by IDP integrations. No additional setup is needed on the integration side. 

Here's how to set it up: [Configure delegate proxy settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings)
:::

---

## Enable the Google Cloud Integration

:::info
The Google Cloud integration is available at the **Account**, **Organization**, and **Project** levels. Navigate to the appropriate scope of the Internal Developer Portal to add or manage Google Cloud integrations.
:::

### 1. Navigate to the Integrations Page

1. In Harness, open the **Internal Developer Portal**.

2. From the left sidebar, click **Configure**.

3. In the left navigation menu, click **Integrations**.

   ![Navigation Path of GCP Integration](./static/gcp-integration-nav.gif)
   <center>Figure 1: Navigation Path of GCP Integration</center>

4. On the Integrations page, click **+ New Integration** at the top.

5. Select **Google Cloud** from the integration type picker. You will be taken to the **Auto Discover Google Cloud Integration** page.

### 2. Configure Setup & Connectivity

This section connects Harness IDP to your Google Cloud Platform.

![Setup & Connectivity](./static/gcp-setup-connectivity.png)
<center>Figure 2: Setup & Connectivity</center>

1. Enter a name in the **Integration Name** field. This name appears on the integration card on the **Integrations** page (e.g., `GCP QA Data Integration`).

2. Click the **Choose GCP connector** dropdown and select the GCP connector you want to use to pull data into the IDP (e.g., `idp_automation_gcp_manager`).

   :::info Don't have a GCP connector yet?
   If no connectors appear in the dropdown, you need to first create a GCP connector in Harness. Once saved, it will appear in the dropdown here.

   <DocVideo src="https://www.youtube.com/embed/frNDU4Iv7zM" />
   :::

3. Under **Scope Type**, select how IDP should scope the resource discovery:
   * **Organization ID** *(Default)*: Discovers resources across your entire GCP organization. Enter your numeric GCP Organization ID (e.g., `123456789012`).
   * **Folder ID**: Limits discovery to a specific GCP folder. Enter the numeric Folder ID.

### 3. Configure Catalog Mapping

This section defines which GCP resources are ingested and how they map to IDP catalog entities.

Click **Configure** next to **Choose resources for ingestion** to open the **Resource selection** panel.

Resources are organized into several categories: Monitoring, Databases, API Gateway, Serverless, CI/CD & Data, Compute Engine, Networking, IAM & Security, Kubernetes, Storage, Resource Manager, Caching, Messaging, and Vertex AI. Use the **Choose Resource** dropdown at the top of the panel to filter by category.

![GCP Resource Selection](./static/gcp-resource-selection.gif)
<center>Figure 3: GCP Resource Selection</center>

For each resource you select, three fields are configurable:

* **Sync Mode**: `Full Refresh` re-syncs the entire resource list on every update cycle. `Incremental` syncs only resources that have changed since the last update.
* **Kind**: Select the IDP catalog entity kind that best represents this resource in your catalog.
* **Type**: The catalog entity type label (e.g., `compute_instances`, `gcs_buckets`). Pre-filled based on the resource and can be customized.

Once you have made your selections, click **Continue** to return to the main configuration page.

### 4. Configure Advanced Settings

The **Advanced Settings** section controls how frequently IDP syncs with GCP.

![Advanced Settings](./static/gcp-advanced-settings.png)
<center>Figure 4: Advanced Settings</center>

1. Select an **Update Frequency** from the dropdown to control how often IDP polls GCP for new data.

   Available options: `10 min`, `30 min`, `1 hour`, `3 hours`, `6 hours`, `12 hours`, `1 day`, `2 days`, `7 days`.

2. Once all sections are configured, click **Confirm & Enable**. A confirmation dialog will appear before the changes are applied.

The integration is now enabled and IDP begins syncing data from GCP. Discovered resources appear in the [**Discovered** tab](#discovered-tab).

---

## Discover and Import GCP Entities

### Discovered tab

After the integration runs, all GCP resources detected appear in the **Discovered** tab. Use the **Resource** dropdown filter to narrow the list by resource type. If entities do not appear, use the **Sync** button at the top right to manually refresh.

!['Discovered' tab showing GCP Resources](./static/discovered-tab-gcp.png)
<center>Figure 5: 'Discovered' tab showing GCP Resources</center>

For each discovered entity, you can see its name, the recommended catalog action, kind, type, and the date it was detected. All discovered GCP resources default to the **Register** action, which creates a new catalog entity populated with the GCP metadata.

:::tip Bulk Import and Auto Import Options
* **Bulk Import**: Select multiple entities using the checkboxes and click **Import selected entities** at the bottom of the page to import them all at once.
* **Auto Import**: Toggle **Auto-import future discovered entities** in the top right of the Discovered tab to automatically import all future entities without manual review.
:::

![Import Discovered GCP Resources to IDP Catalog](./static/import-gcp-entities.gif)
<center>Figure 6: Import Discovered GCP Resources to IDP Catalog</center>

### Imported tab

The **Imported** tab displays all GCP entities that have been brought into the catalog. Use the **Resource** dropdown filter to narrow by resource type.

!['Imported' tab showing GCP entities linked to catalog entities](./static/imported-tab-gcp.png)
<center>Figure 7: 'Imported' tab showing GCP entities linked to catalog entities</center>

| Column | Description |
|---|---|
| **Google Cloud Entities** | The name of the resource from GCP, along with its import status (e.g., **Registered**). |
| **Entity** | The linked IDP catalog entity and its ID. |
| **Kind** | The catalog entity kind (e.g., `resource`, `system`). |
| **Type** | The catalog entity type (e.g., `compute_disks`). |
| **Scope** | The Harness account scope the entity belongs to. |
| **Imported At** | The timestamp when the entity was imported. |

:::caution Unlink an Imported Entity
To stop syncing a specific entity without deleting the catalog entity, use the three-dot menu on any row and select **Unlink**. This stops sync updates while keeping the IDP entity and its existing data intact.
:::

---

## View GCP Entities in the Catalog

Once imported, GCP entities are available in the **Catalog** section of IDP as standard catalog entities. Each entity's kind and type reflect the selections made during resource configuration.

Open any entity to view GCP-sourced data such as asset type, location, project, and state directly on the entity details page. This data is displayed through two dedicated UI components: a card on the **Overview** tab and a **GCP Integration** tab. Both require a one-time layout configuration, described in the [next section](#layout-for-gcp-components).

### Layout for GCP Components

To display GCP data on the [entity details](/docs/internal-developer-portal/catalog/create-entity/entity-details) page, you need to add the two GCP components to the relevant entity layout. This is a one-time configuration per entity kind and type.

1. From the left sidebar of IDP, go to **Configure** → **Layout** → **Catalog Entities**.
2. Edit the existing layout for your entity or create a new one.
3. Select the **Entity Kind** (e.g., `resource`) and the **Entity Type** (e.g., `compute_instance`) that matches your imported GCP entities.
4. In the YAML editor, add the `IntegrationsContent` component inside the **Overview** tab's `contents` block, and add a new **GCP Integration** tab using the `GCPIntegrationTab` component.

   ![Entity Layout configuration for GCP components](./static/gcp-layout-config.png)
   <center>Figure 8: Layout configuration for GCP Cloud Card and GCP Integration tab</center>

   The relevant YAML additions are:

   ```yaml title="Inside the Overview tab's contents block"
           - component: IntegrationsContent
             specs:
               props:
                 variant: gridItem
               gridProps:
                 md: 12
   ```
   ```yaml title="A new top-level tab entry"
       - name: GCP
         path: /gcp
         title: GCP Integration
         contents:
           - component: GCPIntegrationTab
   ```

5. Click **Save** to apply the layout changes. The GCP components will now appear on all entity detail pages of the selected kind and type that have GCP data.


### GCP Card in Overview Tab

After the layout is configured, a card appears in the **Overview** tab of any entity that has GCP data linked to it. The card displays the key GCP metadata ingested for that entity, sourced from the entity's [ingested properties](#ingested-properties).

![GCP Cloud Card on the Overview tab](./static/gcp-cloud-card-overview.png)
<center>Figure 9: GCP Cloud Card on the Overview tab</center>

If the GCP integration has not been configured for the entity, the card shows a **Not configured** state with a link to the Integrations page. If multiple GCP integrations are active on your account, a dropdown appears at the top of the card to switch between integrations.

### GCP Integration Tab

The **GCP Integration** tab provides a more complete view of the GCP data for the entity. This tab fetches latest possible data using the integration ID and entity UUID.

![GCP Integration tab showing full resource details](./static/gcp-integration-tab.png)
<center>Figure 10: GCP Integration tab showing full GCP resource details</center>

:::tip Feature Highlights
* The tab shows all available fields for the resource type, including fields not present in the **Overview**.
* All the fields are dynamic.
* If a value is not available for the resource, a dash (`-`) is shown.
* The top-right corner shows when the data was last synced from GCP, based on your configured [update frequency](#4-configure-advanced-settings).
* If multiple GCP integrations are linked to the entity, a dropdown appears above the details to switch between integrations.
:::

### Ingested Properties

To inspect the raw data ingested from GCP, open the entity and click **View YAML** → **Ingested Properties** in the Entity Inspector.

![Entity Inspector Page showing Ingested Properties](./static/ingested-gcp-property.gif)
<center>Figure 11: Entity Inspector Page showing Ingested Properties</center>

Ingested properties are stored in two sections of the entity YAML:

* **`metadata.integration`**: Tracks which integrations are linked to this entity, including the entity action (e.g., `REGISTER`) and the linked entity UUID.
* **`integration_properties.GCP`**: Contains the GCP-specific data for the entity, including fields such as `assetType`, `createTime`, `displayName`, `identifier`, `location`, `organization`, `projects`, `resourceName`, `state`, and others depending on the resource type.

---

## Manage the Google Cloud Integration

### Edit the integration

To update the integration name, switch the GCP connector, change the scope, or modify resource selections, navigate to the **Integrations** page, find your GCP integration card, and click **View**. From there, click **Configuration** to open the edit screen.

### Suspend Auto-Discovery

If auto-discovery is suspended, new entities will not appear in the **Discovered** tab. Existing imported entities remain unchanged in the catalog, and the sync between GCP and their corresponding IDP entities will stop.

To suspend auto-discovery:

1. Go to **Integrations** and open your GCP integration using the **View** button.
2. Click **Configuration** at the top.
3. In the **Danger Zone** section, click **Suspend**.
4. Confirm the action.

You may re-enable it at any time by following the same steps.
