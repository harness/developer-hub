---
title: Changelog
description: Changelogs and improvements to Harness Solutions Factory.
sidebar_position: 900
---

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.3.8] - 2025-11-10

  - FIX: PilotLight::MirrorRepos to fix logic so that it will only trigger email notification when a new PR is created.

## [v2.3.7] - 2025-11-05

  - UPDATE: PilotLight::MirrorRepos pipeline to trigger conditional email notifications to org.HSF_Mirror_Reviewers group members when new Pull Requests are opened
  - UPDATE: PilotLight::terraform.tfvars.example to set correct value for MirrorRepos cron trigger
  - UPDATE: FactoryFloor::CreateManageWorkspaces to use the official HTL repo for IDP resource templates
  - UPDATE: FactoryFloor::CreateManageWorkspaces to skip removal of workspace on approval rejection if the workspace has been updated

## [v2.3.6] - 2025-11-04

  - UPDATE: SolutionsFactory::CreateManageWorkspaces pipeline to support conditional IACM execution based on workspace location
  - UPDATE: SolutionsFactory::CreateManageWorkspaces pipeline to support conditional IDP registration based on pipeline variables

## [v2.3.5] - 2025-10-20

  - FIX: FactoryFloor::CreateManage pipeline to resolve issue with removal of ephemeral IDP entities

## [v2.3.4] - 2025-10-16

  - FIX: PilotLight::MirrorRepos pipeline to resolve issue with DRONE_OUTPUT details

## [v2.3.3] - 2025-10-16

  - FIX: FactoryFloor::Locals to jsondecode node selectors when pulling from the workspace

## [v2.3.2] - 2025-10-16

  - FIX: SolutionsFactory::Bulk_Workspace_IDP_Registration pipeline resolve boolean issue

## [v2.3.1] - 2025-10-15

  - UPDATE: SolutionsFactory::Bulk_Workspace_IDP_Registration pipeline to include registration of IDP Layouts and Scorecards

## [v2.3.0] - 2025-10-15

  _HSF Mini-Factory support_

  - UPDATE: PilotLight::Support improved Token Rotation pipeline and expanded service account creation options
  - UPDATE: Makefile configuration
  - UPDATE: .gitignore to remove provider.tf from modules and add default example file into root of repo
  - ADD:    CoreFramework and move all SolutionsFactory IACM pipelines
  - ADD:    MiniFactory to provide scalable HSF environments
  - UPDATE: SolutionsFactory to leverage factory-floor model

## [v2.2.7] - 2025-10-10

  _Add HSF Adjustment step to configure branch rule merge-strategies_

  - UPDATE: PilotLight::Execute_IACM_Workspaces_ApplyOnly to add HSF Adjustment step to modify the merge strategies

## [v2.2.6] - 2025-10-09

  _Enhanced support for CODEOWNERS and Pull-Request approvals_

  - ADD:    HarnessPlatformUsergroup::hsf_mirror_reviewers
  - UPDATE: Pipeline::Mirror_Harness_Official_Solutions_Factory_Repos to add new Mirror Approval Group
  - UPDATE: CODEOWNERS to include `@org.HSF_Mirror_Reviewers`

## [v2.2.5] - 2025-10-06

  _Pull-Request Upgrade Support and Enhancements_

  Refactor PilotLight
  - UPDATE: Pipeline RotateToken to use IDP stage type
  - UPDATE: Pipeline MirrorRepo to use IDP stage type and modify pipeline to support PR based executions
  - ADD:    MirrorRepos Trigger configuration
  - ADD:    UnpackSolutionsFactory pipeline to be a self-contained unarchive pipeline that removes itself when done.
  - UPDATE: PilotLight workspace to remove unnecessary variables and configure default pipelines
  - UPDATE: SolutionsFactory workspace to remove unnecessary variables and configure default pipelines
  - UPDATE: all IACM stages to use OpenTofuPlugin steps

  Refactor SolutionsFactory
  - UPDATE: Pipelines and layouts to regorganize templates
  - REMOVE: Deprecated items and resources no longer in use
  - UPDATE: Register_IDP_Templates to remove layout and scorecard setup no longer required
  - ADD:    Moved and Removed blocks to handle restructuring

  Refactor RemotePilotLight
  - REMOVE: PilotLight::RemotePilotLight feature and moved to a different repository
  - UPDATE: PilotLight Locals to change default repo source locations


