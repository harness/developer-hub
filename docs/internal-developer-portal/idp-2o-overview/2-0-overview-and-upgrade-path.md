---
title: Harness IDP 2.0 Overview
description: Comprehensive guide to Harness IDP 2.0 — explore the new Harness-native data model, platform RBAC, Git Experience, and improved UX for internal developer portals. Includes migration strategy, feature compatibility, and rollout details for upgrading from IDP 1.0.
sidebar_position: 1
sidebar_label: What is IDP 2.0?
redirect_from: docs/internal-developer-portal/2-0-overview-and-upgrade-path
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