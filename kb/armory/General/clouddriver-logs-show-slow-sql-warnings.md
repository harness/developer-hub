---
title: Clouddriver Logs Show Slow SQL Warnings
---

## Issue
Clouddriver logs SQL calls as Slow SQL. An example of such logs can be found below.
```
2021-09-16 12:18:14.692  WARN 1 --- [gentScheduler-0] c.n.s.k.s.telemetry.JooqSlowQueryLogger  : Slow SQL (1800ms):
insert into cats_agent_locks (
  agent_name, 
  owner_id, 
  lock_acquired, 
  lock_expiry
)
values (
  'some-agent-running/KubernetesUnregisteredCustomResourceCachingAgent[1/1]', 
  'spin-clouddriver-123453678:1@spin-clouddriver-123453678', 
  12345678, 
  12345678
)
```

## Cause
The exact cause of this issue is unclear as we are continuing research on this topic however, we have concluded that this seems to be an issue with the SQL agent scheduler.

