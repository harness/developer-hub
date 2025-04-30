---
title: Harness IDP 2.0 Overview & Upgrade Handbook
description: Comprehensive guide to Harness IDP 2.0 — explore the new Harness-native data model, platform RBAC, Git Experience, and improved UX for internal developer portals. Includes migration strategy, feature compatibility, and rollout details for upgrading from IDP 1.0.
sidebar_position: 4
sidebar_label: IDP 2.0 Overview & Upgrade Handbook
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Status: Work in Progress 🚧

IDP 2.0 is launching soon! We will open early access tentatively in the **week of May 12th**. If you're interested in getting early access and shaping the future of Harness IDP, reach out at [idp-interest@harness.io](mailto:idp-interest@harness.io) or contact your Technical Program Manager. We will notify you as soon as IDP 2.0 is available to onboard!
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

📬 **IDP 2.0 will be available soon.** Contact your Harness team or email [idp-interest@harness.io](mailto:idp-interest@harness.io) to request early access.

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

## Breaking Changes

IDP 2.0 introduces fundamental architectural changes, API modifications, and entity definition updates. These enhancements significantly improve scalability, usability, and consistency, though they may necessitate migration efforts. Please review the following critical changes:

### API Changes (Backstage Catalog APIs → Harness Catalog APIs)

IDP 2.0 brings new Catalog and Workflow APIs which are part of Harness Platform APIs, ensuring responses properly incorporate Role-Based Access Control (RBAC) and entity scope considerations.

The [IDP 1.0 APIs](./api-refernces/public-api.md) for registering a new entity, refreshing and unregistering a location are now marked deprecated in IDP 2.0. However, they will continue to be available until August 2025 for customers to migrate. Note that the IDP 1.0 APIs will not support RBAC and can only work with entities at Account scope.

The new API Documentation will be published at [Harness API Docs](apidocs.harness.io) once IDP 2.0 is released on production.

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

## Before You Upgrade (Checklist)

Please review the breaking changes above and prepare for the upgrade. We will provide a detailed checklist here soon.

## Upgrade Path & Rollout Strategy

- Prepare
  - Review the IDP 2.0 Overview and Upgrade Handbook document.
  - Review the Breaking Changes and assess how it impacts your setup.
- Enable Feature Flag
  - Contact Harness Support to enable the `IDP_2_0` feature flag for your account.
  - If you have a separate dedicated Harness account for testing, enable IDP 2.0 in that environment first.
- Upgrade
  - Entities will be automatically upgraded to the new data model and stored at Account level.
  - Move Workflows which are not ready to use from Account to a Project scope.
  - Update automation/scripts to leverage new APIs and the Harness-native model.
  - (Optional) Use our migration tools to enable the new Git Experience and store YAML definitions in Git.
- Test and Validate
  - Create, edit, and delete entities via the UI and verify functionality.
  - Confirm RBAC settings and Git Experience features (e.g., webhook updates, branching).
  - Test workflows at different scopes (Account, Org, Project).
- Roll Out Gradually
  - Monitor for issues and gather feedback.
  - Reverting to IDP 1.0 is fully supported and safe during the migration period, ensuring flexibility and confidence.

## Timeline

- IDP 2.0 beta by mid-May 2025.
- IDP 2.0 will be Generally Available by end of Q2 (July 2025)
- All IDP 1.0 APIs are removed by end of Q3 (October 2025)
- All customers will be moved over to IDP 2.0 by end of October 2025.

<!-- ## FAQs -->

<!-- ## Resources

WIP

- API Docs
- Videos
- Learn the impact of IDP 2.0 on the future of harness IDP (Marketing blog)
- Entity Schema JSON -->
