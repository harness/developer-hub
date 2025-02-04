---
title: "HTTP Exception: Chain validation failed"
sidebar_label: "HTTP Exception: Chain validation failed"
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to Android SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360042140631-HTTP-Exception-Chain-validation-failed </button>
</p>

## Issue

When running Android app in Emulator, Split Android SDK shows the error below right after initialization:
```
io.split.android.client.network.HttpException: HttpException: Error serializing request body: Chain validation failed
```

## Root Cause

This error is coming from the SSL Handshake library, since the SDK is trying to call GET http request to https://sdk.split.io. A possible root cause is the device time is off the current time.

## Solution

In the device Config page, make sure the device Date/Time is synched to the current time and restart the app.