---
title: "General SDK: SDK never gets ready, regardless of the ready timeout value"
sidebar_label: "General SDK: SDK never gets ready, regardless of the ready timeout value"
sidebar_position: 9
---

## Issue

The SDK never gets ready, regardless of how much the ready timeout value.

## Root Cause

There are several possible root causes for this issue:

* If the SDK used is a server side type (Python, Ruby, GO, PHP, Node.js or Java), and the API key used is Client-side type. The Harness FME servers service is expecting a specific call for Segment information which is different for Client-side vs Server-side API keys.
* Verify if there are large Segments in Split environment. Segments that contain tens of thousands of records will require a long time to be downloaded to the SDK cache.
* Verify network connection to sdk.split.io is fast. Use the command below to verify:
```
curl sdk.split.io -s -o /dev/null -w  "%{time_starttransfer}\n"
```
The command will return the time it took the GET command to get a response.

## Answer

* Make sure to use the correct API key.
* Avoid using very large segments.