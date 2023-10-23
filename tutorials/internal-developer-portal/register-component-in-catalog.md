---
title: How to Regsiter a Software Component in Catalog 
description: Create a Software Component and register it in Software Catalog
sidebar_position: 3
---

## Create a Catalog Information YAML

The **Catalog Information YAML** is a crucial descriptor file that provides metadata about the software components you register within our IDP. It serves as a blueprint, detailing essential information about each component, such as its name, description, owner, and other related metadata. This file ensures that our portal accurately represents and organizes the software components, making it easier for teams to discover and understand the tools and services available. 

Although it's possible to name catalog entity descriptor files however you wish, we recommend that you name them `catalog-info.yaml`.

:::info

`catalog-info.yaml` follows the same "Descriptor Format of Catalog Entities" as Backstage.io for more information refer [here](https://backstage.io/docs/features/software-catalog/descriptor-format#substitutions-in-the-descriptor-format)

:::

### 1. Start with Basic Entity Information:

Begin your YAML file with the basic entity information:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
```

### 2. Provide Metadata:

Under the metadata section, provide essential details about your component:

```yaml
metadata:
  name: artist-web
  description: The place to be, for great artists

```

### 3. Add Labels (Optional):

You can add key/value pairs as labels to classify the component:

```yaml
labels:
  example.com/custom: custom_label_value
```

### 4. Add Annotations (Optional):

Annotations are used to reference external systems or provide additional non-identifying metadata:

```yaml
annotations:
  harness.io/project-url: https://app.harness.io/ng/#/account/accountid/cd/orgs/orgid/projects/Harnesspractise
  github.com/project-slug: github/example-org/artist-website
```

### 5. Include Tags (Optional):

Tags are single-valued strings used to classify entities:

```yaml
tags:
  - java
```

### 6. Provide External Links (Optional):

External hyperlinks related to the entity can be added for contextual information:

```yaml
links:
  - url: https://admin.example-org.com
    title: Admin Dashboard
    icon: dashboard
    type: admin-dashboard
```

### 7. Specify Component Details:

Under the `spec` section, provide specific details about the component:

```yaml
spec:
  lifecycle: production
  owner: artist-relations-team
  type: website
  system: public-websites
```
### 8. Substitutions in the Descriptor Format:

The descriptor format supports substitutions using `$text`, `$json`, and `$yaml`. Placeholders like `$json: https://example.com/entity.json` are substituted by the content of the referenced file. You can reference relative files like `./referenced.yaml` from the same location. For example:

<details>
<summary>Important Callout: Allowing External URLs</summary>
    
If you're referencing external URLs in your `IDP.yaml` file, such as Swagger documentation links, please ensure that these URLs are allowed within the Harness Internal Developer Portal. This is a crucial step to ensure that the portal can access and display content from these external sources.

#### How to Allow External URLs:
- Navigate to **Admin** in the Harness Internal Developer Portal.
- Go to **URL Allow List**.
- Click on **+Add Host**.
- In the provided field, enter the URL pattern you wish to allow. For example, to allow all URLs from Swagger, you'd enter `*.swagger.com`.
- Confirm and save your changes.

By following the above steps, you ensure that the portal can safely and correctly access the external content referenced in your IDP.yaml file.

</details>

```yaml
api:
  name: petstore
  description: The Petstore API
  type: openapi
  owner: petstore@example.com
  definition: $text://petstore.swagger.io/v2/swagger.json
```

### 9. Save the File:

Save the file with the recommended name `catalog-info.yaml` and upload it on your file in your Git repository.

### 10. Register with Harness IDP:
To register this component with Harness IDP, you'll need to submit this YAML file to the appropriate **API** endpoint or Register the existing component using **UI**. 

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
<TabItem value="API">
```
- Generate a Harness API Key as described in [Manage API keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys)
- Follow the following cURL command with the request body to register your component. The body takes two input at present `type` and `target`. 

```cURL
curl --location 'https://idp.harness.io/{ACCOUNT_IDENTIFIER}/idp/api/catalog/locations' \
--header 'x-api-key: {X_API_KEY}' \
--header 'Harness-Account: {ACCOUNT_IDENTIFIER}'
 --data-raw '{"type":"url","target":"https://github.com/harness-community/idp-samples/blob/main/catalog-info.yaml"}'
```

```mdx-code-block
</TabItem>
<TabItem value="UI">
```
1. Once the file is created in your git repo, copy the full URL to the file. For example, `https://github.com/harness-community/idp-samples/blob/main/catalog-info.yaml`.

2. In the left navigation, select **Create**, and then select **Register Software Component**.

3. Enter the URL to your new `catalog-info.yaml`.

4. Select **Import**.

```mdx-code-block
</TabItem>
</Tabs>
```

11. The new component will be available in your catalog.