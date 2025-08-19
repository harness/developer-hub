---
title: Git Experience for Harness IDP
description: Step-by-step guide on using the Git Experience feature with Harness IDP.
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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info For IDP 1.0 Customers
This Git Experience document is applicable **only to IDP 2.0 customers**, as the Harness IDP Git Experience is available exclusively in IDP 2.0. To learn how to upgrade, refer to the [IDP 2.0 Upgrade Guide](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o.md).
:::


### Supported Features in Git Experience

| Feature                                                                            | Status                                          |
| ---------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Store entity YAML in Git**                                                       | ✅ Available                                    |
| **Import YAML from Git** and create a new entity                                   | ✅ Available                                    |
| **IDP to Git changes**: Make changes in IDP and commit changes to YAML file in Git | ✅ Available                                    |
| **Git to IDP changes**: Make changes to YAML file in Git and update entity in IDP  | ✅ Available |

Harness Internal Developer Portal (IDP) integrates with the Platform Git Experience (GitX) to enable **bi-directional Git-backed entity management**. Harness Git Experience allows you to store and track your entity YAMLs in Git Repositories with bi-directional updates. This document outlines how developers and platform engineers interact with Git Experience throughout the entity lifecycle.




:::info Note
With the IDP Git experience feature, one entity can have only one YAML file. Unlike IDP 1.0, storing multiple entities within a single YAML is no longer supported in IDP 2.0. This design choice is _in line_ with the rest of the Harness platform, which emphasizes clarity and consistency through single-entity YAML definitions. 
To understand more about this and other key differences, see the [breaking changes in IDP 2.0](https://developer.harness.io/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path#breaking-changes-in-idp-20).
:::

### Supported IDP Entities in Git Experience

IDP Catalog entity YAMLs (Component, API, Resource) and Workflow YAMLs can be stored in Git using Git Experience. However, configuration of other resources such as Scorecards, Plugin configurations, Layouts, etc. can only be done using the UI or API.
> **Note:**
> For the full list of supported entities, refer to the [Supported IDP Entities in Git Experience](https://developer.harness.io/docs/internal-developer-portal/whats-supported#supported-idp-entities-in-git-experience) documentation.

### Supported Git Providers in Harness IDP Git Experience

Harness IDP Git Experience integrates with the following **Git Providers**:

- GitHub ([Cloud](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-code-repo#connect-to-github) & [Enterprise](https://docs.github.com/en/enterprise-server@3.14/admin/overview/about-github-enterprise-server))
- [GitLab](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-code-repo#connect-to-gitlab) (Cloud & Self Hosted)
- [Bitbucket](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-code-repo#connect-to-bitbucket)
- [Azure Repos](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-a-azure-repo)
- [Harness Code](https://developer.harness.io/docs/code-repository/get-started/overview/)

## Storing Entity YAMLs

Harness Git Experience with IDP 2.0 allows you to store your Catalog entity YAMLs and Workflow YAMLs in the following two ways:

1. **Inline**: Your entity YAML is stored in the Harness database, and the entity exists as an **Inline Entity**.
2. **Remote**: Your entity YAML is pushed to Git, and the entity exists as an **Remote Entity**.

Read more about [Harness Platform Git Experience Requirements](https://developer.harness.io/docs/platform/git-experience/configure-git-experience-for-harness-entities#git-experience-requirements). To learn more about Harness-native Catalog entity YAML, go to [Catalog YAML](/docs/internal-developer-portal/catalog/catalog-yaml.md).

### Creating Inline Entities

With Inline Entities, your entity's YAML is stored in the Harness database. You can edit and manage your entity's YAML from the Harness UI directly.

![Inline Entity](./static/inline-idp.png)

### Creating Remote Entities

With Remote Entities, you can store your entity YAMLs in your Git repositories with bi-directional real-time sync support.

<iframe
  src="https://app.tango.us/app/embed/94f8562e-9320-4ab5-8990-546de4d01a20?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=false" 
  style={{ minHeight: '640px' }}
  sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
  security="restricted"
  title="Create and Configure Onboarding Component"
  width="100%"
  height="100%"
  referrerPolicy="strict-origin-when-cross-origin"
  frameBorder="0"
  webkitallowfullscreen="true"
  mozallowfullscreen="true"
  allowFullScreen
/>

Let's get started, so when a user creates a new Catalog entity - they can choose to store the YAML inline or in a remote Git repository. This selection is available upfront in the entity creation form.

Once Git is selected, users can configure the repository details, connector, branch, and YAML file path.
Changes made in the entity via the Harness UI are committed to the Git repo (either directly or through a pull request).

<!-- Bidirectional updates are not available yet. -->
:::note
Changes made to the YAML file in Git are **automatically reflected** in the entity using **webhook-triggered updates**. To understand more about this feature, please refer to [Updating and Syncing Entities with Git](/docs/internal-developer-portal/git-experience/gitx-journey.md#updating-and-syncing-entities-with-git)
:::

### Converting Inline to Remote Entity

Users who initially created an entity as **Inline** (stored in the Harness database) can convert it to a **Remote Entity** (Git-backed) at any time using the **Edit** page in the Harness UI.

You can do this in two ways:

- **Manually via the UI**: Navigate to the entity’s **Edit** screen, configure the Git settings (connector, repo, branch, and file path), and save the changes. This moves the entity YAML to Git and enables Git-based tracking.

<iframe
  src="https://app.tango.us/app/embed/6b5f8f74-9541-46ac-a7dd-1c1130b39438?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=false" 
  style={{ minHeight: '640px' }}
  sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
  security="restricted"
  title="Move Workflow to Git Repository"
  width="100%"
  height="100%"
  referrerPolicy="strict-origin-when-cross-origin"
  frameBorder="0"
  webkitallowfullscreen="true"
  mozallowfullscreen="true"
  allowFullScreen
/>


- **In Bulk using a Script**: For larger migrations, Harness provides a script that helps automate the conversion of multiple entities from Inline to Remote, storing their YAMLs in a Git repo following a structured format.
  To learn how to use this script and view complete steps, refer to the official migration guide - [Store Entity YAMLs in Git](../idp-2o-overview/migrating-idp-2o.md#step-7-store-entity-yamls-in-git)

### Managing Multiple Branches

Harness Git Experience allows users to view the YAML definition of a Git-backed entity across any available branch. This is especially helpful for reviewing PR changes, testing variations, or managing configuration workflows in different environments.

You can use the branch selector from the entity view in the Software Catalog to toggle between branches and inspect the YAML for that branch.

This is especially useful in scenarios where direct commits to the main branch are restricted due to organizational policies, and changes need to go through a pull request workflow.

![Branch Selection in GitX](./static/multi-branch.png)

> While you can inspect and preview YAMLs across different branches, only the **default branch** (as configured during entity creation) is actively used by Harness IDP for rendering and syncing entity definitions.


<iframe
  src="https://app.tango.us/app/embed/8dcee9d3-bde1-487d-8b8e-f6b9bbcf2e50?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=false"
  style={{ minHeight: '640px' }}
  sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
  security="restricted"
  title="Update Metadata and Commit in Harness"
  width="100%"
  height="100%"
  referrerPolicy="strict-origin-when-cross-origin"
  frameBorder="0"
  webkitallowfullscreen="true"
  mozallowfullscreen="true"
  allowFullScreen
/>


:::info note

Note that the final entity page view in IDP will still render the main/default branch.

:::

## Importing an Entity from Git (using YAML)

In Harness IDP, users can also create new entities and Workflows by importing their YAML definitions stored in Git repositories directly into Harness IDP.
This feature allows teams to reuse pre-defined configurations, onboard services faster, and migrate from automation workflows or existing repositories.

### Pre-requisites

- **Enable API Access**: For connection types and authentication methods where API access is not already enabled by default, you'll have to enable it from the Git connector settings. API Access is required for using Harness Git Experience. Refer to these docs to [enable API access](https://developer.harness.io/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#enable-api-access).
  ![](./static/enable-api-access.png)

### Import an Entity YAML

You can create a new entity or workflow in Harness IDP directly from your Git YAML by using this **Import** flow. Please refer to the following steps to import any entity from Git.
<Tabs>
<TabItem value="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/e6bb7067-f9f0-4280-ab71-9571d476936b" title="Import a Workflow from Git using a YAML" />
</TabItem>
<TabItem value="Step-by-Step">

1. Go to Harness IDP -> Create. In the bottom, you'll find an option to create a new entity by importing YAML from Git. Click on **Import from Git**.
2. Select the **Entity Scope** (scope at which you want your entity to be created). The scope (Account, Org, or Project) of the entity is determined by the scope you select here. Make sure your imported YAML includes the appropriate scope identifiers i.e. `projectIdentifier` and `orgIdentifier` – otherwise, it will result in an error.
3. Select the **Git Provider**. You can either choose **Harness Code Repository** or **Third-Party Provider**. For your selected option, enter the required details.
4. In case of **Harness Code Repository**, you'll have to provide the following details:
   - **Repository**: Git Repository where your Entity YAML is stored.
   - **Git Branch**: Branch of your Repository where your Entity YAML is stored.
   - **YAML Path**: Path of your YAML File.
     ![](./static/harness-code.png)
5. In case of **Third-Party Provider**, you'll have to provide the following details:
   - **Git Connector**: Git Connector added in your Harness IDP
   - **Repository**: Git Repository where your Entity YAML is stored.
   - **Git Branch**: Branch of your Repository where your Entity YAML is stored.
   - **YAML Path**: Path of your YAML File.
     ![](./static/third-party-git-provider.png)
6. Click on **Import**. This will create an entity in your IDP directly from the YAML file stored in Git.

</TabItem>
</Tabs>

#### Harness native YAML vs Backstage YAML

To use this feature, Backstage YAML is not supported directly. Since IDP 2.0 uses a new data model, existing YAMLs from IDP 1.0 (Backstage-native) must be converted using Harness CLI, UI editors, or migration scripts. To understand more about converting IDP 1.0 YAMLs to IDP 2.0 YAMLs, please refer to [Converting IDP 1.0 YAMLs](/docs/internal-developer-portal/catalog/catalog-yaml.md#converting-existing-entity-yamls-idp-20)

### Entity Scope and Connector Rules

Some important constraints exist during the import process:

- **Entity Scope is Fixed**:
  The scope (Account, Org, or Project) of the entity is determined by the scope you select initially. Make sure your imported YAML includes the appropriate scope identifiers i.e. `projectIdentifier` and `orgIdentifier`; otherwise, it will result in an error.
- **Harness Code & Other Git Providers**:
  - **Harness Code Repository**: When importing via **Harness Code**, YAMLs can be sourced from any repository that the user has access to. The repo’s scope does not affect the entity scope. The following details are required in importing an entity from Git using Harness Code Repository:
    - **Repository**: Git Repository where your Entity YAML is stored.
    - **Git Branch**: Branch of your Repository where your Entity YAML is stored.
    - **YAML Path**: Path of your YAML File.
      ![](./static/harness-code.png)
  - **Third-Party Git Providers**: When using other **Git providers** (GitHub, GitLab, Bitbucket, Azure Repos), the same rules apply — the scope selection and YAML determines the entity's scope. The following details are required in importing an entity from Git using Third-party Git Providers:
    - **Git Connector**: Git Connector added in your Harness IDP
    - **Repository**: Git Repository where your Entity YAML is stored.
    - **Git Branch**: Branch of your Repository where your Entity YAML is stored.
    - **YAML Path**: Path of your YAML File.
      ![](./static/third-party-git-provider.png)

## Updating and Syncing Entities with Git

Once an entity in Harness IDP is backed by Git Experience, it becomes tightly coupled with its corresponding YAML definition in the Git repository. This enables a seamless two-way sync between Harness and Git, ensuring that the Git repository always reflects the source of truth - whether the changes originate from the UI or from Git directly.

When a user edits the entity using the Harness UI (such as updating metadata, annotations, or layout), GitX pushes the changes back to Git. This can happen via:

- A direct push, where the update is committed directly to the configured branch, or
- A pull request made when we change the branch, allowing teams to apply review and approval workflows.

### Bi-directional Sync between Harness and Git

Git Experience enables bi-directional entity updates, meaning:

#### Changes in Git reflect in the Harness entity YAML

When a user updates the YAML file directly in the Git repository (for example, through a commit or pull request), GitX listens to webhook events configured for the repository. Once triggered, the webhook causes Harness to automatically reload the YAML and apply those changes to the corresponding entity.

#### Changes in Harness entity YAML reflect in Git

#### Webhook Auto-Creation

When Git Experience (GitX) is configured in Harness, a webhook is automatically created in your Git repository. This webhook allows IDP GitX to listen for changes and automatically trigger YAML reloads. If the webhook is configured and any updates are pushed to the repository, Harness also validates the updated IDP catalog YAMLs to ensure correctness and consistency.

![Webhook Auto-Creation](./static/webhook-created.png) 

#### Experience Bi-directional Sync (via Webhooks)

<iframe
  src="https://app.tango.us/app/embed/4c59d405-4506-4c11-904d-106a12516e27?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=false"
  style={{ minHeight: '640px' }}
  sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
  security="restricted"
  title="Edit YAML and Commit Changes in GitHub and Harness"
  width="100%"
  height="100%"
  referrerPolicy="strict-origin-when-cross-origin"
  frameBorder="0"
  webkitallowfullscreen="true"
  mozallowfullscreen="true"
  allowFullScreen
/> 


#### Workflow Execution Visibility and Webhook Requirement

For Workflow entities, GitX relies on a webhook to keep both the YAML editor and the Workflow execution UI (visual representation, stages, steps) in sync. This webhook enables Harness to detect Git changes and apply them to the execution interface in addition to updating the YAML view.

In most cases, this webhook is created automatically when Git Experience is configured. However, if you’re not seeing the latest changes from Git reflected in the Workflow execution UI, even though the YAML has updated; it likely means the webhook was not created. When the webhook is missing, updates to the default branch will not trigger score recalculations, which can result in outdated or missing score data.

To resolve this, ensure that a webhook is configured on the Git connector (at the account, project, or org level) and is listening to relevant Git connectors.

![Configure Webhooks](./static/webhook-idp.png)

:::note
This does not applicable for Harness Code repository. Know more about [Configure Webhooks](/docs/platform/git-experience/gitexp-bidir-sync-setup/#setup-via-webhooks-page).
:::


### Manual Reload Support

In some cases, webhook integrations may fail to trigger or may not be configured properly. GitX provides a fallback mechanism in such scenarios.

Users can trigger a manual reload of an entity by clicking the **“Reload”** button available on the entity's View or Edit page.

This operation pulls the latest YAML from the configured Git path and updates the entity, ensuring it remains up-to-date even without active webhook triggers.

Manual reload is particularly useful in debugging sync issues or in restricted environments where webhooks cannot be configured due to network/firewall constraints.

![Manual Reload Support](./static/manual-reload.png)

### Entity Sync Status & Version Drift

To provide complete visibility into the sync state of an entity, GitX shows real-time metadata on the entity’s View/Edit pages. This includes:

- **Sync status**: Indicates whether the entity is currently in sync with the YAML file in Git.
- **Out-of-sync warnings**: If the entity’s version in Harness diverges from its YAML file in Git (e.g., webhook failed or someone made conflicting changes), Harness will flag this status and notify the user.
- **Connector, branch, file path**: These GitX properties are always visible so users can troubleshoot and validate the entity’s configuration.
