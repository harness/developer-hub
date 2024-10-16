---
title: Agent Deployment Error- exceptions.OperationTimedOutException- Timeout exceeded for operation 
---

## Issue
When using Agent, customers may experience that they see the following errors during a deployment execution:

```
message="com.netflix.spinnaker.clouddriver.exceptions.OperationTimedOutException: Timeout exceeded for operation ......., type: 6, account: .....-ingress-dev, time: 30022 ms, timeout: 30000 ms
 at io.armory.kubesvc.services.ops.KubesvcOperations.performOperation(KubesvcOperations.java:96)
 at io.armory.kubesvc.services.ops.cluster.ClusteredKubesvcOperations.performOperation(ClusteredKubesvcOperations.java:70)
 at io.armory.kubesvc.util.OperationUtils.perform(OperationUtils.java:76)
 at io.armory.kubesvc.services.ops.executor.KubesvcExecutor.deploy(KubesvcExecutor.java:301)
 at jdk.internal.reflect.GeneratedMethodAccessor703.invoke(Unknown Source)
 at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
 at java.base/java.lang.reflect.Method.invoke(Method.java:566)
```

## Cause
The error indicates that the Clouddriver sent a ```deploy operation``` to the kubesvc Agent and was not able to obtain the result back from the Agent in time.
 

