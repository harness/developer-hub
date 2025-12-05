---
title: Mini Factory and Factory Floor
description: Understand Mini Factory and Factory Floor 
sidebar_position: 3
---

## Mini Factory

Before HSF 2.3 everything that was created existed in the Solutions Factory project under workspaces but now we are distributing Solutions Factory so that every project that gets created within a specific organization will end up in a dedicated project workspace, a Mini Factory, that is set aside to manage all of them. 

### How to Enable Mini Factory:

1. Go into the `Harness Solutions Factory` workspace and set `enable_hsf_mini_factory` to `true`.
2. Run `Deploy Solutions Factory`

Once enabled, when you create a new organization a factory floor will be created. A **Factory Floor** consists of 6 pipelines: 

- Create and Manage IACM Workspaces
- Teardown IACM Workspace
- Execute Drift Analysis
- Provision Workspace
- Plan and Validate IACM Workspace
- Bulk Workspace Management

These are the standard pipelines that are required to run all of the provisioning of Harness.