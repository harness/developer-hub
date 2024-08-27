---
title: Armory Agent Error receiving from ops from server- rpc error- code = Unavailable desc = transport is closing
---

## Issue
Customer environments may find occasional failures in deployment with Agent displaying the following error:
```"Timeout exceeded for operation 01F10FTFFKKW4JGTXNEY554MJ9, type: 6, account: dev-......"```
The UI will display the following type of error message:

Clouddriver logs show the following:
2021-03-17 20:48:54.848  WARN 1 --- [besvc-cluster-0] i.a.k.s.r.kubesvc.KubesvcRegistry        : Account de..... cannot be assigned to any local kubesvc

```2021-03-17 21:58:03.859  INFO 1 --- [.0-7002-exec-10] c.n.spinnaker.fiat.shared.FiatService    : 
Other errors from Clouddriver show:
2021-03-23 17:46:35.677 ERROR 1 --- [ool-6-thread-85] .e.DefaultThreadUncaughtExceptionHandler : Uncaught exception in thread

org.springframework.dao.DataIntegrityViolationException: jOOQ; SQL [insert into kubesvc_cache_rel (rel1_id, rel2_id, rel1_type, rel2_type, last_updated) values (?, ?, ?, ?, ?) on duplicate key update last_updated = values(last_updated)]; Cannot add or update a child row: a foreign key constraint fails (`clouddriver`.`kubesvc_cache_rel`, CONSTRAINT `fk_kubesvc_rel1` FOREIGN KEY (`rel1_id`) REFERENCES `kubesvc_cache` (`id`) ON DELETE CASCADE); nested exception is java.sql.SQLIntegrityConstraintViolationException: Cannot add or update a child row: a foreign key constraint fails (`clouddriver`.`kubesvc_cache_rel`, CONSTRAINT `fk_kubesvc_rel1` FOREIGN KEY (`rel1_id`) REFERENCES `kubesvc_cache` (`id`) ON DELETE CASCADE)
	at org.jooq_3.13.2.MYSQL.debug(Unknown Source) ~[na:na]
 
Agent logs show messages pertaining to "error receiving ops" 
time="2021-03-18T14:41:36Z" level=error msg="error receiving from ops from server: rpc error: code = Unavailable desc = transport is closing" error="rpc error: code = Unavailable desc = transport is closing"

time="2021-03-18T14:41:36Z" level=warning msg="registration failed" error="server has stopped sending ops"

time="2021-03-18T14:41:41Z" level=info msg="registering with uuid: ....
time="2021-03-18T14:41:41Z" level=info msg="registering with 1 servers"

time="2021-03-18T15:41:41Z" level=error msg="error receiving from ops from server: rpc error: code = Unavailable desc = transport is closing" error="rpc error: code = Unavailable desc = transport is closing"



## Cause
This error is observed when Clouddriver is not sending all the operations that are needed to Agent.


 
 

 


