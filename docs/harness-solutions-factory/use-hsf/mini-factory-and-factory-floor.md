---
title: Mini Factory and Factory Floor
description: Understand how Factory Floor and Mini Factory distribute HSF workspace management across projects and organizations.
keywords:
  - mini factory
  - factory floor pipelines
  - hsf mini factory setup
  - distributed hsf
tags:
  - hsf
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Before HSF 2.3, every resource created through HSF existed as an IaCM workspace in the single `Solutions Factory` project. As adoption grows, a single project that holds the state for every team, every organization, and every resource type becomes an operational burden.

**Factory Floor** and **Mini Factory** are the two building blocks of the distributed HSF model introduced in HSF 2.3. A Factory Floor is the set of core workspace pipelines deployed into a project so that project can run the HSF framework locally. A Mini Factory applies that idea per organization: each organization gets its own factory project, and resources requested for that organization are created as workspaces there instead of in the central `Solutions Factory` project. Both remain orchestrated and governed through the central Solutions Factory.

---

## What you will learn

- **Factory Floor:** What a Factory Floor is, which pipelines it deploys, and which projects it can be deployed to.
- **Mini Factory:** How the Mini Factory model changes where workspaces are created, and what stays in the central project.
- **How the two relate:** Why enabling Mini Factory results in a Factory Floor per organization.
- **How to enable each model:** The workspace variable and pipeline that turn on Mini Factory, and how to add a Factory Floor to an existing organization or project.

---

## Before you begin

This page assumes:

- **HSF 2.3 or later:** Mini Factory and the factory-floor model were introduced in HSF 2.3. Go to [Upgrade HSF](/docs/harness-solutions-factory/new-to-hsf/hsf-upgrade) to move to a supported version.
- **HSF Admin access:** Enabling either model means editing the `Harness Solutions Factory` workspace and running pipelines in the `Solutions Factory` project, which requires membership of the `HSF Admins` user group.
- **Familiarity with IaCM workspaces:** Every resource HSF creates is backed by a workspace. Go to [Workspaces](/docs/infra-as-code-management/workspaces/create-workspace) to understand how workspaces hold Terraform state and variables.

Go to [Created Resources](/docs/harness-solutions-factory/use-hsf/created-resources) to review the organization, projects, and pipelines a standard HSF deployment creates.

---

## Factory Floor

A **Factory Floor** is the set of core workspace pipelines applied to a project so that the project can run the HSF framework directly, rather than delegating execution to the central `Solutions Factory` project. This is what makes a distributed architecture possible: workflow orchestration and workspace management happen inside the consumer project.

Each Factory Floor deploys six pipelines:

- **Create and Manage IACM Workspaces**
- **Provision Workspace**
- **Plan and Validate IACM Workspace**
- **Execute Drift Analysis**
- **Teardown IACM Workspace**
- **Bulk Workspace Management**

These are the standard pipelines required to run all Harness provisioning. Go to [Created Resources](/docs/harness-solutions-factory/use-hsf/created-resources) to review what each pipeline does.

A Factory Floor can be deployed to any new or existing project using the **Deploy HSF Factory Floor to Project** pipeline. Deploy a Factory Floor on its own when you want to onboard a team that runs automation in its own project without the full Mini Factory model.

---

## Mini Factory

A **Mini Factory** brings an individual factory project to each organization. When resources are requested for a particular organization, the workspace is created in that organization's factory project instead of in the central `Solutions Factory` project. Each factory project receives a Factory Floor, so it has the six core pipelines it needs to provision and manage those workspaces locally.

The Mini Factory model distributes workspace management while keeping governance central: templates, approvals, and the core framework are still owned and orchestrated by the central Solutions Factory.

:::note
Enabling Mini Factory does not move workspaces that already exist. Workspaces created before enablement remain in the `Solutions Factory` project and continue to work there. Only workspaces created after enablement land in the per-organization factory projects.
:::

---

## Enable the distributed model

Turn on Mini Factory to get a factory project for every organization you create from that point on, or deploy a Factory Floor to a single existing organization or project.

<Tabs>
<TabItem value="mini-factory" label="Mini Factory" default>

Enabling Mini Factory changes the default placement for every new organization.

1. Navigate to the `Solutions Factory` project, then select **IaCM Workspaces**.
2. Select the `Harness Solutions Factory` workspace, then select the **Connectors and Variables** tab.
3. Set `enable_hsf_mini_factory` to `true`, then save the workspace configuration.
4. Navigate to **Pipelines**, then run **Deploy Solutions Factory**.
5. Run **Register Custom IDP Templates** so the workflow definitions in IDP target the per-organization factory projects.

Once enabled, a factory project with its own Factory Floor is created each time you create a new organization.

</TabItem>
<TabItem value="factory-floor" label="Factory Floor">

Use this path for organizations that already exist, or for any project that should run the HSF framework locally.

1. Navigate to the `Solutions Factory` project, then select **Pipelines**.
2. Run **Deploy HSF Factory Floor to Project**.
3. For **Project_ID**, enter `hws_<Existing Organization ID>`, where `<Existing Organization ID>` is the identifier of the target organization.
4. Set **Deployment Type** to `mini-factory`.
5. Repeat for each organization that needs a Factory Floor.

</TabItem>
</Tabs>

### Verify the deployment

Open the target project and confirm the six Factory Floor pipelines are present under **Pipelines**. If they are missing, check the execution logs of **Deploy Solutions Factory** or **Deploy HSF Factory Floor to Project** for failed stages.

---

## Related concepts

- [Created Resources](/docs/harness-solutions-factory/use-hsf/created-resources): Review every organization, project, pipeline, workspace, and variable HSF creates.
- [HSF overview and key concepts](/docs/harness-solutions-factory/new-to-hsf/overview): Understand how Factory Floor and Mini Factory fit alongside the template libraries, Hub, and operating modes.
- [Workflows overview](/docs/harness-solutions-factory/use-hsf/workflows/overview): Understand how a workflow submission becomes an IaCM workspace and pipeline execution.
- [HSF Hub](/docs/harness-solutions-factory/use-hsf/hsf-hub): Learn how to run HSF workflows as pipelines without a dependency on Harness IDP.
- [Upgrade HSF](/docs/harness-solutions-factory/new-to-hsf/hsf-upgrade): Move to HSF 2.3 or later to use the distributed model.
