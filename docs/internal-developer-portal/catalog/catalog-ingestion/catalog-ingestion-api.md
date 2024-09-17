---
title: Catalog Ingestion API
description: Update Catalog Metadata using Ingestion APIs
sidebar_position: 1
sidebar_label: Ingestion API
redirect_from:
  - docs/internal-developer-portal/catalog/custom-catalog-properties
---

<DocVideo src="https://www.youtube.com/embed/mI_KIuMpnBM?si=2SfPcO-JpFvAMJrT" />

## Introduction

With the introduction of Catalog Metadata Ingestion APIs, users now have the capability to append or update arbitrary metadata associated with catalog entities such as services, libraries, websites, etc without manually adding it to the `catalog-info.yaml`. This feature facilitates the integration of metadata sourced from internal systems such as cost trackers, service health checkers, security scans, or even from simple spreadsheets tracking personnel details.

Also see - [Scorecards using Custom Data Sources](../scorecards/custom-data-source)

## Key Features

- **Custom Property Support**: The metadata field in the catalog supports custom properties, enabling users to add tailored metadata to catalog entities.

- **Scalability**: Using the APIs, users can now automate the process for adding custom properties at scale, streamlining the customization of catalog entities.

- **Enhanced Personalization**: Users can now personalize their catalog experience to a greater extent, unlocking faster onboarding of entities and facilitating the creation of more personalized scorecards and plugins.

<DocImage path={require('./static/catalog-custom-property.png')} />

## API Examples and Usage

## Entities to change/update are Specified or Known

## Catalog Metadata Ingestion API for given entity for a single property

### cURL Example

```sh
curl --location 'https://app.harness.io/gateway/v1/catalog/custom-properties/entity' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
    "entity_ref": "boutique-service",
    "property": "metadata.codeCoverageScore",
    "value": "83"
    }'
```

### Endpoint

### HTTP Method

`POST`

### URL

```bash
https://app.harness.io/gateway/v1/catalog/custom-properties/entity

```

### Headers

- `x-api-key`: Your Harness API token.
- `Harness-Account`: Your Harness account ID.

You can find your account ID in any Harness URL, for example:

```bash
https://app.harness.io/ng/account/ACCOUNT_ID/idp/overview
```

- `'Content-Type: application/json'`


### Request Body

```json
{
  "entity_ref": "boutique-service",
  "property": "metadata.codeCoverageScore",
  "value": "83"
}
```
In the above example, we update/add **only** the `metadata.codeCoverageScore` **property** for the mentioned **entity** `boutique-service`. 

- **entity_ref:** Entity ref is a stringified way of representing a Catalog entity with the format `[<kind>:][<namespace>/]<name>`. Both kind and namespace are optional. The simplest way to represent a component is to use the name. For example, `boutique-service`. This internally translates to `component:default/boutique-service` which means the entity is of `kind: Component` in the `default` namespace.

- **value:** This field contains the value of the entity added under `field`.

![](./static/inspect-entity.png)

![](./static/raw-yaml.png)

```YAML
###Example Processed Entitiy YAML as displayed in IDP

apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-new-service
  description: Description of my new service
  annotations:
       harness.io/project-url: https://app.harness.io/ng/account/vpCkHK/module/idp-admin/orgs/default/projects/Backstage/pipelines/Releasenpm/
  codeCoverageScore: 83
...
```

## Catalog Metadata Ingestion API for given entity for multiple properties

### cURL Example

```sh
curl --location 'https://app.harness.io/gateway/v1/catalog/custom-properties/entity' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
  "entity_ref": "boutique-service"
  "properties": [
    {
      "property": "metadata.codeCoverageScore",
      "value": "83"
    },
    {
      "property": "metadata.cloudCost",
      "value": "24$",
      "mode"?: "append/replace"
    }
  ]
}'
```
:::info
`mode` is optional and is in use when the property holds an **array** like `tags`, `relations`, etc. For arrays, the **default** mode value is `replace` e.g. if you post a new tag, it will replace the existing tags added in the entity.
:::

### Endpoint

### HTTP Method

`POST`

### URL

```bash
https://app.harness.io/gateway/v1/catalog/custom-properties/entity

```

### Headers

- `x-api-key`: Your Harness API token.
- `Harness-Account`: Your Harness account ID.

You can find your account ID in any Harness URL, for example:

```bash
https://app.harness.io/ng/account/ACCOUNT_ID/idp/overview
```

- `'Content-Type: application/json'`


### Request Body

```json
{
  "entity_ref": "boutique-service"
  "properties": [
    {
      "property": "metadata.codeCoverageScore",
      "value": "83"
    },
    {
      "property": "metadata.cloudCost",
      "value": "24$",
      "mode"?: "append/replace"
    }
  ]
}
```
In the above example, we add the `metadata.codeCoverageScore` & `metadata.cloudCost` **property** for the mentioned **entity** `boutique-service`. 

