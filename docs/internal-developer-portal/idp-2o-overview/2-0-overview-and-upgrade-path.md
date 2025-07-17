---
title: Harness IDP 2.0 Overview
description: Comprehensive overview guide to Harness IDP 2.0.
sidebar_position: 1
sidebar_label: IDP 2.0 Overview
redirect_from: docs/internal-developer-portal/2-0-overview-and-upgrade-path
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip Status of IDP 2.0 related features
IDP 2.0 is an ongoing project under active iteration. Here is the most recent status on all the features which have been released as well as the features planned to be released in near future.

| Feature                                                                                               | Status                |
| ----------------------------------------------------------------------------------------------------- | --------------------- |
| [**RBAC and Project/Org Hierarchy**](/docs/internal-developer-portal/rbac/scopes)                     | ✅ (Ready to onboard) |
| [**Git Experience (YAML files in Git)**](/docs/internal-developer-portal/git-experience/gitx-journey) | ✅ (Ready to onboard) |
| **New System Entity for grouping**                                                                    | ⏳ ETA July 31, 2025  |
| **Project/Org filters in Scorecards**                                                                 | ⏳ ETA July 31, 2025  |
| **Custom User Groups**                                                                               | ⏳ ETA Pending       |

:::

## Summary

**Harness IDP 2.0 is a major evolution of the Internal Developer Portal with a Harness-native data model designed for enterprise scale and access control**. Here’s what’s new and important:

