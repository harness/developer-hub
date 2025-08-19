---
title: "JavaScript SDK: Localhost mode does not support Allowlist keys"
sidebar_label: "JavaScript SDK: Localhost mode does not support Allowlist keys"
sidebar_position: 2
---

## Question

JavaScript, React, Redux, and Browser SDKs use features config parameter to set the feature flags and treatments names, however, it does not support adding Allowlist keys in the property.

How can we mimic allowing keys to get certain treatments similar to the yaml file structure used for  server-side SDKs?

## Answer

Until the Allowlist option is added to the `features` config parameter, we can use multiple feature flags array to flip between the treatments based on the key, and thus we can mimic allowing certain key to get certain treatment.

See example below:
```javascript
const myFeatures = {
     agus: {
       flag1: 'on',
       flag2: 'off'
     },
     sanjay: {
       flag1: 'off',
       flag2: 'on'
     },
     default: {
       flag1 : 'off',
       flag2: 'off'
     }
 };

const config = {
 core: {
 authorizationKey: 'localhost',
 key: myKey
  },
 features: myFeatures[myKey] || myFeatures['default'],
 startup: {
   readyTimeout: 5, // 5 sec
   retriesOnFailureBeforeReady: 3 //3 retries
  }
}
```