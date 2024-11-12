---
title: Spinnaker is Down with the Error of "OOM command not allowed when used memory > 'maxmemory" (Redis)
---

## Issue
The Spinnaker environment is down and unaccessible, and comes with the Redis error as following:
```{"timestamp":1601481892xxx,"status":500,"error":"Internal Server Error","message":"OOM command not allowed when used memory > 'maxmemory'.; nested exception is redis.clients.jedis.exceptions.JedisDataException: OOM command not allowed when used memory > 'maxmemory'."}```

## Cause
The **O```O```M command not allowed when used memory > ‘maxmemory’** error means that Redis was configured with a memory limit and that particular limit was reached.In other words: its memory is full, it can’t store any new data.