- **entity_ref:** Entity ref is a stringified way of representing a Catalog entity with the format `[<kind>:][<namespace>/]<name>`. Both kind and namespace are optional. The simplest way to represent a component is to use the name. For example, `boutique-service`. This internally translates to `component:default/boutique-service` which means the entity is of `kind: Component` in the `default` namespace.

- **mode:**`mode` is optional, takes value `append/replace` and is in use when the property holds an **array** like `tags`, `relations`, etc. For arrays, the **default** mode value is `replace` e.g. if you post a new tag, it will replace the existing tags added in the entity.

- **value:** This field contains the value of the entity added under `field`.

![](./static/inspect-entity.png)

![](./static/raw-yaml.png)

```YAML
###Example Processed Entitiy YAML as displayed in IDP

apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-new-service
  description: Description of my new service
  annotations:
       harness.io/project-url: https://app.harness.io/ng/account/vpCkHK/module/idp-admin/orgs/default/projects/Backstage/pipelines/Releasenpm/
  cloudCost: 24$
  codeCoverageScore: 83
...
```

## Catalog Metadata Ingestion API to ingest single property across selected properties

### cURL Example

```sh
curl --location 'https://app.harness.io/gateway/v1/catalog/custom-properties/entity' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
  "property": "metadata.releaseVersion",
  "entity_refs": [
    {
      "entity_ref": "component:default/order-service",
      "value": 1.2.0
    },
    {
      "entity_ref": "component:default/idp-service",
    },
    {
      "entity_ref": "component:default/pipeline-service",
    }
  ],
  "value"?: 1.5.0,
  "mode": "append/replace"
}'
```
:::info
- `mode` is optional and is in use when the property holds an **array** like `tags`, `relations`, etc. For arrays, the **default** mode value is `replace` e.g. if you post a new tag, it will replace the existing tags added in the entity.

- The `"value"?` is used for all entities without a corresponding value field.
:::

### Endpoint

### HTTP Method

`POST`

### URL

```bash
https://app.harness.io/gateway/v1/catalog/custom-properties/entity

```

### Headers

- `x-api-key`: Your Harness API token.
- `Harness-Account`: Your Harness account ID.

You can find your account ID in any Harness URL, for example:

```bash
https://app.harness.io/ng/account/ACCOUNT_ID/idp/overview
```

- `'Content-Type: application/json'`


### Request Body

```json
{
  "property": "metadata.releaseVersion",
  "entity_refs": [
    {
      "entity_ref": "component:default/order-service",
      "value": 1.2.0
    },
    {
      "entity_ref": "component:default/idp-service",
    },
    {
      "entity_ref": "component:default/pipeline-service",
    }
  ],
  "value"?: 1.5.0,
  "mode": "append/replace"
}
```
In the above example, we add the `metadata.releaseVersion` **property** for the mentioned **entities**. 

- **entity_ref:** Entity ref is a stringified way of representing a Catalog entity with the format `[<kind>:][<namespace>/]<name>`. Both kind and namespace are optional. The simplest way to represent a component is to use the name. For example, `boutique-service`. This internally translates to `component:default/boutique-service` which means the entity is of `kind: Component` in the `default` namespace.

- **value:** Here value is required if the array contains an element with only `entity_ref` but does not contain the corresponding `value`. The `"value"?` is used for all entities without a corresponding value field.

- **mode:**`mode` is optional, takes value `append/replace` and is in use when the property holds an **array** like `tags`, `relations`, etc. For arrays, the **default** mode value is `replace` e.g. if you post a new tag, it will replace the existing tags added in the entity.

![](./static/inspect-entity.png)

![](./static/raw-yaml.png)

```YAML
###Example Processed Entitiy YAML as displayed in IDP

apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-new-service
  description: Description of my new service
  annotations:
       harness.io/project-url: https://app.harness.io/ng/account/vpCkHK/module/idp-admin/orgs/default/projects/Backstage/pipelines/Releasenpm/
  releaseVersion: 1.5.0
...
```

## Use-cases where entities(s) are unspecified

## Catalog Metadata Ingestion API to ingest a single property for multiple entities

### HTTP Method

`POST`

### URL

```bash
https://app.harness.io/gateway/v1/catalog/custom-properties
```

### Headers

- `x-api-key`: Your Harness API token.
- `Harness-Account`: Your Harness account ID.

You can find your account ID in any Harness URL, for example:

```bash
https://app.harness.io/ng/account/ACCOUNT_ID/idp/overview
```

- `'Content-Type: application/json'`

### Request Body

```json
{
    "property": "metadata.teamLead",
    "filter": {
        "kind": "Component",
        "type": "service"
    },
    "skip_entity_refs": ["idp-service"],
    "value": "Jane Doe",
    "mode": "append/replace"    
}
```

- **skip_entity_refs:** It skips the change across the entites mentioned in the array. 

- **field:** It contains the information on the metadata name to be added, here in the above example it would ingest the `teamLead` under metadata. **This won't append your catalog-info.yaml stored in your git**, rather you could view the changes on IDP.

:::info

We need to add escape character for any field has an additional `DOT` in the path like `metadata.annotation.harness.io/idp-test` , that part needs to be escaped with `\"` like this `metadata.annotations.\"harness.io/idp-test\"`

