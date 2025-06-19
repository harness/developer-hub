---
title: Git Experience for Catalog Entities
description: Step-by-step guide on how users interact with the Git Experience (GitX) feature in Harness IDP, including component creation, versioning, and repo linking.
sidebar_position: 2
keywords:
  - Harness IDP
  - Git Experience
  - GitX
  - Git integration
  - Component creation
  - Developer portal
  - Repository linking
  - Version control
  - Harness GitX
  - Harness Git workflow
tags:
  - GitX
  - Harness IDP
  - Developer Experience
  - Git Integration
  - DevOps Workflow
  - Component Management
---

Harness Internal Developer Portal (IDP) 2.0 integrates deeply with the Harness Platform Git Experience (GitX) to enable **bi-directional Git-backed entity management**. Harness Git Experience with IDP 2.0 allows you to store and track your entity YAMLs in Git Repositories with bi-directional updates. This document outlines how developers and platform engineers interact with Git Experience throughout the entity lifecycle.

Harness IDP Git Experience integrates with the following **Git Providers**: 
- GitHub 
- GitLab
- Bitbucket
- Azure Repos
- Harness Code

To understand more about the key features of Harness IDP Git Experience, please go through [Harness IDP Git Experience Overview](/docs/internal-developer-portal/git-experience/overview.md).

## Storing Entity YAMLs 
Harness Git Experience with IDP 2.0 allows you to store your Catalog entity YAMLs in the following two ways: 
1. **Inline**: Your entity YAML is stored in the Harness database, and the entity exists as an **Inline Entity**. 
2. **Remote**: Your entity YAML is pushed to Git, and the entity exists as an **Remote Entity**. 

