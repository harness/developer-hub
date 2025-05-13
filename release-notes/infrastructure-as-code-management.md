---
title: Infrastructure as Code Management release notes
sidebar_label: Infrastructure as Code Management
date: 2025-05-13T10:00
tags: [Infrastructure as Code Management]
sidebar_position: 17
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HarnessApiData from '../src/components/HarnessApiData/index.tsx';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/infrastructure-as-code-management/rss.xml" />

These release notes describe recent changes to Harness Infrastructure as Code Management.

:::info About Harness Release Notes

- **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
- **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
- **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.
:::

<!-- :::note Latest release versions
<HarnessApiData
  query="https://app.harness.io/prod1/iacm/api/version"
  fallback=""
  parse='.version | "IAC Server verion: \(.)"'>
</HarnessApiData>
<br/>
<HarnessApiData
  query="https://app.harness.io/prod1/iacm-manager/version"
  fallback=""
  parse='.resource.versionInfo.version | "IAC Manager version: \(.)"'>
</HarnessApiData>
::: -->

## May - IAC Server Version v1.143.0 & v1.145.0
<!-- Released on 5 May 2025 -->
### Feature Improvements: 
- **Scoped Repository Selection in Module Registry:** Project-scoped repositories can now be used at the organization and account levels in the Module Registry. This enhancement gives you greater flexibility and control over where your modules are sourced from—making it easier to share and reuse IaC code across teams. (IAC-3476, IAC-3485)

