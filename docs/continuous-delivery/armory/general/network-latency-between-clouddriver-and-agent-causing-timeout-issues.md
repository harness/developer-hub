---
title: Network latency between Clouddriver and Agent causing Timeout issues
---

## Issue
Users may run into failures because of network latency between Clouddriver and the Agent instances.  Users may observe the following error within the Clouddriver logs when executing a pipeline on a Spinnaker instance that uses Armory Agent for Kubernetes:
message="com.netflix.spinnaker.clouddriver.exceptions.OperationTimedOutException: Timeout exceeded for operation 01FHVJ66QXEHX51DMY9PDSTPY0, type: 6, account: xxx, time: 30022 ms, timeout: 30000 ms
	at io.armory.kubesvc.services.ops.KubesvcOperations.performOperation(KubesvcOperations.java:96)
	at io.armory.kubesvc.services.ops.cluster.ClusteredKubesvcOperations.performOperation(ClusteredKubesvcOperations.java:70)
	at io.armory.kubesvc.util.OperationUtils.perform(OperationUtils.java:76)
	at io.armory.kubesvc.services.ops.executor.KubesvcExecutor.deploy(KubesvcExecutor.java:301)
	at jdk.internal.reflect.GeneratedMethodAccessor703.invoke(Unknown Source)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:566)
	at io.armory.kubesvc.services.registration.clouddriver.KubesvcCredentialsParser.lambda$makeKubesvcJobExecutor$0(KubesvcCredentialsParser.java:72)
	at com.netflix.spinnaker.clouddriver.kubernetes.op.job.KubectlJobExecutor$$EnhancerByCGLIB$$4f088312.deploy()
	at com.netflix.spinnaker.clouddriver.kubernetes.security.KubernetesCredentials.lambda$deploy$14(KubernetesCredentials.java:508)
	at com.netflix.spinnaker.clouddriver.kubernetes.security.KubernetesCredentials.runAndRecordMetrics(KubernetesCredentials.java:618)
	at com.netflix.spinnaker.clouddriver.kubernetes.security.KubernetesCredentials.runAndRecordMetrics(KubernetesCredentials.java:603)
	at com.netflix.spinnaker.clouddriver.kubernetes.security.KubernetesCredentials.deploy(KubernetesCredentials.java:504)
	at com.netflix.spinnaker.clouddriver.kubernetes.op.handler.CanDeploy.deploy(CanDeploy.java:58)
	at com.netflix.spinnaker.clouddriver.kubernetes.op.manifest.KubernetesDeployManifestOperation.operate(KubernetesDeployManifestOperation.java:209)
	at com.netflix.spinnaker.clouddriver.kubernetes.op.manifest.KubernetesDeployManifestOperation.operate(KubernetesDeployManifestOperation.java:46)
	at com.netflix.spinnaker.clouddriver.orchestration.AtomicOperation$operate.call(Unknown Source)
	at com.netflix.spinnaker.clouddriver.orchestration.DefaultOrchestrationProcessor$_process_closure1$_closure2.doCall(DefaultOrchestrationProcessor.groovy:124)
	at com.netflix.spinnaker.clouddriver.orchestration.DefaultOrchestrationProcessor$_process_closure1$_closure2.doCall(DefaultOrchestrationProcessor.groovy)
	at jdk.internal.reflect.GeneratedMethodAccessor543.invoke(Unknown Source)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:566)
	at org.codehaus.groovy.reflection.CachedMethod.invoke(CachedMethod.java:101)
	at groovy.lang.MetaMethod.doMethodInvoke(MetaMethod.java:323)
	at org.codehaus.groovy.runtime.metaclass.ClosureMetaClass.invokeMethod(ClosureMetaClass.java:263)
	at groovy.lang.MetaClassImpl.invokeMethod(MetaClassImpl.java:1041)
	at groovy.lang.Closure.call(Closure.java:405)
	at groovy.lang.Closure.call(Closure.java:399)
	at com.netflix.spinnaker.clouddriver.metrics.TimedCallable$CallableWrapper.call(TimedCallable.java:81)
	at com.netflix.spinnaker.clouddriver.metrics.TimedCallable.call(TimedCallable.java:45)
	at java_util_concurrent_Callable$call.call(Unknown Source)
	at com.netflix.spinnaker.clouddriver.orchestration.DefaultOrchestrationProcessor$_process_closure1.doCall(DefaultOrchestrationProcessor.groovy:123)
	at com.netflix.spinnaker.clouddriver.orchestration.DefaultOrchestrationProcessor$_process_closure1.doCall(DefaultOrchestrationProcessor.groovy)
	at jdk.internal.reflect.GeneratedMethodAccessor537.invoke(Unknown Source)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:566)
	at org.codehaus.groovy.reflection.CachedMethod.invoke(CachedMethod.java:101)
	at groovy.lang.MetaMethod.doMethodInvoke(MetaMethod.java:323)
	at org.codehaus.groovy.runtime.metaclass.ClosureMetaClass.invokeMethod(ClosureMetaClass.java:263)
	at groovy.lang.MetaClassImpl.invokeMethod(MetaClassImpl.java:1041)
	at groovy.lang.Closure.call(Closure.java:405)
	at groovy.lang.Closure.call(Closure.java:399)
	at com.netflix.spinnaker.security.AuthenticatedRequest.lambda$wrapCallableForPrincipal$0(AuthenticatedRequest.java:272)
	at com.netflix.spinnaker.clouddriver.metrics.TimedCallable.call(TimedCallable.java:45)
	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264)
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)
	at java.base/java.lang.Thread.run(Thread.java:829)"


## Cause
After forwarding the ```deploy operation``` to the Agent, Clouddriver waits for the Agent to respond within 30 seconds.  However, if the response from the Agent takes more than 30 sec, then users may find the error above.  Administrators can override the default value of 30 seconds.