Read more about [Harness Platform Git Experience Requirements](https://developer.harness.io/docs/platform/git-experience/configure-git-experience-for-harness-entities#git-experience-requirements). 

### Creating Inline Entities 
With Inline Entities, your Catalog entity's YAML is stored in the Harness database. You can edit and manage your entity's YAML from the Harness UI directly.

// steps to create an inline entity with images and screenshots

### Creating Remote Entities 
As Harness IDP (Internal Developer Portal) evolves from Backstage-native IDP 1.0 to Harness-native IDP 2.0, entity creation now benefits from the powerful [Git Experience](https://developer.harness.io/docs/category/git-experience) capabilities provided by the Harness Platform.

With Remote Entities, you can store your Catalog entity YAMLs in your Git repositories with bi-directional real-time sync support. 

// steps to create a remote entity with images and screenshots

Let's get started, so when a user creates a new Catalog entity - they can choose to store the YAML inline or in a remote Git repository. This selection is available upfront in the entity creation form.

Once Git is selected, users can configure the repository details, connector, branch, and YAML file path.
Changes made in the entity via the Harness UI are committed to the Git repo (either directly or through a pull request). 

:::note
Changes made to the YAML file in Git are **automatically reflected** in the entity using **webhook-triggered updates**. To understand more about this feature, please refer to [Updating and Syncing Entities with Git](/docs/internal-developer-portal/git-experience/gitx-journey.md#updating-and-syncing-entities-with-git)
:::

### Converting Inline to Remote Entity (and vice-versa)
Users who initially created an entity as inline can convert it to Git-based at any time using the Edit page. The reverse—Git to inline—is also supported,  by simply clicking Move to Git, giving teams flexibility to change storage strategy mid-way without re-creating the entity.

// steps to convert these entities with images and screenshots

### Managing Multiple Branches
You can also switch branches from Git to view an alternate version of the entity's YAML. This action does not create a new entity; instead, it updates the existing one. This is especially useful in scenarios where direct commits to the main branch are restricted due to organizational policies, and changes need to go through a pull request workflow.

// steps to create and manage multiple branches with the PR flow

## Importing an Entity from Git (using YAML)
In Harness IDP, users can also create new entities by importing their YAML definitions stored in Git repositories directly into Harness IDP.
This feature allows teams to reuse pre-defined configurations, onboard services faster, and migrate from automation workflows or existing repositories.
### Import an Entity YAML
#### Harness native YAML vs Backstage YAML 
To use this feature, Backstage YAML is not supported directly. Since IDP 2.0 uses a new data model, existing YAMLs from IDP 1.0 (Backstage-native) must be converted using Harness CLI, UI editors, or migration scripts. To understand more about converting IDP 1.0 YAMLs to IDP 2.0 YAMLs, please refer to [Converting IDP 1.0 YAMLs](/docs/internal-developer-portal/catalog/catalog-yaml.md#converting-existing-entity-yamls-idp-20)

#### Steps to import an entity YAML 
// with images and screenshots (must include the scope selection, etc.)

### Entity Scope and Connector Rules
Some important constraints exist during the import process:
- **Entity Scope is Fixed**:
  The scope (Account, Org, or Project) of the entity is derived from the YAML definition. Users cannot edit or override the scope while importing.
- **Account-level Connectors Required**:
  During import, only Account-level Git connectors are supported. This ensures that the connector has access across scopes, avoiding mismatches between the connector's accessibility and the entity's YAML-defined scope.
  After creation, the connector can be changed to an Org/Project-level one if needed.
- **Harness Code or Other Git Providers**:
  - When importing via Harness Code, YAMLs can be sourced from any repository that the user has access to. The repo’s scope does not affect the entity scope.
  - When using other Git providers (GitHub, GitLab, Bitbucket, Azure Repos), the same rules apply — the YAML determines the entity's scope, not the Git repository.
This launches a guided setup where users must provide details like:
- Git repository path //more details needed
- YAML file location //more details needed
- Git connector and branch
The imported file must follow the Harness IDP YAML data model, which defines how entity configurations (Catalog entities) should be structured in YAML format. Once imported, Harness parses the YAML and generates the correspond.

### Validation and Safeguards
Harness validates the imported YAML thoroughly:
- Ensures required fields and syntax are correct
- Checks that the connector can access the YAML path
- Validates that the entity’s scope matches the structure
- Prevents import if there are incompatible or unsupported definitions

This is especially useful for teams migrating from scripted or CLI-based workflows, as they can define entities as YAML first, store them in Git, and then use import to onboard them into the platform.


## Updating and Syncing Entities with Git
Once an entity in Harness IDP is backed by Git Experience, it becomes tightly coupled with its corresponding YAML definition in the Git repository. This enables a seamless two-way sync between Harness and Git, ensuring that the Git repository always reflects the source of truth - whether the changes originate from the UI or from Git directly.
### Bi-directional Sync between Harness and Git
Git Experience enables bi-directional entity updates, meaning:
#### Changes in Git reflect in the Harness entity YAML
When a user updates the YAML file directly in the Git repository (for example, through a commit or pull request), GitX listens to webhook events configured for the repository. Once triggered, the webhook causes Harness to automatically reload the YAML and apply those changes to the corresponding entity.
#### Changes in Harness entity YAML reflect in Git
When a user edits the entity using the Harness UI (such as updating metadata, annotations, or layout), GitX pushes the changes back to Git. This can happen via:
- A direct push, where the update is committed directly to the configured branch, or
- A pull request, allowing teams to apply review and approval workflows.

#### Steps to setup Bi-directional Sync (via Webhooks)

// steps to setup bi-directional sync with images

### Manual Reload Support
In some cases, webhook integrations may fail to trigger or may not be configured properly. GitX provides a fallback mechanism in such scenarios.
Users can trigger a manual reload of an entity by clicking the “Reload from Git” button available on the entity's View or Edit page.
This operation pulls the latest YAML from the configured Git path and updates the entity, ensuring it remains up-to-date even without active webhook triggers.
Manual reload is particularly useful in debugging sync issues or in restricted environments where webhooks cannot be configured due to network/firewall constraints.

// screenshot with the same support 

### Entity Sync Status & Version Drift
To provide complete visibility into the sync state of an entity, GitX shows real-time metadata on the entity’s View/Edit pages. This includes:
- **Sync status**: Indicates whether the entity is currently in sync with the YAML file in Git.
- **Out-of-sync warnings**: If the entity’s version in Harness diverges from its YAML file in Git (e.g., webhook failed or someone made conflicting changes), Harness will flag this status and notify the user.
- **Connector, branch, file path**: These GitX properties are always visible so users can troubleshoot and validate the entity’s configuration.
