---
title: Catalog Auto-Discovery with Platform Integrations
sidebar_position: 2
sidebar_label: Platform Integration
description: Discover services from Platform integrations and sync them to the IDP Catalog
keywords:
  - catalog auto-discovery
  - platform integrations
  - cd auto-discovery
  - hierarchy entities
tags:
  - catalog-discovery
  - platform-cd
  - cd-auto-discovery
---

The Platform Integration feature in Harness IDP automatically syncs all scope-level entities from the Harness Platform as IDP catalog entities. This integration creates a hierarchical view of your Harness account structure, including accounts, organizations, and projects, making them discoverable and manageable within the IDP catalog.

## Overview

Platform Integration synchronizes your entire Harness Platform hierarchy into the IDP catalog as entities with a special `hierarchy` kind. This provides a unified view of your organizational structure and all associated services across accounts, organizations, and projects.

**Key features:**

- **Automatic synchronization** - Syncs all entities from the Harness Platform to IDP catalog
- **Hierarchical structure** - Maintains account → organization → project relationships
- **Scope-based filtering** - View entities by account, organization, or project scope
- **Read-only entities** - Imported entities cannot be deleted from the catalog
- **Continuous sync** - Keeps catalog entities up-to-date with Platform changes

## Enabling Platform Integration

To enable Platform Integration:

1. Navigate to **Configure** → **Integrations** → **Platform Integration**
2. If not already enabled, click **Enable** to activate the integration
3. The integration will display an enable/disable toggle with minimal configuration required


<DocImage path={require('./static/enable-pl-int.png')} alt="Enable Platform Integration" title="Click to view full size image" />

:::info
Once you import entities using Platform Integration, you won't be able to delete them from the catalog. They are managed by the Platform Integration sync process.
:::

After enabling, all scope-level entities (accounts, organizations, and projects) from the Harness Platform will be automatically imported into the IDP catalog.

## Viewing Imported Entities

Once the import is complete, you can view all imported entities in two ways:

#### From Platform Integration Page

Navigate to **Configure** → **Integrations** → **Platform Integration** to view the imported entities table:

<DocImage path={require('./static/pl-int-list.png')} alt="Platform Integration List" title="Click to view full size image" />


Clicking on an entity in this table will navigate you to the IDP catalog entity details page.

#### From IDP Catalog

Navigate to **Catalog** and filter by **Kind: hierarchy** to view all hierarchical entities. You can then select the specific type (account, organization, or project) to view entities at that level.

<DocImage path={require('./static/hierarchy.png')} alt="Hierarchy entities" title="Click to view full size image" />

## Hierarchy Entity Structure

Platform Integration creates entities with `Kind: hierarchy`, which represents the organizational structure of your Harness Platform. These entities have different types based on their level in the hierarchy:


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="hierarchy-level">
<TabItem value="account" label="Account-Level Entity">

When you view an account entity:

- **Kind:** `hierarchy`
- **Type:** `account`

<DocImage path={require('./static/acc-lvl-entity.png')} alt="Account Level Entity" title="Click to view full size image" />

**The Overview tab displays two tables:**

1. **Organizations belonging to this Account** - Lists all direct child organizations
  
2. **Entities belonging to this scope (account)** - Lists all entities at the account scope level

</TabItem>
<TabItem value="organization" label="Organization-Level Entity">

When you view an organization entity:

- **Kind:** `hierarchy`
- **Type:** `organization`

<DocImage path={require('./static/org-entity.png')} alt="Organization Level Entity" title="Click to view full size image" />

**The Overview tab displays three sections:**

1. **Projects belonging to this Organization** - Lists all direct child projects

2. **Entities belonging to this scope (organization)** - Lists all entities at the organization scope level

</TabItem>
<TabItem value="project" label="Project-Level Entity">

When you view a project entity:

- **Kind:** `hierarchy`
- **Type:** `project`

<DocImage path={require('./static/pro-level.png')} alt="Project Level Entity" title="Click to view full size image" />

**The Overview tab displays:**

1. **Entities belonging to this scope (project)** - Lists all entities at the project scope level

</TabItem>
</Tabs>

## Customizing Hierarchy Entity Views

Beyond the default hierarchical relationships, you can customize the Overview tab of hierarchy entities to display additional metrics and insights using **Aggregation Rules** and **Layout Configuration**.

<DocImage path={require('./static/layout.png')} alt="Layout" title="Click to view full size image" />

#### What You Can Add

- **Stats Cards** - Display aggregated metrics from child entities (e.g., average test coverage, deployment frequency)
- **Aggregation Tables** - Show breakdowns of metrics with individual values from child entities

#### How It Works

1. **Create Aggregation Rules** - Define how to roll up metrics from lower-level entities (e.g., from components to projects, from projects to organizations)
2. **Configure Layouts** - Add stats cards and tables to display the aggregated metrics on hierarchy entities
3. **View Results** - Navigate to hierarchy entities to see your customized metrics and insights

<DocImage path={require('./static/metric.png')} alt="Metric" title="Click to view full size image" />

For example, you can aggregate DORA metrics from service components to project entities, then roll up test coverage from projects to organizations, and display these as cards on the Overview tab.

## Next Steps

- Learn about [Aggregation Rules](/docs/internal-developer-portal/catalog/aggregation-rules) to roll up metrics across hierarchy levels
- Explore [Layout Configuration](/docs/internal-developer-portal/layout-and-appearance/catalog) to customize hierarchy entity views
- Understand [Catalog Ingestion](/docs/internal-developer-portal/catalog/integrate-tools/catalog-ingestion-api) to add custom properties to entities