:::

- **filter:** This is used to identify the software components where you want to ingest the new entity, you can filter through `kind`, `type`, `owners`, `lifecycle` and `tags`. **Where only `kind` is the mandatory fields.**

:::info

**Error Handling**: We validate the body of the API and certain fields like `kind`, `metadata`, `metadata.name`, `metadata.namespace`, are uneditable and if you try to change these, the endpoint returns an Error Code 400. Also make sure your metadata updates adhere to the [backstage schema](https://github.com/backstage/backstage/tree/master/packages/catalog-model/src/schema)

:::

- **value:** This field contains the value of the entity added under `field`.

![](./static/inspect-entity.png)

![](./static/raw-yaml.png)

```YAML
###Example Processed Entitiy YAML as displayed in IDP

apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-new-service
  description: Description of my new service
  annotations:
       harness.io/project-url: https://app.harness.io/ng/#/account/vpCkHKsDSxK9_KYfjCTMKA/cd/orgs/default/projects/PREQA_NG_Pipelines
  teamLead: Jane Doe
...
```

### How to check for which metadata and entities are affected?

Using **dry_run** users can check for all the metadata and components getting affected by the **Catalog Metadata Ingestion API**, dry_run won't apply any change rather will provide a preview of all the changes as shown in the example below.

```json
[
  {
    "field": "metadata.offShoreTeamLead",
    "entities_with_additions": {
      "count": 0,
      "entity_refs": []
    },
    "entities_with_updates": {
      "count": 2,
      "entity_refs": [
        "component:default/order-service",
        "component:default/foodservice"
      ]
    }
  }
]
```

As you could see in the example above we display the affected software components under `entity_refs`.

To use **dry_run** you need to add `?dry_run=true` in the URL

```bash
https://app.harness.io/gateway/v1/catalog/custom-properties?dry_run=true
```

### cURL Example

The endpoint could also be used to **replace** value for an already existing metadata.

```bash
curl --location 'https://app.harness.io/gateway/v1/catalog/custom-properties' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
    "properties": [
        {
            "field": "metadata.releaseVersion",
            "filter": {
                "kind": "Component",
                "type": "service",
                "owners": [
                    "harness_account_all_users"
                ],
                "lifecycle": [
                    "experimental",
                    "production"
                ],
                "tags": [
                    "food-ordering",
                    "java",
                    "tag1"
                ]
            },
            "value": "abcd"
        }
    ]
}'
```

You can **append** an `array` data type using this API as shown in the example below by using `mode: append`

```bash
curl --location 'https://app.harness.io/gateway/v1/catalog/custom-properties' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
    "properties": [
        {
            // "field": "metadata.tags",
            "field": "metadata.releaseVersions",
            "filter": {
                "kind": "Component",
                "type": "service",
                "owners": [
                    "harness_account_all_users"
                ],
                "lifecycle": [
                    "experimental",
                    "production"
                ],
                "tags": [
                    "food-ordering",
                    "java",
                    "tag1"
                ]
            },
            "value": [                  #array of objects
                {"prod1": "1.5.6"},
                {"prod2": "1.5.6"},
                {"prod3": "1.5.6"},
            ],
            // "value": ["tag2", "tag3"], #array
            "mode": "append"
        }
    ]
}'

```

### Response:

The response will update/append a metadata in the desired software component in your IDP catalog.

## Catalog Metadata Deletion API to delete a single property for given entity

```bash
curl --location --request DELETE 'https://app.harness.io/gateway/v1/catalog/custom-properties/entity' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
  "entity_ref": "boutique-service",
  "property": "metadata.teamLead"
}'
```
## Catalog Metadata Deletion API to delete multiple properties for given entity

```bash
curl --location --request DELETE 'https://app.harness.io/gateway/v1/catalog/custom-properties/entity' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
  "entity_ref": "boutique-service",
  "properties": ["metadata.teamLead", "metadata.teamOwner"]
}'
```

## Catalog Metadata Deletion API to delete single property for single entity

```bash
curl --location --request DELETE 'https://app.harness.io/gateway/v1/catalog/custom-properties/property' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
  "entity_ref": "idp-service",
  "property": "metadata.releaseVersion"
}'
```

## Catalog Metadata Deletion API to delete single property for multiple entities

```bash
curl --location --request DELETE 'https://app.harness.io/gateway/v1/catalog/custom-properties/property' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
  "property": "metadata.releaseVersion",
  "entity_refs": ["idp-service", "order-service"]
}'
```

## Catalog Metadata Deletion API to delete using filters

```bash
curl --location --request DELETE 'https://app.harness.io/gateway/v1/catalog/custom-properties' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
    "property": "metadata.teamLead",
    "filter": {
        "kind": "Component",
        "type": "service"
    },
    "skip_entity_refs": ["order-service"],
}'
```

In the above example it will delete the property `metadata.teamLead`, across **all** the entities **except** `order-service` mentioned under `skip_entity_refs`. 
