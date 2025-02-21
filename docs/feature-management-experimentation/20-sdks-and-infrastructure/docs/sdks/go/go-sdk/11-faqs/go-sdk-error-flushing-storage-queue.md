---
title: "Error flushing storage: Queue couldn't send message to task SubmitImpressions"
sidebar_label: "Error flushing storage: Queue couldn't send message to task SubmitImpressions"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360045620792-GO-SDK-Error-flushing-storage-queue-couldn-t-send-message-to-task-SubmitImpressions </button>
</p>

## Issue

Using Go SDK, by default a thread will flush all current stored impressions in its cache every 30 seconds. However, there is a limit to the impression queued in the SDK's cache. If the queue is full, event IMPRESSIONS_FULL is fired and the SDK will attempt to post the impressions to clear the cache. When the process tries to flush all impressions, the error is logged:
```
Error flushing storage queue couldn't send message to task SubmitImpressions
```

## Root cause

The SDK is trying to send impressions at a higher rate than the posting thread is evicting them.

## Answer

To resolve the issue, follow these steps:

1. Increase the size of the impressions queue by updating the `Advanced.ImpressionsQueueSize` parameter. Default is 10k, increasing it to 20k might improve results.
2. Increase the bulk size of the impressions post to Split servers by updating the `Advanced.ImpressionsBulkSize` parameter. Default is 5k. 10k would be a logical next step.
3. Decrease the period at which the SDK sends impressions to the Split servers by adjusting the `TaskPeriods.ImpressionSync` parameter. The default is 30 seconds which is on the low end if you're sending a huge number of impressions. Something along the lines of 5-10 seconds should help.

:::note
These changes will slightly increase the memory usage of the SDK as well as the network traffic.
:::