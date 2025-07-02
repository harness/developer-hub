---
title: "Android SDK: SDK takes too long to get ready"
sidebar_label: "Android SDK: SDK takes too long to get ready"
sidebar_position: 16
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360043275471-Android-SDK-SDK-takes-too-long-to-get-ready </button>
</p>

## Issue

When using Android SDK, the first time the App loads the SDK takes sometime to download definitions from Harness FME servers and cache them locally. However, when SDK starts afterwards, it still takes long time even though the cache is already downloaded to app file system.

## Root Cause

If the version of Android SDK used is 2.4.2 or below, the issue can manifest since the factory object is still making a full data request from Harness FME servers even if the previous cache exists in app file system.

## Solution

Upgrade Android SDK to latest build to fix this issue,

To prevent your app from waiting indefinitely on the SDK in case there is an issue with the network, you can listen to SDK_READY_TIMED_OUT with a specific timeout you can set. This will allow your code to move on and not continue to wait on the SDK.

Another useful event is SDK_READY_FROM_CACHE, since the first time the SDK runs successfully in the app it will store the cache in the app storage, so the next time the SDK initializes it can use the existing cache and does not need to wait for the network sync.

For more info please check the [SDK doc](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-sdk#basic-usage).