## [v2.2.4] - 2025-09-09

  - UPDATE: SolutionsFactory::CreateIacmWorkspace to resolve a typo in the Manage_IACM_Workspace step plugin settings

## [v2.2.3] - 2025-09-01

  - FIX: Issue with Teardown pipeline due to removal of workspace during execution of stage causes an error

## [v2.2.2] - 2025-08-28

  - UPDATE: SolutionsFactory:: CreateAndManage pipeline to resolve IACM changes impacting Ephemeral workspaces
  - UPDATE: SolutionsFactory::RegisterIDPTemplates to support single directory load and customized registration file name and path

## [v2.2.1] - 2025-07-31

  - UPDATE: Register_IDP_Templates pipeline to remove legacy parameters and improve the variable setup

## [v2.2.0] - 2025-07-30

  - HSF 2.2 Upgrade to fully support IDP 2.0 release
  - UPDATE: PilotLight::CreateManage for remote-pilot-light
  - UPDATE: HSF AWS Connector marked for deprecation and remove 'provider_connector' from PilotLight and SolutionsFactory workspaces
  - UPDATE: RemotePilotLight Setup
  - UPDATE: Registration IDP workflow process to use new module
  - UPDATE: Create and Manage Workspaces Flow to Register IDP resource as part of execution
  - UPDATE: Provision Workspace workflow to support IDP resource update
  - UPDATE: Add enhanced IACM pipelines and defaults
  - UPDATE: Enhance ExecuteIACMWorkspace pipeline to support Ephemeral workspaces
  - UPDATE: Enhance CreateManageIacm workspaces to streamline the entire pipeline and add optional approval
  - UPDATE: CreateManage pipeline to set the Git Repository Path as non-mandatory
  - UPDATE: CreateManageWorkspace to pass HARNESS_ACCT and HARNESS_API_KEY variables to plugin
  - UPDATE: PilotLight::HarnessAcctResources to submit email notifications to users when approval needed

## [v2.1.6] - 2025-06-26

  - ADD: Org-level Dockerhub connector to be leveraged as the default connector for HSF pipelines

## [v2.1.5] - 2025-04-30

  - Support Custom repository connector and override plugin images
  - UPDATE: PilotLight configuration to support passing connector and image overrides
  - UPDATE: SolutionsFactory configuration to support passing connector and image overrides
  - UPDATE: PilotLight to set initial_admin_user as member of HSF_Users
  - UPDATE: PilotLight::Workspace::SolutionsFactory to set initial variables for image and connector management
  - UPDATE: MirrorRepositories pipeline to set any missing SolutionsFactory workspace variables
  - UPDATE: README documentation

## [v2.1.4] - 2025-04-15

  - UPDATE: PilotLight to configure a new custom template library repository from scaffold repo

## [v2.1.3] - 2025-03-31

  - UPDATE: PilotLight::Repository setup to include repo_owners override for repo rules

## [v2.1.2] - 2025-03-31

  - UPDATE: PilotLight::Modules::CodeRepository::Main to add default branch rules
  - UPDATE: .harness/CODEOWNERS

## [v2.1.1] - 2025-03-03

  - UPDATE SolutionsFactory::Configure HSF_ENABLED flag
  - UPDATE: PilotLight::Remote-Pilot-Light workflow to support account-specific urls
  - UPDATE: SolutionsFactory::RegisterIDPTemplates to leverage hsf_url variable

## [v2.1.0] - 2025-02-05

  - UPDATE: SolutionsFactory::CreateManageIACM workspaces to integrate with ManageIacmWorkspace plugin
  - UPDATE: SolutionsFactory::Pipeline::RegisterIDP to use python script process
  - UPDATE: PilotLight::RotateToken to use new plugin harness-token-rotation
  - UPDATE: PilotLight::Pipelines::ManagePilotLight to add an approval check
  - UPDATE: PilotLight::Templates::Pipelines Mirror Repos to use new plugin - harness-cr-mirror-repositories

