---
title: Created Resources
description: Understand the resources created by HSF.
sidebar_position: 2
---

After HSF is deployed will have the following resources in your account:

### Service Accounts
A service account named `harness-platform-manager` is created at the account level. This service account has admin privileges and is responsible for provisioning and managing the resources necessary for running HSF workflows.

### Variables
To support IDP workflows, four account-level variables are also created. These variables store key configuration values, including the project name, organization name, connector information, and platform URL. They enable workflows to dynamically locate and interact with the correct components and environments within Harness.

### Organizations
All HSF-related resources are organized under a newly created organization named `harness-platform-management`. This organization serves as the central location for all projects, configurations, and access controls associated with the HSF deployment.

### User Groups
Within this organization, two user groups are established: `hsf-admin` and `hsf-user`. The `hsf-admin` group has organization admin privileges and is intended for platform administrators and users managing the implementation of HSF. The `hsf-user` group, by contrast, is granted organization viewer privileges and is designed for broader team access to view and use the workflows without elevated permissions.

### Secrets
Secrets are also created at the organization level to securely manage authentication and access credentials. The first, named `HSF Platform API Key`, stores the secret value associated with the harness-platform-manager service account. This key is managed by a pipeline that automatically handles rotation to maintain security best practices.

### Projects
Several projects are initialized within the `harness-platform-management` organization. 
- The `Solutions Factory` project contains all the core pipelines and configurations required to manage HSF.
- The `Image Factory` project is the target destination for the deployment of CI image factory. In the future it will house all of the HSF image specific factories. 
- The `Delegate Management` project is the target destination for the delegate image factory. 

### Pipelines
The Solutions Factory project includes eight pipelines, each designed to perform a specific role in the HSF lifecycle. The initial deployment of the framework automatically provisions four of these pipelines: Manage Pilot Light, Rotate HSF Token, Deploy Solutions Factory, and Mirror Harness Official Solutions Factory Repository.
- The `Deploy Solutions Factory` pipeline handles additional configuration tasks related to setting up and managing the HSF deployment. It ensures that the target environment is properly initialized and ready to operate.
- The `Mirror Harness Official Solutions Factory Repository` pipeline is responsible for cloning and copying data from the official HSF repository into your target Harness account. It also manages the synchronization of updates during future releases, effectively keeping your local copy aligned with the source of truth.
- The `Register IDP Templates` pipeline automatically imports all available templates from the harness-template-library and registers them into your IDP instance. This ensures that your IDP has access to the full suite of templates required to power self-service workflows.
- The `Rotate HSF Token` pipeline handles secure token rotation for the harness-platform-manager service account. 
- The `Manage Pilot Light` pipeline applies updates and changes to the core HSF framework. It is used to maintain and evolve the foundational infrastructure that supports the overall platform.
- The `Create and Manage IACM Workspaces` pipeline is invoked at the start of each workflow execution. It provisions and manages IACM workspaces, ensuring that the required infrastructure is in place before any resource provisioning begins.
- The `Provision Workspace` pipeline will be used for apply only executions and will be one of the pipelines that is separated out from Execute IACM Workspaces. 
- The `Execute IACM Workspaces` pipeline is responsible for executing the IACM workspace by applying the selected templates and provisioning the actual Harness resources defined within the workflow.

### Workspaces 
Two IACM workspaces are created as part of the HSF framework:
- The `Harness Pilot Light` workspace manages and controls the core framework components. 
- The `Harness Solutions Factory` workspace manages the “engine” layer of HSF, including the logic for requests made via IDP and the execution and provisioning of associated resources. This is the workspace that handles the practical implementation of self-service requests.

### Repositories
There are three repositories included in the deployment and exist under the organization level. You can find them under Harness Platform Management (organization) → Solutions Factory (account) → Code Repository (module) → Repositories:
- The `harness-solutions-factory` repository houses all of the source code that is required to standup and run Harness Solutions Factory.
- The `harness-template-library` repository houses all of the scaffold and templates for how to manage Harness resources.
- The `harness-delegate-setup` repository serves as an example of how to build a custom Harness Delegate and automate the addition of tools into the delegate.