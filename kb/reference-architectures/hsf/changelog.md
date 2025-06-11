---
title: Changelog
description: Changelogs and improvements to Harness Solutions Factory.
sidebar_position: 4
---

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