👉 Get started by [registering a module](/docs/infra-as-code-management/iacm-features/module-registry#register-a-module).

## April - IAC Server Version 1.138.0
<!-- Released on 4 April 2025 -->

### [New Feature] Workspace Wizard UI
**[IAC-3428] | [Docs](/docs/infra-as-code-management/workspaces/create-workspace#create-a-new-workspace)**

The Workspace Wizard UI has been updated to improve usability and streamline the workspace creation process.
<DocVideo src="https://app.tango.us/app/embed/cfb68b54-eb46-42af-a622-5b76c9270598?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a IaCM Workspace in Harness" />

### Feature Improvements
- **DevOps Essentials License Enforcement:** The DevOps Essentials license is now enforced for IACM applications, ensuring compliance. We’ve also added license test scenarios to validate this functionality. (IAC-3379)

- **Module Registry Access:** You can now access the Module Registry at both the project and account levels within IACM. If you access it at the project level, a warning banner will notify you that all updates will be saved at the account level. (IAC-3367)

## March 2025
### IAC-Server: Version 1.126
<!-- Released on 18 March 2025 -->
### New Features and Enhancements
- **Sparse Checkout:** You can now select [the Sparse Checkout option in your workspace configuration](/docs/infra-as-code-management/workspaces/workspace-tabs#advanced-options) to specify patterns for selective repository checkout. (IAC-3194, IAC-3196)

- **Workspace Enhancements:** When updating workspaces, your custom pipelines are now preserved, ensuring they won’t be overwritten by project default pipelines. We’ve also resolved an issue with the Policy Sets modal not rendering properly. (IAC-3206)

- **User Experience Improvements:** Template creation now provides specific error messages for missing fields, helping you quickly identify and address issues. (IAC-3225)

- **Monaco Diff Editor:** The Monaco Diff editor now displays accurate before/after YAML views, ensuring a clearer understanding of changes. (IAC-3207)

**Security and Configuration Updates**
- **mTLS Support:** mTLS support has been added to the IAC server to enhance secure communication. You can also configure optional TLS settings for the IAC server client. (IAC-3188, IAC-3197)
- **Permission Checks:** Permission checks have been added to ensure you only access workspaces you are authorized to view. (IAC-3203)

**New APIs and Features**
- A new API endpoint allows you to retrieve all resource changes across every stage of a pipeline execution, including workspace identifiers for better traceability. (IAC-3187)
- You can now include a Module ID in IaCM pipeline steps, enabling more detailed tracking and configuration. (IAC-3339)
- Module executions now return trigger information, giving you better insights into execution origins. (IAC-3192)

**Other Enhancements**
- Helm charts now use the `imagePullSecret` from your global settings, streamlining configuration management. (IAC-3219)
- Storybook tooling has been added to support UI testing, making it easier to validate interface changes. (IAC-3291)
- The prepare exec flow and default pipeline feature flags have been removed to simplify your workflows. (IAC-3295)

### Fixed Issues
**[Module Registry](../docs/infra-as-code-management/iacm-features/module-registry):** Sparse Checkout and submodule options are now hidden for repositories in the Module Registry, improving clarity and usability. (IAC-3277)

**Sensitive Data Handling:** We’ve resolved an issue where non-sensitive data was incorrectly marked as sensitive in plans and state files, as well as during sensitive data pruning. (IAC-3261)

**Cost Changes:** Fixed an issue where cost changes displayed duplicate items, ensuring accurate reporting. (IAC-3215)

---
## February 2025
### IAC-Server: Version 1.116.0 & IAC-Manager: Version 1.61.4
<!-- Released on 7 February 2025 -->
### New Features and Enhancements
- **Module Registry:** We've introduced the Module Registry, a centralized repository that allows you to manage and publish versions of pre-built infrastructure modules. This feature supports versioning, enhances search functionality, and integrates seamlessly with existing IaCM configurations, all while providing detailed access control settings. 
  #### What You Need to Know:
  - **Prerequisites:** Ensure your Harness connectors are set up, or if using a delegate, it should be version `25.01.85000` or later.
For more information, check out the [Module Registry Documentation](/docs/infra-as-code-management/iacm-features/module-registry).

### IAC-Manager: Version 1.57.0
- **OpenTofu/Terraform import:** Harness Pipelines now support the [tofu/terraform import](/docs/infra-as-code-management/pipelines/terraform-plugins/#import) command, allowing you to bring existing infrastructure under IaC control.

<details>
<summary>IaCM 2024 Release Notes</summary>
## August 2024
### IAC-Server 1.50.0 and IAC-Manager: 1.32.0
<!-- Released on 27 August 2024 -->
#### New features and enhancements
- **Sensitive data removal:** IACM now supports a feature flag that will remove all sensitive data from your plan and state. This can only be used in conjunction with an OpenTofu/Terraform remote backend and offers advanced security with reduced feature set. We recommend contacting Harness support if you are interested in trying this functionality. (IAC-2281)
- **Workspace expression:**  Enhanced the usage and readability of workspace expressions (IAC-2187)
  - For example, referencing a terraform or OpenTofu variable can be done at workspace level.

  ```bash
  // OLD
  <+pipeline.stages.s1.spec.execution.steps.init.spec.envVariables.PLUGIN_WS_TF_VAR_OPEN_TOFU_VAR>

  // NEW
  <+workspace.variables.OPEN_TOFU_VAR>
  ```

## June 2024
### Version IAC-Server: 1.17.0
<!-- Released on 04 June 2024 -->

#### New features and enhancements
- **Support for commit SHA:** Introduced the ability to add commit SHA options to configuration and Terraform variable files. (IAC-1961)
- **Workspace expression:** Enabled setting expressions for workspace values within an IACM stage. (IAC-2002)

### Version IAC-Server: 1.15.0
<!-- Released on 04 June 2024 -->

#### New features and enhancements
- **Filter persistence:** Enhanced filtering capabilities by ensuring the persistence of filter values. (IAC-1938)

#### Fixed issues
- **Workspace type setting:** Corrected default values to accurately set the workspace type. (IAC-1970)

## May 2024

### Version IAC-Server: 1.10.0
<!-- Released on 02 May 2024 -->

#### New features and enhancements
- **Cost estimation breakdown:** Added the option to select multiple workspaces with associated costs in the cost estimation breakdown screen. (IAC-1835)

## April 2024

### Version IAC-Server: 0.186.0
<!-- Released on 18 April 2024 -->
#### New features and enhancements
- **Copy resource values:** Improved the user experience of the resource review screen and added the ability to copy resource values. (IAC-589)
- **Approval screen - actioned by:** Displayed the user who actioned the approval in the IACM approval step when viewing and executing it. (IAC-1699)
- **Provider check for var file:** Implemented a provider check when editing a var file to ensure access to repositories and branches. (IAC-1701)

### Version IAC-Server: 0.181.0
<!-- Released on: 04 April 2024 -->
#### Layout & Design Refinement:
  - **Enhanced Layout:** Increased spacing around store cards to prevent overlap of check marks and enhance readability and accessibility. (IAC-1601)
  - **Sensitive Field Icons:** The eye/hide icon is now exclusively used with sensitive fields to improve privacy and clarity. (IAC-1694)
---

## March 2024
### Version IAC-Server: 0.178.0
<!-- Released on: 25 March 2024 -->
#### New features and enhancements
  - **Connector Validation Enhancement:** We've implemented a validation check for connectors when creating or editing workspaces. This update ensures that all connectors used are currently available and of the correct type before proceeding with the operation, to help prevent errors related to non-existent or incorrect type connectors, enhancing the reliability and efficiency of workspace management. (IAC-1602)

### Version IAC-Server: 0.176.0
<!-- Released on: 21 March 2024 -->
#### New features and enhancements
  - **Enhanced Lock Icon Tooltips and Warnings:** We've updated the tooltips and warning messages for the **lock icon** in Workspace resources to improve clarity and accessibility. (IAC-1577)

### Version IAC-Server: 0.175.0
<!-- Released on: 15 March 2024 -->
#### Fixed issues
  - **Improved Header Visibility:** We resolved the issue of overlapping headers in side-by-side workspace state comparisons, enhancing readability and accessibility for the **View Execution** and **filename** headers. (IAC-1573)
  - **Planned Changes Count Accuracy:** We refined the **Planned changes** count to include only **Added, Changed, and Deleted** resources, excluding **Unchanged** resources, for a more accurate reflection of significant changes. (IAC-1561)
---

## February 2024
### Version IAC-Server: 0.152.0
<!-- Released on: 08 February 2024 -->
#### Fixed issues
- **Improved Variable Deletion Permissions:** Fixed an oversight where permissions for variable deletion were not checked during workspace updates. Previously, checks were only performed via the */variable* endpoint using the **DELETE method**. This update ensures that permissions are verified against both the individual deletions and the broader workspace variable updates, maintaining security without modifying the core architecture between **iac-server** and **sprox**. (IAC-1362)
</details>