---
title: Unable to list kubernetes Endpoints in namespace when running clouddriver with Agent
---

## Issue
Customers may notice that when the Agent Plugin is configured to use the Kubernetes cluster over Redis, Clouddriver shows the below errors during start-up.
2022-02-18 17:13:10.275  INFO   --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : [] Configured for pie
2022-02-18 17:13:10.276  INFO   --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : [] Configured for kubernetes
2022-02-18 17:13:10.276  INFO   --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : [] Configured for com.netflix.spinnaker.clouddriver.sql.SqlProvider
2022-02-18 17:13:10.276  INFO   --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : [] Configured for com.netflix.spinnaker.clouddriver.sql.SqlProvider
2022-02-18 17:13:10.276  INFO   --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : [] Configured for com.netflix.spinnaker.clouddriver.docker.registry.provider.DockerRegistryProvider
2022-02-18 17:13:10.276  INFO   --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : [] Configured for com.netflix.spinnaker.clouddriver.core.provider.CoreProvider
2022-02-18 17:13:10.277  INFO   --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : [] Configured for kubesvc
2022-02-18 17:13:10.295  INFO   --- [           main] o.s.s.c.ThreadPoolTaskScheduler          : [] Initializing ExecutorService
2022-02-18 17:13:10.596 ERROR   --- [           main] .k.s.o.c.k.KubernetesClouddriverRegistry : [] >>>>>>> Unable to list kubernetes Endpoints in namespace spinnaker-stage to discover clouddriver instances. Agent will NOT work if running more than one clouddriver replica!
io.kubernetes.client.openapi.ApiException: 
	at io.kubernetes.client.openapi.ApiClient.handleResponse(ApiClient.java:979)
	at io.kubernetes.client.openapi.ApiClient.execute(ApiClient.java:895)
	at io.armory.kubesvc.services.ops.cluster.kubernetes.KubernetesClouddriverRegistry$1.list(KubernetesClouddriverRegistry.java:245)
	at io.armory.kubesvc.services.ops.cluster.kubernetes.KubernetesClouddriverRegistry.canList(KubernetesClouddriverRegistry.java:263)
	at io.armory.kubesvc.services.ops.cluster.kubernetes.KubernetesClouddriverRegistry.start(KubernetesClouddriverRegistry.java:127)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:566)


## Cause
The above error is seen in Clouddriver logs because Clouddriver cannot connect to the other Clouddriver pods immediately when starting up. The Clouddriver Agent Plugin communicates with all Clouddriver pods using the Kubernetes endpoint object. Hence, the Service Account with which the Clouddriver runs should have the RBACs defined to access the endpoints on the cluster.

