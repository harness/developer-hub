---
title: Harness IDP 2.0 Overview & Upgrade Handbook
description: Comprehensive guide to Harness IDP 2.0 — explore the new Harness-native data model, platform RBAC, Git Experience, and improved UX for internal developer portals. Includes migration strategy, feature compatibility, and rollout details for upgrading from IDP 1.0.
sidebar_position: 4
sidebar_label: IDP 2.0 Overview & Upgrade Handbook
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Status: Work in Progress 🚧

IDP 2.0 is launching soon! We're preparing to open early access **end of April 2025**. If you're interested in getting early access and shaping the future of Harness IDP, reach out at [idp-interest@harness.io](mailto:idp-interest@harness.io) or contact your Technical Program Manager. We will notify you as soon as IDP 2.0 is available!
:::

## Summary

Harness IDP 2.0 is a major evolution of the Internal Developer Portal with a Harness-native data model designed for enterprise scale and access control. Here’s what’s new and important:

- **Harness-native Platform Hierarchy**: Catalog entities and Workflows now support **Account, Org, and Project scopes**, with built-in granular RBAC.
- **Native Git Experience**: Bi-directional Git sync of entity YAML files with real-time updates and support for Git branches.
- **New Catalog & Workflow UI**: YAML is now optional — create and manage entities visually.
- **Backstage Plugin Compatibility**: Continue using existing plugins without modification.
- **Easier automation without YAML file**: Entities can now be created and modified inline without having to deal with the YAML file git operations and its complexities.
- **Feature Flag Rollout**: IDP 2.0 can be enabled via a feature flag. Your existing entities will be automatically upgraded to the new model.
- **Default Migration Behavior**: Entities will initially live at the **Account scope**. You can later organize them into Org/Project scopes as needed.
- **Breaking Changes**: The **Catalog APIs** and **entity YAML definitions** have changed. If you’ve built automations or integrations, please review the [breaking changes](#link-TODO).

📬 **IDP 2.0 will be available in beta by late April.** Contact your Harness team or email [idp-interest@harness.io](mailto:idp-interest@harness.io) to request early access.

## Addressing Key Challenges (Why IDP 2.0)

While IDP 1.0 was a strong foundation built on Backstage, we encountered several platform and user experience challenges at scale. IDP 2.0 addresses these core limitations:

- **No Granular RBAC**: It was not possible to restrict who could view or edit specific Catalog entities or Workflows. IDP 2.0 introduces scope-aware permissions aligned with Harness Projects, Organizations and Account.

- **No Controlled Workflow Rollout**: There was no way to gradually test and release IDP Workflows without impacting everyone in the organization. IDP 2.0 supports staged rollouts — start in your project and expand scope to Organization and Account as the Workflow matures.

- **Manual YAML Management**: Users were required to manage Catalog YAML files for every update. This made adoption harder, especially for entities which required frequent updates such as infrastructure resources. IDP 2.0 supports "inline entities" and complete entity lifecycle using API and UI without necessarily having to do Git operations.

- **Single Git Connector with Rate Limits**: All entity updates went through one Git integration and updates had to be pulled, which quickly resulted in API rate limits for larger Catalogs. In 2.0, each entity can have its own Git connector, and updates happen in real time via webhooks.

- **Disconnected from Harness Hierarchy**: Backstage’s System and Domain hierarchy didn’t align with how our customers have structured their organization using Harness platform hierarchy. IDP 2.0 replaces this with native support for Harness Projects and Organizations. This also unlocks use-cases such as auto-create a Software Component using a Harness CD service or aggregate Scorecards at project or org level.

- **Outdated Catalog UX**: The previous Catalog UI was limited and not optimized for the needs of our current customers. IDP 2.0 ships with an improved UX purpose-built for Harness IDP users. It also comes with a built-in "Create entity" experience which makes onboarding a lot easier for end-users.

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

| Feature                              | IDP 1.0 | IDP 2.0 | Notes                                                                             |
| ------------------------------------ | ------- | ------- | --------------------------------------------------------------------------------- |
| 📁 **Catalog**                       |         |         |                                                                                   |
| Catalog Entity YAMLs                 | ✅      | ✅      | YAML structure has changed in IDP 2.0. See Breaking Changes.                      |
| UI-based Entity Creation             | ❌      | ✅      |                                                                                   |
| Edit Entities via UI                 | ❌      | ✅      |                                                                                   |
| Backstage Plugins Support            | ✅      | ✅      | Existing Backstage plugins are fully supported via annotations.                   |
| Custom Plugins                       | ✅      | ✅      |                                                                                   |
| Customizable Entity Page UI          | ✅      | ✅      |                                                                                   |
| Scorecards view in Catalog table     | ❌      | ✅      |                                                                                   |
| Scope Filters in Catalog             | ❌      | ✅      |                                                                                   |
| System/Domain Hierarchy              | ✅      | ❌      | Replaced by Project/Org hierarchy. See Breaking Changes for details.              |
| Ownership, tags, links, labels, etc. | ✅      | ✅      |                                                                                   |
| Setting Ownership via UI             | ❌      | ✅      | Ownership can be assigned using selectable users and groups in the UI.            |
| ⚙️ **Workflows**                     |         |         |                                                                                   |
| Workflow YAMLs                       | ✅      | ✅      |                                                                                   |
| Workflow Groups                      | ✅      | ✅      |                                                                                   |
| Workflow Execute Permission          | ❌      | ✅      |                                                                                   |
| Workflow Scope (Account/Org/Project) | ❌      | ✅      |                                                                                   |
| Workflow Groups Scope                | ❌      | ✅      |                                                                                   |
| Gradual Workflow Rollout             | ❌      | ✅      |                                                                                   |
| UI-based Workflow Creation           | ❌      | ✅      |                                                                                   |
| 📊 **Scorecards**                    |         |         |                                                                                   |
| Scorecards in Catalog View           | ❌      | ✅      |                                                                                   |
| Project/Org filters in Scorecards    | ❌      | ✅      | Scorecards can be applied to entities based on their scopes.                      |
| Scorecards scoped to Project/Org     | ❌      | Planned | Scorecards can be created directly at the Project or Org scope.                   |
| 🔄 **Git Experience**                |         |         |                                                                                   |
| YAMLs in Git                         | ✅      | ✅      |                                                                                   |
| Inline Entities (no Git)             | ❌      | ✅      |                                                                                   |
| Single Git Connector for all         | ✅      | ✅      | Subject to Git provider rate limits in IDP 1.0.                                   |
| Per-entity Git Connector             | ❌      | ✅      |                                                                                   |
| Webhook based Git Sync               | ❌      | ✅      |                                                                                   |
| PR-based Updates                     | ❌      | ✅      |                                                                                   |
| Branch-aware Entity Sync             | ❌      | ✅      |                                                                                   |
| 🔐 **Hierarchy & RBAC**              |         |         |                                                                                   |
| Platform-level RBAC for Catalog      | ❌      | ✅      |                                                                                   |
| Granular Permissions for Workflows   | ❌      | ✅      |                                                                                   |
| Catalog Access Control Policies      | ✅      | ❌      | Deprecated. Use Harness RBAC to manage access in IDP 2.0.                         |
| 🧰 **Other Core Features & API**     |         |         |                                                                                   |
| TechDocs (docs like code)            | ✅      | ✅      |                                                                                   |
| Search (Catalog)                     | ✅      | ✅      |                                                                                   |
| Search (TechDocs)                    | ✅      | Planned | TechDocs search will be redesigned to support scoped visibility and Harness RBAC. |
| Search (External e.g. Confluence)    | ❌      | ❌      |                                                                                   |
| Entity CRUD APIs                     | ❌      | ✅      | Entities can be created, updated, and deleted using Harness APIs.                 |
| Catalog Ingestion APIs               | ✅      | ✅      |                                                                                   |
| Terraform Provider                   | ❌      | Planned |                                                                                   |

## Breaking Changes

IDP 2.0 introduces foundational shifts in architecture, APIs, and entity definitions. These changes improve scalability, usability, and consistency but may require migration effort. Below are the major breaking changes you should be aware of:

### 🔌 API Changes (Backstage Catalog APIs → Harness Catalog APIs)

All Catalog and Workflow APIs are now served directly via Harness Platform APIs.
This ensures that the responses take RBAC and entity scope in consideration.
The Backstage native APIs, particularly register a location or refresh an entity are no longer available in 2.0.

- All create/read/update/delete operations are available via Harness APIs. [TODO: link to Harness IDP API Docs (coming soon)]
- New endpoints support scope-aware operations and align with Harness RBAC.
- If you’ve written automations or custom steps using Backstage-related APIs, they need to be updated with the newer CRUD APIs.
- Note that Catalog Ingestion APIs will continue to work as it is since these were already Harness APIs. However, the RBAC will now be enforced on the entities being updated.

Question for team: What's the equivalent API(s) of - I have a YAML file in Git, and now I want to create an entity using it?

### 📄 YAML Structure & Conversion

IDP 2.0 introduces a new Harness-native entity schema with small adjustments to the old Backstage-style YAMLs. This is primarily to introduce the concept of scope (project, org or account) in the YAML but to also improve readability based on user feedbacks.
Note that we have exposed an API which you can use to easily convert a Backstage catalog YAML into a Harness catalog YAML. This also works in the UI, if you paste a Backstage Catalog YAML, it will automatically be converted into Harness Catalog YAML for you.
The JSON Schema of all the Catalog entities are also available via our API. (TODO: Link to API or GitHub Repository)

Note that we will automatically convert the YAML definition of all existing Catalog entities and Workflows as you switch to IDP 2.0. We will additionally provide a tool to commit those into their corresponding YAML files in Git via the new Git Experience.

**⨁ New fields**

- orgIdentifier (optional)
- projectIdentifier (optional)

Both of these field help us define the scope of the entity. If a entity resides at a project scope, both of these will be available. If it's at a org scope, only orgIdentifier will be available. If it's at the Account level, the scope will be assumed to the account.

**♻️ Updated fields**

- `metadata.name` becomes `identifier`
  - To align with Harness Entity YAML definitions and consistent UX. Moving it to the root level as the field is critical to the entity.
- `metadata.title` becomes `name`
  - To align with Harness Entity YAML definitions and consistent UX. Moving it to the root level as the field is critical to the entity.
- `spec.type` becomes `type`
  - Moving it to the root level as the field is critical to the entity definition. kind and type are a pair of fields which define the entity behavior and should always be written one after the other.
- `spec.owner` becomes `owner`
  - Moving it to the root level as the field is critical to the entity definition. IDP Catalog helps solve the ownership challenge and the owner fields deserves to be at the root level.

**⊖ Fields we are removing**

- `metadata.namespace`
  - namespace is Backstage’s way of addressing scoping, usually is `default`. As we are introducing Harness Platform Hierarchy, we do not need to keep namespace in the new YAML. Scope can be determined using `projectIdentifier` and `orgIdentifier`.
- `spec.system` and `spec.domain`
  - Systems and Domains in Backstage Catalog data model have helped organize components as part of one system. Since entities will live under Harness projects and organizations, they will be used as a replacement of System and Domain respectively. See below for more details on Systems and Domains.

** No changes**

- `metadata` continues to be flexible. You can define your own properties within metadata.
- `annotations`, `description`, `tags`, `links`, `labels` etc. continue to be part of metadata.

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

### 🧭 Entity Scope & Reference Changes

Entity references are mostly the same except that the `namespace` is going to the Harness scope identifier.

`[kind]:[namespace]/identifier` becomes `[kind]:[scope]/identifier`.

The scope can be one of the following

- `account`
- `account.orgId` (for entities scoped at an Organization level)
- `account.orgId.projectId` (for entities scoped at a Project level)

This applies to relationships such as `dependsOn`, `subComponentOf`, `providesApis`, entity references in Catalog Ingestion APIs or anywhere entity references used in the YAML.

### 🔒 Hidden Tags Removed (Use RBAC Instead)

In IDP 1.0, you could use the `"hidden"` or `"private"` tag to ensure only the users part of the user group assigned as "owner" or the entitiy can view it. This is now deprecated in order to respect Harness RBAC.
You should now create entities at the right scope (Project, Org, Account) and add the right set of roles, users and user groups to these scopes with the permissions required to view these entities.
For example, if you only want one team to view a set of Components, create it at a Project scope and only add that particular team as Project Viewers.

### 📁 Deprecated YAMLs

Existing Backstage YAML files will no longer be valid in IDP 2.0. The structure have been modified as mentioned above.
For existing entities, use Harness Git Experience APIs to create the corresponding YAML files in a new repository. For newer entities, user will get a choice
to use inline or remote during entity creation.

### 🗂 System/Domain Hierarchy Removed

`System` and `Domain` entities are no longer available. Most of you had to create a duplicate System entity which corresponded to a Harness Project. Similarly, Domain was a duplicate of Harness Organization.

If you still feel the need to group entities within a project, you can create a new Component of a `type: system` (can be anything) and use `spec.subComponentOf` in the child components. This will create the relationships in Catalog.
Ensure you have the SubComponents card available in the "Dependencies" tab or the "Overview" tab to visualize this. (TODO: Provide Layout YAML for customers who might have removed it)

### ➕ Register/Catalog-Import → Redirects to UI Flow

The Catalog Import page at `/catalog-import` is now deprecated since entities have to be created using the newer data model. Users are guided through a visual "Create Entity" workflow in the UI. This removes the need to write raw YAML first and then register new entities.

### ❌ Old Catalog Access Control page is deprecated

IDP 1.0 allowed some basic access control policies using the "Access Control" page inside IDP Configure view. This is now removed. Use Harness Platform RBAC instead. Admins can assign permissions to users/groups via roles, scoped to Account/Org/Project or create custom roles with these permissions.

### 🔧 Pipeline Step: IDP Create Catalog and Register Catalog steps

The “Create Catalog” and “Register Catalog” steps used in IDP pipelines have been deprecated. It relied heavily on the concept of creating a YAML file, committing and pushing it to Git, and then using the URL to register it into IDP Catalog.

You can now directly use Harness IDP Catalog APIs to register the new entity using the YAML definition. No Git operations is required. We will soon be shipping an out of the box step for this to be possible.

## Before You Upgrade (Checklist)

WIP

## Upgrade Path & Rollout Strategy

WIP

- Prepare
- Review the IDP 2.0 Overview and Upgrade Path document.
- Train your team on Harness RBAC and hierarchical scoping.
- Enable Feature Flag
- Contact Harness Support to enable the IDP_2_0 feature flag for your account.
- Test IDP 2.0 features in a controlled environment.
- Migrate Entities
- Convert Backstage-native entities to Harness-native format manually or with Harness-assisted support.
- Use migration tools to update YAML definitions and validate them in the new model.
- Test and Validate
- Create, edit, and delete entities via the UI and verify functionality.
- Confirm RBAC settings and Git Experience features (e.g., webhook updates, branching).
- Test workflows at different scopes (Account, Org, Project).
- Roll Out Gradually
- Introduce IDP 2.0 features to your team incrementally.
- Monitor for issues and gather feedback.
- Use the rollback option to revert to IDP 1.0 if needed (supported and safe during migration).
- Complete Migration
- Fully transition all entities and workflows to IDP 2.0.
- Update automation/scripts to leverage new APIs and the Harness-native model.
- Critical Note: Reverting to IDP 1.0 is fully supported and safe during the migration period, ensuring flexibility and confidence.

## Timeline

- IDP 2.0 beta by end of April 2025.
- IDP 2.0 will be Generally Available by end of Q2 (July 2025)
- All customers will be moved over to IDP 2.0 by August 2025.

## FAQs

WIP

1. **What happens to my Backstage plugins?**

- IDP 2.0 supports all existing Backstage plugins.
- Harness-native model does not break compatibility.

2. **What about Custom Plugins?**

- Custom plugins can be migrated and integrated into IDP 2.0.
- We’ll provide a migration guide for plugin authors.

3. **How will the feature flag upgrade process work?**

- Once enabled, users can migrate to IDP 2.0 at their own pace.
- Legacy mode will remain available until full adoption.

## Resources

WIP

- API Docs
- Videos
- Learn the impact of IDP 2.0 on the future of harness IDP (Marketing blog)
- Entity Schema JSON

```

```
