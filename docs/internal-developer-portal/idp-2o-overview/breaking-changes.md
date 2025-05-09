---
title: Breaking Changes
description: Comprehensive guide to Harness IDP 2.0 — explore the new Harness-native data model, platform RBAC, Git Experience, and improved UX for internal developer portals. Includes migration strategy, feature compatibility, and rollout details for upgrading from IDP 1.0.
sidebar_position: 2
sidebar_label: Breaking Changes
redirect_from: docs/internal-developer-portal/2-0-overview-and-upgrade-path
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

IDP 2.0 introduces fundamental architectural changes, API modifications, and entity definition updates. These enhancements significantly improve scalability, usability, and consistency, though they may necessitate migration efforts. Please review the following critical changes:

## Breaking Changes in IDP 2.0

### API Changes (Backstage Catalog APIs → Harness Catalog APIs)

IDP 2.0 brings new Catalog and Workflow APIs which are part of Harness Platform APIs, ensuring responses properly incorporate Role-Based Access Control (RBAC) and entity scope considerations.

The [IDP 1.0 APIs](./api-refernces/public-api.md) for registering a new entity, refreshing and unregistering a location are now marked deprecated in IDP 2.0. However, they will continue to be available until August 2025 for customers to migrate. Note that the IDP 1.0 APIs will not support RBAC and can only work with entities at Account scope.

