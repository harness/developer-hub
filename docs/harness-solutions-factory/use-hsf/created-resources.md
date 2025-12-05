---
title: Created Resources
description: Understand the resources created by HSF.
sidebar_position: 1
---

After HSF is deployed you will have the following resources in your account:

**Service Account**

A service account named `harness-platform-manager` is created at the account level. This service account has admin privileges and is responsible for provisioning and managing the resources necessary for running HSF workflows.

**Variables**

To support IDP workflows, account-level variables are created. These variables store key configuration values, including the project name, organization name, connector information, and platform URL. They enable workflows to dynamically locate and interact with the correct components and environments within Harness. The variables created are:

| Variable | Description and Example |
| --- | --- |
| solutions_factory_project | The project name of where Solutions Factory is deployed. <br /> **Example:** Solutions_Factory |
| solutions_factory_endpoint | The endpoint of where Solutions Factory is deployed. <br /> **Example:** https://app.harness.io |
| solutions_factory_org | The organization of where Solutions Factory is deployed. <br /> **Example:** Harness_Platform_Management |
| solutions_factory_template_library_connector | Connector for Harness Template Library. <br /> **Example:** org.Harness_Template_Library_Repo |
| solutions_factory_template_library_repo | URL of where HTL lives. <br /> **Example:** https://git.harness.io/[accountid]/Harness_Platform_Management/harness-template-library.git |
| custom_template_library_connector | Connector for Custom Template Library. <br /> **Example:** org.Custom_Harness_Template_Library_Repo |
| custom_template_library_repo | URL of where Custom Template Library lives. <br /> **Example:** https://git.harness.io/[accountid]/Harness_Platform_Management/custom-harness-template-library.git |
| enable_hsf_mini_factory | Flag to indicate if IDP workflows will default to leveraging the mini-factory to distribute workloads <br /> **Example:** false |

**Organizations**

All HSF-related resources are organized under a newly created organization named `Harness Platform Management`. This organization serves as the central location for all projects, configurations, and access controls associated with the HSF deployment.

**User Groups**

Within the `Harness Platform Management` organization, two user groups are created at the account level: 
- `HSF Admins` has organization admin privileges and is intended for platform administrators and users managing the implementation of HSF (usually the platform engineering team). This group of users will also be the ones who can approve changes and will get email notifications if this setting is set.
- `HSF Users` are granted organization viewer privileges and is designed for broader team access to view and use the workflows without elevated permissions.

At the organization level one user group is created: 
- `HSF Mirror Reviewers` this group has the ability to review new PR updates that are published by the HSF team and can merge them into the account. 

**Secrets**

Secrets are also created at the organization level to securely manage authentication and access credentials. `HSF Platform API Key`, stores the secret value associated with the `harness-platform-manager` service account. This key is managed by a pipeline that automatically handles rotation to maintain security best practices.  `hsf_harness_stub_secret_key` and `hsf_harness_stub_access_key` are also created but will be removed in a future update because they are no longer being used.

**Projects**

Several projects are initialized within the `Harness Platform Management` organization.

- The `Solutions Factory` project contains all the core pipelines and configurations required to manage HSF.
- The `Image Factory` project is the target destination for the deployment of CI image factory. In the future it will house all of the HSF image specific factories.
- The `Delegate Management` project is the target destination for the delegate image factory.

**Pipelines**

The Solutions Factory project includes sixteen pipelines, each designed to perform a specific role in the HSF lifecycle. 

- The `Deploy Solutions Factory` pipeline handles additional configuration tasks related to setting up and managing the HSF deployment. It ensures that the target environment is properly initialized and ready to operate and is used during upgrades and configuration changes.
- The `Manage Pilot Light` pipeline applies updates and changes to the core HSF framework. It is used to maintain and evolve the foundational infrastructure that supports the overall platform.
- The `Mirror Harness Official Solutions Factory Repository` pipeline is responsible for cloning and copying data from the official HSF repository into your target Harness account. It also manages the synchronization of updates during future releases, effectively keeping your local copy aligned with the source of truth.
- The `Unpack Solutions Factory` pipeline unpacks the Solutions Factory.
- The `Register Official IDP Templates` pipeline automatically imports all available templates from the harness-template-library and registers them into your IDP instance. This ensures that your IDP has access to the full suite of templates required to power self-service workflows.
- The `Register Custom IDP Templates` pipeline automatically imports all available templates from the custom-harness-template-library and registers them into your IDP instance.
- The `Rotate HSF Token` pipeline handles secure token rotation for the `harness-platform-manager` service account.
- The `Create and Manage IACM Workspaces` pipeline is invoked at the start of each workflow execution. It provisions and manages IACM workspaces, ensuring that the required infrastructure is in place before any resource provisioning begins. It also registers resources in IDP.
- The `Provision Workspace` pipeline plans and applies workflows (with built-in approvals).
- The `Plan and Validate IACM Workspace` pipeline verifies Terraform code.
- The `Execute Drift Analysis` pipeline identifies configuration drift from source code.
- The `Teardown IACM Workspace` pipeline removes workspaces (with built-in approvals).
- The `Bulk Workspace Management` pipeline allows for bulk operations against IACM workspaces.
- The `Bulk Workspace IDP Registration` pipeline allows for backwards compatibility from older version to bulk register resources into IDP.
- The `Deploy HSF Factory Floor to Project` pipeline initializes HSF Factory Floor in a new or existing project.
- The `Rotate Harness Service Account Token and Secret` pipeline rotates a Harness Service Account token and updates a Harness Secret with that value.

**Workspaces**

Two IACM workspaces are created as part of the HSF framework:

- The `Harness Pilot Light` workspace manages and controls the core framework components.
- The `Harness Solutions Factory` workspace manages the “engine” layer of HSF, including the logic for requests made via IDP and the execution and provisioning of associated resources. This is the workspace that handles the practical implementation of self-service requests.

**Repositories**

There are three repositories included in the deployment and exist under the organization level. You can find them under Harness Platform Management (organization) → Solutions Factory (account) → Code Repository (module) → Repositories:

- The `harness-solutions-factory` repository houses all of the source code that is required to standup and run Harness Solutions Factory. A code branch rule called `harness_solutions_factory_codeowners` is created in this repository.
- The `harness-template-library` repository houses all of the scaffold and templates for how to manage Harness resources. A code branch rule called `harness_solutions_factory_codeowners` is created in this repository.
- The `custom-harness-template-library` repository houses customized templates created to support Harness entity management and provisioning.