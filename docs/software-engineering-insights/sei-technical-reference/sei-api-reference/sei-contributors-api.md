---
title: Contributors API
description: Access and modify Contributors
sidebar_label: Contributors API
sidebar_position: 25
---

Use this API endpoints to access and modify Contributors.

* **Base URL (PROD2):** `https://app.harness.io/gratis/sei/api/v1/custom-cicd`
* **Base URL (PROD1):** `https://app.harness.io/prod1/sei/api/v1/custom-cicd`

:::info
Note that the Base URL is relative to the application environment that you are using.
:::

* **Header:** Requires Bearer token key authorization. The content type is `application/json`

## Get the active version

```bash
GET /v1/org/users/versions
```

This API endpoint retrieves the list of active versions.

### Headers

<table><thead><tr><th width="465">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>Authorization</td><td><code>ApiKey token></code></td></tr></tbody></table>

### Sample Request

```bash
curl '<BASE_URL>/v1/org/users/versions?page_size=999' \
  -H 'accept: application/json' \
  -H 'authorization: <See API Usage>'
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="200" label="200" default>

```json
{
  "records": [521 items],
  "count": 521,
  "_metadata":{
    "page_size": 999,
    "page": 0,
    "has_next": false,
    "total_count": 521
  }
}
```

</TabItem>
  <TabItem value="400" label="400">

```json
{
  "error": "Invalid request"
}
```

</TabItem>
</Tabs>

### Parameters

| Name                   | Description                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `page_size (optional)` | The number of records to return per page. In the sample request, it is set to 999. |
| `page (optional)`      | The page number to retrieve. If not provided, it defaults to 0 (the first page).   |

### Response Fields

| Name          | Description                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------- |
| `records`     | An array containing the list of active versions. In this example, there are 521 items in the array. |
| `count`       | The number of records on the current page.                                                          |
| `page_size`   | The number of records per page (same as the `page_size` parameter in the request).                  |
| `page`        | The current page number.                                                                            |
| `has_next`    |  A boolean value indicating whether there is another page of results.                               |
| `total_count` | The total number of records across all pages.                                                       |

## Schema API to get schema used by current contributor pages and custom fields

```bash
GET /v1/org/users/schema
```

This API endpoint retrieves the schema used by the current contributor pages, including any custom fields.

### Sample Request

```bash
curl '${BASE_URL}/v1/org/users/schema' \
  -H 'accept: application/json' \
  -H 'authorization: <See API Usage>'
```

### Sample Response

```json
{
  "version": 190,
  "created_at": 1710153327501,
  "fields": [
    {
      "index": 3,
      "key": "integration",
      "display_name": "Integration",
      "description": "Add a column for every integration",
      "type": "string",
      "system_field": false
    },
    {
      "index": 1,
      "key": "full_name",
      "display_name": "Name",
      "description": "Name",
      "type": "string",
      "system_field": false
    },
    {
      "index": 2,
      "key": "region",
      "display_name": "Region",
      "description": "Region",
      "type": "string",
      "system_field": false
    },
    {
      "index": 2,
      "key": "email",
      "display_name": "Email",
      "description": "Unique email address per member",
      "type": "string",
      "system_field": false
    }
  ]
}
```

### Response Fields

* version: The version of the schema. 
* created_at: The timestamp when the schema was created (in milliseconds). 
* fields: An array of objects representing the fields in the schema. Each field object has the following properties: 
  * index: The index of the field. 
  * key: The unique key for the field. 
  * display_name: The display name for the field. 
  * description: The description of the field. 
  * type: The data type of the field (e.g., string). 
  * system_field: A boolean indicating whether the field is a system field or a custom field.