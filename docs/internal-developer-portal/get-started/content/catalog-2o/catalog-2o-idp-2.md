import DocImage from '@site/src/components/DocImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip For IDP 2.0 Customers
If you're using Harness IDP 2.0, please ensure you have reviewed the [IDP 2.0 Overview guide](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path) and are familiar with the key steps for [upgrading to IDP 2.0](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o). To enable IDP 2.0, you must raise a support ticket to activate the `IDP_2_0` feature flag for your account.
:::

The **Software Catalog** is a centralized registry of all your software assets — including components, services, websites, libraries, data pipelines, and more. Think of it as a curated directory of your **entities**, helping you efficiently track ownership, metadata, and dependencies across your software ecosystem.

This guide walks you through the key changes introduced in IDP 2.0 and explains how to navigate the Catalog by creating and managing entities.

## Prerequisites

Before using the Software Catalog in IDP 2.0, ensure:
* You have reviewed the **[IDP 2.0 Overview](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path)** and **[Upgrading to IDP 2.0](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o)** guide. 
* **IDP 2.0** is enabled behind the `IDP_2_0` Feature Flag. Contact [Harness Support](https://support.harness.io) to enable it on your account.
* You are familiar with the **[Catalog Data Model](/docs/internal-developer-portal/catalog/data-model)** and **[Catalog YAML](/docs/internal-developer-portal/catalog/catalog-yaml)** structure.

## Create an entity manually

In IDP 2.0, entity creation is simplified with full UI support and optional YAML-based creation. Entities are now "inline," which means their entire lifecycle can be managed through the UI or API, without Git integration.

There are two ways to add and create a new entity in your catalog:
- **Create an entity via the Harness IDP UI**:
Use the **Harness UI** to create entities directly—no YAML required. This method offers a streamlined, code-free experience for adding entities.
- **Create an entity using your catalog YAML**:
You can still create entities using your **existing catalog YAML** files. Harness will automatically convert **legacy Backstage YAML** into the new Harness Catalog Entity Model and register the corresponding entity.

<DocImage path={require('./static/create-entity-1.png')} />

Let's walk through both methods using a **Component** entity as an example:

<Tabs groupId="creating Entity">
<TabItem value="UI" label="Harness IDP UI">

To create a **Component** via the UI:

1. Navigate to the Harness IDP portal and click **"Create"** in the sidebar.
2. Select **Component** from the available options.
3. You'll enter the **Visual View**, where you can fill out entity details interactively.

> Ensure your `identifier` follows [naming rules](https://developer.harness.io/docs/platform/references/entity-identifier-reference/#identifier-naming-rules). Invalid identifiers may lead to entity registration errors.

:::note
The **identifier** is a unique key for your entity and cannot be changed after creation. Choose it carefully.
:::

4. Specify the **Entity Scope** (Account, Org, or Project). For this example, choose **Account scope**. [Read more about Catalog RBAC](/docs/internal-developer-portal/rbac/catalog-rbac).

5. **Link to Source Code Repository**
   Configure the source code repository associated with this component. This link enables several key capabilities, such as:
  
   * Automatically configuring plugins like **Scorecards**, **TechDocs**, and **STO**
   * Displaying the **View Source** option in the UI
   * Enabling advanced features like **CI/CD integration** and **security scanning**
   
   > Harness IDP also auto-generates the legacy `backstage.io/source-location` annotation for backwards compatibility.

6. You now have two options for managing your Component configuration:
    * **Inline (default):** Manage the Component YAML directly within Harness.
    * **Git-based:** Store the Component YAML in your Git repository and sync it with Harness.

:::info
  **Note:** **YAML validation** is performed to ensure compatibility with the **Harness-native Catalog YAML** model. Any errors will be shown in the Validation logs.
:::

8. If applicable, configure a plugin by referring to its documentation and adding the necessary **annotations** in the Catalog YAML.

9. Click **Save** to create your entity.

<DocVideo src="https://app.tango.us/app/embed/8d74bc96-331e-4460-8d0e-5d839707ea9c" title="Create an entity manually via UI" />

<details>
<summary>Example Component YAML</summary>

```yaml
apiVersion: harness.io/v1
kind: Component
metadata:
  name: artist-lookup-api
  identifier: artist_lookup_api
  description: place to be for artists
  tags:
    - java
  annotations:
    harness.io/project-url: https://github.com/backstage/backstage
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  lifecycle: production
  owner: team-a
  system: artist-engagement-portal
```
</details>

</TabItem>

<TabItem value="YAML" label="Catalog YAML">

To create a **Component** using YAML:

1. Navigate to the Harness IDP portal and click **"Create"** in the sidebar.
2. Select **Component** from the available options.
3. Switch to the **YAML View** by clicking the toggle.
4. Specify the **Entity Scope** (Account, Org, or Project). For this example, choose **Account scope**. [Read more about Catalog RBAC](/docs/internal-developer-portal/rbac/catalog-rbac).

<DocImage path={require('./static/scope-entity.png')} />

5. Define **Link to Source Code Repository** to configure the source code repository associated with this component. This link enables several key capabilities, such as automatically configuring plugins and displaying the **View Source** option in the UI.

6. Paste your **Catalog YAML** in the editor. You can use the following template:

```yaml
apiVersion: harness.io/v1
kind: Component
metadata:
  name: artist-lookup-api
  identifier: artist_lookup_api
  description: place to be for artists
  tags:
    - java
  annotations:
    harness.io/project-url: https://github.com/backstage/backstage
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  lifecycle: production
metadata:
  tags:
    - java
  description: place to be for artists
```

> You can even paste your existing Backstage YAML if available. Harness will auto-convert it into the native format.

<DocImage path={require('./static/yaml-conversion.png')} />

7. You have two options for managing your Component configuration:
    * **Inline (default):** Manage the Component YAML directly within Harness.
    * **Git-based:** Store the Component YAML in your Git repository and sync it with Harness.

8. Click **Save** to create your entity.

</TabItem>
</Tabs>

## Delete an entity

You can remove any entity from the Catalog using the steps below:

1. Open the Software Catalog and locate the entity to delete.
2. Click the three-dot menu on the entity card or details view.
3. Select **Delete** from the dropdown. The entity will be permanently removed.

<DocVideo src="https://app.tango.us/app/embed/1bf401cd-624f-4568-868a-63db3c167a1f" title="Delete an entity" />

## Next steps

Now that you've created your first entity, explore these next steps:

* **[Configure Plugins](/docs/internal-developer-portal/plugins/overview)** to enhance your entities with additional capabilities
* **[Set up Scorecards](/docs/internal-developer-portal/scorecards/scorecard-quickstart)** to track entity quality and compliance
* **[Enable TechDocs](/docs/internal-developer-portal/techdocs/enable-docs)** to publish documentation alongside your entities
* **[Explore Workflows](/docs/internal-developer-portal/workflows/workflows-2o)** to automate common development tasks
