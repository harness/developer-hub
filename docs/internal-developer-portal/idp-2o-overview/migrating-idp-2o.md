---
title: Upgrading to IDP 2.0
description: Comprehensive guide to Harness IDP 2.0 — explore the new Harness-native data model, platform RBAC, Git Experience, and improved UX for internal developer portals. Includes migration strategy, feature compatibility, and rollout details for upgrading from IDP 1.0.
sidebar_position: 3
sidebar_label: Upgrading to IDP 2.0
---
If you’re using Harness IDP 1.0, this guide will walk you through everything you need to know before upgrading to IDP 2.0—what’s new, what to watch out for, and how to make the switch smoothly without disrupting your current setup.

![](./static/upgrade-2o.png)

## Before You Upgrade (Checklist)

Before upgrading to **IDP 2.0**, carefully review the checklist below to understand key changes and ensure a smooth and well-planned migration.

1. **Review Breaking Changes**
   Begin by thoroughly reviewing the [Breaking Changes](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path.md#breaking-changes-in-idp-20) guide. IDP 2.0 introduces several major updates that significantly differ from the IDP 1.0 architecture and workflows.

2. **Assess Impacted Areas**
   Evaluate how these changes affect your current setup. For example, IDP 2.0 introduces a new Harness-native Data Model and removes entities like **System** and **Domain**.

3. **Use a Test Account**
   Test IDP 2.0 in a dedicated account before upgrading in your production environment. If you need access, contact [Harness Support](https://support.harness.io).

4. **Focus on Key Use Cases**
   Identify core use cases where IDP 2.0 adds the most value and start implementation there. A gradual rollout ensures smoother adoption.

5. **Talk to the Harness IDP Team for Specific Use Cases**: We’re excited to launch IDP 2.0 and want to make your transition as smooth as possible. If you have specific use cases or want to better understand how IDP 2.0 can support your team, feel free to reach out to the Harness IDP team [here].

## Upgrade Path & Rollout Strategy

To help ensure a seamless transition from IDP 1.0 to 2.0, follow the structured six-phase upgrade process outlined below. Before you begin, make sure you’ve completed the prerequisite checklist above.

We’re excited to launch IDP 2.0 and want to make your transition as smooth as possible. If you want to **prepare and start assessing IDP 2.0** for your needs, please feel free to **schedule a call** with the **Harness IDP team**. Reach out to us here. 

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

* Harness-native Platform Hierarchy
* Granular platform-level RBAC
* Bi-direction Git sync of entity YAML files
* Easier automation without manual YAML operations
* New Catalog & Workflow UI
* and many more exciting features. 

To learn more about the New Features, go to [What's New in IDP 2.0? (Feature Highlights)](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path.md#whats-new-in-idp-20-feature-highlights)

## Timeline
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