---
title: Calling client.Destroy does not post impressions in Android SDK
sidebar_label: Calling client.Destroy does not post impressions in Android SDK
sidebar_position: 10
---

## Issue

When using Android SDK in an app, before the app exits, calling client.Destroy() is suppose to clear the SDK cache and post all impressions; however, the cached impressions are not showing up Live tail tab in Split user interface.

## Root Cause

The `client.Destroy()` will post any cached impressions, however, if the app shutdown its process before or during the post request, the request will fail and no impressions are posted to Harness servers.

## Answer

To resolve the issue, there are two options:

* This is the recommended action, add to the app workflow calling client.Flush() method which will post the cached impressions and events to Harness FME servers.
* Add a 2-3 seconds sleep or delay after the `client.Destroy()` to allow enough time to post the impressions before the app exits, the amount of seconds will be depend on how fast the network though, it is recommended to adjust it accordingly.
