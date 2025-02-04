---
title: "Error: Post method Status Code: 404 - Not found"
sidebar_label: "Error: Post method Status Code: 404 - Not found"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006667012-Block-traffic-until-the-SDK-is-ready </button>
</p>

## Question

Why do I see a "POST method: Status Code: 404 - 404 Not Found" Synchronizer error?

## Issue

After starting Split Synchronizer process (version 1.6.0 and above), Synchronizer debug log and Synchronizer admin dashboard show the error below on all its network Post calls:
"POST method: Status Code: 404 - 404 Not Found"

![](https://help.split.io/hc/article_attachments/360013690471)

## Root Cause

The Error is due to incorrect Split API key passed to the Synchronizer. Which caused the Synchronizer inability to find to the Account in the Split cloud.

## Solution

First verify the API key used by Synchronizer is correct, Synchronizer API key must be SDK type, the API keys are viewed from Admin settings on the API keys page:
"https://app.split.io/org/[Your Account ID]/admin/apis"

![](https://help.split.io/hc/article_attachments/360013671012)

Second, make sure to pass the API key. There are many ways to do it:

* Command line arguments:
```
-api-key <APIKEY>
```

* In a JSON file that Synchronizer uses for configuration. The `apiKey` property is the one that will be used to issue requests against Split Cloud.

![](https://help.split.io/hc/article_attachments/360013671132)

* Alternatively, if the Synchronizer is used only in proxy mode (not Redis), the "auth" section and "sdkAPIKeys" is used to allow setting custom apikeys for internal use, which allows the SDK to use the internal custom api key.

![](https://help.split.io/hc/article_attachments/360013671492)

* If the Synchronizer is running within the Split packaged docker image, make sure to use the parameter below:
```
-e SPLIT_SYNC_API_KEY <APIKEY>
```