## [v2.0.10] - 2024-12-04

  - Support HSF Admins and User setup and permission scoping

## [v2.0.9] - 2024-11-27

  - UPDATE: Pipelines to include delegate_selectors

## [v2.0.8] - 2024-11-22

  - UPDATE: PilotLight setup custom template library
  - UPDATE: .gitignore to skip macos system files
  - UPDATE: PilotLight to include new default custom template library repo and connector
  - UPDATE: PilotLight::Mirror pipeines to resolve issue with workspace variable expansion in the code

## [v2.0.7] - 2024-11-08

  - UPDATE: PilotLight::MirrorRepos update the workspace change steps to isolate working_dir
  - UPDATE: SolutionsFactory::RegisterIDPWorkflow pipeline to handle large datasets
  - FIX: RemotePilotLight image reference missing when configured for K8s deployments

## [v2.0.6] - 2024-10-29

  - UPDATE: PilotLight Token Rotation issues with incremental retries and disabled by default schedule
  - UPDATE: SolutionsFactory::RegisterIdpTemplate pipeline null handler to unset variable when sent via API with null

## [v2.0.5] - 2024-10-22

  - UPDATE: SolutionsFactory::RegisterIdpTemplate pipeline null handler
  - UPDATE: Ignore PlatformToken and RotationSchedule changes
  - ADD:    Support for new HSF Rotation pipeline to schedule admin account token rotation
  - UPDATE: Remote Pilot light to trigger the rotation on execution
  - UPDATE: PilotLight and SolutionsFatory to default to using build-farm delegate selectors
  - FIX:    SolutionsFactory::RegisterIDP not handing empty filter correctly
  - UPDATE: IDP Workflow for PilotLight
  - UPDATE: SolutionsFactory::RegisterIDP to support filtered and children imports

## [v2.0.4] - 2024-10-15

  - UPDATE: PilotLight to support dry_run executions of IACM pipelines
  - UPDATE: SolutionsFactory to support dry_run executions of IACM pipelines

## [v2.0.3] - 2024-10-14

  - UPDATE: PilotLight::HSF_Admin membership ignore user changes

## [v2.0.2] - 2024-10-14

  - UPDATE: SolutionsFactory::Create_and_Manage template to set `INCLUDE_HARNESS_ENVS` default setting to `false`
  - UPDATE: PilotLight::AcctResources lifecycle hooks for HSF admins group

## [v2.0.1] - 2024-10-04

  - UPDATE: PilotLight to include default variable for HSF Template Library Connector

## [v2.0.0] - 2024-10-01

  - ADD: harness_code_repository_tpl_official connector
  - UPDATE: PilotLight Modifications and normalizations
  - UPDATE: SolutionsFactory refactoring and updates
  - UPDATE: Workspace::SolutionsFactory connector details for git
  - UPDATE: HSF::PilotLight RemotePilotLight workflow
  - REMOVE: TemplateLibrary code
  - REMOVE: template library scaffolds
  - UPDATE: Refactor SolutionsFactory code
  - UPDATE: RemotePilotLight code
  - UPDATE: IACM pipeline model
  - FIX: incorrect variable in PilotLight Workspace

## [v1.1.0] - 2024-08-27

  - UPDATE: SolutionsFactory::CreateManageIACM to resolve issue when used with ecs delegate and removing workingdir cleanup
  - UPDATE: PilotLight::IDP catalog template to pass remote_account_url variable to workspace
  - Fix issue with harness_platform_url
  - UPDATE: TemplateLibrary::CentralBuildFarm dockerhub url details
  - UPDATE: TemplateLibrary::DelegateImageFactory to support HarnessCloudBuilds

## [v1.0.5] - 2024-08-19

### Initial Release
- Initial version of Harness Solutions Factory
