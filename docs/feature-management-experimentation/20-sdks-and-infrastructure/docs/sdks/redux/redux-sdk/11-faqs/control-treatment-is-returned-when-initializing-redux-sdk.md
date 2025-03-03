---
title: "Control treatment is returned when initializing Redux SDK"
sidebar_label: "Control treatment is returned when initializing Redux SDK"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4584119025421-Redux-SDK-Control-treatment-returned-when-SDK-is-initialized </button>
</p>

## Issue

Implementing the Redux SDK using isReady prop should guarantee correct treatment, however, There's a split second where 'isReady' is true and the treatment is control right after the SDK factory is initialized. The treatment flips quickly to on quickly. What is causing this flickering? Example code below:

```
export default function initialise() {
  store.dispatch(initSplitSdk({ config: sdkBrowserConfig, onReady: onReadyCallback, onUpdate: onUpdateCallback }));
} function onReadyCallback() {
  console.log("Split Ready...");
  store.dispatch(getTreatments({ splitNames: ['Show_league'] }));
...
} function onUpdateCallback() {
  console.log("Split updated...");
  store.dispatch(getTreatments({ splitNames: ['Show_league'] }));
...
}
```

## Root Cause

When the SDK initializes, it starts downloading the cache from Split cloud, during this time isReady is false, if we try fetching treatments at that point, we will get control. We also need to evaluate updating isReady flag to true once the SDK is ready asynchronously.

## Solution

The solution is to dispatch `getTreatments` actions immediately after the `initSplitSdk` action. `getTreatments` creates an async (Thunk) action that will evaluate feature flags when the SDK is ready, and also on SDK updates if you set the `evalOnUpdate` param to true (it is false by default). This way the isReady flag will update together with the treatments values, in a single **action**.
In the first approach (dispatching the `getTreatments` action in `onReadyCallback`), there are two separate updates: one of the isReady flag, and a second one of the treatments values (after dispatching `getTreatment` action in the callback).

For more details, check our public documentation, [here](https://help.split.io/hc/en-us/articles/360038851551-Redux-SDK#advanced-subscribe-to-events-and-changes).

```
export default function initialise() {
  store.dispatch(initSplitSdk({ config: sdkBrowserConfig, onReady: onReadyCallback, onUpdate: onUpdateCallback }));
  store.dispatch(getTreatments({ splitNames: ['Show_league'], evalOnUpdate: true }));
}function onReadyCallback() {
  console.log("Split Ready...");
  ...
}function onUpdateCallback() {
  console.log("Split updated...");
  ...
}
```