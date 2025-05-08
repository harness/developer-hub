---
title: Get Started with Workflows [2.0]
sidebar_position: 8
sidebar_label: Get Started with Workflows [2.0]
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Service and Infrastructure onboarding** in today’s world is slow, manual and tedious. Developers often spend days—or even weeks—setting up new software and completing Day-2 operations. This inefficiency arises from either waiting for ticket resolutions (TicketOps) or manually handling repetitive tasks, which results in a poor developer experience and decreased productivity.

Harness IDP addresses these challenges with **Self-Service Workflows**.

Workflows enable developer self-service by automating manual tasks and processes. Using Workflows, platform engineering teams can:
- Automate new service onboarding.
- Simplify Day 2 operations for developers.
- Provide developers with **golden paths** to production that include guardrails and best practices.

This guide will take you through the journey of creating, configuring and executing a Workflow.

## What's new for Workflows in IDP 2.0?
Harness IDP 2.0 represents a major evolution of the Internal Developer Portal, built on a Harness-native data model designed for enterprise-scale environments and robust access control. Here's what’s changing in IDP 2.0 for **Workflows**:

- **Harness-native Platform Hierarchy:** Workflows now support Account, Org, and Project scopes, with built-in, fine-grained RBAC.

- **No YAML Required:** Create and modify Workflows directly within the UI—no need to manage YAML files or deal with Git operations

## Prerequisites
Before getting started with **Workflows** in IDP 2.0, ensure you have the following prerequisites: 
- **IDP 2.0** is deployed behind the `IDP_2_0` Feature Flag in Harness IDP. Please ensure you have enabled the same in your account before you get started with the IDP 2.0 features. To enable this feature, contact Harness Support.
- You must have an understanding of **Managing Workflows** and **Workflow YAML** to understand the components of a Workflow.
- You can/should have a Harness Pipeline. This serves as an orchestrator for Self Service Workflows. Read more about setting up Harness IDP Pipelines here. 

## Create a Harness IDP Pipeline

## Create a Workflow
In IDP 2.0, you can create **Workflows** directly from the Harness IDP UI —eliminating the need to manually manage YAML files. With this release, "inline workflows" are fully supported, allowing you to manage the entire workflow lifecycle through the UI or APIs—no Git operations required. Learn more about Self Service Workflows here. 

There are two ways for you to add and create a new Workflow in your IDP:
- **Create a Workflow via the Harness IDP UI**: Use the Harness UI to create Workflows directly—no YAML required. This method offers a streamlined, code-free experience for adding entities.
- **Create a Workflow using your Workflow YAML**: You can still create Workflows using your existing Workflow YAML files. Harness will automatically convert legacy Backstage YAML into the new Harness-native Data Model and register the corresponding Workflow.

Let's try creating a **Workflow** using both the methods: 

<Tabs>
  <TabItem value="UI" label="Harness IDP UI">
  To create a new **Workflow**, navigate to the Harness IDP portal and click on **“Create”** from the side-bar menu. Choose **Workflow** from the panel, and follow these steps:
  1. You’ll be redirected to the **"Visual View"**, where you can input basic Workflow details and begin the creation process.
  2. Enter the required Workflow information. The **Visual view** is synced in real-time with the **YAML view** for full transparency.
  3. Define the **Workflow scope** — choose whether the Workflow should reside at the Account, Project, or Organization level. For this use-case, let's select the Account scope. Read more about Workflow RBAC.
  4. Click on **“Review YAML”** to view the auto-generated YAML. Since there's a live sync between the Visual and YAML views, changes in one will reflect in the other. 
  5. You can make changes to the Workflow YAML and configure it accordingly. You can configure different inputs, add backend actions and outputs to configure the Workflow. Read more about the components of a Workflow and Workflow YAML here. 
  
  :::info
  **Note:** **YAML validation** is performed to ensure compatibility with the **Harness-native Data Model**. Any errors will be shown in the Validation logs.
  :::
  6. Once everything is set, click **“Create Workflow”** to finalize and create the Workflow.
  </TabItem>
  <TabItem value="YAML" label="Workflow YAML">
  To create a new entity using the Workflow YAML, navigate to the Harness IDP portal and click **“Create”** from the side-bar menu. Choose **Workflow** from the panel.
  
  :::info
  If you have a **legacy Backstage YAML**, you can still use it to create a **Workflow**. Harness will automatically convert it into the **Harness-native Data Model** format.
  :::

1. You’ll be redirected to the **Visual View**. You can switch to the **YAML View** using the toggle at the top of the screen. This allows you to directly edit the Workflow's YAML definition.
2. If you’re using a **legacy Backstage YAML**, paste it into the YAML view. Harness will convert it into the **Harness-native format** automatically. You can then proceed to finalize and create the Workflow. Since the Visual and YAML views are **live-synced**, changes made in one view will reflect in the other.
3. You can make changes to the **Workflow YAML** and configure it accordingly. You can configure different inputs, add backend actions and outputs to configure the Workflow. Read more about the components of a Workflow and Workflow YAML here. 

:::info
Note: **YAML validation** is automatically performed to ensure compatibility with the **Harness-native Catalog YAML model**. Any validation errors will be displayed in the Validation Logs.
:::

4. Once all details are complete, click **“Create Workflow”** to finalize and register your Workflow in the catalog.
  </TabItem>
</Tabs>


## Execute Workflows
Once you've created a Workflow, you can **execute** the Workflow by going to the Workflow details page. You can find the respective Workflow from the Catalog

## Delete a Workflow

## Use RBAC with Workflows

## Next Steps