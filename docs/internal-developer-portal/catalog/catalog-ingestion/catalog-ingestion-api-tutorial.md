---
title: Usage of Catalog Ingestion APIs
description: Steps to use Catalog Ingestion API to ingest metadata and use the information on catalog overview and workflows
sidebar_position: 7
sidebar_label: Usage of Catalog Ingestion API
redirect_from:
  - docs/internal-developer-portal/catalog/ccp-for-workflows
---

<DocsTag  backgroundColor= "#cbe2f9" text="Tutorial"  textColor="#0b5cad"  />

## Introduction

In this tutorial we will be using the catalog metadata ingestion APIs to add additional metadata for the software components in the catalog, display them in the component overview page using [additional info card](/docs/internal-developer-portal/catalog/custom-card).

<DocImage path={require('./static/ccp-usecase.png')} />

## Pre-requisites

1. You must have components registered in your software catalog. If you don't have any components registered, follow this [tutorial](/docs/internal-developer-portal/catalog/register-software-component) to register one. We recommend you to register [this software component](https://github.com/harness-community/idp-samples/blob/main/example-catalog-info/cataog-info-ccp.yaml) for this tutorial.

## Add a new metadata

1. Now using the following cURL command add a new metadata `onShoreTeamLead` to the `boutique-service` component.

```bash
curl \
--location 'https://app.harness.io/gateway/v1/catalog/custom-properties/entity' \
--header 'Harness-Account: ADD_YOUR_ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'x-api-key: ADD_YOUR_API_KEY' \
--data '{
    "entity_ref": "boutique-service",
    "property": "metadata.additionalInfo.onShoreTeamLead",
    "value": "John Doe"
}'
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="Use the Metadata Information ">
<TabItem value="display-additional-info-card" label="Additional Info Card">

In case you want to display the same information you have ingested on your Overview page as an additional card, follow the steps below.

1. Go to the **Layout Page** and under **Admin** and add the following for **Services** and **Save** it.

```YAML
- component: EntityAdditionalInfoCard
    specs:
    props:
        title: Additional Info Card
        items:
        - label: On-Shore Team Lead
        value: <+metadata.additionalInfo.onShoreTeamLead>
        type: string
        style:
            bold: true
        - label: Off-Shore Team Lead
        value: <+metadata.additionalInfo.offShoreTeamLead>
        type: string
        style:
            bold: true
    gridProps:
        md: 6
```

![](./static/navigation-layout.png)

:::info

We had already added the `offShoreTeamLead` in the [`catalog-info.yaml`](https://github.com/harness-community/idp-samples/blob/main/example-catalog-info/cataog-info-ccp.yaml) as we have recommended above under the prerequisites, if you haven't used the same, you'll get a data not found error for the field.

:::

2. Now go to the **FoodService** Software Component in the **Catalog**, and you'll find an additional info card populated with information we ingested using the API above. You can read more about [additional info card](/docs/internal-developer-portal/catalog/custom-card)

![](./static/additional-info-card.png)

</TabItem>
</Tabs>

## Conclusion

Using the Catalog Metadata Ingestion API, you can source information into your catalog from internal systems such as cost trackers, service health checkers, security scans, or even from simple spreadsheets tracking personnel details and use them to just display the information to users as wells as use them as an input for workflows.

Check out [other examples of the Catalog Ingestion API](./catalog-ingestion-api.md).
