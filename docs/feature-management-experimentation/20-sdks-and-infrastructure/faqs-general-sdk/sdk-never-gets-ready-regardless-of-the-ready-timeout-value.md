---
title: "General SDK: SDK never gets ready, regardless of the ready timeout value"
sidebar_label: "General SDK: SDK never gets ready, regardless of the ready timeout value"
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 9
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360016299232-Configure-Split-Synchronizer-to-handle-high-impression-rate </button>
</p>

## Issue

Split SDK never gets ready, regardless of how much the ready timeout value.

## Root Cause

There are several possible root causes for this issue:

* If the SDK used is a server side type (Python, Ruby, GO, PHP, NodeJS or Java), and the API key used is Client-side type. The Split cloud service is expecting a specific call for Segment information which is different for Client-side vs Server-side API keys.
* Verify if there are large Segments in Split environment. Segments that contain tens of thousands of records will require a long time to be downloaded to the SDK cache.
* Verify network connection to sdk.split.io is fast. Use the command below to verify:
```
curl sdk.split.io -s -o /dev/null -w  "%{time_starttransfer}\n"
```
The command will return the time it took the GET command to get a response.

## Answer

* Make sure to use the correct API key.
* Avoid using very large segments.