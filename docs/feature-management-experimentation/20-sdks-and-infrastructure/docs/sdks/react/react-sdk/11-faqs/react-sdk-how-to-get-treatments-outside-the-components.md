---
title: "How to get treatments outside of Components?"
sidebar_label: "How to get treatments outside of Components?"
helpdocs_is_private: false
helpdocs_is_published: true
---

<!-- applies to React SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020863412-General-SDK-Always-getting-control-treatments </button>
</p>

## Question

Using the React SDK, is it possible to get Split treatments through JavaScript code in addition to using the SDK React components? 

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