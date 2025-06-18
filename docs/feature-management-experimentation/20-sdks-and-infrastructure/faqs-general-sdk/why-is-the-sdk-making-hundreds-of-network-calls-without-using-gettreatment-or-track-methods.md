---
title: Why is the SDK making hundreds of network calls without using getTreatment or track methods?
sidebar_label: Why is the SDK making hundreds of network calls without using getTreatment or track methods?
sidebar_position: 13
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360018619031-Why-is-the-SDK-making-hundreds-of-network-calls-without-using-getTreatment-or-track-methods </button>
</p>

## Problem

Using any FME SDK library, the library is making hundreds of network calls to split.io without using getTreatment or track methods

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

We always recommend using a singleton factory object, and one client object especially if we are using only one traffic type and customer ID. If we need to change either, then its recommended to initiate the client object only, as in the example below:

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