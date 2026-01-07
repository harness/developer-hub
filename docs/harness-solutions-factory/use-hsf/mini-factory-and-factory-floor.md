---
title: Mini Factory and Factory Floor
description: Understand Mini Factory and Factory Floor 
sidebar_position: 3
---

## Mini Factory

Before HSF 2.3 everything that was created through the HSF existed as workspaces in the Solutions Factory project. The Mini Factory concept brings individual "factory" projects to each organization, whereas when resources are requested for a particular organization, the workspace is created in the factory project under the same organization. This can ease the operational burden of colocating all HSF resources (workspaces) in one project.

### How to Enable Mini Factory:

1. Go into the `Harness Solutions Factory` workspace and set `enable_hsf_mini_factory` to `true`
2. Run `Deploy Solutions Factory`
3. Re-run the "Register Offical IDP Templates" and "Register Custom IDP Templates" pipelines

Once enabled, when you create a new organization a factory floor will be created. A **Factory Floor** consists of 6 pipelines: 

- Create and Manage IACM Workspaces
- Teardown IACM Workspace
- Execute Drift Analysis
- Provision Workspace
- Plan and Validate IACM Workspace
- Bulk Workspace Management

These are the standard pipelines that are required to run all of the provisioning of Harness.

:::note
To enable the mini-factory on existing organizations, run the "Deploy HSF Factory Floor to Project" pipeline for each organization. Enter `hws_<Existing Organization ID>` for "Project_ID" and make sure "Deployment Type" is set to `mini-factory`
:::