---
title: Overview
description: Learn about the Harness IDP Software Catalog and how to manage your software entities.
sidebar_position: 1
sidebar_label: Overview
redirect_from: 
- /docs/internal-developer-portal/catalog/overview
- /docs/internal-developer-portal/catalog/software-catalog

---

import DocImage from '@site/src/components/DocImage';

The **Software Catalog** is the central hub of Harness Internal Developer Portal (IDP). It serves as a unified, searchable registry of all your software assets including services, APIs, libraries, websites, databases, and more. Think of it as your organization's **comprehensive directory of software entities**, providing a single source of truth for ownership, metadata, dependencies, and relationships across your entire software ecosystem.

The catalog helps you:

- **Discover** all software assets across your organization
- **Track ownership** and understand who is responsible for each component
- **Visualize dependencies** and relationships between services
- **Maintain metadata** such as lifecycle stage, tech stack, and documentation
- **Enable self-service** for developers to find and use existing services
- **Improve governance** with centralized visibility and control

![](./static/catalog-ui-new.png)

---

## What are Catalog Entities?

**Entities** are the building blocks of your Software Catalog. Each entity represents a distinct software asset in your organization and contains structured metadata that describes its purpose, ownership, and relationships.

### Core Entity Types

Harness IDP supports several core entity types:

- **[Component](/docs/internal-developer-portal/catalog/data-model/#idp2.0--component)**: Services, libraries, websites, or any deployable software unit
- **[API](/docs/internal-developer-portal/catalog/data-model/#idp2.0--api)**: REST APIs, GraphQL endpoints, or other programmatic interfaces
- **[Resource](/docs/internal-developer-portal/catalog/data-model/#idp2.0--resource)**: Databases, message queues, storage buckets, or infrastructure resources
- **[System](/docs/internal-developer-portal/catalog/data-model/#idp2.0--system)**: Logical groupings of related components, APIs, and resources
- **[User Group](/docs/internal-developer-portal/catalog/data-model/#idp2.0--custom-user-groups)**: Custom organizational units or teams that own and manage catalog entities 

Each entity type has its own schema and metadata fields tailored to its specific purpose. For a comprehensive understanding of entity types, their structure, and relationships, refer to the [Catalog Data Model](/docs/internal-developer-portal/catalog/data-model).

---

## Populate Your Catalog

There are multiple ways to add entities to your Software Catalog, each suited for different use cases and workflows:

### 1. Create Entities Manually

In IDP 2.0, entity creation is simplified with full UI support and optional YAML-based creation. Entities are now **"inline,"** which means their entire lifecycle can be managed through the UI or API, without Git integration.

You can create entities directly via the **Harness IDP UI** with no YAML required for a streamlined, code-free experience. Alternatively, you can use your existing catalog YAML files, and Harness will **automatically convert legacy Backstage YAML** into the new Harness Catalog Entity Model.

[Learn more about creating entities manually →](/docs/internal-developer-portal/catalog/create-entity/create-manually)

### 2. Import from Git

Create new entities and Workflows by **importing their YAML definitions** stored in Git repositories directly into Harness IDP. This feature allows teams to reuse pre-defined configurations, onboard services faster, and migrate from automation workflows or existing repositories.

[Learn more about importing from Git →](/docs/internal-developer-portal/catalog/create-entity/import-from-git)

### 3. Auto-Discovery

Use the **Harness IDP Catalog Auto-Discovery** integration to sync **Harness CD** services into the **IDP Catalog**. This integration populates your Catalog with CD services so you can sync, view, and manage them directly in Catalog. Services are created as **IDP service entities** and kept in **real-time, uni-directional sync** with their corresponding CD services.

[Learn more about catalog auto-discovery →](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/harness-cd.md)

---

## Manage Your Catalog

Once your entities are registered, you can:

- **Edit entities** to update metadata, ownership, or configuration
- **View entity relationships** to understand dependencies and system architecture
- **Organize entities** using Systems to group related components
- **Search and filter** to quickly find the entities you need
- **Customize the catalog UI** to display the information most relevant to your teams

[Learn more about managing your catalog →](/docs/internal-developer-portal/catalog/manage-catalog.md)

---

## Next Steps

Ready to get started with the Software Catalog? Here are some recommended next steps:

1. **Understand the Data Model**: Learn about entity types, schemas, and relationships in the [Catalog Data Model](/docs/internal-developer-portal/catalog/data-model#idp2.0)
2. **Create Your First Entity**: Follow the guide to [create entities manually](/docs/internal-developer-portal/catalog/create-entity/create-manually)
3. **Set Up Auto-Discovery**: Automate entity registration with [catalog auto-discovery](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/harness-cd.md)
4. **Customize Your Catalog**: Configure the [catalog UI](/docs/internal-developer-portal/catalog/manage-catalog#idp2.0--manage-catalog-ui) to match your team's needs
5. **Write Catalog YAML**: Learn the [YAML schema](/docs/internal-developer-portal/catalog/catalog-yaml) for defining entities
