---
title: Bake stage fails with Rosco error... Command not allowed when used memory > 'maxmemory'
---

## Issue
Pipeline exhibits error that the bake stage is failing.  The AWS console shows a message stating that there was a ```User initiated shutdown```.
Rosco logs shows the following, for example:

```
2021-05-26 13:03:04.321 ERROR 1 --- [RxIoScheduler-2] ......rosco.executor.BakePoller  : Update Polling Error:
redis.clients.jedis.exceptions.JedisDataException: ERR Error running script (call to ......): @...._script:12: @..._script: 12: -..command not allowed when used memory > 'maxmemory'.   
        at redis.clients.jedis.Protocol.processError(Protocol.java:132) ~[jedis-3.1.0.jar:na]
        at redis.clients.jedis.Protocol.process(Protocol.java:166) ~[jedis-3.1.0.jar:na]
```


## Cause
This issue is seen when Redis is out of memory by being out of disk space.  As Redis is a caching database, it utilizes disk space as memory and can run out of space as a result.

