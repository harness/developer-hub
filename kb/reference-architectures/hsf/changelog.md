---
title: Changelog
description: Changelogs and improvements to Harness Solutions Factory.
sidebar_position: 5
---

## September 2025
- Fixed issue with RESOURCE_VARS_ENVS_SECRETS typo
- Added CI Golden Standard Template and documentation to provide Day-One support for standard Containerized Application builds
- Fixed issue with Ci-Module-Primer to support setting the docker connector during setup

## August 2025
- Updated Register IDP Templates Workflow to support single directory load and customized registration file name and path
- Updated Create And Manage pipeline to resolve IACM changes impacting ephemeral workspaces
- Fixed issue with Teardown pipeline due to removal of workspace during execution of stage causes an error

## July 2025
- HSF 2.2 Upgrade to fully support IDP 2.0 release
    - Updated registration IDP workflow process to use new module
    - Updated Create and Manage Workspaces Flow to Register IDP resource as part of execution
    - Updated Provision Workspace workflow to support IDP resource update
    - Added enhanced IACM pipelines and defaults
    - Enhanced ExecuteIACMWorkspace pipeline to support Ephemeral workspaces
    - Enhanced CreateManageIACM workspaces to streamline the entire pipeline and add optional approval
    - CreateManage pipeline to set the Git Repository Path as non-mandatory
    - CreateManageWorkspace to pass HARNESS_ACCT and HARNESS_API_KEY variables to plugin
    - PilotLight::HarnessAcctResources to submit email notifications to users when approval needed
    - Added Bulk Workspace Management Pipeline
    - Updated RemotePilotLight Setup
    - HSF AWS Connector marked for deprecation and remove 'provider_connector' from PilotLight and SolutionsFactory workspaces

## June 2025
- Added an org-level Dockerhub connector to be leveraged as the default connector for HSF pipelines

## May 2025
- Created and scanned HSF and HTL code repositories through Wiz
  - Outputted no vulnerabilities 
- Automated delegate deployment for easy scaling 
- Updated Python SDK image with recent APIs
- Tested HSF deployment against IDP 2.0
- Modified STO Primer templates to take CPU/MEM values as stage variables to pass to the pipeline
- Resolved issue with new plugin pipeline not copying hidden files

## April 2025
- Support custom repository connector and override plugin images 
- New custom template library scaffold repository created by default in Harness Code
- New account-level variables for managing the custom template library connector and repo paths
- All existing templates updated to support easier modification and conversion to customized versions
- Complete overhaul and update to the HTL scaffold documentation with details including:
  - Setting up local development
  - Creating new and Customizing existing templates
  - Managing the upgrade of your installation and the process to convert from Harness Cloud to Self-Hosted Kubernetes
- Remote Pilot light will generate the new customization repo dynamically based on a new Github Source Repo
- A new public GitHub repository for a `custom-harness-template-library` boilerplate has been published along with copies of the documentation included in the HTL
- Added CCM Cluster Orchestrator Deployment template
- Updated the IDP workflow to accommodate artifact managers within the central build farm workflow.
- Renamed a few variables for improved clarity and consistency.
- Moved Artifactory resources from cr to ar dir.
- Corrected a typo in the OCI Helm resource directory path.