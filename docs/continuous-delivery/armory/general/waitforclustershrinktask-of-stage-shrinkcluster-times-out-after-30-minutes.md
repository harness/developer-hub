---
title: WaitForClusterShrinkTask of stage shrinkCluster times out after 30 minutes
---

## Issue
An environment may experience pipeline fails at a deploy stage with with the following error message:
```WaitForClusterShrinkTask of stage shrinkCluster timed out after 30 minutes 5 seconds. pausedDuration: 0 seconds, elapsedTime: 30 minutes 5 seconds, timeoutValue: 30 minutes```
Upon checking Clouddriver logs, the following error can be identified:
```021-05-03 11:05:16.863 ERROR 1 --- [0.0-7002-exec-4] n.s.f.s.FiatAccessDeniedExceptionHandler : Encountered exception while processing request GET:/......```
 

## Cause
This issue can be traced back to timeout configurations. For example, in this instance the timeouts for Clouddriver had been set at 30 minutes.
 
 

