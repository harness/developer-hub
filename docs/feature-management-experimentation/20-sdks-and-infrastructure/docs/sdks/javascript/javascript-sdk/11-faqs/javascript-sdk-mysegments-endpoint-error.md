---
title: mySegments endpoint returns HTTP 404 error
sidebar_label: mySegments endpoint returns HTTP 404 error
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to JavaScript SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360019195211-Why-does-the-JavaScript-URL-https-sdk-split-io-api-mySegments-return-HTTP-404-error </button>
</p>

## Question

Why does the JavaScript URL \"https://sdk.split.io/api/mySegments/\" return HTTP 404 error?"

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