---
title: SDK never gets ready, regardless of the ready timeout value
sidebar_label: SDK never gets ready, regardless of the ready timeout value
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360016299232-Configure-Split-Synchronizer-to-handle-high-impression-rate </button>
</p>

## Issue

An SDK never gets ready, regardless of how much the ready timeout configuration value.

## Root Cause

There are several possible root causes for this issue:

* A server side SDK (Python, Ruby, Go, PHP, NodeJS, and Java) is incorrectly configured with a client-side API key. The Split cloud service is expecting a specific call for Segment information which is different for client-side vs server-side API keys.
* There is a Segment containing a very large number of user IDs in the Split environment. Segments that contain tens of thousands of records will require a long time to be downloaded to the SDK cache.
* A slow network connection to sdk.split.io.

## Answer

* Make sure to use the correct API key.
* Avoid using Segments with a very large number of user IDs.
* Verify your connection speed using the command `curl sdk.split.io -s -o /dev/null -w  "%{time_starttransfer}\n"`. The command will return the response time for the GET command.