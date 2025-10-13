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

For a complete list of endpoints and schema definitions, see the [Harness API reference documentation](https://apidocs.harness.io/).

## Developer Identity API (JSON)

Use the Developer Identity API in the following scenarios:

- Your integration (e.g. Bitbucket Cloud / GitLab Cloud etc) does not expose user identity APIs.
- You want to bulk override or correct developer identity mappings in SEI.
- You need to pre-populate developer identities during onboarding to reduce manual review.

**Endpoint**: `POST /v2/developers/cloud-ids`

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

## CSV Upload API (File-based)

Use the CSV Upload API in the following scenarios:

- You want to bulk add or update developer identities from a CSV file instead of sending JSON payloads.
- You need to migrate a large set of developer records during onboarding or system setup.
- You want to correct or override multiple developer mappings at once.
- Your integration or workflow produces CSV reports with developer identifiers that can be directly uploaded.

**Endpoint**: `POST /v2/developers/cloud-ids/upload`

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

## Best practices

- The developers in your organization should use consistent emails across integrations to improve automatic correlation.
- If your organization has additional security restrictions that block the SEI system from fetching user identity details, we recommend automating periodic syncs of developer identities into SEI via the API.
- The team managers or admins should periodically review developer mappings in the SEI UI to ensure accurate attribution of developer effort in the metrics.