---
title: Bitbucket Cloud Integration
description: Auto-discover Bitbucket Cloud repositories and populate the IDP Catalog for service discovery and dependency mapping.
sidebar_position: 8
sidebar_label: Bitbucket Cloud
---

import DocImage from '@site/src/components/DocImage';
import DocVideo from '@site/src/components/DocVideo';

The Bitbucket Cloud integration automatically discovers repositories from your Bitbucket workspace and brings them into the IDP Catalog. Once discovered, entities can be registered as new catalog entries or merged into existing ones, enriching them with Bitbucket-sourced metadata for service discovery and dependency mapping.

---

## Before you begin

The following are needed to get the integration running:

* The feature flag `IDP_CATALOG_CD_AUTO_DISCOVERY` is enabled. Contact [Harness Support](mailto:support@harness.io) to enable it.
* You have the required RBAC permissions to manage integrations. All integration operations require the `IDP_INTEGRATION_EDIT` permission on the `IDP_INTEGRATION` resource type.
* A [Bitbucket Cloud connector](https://www.youtube.com/watch?v=PTfoe7siyGs) is configured in Harness with the credentials needed to access your Bitbucket workspace. Ensure that the connector has the [necessary permissions on your Bitbucket Cloud](#bitbucket-permissions). Go to [Set up a Bitbucket Cloud Connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference/) to review the required settings and scopes. You can create a new connector directly during the integration setup.
* While setting up the Bitbucket Cloud connector, make sure to select HTTP (not SSH) and authenticate using an access token. Use `x-token-auth` as the username. If you have an API token or App Password, generate a workspace access token instead.
* For each Bitbucket workspace, maintain one integration.

:::info Proxy Configuration
If your environment blocks outbound third-party traffic and routes it through a proxy, configure proxy settings on your Harness Delegate. Once configured there, the proxy settings are automatically picked up by IDP integrations. No additional setup is needed on the integration side.

Go to [Configure delegate proxy settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings) to set up proxy settings on your delegate.
:::

---

## Enable the Bitbucket Cloud Integration

### 1. Navigate to the Integrations page

1. In Harness, open the **Internal Developer Portal**.

2. From the left sidebar, click **Configure**.

3. In the left navigation menu, click **Integrations**.

   <DocImage path={require('./static/bb-integration-nav.png')} />

4. On the Integrations page, click **+ New Integration** at the top.

5. Select **Bitbucket Cloud** from the integration type picker. You will be taken to the **Auto Discover Bitbucket Cloud Integration** page.

### 2. Configure Setup & Connectivity

This section connects Harness IDP to your Bitbucket workspace.

<DocImage path={require('./static/bb-setup-connectivity.png')} />

1. Enter a name in the **Integration Name** field. This name appears on the integration card on the **Integrations** page (for example, `Bitbucket PreQA Workspace`).

2. Click the **Choose Bitbucket Cloud connector** dropdown and select the connector you created above.

   :::info Do not have a Bitbucket connector yet?
   If no connectors appear in the dropdown, click **+ New Connector** inside the picker modal to create one inline. Go to [Set up a Bitbucket Cloud Connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference/) to review the required settings and scopes. Remember to choose **HTTP** as the connection type while setting up the connector.

   <DocVideo src="https://www.youtube.com/embed/PTfoe7siyGs" />
   :::

### 3. Configure Mapping & Correlation

This section defines how Bitbucket entities map to IDP catalog entities and how they correlate with existing records.

The Bitbucket Cloud integration supports one entity type: **Repository Entity**.

<DocImage path={require('./static/bb-repository-entity.png')} />

#### Repository Entity

The Repository Entity mapping imports Bitbucket repositories as catalog entities, with configurable `Kind` and `Type`.

1. Under **Entity Registration Behavior**, choose how repositories are brought into the catalog:
   * **Register & Merge** *(Default)* - Registers new entities and updates existing ones when a match is found. This is the recommended option for most setups.
   * **Register** - Creates new catalog entities from Bitbucket Cloud. Does not merge with existing entities.
   * **Merge** - Links discovered repositories to existing catalog entities. Matching entities are recommended automatically, but you can choose a different one.

2. Choose the **Kind** and **Type** from the dropdown. By default, these are `Component` and `service` respectively. Configurability varies by registration behavior:

   | Registration Behavior | Kind | Type |
   |---|---|---|
   | `Register & Merge` | Configurable | Configurable |
   | `Register` | Configurable | Configurable |
   | `Merge` | Configurable | Not configurable |

3. Under **Correlation Mapping**, set the **Ingested Data Path** (from Bitbucket) and the corresponding **Catalog YAML Path** (from your IDP entity) to define how records are matched. The operator supports `Equals` and `Contains`. By default, `name` is mapped to `name`.

4. Optionally, click **Configure** next to **Configure fields (optional)** to customize which Bitbucket fields are synced to the catalog. Default mappings are preconfigured.

5. Optionally, click **Configure** next to **Configure Secondary Kinds (optional)** to control which additional data streams are synced for each repository. By default, all secondary kinds are selected.

   Secondary kinds enrich each repository entity with development activity data, giving teams a view of how actively an entity is being developed without leaving the platform.

   <DocImage path={require('./static/bb-secondary-kinds.gif')} />

   The following secondary kinds are available:

   | Secondary Kind | Description | First sync (per repository) | Limit across all repositories (per sync) |
   |---|---|---|---|
   | **Pull Requests** | Pull request details, covering open, merged, and declined PRs. | 50 most recently updated PRs | 5,000 PRs |
   | **Commits** | Commit history on the default branch. | 50 most recent commits | 5,000 commits |

   On the first sync, IDP fetches a limited snapshot per repository. If the total PRs or commits across all repositories exceed their respective per-sync limits (i.e. 5000), the excess is not dropped. Subsequent syncs backfill the remaining PRs and commits and pick up any new ones.

   :::caution Secondary kinds cannot be modified after setup
   These selections are locked once the integration is created and cannot be modified later. Choose carefully before confirming.
   :::

   <!-- :::info Where does this data appear?
   Secondary kinds data is displayed on the [Entity Details](https://developer.harness.io/docs/internal-developer-portal/catalog/create-entity/entity-details) page for each repository under the **Bitbucket** tab. It does not appear in the **Ingested Properties** YAML in the Entity Inspector.
   ::: -->

### 4. Configure Advanced Settings

The **Advanced Settings** section controls how frequently IDP syncs with Bitbucket Cloud.

<DocImage path={require('./static/bb-advanced-settings.png')} />

1. Select an **Update Frequency** from the dropdown to control how often IDP polls Bitbucket for new data. The default is 3 hours.

2. Optionally, set a **Select start date** to define the earliest date from which IDP will pull Bitbucket data.

3. Once all sections are configured, click **Confirm & Enable**. A confirmation dialog will appear before changes are applied.

The integration is now enabled and IDP begins syncing data from Bitbucket Cloud. Discovered repositories appear in the [**Discovered** tab](#discovered-tab).

---

## Discover and Import Bitbucket Entities

This section covers how to view the Bitbucket entities discovered by the integration and import them into your IDP Catalog.

### Discovered tab

After the integration runs, all Bitbucket repositories detected appear in the **Discovered** tab. If entities do not appear, use the **Sync** button at the top right to manually refresh.

<DocImage path={require('./static/bb-discovered-tab.png')} />

For each discovered entity, you can see its name, the recommended catalog action, kind, type, and the date it was detected. You can choose how to bring entities into the catalog using one of the following actions:

* **Register** *(shown as Recommended when no matching catalog entity exists)* - Creates a new catalog entity populated with the Bitbucket metadata. `Type` is editable by the user.
* **Merge** *(shown as Recommended when a matching catalog entity is found)* - Links the discovered entity to an existing catalog entity, enriching it with Bitbucket data. The suggested matching entity is shown automatically and can be changed.

:::tip Bulk Import and Auto Import options
* **Bulk Import** - Select multiple entities using the checkboxes and click **Import selected entities** at the bottom of the page to import them all at once.
* **Auto Import** - Toggle **Auto-import future discovered entities** in the top right of the Discovered tab to automatically import all future entities without manual review. You can change this preference at any time.
:::

### Imported tab

The **Imported** tab displays all Bitbucket entities that have been brought into the catalog.

<DocImage path={require('./static/bb-imported-tab.png')} />

It displays the following data:

| Column | Description |
|---|---|
| **Bitbucket Cloud Entity** | The name of the entity from Bitbucket, along with its import status (for example, **Merged** or **Registered**). |
| **Entity** | The linked IDP catalog entity and its ID. |
| **Kind** | The catalog entity kind (for example, `component` for repositories). |
| **Type** | The catalog entity type (for example, `service` for repositories). |
| **Scope** | The Harness account scope the entity belongs to. |
| **Imported At** | The timestamp when the entity was imported. |

:::caution Unlink an Imported Entity
To stop syncing a specific entity without deleting the catalog entity, use the three-dot menu on any row and select **Unlink**. This stops sync updates while keeping the IDP entity and its existing data intact.
:::

---

## View Bitbucket Entities in the Catalog

Once imported, Bitbucket entities are available in the **Catalog** section of IDP as standard catalog entities.

Each imported Bitbucket repository is registered with:

* **Kind:** `Component`
* **Type:** `service`
* **Scope:** The Harness account the integration belongs to

Open any entity to view its Overview, Relationships, Scorecards, and any other tabs configured for your entity layout.

<DocImage path={require('./static/bb-catalog-entity.png')} />

### Ingested Properties

To inspect the raw data ingested from Bitbucket Cloud, open the entity and click **View YAML**, then select **Ingested Properties** in the Entity Inspector.

<DocImage path={require('./static/bb-ingested-properties.gif')} />

Ingested properties are stored in two sections of the entity YAML:

* **`metadata.integration`** - Tracks which integrations are linked to this entity, including the entity action (for example, `REGISTER` or `MERGE`) and the linked entity UUID for each integration instance.
* **`integration_properties.BitbucketCloud`** - Contains the Bitbucket-specific data for the entity, including repository metadata such as name, URL, project key, default branch, tags, and visibility.

---

## Manage the Bitbucket Cloud Integration

### Edit the Integration

To update the integration name, switch the Bitbucket connector, or change the mapping and correlation settings, navigate to the **Integrations** page, find your Bitbucket integration card, and click **View**. From there, click **Configuration** to open the edit screen.

### Suspend Auto-Discovery

If auto-discovery is suspended, new entities will not appear in the **Discovered** tab. Existing imported entities remain unchanged in the catalog and sync between Bitbucket and their corresponding IDP entities will stop.

To suspend auto-discovery:

1. Go to **Integrations** and open your Bitbucket integration using the **View** button.
2. Click **Configuration** at the top.
3. In the **Danger Zone** section, click **Suspend**.
4. Confirm the action.

You may re-enable it at any time by following the same steps.

---

## Bitbucket Permissions

The Bitbucket Cloud integration requires a workspace access token with the following minimum scopes. Go to the [Bitbucket connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference/) to review the full connector settings.

* **Projects:** Read
* **Repositories:** Read
* **Pull requests:** Read

<DocImage path={require('./static/minimum-perm.png')} />

These scopes allow IDP to discover all repositories in the workspace, read repository metadata, and ingest pull request data as a secondary kind.
