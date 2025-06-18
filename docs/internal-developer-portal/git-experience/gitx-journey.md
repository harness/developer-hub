---
title: User Interaction Journey with Git Experience (GitX) in Harness IDP
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

# User Interaction Journey with Git Experience (GitX) in Harness IDP

*(IMAGES AND VISUALS TO BE ADDED LATER)*

Harness Internal Developer Portal (IDP) 2.0 integrates deeply with the Platform Git Experience (GitX) to enable **bi-directional Git-backed entity management**. This document outlines how developers and platform engineers interact with GitX throughout the entity lifecycle.


## Creating Entities with GitX

As Harness IDP (Internal Developer Portal) evolves from Backstage-native 1.0 to Platform-integrated 2.0, entity creation now benefits from the powerful [Git Experience](https://developer.harness.io/docs/category/git-experience) capabilities provided by the Harness Platform.

With GitX, users can store entity definitions—like *Catalog components, templates, or custom resources*—as YAML files in a Git repository. 


Let's get started, so when a user creates a new entity—such as a Catalog Component or Template—they can choose to store the YAML inline or in a remote Git repository. This selection is available upfront in the entity creation form.


GitX integrates with multiple Git providers including :

- GitHub, 
- GitLab, 
- Bitbucket, 
- Azure Repos, and 
- Harness Code, - ensuring compatibility with most enterprise Git systems. 


Once Git is selected, users can configure the repository details, connector, branch, and YAML file path.
Changes made in the entity via the Harness UI are committed to the Git repo (either directly or through a pull request). 


:::note
Changes made to the YAML file in Git are **automatically reflected** in the entity using **webhook-triggered updates**.
:::

Users who initially created an entity as inline can convert it to Git-based at any time using the Edit page. The reverse—Git to inline—is also supported,  by simply clicking Move to Git, giving teams flexibility to change storage strategy mid-way without re-creating the entity.

## Updating and Syncing Entities with Git
Once an entity in Harness IDP is backed by GitX, it becomes tightly coupled with its corresponding YAML definition in the Git repository. This enables a seamless two-way sync between Harness and Git, ensuring that the Git repository always reflects the source of truth — whether the changes originate from the UI or from Git directly.
### Bi-directional Sync
GitX enables bi-directional entity updates, meaning:
#### Changes in Git reflect in the Harness entity
When a user updates the YAML file directly in the Git repository (for example, through a commit or pull request), GitX listens to webhook events configured for the repository. Once triggered, the webhook causes Harness to automatically reload the YAML and apply those changes to the corresponding entity.
#### Changes in Harness reflect in Git
When a user edits the entity using the Harness UI (such as updating metadata, annotations, or layout), GitX pushes the changes back to Git. This can happen via:
- A direct push, where the update is committed directly to the configured branch, or
- A pull request, allowing teams to apply review and approval workflows.
### Manual Reload Support
In some cases, webhook integrations may fail to trigger or may not be configured properly. GitX provides a fallback mechanism in such scenarios.
Users can trigger a manual reload of an entity by clicking the “Reload from Git” button available on the entity's View or Edit page.
This operation pulls the latest YAML from the configured Git path and updates the entity, ensuring it remains up-to-date even without active webhook triggers.
Manual reload is particularly useful in debugging sync issues or in restricted environments where webhooks cannot be configured due to network/firewall constraints.
### Entity Sync Status & Version Drift
To provide complete visibility into the sync state of an entity, GitX shows real-time metadata on the entity’s View/Edit pages. This includes:
- **Sync status**: Indicates whether the entity is currently in sync with the YAML file in Git.
- **Out-of-sync warnings**: If the entity’s version in Harness diverges from its YAML file in Git (e.g., webhook failed or someone made conflicting changes), Harness will flag this status and notify the user.
- **Connector, branch, file path**: These GitX properties are always visible so users can troubleshoot and validate the entity’s configuration.
## Importing YAML-defined Entities from Git
In Harness IDP, users can bootstrap new entities by importing YAML definitions stored in Git repositories.
This feature allows teams to reuse pre-defined configurations, onboard services faster, and migrate from automation workflows or existing repositories.
### Import Flow
Users can initiate the import process by clicking the “Import from Git” button on the entity creation page.
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
- Git repository path
- YAML file location
- Git connector and branch
The imported file must follow the Harness IDP YAML data model, which defines how entity configurations (Catalog entities) should be structured in YAML format. Once imported, Harness parses the YAML and generates the correspond.

:::warning 
Backstage YAML is not supported directly.
Since IDP 2.0 uses a new data model, existing YAMLs from IDP 1.0 (Backstage-native) must be converted using Harness CLI, UI editors, or migration scripts.
:::

### Validation and Safeguards
Harness validates the imported YAML thoroughly:
- Ensures required fields and syntax are correct
- Checks that the connector can access the YAML path
- Validates that the entity’s scope matches the structure
- Prevents import if there are incompatible or unsupported definitions

This is especially useful for teams migrating from scripted or CLI-based workflows, as they can define entities as YAML first, store them in Git, and then use import to onboard them into the platform.
