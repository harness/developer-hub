---
title: IDP API
description: Lists the public API endpoints supported in IDP.
sidebar_label: IDP API
sidebar_position: 1
redirect_from:
  - /docs/internal-developer-portal/public-api
---

The following are the list of APIs supported by IDP. 

:::info
The APIs listed here are [Backstage APIs](https://backstage.io/docs/features/software-catalog/software-catalog-api) exposed through Harness Platform and you could find all the APIs for [IDP mentioned in openapi specs](https://apidocs.harness.io/tag/AppConfig)
:::

In order to use the APIs in Harness platform, you need to generate a Harness API Key as described in [Manage API keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys)



## Catalog API

### Endpoint

Register Software Component in Harness Catalog.

### HTTP Method

`POST`

### URL 

```bash
https://idp.harness.io/{ACCOUNT_IDENTIFIER}/idp/api/catalog/locations
```
### URL Parameters

`ACCOUNT_IDENTIFIER`: Your Harness account ID.

You can find your account ID in any Harness URL, for example:

```bash
https://app.harness.io/ng/account/ACCOUNT_ID/idp/overview
```

### Headers
- `x-api-key`: Your Harness API token.
- `Harness-Account`: Your Harness account ID.

### Request Body

```json
{
  "type": "url",
  "target": "Path to IDP YAML in your git provider"
}
```

### cURL Example

```cURL
curl --location 'https://idp.harness.io/{ACCOUNT_IDENTIFIER}/idp/api/catalog/locations' \
--header 'x-api-key: {X_API_KEY}' \
--header 'Harness-Account: {ACCOUNT_IDENTIFIER}'
--data-raw '{"type":"url","target":"https://github.com/harness-community/idp-samples/blob/main/catalog-info.yaml"}'
```
### Response:
The response will register a software component in your IDP catalog as defined in the `catalog-info.yaml` or `idp.yaml` file from the specified git repository.


## Catalog Entities Delete API

### Endpoint

Delete Software Component from Harness Catalog.

### HTTP Method

`DELETE`

### URL 

```bash
https://idp.harness.io/{ACCOUNT_IDENTIFIER}/idp/api/catalog/locations/{LOCATION_ID}
```
### URL Parameters

`ACCOUNT_IDENTIFIER`: Your Harness account ID.

You can find your account ID in any Harness URL, for example:

```bash
https://app.harness.io/ng/account/ACCOUNT_ID/idp/overview
```

`LOCATION_ID`: To get the Location ID, use the cURL command given below to fetch all the Locations for the account and `grep` your component name and the ID mentioned there is the Location ID to be used.

```cURL
curl 'https://idp.harness.io/{ACCOUNT_IDENTIFIER}/idp/api/catalog/locations' \
--header 'x-api-key: {X_API_KEY}' \
--header 'Harness-Account: {ACCOUNT_IDENTIFIER}'
```

The Response of the above cURL would be as shown below and the `id` mentioned is the **Location ID**, search for the component name in the response and pick the `id`

```json
[
...
    {
        "data": {
            "id": "0c82da82-dc1c-4176-99fa-a4711dcd01f5",
            "target": "https://github.com/sathish-soundarapandian/onboarding-test/blob/main/harness-services-zeaak/Project/prannoy.yaml",
            "type": "url"
        }
    },
...
]
```

### Headers
- `x-api-key`: Your Harness API token.
- `Harness-Account`: Your Harness account ID.

### cURL Example

```cURL
curl --location --request DELETE 'https://idp.harness.io/{ACCOUNT_ID}/idp/api/catalog/locations/{LOCATION_ID}' \
--header 'x-api-key: <API-KEY>' \
--header 'Harness-Account: {ACCOUNT_ID}'
```
### Response:
The response will remove the software component along the with the locations from your IDP catalog as defined in the location provided.


## Catalog Entities API

### Endpoint

Retrieves catalog entities that match a specific filter from the Harness IDP.

### HTTP Method

`GET`

### URL 

```bash
https://idp.harness.io/{ACCOUNT_IDENTIFIER}/idp/api/catalog/entities
```
### URL Parameters

1. `ACCOUNT_IDENTIFIER`: Your Harness account ID.

You can find your account ID in any Harness URL, for example:

```bash
https://app.harness.io/ng/account/ACCOUNT_ID/idp/overview
```

2. Lists entities. Supports the following **query parameters**, described in sections below:

`filter`, for selecting only a subset of all entities
`fields`, for selecting only parts of the full data structure of each entity
`offset`, `limit`, and `after` for pagination

#### Filtering
You can pass in one or more filter sets that get matched against each entity. Each filter set is a number of conditions that all have to match for the condition to be true (conditions effectively have an AND between them). At least one filter set has to be true for the entity to be part of the result set (filter sets effectively have an OR between them).

Example:

```bash
/entities?filter=kind=user,metadata.namespace=default&filter=kind=group,spec.type

  Return entities that match

    Filter set 1:
      Condition 1: kind = user
                   AND
      Condition 2: metadata.namespace = default

    OR

    Filter set 2:
      Condition 1: kind = group
                   AND
      Condition 2: spec.type exists
```

### Headers
- `x-api-key`: Your Harness API token.
- `Harness-Account`: Your Harness account ID.

### cURL Example

```cURL
curl 'https://idp.harness.io/{ACCOUNT_IDENTIFIER}/idp/api/catalog/entities?filter=kind=template' \
--header 'x-api-key: {X_API_KEY}' \
--header 'Harness-Account: {ACCOUNT_IDENTIFIER}'
```

### Response:
The response will include a list of catalog entities that match the specified filter criteria.
