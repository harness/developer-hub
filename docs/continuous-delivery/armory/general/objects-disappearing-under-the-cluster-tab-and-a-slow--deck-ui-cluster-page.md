---
title: Objects disappearing under the Cluster tab and a slow  Deck UI Cluster page
---

## Issue
The objects under Clusters tab disappear after a certain time (3-6 hours).
In the duration that the cluster data shown in the UI is absent, the Clouddriver pods do not restart. Another symptom is that the Cluster page is slow at updating the pod being updated.
The following errors are seen running the caching agents:
``` WARN 1 --- [utionAction-174] c.n.s.c.cache.LoggingInstrumentation     : kubernetes:rr-workflow-.....-3/KubernetesCoreCachingAgent[1/1] completed with one or more failures in  0.378s```


## Cause
Caching agents being unable to complete will prevent the cache from being up to date as new deployments are not cached.
The output of making a request to ```http://:7002/cache/introspection``` would be for example like:
```
[
2  {
3    "details": {},
4    "id": "...../CustomKubernetes(DestinationRule)[1/1]",
5    "lastExecutionDurationMs": 413,
6    "lastExecutionStartDate": "2021-08-17 21:44:26.928",
7    "lastExecutionStartMs": 1629150266928,
8    "provider": "kubernetes",
9    "totalAdditions": 0,
10    "totalEvictions": 0
11  },
12  {
13    "details": {},
14    "id": "...../KubernetesCoreCachingAgent[1/1]",
15    "lastExecutionDurationMs": 1934,
16    "lastExecutionStartDate": "2021-08-17 21:44:21.928",
17    "lastExecutionStartMs": 1629150271928,
18    "provider": "kubernetes",
19    "totalAdditions": 121,
20    "totalEvictions": 0
21  },
22  {
23    "details": {},
24    "id": "......KubernetesUnregisteredCustomResourceCachingAgent[1/1]",
25    "lastExecutionDurationMs": 1,
26    "lastExecutionStartDate": "2021-08-17 21:44:19.927",
27    "lastExecutionStartMs": 1629150249927,
28    "provider": "kubernetes",
29    "totalAdditions": 0,
30    "totalEvictions": 0
31  }
```
This endpoint contains statistics about how much time it took for each caching agent to complete.  All of them should run under 10 minutes (successfully) or data will disappear from UI.

