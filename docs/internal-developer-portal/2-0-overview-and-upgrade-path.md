---
title: Harness IDP 2.0 Overview & Upgrade Handbook
description: Comprehensive guide to Harness IDP 2.0 — explore the new Harness-native data model, platform RBAC, Git Experience, and improved UX for internal developer portals. Includes migration strategy, feature compatibility, and rollout details for upgrading from IDP 1.0.
sidebar_position: 4
sidebar_label: IDP 2.0 Overview & Upgrade Handbook
---

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

WIP (each should be a section)

Talk about YAML difference. However, we provide conversion.

Talk about API Usage. No more Backstage APIs. All APIs on Harness.

Entity references - default now becomes account, or account.orgId, or account.orgId.projectId

Talk about the usage of hidden tag. IDP 1.0 used "hidden" tags for access control. In IDP 2.0, these are removed. Customers must now use standard Harness RBAC controls (resource groups and permissions) to manage entity access, ensuring consistency and granularity.

Talk about existing YAMLs being irrelevant.

System/Domain - Replaced by Project/Org. Talk about Component and subComponentOf as an alternative. Say generic Grouping will come soon.

DevTools: Removed from the sidebar, deemed unhelpful for customers.
Register /catalog-import: Redirects to the new UI-driven entity creation page.
Catalog Access Policy: Permission eliminated as it’s no longer needed. Access Control Page: Removed from IDP Admin; use Harness Platform RBAC instead.

IDP Stage Steps in the Pipeline (Create and Register Catalog)

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
- Learn the impact of IDP 2.0 on the future of Harness IDP (Marketing blog)
- Entity Schema JSON
