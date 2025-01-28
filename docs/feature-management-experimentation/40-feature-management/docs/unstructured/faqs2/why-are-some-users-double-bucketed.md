---
title: Why are some user Ids double bucketed?
sidebar_label: Why are some user Ids double bucketed?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360007319391-Why-are-some-user-Ids-double-bucketed <br /> ✘ images still hosted on help.split.io </button>
</p>

## Issue

Using Javascript SDK, some percentage of User Ids are double bucketed: the same User Id is processed in the Control block, and at a later call in an actual treatment block.

## Root Cause

One possible root cause is Javascript SDK engine is completing fetching the treatments after the requestTimeoutBeforeReady parameter or the readyTimeout parameter, which will fire the browser event SDK_READY_TIMED_OUT.

This is more likely for mobile users with a slow internet connection.

If the Javascript code does not handle the event properly, for example, it only raises an error and exits:

```javascript
var client = SdkFactory.client();this.clientReady = new Promise(function(resolve,reject) {
   client.once(client.Event.SDK_READY, function() {
      resolve();
   });
   client.once(client.Event.SDK_READY_TIMED_OUT, function() {
      reject(new Error("Client SDK Ready Timed Out"));
   });
});
```

There are two possible events here:

1. If the SDK_READY event comes first, the code resolves that promise and everything is ok.
2. If the SDK_READY_TIMED_OUT event comes first, the code rejects that promise and it will always be rejected, which means that if you attach a success callback on that function (this.clientReady in the example) always calling any .catch() callback re-attached to it, even if the SDK eventually gets ready. 

If you just add a catch function that does not return nor throw an error, the custom wrapper may continue executing with an SDK that's NOT ready, thinking it's ready. For example:

```javascript
this.clientReady.catch(() => {}).then(() => { do some stuff with the SDK })
```

Notice the catch function does not return nor throws an error, swallowing the error or recovering the promise chain. If you don't throw nor return an error, the JavaScript engine will consider the callback chain as recovered (each callback you add returns a new promise). Not throwing an error on a catch is the way JavaScript developers have to handle errors and keep the flow executing.

If you do that, you won't have a trustworthy signal of the SDK being ready on that promise.

Going back, even if you are getting a SDK_READY_TIMED_OUT event, the SDK may get ready a few ms later, emit the SDK_READY event and work as expected. You should handle ready event, and timeout event only when they want you actually want to handle it. 

## Solution

There are two possible solutions here:

1. Adjust the SDK Timeout and retry parameters

  This setting will allow the SDK to try twice before giving up in the first initial attempt. It will try again after 30-60 seconds. The 5 seconds is proposed as a worst-case scenario of how long it takes to fetch the definitions. It's faster to wait for the first fetch, so setting the requestTimeoutBeforeReady and readyTimeout to the same or similar values is harmless. (readyTimeout would be the overall value, including the retries, while the requestTimeoutBeforeReady is the timeout per request)

  ```javascript
      startup: {
        requestTimeoutBeforeReady: 5,   // 5 seconds
        readyTimeout: 5,                // 5 seconds
        retriesOnFailureBeforeReady: 2, // 2 retries
      }
  ```

2. Use the LOCALSTORAGE in the browser to store the Splits and mySegments data. This will fetch only for changes since the last good fetch on that browser. This makes it much faster for the SDK to be in the ready state on subsequent loads since it will remove the need of downloading all data on every load. See the following doc link [https://docs.split.io/docs/javascript-sdk-overview#section-configuration](https://docs.split.io/docs/javascript-sdk-overview#section-configuration), but you only need to specify the storage entry on your SDK configuration. Try to use a custom prefix that represents your organization or project, since it's the tool for preventing data collision between different projects.

  ```javascript
   storage: {
    type: 'LOCALSTORAGE',
    prefix: 'MYPREFIX'
  },
  ```