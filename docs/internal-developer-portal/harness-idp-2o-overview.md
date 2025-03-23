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

Harness IDP 2.0 is a reimagined version that moves all IDP catalog entities to a **Harness-native data model**, enabling:

✅ Platform hierarchy & granular RBAC

✅ Native Git experience

✅ UI-driven catalog entity creation

✅ Improved scalability & user experience

**Platform Hierarchy for Catalog and Workflows**

In **Harness IDP 1.0**, all catalog entities were Backstage-native entities following their hierarchical design (“System” and “Domain”).

In **Harness IDP 2.0**, we are moving Harness IDP Catalog Components and Workflows to live under Harness Platform Account, Organization, and Project scopes so that Platform Granular RBAC can be applied to them.

This means that now users can create catalog entities and workflows at the account, org, or project levels in Harness IDP. This lays the foundation for supporting granular RBAC for catalog and workflows.

**Support Granular RBAC for Catalog and Workflows**

In **Harness IDP 1.0**, there was limited support for RBAC.

In **Harness IDP 2.0**, with platform hierarchy support, Harness IDP now supports Granular RBAC for all catalog entities and workflows.

This enables users to:

✅ Create resource groups

✅ Manage access to resources

✅ Assign different permissions to different user groups/users

With granular RBAC, users can control what actions can be performed on catalog entities and workflows within Harness-native data models.

**Natively Support Git Experience in Catalog and Workflows**

In **Harness IDP 1.0**, users were **unable to update entities** directly in the product—it was only possible via YAML files in Git.

Additionally, entities were **refreshed periodically** (every 30 minutes) or had to be manually refreshed per entity.

In **Harness IDP 2.0**, we are introducing **native Git support** for all catalog entities, allowing **bi-directional updates**:

✅ Users can edit the YAML file in Git, and it will update the entity in IDP.

✅ Users can edit the entity in IDP, and it will commit changes to Git (via direct push or pull request).

✅ Instant updates via webhooks (no more waiting for periodic syncs).

✅ Support for multiple entity versions from different Git branches.

This eliminates rate-limit issues, ensures real-time updates, and provides seamless Git integration.

**UI-Driven Catalog Entity Creation**

In **Harness IDP 1.0**, users could only create catalog entities through YAML files, making it a hard dependency.

In **Harness IDP 2.0**, we’ve introduced catalog entity creation and updates via the Harness IDP UI.

This means:

✅ No YAML required—users can create and modify entities directly through the UI.

✅ Easier entity management, making IDP more user-friendly.

This removes the hard dependency on YAMLs and improves accessibility for all users.

**Harness-Native UX**

Since Harness IDP was built on Backstage, the catalog UI was structured around Backstage’s version.

Over time, users faced navigation issues such as:

❌ Unintuitive filtering

❌ Fixed, hard-coded columns

❌ Lack of horizontal space

In Harness IDP 2.0, we have revamped the Catalog UI to improve usability:

✅ Optimized scope-based filtering

✅ Better, more comprehensive entity views

✅ User-configurable columns

Users can now navigate the IDP Catalog with ease and see entities categorized at different scopes.

## Feature Compatibility Matrix (1.0 vs 2.0)

Compares features, their status, etc.

Table, with first column of features. second column IDP 1.0 status, third column IDP 2.0 status (supported, WIP or removed), fourth column notes.

## What's Going Away (Breaking Changes)

WIP

## Upgrade Path & Rollout Strategy

With the introduction of **IDP 2.0**, customers will have the opportunity to migrate from **IDP 1.0** (the existing version) to **IDP 2.0** (new platform). This migration will be **progressive** and **customer-friendly**, ensuring minimal disruption while enabling access to new features.

The migration plan consists of:

- Phased Rollout Strategy ensuring stability.
- Gradual Migration Approach allowing customers to transition at their own pace.
- Fallback Mechanism to handle any unforeseen issues.
- Comprehensive Support for seamless adoption.

IDP 2.0 accepts Backstage YAML as well, and there is an API to convert Backstage YAML to Harness YAML.

**Rollout Phases**

The rollout will be conducted in two phases, allowing for a controlled and feedback-driven release.

#### Phase 1: Feature Flag-Based Rollout for Early Adopters

- IDP 2.0 is deployed to production behind a feature flag.
- A limited set of early adopters/customers will have the flag enabled.
- Early adopters can test and provide feedback before a wider rollout.

**Key Considerations**

- Ensures stability by validating core functionalities.
- Allows monitoring for bugs, performance issues, or user concerns.
- Collects feedback for potential improvements before a full-scale release.

#### Phase 2: Gradual Rollout to all Customers

- After successful validation in Phase 1, IDP 2.0 will be gradually rolled out to all customers.
- Customers will be notified about the upgrade process.
- Support resources and migration tools will be provided.
- Migration from IDP 1.0 to IDP 2.0 will be available once IDP 2.0 is fully rolled out.

**Key Considerations**

- Ensures a stable transition without affecting ongoing workflows.
- Users will be provided with documentation, detailed guides and FAQs to facilitate migration.
- Customers can choose to migrate at their convenience before IDP 1.0 deprecation.

## Before You Upgrade (Checklist)

WIP

## Timeline

IDP 2.0 GA by end of Q2 (end of July). IDP 1.0 will be decomissioned.

#### Fallback / Rollback Plan

WIP

## FAQs

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

- API Docs
- Videos
- Learn the impact of IDP 2.0 on the future of Harness IDP (Marketing blog)
