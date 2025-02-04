---
title: Why is the SDK making hundreds of network calls?
sidebar_label: Why is the SDK making hundreds of network calls?
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360018619031-Why-is-the-SDK-making-hundreds-of-network-calls-without-using-getTreatment-or-track-methods </button>
</p>

## Problem

Using any Split SDK library, the Split library is making hundreds of network calls to split.io without using the `getTreatment` or `track` methods.

## Root Cause

If Splitio library is encapsulated in a class, and if every time the client object is needed, a new instance of factory and client objects are created, then all these objects will remain live in the memory and continue to perform synching the feature flag and segment changes with split.io.

Here is a JavaScript SDK example of such code:

```javascript
class SplitIO {
    constructor() {
        this.factory = splitio({
                          core: {
                               authorizationKey: 'xxxx',
                               key: 'CUSTOMER_ID',
                               trafficType: 'client'

                          }
        });
        this.client = this.factory.client();
    }
}
mySplit = new SplitIO();
mySplit2 = new SplitIO();
mySplit3 = new SplitIO();
```

## Solution

We always recommend using a singleton factory object, and one client object especially if we are using only one traffic type and customer id. If you need to the traffic type or user ID, then you should initiate the client object only. Example:

```javascript
class SplitIO {
    constructor() {
        this.factory = splitio({
                          core: {
                               authorizationKey: 'xxxx',
                               key: 'CUSTOMER_ID',
                               trafficType: 'client'

                          }
        });
    }
    createClient(key, trafficType) {
        return this.factory.client(key, trafficType);
    }
}
mySplit = new SplitIO();
client1 = mySplit.createClient(myKey, myTrafficType);
client2 = mySplit.createClient(myKey2, myTrafficType2);
```