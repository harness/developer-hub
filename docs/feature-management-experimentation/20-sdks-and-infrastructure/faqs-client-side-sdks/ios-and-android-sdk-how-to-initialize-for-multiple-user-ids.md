---
title: "Mobile SDK: How to initialize for multiple user IDs?"
sidebar_label: "Mobile SDK: How to initialize for multiple user IDs?"
sidebar_position: 19
---

## Question

The JavaScript SDK is capable of initializing multiple client objects from the same SDK factory object, each with their unique user key (user id):

```javascript
client1 = factory.client("user_id1");
client2 = factory.client("user_id2");
```

However, iOS and Android SDKs do not have this feature, how could it be implemented using those SDKs?

## Answer

Since iOS and Android SDKs do not support initializing multiple client objects from the same factory object, the solution is to initialize a second factory object.

It is important to note the SDK factory object will create the local SDK cache folder and use the SDK API Key for naming convention. Its strongly recommended to use different SDK API Key for each factory object, to have each factory sync and update its own cache folder.

Checkout the [example code for iOS using two factories](https://github.com/Split-Community/Split-SDKs-Examples/tree/main/iOS-two-factories-SDK).