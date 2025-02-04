---
title: "Errors when calling getTreatment: Feature flag does not exist"
sidebar_label: "Error when calling getTreatment: Feature flag does not exist"
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360028363971-General-SDK-error-getTreatment-you-passed-SPLIT-NAME-that-does-not-exist-in-this-environment </button>
</p>

## Problem

When using Split SDK and calling `getTreatment` for a list of feature flags names, there are lot of errors raised as below:
```
admin     10 May 2019, 18:10:12    2019-05-10T17:10:12,445 ERROR [admin] [f0f338a964a0e3e1/07cfe07d08568096] [SplitClientImpl:256] - getTreatment: you passed "FEATURE FLAG NAME" that does not exist in this environment, please double check what Splits exist in the web console.
```

## Root Cause

This error is part of the validation mechanism in the SDK, if the `getTreatment` call is passing a feature flag name that does not exist in the Split environment (for which the Split API key is used), this error will be thrown, since it's impossible to calculate the treatment at this point.

## Solution

Either make sure the feature flag names passed are part of the environment, or use the SDK Manager object to loop through the feature flag names that are added to the environment.
Example (Java):
```java
SplitFactory splitFactory = SplitFactoryBuilder.build("YOUR_API_KEY");
// Some code
boolean CheckIfSplitExist(String splitName) { 
     List<String> splitNames = splitFactory.manager().splitNames();
     for (int i = 0; i < splitNames.size(); i++) {
         if (splitNames.get(i).equals(splitName)) 
               return true;
          }
     }
     return false;
}
```
This way you can avoid passing an incorrect flag name.