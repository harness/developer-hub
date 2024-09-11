---
title: Armory Cloud - Remote Network Agent cannot connect (UNAUTHENTICATED)
---

## Issue
**Early Access****As part of participating in an early access program, you will receive information from Armory that is not yet publicly available and is subject to your NDA or confidentiality obligations with Armory.**
Admins may find that the Remote Network Agent pods are unable to start successfully.  
Upon investigation, the following types of errors can be found in the logs of Remote Network Agent pods.  The specific scope that is shown below, ```connect:agentHub``` may differ in the customer environment

```
[2022-02-11 00:00:02,118] [INFO] An error occurred, attempting to re-connect with hub
[2022-02-11 00:00:07,122] [INFO] The Remote Network Agent is connected to Armory Cloud Agent Hub waiting for requests
[2022-02-11 00:00:07,134] [ERROR] Error while receiving messages from the hub
io.grpc.StatusRuntimeException: UNAUTHENTICATED: provided credentials did not have 'connect:agentHub' scope
	at io.grpc.Status.asRuntimeException(Status.java:535)
	at io.grpc.stub.ClientCalls$StreamObserverToCallListenerAdapter.onClose(ClientCalls.java:478)
	at io.grpc.internal.DelayedClientCall$DelayedListener$3.run(DelayedClientCall.java:463)
	at io.grpc.internal.DelayedClientCall$DelayedListener.delayOrExecute(DelayedClientCall.java:427)
	at io.grpc.internal.DelayedClientCall$DelayedListener.onClose(DelayedClientCall.java:460)
	at io.grpc.internal.ClientCallImpl.closeObserver(ClientCallImpl.java:557)
	at io.grpc.internal.ClientCallImpl.access$300(ClientCallImpl.java:69)
	at io.grpc.internal.ClientCallImpl$ClientStreamListenerImpl$1StreamClosed.runInternal(ClientCallImpl.java:738)
	at io.grpc.internal.ClientCallImpl$ClientStreamListenerImpl$1StreamClosed.runInContext(ClientCallImpl.java:717)
	at io.grpc.internal.ContextRunnable.run(ContextRunnable.java:37)
	at io.grpc.internal.SerializingExecutor.run(SerializingExecutor.java:133)
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1136)
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:635)
	at java.base/java.lang.Thread.run(Thread.java:833)
[2022-02-11 00:00:07,134] [WARN] Agent exited while loop without shutting down channel, telling channel to shutdown now
[2022-02-11 00:00:07,135] [INFO] An error occurred, attempting to re-connect with hub
```

## Cause
A change in scope can be found if an environment hasn't updated Agent in a while, or the environment is using an out-of-date version of Agent.  A scope change is just one of the reasons why the following error could occur.     

