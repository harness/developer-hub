---
title: Get Started with Catalog [2.0]
sidebar_position: 3
sidebar_label: Get Started with Catalog [2.0]
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The **Software Catalog** is a centralized registry for all your software assets — including components, services, websites, libraries, data pipelines, and more. Think of it as a curated directory of all your **entities**, helping you efficiently track ownership, metadata, and dependencies across your entire software ecosystem.

This guide will take you through the key changes for Software Catalog in IDP 2.0 and a basic journey of navigating through the Catalog by creating an entity and populating your Catalog. 

## What’s new for Software Catalog in IDP 2.0?
Harness IDP 2.0 represents a major evolution of the Internal Developer Portal, built on a Harness-native data model designed for enterprise-scale environments and robust access control. Here's what’s changing in IDP 2.0 for the Software Catalog:

- **Harness-native Platform Hierarchy:** Catalog entities now support Account, Org, and Project scopes, with built-in, fine-grained RBAC.

- **No YAML Required:** Create and modify entities directly within the UI—no need to manage YAML files or deal with Git operations.

- **Revamped Catalog UI:** A fresh user experience featuring an updated Catalog table with filters, enhanced navigation, and a built-in entity creation interface.

## Prerequisites
Before getting started with Software Catalog in IDP 2.0, ensure you have the following prerequisites: 
- **IDP 2.0** is deployed behind the `IDP_2_0` Feature Flag in Harness IDP. Please ensure you have enabled the same in your account before you get started with the IDP 2.0 features. To enable this feature, contact Harness Support.
- You must an understanding of the IDP 2.0 Catalog Data Model and Catalog YAML. 

## Create an Entity 
In IDP 2.0, you can create new entities directly from the Harness IDP UI —eliminating the need to manually manage YAML files. With this release, "inline entities" are fully supported, allowing you to manage the entire entity lifecycle through the UI or APIs—no Git operations required. Learn more about Harness IDP entities and scopes here in the Catalog Data Model. 

There are two ways for you to add and create a new entity in your catalog:
- **Create an entity via the Harness IDP UI**: Use the Harness UI to create entities directly—no YAML required. This method offers a streamlined, code-free experience for adding entities.
- **Create an entity using your catalog YAML**: You can still create entities using your existing catalog YAML files. Harness will automatically convert legacy Backstage YAML into the new Harness Catalog Entity Model and register the corresponding entity.

Let's try creating a **Component** in the Catalog using both the methods: 

<Tabs>
  <TabItem value="UI" label="Harness IDP UI">
  To create a new **Component** entity, navigate to the Harness IDP portal and click on **“Create”** from the side-bar menu. Choose **Component** from the panel, and follow these steps:
  1. You’ll be redirected to the **"Visual View"**, where you can input entity details and begin the creation process.
  2. Enter the required entity information. The **Visual view** is synced in real-time with the **YAML view** for full transparency.
  3. Define the **entity scope** — choose whether the entity should reside at the Account, Project, or Organization level. For this use-case, let's select the Account scope. Read more about Catalog RBAC.
  4. Click on **“Review YAML”** to view the auto-generated YAML. Since there's a live sync between the Visual and YAML views, changes in one will reflect in the other. 
  
  :::info
  **Note:** **YAML validation** is performed to ensure compatibility with the **Harness-native Catalog YAML** model. Any errors will be shown in the Validation logs.

  ![](./static/yaml-validation.png)
  :::

  5. If needed, **configure a plugin** by referring to its documentation and adding the required annotations in the Catalog YAML.
  ![](./static/plugins-entity.png)
  6. Once everything is set, click **“Create Component”** to finalize and create the entity.
  ![](./static/yaml-view.png)
  </TabItem>
  <TabItem value="YAML" label="Catalog YAML">
  To create a new entity using the Catalog YAML, navigate to the Harness IDP portal and click **“Create”** from the side-bar menu. Choose **Component** from the panel.
  
  :::info
  If you have a **legacy Backstage YAML**, you can still use it to create an entity. Harness will automatically convert it into the native **Catalog Entity Model** format.
  :::

1. You’ll be redirected to the **Visual View**. You can switch to the **YAML View** using the toggle at the top of the screen. This allows you to directly edit the entity's YAML definition.
![](./static/yaml-way.png)
2. If you’re using a **legacy Backstage YAML**, paste it into the YAML view. Harness will convert it into the **Harness-native format** automatically. You can then proceed to finalize and create the entity. Since the Visual and YAML views are **live-synced**, changes made in one view will reflect in the other.
![](./static/yaml-conversion.png)

:::info
Note: **YAML validation** is automatically performed to ensure compatibility with the **Harness-native Catalog YAML model**. Any validation errors will be displayed in the Validation Logs.
![](./static/yaml-validation.png)
:::
3. You can select the scope of the Workflow by either switching to the **Visual View** and selecting the scope from there. Or you can add **projectId** or **orgId** in the YAML to specify the project / org scope of the Workflow. Read more about the same here. 

4. If needed, **configure a plugin** by referring to the plugin’s documentation and adding the appropriate **annotations** in the Catalog YAML.
5. Once all details are complete, click **“Create Component”** to finalize and register your entity in the catalog.
  </TabItem>
</Tabs>

## Populate your Catalog

## Delete an Entity
You can also **delete** any existing entity from the Software Catalog.

Here’s how to do it:
1. Navigate to your Catalog and select the entity you want to delete.
2. In the entity details view, click the three-dot menu in the top-right corner.
3. From the dropdown, select Delete. The entity will be removed from the catalog.

## Next Steps 
Now that you've created an entity, populated your Catalog and also deleted an entity - you're well versed with the basics of a Software Catalog. Here's what you can do next to understand and start using Catalog: 
1. Understand and read through the Catalog Data Model if not done already to understand the Catalog entities. 
2. Read through and form an understanding of the Catalog YAML. 
3. Populate your Catalog at scale by following the guide here.
4. You can also configure and manage a custom Catalog UI. 



