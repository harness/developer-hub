---
title: "Mobile and web SDK: Does the SDK cache expire?"
sidebar_label: "Mobile and web SDK: Does the SDK cache expire?"
sidebar_position: 8
---

## Question

The Split mobile (iOS and Android) and JavaScript Browser SDKs download a local cache and store it in a file system. Does the cache have an expire date or TTL?

## Answer

- For the JavaScript SDK, version 11.2.0 introduces a default cache expiration period of 10 days, which is configurable using the `LOCALSTORAGE` setting. After expiration, the SDK will refresh the cache from scratch. 
- For the Browser SDK, version 1.2.0 introduces a default cache expiration period of 10 days, which is configurable using the `InLocalStorage` setting. For more information, see [Configuring LocalStorage cache for the SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/browser-sdk#configuring-localstorage-cache-for-the-sdk).
- For the Android SDK, version 5.3.0 introduces a default cache expiration period of 10 days, which is configurable using the `rolloutCacheConfiguration` setting. After expiration, the SDK will refresh the cache from scratch.
- For the iOS SDK, version 3.3.0 introduces a default cache expiration period of 10 days, which is configurable using the `rolloutCacheConfiguration` setting. After expiration, the SDK will refresh the cache from scratch.

All SDKs continue to store impressions and events for up to 90 days, after which the cache is considered stale and may be purged.