The new API Documentation will be published at [Harness API Docs](https://apidocs.harness.io/) once IDP 2.0 is released on production.

Catalog Ingestion APIs remain functional as before, though RBAC will now be enforced on updated entities

### Entity YAML Definition

IDP 2.0 implements a Harness-native entity schema featuring targeted adjustments to previous Backstage-style YAML configurations. These changes primarily introduce scope concepts (project, organization, or account) while enhancing readability based on user feedback.

For convenience, we've developed an API that converts Backstage catalog YAML to Harness catalog YAML format. This conversion is also available in the user interface—simply paste a Backstage Catalog YAML to automatically convert it to Harness Catalog YAML.

JSON Schemas for all Catalog entities are available through our API.

All existing Catalog entities and Workflows will be automatically converted upon migration to IDP 2.0. Additionally, we will provide a tool to commit these converted definitions to their corresponding YAML files in Git through the new Git Experience.

#### ⨁ New fields

- `orgIdentifier` (optional)
- `projectIdentifier` (optional)

These fields define the entity's scope. For project-scoped entities, both fields will be present. For organization-scoped entities, only `orgIdentifier` will appear. Account-level entities will have the scope automatically assigned to the account.

#### ♻️ Updated fields

- `metadata.name` becomes `identifier`
  - This aligns with Harness Entity YAML definitions and enhances UX consistency. Moved to root level due to its importance to entity definition.
- `metadata.title` becomes `name`
  - Aligned with Harness Entity YAML definitions and moved to root level to reflect its critical importance.
- `spec.type` becomes `type`
  - Relocated to root level as it is fundamental to entity definition. The `kind` and `type` fields define entity behavior and should appear together.
- `spec.owner` becomes `owner`
  - Moved to root level to emphasize its significance. IDP Catalog addresses ownership challenges, warranting prominent placement of this field.

#### ⊖ Removed fields

- `metadata.namespace`
  - Previously used in Backstage for scoping (typically set as default). With the introduction of Harness Platform Hierarchy, `namespace` becomes redundant. Scope is now determined using `projectIdentifier` and `orgIdentifier`.
- `spec.system` and `spec.domain`
  - These fields previously helped organize components within systems. Since entities will now exist within Harness projects and organizations, these structures will replace System and Domain functionality.

#### Unchanged fields

- `metadata` continues to be flexible. You can define your own properties within metadata.
- `annotations`, `description`, `tags`, `links`, `labels` etc. continue to be part of metadata.

#### YAML Comparison

<Tabs>
  <TabItem value="idp-1" label="IDP 1.0 (Backstage YAML)">

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: artist
  title: Artist Service
  description:
  annotations:
    jira/project-key: artistweb
  tags:
    - java
  links:
    - url: https://admin.example-org.com
      title: Admin Dashboard
      icon: dashboard
      type: admin-dashboard
spec:
  type: service
  lifecycle: production
  owner: artist-relations-team
  system: public-websites
```

</TabItem>

<TabItem value="idp-2" label="IDP 2.0 (Harness YAML)" default>
  ```yaml
  apiVersion: harness.io/v1
  identifier: artist-service
  name: Artist Service
  kind: Component
  type: service
  projectIdentifier: public-websites
  orgIdentifier: default
  owner: group:artist-relations-team
  metadata:
    description:
    annotations:
      jira/project-key: artistweb
    tags:
      - java
    links:
      - url: https://admin.example-org.com
        title: Admin Dashboard
        icon: dashboard
        type: admin-dashboard
  spec:
    lifecycle: production
  ```
  </TabItem>
</Tabs>

### Deprecated YAML files

Existing Backstage YAML files will no longer be valid in IDP 2.0 due to the structural changes outlined above.
For existing entities, use Harness Git Experience APIs to create corresponding YAML files in a new repository. For new entities, users will have the option to use inline or remote definitions during entity creation.

### Entity Reference Structure Changes

Entity references maintain similar structure with one key difference: `namespace` is replaced by the Harness scope identifier.

The format changes from `[kind]:[namespace]/identifier` to `[kind]:[scope]/identifier`.
Scope can be one of:

- `account`
- `account.orgId` (for organization-level entities)
- `account.orgId.projectId` (for project-level entities)

This applies to all relationships including `dependsOn`, `subComponentOf`, `providesApis`, entity references in Catalog Ingestion APIs, and any other YAML-based entity references.

### Hidden Tags Removed (Use RBAC Instead)

The "hidden" or "private" tags previously used to restrict entity visibility to owners are now deprecated in favor of Harness RBAC.
Entities should be created at the appropriate scope (Project, Organization, Account) with properly configured roles, users, and user groups to establish the required permissions.
For example, to restrict a set of Components to a specific team, create them at a Project scope and assign only that team as Project Viewers.

### System and Domain Entities Removed

`System` and `Domain` entities have been removed. These often duplicated Harness Project and Organization structures, respectively.

To group entities within a project, you may create a Component with `type: system` (or another suitable type) and use `spec.subComponentOf` in child components to establish relationships in the Catalog.

Ensure the Sub Components card is available in the "Dependencies" or "Overview" tab to visualize these relationships.

<!-- (TODO: Provide Layout YAML for customers who might have removed it) -->

### Register/Catalog-Import → Redirects to UI Flow

The Catalog Import page at `/catalog-import` is deprecated as entities must now be created using the new data model. Users will be guided through an intuitive "Create Entity" workflow in the UI, eliminating the need to write raw YAML before registering entities.

You should remove this page from your sidebar by using the "Layout & Appearance" page inside "IDP Configure" view.

### Old Catalog Access Control page is deprecated

The IDP 1.0 "Access Control" page within the IDP Configure view has been removed. Please use Harness Platform RBAC instead. Administrators can assign permissions to users/groups via roles scoped to Account/Organization/Project, or create custom roles with specific permissions.

### Pipeline Step: Create Catalog and Register Catalog steps

The "Create Catalog" and "Register Catalog" steps previously used in IDP pipelines have been marked deprecated. They rely on creating a YAML file, committing and pushing it to Git, then using the URL to register it in IDP Catalog using IDP 1.0 APIs.

You can now directly use Harness IDP Catalog APIs to register new entities using YAML definitions without Git operations. We will provide a sample pipeline using the new APIs. A dedicated step for this functionality will be available soon.

## Feature Compatibility Matrix (1.0 vs 2.0)

This section outlines the availability of key IDP features across IDP 1.0 and IDP 2.0. Some features from IDP 1.0 have been improved, reimagined, or deprecated. Others are currently in progress and will be included before the GA release.

| Feature                              | IDP 1.0 | IDP 2.0 | Notes                                                                                                                                                                                                          |
| ------------------------------------ | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📁 **Catalog**                       |         |         |                                                                                                                                                                                                                |
| Catalog Entity YAMLs                 | ✅      | ✅      | YAML structure has changed in IDP 2.0. See [Breaking Changes](#breaking-changes).                                                                                                                              |
| UI-based Entity Creation             | ❌      | ✅      |                                                                                                                                                                                                                |
| Edit Entities via UI                 | ❌      | ✅      |                                                                                                                                                                                                                |
| Backstage Plugins Support            | ✅      | ✅      | Existing Backstage plugins are fully supported via annotations.                                                                                                                                                |
| Custom Plugins                       | ✅      | ✅      |                                                                                                                                                                                                                |
| Customizable Entity Page UI          | ✅      | ✅      |                                                                                                                                                                                                                |
| Scorecards view in Catalog table     | ❌      | ✅      |                                                                                                                                                                                                                |
| Scope Filters in Catalog             | ❌      | ✅      |                                                                                                                                                                                                                |
| System/Domain Hierarchy              | ✅      | ❌      | Replaced by Project/Org hierarchy. See Breaking Changes for details.                                                                                                                                           |
| Ownership, tags, links, labels, etc. | ✅      | ✅      |                                                                                                                                                                                                                |
| Setting Ownership via UI             | ❌      | ✅      | Ownership can be assigned using selectable users and groups in the UI.                                                                                                                                         |
| ⚙️ **Workflows**                     |         |         |                                                                                                                                                                                                                |
| Workflow YAMLs                       | ✅      | ✅      |                                                                                                                                                                                                                |
| Workflow Groups                      | ✅      | ✅      |                                                                                                                                                                                                                |
| Workflow RBAC                        | ❌      | ✅      |                                                                                                                                                                                                                |
| Workflow Scope (Account/Org/Project) | ❌      | ✅      |                                                                                                                                                                                                                |
| Workflow Groups Scope                | ❌      | ✅      |                                                                                                                                                                                                                |
| Gradual Workflow Rollout             | ❌      | ✅      |                                                                                                                                                                                                                |
| UI-based Workflow Creation           | ❌      | ✅      |                                                                                                                                                                                                                |
| 📊 **Scorecards**                    |         |         |                                                                                                                                                                                                                |
| Scorecards in Catalog View           | ❌      | ✅      |                                                                                                                                                                                                                |
| Project/Org filters in Scorecards    | ❌      | Planned | Scorecards can be applied to entities based on their scopes.                                                                                                                                                   |
| Scorecards scoped to Project/Org     | ❌      | Planned | Scorecards can be created directly at the Project or Org scope.                                                                                                                                                |
| 🔄 **Git Experience**                |         |         |                                                                                                                                                                                                                |
| YAMLs in Git                         | ✅      | ✅      |                                                                                                                                                                                                                |
| Inline Entities (no file in Git)     | ❌      | ✅      |                                                                                                                                                                                                                |
| Single Git Connector for all         | ✅      | ✅      | Subject to Git provider rate limits in IDP 1.0.                                                                                                                                                                |
| Per-entity Git Connector             | ❌      | ✅      |                                                                                                                                                                                                                |
| Webhook based Git Sync               | ❌      | ✅      |                                                                                                                                                                                                                |
| PR-based YAML file updates           | ❌      | ✅      |                                                                                                                                                                                                                |
| Branch-aware Entity YAML             | ❌      | ✅      |                                                                                                                                                                                                                |
| 🔐 **Hierarchy & RBAC**              |         |         |                                                                                                                                                                                                                |
| Platform-level RBAC for Catalog      | ❌      | ✅      |                                                                                                                                                                                                                |
| Granular Permissions for Workflows   | ❌      | ✅      |                                                                                                                                                                                                                |
| Catalog Access Control Policies      | ✅      | ❌      | Deprecated. Use Harness RBAC to manage access in IDP 2.0.                                                                                                                                                      |
| 🧰 **Other Core Features & API**     |         |         |                                                                                                                                                                                                                |
| TechDocs (docs like code)            | ✅      | ✅      |                                                                                                                                                                                                                |
| Search (Catalog)                     | ✅      | ✅      |                                                                                                                                                                                                                |
| Search (TechDocs)                    | ✅      | ✅      |                                                                                                                                                                                                                |
| Global Search                        | ✅      | Planned | Since the existing Global Search is powered by Backstage, it will be redesigned to support scoped visibility and Harness platform hierarchy, enabling users to consistently search across all IDP information. |
| Entity CRUD APIs                     | ❌      | ✅      | Entities can be created, updated, and deleted using Harness APIs.                                                                                                                                              |
| Catalog Ingestion APIs               | ✅      | ✅      |                                                                                                                                                                                                                |
| Terraform Provider                   | ❌      | Planned |                                                                                                                                                                                                                |