- **Harness-native Platform Hierarchy**: Catalog entities and Workflows now support **Account, Org, and Project scopes**, with built-in granular RBAC.
- **Native Git Experience**: Bi-directional Git sync of entity YAML files with real-time updates and support for Git branches.
- **Easier automation without YAML file**: Entities can now be created and modified inline without having to deal with the YAML file git operations and its complexities.
- **New Catalog & Workflow UI**: Newer UX, brand new Catalog table with filters and built-in entity creation UX.
- **Backstage Plugin Support**: Continue using existing plugins without any changes.
- **Automatic Upgrade**: IDP 2.0 can be enabled via a feature flag. Your existing entities will be automatically upgraded to the new model.
- **Default Upgrade Behavior**: Entities will initially live at the **Account scope**. You can later organize them into Org/Project scopes as needed.
- **Breaking Changes**: The **Catalog APIs** and **entity YAML definitions** have changed. If you’ve built automations or integrations, please review the [breaking changes](#breaking-changes).

<DocVideo src="https://www.youtube.com/watch?v=9Rj-jJp3Ehc" />

## Addressing Key Challenges (Why IDP 2.0)

While IDP 1.0 was a strong foundation built on Backstage, we encountered several platform and user experience challenges at scale. IDP 2.0 addresses these core limitations:

- **No Granular RBAC**: It was not possible to restrict who could view or edit specific Catalog entities or Workflows. IDP 2.0 introduces scope-aware permissions aligned with Harness Projects, Organizations and Account.

- **No Controlled Workflow Rollout**: There was no way to gradually test and release IDP Workflows without impacting everyone in the organization. IDP 2.0 supports staged rollouts — start in your project and expand scope to Organization and Account as the Workflow matures.

- **Manual YAML Management**: Users were required to manage Catalog YAML files for every update. This made adoption harder, especially for entities which required frequent updates such as infrastructure resources. IDP 2.0 supports "inline entities" and complete entity lifecycle using API and UI without necessarily having to do Git operations.

- **Single Git Connector with Rate Limits**: All entity updates went through one Git integration and updates had to be pulled, which quickly resulted in API rate limits for larger Catalogs. In 2.0, each entity can have its own Git connector, and updates happen in real time via webhooks.

- **Disconnected from Harness Hierarchy**: Backstage’s System and Domain hierarchy didn’t align with how our customers have structured their organization using Harness platform hierarchy. IDP 2.0 replaces this with native support for Harness Projects and Organizations. This also unlocks use-cases such as auto-create a Software Component using a Harness CD service or aggregate Scorecards at project or org level.

- **Outdated Catalog UX**: The previous Catalog UI was limited and not optimized for the needs of our current customers. IDP 2.0 ships with an improved UX purpose-built for Harness IDP users. It also comes with a built-in "Create entity" experience which makes onboarding a lot easier for end-users.

- **Bugs with Location Entities**: YAML Locations were dedicated entities in 1.0 which would often result in unexpected scenarios causing conflicts when refreshing Components.

## What's New in IDP 2.0 (Feature Highlights)

Harness IDP 2.0 brings foundational improvements across architecture, security, scalability, and user experience. Here’s a breakdown of the key capabilities:

### Platform Hierarchy & Granular RBAC

Entities can now be created explicitly at Account, Organization, or Project scope. By default, entities at the Account scope are accessible platform-wide, while Project-level entities are scoped to the teams that own them. This allows teams to manage their own components while sharing approved workflows across the org.

You can define custom roles with specific permissions for Catalog and Workflows (Create, Edit, Read, Delete, Execute), and organize them into reusable resource groups. These permissions align fully with the existing Harness RBAC framework.

Learn more about the [Harness platform hierarchy](https://developer.harness.io/docs/platform/get-started/key-concepts/#account).

### Native Harness Git Experience

IDP 2.0 introduces native Git support for all catalog entities, enabling real-time, bi-directional sync:

- Edit the entity YAML in Git, and the changes reflect in IDP.
- Modify the entity in IDP UI or API, and it updates Git (via direct push or a pull request using OAuth as well as API keys).
- Choose between an inline entity (no YAML file) or a remote entity (YAML lives in your Git provider) depending on your preference.
- Updates are instant via webhooks—no more periodic polling.
- Supports multiple branches and version history for audit and rollback.

This eliminates previous rate-limit issues and improves developer productivity. Learn more about the [Harness Git Experience](https://developer.harness.io/docs/platform/git-experience/git-experience-overview/).

### UI-Driven Catalog Entity Creation

Users can now create and manage entities directly from the UI—no YAML expertise required:

- Guided, form-based creation of Components, APIs, Resources, and Workflows.
- Live sync between YAML and visual view for transparency.
- Default values and dropdowns help standardize entity creation across teams.

This makes it easier for any developer to onboard into the portal without learning Backstage-specific YAML conventions.

### Improved Scalability & UX

The new Catalog and Workflow experience has been rebuilt for clarity, speed, and customization:

- Scope-based filters allow users to narrow down to their team’s view.
- Catalog table supports search, sorting and pagination.
- Scorecards are now natively integrated into the Catalog view.
- Entity pages show scope, ownership, and references cleanly in the header.

These improvements reduce friction for everyday tasks and improve visibility for platform teams.

### Enhanced Workflow Management

The lifecycle of IDP Self Service Workflows can now easily be managed:

- Can be created and managed at Project, Org, or Account level.
- Governed by RBAC with explicit Execute permission.
- Can easily be promoted from dev-only (project) to org-wide (Org or Account) usage as they mature.

This supports safer rollout of IDP automation across environments and teams.

## Breaking Changes in IDP 2.0

### API Changes (Backstage Catalog APIs → Harness Catalog APIs)

All Catalog and Workflow APIs are now delivered directly through Harness Platform APIs, ensuring responses properly incorporate Role-Based Access Control (RBAC) and entity scope considerations. The Backstage native APIs, including entity registration and refresh functionality, are no longer available in version 2.0.

- Complete create/read/update/delete operations are accessible via Harness APIs
- New endpoints provide scope-aware operations aligned with Harness RBAC
- Any automation or custom processes utilizing Backstage-related APIs will require updates to implement the newer CRUD APIs
- Catalog Ingestion APIs remain functional as before, though RBAC will now be enforced on updated entities

We will provide detailed documentation on the newer API docs and provide sample scripts using the newer Catalog APIs.

### Single Entity per YAML File

In IDP 1.0, it was possible to define multiple entities in a single YAML file using the `---` separator. For example:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: serviceA
---
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: serviceB
```

This approach is no longer supported in IDP 2.0. To align with the Harness platform standards and Git Experience (GitX) model, each YAML file must now define **only one entity**, basically every IDP entity can only be defined with a single YAML file.


This change ensures better alignment with GitX workflows and simplifies entity lifecycle management.

> NOTE: This update also impacts the Git Experience documentation and onboarding flows. Ensure each service or entity has its own entity YAML file. Ensure your `identifier` follows [naming rules](https://developer.harness.io/docs/platform/references/entity-identifier-reference/#identifier-naming-rules). Invalid identifiers may lead to entity registration errors.

:::note 
Identifiers must use only letters, numbers, and underscores. Hyphens and special characters aren’t allowed. 

:::


### Entity YAML Definition

IDP 2.0 implements a Harness-native entity schema featuring targeted adjustments to previous Backstage-style YAML configurations. These changes primarily introduce scope concepts (project, organization, or account) while enhancing readability based on user feedback.

:::info Note
With the IDP Git experience feature, one entity can have only one YAML file. Unlike IDP 1.0, storing multiple entities within a single YAML is no longer supported in IDP 2.0. This design choice is _in line_ with the rest of the Harness platform, which emphasizes clarity and consistency through single-entity YAML definitions. To understand more about this and other key differences, see the [breaking changes in IDP 2.0](https://developer.harness.io/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path#breaking-changes-in-idp-20).
:::


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
identifier: artist_service
name: Artist Service
kind: Component
type: service
projectIdentifier: public_websites
orgIdentifier: default
owner: group:artist_relations_team
metadata:
  description: Artist microservice for artist data and relations
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

### System and Domain Entities Removed (new System coming soon)

`System` and `Domain` entities have been removed. These often duplicated Harness Project and Organization structures, respectively.

We are working on introducing the System entity in IDP 2.0 as well.

Meanwhile, to group entities within a project, you may create a Component with `type: system` (or another suitable type) and use `spec.subComponentOf` in child components to establish relationships in the Catalog. Ensure the Sub Components card is available in the "Dependencies" or "Overview" tab to visualize these relationships.

<!-- (TODO: Provide Layout YAML for customers who might have removed it) -->

### Register/Catalog-Import → Redirects to UI Flow

The Catalog Import page at `/catalog-import` is deprecated as entities must now be created using the new data model. Users will be guided through an intuitive "Create Entity" workflow in the UI, eliminating the need to write raw YAML before registering entities.

You should remove this page from your sidebar by using the "Layout & Appearance" page inside "IDP Configure" view.

### Old Catalog Access Control page is deprecated

The IDP 1.0 "Access Control" page within the IDP Configure view has been removed. Please use Harness Platform RBAC instead. Administrators can assign permissions to users/groups via roles scoped to Account/Organization/Project, or create custom roles with specific permissions.

### Pipeline Step: Create Catalog and Register Catalog steps

The "Create Catalog" and "Register Catalog" steps previously used in IDP pipelines have been deprecated. These relied on creating a YAML file, committing and pushing it to Git, then using the URL to register it in IDP Catalog.

You can now directly use Harness IDP Catalog APIs to register new entities using YAML definitions without Git operations. A dedicated step for this functionality will be available soon.

### Custom User Groups and Custom Metadata

In IDP 1.0, it was possible to create custom User Groups directly in the IDP Catalog without creating them as Harness User Groups. However, currently in IDP 2.0, this feature is not available - which means the only way to create User Groups is by creating them directly as Harness User Groups at the account level.

However, we are currently working on introducing the concept of creating custom user groups, creating nested groups under groups and ingesting custom metadata on them as well.

## Feature Compatibility Matrix (1.0 vs 2.0)

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
| Custom User Groups                   | ✅      | Planned |                                                                                                                                                                                                                |

## Timeline

- IDP 2.0 will be Generally Available by end of Q2 (July 2025)
- All IDP 1.0 APIs are removed by end of Q3 (October 2025)
- All customers will be moved over to IDP 2.0 by end of October 2025.
