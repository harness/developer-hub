---
title: Dinghy Crashloop When Using Redis (Loss of connectivity/Loss of relationship)
---

## Issue
As per Armory Documentation, Dinghy can use Redis to store relationships, and it is recommended that Admins consider a separate, external Redis with appropriate backups and redundancy. 
Source: [https://docs.armory.io/armory-enterprise/armory-admin/dinghy-enable/#configuring-redis](https://docs.armory.io/armory-enterprise/armory-admin/dinghy-enable/#configuring-redis)
 
If Redis were to go down, Dinghy would go into CrashLoop, being unable to connect to the Redis server.
```time="2022-07-27T23:38:48Z" level=fatal msg="Redis Server at redis://armory-test-001.iwdfo7.0001.usw1.cache.amazonaws.com:6379 could not be contacted: dial tcp: lookup armory-test-redis-001.iwdfo7.0001.usw1.cache.amazonaws.com on 10.100.0.10:53: no such host"```
 
 
 

## Cause
As Dinghy uses Redis to provide caching of its services, connection to Redis is essential to its functionality and health.  Should the connection break, Dinghy will throw errors resulting from the lack of connectivity.

