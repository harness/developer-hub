---
title: No ingress is supported when using API version "networking.k8s.io/v1"
---

## Issue
Customers may encounter issues with their Spinnaker environment when making adjustments to the API version for incoming (Ingress) network traffic to their Spinnaker environment.
The following error, for example, may be found in CloudDriver logs:
````
com.netflix.spinnaker.clouddriver.kubernetes.op.handler.UnsupportedVersionException: No ingress is supported at api version networking.k8s.io/v1
at com.netflix.spinnaker.clouddriver.kubernetes.op.handler.KubernetesIngressHandler.attachedServices(KubernetesIngressHandler.java:122) ~[clouddriver-kubernetes.jar:na]
at com.netflix.spinnaker.clouddriver.kubernetes.op.handler.KubernetesIngressHandler.addRelationships(KubernetesIngressHandler.java:108) ~[clouddriver-kubernetes.jar:na]
at com.netflix.spinnaker.clouddriver.kubernetes.caching.agent.KubernetesCachingAgent.lambda$loadSecondaryResourceRelationships$5(KubernetesCachingAgent.java:255) ~[clouddriver-kubernetes.jar:na]
at java.base/java.util.HashMap$KeySet.forEach(HashMap.java:928) ~[na:na]
at com.netflix.spinnaker.clouddriver.kubernetes.caching.agent.KubernetesCachingAgent.loadSecondaryResourceRelationships(KubernetesCachingAgent.java:248) ~[clouddriver-kubernetes.jar:na]
at com.netflix.spinnaker.clouddriver.kubernetes.caching.agent.KubernetesCachingAgent.buildCacheResult(KubernetesCachingAgent.java:209) ~[clouddriver-kubernetes.jar:na]
at com.netflix.spinnaker.clouddriver.kubernetes.caching.agent.KubernetesCachingAgent.loadData(KubernetesCachingAgent.java:192) ~[clouddriver-kubernetes.jar:na]
at com.netflix.spinnaker.cats.agent.CachingAgent$CacheExecution.executeAgentWithoutStore(CachingAgent.java:87) ~[clouddriver-api.jar:na]
at com.netflix.spinnaker.cats.agent.CachingAgent$CacheExecution.executeAgent(CachingAgent.java:77) ~[clouddriver-api.jar:na]
at com.netflix.spinnaker.cats.redis.cluster.ClusteredAgentScheduler$AgentExecutionAction.execute(ClusteredAgentScheduler.java:338) ~[cats-redis.jar:na]
at com.netflix.spinnaker.cats.redis.cluster.ClusteredAgentScheduler$AgentJob.run(ClusteredAgentScheduler.java:308) ~[cats-redis.jar:na]
at java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:515) ~[na:na]
at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264) ~[na:na]
at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128) ~[na:na]
at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628) ~[na:na]
at java.base/java.lang.Thread.run(Thread.java:834) ~[na:na]
````
## Cause
Based on the OSS source code, CloudDriver older than release 1.26.x/2.26.x does not support incoming traffic from ```networking.k8s.io/v1```

