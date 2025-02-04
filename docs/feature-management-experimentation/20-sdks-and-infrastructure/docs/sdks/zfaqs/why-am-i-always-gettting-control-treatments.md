---
title: Why am I always getting control treatments?
sidebar_label: Why am I always getting control treatments?
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020863412-General-SDK-Always-getting-control-treatments </button>
</p>

## Problem

When using SDK, control treatment is either always or very often returned from `getTreatment` call.

## Root Cause

When `getTreatment` call returns `control`, this means either:

* The there is an issue with network connection to Split cloud and http calls are timing out. Enable the SDK debugging log file to verify if there are any network errors.
* The SDK is still downloading relevant feature flag definitions and Segments from Split cloud and still did not finish when `getTreatment` call is executed.

## Solution

The `control` treatment is most likely to return using the mobile SDKs; JavaScript, Android and iOS. Simply because potentially the SDK runs on users' mobile devices which may have a slow network connection.

That is why for these SDKs `getTreatment` should always be called when the SDK_READY events fires, which will ensure it's called after the SDK downloads all the information from Split cloud and avoid returning `control` treatments.

```
client.on(client.Event.SDK_READY, function() {
  var treatment = client.getTreatment("SPLIT_NAME");
  if (treatment == "on") {
      // insert code here to show on treatment
  } else if (treatment == "off") {
      // insert code here to show off treatment
  } else {
      // insert your control treatment code here
  }
});
```