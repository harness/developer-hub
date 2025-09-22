---
title: Client-side SDKs
description: Learn about Harness FME client-side SDKs.
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-client-side-sdks/ios-android-browser-sdk-fme-changes-roll-out-slowly-to-user-devices
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-client-side-sdks/ios-android-browser-sdk-does-the-sdk-cache-expire
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-client-side-sdks/ios-and-android-sdk-how-to-initialize-for-multiple-user-ids
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-client-side-sdks/
---

## Overview

Harness FME provides client-side SDKs that let you evaluate feature flags, run experiments, and deliver personalized experiences directly in your application's frontend.

These SDKs are optimized for real-time updates and minimal latency, ensuring that your users always experience the most up-to-date feature set.

## Does the SDK cache expire?

The Split mobile (iOS and Android) and JavaScript Browser SDKs download a local cache of flag data and store it in the device or browser file system. This cache has a default expiration period of 10 days in most SDKs, after which the SDK refreshes the cache from scratch. 

The default and configuration options differ slightly by SDK:

* JavaScript SDK (v11.2.0 and later): Default expiration of 10 days, configurable via the `LOCALSTORAGE` setting.
* Browser SDK (v1.2.0 and later): Default expiration of 10 days, configurable via the `InLocalStorage` setting. See [Configuring persistent cache for the SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/browser-sdk#configuring-persistent-cache-for-the-sdk).
* Android SDK (v5.3.0 and later): Default expiration of 10 days, configurable via the `rolloutCacheConfiguration` setting.
* iOS SDK (v3.3.0 and later): Default expiration of 10 days, configurable via the `rolloutCacheConfiguration` setting.

All SDKs continue to store impressions and events for up to 90 days. After that period, the cache is considered stale and may be purged.

## How to initialize for multiple user IDs?

The JavaScript SDK supports initializing [multiple client objects](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk#instantiate-multiple-sdk-clients) from the same SDK factory, each with a unique user key (or user ID):

```javascript
client1 = factory.client("user_id1");
client2 = factory.client("user_id2");
```

For mobile SDKs, see the [iOS](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/ios-sdk/#instantiate-multiple-sdk-clients) and [Android SDK documentation](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-sdk/#instantiate-multiple-sdk-clients).

:::info Feature flag update timing
When you make changes to a feature flag in the Harness UI, mobile (iOS, Android) and JavaScript Browser SDKs may not reflect the update immediately for all users. 

Updates roll out gradually (some devices sync within the first day, with more devices updating in the following days) unless your code waits for the `SDK_READY` event. If your app only uses cached data from the previous session (triggered by `SDK_READY_FROM_CACHE`), users may continue to see the old values until their cache syncs. 

To ensure the latest changes are reflected, calculate treatments after the `SDK_READY` event fires, and update them if the value changes after initial load.
:::

import { Section, clientSideSDKs } from '@site/src/components/Docs/data/fmeSDKSData';

## Get started

Select a platform to start integrating FME into your client application.

<Section items={clientSideSDKs} />