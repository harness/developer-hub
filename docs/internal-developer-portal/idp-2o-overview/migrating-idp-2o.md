---
title: Upgrading to IDP 2.0
description: Comprehensive guide to Harness IDP 2.0 — explore the new Harness-native data model, platform RBAC, Git Experience, and improved UX for internal developer portals. Includes migration strategy, feature compatibility, and rollout details for upgrading from IDP 1.0.
sidebar_position: 3
sidebar_label: Upgrading to IDP 2.0
---
If you are a Harness IDP 1.0 user, you would want to understand the key details around upgrading to IDP 2.0 and the risks associated with the same process. This guide will take you through the process of upgrading from 1.0 to 2.0 and will also list down the effort and things to be taken care of while doing the same. 

## Before You Upgrade (Checklist)

Before you upgrade, please ensure you follow the checklist to ensure you are aware of all changes and steps to be taken care of while upgrading: 
1. Please review the breaking changes guide before you upgrade to IDP 2.0. It's important for you to be well versed with the changes and how it's different than what you're using now. 
2. Once you've reviewed the breaking changes guide, make sure you assess how it impacts your existing Harness IDP setup. There are lot of foundational changes being introduced with Harness IDP 2.0 like introducing the Harness-native Data Model. This if not assessed properly can impact your existing IDP setup. 

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


What is IDP 2.0? 

Existing feature compatibility

Breaking changes
Affected areas
Decide the scope of migration (test account first)

How to Migrate: 
Enable the flag
Move around entities

New features