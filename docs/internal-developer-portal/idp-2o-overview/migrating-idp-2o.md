---
title: Upgrading to IDP 2.0
description: Comprehensive guide to Harness IDP 2.0 — explore the new Harness-native data model, platform RBAC, Git Experience, and improved UX for internal developer portals. Includes migration strategy, feature compatibility, and rollout details for upgrading from IDP 1.0.
sidebar_position: 3
sidebar_label: Upgrading to IDP 2.0
---
If you’re using Harness IDP 1.0, this guide will walk you through everything you need to know before upgrading to IDP 2.0—what’s new, what to watch out for, and how to make the switch smoothly without disrupting your current setup.

### flowchart with the 6 phase migration process

## Before You Upgrade (Checklist)

Before initiating your upgrade to IDP 2.0, ensure that you carefully go through the following checklist. This will help you understand the major changes and plan a smooth migration.

1. **Review Breaking Changes**: 
   Begin by thoroughly reviewing the [Breaking Changes](#breaking-changes) guide. IDP 2.0 introduces some major changes that differ significantly from the IDP 1.0 setup.

2. **Assess Impacted Areas**:
   After reviewing the breaking changes, evaluate how these changes impact your current IDP 1.0 setup. For example, Harness IDP 2.0 introduces a Harness-native Data Model and removes certain entities like **System** and **Domain**, which may affect your existing structure if not reviewed properly.

3. **Use a Test Account First**: 
   If you're not ready to upgrade in your production environment immediately, we strongly recommend exploring IDP 2.0 features in a dedicated test account. This provides a safe environment to try these new features and understand the changes in detail. If you don’t have a test account, reach out to [Harness Support](https://support.harness.io).

4. **Understand Key Use-Cases**:
   Identify the core use-cases where IDP 2.0 could provide the most value to your existing IDP setup. Start with these prioritized areas during implementation. Gradual adoption helps your teams get familiar with the new workflows while minimizing disruption.

## Upgrade Path & Rollout Strategy

To help ensure a seamless transition from IDP 1.0 to 2.0, follow the structured six-phase upgrade process outlined below. Before you begin, make sure you’ve completed the prerequisite checklist above.

### Phase 1: Prepare & Assess

* **Review all breaking changes** introduced in IDP 2.0, including structural changes to the Catalog, platform-level Role-Based Access Control (RBAC), and enhanced Git Experience.
* **Evaluate and your current setup** and assess how IDP 2.0 impacts it. Identify all features, entities, and workflows that may be affected.

  * For instance, if your existing setup uses **System** and **Domain** entities, note that these are deprecated in IDP 2.0. Their functionality is now covered by Harness Projects and Organizations.

### Phase 2: Check Feature Compatibility with IDP 1.0

In addition to new capabilities, it’s important to understand which features from IDP 1.0 remain supported, have changed, or are no longer available. Refer to the matrix below to compare features across versions.

#### Feature Compatibility Matrix (1.0 vs 2.0)

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
| Terraform Provider                   | ❌       | Planned |                                                              |

### Phase 3: Enable Feature Flag

* Contact Harness Support to enable the `IDP_2_0` feature flag on your account.
* If you have a test or staging environment, enable the feature there first to explore and verify the upgrade safely.

### Phase 4: Upgrade

* Once the feature flag is enabled, your existing entities will automatically migrate to the new Harness-native data model at the **Account** level.
* To reorganize entities under a different scope (e.g., Project or Org), you will need to:

  * Delete the entity from the Account scope
  * Re-create it under the desired scope
* The same applies to workflows not yet ready for global use.
* Update any automation scripts or tools that depend on IDP APIs or YAML definitions to reflect the new model.
* (Optional) Use migration tooling to adopt the enhanced Git Experience and commit YAML files directly into Git repositories.

### Phase 5: Test and Validate

* Validate UI behavior: create, update, and delete entities using the new UI experience.
* Test platform-level RBAC to ensure permissions are properly enforced.
* Verify the new Git Experience features, including webhook-based syncing and branching workflows.
* Confirm workflow behavior across different scopes (Account, Org, Project).

### Phase 6: Gradual Rollout

* Begin rolling out the upgraded platform to selected teams or use-cases.
* Monitor for issues or regressions, and collect feedback from early users.
* IDP 1.0 fallback is supported during the migration window, so you can switch back temporarily if needed while completing validation.


## Unlock These Features with the IDP 2.0 Upgrade

By upgrading to IDP 2.0, you gain access to:

* A new Harness-native Data Model
* Granular platform-level RBAC and improved security
* Rich Git Experience with branch-aware syncing and inline YAML
* UI-based workflows and catalog entity management
* Scorecards with Catalog integration
* Enhanced search experience (in progress)
* Entity CRUD APIs and future Terraform support


<!-- ## FAQs -->

<!-- ## Resources

WIP

- API Docs
- Videos
- Learn the impact of IDP 2.0 on the future of harness IDP (Marketing blog)
- Entity Schema JSON -->