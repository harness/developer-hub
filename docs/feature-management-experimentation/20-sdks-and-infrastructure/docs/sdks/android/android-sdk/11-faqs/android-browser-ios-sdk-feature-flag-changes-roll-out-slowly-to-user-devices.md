---
title: "Feature flag changes roll out slowly to user devices"
sidebar_label: "Feature flag changes roll out slowly to user devices"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360059049411-Mobile-and-web-SDK-Split-changes-roll-out-slowly-to-user-devices </button>
</p>

## Issue

When making a change to a feature flag through the web UI, mobile (iOS and Android) and JavaScript Browser SDKs do not reflect that change at the same time. A small population of devices are synched in the first day, then more user devices get synched in subsequent days until all SDKs are updated. 

Why do Split changes propagate slowly to user devices?

## Root Cause

This scenario has two potential root causes:

* The code in mobile app or web page does not listen to `SDK_READY` event, and thus will use the stored cache from the last user session, which is not synched to latest changes. When the user hits the page the next day, the existing cache will be synched from the previous day, so the change is detected now and reflected in the impression.
* The code in mobile app or web page listens to `SDK_READY_FROM_CACHE` event only and triggers getTreatment calls after that event fires. This event will fire if the SDK detected the cache exists in App/Browser filesystem, which is not synched yet with latest changes. This is why the treatments will always reflect the cache from the previous user session.

## Solution

Always calculate treatments after `SDK_READY` event fires. This event fires once the synchronization with Split cloud is complete and will guarantee the latest changes are reflected in the cache.

While `SDK_READY_FROM_CACHE` is very useful to allow calculating treatments quickly, it is recommended to check the treatment again after `SDK_READY` and reflect the treatment in case there is a change.