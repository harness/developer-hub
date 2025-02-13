---
title: "isTimeout prop is not returning true when the SDK times out"
sidebar_label: "isTimeout prop is not returning true when the SDK times out"
helpdocs_is_private: false
helpdocs_is_published: true
---

<!-- applies to React SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4565112396941-isTimeout-prop-is-not-returning-true-when-React-SDK-time-out </button>
</p>

## Issue

When using Split React SDK, it is recommended to check if the SDK has timed out within a specific timeout before it finish downloading the cache and signal its ready.

For the example below, the code does not display the message when SDK has timed-out:
```javascript
import { useContext } from 'react';
import { SplitContext } from "@splitsoftware/splitio-react";
const MyComponent = () => {
  const { isReady, isTimedout } = useContext(SplitContext);
  return isTimedout ?
    <p>SDK has Timedout</p>
    <MyFeature /> :
    <Loading />
}
```

## Root Cause

When the SDK reaches the time out value that is specified in parameter below:
```javascript
startup.readyTimeout
Which by default is 10 seconds, the SDK_READY_TIMED_OUT event is fired only once. If the code that is using the isTimedoutprop is placed after the event has fired, it will not detect it.
```
 
## Solution
The SDK provide the `updateOnSdkTimedout` prop for this scenario, setting this prop to `true` will enforce always checking if the `SDK_READY_TIMED_OUT` has been fired in the past, the code below will resolve the issue:
```javascript
<SplitClient updateOnSdkTimedout={true} >
<SplitTreatments names={['SPLIT_NAME', 'SPLIT_NAME_2']} >
{({ isReady, isTimedout, hasTimedout, lastUpdate, treatments }) => {
// Do something with the treatments for the account traffic type.
}}
</SplitTreatments>
</SplitClient>
```