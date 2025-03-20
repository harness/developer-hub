---
title: Harness IDP 2.0 Overview & Upgrade Handbook
description: A home for developers to create, manage, and explore software.
sidebar_position: 4
sidebar_label: Harness IDP 2.0 Overview & Upgrade Handbook
---

## Harness & Backstage: The Journey So Far
Harness is a strong advocate of Backstage, the leading open-source framework for building Internal Developer Portals (IDPs). Backstage’s thriving ecosystem of plugins and integrations makes it a powerful foundation. However, since **Backstage** is a **framework** rather than a canned solution, organizations often struggle with gaps in functionality and scalability.
To address these challenges, **Harness built the Internal Developer Portal (IDP) on top of Backstage**, ensuring customers stay on a recent version without forking. We’ve made Backstage easier and more powerful.

## Addressing Key Challenges (Why IDP 2.0)
While inspired by Backstage, our IDP faced several scalability and usability challenges. These gaps led us to build **Harness IDP 2.0**, a significant product evolution that introduces platform-native data models, granular controls, and a refined user experience.

### Challenges in IDP 1.0
1. **Lack of Granular Control in the Catalog**
    - No ability to share entities (Component, API, Resource, Template) with specific user groups.
    - Organizations need hierarchical control to ensure governance.

2. **Confusing System & Domain Concepts**
    - Backstage’s System and Domain entities do not align with Harness’s Project & Org structure.
    - No support for Granular RBAC (Role-Based Access Control) or entity uniqueness.

3. **Scaling in Siloed Organizations**
    - Different teams use different tools, making entity segregation essential.
    - Lack of multi-level visibility (account, project, org levels) hinders IDP adoption.

4. **No Support for Gradual Rollout of Workflows**
    - Users want to incrementally expose workflows: internal testing → team-wide → org-wide → company-wide.
    - IDP lacks hierarchical workflow management.

5. **Hard Dependency on YAMLs**
    - Backstage-native entities require Catalog Info YAML for registration.
    - This is cumbersome for large-scale use cases.

6. **Git Sync Rate Limit Issues**
    - Single Git integration causes rate limit issues as the catalog scales.
    - Every entity update relied on a centralized Git sync, causing delays as the number of catalog entities grew.

7. **UI Limitations in the Catalog**
    - Unintuitive navigation, fixed columns, and poor filtering make entity management difficult.

## Introducing Harness IDP 2.0
Harness IDP 2.0 is a reimagined version that moves all IDP catalog entities to a **Harness-native data model**, enabling:

 ✅ Platform hierarchy & granular RBAC

 ✅ Native Git experience

 ✅ UI-driven catalog entity creation

 ✅ Improved scalability & user experience

## Core Enhancements in IDP 2.0 

### Platform Hierarchy for Catalog and Workflows
In **Harness IDP 1.0**, all catalog entities were Backstage-native entities following their hierarchical design (“System” and “Domain”).

In **Harness IDP 2.0**, we are moving Harness IDP Catalog Components and Workflows to live under Harness Platform Account, Organization, and Project scopes so that Platform Granular RBAC can be applied to them.

This means that now users can create catalog entities and workflows at the account, org, or project levels in Harness IDP. This lays the foundation for supporting granular RBAC for catalog and workflows.

### Support Granular RBAC for Catalog and Workflows
In **Harness IDP 1.0**, there was limited support for RBAC.

In **Harness IDP 2.0**, with platform hierarchy support, Harness IDP now supports Granular RBAC for all catalog entities and workflows.

This enables users to:

 ✅ Create resource groups

 ✅ Manage access to resources

 ✅ Assign different permissions to different user groups/users

With granular RBAC, users can control what actions can be performed on catalog entities and workflows within Harness-native data models.

### Natively Support Git Experience in Catalog and Workflows
In **Harness IDP 1.0**, users were **unable to update entities** directly in the product—it was only possible via YAML files in Git.

Additionally, entities were **refreshed periodically** (every 30 minutes) or had to be manually refreshed per entity.

In **Harness IDP 2.0**, we are introducing **native Git support** for all catalog entities, allowing **bi-directional updates**:

 ✅ Users can edit the YAML file in Git, and it will update the entity in IDP.

 ✅ Users can edit the entity in IDP, and it will commit changes to Git (via direct push or pull request).

 ✅ Instant updates via webhooks (no more waiting for periodic syncs).

 ✅ Support for multiple entity versions from different Git branches.

This eliminates rate-limit issues, ensures real-time updates, and provides seamless Git integration.

### UI-Driven Catalog Entity Creation
In **Harness IDP 1.0**, users could only create catalog entities through YAML files, making it a hard dependency.

In **Harness IDP 2.0**, we’ve introduced catalog entity creation and updates via the Harness IDP UI.

This means:

 ✅ No YAML required—users can create and modify entities directly through the UI.

 ✅ Easier entity management, making IDP more user-friendly.

This removes the hard dependency on YAMLs and improves accessibility for all users.

### Harness-Native UX
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

## Feature Compatibility Matrix - IDP 1.0 vs 2.0
WIP

## Migration Plan & Rollout Strategy
With the introduction of **IDP 2.0**, customers will have the opportunity to migrate from **IDP 1.0** (the existing version) to **IDP 2.0** (new platform). This migration will be **progressive** and **customer-friendly**, ensuring minimal disruption while enabling access to new features.

The migration plan consists of:
- Phased Rollout Strategy ensuring stability.
- Gradual Migration Approach allowing customers to transition at their own pace.
- Fallback Mechanism to handle any unforeseen issues.
- Comprehensive Support for seamless adoption.

### Rollout Phases
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

### Timeline & Status
WIP

### Migration Plan
We’ll follow a structured and seamless transition from 1.0 to 2.0. Below is the structured approach:

#### Migration Checklist
WIP

#### Migration Pathways
WIP

#### Migration Process
WIP

#### Legacy Backstage Mode (Interim Support)
During the transition, customers can continue to use **Backstage YAML entities** while migrating to IDP 2.0.
- Entities will still be account-level, but some new IDP 2.0 features may not be supported.
- This mode acts as a bridge to avoid immediate disruption.

#### Handling IDP 1.0 during Migration
- IDP 1.0 remains operational throughout the migration period.
- Customers will be provided with a clear migration guide and support resources.
- No forced migration initially – users can migrate at their own pace.
- Deprecation notice for IDP 1.0 will be communicated well in advance.

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
