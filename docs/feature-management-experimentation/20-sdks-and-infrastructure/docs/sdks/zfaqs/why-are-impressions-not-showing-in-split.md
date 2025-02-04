---
title: Why are impressions not showing in Split?
sidebar_label: Why are impressions not showing in Split?
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360016299232-Configure-Split-Synchronizer-to-handle-high-impression-rate </button>
</p>

## Issue

When using any SDK and calling the get treatment method, the call returns a correct treatment value. However, the impression is not getting sent to Split server and does not show up in Results page.

## Root Cause

There are few possible root causes:

When using Redis and Split Synchronizer:

* Synchronizer is not able to read the Impression key in Redis. Check for any errors in the Synchronizer debug log or Synchronizer admin console (http://[Synchronizer host]:3010//admin/dashboard) to determine root cause.
* Synchronizer is not keeping up with the impressions flowing from the SDK. Check the [KB article](https://help.split.io/hc/en-us/articles/360016299232-Configure-Split-Synchronizer-for-high-load-Impressions) for solution.

When the SDK connects directly to Split Cloud:

* All SDKs have a thread that runs frequently and checks the SDK cache for unpublished events and impressions. The frequency is controlled by the impressionsRefreshRate parameter for Impressions, and eventsPushRate for Events. If the SDK code exits while there is still unpublished cache, they will not be posted to Split Cloud. 
* The Key Id (Customer, account, etc) used for the impression has more than 250 characters.
* If the SDK is running in an application environment that does not support multi-threading (like Ruby Unicorn and Python gunicorn), then only the main thread will run to calculate the treatments, but the post impressions thread will not run.

## Solution

* For mobile SDKs (Android and iOS), use `client.Flush()` method which will post impressions on demand, the method can be used when the application is sent to the background.
* Make sure to call the `destroy()` for the client object before exiting the code. Please refer to each SDK language section in our SDK documentation for the method syntax. While the destroy() method will flush all the unpublished impressions and events, it is also recommended to add a delay or wait command for enough time to have the internal impression posting thread run.
* Make sure the Key Id string used in get treatment method is no longer than 250 characters.
* Verify the application server supports multi-threading. If it doesn't, install Synchronizer and Redis and configure the SDK to connect to Redis for cache management.