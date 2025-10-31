---
title: Upload Developer Cloud IDs Using the Harness SEI API
description: Learn how to use the Harness SEI API to programmatically add or update developer emails and cloud IDs.
sidebar_label: Upload Developer Cloud IDs
sidebar_position: 2
---

## Overview

This page explains how to add or update developer identities using cloud IDs, provides best practices for integrating with external systems, and includes troubleshooting information to validate developer data before applying changes. 

In some cases, SEI cannot automatically fetch user details such as emails, cloud IDs, and account IDs, from source integrations due to API restrictions or security limitations. This helps you:

- Add or update developer cloud IDs and emails.
- Map developer contributions accurately in SEI 2.0 from integrations where Harness SEI cannot fetch user records.
- Correct identity mismatches for accurate metric reporting.

To ensure accurate identity mapping, SEI provides two options:

- **Developer Identity API** (JSON-based upload): Add or update identities via API calls.
- **CSV Upload API** (File-based upload): Bulk upload identities using a CSV file.

  | New Endpoint                  | Method | Notes                                                                        |
  | ----------------------------- | ------ | ---------------------------------------------------------------------------- |
  | `GET /v2/developers/identities` | `GET`    | Retrieve developer identities (JSON) with filtering, sorting, and pagination. |
  | `GET /v2/developers/identities` | `GET`    | Download all developer identities as CSV (text/csv).                          |

For a complete list of endpoints and schema definitions, see the [Harness API reference documentation](https://apidocs.harness.io/).

## Developer Identity API 

Use the Developer Identity API in the following scenarios:

- Your integration (e.g. Bitbucket Cloud / GitLab Cloud etc) does not expose user identity APIs.
- You want to bulk override or correct developer identity mappings in SEI.
- You need to pre-populate developer identities during onboarding to reduce manual review.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs> 
<TabItem value="new" label="Current (v2)">

- **JSON Endpoint**: `PATCH /v2/developers/identities`
- **CSV Endpoint**: `PATCH /v2/developers/identities` (multipart/form-data)
- **Authentication**: Requires an API key with `developer_records:write` scope.

Add or update developer identities (JSON or CSV). Simplified resource-based URI replaces `/cloud-ids` and `/cloud-ids/upload`.

If you are using JSON:

```bash
curl -X PATCH \
  'https://app.harness.io/prod1/sei/api/v2/developers/identities' \
  -H "accept: application/json" \
  -H "x-api-key: <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "email": "developer@example.com",
      "integrationId": 123,
      "identity": "bitbucket-user-123"
    }
  ]'
```

If you are using a CSV file:

```bash
curl -X PATCH \
  'https://app.harness.io/prod1/sei/api/v2/developers/identities' \
  -H "x-api-key: <YOUR_API_KEY>" \
  -F 'file=@"/PATH/Downloads/sample_developer.csv"'
```

</TabItem> 
<TabItem value="old" label="Previous">

- **JSON Endpoint**: `POST /v2/developers/cloud-ids`
- **CSV Endpoint**: `POST /v2/developers/cloud-ids/upload`

### Request Format

#### Headers

| Header        | Value                    |
| ------------- | ------------------------ |
| X-Api-Key     | `<SEI API token>`        |
| Content-Type  | application/json         |

#### Payload Example

```json
{
  "integrationUsers": [
    {
      "email": "developer@example.com",
      "applicationType": "BITBUCKET_CLOUD",
      "cloudId": "dev123-cloud"
    },
    {
      "email": "jane.doe@example.com",
      "applicationType": "CUSTOM",
      "cloudId": "jane.doe-internal"
    }
  ]
}
```

#### Fields

| Field           | Type   | Required | Description                                                                                    |
| --------------- | ------ | -------- | ---------------------------------------------------------------------------------------------- |
| `email`           | String | Yes      | Developer’s primary email address. Used for identity correlation.                              |
| `applicationType` | String | Yes      | Source system identifier (e.g., `GITHUB`, `GITLAB_CLOUD`, `BITBUCKET_SERVER`, `HARNESS_CODE`, `CUSTOM`). |
| `cloudId`         | String | Yes      | The unique user identifier from the integration (e.g., username, account ID).                  |

#### Example cURL request

```bash
curl --location 'https://<sei-host>/v2/developers/cloud-ids' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: pat.xyz' \
--data-raw '{
  "integrationUsers": [
    {
      "email": "aaron.phillips@company.com",
      "applicationType": "CUSTOM",
      "cloudId": "phillips.aaron-api1"
    }
  ]
}'
```

#### Response

**Success (200 OK)**

```json
{
  "status": "success",
  "message": "Developer identities updated successfully."
}
```

**Failure (400/401)**

```json
{
  "status": "error",
  "message": "Invalid payload or missing authorization."
}
```

</TabItem> 
</Tabs>

## CSV Upload API (File-based)

Use the CSV Upload API in the following scenarios:

- You want to bulk add or update developer identities from a CSV file instead of sending JSON payloads.
- You need to migrate a large set of developer records during onboarding or system setup.
- You want to correct or override multiple developer mappings at once.
- Your integration or workflow produces CSV reports with developer identifiers that can be directly uploaded.

<Tabs> 
<TabItem value="new" label="Current (v2)">

- **Endpoint**: `PATCH /v2/developers/identities`  
- **Authentication**: Requires an API key with `developer_records:write` scope.  

### Request Format

Use `Content-Type: multipart/form-data` to upload a CSV file.

#### Example cURL request

```bash
curl -X PATCH \
  'https://app.harness.io/prod1/sei/api/v2/developers/identities' \
  -H "x-api-key: <YOUR_API_KEY>" \
  -F 'file=@"/PATH/Downloads/sample_developer.csv"'
```

#### Response

**Success (200 OK)**

```json
{
  "status": "success",
  "message": "CSV processed and developer identities updated successfully."
}
```

**Failure (400/401)**

```json
{
  "status": "error",
  "message": "Invalid file format or missing authorization."
}
```

</TabItem> 
<TabItem value="old" label="Previous">

- **Endpoint**: `POST /v2/developers/cloud-ids/upload`
- **Authentication**: Requires an API key with `developer_records:write` scope.
- Multipart form-data with CSV file upload.

### Request Format

#### Headers

| Header        | Value                    |
| ------------- | ------------------------ |
| Authorization | Bearer `<SEI API token>` |
| Content-Type  | multipart/form-data (auto) |

#### Example cURL request

```bash
curl --location 'https://<sei-cluster-base-url>/v2/developers/cloud-ids/upload' \
--header 'Authorization: pat.xyz' \
--form 'file=@"/PATH/Downloads/sample_developer.csv"'
```

#### Response

**Success (200 OK)**

```json
{
  "status": "success",
  "message": "CSV processed and developer identities updated successfully."
}
```

**Failure (400/401)**

```json
{
  "status": "error",
  "message": "Invalid file format or missing authorization."
}
```

</TabItem> 
</Tabs>

## Best practices

- The developers in your organization should use consistent emails across integrations to improve automatic correlation.
- If your organization has additional security restrictions that block the SEI system from fetching user identity details, we recommend automating periodic syncs of developer identities into SEI via the API.
- The team managers or admins should periodically review developer mappings in the SEI UI to ensure accurate attribution of developer effort in the metrics.