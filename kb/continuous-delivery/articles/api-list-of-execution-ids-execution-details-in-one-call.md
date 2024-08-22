---
description: KB - API to get list of plaExecutionIDs and all execution details
title: API to get list of plaExecutionIDs and all execution details in one call
---

## Overview

A new API has been implemented to fetch a lite version of execution details along with the input YAML that was passed during the execution. This API supports pagination to efficiently manage large datasets.

## API Response Structure

The API response follows this structure:

```json
{
  "data": {
    "content": [],
    "currentSize": 2,
    "lastSeenExecutionId": "1QWLJlsoT9eLAJ354ceG2w",
    "lastSeenStartTime": 1720218057692,
    "hasMore": true
  }
}
```
- **content**: The array containing the requested execution details.
- **currentSize**: The number of records returned in the current page.
- **lastSeenExecutionI**: A cursor indicating the last execution ID seen. Use this for the next page request.
- **lastSeenStartTime**: A cursor indicating the start time of the last execution seen. Use this for the next page request.
- **hasMore**: A boolean flag that indicates whether more data is available.

## Pagination Workflow

To retrieve all available data, follow this process:

1. Initial API Call

- Make the initial API call without passing `lastSeenExecutionId` or `lastSeenStartTime`.

```bash
curl --location 'https://app.harness.io/gateway/pipeline/api/pipelines/execution/summary/outline?routingId=ACCOUNT_ID&accountIdentifier=ACCOUNT_ID&orgIdentifier=default&projectIdentifier=PROJECT_ID&size=10' \
--header 'Content-Type: application/json' \
--data '{
    "timeRange": {
        "startTime": "1702443600000",
        "endTime": "1720530994468"
    },
    "planExecutionIds": ["-7ZBbnWYRSyGhblr69xoYQ", "-VuFWzd1T9aonuCe4Iwi5w", "0uxxAPBVTWSM-pP2_bWt9A", "1CopN8KKSJW47K5_GAObdA", "1QWLJlsoT9eLAJ354ceG2w", "1_kPM2P_Tfq5Jq0noQ3FZQ"]
}'
```

2. Handling the Response

- Check the `hasMore` field in the response.
- If hasMore is true, prepare for the next request using the `lastSeenExecutionId` and `lastSeenStartTime` from the current response.

```json
{
    "data": {
        "content": [],
        "currentSize": 2,
        "lastSeenExecutionId": "1QWLJlsoT9eLAJ354ceG2w",
        "lastSeenStartTime": 1720218057692,
        "hasMore": true
    }
}
```
3. Subsequent API Calls

- Use the `lastSeenExecutionId` and `lastSeenStartTime` from the previous response to fetch the next page.

```bash
curl --location 'https://app.harness.io/gateway/pipeline/api/pipelines/execution/summary/outline?routingId=ACCOUNT_ID&accountIdentifier=ACCOUNT_ID&orgIdentifier=default&projectIdentifier=PROJECT_ID&size=10&lastSeenExecutionId=1QWLJlsoT9eLAJ354ceG2w&lastSeenStartTime=1720218057692' \
--header 'Content-Type: application/json' \
--data '{
    "timeRange": {
        "startTime": "1702443600000",
        "endTime": "1720530994468"
    },
    "planExecutionIds": ["-7ZBbnWYRSyGhblr69xoYQ", "-VuFWzd1T9aonuCe4Iwi5w", "0uxxAPBVTWSM-pP2_bWt9A", "1CopN8KKSJW47K5_GAObdA", "1QWLJlsoT9eLAJ354ceG2w", "1_kPM2P_Tfq5Jq0noQ3FZQ"]
}'
```

## Key Notes
- Pagination Fields:
  - **hasMore**: Indicates if more data is available.
  - **lastSeenStartTime** and **lastSeenExecutionId**: Used as cursors for subsequent requests. These should only be passed after the first API call.
- Behavioral Considerations:
  - When the number of records fetched equals the page size, the API might set `hasMore` to true even if no additional data exists. In such cases, an extra API call will return no data, and hasMore will be false.