---
title: Manage Catalog
description: Create a Software Component and register it in Software Catalog
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The **Software Catalog** is a centralized registry for all your software assets — including components, services, websites, libraries, data pipelines, and more.
Think of it as a curated directory of all your **entities**, helping you efficiently track ownership, metadata, and dependencies across your entire software ecosystem.

## What’s new for this feature in IDP 2.0?
Harness IDP 2.0 represents a major evolution of the Internal Developer Portal, built on a Harness-native data model designed for enterprise-scale environments and robust access control. Here's what’s changing in IDP 2.0 for the Software Catalog:

- **Harness-native Platform Hierarchy:** Catalog entities and workflows now support Account, Org, and Project scopes, with built-in, fine-grained RBAC.

- **No YAML Required:** Create and modify entities directly within the UI—no need to manage YAML files or deal with Git operations.

- **Revamped Catalog UI:** A fresh user experience featuring an updated Catalog table with filters, enhanced navigation, and a built-in entity creation interface.

## Creating Entities
*Fundamentals of entities: types of entities, their backstage references, etc.*
*API way of adding entities*
*Creating different types of entities (components, etc.)*

In **IDP 1.0**, users were required to update **Catalog YAML files** for every change, which made adoption more complex—especially for entities that needed frequent updates, such as infrastructure resources.

In **IDP 2.0**, you can create new entities directly from the **Harness IDP UI** —eliminating the need to manually manage YAML files. With this release, **"inline entities"** are fully supported, allowing you to manage the entire entity lifecycle through the UI or APIs—no Git operations required. This makes it easier for any developer to onboard into the portal without learning Backstage-specific YAML conventions.

![](./static/create-entity-1.png)

In IDP 2.0, there are two ways to add and create a new entity in your catalog:
- **Create an entity via the Harness IDP UI**:
Use the Harness UI to create entities directly—no YAML required. This method offers a streamlined, code-free experience for adding entities.
- **Create an entity using your catalog YAML**:
You can still create entities using your existing catalog YAML files. Harness will automatically convert legacy Backstage YAML into the new Harness Catalog Entity Model and register the corresponding entity.

<Tabs>
  <TabItem value="UI" label="Harness IDP UI">
  To create a new entity, navigate to the Harness IDP portal and click on **“Create”** from the side-bar menu. Choose the desired entity type, and follow these steps:
  1. You’ll be redirected to the **"Visual View"**, where you can input entity details and begin the creation process.
  2. Enter the required entity information. The **Visual view** is synced in real-time with the **YAML view** for full transparency.
  ![](./static/create-entity-2.png)
  3. Define the **entity scope** — choose whether the entity should reside at the Account, Project, or Organization level. Read more about Catalog RBAC.
  ![](./static/scope-entity.png)
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
  With Harness **IDP 2.0**, we're introducing the **Harness-native Catalog Entity Model**. Learn more about the new system model here. To create a new entity, navigate to the Harness IDP portal and click **“Create”** from the side-bar menu.
  
  :::info
  If you have a **legacy Backstage YAML**, you can still use it to create an entity. Harness will automatically convert it into the native **Catalog Entity Model** format.
  :::

1. You’ll be redirected to the **Visual View**. You can switch to the **YAML View** using the toggle at the top of the screen. This allows you to directly edit the entity's YAML definition.
2. If you’re using a **legacy Backstage YAML**, paste it into the YAML view. Harness will convert it into the **Harness-native format** automatically. You can then proceed to finalize and create the entity. Since the Visual and YAML views are **live-synced**, changes made in one view will reflect in the other.

:::info
Note: **YAML validation** is automatically performed to ensure compatibility with the **Harness-native Catalog YAML model**. Any validation errors will be displayed in the Validation Logs.
:::

3. If needed, **configure a plugin** by referring to the plugin’s documentation and adding the appropriate **annotations** in the Catalog YAML.
4. Once all details are complete, click **“Create Component”** to finalize and register your entity in the catalog.
  </TabItem>
</Tabs>

## Editing Entities
You can now modify your entities directly from the **Harness IDP UI**, removing the dependency on manually editing the ``catalog-info.yaml`` file in your Git repository. This streamlines the update process and makes entity management much easier.

To edit an entity:
1. Navigate to the **Catalog** and select the entity you want to modify.
2. In the entity details view, click on **Edit** in the top-right corner.
![](./static/edit-entity-1.png)
3. You can update the entity using either the **Visual View** or the **YAML View**. Both views are live-synced—changes made in one will instantly reflect in the other.
4. Click **Save Changes** to apply and save your updates.

### Entity Inspector
You can also view the **entity’s YAML** by clicking **“View YAML”** from the entity details screen. 
![](./static/view-yaml.png)

This opens the **Entity Inspector**, where you can review both the Raw YAML and Raw JSON representations.
![](./static/entity-inspector.png)


## Deleting Entities 
You can also **delete** any existing entity from the Software Catalog.

Here’s how to do it:
1. Navigate to your **Catalog** and select the entity you want to delete.
2. In the entity details view, click the **three-dot menu** in the top-right corner.
3. From the dropdown, select **Delete**. The entity will be removed from the catalog.

![](./static/delete-entity.png)

### Entity URL
You can also copy the **entity URL** from the same dropdown menu and share it with others—provided they have the necessary access permissions.

![](./static/copy-url.png)

## Using Scopes & Filters