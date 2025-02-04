---
title: "Calling client.Destory does not post impressions"
sidebar_label: "Calling client.Destory does not post impressions"
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to Anddroid SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360049698832-Calling-client-Destory-does-not-post-impressions-in-Android-SDK </button>
</p>

## Issue

When using Android SDK in an app, before the app exits, calling `client.Destroy()` is suppose to clear the SDK cache and post all impressions; however, the cached impressions are not showing up Live tail tab in Split user interface.

## Root Cause

The `client.Destory()` will post any cached impressions, however, if the app shutdown its process before or during the post request, the request will fail and no impressions are posted to Split cloud.

## Solution

To resolve the issue, there are two options:

* This is the recommended action, add to the app workflow calling client.Flush() method which will post the cached impressions and events to Split cloud.
* Add a 2-3 seconds sleep or delay after the `client.Destory()` to allow enough time to post the impressions before the app exits, the amount of seconds will be depend on how fast the network though, it is recommended to adjust it accordingly.
