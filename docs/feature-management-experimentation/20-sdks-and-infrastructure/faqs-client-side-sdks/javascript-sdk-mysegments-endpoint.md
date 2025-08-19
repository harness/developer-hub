---
title: "Why does the JavaScript URL \"https://sdk.split.io/api/mySegments/\" return HTTP 404 error?"
sidebar_label: "Why does the JavaScript URL \"https://sdk.split.io/api/mySegments/\" return HTTP 404 error?"
sidebar_position: 28
---

## Problem
Using JavaScript SDK, its generating URL below with 404 errors
```
GET https://sdk.split.io/api/mySegments/ 404
```

## Root Cause

The URL https://sdk.split.io/api/mySegments/ is missing the key id which is why we are seeing 404 errors. For example, if the key ID (or customer ID) is set to 8879, then this URL will look like:
```
GET https://sdk.split.io/api/mySegments/8879
```

## Solution

Make sure to specify the key or customer ID correctly in the factory initializer line or when fetching client object line:

```javascript
var factory = splitio({ 
  core: {
    authorizationKey: 'YOUR_API_KEY',
    key: 'CUSTOMER_ID',
    trafficType: 'TRAFFIC_TYPE'
  }
var user_client = factory.client('CUSTOMER_ID', 'TRAFFIC_TYPE');
```