---
title: Infrastructure as Code Management release notes
sidebar_label: Infrastructure as Code Management
date: 2026-03-04T10:00
tags: [Infrastructure as Code Management]
sidebar_position: 17
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HarnessApiData from '../src/components/HarnessApiData/index.tsx';
import ReleaseNotesSearch from '@site/src/components/ReleaseNotesSearch';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/infrastructure-as-code-management/rss.xml" />

These release notes describe recent changes to Harness Infrastructure as Code Management.

<ReleaseNotesSearch />

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

## March 2026
### New features and enhancements
- **Vault integration** - Enables users to correlate a Vault connector directly with an IaCM workspace, allowing secrets to be natively pulled from Vault at runtime to support Terraform and OpenTofu workflows. Customers needed a seamless way to manage sensitive credentials within their infrastructure automation pipelines without manual intervention, reducing security risk and simplifying the operational overhead of secret management across environments.
- **Terragrunt advanced use cases** - Expands Terragrunt support with a suite of advanced capabilities, including JEXL expression support, STO integration, resource sanitization for sensitive values, and support within the Harness Terraform provider. Additionally, the GitOps native flow now supports automated PR comments for Terragrunt executions. Customers required deeper Terragrunt compatibility to bring their existing workflows into Harness without compromise, enabling teams to maintain governance standards while operating at scale.
- **AWS CDK support:** Added native AWS CDK support for workspace creation and pipeline execution, enabling teams to define infrastructure using AWS CDK alongside existing Terraform and OpenTofu options
- **Product analytics & telemetry implementation:** Implemented comprehensive product telemetry tracking via Segment to Mixpanel for entity inventory, orchestration metrics, user engagement, and onboarding funnel conversion to enable data-driven product decisions
- **Enhanced Terraform import experience:** Improved UI support for Terraform import operations with better exposure of required inputs including resource address and resource ID fields to align UI and documentation with existing YAML functionality
- **Module registry template retrospective assignment:** Introduced the ability to retrospectively add templates to existing workspaces through API endpoints, enabling better workspace organization and standardization
- **Ansible inventory plugin UI:** Introduced UI support for creating Ansible inventory plugins with the IACM_ANSIBLE_INVENTORY_PLUGIN feature flag
- **Workspace templates for Harness 3.0:** Redesigned workspace creation interface for Harness 3.0 with improved user experience and standardized workspace configurations
- **Harness CLI updates:** Leveraging Harness's powerful CLI, the IaCM module adds the `harness iacm plan` command to streamline local infrastructure change planning. Built for developers working with OpenTofu or Terraform files on their machines, `harness iacm plan` delivers secure execution while integrating seamlessly with Harness pipelines.
- **IaCM template improvements:** IaCM Workspace Templates now support Remote Workspaces, along with overrides for Git configuration. This allows platform teams to build templates that give end users the flexibility to customize the folder path to their own codebase.

### Bug Fixes & Improvements
- Fixed Module Registry old edit workflow that was failing with 400 error codes
- Resolved module testing issues when enforce git experience was enabled, ensuring test pipelines can be created successfully
- Fixed onboarding module "View details" link returning 404 errors, improving navigation between pipeline executions and module details
- Resolved "y is not a function" error when updating module registry entries, ensuring smooth module management operations
- Improved OIDC Enhanced Subject Field compatibility for IaCM services to ensure proper authentication in enterprise environments
- Fixed IaCM Provider Registry bugs including incorrect service discovery path and double HTTPS protocol in download URLs
- Resolved intermittent Terraform state upload errors when uploading state data to Harness IaCM server
- Fixed cost estimation spinner that would not stop for non-IaCM stages
- Improved service account token authentication for IACM API endpoints
- Added empty state for cost estimation when user is not on an IACM stage
- Enhanced policy evaluation display by fixing white color rendering issue that made evaluations unreadable 
- Fixed an issue where the UI did not support the YAML structure for `resource_id` and `resource_address` when using the Import command in the Terraform/OpenTofu plugin step

---


