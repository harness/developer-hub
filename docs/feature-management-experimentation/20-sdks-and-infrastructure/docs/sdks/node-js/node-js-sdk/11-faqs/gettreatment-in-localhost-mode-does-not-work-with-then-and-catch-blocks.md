---
title: "GetTreatment() in Localhost mode does not work with then() and catch() blocks"
sidebar_label: "GetTreatment() in Localhost mode does not work with then() and catch() blocks"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/6115354360077-NodeJS-SDK-Using-getTreatment-in-localhost-mode-does-not-work-with-then-and-catch-blocks </button>
</p>

## Issue

When implementing NodeJS SDK with Redis storage, the getTreatment method is a wrapper for redis fetch call which returns a promise, which works fine with then() and catch() blocks.

However, testing the SDK code in localhost mode below:

```javascript
client
  .getTreatment('user_id', 'my-feature-comming-from-redis')
  .then(treatment => {
    // do something with the treatment
  })
  .catch(() => false)
```

It return the error below:
```
splitClient.getTreatment(...).then is not a function
 ```

## Root cause

As mentioned when using redis storage getTreatment() function is a wrapper of a promise returned by redis library. So when no redis call is used in the localhost mode, the same code will error out.

## Answer

The SDK `getTreatment` method can be wrapped in async function, then use that function with `then()` and `catch()` blocks, as shown in sample below:

```javascript
const path = require('path');
const SplitFactory = require('@splitsoftware/splitio').SplitFactory;
async function createSplitClient() {
    const SplitObj = SplitFactory({
        core: {
            authorizationKey: 'localhost'
        },
        startup: {
            readyTimeout :10
        },
        features: path.join(__dirname, 'first.yaml'),
        debug: true
    });
    const client = SplitObj.client();
    await client.ready()
    console.log("SDK is ready");
    return client
}
async function getSplitTreatment(userKey, splitName) {
    let splitClient = await createSplitClient()
    return await splitClient.getTreatment(userKey, splitName);
}
getSplitTreatment("user", "first_split").then((treatment)=> {
    console.log("treatment: "+treatment)
    })
.catch(() => {
    console.log("SDK exception")
});
```