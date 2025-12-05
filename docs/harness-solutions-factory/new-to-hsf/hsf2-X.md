---
title: Harness Solutions Factory 2.X Overview
description: Comprehensive overview guide to HSF 2.X
sidebar_label: HSF 2.X Overview
sidebar_position: 30
---

## HSF 2.3
:::note
HSF 2.3 was released in October of 2025
:::
Harness Solutions Factory 2.3 introduces major advancements, including seamless upgrades to new versions, ability for distributed workspace management, and new golden template options. Here’s what’s new: 

- Automatically manage new updates that are released by Harness via a **PR process** that you can merge when ready.
- Ability to have a **distributed yet governed setup** where each organization has its own Mini Factory but everything is still orchestrated and managed through the central Solutions Factory.
- Deploy the **Factory Floor** to any project for easy automation onboarding and/or workflow orchestration.

## HSF 2.2
:::note
HSF 2.2 was released in July of 2025
:::
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