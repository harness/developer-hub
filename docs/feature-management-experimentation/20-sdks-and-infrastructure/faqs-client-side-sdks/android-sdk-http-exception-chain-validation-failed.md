---
title: "HTTP Exception: Chain validation failed"
sidebar_label: "HTTP Exception: Chain validation failed"
sidebar_position: 18
---

## Issue

When running Android app in Emulator, Android SDK shows the error below right after initialization:
```
io.split.android.client.network.HttpException: HttpException: Error serializing request body: Chain validation failed
```

## Root Cause

This error is coming from the SSL Handshake library, since the SDK is trying to call GET http request to https://sdk.split.io. A possible root cause is the device time is off the current time.

## Solution

In the device Config page, make sure the device Date/Time is synched to the current time and restart the app.