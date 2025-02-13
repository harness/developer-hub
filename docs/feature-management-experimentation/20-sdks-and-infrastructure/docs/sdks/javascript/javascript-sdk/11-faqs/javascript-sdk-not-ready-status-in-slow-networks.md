---
title: In browser SDK returns Not Ready status with slow networks
sidebar_label: In browser SDK returns Not Ready status with slow networks
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to JavaScript SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360012551371-Why-does-the-JavaScript-SDK-return-Not-Ready-status-in-Slow-Networkslit.io/hc/en-us/articles/360020863412-General-SDK-Always-getting-control-treatments </button>
</p>

## Issue

When using JavaScript SDK in browser, the SDK status will mostly return Not Ready when users are on a slow Network (for example 3G).

## Root Cause

It takes a long time for the SDK to fetch the feature flags and Segments Information data from Split cloud due to slow network, which might cause control treatments.

## Solution

You need to Increase the startup.readyTimeout value to ensure it covers the SDK fetching Split configuration time.

As explained in https://docs.split.io/docs/javascript-sdk-overview under Configuration section, the default value for startup.requestTimeoutBeforeReady is 1.5 seconds.

Follow the steps below to implement the solution:

1. Find out how long it takes the browser to fetch the Split configuration under slow Network, Chrome Dev tools can be used to simulate 3G Network.
2. Make sure to enable the Java SDK console debug logging by running the following command in the browser JavaScript console:
  ```
localStorage.splitio_debug = 'on'
```
3. Load your page and check the debug logging, look for the following line:
  ```
[TIME TRACKER]: [Fetching - Splits] took xxxx ms to finish
```
  Where xxxx is the total time in milliseconds.

4. Set the `requestTimeoutBeforeReady` and `readyTimeout` parameters to a higher value than the total fetching time. Example:
  ```
var sdk = SplitFactory({
startup: {
  requestTimeoutBeforeReady: 5, 
  readyTimeout: 5
},  
```
5. In addition to the above, enable using the browser cache to store the Split configuration, to avoid using the network each time the Split configuration data is needed. You only need to specify the the structure below when initializing your SDK object:
  ```
storage: {
  type: 'LOCALSTORAGE',
  prefix: 'MYPREFIX'
},
```