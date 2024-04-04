---
title: Custom Catalog Property
description: Ingest catalog entities using APIs
sidebar_position: 5
sidebar_label: Catalog Entity Ingestion APIs
---

## Introduction

With the introduction of Catalog Entity Ingestion APIs, users now have the capability to append or update arbitrary metadata associated with catalog entities such as services, libraries, websites, etc without manually adding it to the `catalog-info.yaml`. This feature facilitates the integration of metadata sourced from internal systems such as cost trackers, service health checkers, security scans, or even from simple spreadsheets tracking personnel details.

## Key Features
- **Custom Property Support**: The metadata field in the catalog supports custom properties, enabling users to add tailored metadata to catalog entities.

- **Scalability**: Using the APIs, users can now automate the process for adding custom properties at scale, streamlining the customization of catalog entities.

- **Enhanced Personalization**: Users can now personalize their catalog experience to a greater extent, unlocking faster onboarding of entities and facilitating the creation of more personalized scorecards and plugins.

## API Examples and Usage

## Entity Ingestion API

### Endpoint

Adds a metadata in the already existing software component on IDP Catalog. 

### HTTP Method

`POST`

### URL 

```bash
https://app.harness.io/v1/catalog/custom-properties
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
    "value": "1.21.01"
}
```

- field: It contains the information on the metadata name to be added, here in the above example it would ingest the `releaseVersion` under metadata. **This won't append your catalog-info.yaml stored in your git**, rather you could view the changes on IDP. 

![](./static/inspect-entity.png)

![](./static/raw-yaml.png)

```YAML
###Example

apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-new-service
  description: Description of my new service
  annotations:
       harness.io/project-url: https://app.harness.io/ng/#/account/vpCkHKsDSxK9_KYfjCTMKA/cd/orgs/default/projects/PREQA_NG_Pipelines
  releaseVersion: 1.21.01
...
```

- filter: This is used to identify the software components where you want to ingest the new entity, you can filter through `kind`, `type`, `owners`, `lifecycle` and `tags`. 

- value: This field contains the value of the entity added under `field`. 

### cURL Example

```cURL
curl --location 'https://app.harness.io/v1/catalog/custom-properties' \
--header 'Harness-Account: px7xd_BFRCi-pfABYXVjvw' \
--header 'Content-Type: application/json' \
--header 'x-api-key: <Add your key>' \
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
### Response:
The response will ingest/append a metadata in the desired software component in your IDP catalog.

## Entity Deletion API

### Endpoint

Delete a metadata in the already existing software component on IDP Catalog. 

### HTTP Method

`DELETE`

### URL 

```bash
https://app.harness.io/v1/catalog/custom-properties
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
    }
}
```

- field: It contains the information on the metadata name to be deleted, here in the above example it would ingest the `releaseVersion` under metadata. **This won't append your catalog-info.yaml stored in your git**, rather you could view the changes on IDP. 

![](./static/inspect-entity.png)

![](./static/raw-yaml.png)


- filter: This is used to identify the software components from where you want to delete the entity, you can filter through `kind`, `type`, `owners`, `lifecycle` and `tags`. 

### cURL Example

```cURL
curl --location --request DELETE 'https://qa.harness.io/v1/catalog/custom-properties' \
--header 'Harness-Account: px7xd_BFRCi-pABCYXVjvw' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {{apiKey}}' \
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
            }
        }
    ]
}'
```
### Response:
The response will delete a metadata in the desired software component in your IDP catalog.
