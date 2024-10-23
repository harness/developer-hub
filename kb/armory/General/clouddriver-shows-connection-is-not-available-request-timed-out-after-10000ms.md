---
title: Clouddriver shows "Connection is not available, request timed out after 10000ms."
---

## Issue
An error stating that ```Connection is not available, request timed out after 10000ms``` is observed in an environment with ```MySQL``` used for CloudDriver, along with ```HA-mode``` enabled. Clouddriver logs show the following error:
```
2021-10-03 13:34:54.553 ERROR 1 --- [gPodsObserver-0] c.n.s.c.s.c.SqlCachingPodsObserver       : Failed to manage replicas heartbeat
org.springframework.dao.TransientDataAccessResourceException: jOOQ; SQL [select * from caching_replicas where pod_id = ...?]; default - Connection is not available, request timed out after 10000ms.; nested exception is java.sql.SQLTransientConnectionException: default - Connection is not available, request timed out after 10000ms.
	at org.jooq_3.13.2.MYSQL.debug(Unknown Source) ~[na:na]
```

## Cause
The issue pertains to Clouddriver being unable to establish connections with MySQL, with HA Mode enabled due to the amount of connections being attempted.