## February 2026
### New Features & Enhancements
- **MCP server | [Docs](/docs/infra-as-code-management/platform-integrations/platform/iacm-mcp)** - Introduced native MCP Server support within Harness, enabling agents and assistants to connect directly to Harness resources and workflows through the MCP standard. This integration allows MCP-based tools to programmatically query, reason over, and automate actions across delivery and infrastructure operations (e.g., validating deployments, inspecting environments, or enforcing governance policies). It lays the foundation for AI-assisted automation directly from the IDE.
- **IDP integration | [Docs](/docs/infra-as-code-management/platform-integrations/idp/idp-plugin)** - Provides an improved developer experience by improving the IaCM plugin within IDP with richer context on infrastructure resources, detailed drill-down views, and high-level overviews. Customers wanted better visibility into managed resources directly from the portal, making it easier to understand infrastructure changes, troubleshoot faster, and operate more efficiently without leaving existing IDP workflows.
- **Terragrunt (Beta):** Added a Terragrunt resources sidebar in the Resources tab during pipeline execution and added OPA policy filtering per Terragrunt environment
- **Event-based log output** - Refactored Ansible Plugin for real-time event-based log output
- **Enhanced Ansible inventory management** - Added createdAt and lastSyncedAt timestamps to dynamic inventory hosts; dynamic inventory structure now matches static inventory for consistency
- **Python requirements support** - Added support for Ansible Plugin requirements.txt for Python dependencies
- **Preflight validation** - Implemented preflight playbook validation to catch errors early; added preflight inventory validation for better error prevention
- **Windows remote management support** - Added WinRM support to Ansible Plugin for Windows server management

### Bug Fixes & Improvements
- Improved the empty state UI for the Cost Estimation and Resources tabs when a Terragrunt workspace pipeline is running outside an IaCM stage
- Automatically select the Workspace Identifier when navigating to Runtime Inputs from Workspace default pipelines
- Fixed an issue where Terragrunt resources were incorrectly marked as "Drifted"
- Enhanced key file sanitization to only sanitize necessary files
- Fixed dynamic inventory host detection issues in Ansible IACM
- Resolved dynamic Ansible inventory variable UUID key issues for proper secret resolution
- Multiple high-severity vulnerability fixes across core components: fixed net/url vulnerabilities in iac-server, terraform plugins, and iacm-manager; resolved OpenTelemetry SDK vulnerabilities in terraform plugins; additional security patches for Docker images

---

## January 2026
### New Features & Enhancements
- **Ansible plugin verbosity control** - Added verbosity option to IACM Ansible Plugin for better debugging control
- **Enhanced variable management | [Docs](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables)** - Dynamic group static secret variables now resolve secret values properly; Ansible variables are now properly deleted and updated for static groups
- **Workspace templates | [Docs](/docs/infra-as-code-management/workspaces/workspace-templates)** Added the ability to override repository values in workspaces created from templates
- **Terragrunt (Beta):** Display drifted resources in Terragrunt workspaces
- Display the list of Terragrunt environments in the Approval side drawer during pipeline approval stages

### Bug Fixes & Improvements
- Fixed an issue where Terragrunt values appeared in Workspace Template YAML even when the Terragrunt workspace feature flag was disabled
- Fixed an issue where the Cost Estimation checkbox in the Workspace Configuration tab became disabled after being toggled
- Fixed an issue where the Cost Estimation component was missing from the Workspace Template creation screen
- Improved Ansible step debug logic for better troubleshooting
- Fixed Ansible Plugin panic when empty body is sent to prevent crashes

---

## Pre-2026 IaCM Release Notes

<details>
<summary>Release notes for 2025 and earlier</summary>

