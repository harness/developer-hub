---
title: Kubernetes Integration
description: Auto-discover Kubernetes services and populate the IDP Catalog for service discovery and dependency mapping.
sidebar_position: 7
sidebar_label: Kubernetes
---

import DocImage from '@site/src/components/DocImage';

The Kubernetes integration automatically discovers services running in your Kubernetes cluster and brings them into the IDP Catalog. Once discovered, services can be registered as new catalog entities or merged into existing ones, enriching them with Kubernetes-sourced metadata for service discovery and dependency mapping.

For each service, the integration collects the following:

| Resource | What it provides |
|---|---|
| **Service** | Imported Kubernetes services organized by environment, including kind, namespace, replica count, and name. |
| **Workloads** | Workload resources, including Deployment, StatefulSet, DaemonSet, and ReplicaSet, organized by environment. |
| **Pods** | Pod-level detail including phase, pod and host IP, node, service account, start time, and per-container status. |
| **Nodes** | Node detail including kubelet version, OS, architecture, zone, capacity, and node conditions. |
| **Containers** | Container images, ports, environment variables, health probes, and volume mounts. |

:::info Using an older version of the Kubernetes integration?
* (BETA) To see Workloads, Pods, Nodes, and Containers data and near real time updates, you may create a new Kubernetes integration having a [discovery agent with persistent agent mode enabled](#2-choose-a-discovery-agent).
* Support for updating the discovery agent on your existing Kubernetes integration is coming soon.
* Auto-upgrade of the discovery agent is coming soon.
:::

---

## Before you begin

The following are needed to get the integration running:

* Ensure the feature flag `IDP_INTEGRATIONS` is enabled. Contact [Harness Support](mailto:support@harness.io) to enable it.
* You have the required RBAC permissions to manage integrations. All integration operations require the `IDP_INTEGRATION_EDIT` permission on the `IDP_INTEGRATION` resource type.
* A [Self-hosted Discovery Agent (SDA)](/docs/platform/service-discovery/customize-agent) is installed and running in your Kubernetes cluster with permissions to list and watch services and deployments in the target namespaces.

---

## Enable the Kubernetes integration

:::info
The Kubernetes integration is currently available at the **Project** level only. Navigate to a specific project to add or manage Kubernetes integrations.
:::

### 1. Navigate to the integrations page

This section is intended to take you to the Kubernetes integration at the project level.

1. In Harness, open the **Internal Developer Portal**.

2. From the left sidebar, click **Configure**.

3. In the left sidebar, switch the scope to your target project.

   <DocImage path={require('./static/k8s-integration-nav.gif')} />

4. In the left navigation menu under the project section, click **Integrations**.

5. On the Integrations page, click **+ New Integration** at the top.

6. Select **Kubernetes**. You will be taken to the **Auto discover Kubernetes services** page to [choose a discovery agent](#2-choose-a-discovery-agent).

### 2. Choose a discovery agent

This section is intended to help you attach a discovery agent required to pull information about your Kubernetes services into the IDP.

<DocImage path={require('./static/discovery-agent-selection.png')} />

1. Enter a name in the **Integration Name** field. This name appears on the integration card on the **Integrations** page (e.g., `PreQA GCP K8s Integration`).

2. Click the **Discovery agent** dropdown and select the Service Discovery Agent (SDA) you want to use to import Kubernetes data into the IDP (for example, `DA-latest-agent`). Only agents with a non-empty environment identifier appear in this list.

   :::tip Need help with setting up a Discovery Agent?
   If no discovery agents appear in the dropdown, you have not set up a Service Discovery Agent (SDA) yet. Click the **Set Up now** link on the configuration screen to register a new agent. You will be prompted to select an environment and infrastructure, provide an agent name, and specify the namespace where the agent will run. 
   
   To collect near real time data, enable **Persistent Agent Mode** in the **Data Collection Settings** step. This option is only visible if the `IDP_ENABLE_PERMANENT_SDA` feature flag is enabled; contact [Harness Support](mailto:support@harness.io) if you do not see it. A Kubernetes manifest file is generated for you to install the agent in your environment. Go to [Customize Discovery Agent](/docs/platform/service-discovery/customize-agent) to customize the agent configuration.
   :::

#### How data is collected

The integration relies on a Service Discovery Agent (SDA) that runs inside your Kubernetes cluster and pushes discovered data back to Harness. The agent supports two collection modes, chosen when you [create the discovery agent](#2-choose-a-discovery-agent).

* **Persistent agent** *(Recommended)*: The agent stays installed and running in your cluster. It watches Kubernetes resources such as deployments, services, and pods, and pushes updates as changes happen. Data on the entity reflects the cluster in near real time, without waiting for a schedule.
* **Cron-based agent**: The agent runs on a schedule you define (for example, every 15 minutes). On each run it collects the current cluster state, pushes it, and stops until the next scheduled run. Data on the entity is only as fresh as the last run.

   Enable **Persistent Agent Mode** when you want changes such as a replica count update, a pod restart, or a health change to appear on the entity within seconds rather than after the next cron run.

   <DocImage path={require('./static/persistent-agent-mode.png')} />

   :::tip
   The agent observes resources per cluster. For example, if your prod and non-prod services run in separate clusters but you need them in one entity view, you may create separate Kubernetes integrations (and agents) for each cluster, and then merge the discovered services into the same catalog entity to [see all environments together](#overview-tab).
   :::

3. Once both fields are filled, click **Confirm & Enable** and a dialog box will appear to confirm before applying the changes.

The integration is now enabled. The SDA begins scanning the connected Kubernetes cluster, and discovered services appear in the [**Discovered** tab](#discovered-tab).

---

## Discover and import Kubernetes services

This section covers how you can view the Kubernetes services found by the discovery agent and display them in your IDP catalog.

### Discovered tab

After the integration runs, all services detected by the SDA appear in the **Discovered** tab. If the services do not update, use the **Sync** button at the top right to manually refresh and fetch the latest services from the cluster.

   <DocImage path={require('./static/discovered-tab.png')} />

For each discovered service, you can see its name, kind, and the date it was detected. You can choose how to bring the services into the IDP Catalog using one of the following methods:

* **Register** - Creates a new catalog entity populated with the Kubernetes service metadata. Use this for services that do not yet exist in the catalog.
* **Merge** *(Recommended)* - Links the discovered service to an existing catalog entity, enriching it with Kubernetes metadata. If IDP already has an entity with a matching name, the **Merge** option is pre-selected and the matching entity is suggested automatically. Existing entity data is preserved and the Kubernetes data is layered on top.

:::tip Bulk Import and Auto Import Options
* **Bulk Import** - You can import services one at a time or select multiple services for bulk import using the checkboxes. A selection widget at the bottom shows the count of selected services and an **Import selected services** button.

* **Auto Import** - Select **Auto-import future discovered services** at the top right to automatically import all future services without manual review. You can change this preference at any time.
:::

### Imported tab

The **Imported** tab displays all the services you have brought into the catalog.

   <DocImage path={require('./static/imported-tab.png')} />

It displays the following data:

| Column | Description |
|---|---|
| **Kubernetes Service** | The name of the service from the cluster, along with its import status (for example, **Merged**). |
| **Entity** | The linked IDP catalog entity and its ID. |
| **Kind** | The catalog entity kind (e.g., `component`). |
| **Type** | The catalog entity type (e.g., `service`). |
| **Scope** | The Harness project scope the entity belongs to. |
| **Imported At** | The timestamp when the service was imported. |

:::tip Unlink an Imported Service
To stop syncing a specific service without deleting the catalog entity, use the three-dot menu on any row and select **Unlink**. This stops sync updates while keeping the IDP entity and its existing data intact.
:::

---

## View Kubernetes entities in the catalog

Once imported, services are available in the **Catalog** section of IDP as standard catalog entities.

Each imported Kubernetes service is registered with:

* **Kind:** `Component`
* **Type:** `Service`
* **Scope:** The Harness project the integration belongs to

Open any entity to view Kubernetes-sourced data directly on the entity details page. This data is displayed through two dedicated UI components: a card on the **Overview** tab and a **Kubernetes** tab. Both require a one-time layout configuration, described in the [next section](#layout-for-kubernetes-components).
 
### Layout for Kubernetes components
 
To display Kubernetes data on the [entity details](/docs/internal-developer-portal/catalog/create-entity/entity-details) page, you need to add the Kubernetes tab component to the relevant entity layout. This is a one-time configuration per entity kind and type.
 
1. From the left sidebar of IDP, go to **Configure** → **Layout** → **Catalog Entities**.

2. Edit the existing layout for your entity or create a new one.

3. Select the **Entity Kind** (e.g., `component`) and the **Entity Type** (e.g., `service`) that matches your imported Kubernetes entities.

4. In the YAML editor, add the `IntegrationsContent` component inside the **Overview** tab's `contents` block, and add a new top-level tab entry using the `KubernetesIntegrationTab` component:

   <DocImage path={require('./static/k8s-layout-config.png')} />

   The relevant YAML additions are:

   ```yaml title="Inside the Overview tab's contents block"
           - component: IntegrationsContent
             specs:
               gridProps:
                 md: 12
   ```

   ```yaml title="A new top-level tab entry"
       - name: Kubernetes
         path: /kubernetes-resources
         title: Kubernetes
         contents:
           - component: KubernetesIntegrationTab
   ```



5. Click **Save** to apply the layout changes. The **Kubernetes** tab will now appear on all entity detail pages of the selected kind and type that have Kubernetes data.

### Overview tab

The entity **Overview** tab includes a card that summarizes the Kubernetes resources linked to the service. Each row shows the resource name, environment, namespace, kind, and replica count. Click **View All** to open the full [Kubernetes tab](#kubernetes-tab).

<DocImage path={require('./static/k8s-overview.png')} />

### Kubernetes tab

The **Kubernetes** tab shows every Kubernetes resource linked to the service. Because the agent observes resources per cluster, this view lets you see resources across the environments and namespaces you have merged into the entity.

<DocImage path={require('./static/k8s-tab-resources.png')} />

The table lists the following columns:

| Column | Description |
|---|---|
| **Name** | The Kubernetes resource name. |
| **Environment** | The environment the resource belongs to, derived from the discovery agent that reported it. |
| **Namespace** | The Kubernetes namespace the resource runs in. |
| **Kind** | The Kubernetes resource kind (for example, `Service`, `DaemonSet`, `Deployment`). |
| **Replicas** | The replica count for the resource. |
| **Integration ID** | The identifier of the integration that reported the resource. |

Use the **Environment**, **Namespace**, and **Integration ID** dropdowns at the top right to filter the table. Filter by environment to narrow the view to a single environment when a service spans more than one.

### Resource detail drawer

Click any row in the Kubernetes tab to open a detail drawer for that resource. The drawer organizes data into tabs.

<DocImage path={require('./static/k8s-drawer.gif')} />

* **Overview** - Workload summary for the resource. Includes its kind, status flags (for example, `Healthy`, `No Privileged`, `Pinned Images`, `Has Limits`), ready replica count, labels and annotations, deployment configuration (strategy, max surge, max unavailable, service account), container summary, volumes, conditions, and networking details.
* **Pods** - The pods that belong to the resource. Each pod shows its running status, pod IP, host IP, node placement, service account, start time, and per-container ready state and restart count.
* **Nodes** - The nodes the resource is scheduled on. Each node shows its kubelet version, OS, architecture, zone, capacity, allocatable resources, and node conditions.
* **Containers** - The containers in the resource, including image, ports, environment variables, health probes (liveness and readiness), and volume mounts.

When the discovery agent runs in persistent mode, this data updates in near real time. For example, changing a deployment's replica count or a change that makes a workload unhealthy is reflected on this tab shortly after it happens in the cluster.

:::info
This integration surfaces resource state and status, not pod logs. Pod and container logs are not collected or displayed.
:::


### Ingested properties

To inspect the raw data ingested from Kubernetes, open the entity and click **View YAML** → **Ingested Properties** in the Entity Inspector.

   <DocImage path={require('./static/k8s-catalog-yaml-data.gif')} />

Ingested properties are stored in two sections of the entity YAML:

* **`metadata.integration`** - Tracks which integrations are linked to this entity, including the entity action (`MERGE`) and the linked entity UUID for each integration instance.
* **`integration_properties.HarnessK8s`** - Contains the Kubernetes-specific data, organized by environment. For each environment, it lists the services you [imported](#imported-tab) to the catalog, including details like `kind`, `replicas`, `namespace`, and `name`.

---

## Manage the Kubernetes integration

The **Configuration** screen for an existing Kubernetes integration shows the integration name and discovery agent used, but neither can be changed after the integration is created. To use a different discovery agent or a different integration name, create a new Kubernetes integration.
 
To view the Configuration screen, go to **Integrations** in your project, find the Kubernetes integration card, and click **View**. From there, click **Configuration**.

### Suspend auto-discovery

If auto-discovery is suspended, new services will not be surfaced in the **Discovered** tab. Existing imported entities remain unchanged in the catalog. In other words, the sync between the Kubernetes services and their corresponding IDP entities will stop.

To suspend auto-discovery:

1. In your project, go to **Integrations** and open your Kubernetes integration using the **View** button.
2. Click **Configuration** at the top.
3. In the **Danger Zone** section, click **Suspend**.
4. Confirm the action.

You may re-enable it at any time by following the same steps.

### Delete the integration
 
Deleting disconnects the integration and removes the integration configuration. Catalog entities that were ingested through it stop receiving updates, but the entities themselves are not deleted.
 
To delete the integration:
 
1. On the Configuration screen, go to the **Danger Zone** section.
2. Click **Delete**.
3. Confirm the action.

:::caution
Deletion cannot be undone. If you need the integration again, you will have to set it up from scratch.
:::

---

## Frequently asked questions

<details>
<summary>How fresh is the Kubernetes data on my service?</summary>
<div>
It depends on how you have set up the discovery agent. A cron-based agent refreshes data on its schedule (for example, every 15 minutes), so the entity is only as current as the last run. A persistent agent watches the cluster and pushes changes as they happen, so data updates in near real time.
</div>
</details>

<details>
<summary>What is a persistent (permanent) discovery agent?</summary>
<div>
A persistent agent stays installed and running in your cluster instead of spinning up on a schedule and shutting down. It watches Kubernetes resources and reports changes as they occur, which is what enables near real time updates on the entity.
</div>
</details>

<details>
<summary>Can I see a service across multiple environments or clusters?</summary>
<div>
Yes. The agent observes resources per cluster, so a service that runs in more than one cluster needs a separate integration and agent per cluster. Merge the discovered services into the same catalog entity, and the resources from each environment appear on the entity, filterable by environment on the Kubernetes tab.
</div>
</details>

<details>
<summary>Does the integration show pod logs?</summary>
<div>
No. Currently, the integration surfaces resource state and status such as pod phase, container state, and health, but it does not collect or display pod or container logs.
</div>
</details>

<details>
<summary>Why does a workload show as unhealthy after I change its replica count in my cloud?</summary>
<div>
If a replica change cannot be scheduled (for example, the cluster cannot place the requested pods), the workload reports an unhealthy or unschedulable state, and that state is reflected on the Kubernetes tab in IDP. This is the actual cluster state, surfaced in near real time when the agent runs in persistent mode.
</div>
</details>

<details>
<summary>Do I still need to merge services, or can I register them?</summary>
<div>
Both are supported. Register creates a new catalog entity from the discovered service. Merge (recommended) links the discovered service to an existing entity and layers the Kubernetes data on top without overwriting what you already authored.
</div>
</details>
