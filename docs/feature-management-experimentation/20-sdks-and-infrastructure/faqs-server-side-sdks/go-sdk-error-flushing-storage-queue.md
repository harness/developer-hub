---
title: GO SDK Error flushing storage queue couldn't send message to task SubmitImpressions
sidebar_label: GO SDK Error flushing storage queue couldn't send message to task SubmitImpressions
sidebar_position: 6
---

## Issue

Using GO SDK, by default a thread will flush all current stored impressions in its cache every 30 seconds. However, there is a limit to the impression queued in the SDK's cache. If the queue is full, event IMPRESSIONS_FULL is fired and the SDK will attempt to post the impressions to clear the cache. When the process tries to flush all impressions, the error is logged:
```
Error flushing storage queue couldn't send message to task SubmitImpressions
```

## Root cause

The SDK is trying to send impressions at a higher rate than the posting thread is evicting them.

## Answer

To resolve the issue, follow these steps:

1. Increase the size of the impressions queue by updating the `Advanced.ImpressionsQueueSize` parameter. Default is 10k, increasing it to 20k might improve results.
2. Increase the bulk size of the impressions post to Harness servers by updating the `Advanced.ImpressionsBulkSize` parameter. Default is 5k. 10k would be a logical next step.
3. Decrease the period at which the SDK sends impressions to the Harness servers by adjusting the `TaskPeriods.ImpressionSync` parameter. The default is 30 seconds which is on the low end if you're sending a huge number of impressions. Something along the lines of 5-10 seconds should help.

:::note
These changes will slightly increase the memory usage of the SDK as well as the network traffic.
:::