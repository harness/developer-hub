---
title: "The client.on event handler is never called"
sidebar_label: "The client.on event handler is never called"
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to Android, iOS, JavaScript SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360028923531-Mobile-SDK-when-using-client-on-method-the-code-block-never-called </button>
</p>

## Issue

Using JavaScript browser-side, Android or iOS SDKs, and implementing the code below, the code block never gets executed which indicates SDK_READY event never fires.

```javascript
client.on(SplitEvent.SDK_READY, new SplitEventTask() {
    treatment = client.getTreatment("Split Name")
});
```

## Root Cause

The SDK_READY event will fire only once when the SDK factory downloads all the information it needs to calculate the treatment from Split cloud If the code above is executed after the SDK_READY event fires, then the block inside will never be executed since SDK_READY event already fired and will not fire again.

## Solution

Even if the cache existed prior to initializing the SDK Factory object, it will always make an http call to Split cloud to sync for any changes before firing SDK_READY event. This means if we execute client.on line immediately after the factory initialization line it will be guaranteed the SDK_READY event fires after client.on is executed.
We recommend to create a wrapper class for the SDK, define isSDKReady property and set it to true inside the client.on block.

Below are examples per each SDK language:

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs
  values={[
    {label: 'Android SDK', value: 'android'},
    {label: 'iOS SDK', value: 'ios'},
    {label: 'JavaScript browser-side', value: 'browser'},
  ]}>
  <TabItem value="android">

In the Android wrapper class below, we are using a static variable to indicate the SDK is ready, this will work if you have only one instance of the wrapper class.

```java
public class SplitSDK {
    public SplitClient client;
    public static boolean isSDKReady=false;
    SplitSDK(String APIKey, Key userId, Context appContext) throws Exception {
        SplitClientConfig config = SplitClientConfig.builder()
                .build();
        try {
            SplitFactory splitFactory = SplitFactoryBuilder.build(APIKey, userId, config, appContext);
            this.client = splitFactory.client();
            this.client.on(SplitEvent.SDK_READY, new SplitEventTask() {
                 @Override
                 public void onPostExecutionView(SplitClient client) {
                     SplitSDK.isSDKReady = true;
                 }
             });
        } catch (Exception e) {
            System.out.print("Exception: " + e.getMessage());
        }
    }
}
```

  </TabItem>
  <TabItem value="ios">

```swift
class SplitWrapper {
    var isSDKReady=false
    var client:SplitClient
    init(apiKey: String, key: Key) {
        let config = SplitClientConfig()
        let builder = DefaultSplitFactoryBuilder()
        let factory = builder.setApiKey(apiKey)
            .setKey(key)
            .setConfig(config)
            .build()
        self.client = factory!.client
        self.client.on(event: SplitEvent.sdkReady) {
            self.isSDKReady=true
        }
    }
}
```

  </TabItem>
  <TabItem value="browser">

```javascript
class SplitIO {
    constructor() {
        this.isSDKReady=false;
        this.factory = splitio({
            core: {
                authorizationKey: APIKEY,
                key: userKey,
                trafficType: userTrafficType
            },
            startup: {
                readyTimeout: 4
            },
        });
        this.client = this.factory.client();
        this.client.on(this.client.Event.SDK_READY, () => {
           this.isSDKReady=true;
        });
    }
}
```

  </TabItem>
</Tabs>