---
title: "React SDK: Is it possible to get treatments outside the components?"
sidebar_label: "React SDK: Is it possible to get treatments outside the components?"
sidebar_position: 5
---

## Question

Using the React SDK, is it possible to get feature flag treatments through JavaScript code in addition to using the SDK React components? 

## Answer

Yes, it is possible. The React SDK is created on top of the same JavaScript SKD core, so it supports all the objects and functions provided in it.

The code below can be used to get treatment using the same factory object created initially:
```javascript
import { SplitSdk } from "@splitsoftware/splitio-react"

const splitFactory = SplitSdk({
  core: {
    authorizationKey: 'YOUR_BROWSER_API_KEY',
    key: 'key'
  }
})

// create new client object
const client = splitFactory.client("userId");
const treatment = client.getTreatment("splitName");
```