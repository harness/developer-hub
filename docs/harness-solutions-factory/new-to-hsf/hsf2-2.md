---
title: Harness Solutions Factory 2.2 Overview
description: Comprehensive overview guide to HSF 2.2
sidebar_label: HSF 2.2 Overview
sidebar_position: 30
---

Harness Solutions Factory 2.2 introduces new features focused on governance and scalability. It also integrates with IDP 2.0 leveraging its new features and adding in capability to HSF. Here’s what’s new: 

- Added **support for IDP 2.0** features including hierarchy support, entity management and registration and RBAC.
- **Enhanced template library workflow registration control** for workflows in IDP 2.0 to provide a customized experience where you only see the workflows relevant to your modules and use cases.
- Introduced the ability to create one-time execution pipelines, **ephemeral workspaces**, that do not maintain state.
- Added governance options allowing **approvals** during workspace creation
- Redesigned workspace pipelines for better visibility and usability; integrated into workspace defaults.
    - **Provision Workspace:** Plan and applies workflows (with built-in approvals)
    - **Plan and Validate:** Verifies Terraform code
    - **Drift Analysis:** Identifies configuration drift from source code
    - **Teardown:** Removes workspaces (with built-in approvals)
- Added the ability to run **bulk operations** on pipelines.

## Upgrade to 2.2

*You can get the current version of HSF by going to Code Repository → Harness Solutions Factory → Tags*

1. Manually delete all the workflows that are associated with HSF. There should be 16 of them.
2. Go to **Solutions Factory** Project and navigate to Pipelines and run **Mirror Harness Official Solutions Factory Repos** to pull and get the latest updates
    - You can double check this ran properly by going into your Code Repository at the organization level (Harness Platform Management) and note when it was last updated.
3. Run **Manage Pilot Light**
    - We’ve made a couple changes that should be reflected. Some to highlight:
        - A new variable that is added is **hsf_iacm_manager_plugin** with the value of **harnesssolutionfactory/harness-manage-iacm-workspace:latest**. It is used to seed the deployment of the Solutions Factory workspace.
        - A change that was made was to lock in provisioner versions so that it can be changed and updated within Harness
4. Go to **Harness Solutions Factory** workspace and add in a custom OpenTofu variable. This needs to be done manually because it is needed to manage entities
    - **Key**: hsf_idp_resource_mgr_image **Value**: harnesssolutionfactory/harness-idp-resource-manager:latest
5. Run **Deploy Solutions Factory** pipeline
6. Go into Account Settings → User Groups → HSF Admins → Email and check the box ‘Sends emails to all users of the user group’
    - We have introduced approvals in this upgrade and by checking this all approval emails will go to this user group.
7. Run **Register Official IDP Templates** pipeline
    - **Note:** it is the same pipeline ID as before but it was renamed because we now have a Register Custom IDP template which uses the connector set at the account level to register custom templates.
    - This pipeline now uses IDP stages to cut down on overhead.
8. Run **Bulk Workspace IDP Registration** pipeline. With the upgrade there are tags that are added to workspaces to identify the source and type - this is what allows for bulk edits. So you don’t have to modify every single one and add tags, run this pipeline. It will also strip out the AWS connector that has been depreciated, generate the IDP resource, and publish it back into the catalog.
9. The upgrade is now complete!