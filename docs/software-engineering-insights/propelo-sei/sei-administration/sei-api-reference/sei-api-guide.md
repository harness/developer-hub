---
title: SEI API Guide
description: The SEI services API guide
sidebar_label: SEI API Guide
sidebar_position: 10
---

<CTABanner
  buttonText="View API Docs"
  title="The API documentation for the SEI Services is now available"
  link="https://apidocs.harness.io/tag/Collection-categories/"
  closable={true}
  target="_self"
/>

## Overview

This topic explains how to interact with the Harness SEI APIs, including details about service endpoints, authentication, content types, and pagination. This allows you to access and manage various resources programmatically within Harness SEI.

:::info API REFERENCE DOCUMENTATION
For detailed documentation of endpoints and other Harness SEI API reference information, go to the [Harness API reference documentation](https://apidocs.harness.io/tag/Collection-categories/).
:::

### Service endpoint

A service endpoint is the base URL that specifies the network address of an API service. One service might have multiple service endpoints. This service has the following service endpoints and all URIs below are relative to this service endpoint:

#### Harness SEI Environments

* Prod 1: https://app.harness.io/prod1/sei/api/ 
* Prod 2: https://app.harness.io/gratis/sei/api/ 

### Authentication

For authentication, use an SEI APIKEY in the Authorization header:

```bash
Authorization: APIKEY <HARNESS_SEI_API_KEY>
```

:::info
Note that the SEI APIKEY is different from a Harness Platform key. You can generate SEI APIKEYs in the SEI module at the Account level.
:::

Follow the steps below to generate an SEI APIKEY in Harness.

* Go the **Harness SEI Account** and select **APIKEYS** under the **SEI Settings**
* Click on the **Create APIKEY** button at the top right corner
* Add a name and description for the APIKEY
* Choose the role as either **Admin** or **Ingestion**. For this use case select the role of Admin.
* Click on the **Create button** to generate the APIKEY. 

### Content-Type

All payloads are to be in JSON format. Use the following header when making requests:

```bash
Content-Type: application/json
```

### Pagination

Some API endpoints that return a list of records support pagination to manage large datasets efficiently.

#### Request Parameters

Include these parameters in your request payload to control pagination:

```bash
{
  "page": 0,
  "page_size": 100
}
```

#### Response Metadata

The response will include a metadata object with pagination information:

```bash
{
  "_metadata": {
    "page_size": 100,
    "page": 0,
    "has_next": true,
    "total_count": 256
  }
}
```

This metadata helps you determine how much more data is available for retrieval in subsequent requests.

### Reference documentation

For detailed documentation of endpoints and other Harness SEI API reference information, go to the [Harness API reference documentation](https://apidocs.harness.io/tag/Collection-categories/).