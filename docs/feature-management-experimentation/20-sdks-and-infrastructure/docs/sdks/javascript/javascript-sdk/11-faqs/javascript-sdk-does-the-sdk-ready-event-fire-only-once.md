---
title: "Does the SDK_READY event fire only once?"
sidebar_label: "Does the SDK_READY event fire only once?"
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to JavaScript SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360053286091-JavaScript-SDK-Does-SDK-READY-event-fire-only-once </button>
</p>

## Problem

When implementing the code below, sometimes the code never gets executed even though no errors are captured from the SDK Error log.

```javascript
client.on(client.Event.SDK_READY, function() { 
    var treatment = client.getTreatment("SPLIT_NAME"); 
    console.log("Treatment = "+treatment);
});
```

## Root Cause

The `SDK_READY` fires only once, so if the code block above is executed **after** the `SDK_READY` event is fired, it will never be triggered.

## Solution

Another option to check for SDK ready is using the built-in Promise `client.ready()`, this can be used anytime, which gives it more advantage over checking the event only, see the example below:

```javascript
client.ready().then(() => {
    var treatment = client.getTreatment("SPLIT_NAME"); 
    console.log("Treatment = "+treatment);
});
```