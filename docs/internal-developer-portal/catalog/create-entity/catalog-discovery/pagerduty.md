---
title: PagerDuty Integration
description: Auto-discover PagerDuty services and teams and populate the IDP Catalog for on-call visibility and incident context.
sidebar_position: 5
sidebar_label: PagerDuty
---

The PagerDuty integration automatically discovers services and teams from your PagerDuty account and brings them into the IDP Catalog. Once discovered, entities can be registered as new catalog entries or merged into existing ones, enriching them with PagerDuty-sourced metadata such as on-call schedules, incident analytics, and team ownership.

---

:::caution Prerequisites
* The feature flag `IDP_CATALOG_CD_AUTO_DISCOVERY` is enabled. Contact [Harness Support](mailto:support@harness.io) to enable it.
* You have the required RBAC permissions to manage integrations. All integration operations require the `IDP_INTEGRATION_EDIT` permission on the `IDP_INTEGRATION` resource type.
* A [PagerDuty connector](https://youtu.be/QE8dFDeK8Vs) is configured in Harness with the credentials needed to access your PagerDuty account. You can also add the connector during the setup of PagerDuty Integration.
:::

---

## Enable the PagerDuty Integration

:::info
The PagerDuty integration is currently available at the **Account** level only. Navigate to the Account scope of the Internal Developer Portal to add or manage PagerDuty integrations.
:::

### 1. Navigate to the Integrations Page

1. In Harness, open the **Internal Developer Portal**.

2. From the left sidebar, click **Configure**.

3. In the left navigation menu, click **Integrations**.

   ![](./static/pd-integration-nav.gif)
   <center>Figure 1: Navigation Path of PagerDuty Integration</center>

4. On the Integrations page, click **+ New Integration** at the top.

5. Select **PagerDuty** from the integration type picker. You will be taken to the **Auto Discover PagerDuty Integration** page.

### 2. Configure Setup & Connectivity

This section connects Harness IDP to your PagerDuty account.

1. Enter a name in the **Integration Name** field. This name appears on the integration card on the **Integrations** page (e.g., `PagerDuty Production`).

2. Click the **Choose PagerDuty connector** dropdown and select the PagerDuty connector you want to use to pull data into the IDP.

   :::info Don't have a PagerDuty connector yet?
   If no connectors appear in the dropdown, you need to first create a PagerDuty connector in Harness. Navigate to **Account Settings → Connectors** and create a new PagerDuty connector by providing your PagerDuty API key. Once saved, it will appear in the dropdown here.

   <DocVideo src="https://www.youtube.com/embed/QE8dFDeK8Vs" />
   :::

### 3. Configure Mapping & Correlation

This section defines how PagerDuty entities are mapped to IDP catalog entities and how they are correlated with existing records.

The integration supports two entity types: **Service Entity** and **Team Entity**, each with its own toggle, registration behavior, and field configuration.

![](./static/pagerduty-entities.png)
<center>Figure 2: Available Entities - Service and Team</center>

#### Service Entity

The Service Entity mapping imports PagerDuty services as catalog components.

1. Ensure the **Service Entity** toggle is turned on.

2. Under **Entity Registration Behavior**, choose how services are brought into the catalog:
   * **Register & Merge** *(Default)* - Registers new entities and updates existing ones when a match is found. This is the recommended option for most setups.
   * **Register** - Creates new catalog entities from PagerDuty. Does not merge with existing entities.
   * **Merge** - Links discovered services to existing catalog entities. Matching entities are recommended automatically, but you can choose a different one.

      ![](./static/service-entity.png)
      <center>Figure 3: Enable Service Entity</center>

3. The default **Kind** is `Component` and **Type** is `Service`. These are pre-configured and apply to all PagerDuty service imports.

4. Under **Correlation Mapping**, set the **Ingested Data Path** (from PagerDuty) and the corresponding **Catalog YAML Path** (from your IDP entity) to define how records are matched. The operator defaults to `Equals`. Check the example shown below:

   | Ingested Data Path | Operator | Catalog YAML Path |
   |---|---|---|
   | `metadata.integration_properties.PagerDuty.identifier` | Equals | `metadata.annotations.pagerduty_service_id` |


5. Optionally, click **Configure** next to **Configure fields** to customize which PagerDuty fields are synced to the catalog. By default, all available fields are selected. 

   ![](./static/service-ent-config.gif)
   <center>Figure 4: Service Entity Configuration</center>

   The available PagerDuty service fields include:
 
   | PagerDuty Field | Description |
   |---|---|
   | `analyticsMeanSecondsToFirstAck` | Mean time to first acknowledgment (in seconds). |
   | `analyticsMeanSecondsToResolve` | Mean time to resolve an incident (in seconds). |
   | `analyticsTotalIncidents` | Total number of incidents for the service. |
   | `onCallName` | The name of the on-call responder currently assigned to the service. |
   | `pagerdutyStatus` | The current status of the PagerDuty service. |
   | `teams` | The PagerDuty teams associated with the service, including team URLs and metadata. |
   | `ownedBy` | Maps to the catalog `ownedBy` field, linking the service to its owning team entity. |

#### Team Entity

The Team Entity mapping imports PagerDuty teams as catalog group entities.

1. Ensure the **Team Entity** toggle is turned on.

2. Under **Entity Registration Behavior**, choose the registration behavior as described above for [Service Entity](#service-entity).

   ![](./static/team-entity.png)
   <center>Figure 5: Enable Team Entity</center>

3. The default **Kind** is `Group` and **Type** is `Team`.

4. Configure the **Correlation Mapping** fields as needed.

5. Optionally, click **Configure** next to **Configure fields (optional)** to customize the field mapping. 

   ![](./static/team-ent-config.gif)
   <center>Figure 6: Team Entity Configuration</center>

   The available PagerDuty fields include:
 
   | PagerDuty Field | Description |
   |---|---|
   | `analyticsMeanSecondsToFirstAck` | Mean time to first acknowledgment (in seconds). |
   | `analyticsMeanSecondsToResolve` | Mean time to resolve an incident (in seconds). |
   | `analyticsTotalIncidents` | Total number of incidents for the team. |
   | `defaultRole` | The default role assigned to team members. |
   | `name` | Maps to the catalog `name` field, setting the team entity's display name. |

### 4. Configure Advanced Settings

The **Advanced Settings** section controls how frequently IDP syncs with PagerDuty and how far back historical data is pulled.

![](./static/advanced-settings.png)
<center>Figure 7: Advanced Settings</center>

1. Select an **Update Frequency** from the dropdown to control how often IDP polls PagerDuty for new data. 

   Available options: `10 min`, `30 min`, `1 hour`, `1 day`.

2. Set the **Select start date** to define the earliest date from which IDP will pull PagerDuty data. Any data before this date will be excluded. By default, this is set to one year prior to today.

   :::info Start Date Update Limits
   The start date may be updated after the integration is configured, but only to an earlier date than the one originally selected. It cannot be moved forward.
   :::

3. Once all sections are configured, click **Confirm & Enable**. A confirmation dialog will appear before the changes are applied.

The integration is now enabled and IDP begins syncing data from PagerDuty. Discovered services and teams appear in the [**Discovered** tab](#discovered-tab).

---

## Discover and Import PagerDuty Entities

This section covers how to view the PagerDuty entities discovered by the integration and import them into your IDP Catalog.

### Discovered tab

After the integration runs, all PagerDuty services and teams detected appear in the **Discovered** tab. Use the **Service** and **Team** sub-tabs to switch between entity types. If entities do not appear, use the **Sync** button at the top right to manually refresh.

![](./static/discovered-tab-pd.png)
<center>Figure 8: 'Discovered' tab showing the PagerDuty Services and Teams</center>

For each discovered entity, you can see its name, the recommended catalog action, kind, type, and the date it was detected. You can choose how to bring entities into the catalog using one of the following actions:

* **Register** *(shown as Recommended when no matching catalog entity exists)* - Creates a new catalog entity populated with the PagerDuty metadata.
* **Merge** - Links the discovered entity to an existing catalog entity, enriching it with PagerDuty data. If IDP finds a catalog entity with a matching name, the **Merge** option is pre-selected and the suggested entity is shown automatically.

:::tip Bulk Import and Auto Import Options
* **Bulk Import** - Select multiple entities using the checkboxes and click **Import selected entities** at the bottom of the page to import them all at once. The selection widget shows a count of selected entities.
* **Auto Import** - Toggle **Auto-import future discovered services** in the top right of the Discovered tab to automatically import all future entities without manual review. You can change this preference at any time.
:::

### Imported tab

The **Imported** tab displays all PagerDuty entities that have been brought into the catalog. Use the **Service** and **Team** sub-tabs to view each entity type separately.

![](./static/imported-tab-pd.png)
<center>Figure 9: 'Imported' tab showing the PagerDuty Services and Teams linked to the catalog entities</center>

It displays the following data:

| Column | Description |
|---|---|
| **PagerDuty Entity** | The name of the entity from PagerDuty, along with its import status (for example, **Registered**). |
| **Entity** | The linked IDP catalog entity and its ID. |
| **Kind** | The catalog entity kind (e.g., `component` for services, `group` for teams). |
| **Type** | The catalog entity type (e.g., `service` for services, `team` for teams). |
| **Scope** | The Harness account scope the entity belongs to. |
| **Imported At** | The timestamp when the entity was imported. |

:::caution Unlink an Imported Entity
To stop syncing a specific entity without deleting the catalog entity, use the three-dot menu on any row and select **Unlink**. This stops sync updates while keeping the IDP entity and its existing data intact.
:::

---

## View PagerDuty Entities in the Catalog

Once imported, PagerDuty entities are available in the **Catalog** section of IDP as standard catalog entities.

Each imported PagerDuty service is registered with:

* **Kind:** `Component`
* **Type:** `Service`
* **Scope:** The Harness account the integration belongs to

![](./static/catalog-entity-pd.png)
<center>Figure 10: IDP Catalog Entity Page showing Service/Team Relationship</center>

Similarly, each imported PagerDuty team is registered with:

* **Kind:** `Group`
* **Type:** `Team`
* **Scope:** The Harness account the integration belongs to

Open any entity to view its Overview, Relationships, Scorecards, and any other tabs configured for your entity layout. The **Relationships** section reflects ownership links between teams and services as discovered from PagerDuty.

### Ingested Properties

To inspect the raw data ingested from PagerDuty, open the entity and click **View YAML** → **Ingested Properties** in the Entity Inspector.

![](./static/catalog-yaml-pd1.gif)
<center>Figure 11a: Entity Inspector Page showing ingested properties of Service Data</center>

![](./static/catalog-yaml-pd2.gif)
<center>Figure 11b: Entity Inspector Page showing ingested properties of Team Data</center>

Ingested properties are stored in two sections of the entity YAML:

* **`metadata.integration`** - Tracks which integrations are linked to this entity, including the entity action (e.g., `REGISTER`) and the linked entity UUID for each integration instance.
* **`integration_properties.PagerDuty`** - Contains the PagerDuty-specific data for the entity. For service entities, this includes fields like `analyticsMeanSecondsToFirstAck`, `analyticsMeanSecondsToResolve`, `analyticsTotalIncidents`, `identifier`, `name`, `onCallName`, and `teams` (with PagerDuty team URLs and metadata). For team entities, this includes analytics fields and the team identifier.

---

## Manage the PagerDuty Integration

### Edit the integration

To update the integration name, switch the PagerDuty connector, or change the mapping and correlation settings, navigate to **Integrations** page, find your PagerDuty integration card, and click **View**. From there, click **Configuration** to open the edit screen.

### Suspend Auto-Discovery

If auto-discovery is suspended, new entities will not appear in the **Discovered** tab. Existing imported entities remain unchanged in the catalog and the sync between PagerDuty and their corresponding IDP entities will stop.

To suspend auto-discovery:

1. Go to **Integrations** and open your PagerDuty integration using the **View** button.
2. Click **Configuration** at the top.
3. In the **Danger Zone** section, click **Suspend**.
4. Confirm the action.

You may re-enable it at any time by following the same steps.