#### December 2025
##### New Features & Enhancements
- **OpenTofu 1.11.0 support | [Supported IaC frameworks](/docs/infra-as-code-management/whats-supported#supported-iac-frameworks)** - Added support for OpenTofu version 1.11.0 with latest features and improvements
- **Terragrunt (Beta):** Added Terragrunt support in Workspace Templates
- **Workspace templates:** Enabled Git Sync for Workspace Templates

##### Bug Fixes & Improvements
- Added a Cost Estimation column in the Activity History tab for Terragrunt workspaces
- Updated the Terragrunt icon in the UI
- Fixed an issue where IaCM workspaces in pipelines were always displayed as Terraform, instead of reflecting the correct workspace type
- Enhanced SSH key sanitization for Ansible Plugin to improve security
- Fixed JSON parsing issues with non-standard JSON in Ansible runs

---

#### November 2025
##### New Features & Enhancements
- **Ansible plugin refactor | [Docs](/docs/infra-as-code-management/configuration-management/ansible/overview)** - Complete refactor of Ansible Plugin architecture for improved stability and performance

##### Bug Fixes & Improvements
- Fixed an issue where OPA policy violation pop-ups did not appear on the Variables and Connector pages
- Added Terragrunt plugin steps to the Pipeline creation workflow
- General performance improvements and architectural enhancements

---

#### October 2025
##### New Features & Enhancements
- **Terragrunt (Beta) | [Docs](/docs/infra-as-code-management/get-started/#terragrunt)** 
  - Added comprehensive support for Terragrunt workspaces including drift detection, cost estimation, and OPA policy integration
- **Provider registry beta | [Docs](/docs/infra-as-code-management/registry/provider-registry)** 
  - Advanced provider registry capabilities with custom provider support
- **Variable sets | [Docs](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables#variable-sets)** 
  - Introduced variable sets functionality for better configuration management
- **Custom Git tags for module registry | [Docs](/docs/infra-as-code-management/registry/module-registry/module-registry-overview#registeredmodulesettings--top-level-overview)** 
  - Added support for custom Git tags and monorepo configurations

##### Bug Fixes & Improvements
- Fixed template validation issues for provider connectors
- Improved error handling for SCM terraform parsing
- Enhanced module testing capabilities for terraform provider
- Resolved issues with workspace deletion functionality
- Fixed issues with Bitbucket SSH connector PR automation
- Improved Ansible plugin output and error handling
- Enhanced workspace resource management and display

---

#### September 2025
##### New Features & Enhancements
- **Enhanced pipeline support:** Added support for common pipeline steps in IaCM stages

##### Bug Fixes & Improvements
- Fixed various Ansible execution issues and improved error messaging
- Improved workspace configuration and management
- Resolved issues with cost estimation and drift detection

---

#### August 2025
##### New Features & Enhancements
- **Enhanced resource tracking:** Improved resource binding and management capabilities
- **Module registry improvements:** Better support for module versioning and management
- **Advanced configuration options:** Additional OpenTofu and Terraform configuration options including `target` and `replace` in the plan step. 

##### Bug Fixes & Improvements
- Fixed database connection issues for pricing API service
- Improved workspace template validation
- Resolved issues with connector authentication

---

#### July 2025
##### New Features & Enhancements
- **Enhanced resource management:** New resource tracking and management capabilities
- **Advanced workspace features:** Enhanced workspace configuration and management

##### Bug Fixes & Improvements
- Fixed issues with workspace resource display
- Improved template input handling
- Resolved various pipeline execution issues

---

#### June 2025
##### New Features & Enhancements
- **Module testing support | [Docs](/docs/infra-as-code-management/registry/module-registry/module-registry-testing)** 
  - Added capability to enable module testing for terraform modules
- **Resource management foundation:** Core infrastructure for advanced resource tracking
- **CLI improvements | [Docs](/docs/infra-as-code-management/cli-commands/cli-iacm-plan)** 
  Enhanced CLI functionality and permissions

##### Bug Fixes & Improvements
- Fixed various workspace and pipeline execution issues
- Resolved authentication and connector-related issues

---

#### May - IAC Server Version v1.143.0 & v1.145.0
<!-- Released on 5 May 2025 -->
##### Feature Improvements
- **Scoped repository selection in module registry:** Project-scoped repositories can now be used at the organization and account levels in the Module Registry. This enhancement gives you greater flexibility and control over where your modules are sourced from—making it easier to share and reuse IaC code across teams. (IAC-3476, IAC-3485)

👉 Get started by [registering a module](/docs/infra-as-code-management/registry/module-registry#register-a-module).

---
#### April - IAC Server Version 1.138.0
<!-- Released on 4 April 2025 -->

##### [New feature] Workspace wizard UI
**[Docs](/docs/infra-as-code-management/workspaces/create-workspace#create-a-new-workspace)**

The Workspace Wizard UI has been updated to improve usability and streamline the workspace creation process.
<DocVideo src="https://app.tango.us/app/embed/cfb68b54-eb46-42af-a622-5b76c9270598?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a IaCM Workspace in Harness" />

##### Feature Improvements
- **DevOps Essentials license enforcement:** The DevOps Essentials license is now enforced for IACM applications, ensuring compliance. We’ve also added license test scenarios to validate this functionality. (IAC-3379)

- **Module registry access:** You can now access the Module Registry at both the project and account levels within IACM. If you access it at the project level, a warning banner will notify you that all updates will be saved at the account level. (IAC-3367)

#### March 2025
##### IAC-Server: Version 1.126
<!-- Released on 18 March 2025 -->
##### New Features and Enhancements
- **Sparse checkout:** You can now select [the Sparse Checkout option in your workspace configuration](/docs/infra-as-code-management/workspaces/workspace-tabs#advanced-options) to specify patterns for selective repository checkout. (IAC-3194, IAC-3196)

- **Workspace enhancements:** When updating workspaces, your custom pipelines are now preserved, ensuring they won’t be overwritten by project default pipelines. We’ve also resolved an issue with the Policy Sets modal not rendering properly. (IAC-3206)

- **User experience improvements:** Template creation now provides specific error messages for missing fields, helping you quickly identify and address issues. (IAC-3225)

- **Monaco Diff editor:** The Monaco Diff editor now displays accurate before/after YAML views, ensuring a clearer understanding of changes. (IAC-3207)

**Security and configuration updates**
- **mTLS support:** mTLS support has been added to the IAC server to enhance secure communication. You can also configure optional TLS settings for the IAC server client. (IAC-3188, IAC-3197)
- **Permission checks:** Permission checks have been added to ensure you only access workspaces you are authorized to view. (IAC-3203)

**New APIs and features**
- A new API endpoint allows you to retrieve all resource changes across every stage of a pipeline execution, including workspace identifiers for better traceability. (IAC-3187)
- You can now include a Module ID in IaCM pipeline steps, enabling more detailed tracking and configuration. (IAC-3339)
- Module executions now return trigger information, giving you better insights into execution origins. (IAC-3192)

**Other enhancements**
- Helm charts now use the `imagePullSecret` from your global settings, streamlining configuration management. (IAC-3219)
- Storybook tooling has been added to support UI testing, making it easier to validate interface changes. (IAC-3291)
- The prepare exec flow and default pipeline feature flags have been removed to simplify your workflows. (IAC-3295)

##### Fixed Issues
**[Module registry](../docs/infra-as-code-management/registry/module-registry):** Sparse Checkout and submodule options are now hidden for repositories in the Module Registry, improving clarity and usability. (IAC-3277)

**Sensitive data handling:** We’ve resolved an issue where non-sensitive data was incorrectly marked as sensitive in plans and state files, as well as during sensitive data pruning. (IAC-3261)

**Cost changes:** Fixed an issue where cost changes displayed duplicate items, ensuring accurate reporting. (IAC-3215)

---
#### February 2025
##### IAC-Server: Version 1.116.0 & IAC-Manager: Version 1.61.4
<!-- Released on 7 February 2025 -->
##### New Features and Enhancements
- **Module registry:** We've introduced the Module Registry, a centralized repository that allows you to manage and publish versions of pre-built infrastructure modules. This feature supports versioning, enhances search functionality, and integrates seamlessly with existing IaCM configurations, all while providing detailed access control settings. 
  ###### What you need to know:
  - **Prerequisites:** Ensure your Harness connectors are set up, or if using a delegate, it should be version `25.01.85000` or later.
For more information, check out the [Module Registry Documentation](/docs/infra-as-code-management/registry/module-registry).

##### IAC-Manager: Version 1.57.0
- **OpenTofu/Terraform import:** Harness Pipelines now support the [tofu/terraform import](/docs/infra-as-code-management/cli-commands/terraform-plugins/#import) command, allowing you to bring existing infrastructure under IaC control.

#### August 2024
##### IAC-Server 1.50.0 and IAC-Manager: 1.32.0
<!-- Released on 27 August 2024 -->
###### New features and enhancements
- **Sensitive data removal:** IACM now supports a feature flag that will remove all sensitive data from your plan and state. This can only be used in conjunction with an OpenTofu/Terraform remote backend and offers advanced security with reduced feature set. We recommend contacting Harness support if you are interested in trying this functionality. (IAC-2281)
- **Workspace expression:**  Enhanced the usage and readability of workspace expressions (IAC-2187)
  - For example, referencing a terraform or OpenTofu variable can be done at workspace level.

  ```bash
  // OLD
  <+pipeline.stages.s1.spec.execution.steps.init.spec.envVariables.PLUGIN_WS_TF_VAR_OPEN_TOFU_VAR>

  // NEW
  <+workspace.variables.OPEN_TOFU_VAR>
  ```

#### June 2024
##### Version IAC-Server: 1.17.0
<!-- Released on 04 June 2024 -->

###### New features and enhancements
- **Support for commit SHA:** Introduced the ability to add commit SHA options to configuration and Terraform variable files. (IAC-1961)
- **Workspace expression:** Enabled setting expressions for workspace values within an IACM stage. (IAC-2002)

##### Version IAC-Server: 1.15.0
<!-- Released on 04 June 2024 -->

###### New features and enhancements
- **Filter persistence:** Enhanced filtering capabilities by ensuring the persistence of filter values. (IAC-1938)

###### Fixed issues
- **Workspace type setting:** Corrected default values to accurately set the workspace type. (IAC-1970)

#### May 2024

##### Version IAC-Server: 1.10.0
<!-- Released on 02 May 2024 -->

###### New features and enhancements
- **Cost estimation breakdown:** Added the option to select multiple workspaces with associated costs in the cost estimation breakdown screen. (IAC-1835)

#### April 2024

##### Version IAC-Server: 0.186.0
<!-- Released on 18 April 2024 -->
###### New features and enhancements
- **Copy resource values:** Improved the user experience of the resource review screen and added the ability to copy resource values. (IAC-589)
- **Approval screen - actioned by:** Displayed the user who actioned the approval in the IACM approval step when viewing and executing it. (IAC-1699)
- **Provider check for var file:** Implemented a provider check when editing a var file to ensure access to repositories and branches. (IAC-1701)

##### Version IAC-Server: 0.181.0
<!-- Released on: 04 April 2024 -->
###### Layout & design refinement:
  - **Enhanced layout:** Increased spacing around store cards to prevent overlap of check marks and enhance readability and accessibility. (IAC-1601)
  - **Sensitive field icons:** The eye/hide icon is now exclusively used with sensitive fields to improve privacy and clarity. (IAC-1694)
---

#### March 2024
##### Version IAC-Server: 0.178.0
<!-- Released on: 25 March 2024 -->
###### New features and enhancements
  - **Connector validation enhancement:** We've implemented a validation check for connectors when creating or editing workspaces. This update ensures that all connectors used are currently available and of the correct type before proceeding with the operation, to help prevent errors related to non-existent or incorrect type connectors, enhancing the reliability and efficiency of workspace management. (IAC-1602)

##### Version IAC-Server: 0.176.0
<!-- Released on: 21 March 2024 -->
###### New features and enhancements
  - **Enhanced lock icon tooltips and warnings:** We've updated the tooltips and warning messages for the **lock icon** in Workspace resources to improve clarity and accessibility. (IAC-1577)

##### Version IAC-Server: 0.175.0
<!-- Released on: 15 March 2024 -->
###### Fixed issues
  - **Improved header visibility:** We resolved the issue of overlapping headers in side-by-side workspace state comparisons, enhancing readability and accessibility for the **View Execution** and **filename** headers. (IAC-1573)
  - **Planned changes count accuracy:** We refined the **Planned changes** count to include only **Added, Changed, and Deleted** resources, excluding **Unchanged** resources, for a more accurate reflection of significant changes. (IAC-1561)
---

#### February 2024
##### Version IAC-Server: 0.152.0
<!-- Released on: 08 February 2024 -->
###### Fixed issues
- **Improved variable deletion permissions:** Fixed an oversight where permissions for variable deletion were not checked during workspace updates. Previously, checks were only performed via the */variable* endpoint using the **DELETE method**. This update ensures that permissions are verified against both the individual deletions and the broader workspace variable updates, maintaining security without modifying the core architecture between **iac-server** and **sprox**. (IAC-1362)
</details>