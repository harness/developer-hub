---
title: "Time out Error: NoSuchMethodError: com.google.common.collect.Multisets.removeOccurrences"
sidebar_label: "Time out Error: NoSuchMethodError: com.google.common.collect.Multisets.removeOccurrences"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360031044932-Java-SDK-Time-out-Error-NoSuchMethodError-com-google-common-collect-Multisets-removeOccurrencesy </button>
</p>

## Issue

Using Split Java SDK within a framework, SDK always times out. Log shows the error below:
```
2602 [split-splitFetcher-0] ERROR io.split.engine.experiments.RefreshableSplitFetcher  - RefreshableSplitFetcher failed: com.google.common.collect.Multisets.removeOccurrences(Lcom/google/common/collect/Multiset;Ljava/lang/Iterable;)Z
2603 [split-splitFetcher-0] DEBUG io.split.engine.experiments.RefreshableSplitFetcher  - Reason:
java.lang.NoSuchMethodError: com.google.common.collect.Multisets.removeOccurrences(Lcom/google/common/collect/Multiset;Ljava/lang/Iterable;)Z
 at io.split.engine.experiments.RefreshableSplitFetcher.runWithoutExceptionHandling(RefreshableSplitFetcher.java:214)
 at io.split.engine.experiments.RefreshableSplitFetcher.run(RefreshableSplitFetcher.java:123)
 at java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:514)
 at java.base/java.util.concurrent.FutureTask.runAndReset(FutureTask.java:305)
 at java.base/java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:305)
 at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1135)
 at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:635)
 at java.base/java.lang.Thread.run(Thread.java:844)
```

## Root Cause

Split Java SDK uses Google Guava library, the error above will occur if the framework use Google Guava library below 19.0.

## Solution
Upgrade Google Guava to 19.0 or above version.