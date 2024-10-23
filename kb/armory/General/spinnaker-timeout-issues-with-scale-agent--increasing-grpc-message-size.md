---
title: Spinnaker Timeout Issues with Scale Agent- Increasing gRPC Message Size
---

## Issue
In a Spinnaker deployment, it’s common to encounter timeout issues when deploying custom resources via Armory’s Scale Agent. These issues can be accompanied by error messages such as ```Timeout exceeded for operation``` and ```gRPC message exceeds maximum size```. This article will explore the cause of these errors and provide a guide on how to increase the gRPC message size in Spinnaker to resolve the problem.
In Spinnaker, deploying a Custom Resource to a Kubernetes Cluster via Scale Agent can result in timeout exceeded for Operation error. On the UI, the deploy manifest stage has the below error as an example.
 Exception ( Deploy Manifest )
Timeout exceeded for operation. OperationId: '01HDHRPM9018Z3WHN316JBEYSV' Type: 'List' Account: 'aws-spin-support-agent' Kind: 'CustomResourceDefinition' Namespace: 'default'
 
The Agent logs have the below errors as an example.
 time="2023-10-25T19:53:18Z" level=error msg="error sending operation result" account=aws-spin-support-agent agentId=spin-armory-agent-5955c56d4b-sqdq6 error="rpc error: code = Canceled desc = stream terminated by RST_STREAM with error code: CANCEL" operationId=01HDM6C0A3QQG0KM1GQ53HSHDP operationNamespace= operationType=List
time="2023-10-25T19:53:21Z" level=error msg="error sending operation result" account=aws-spin-support-agent agentId=spin-armory-agent-5955c56d4b-sqdq6 error="rpc error: code = Canceled desc = stream terminated by RST_STREAM with error code: CANCEL" operationId=01HDM6C0A3QQG0KM1GQ53HSHDP operationNamespace= operationType=List
time="2023-10-25T19:53:24Z" level=error msg="error sending operation result" account=aws-spin-support-agent agentId=spin-armory-agent-5955c56d4b-sqdq6 error="rpc error: code = Canceled desc = stream terminated by RST_STREAM with error code: CANCEL" operationId=01HDM6C0A3QQG0KM1GQ53HSHDP operationNamespace= operationType=List
time="2023-10-25T19:53:24Z" level=error msg="Max retries reached for operation result" account=aws-spin-support-agent agentId=spin-armory-agent-5955c56d4b-sqdq6 error="giving up after 3 attempts, last error: rpc error: code = Canceled desc = stream terminated by RST_STREAM with error code: CANCEL" operationId=01HDM6C0A3QQG0KM1GQ53HSHDP operationNamespace= operationType=List
time="2023-10-25T19:53:24Z" level=warning msg="High latency detected sending operation result to clouddriver: spent 6.045102696s" account=aws-spin-support-agent agentId=spin-armory-agent-5955c56d4b-sqdq6 operationId=01HDM6C0A3QQG0KM1GQ53HSHDP operationNamespace= operationType=List
 
 
The Clouddriver logs the below exceptions as an example.
2023-10-25 19:52:15.284  INFO 1 --- [ault-executor-1] i.a.k.services.RegistrationService       : Sending operationId 01HDM6A3M8NMF28RYCPKFNRJ8V type List for account aws-spin-support-agent to agent spin-armory-agent-5955c56d4b-sqdq6
2023-10-25 19:52:16.336  WARN 1 --- [-worker-ELG-3-1] i.g.n.s.io.grpc.netty.NettyServerStream  : Exception processing message

io.grpc.StatusRuntimeException: RESOURCE_EXHAUSTED: gRPC message exceeds maximum size 4194304: 4534004
        at io.grpc.Status.asRuntimeException(Status.java:526) ~[grpc-api-1.45.1.jar:1.45.1]
        at io.grpc.internal.MessageDeframer.processHeader(MessageDeframer.java:391) ~[grpc-core-1.45.1.jar:1.45.1]
        at io.grpc.internal.MessageDeframer.deliver(MessageDeframer.java:271) ~[grpc-core-1.45.1.jar:1.45.1]
        at io.grpc.internal.MessageDeframer.deframe(MessageDeframer.java:177) ~[grpc-core-1.45.1.jar:1.45.1]
        at io.grpc.internal.AbstractStream$TransportState.deframe(AbstractStream.java:210) ~[grpc-core-1.45.1.jar:1.45.1]
        at io.grpc.internal.AbstractServerStream$TransportState.inboundDataReceived(AbstractServerStream.java:255) ~[grpc-core-1.45.1.jar:1.45.1]
        at io.grpc.netty.shaded.io.grpc.netty.NettyServerStream$TransportState.inboundDataReceived(NettyServerStream.java:226) ~[grpc-netty-shaded-1.45.1.jar:1.45.1]
        at io.grpc.netty.shaded.io.grpc.netty.NettyServerHandler.onDataRead(NettyServerHandler.java:508) ~[grpc-netty-shaded-1.45.1.jar:1.45.1]


 

## Cause
The error messages suggest a problem with the size of gRPC messages sent during custom resource deployment. Specifically, the error ```RESOURCE_EXHAUSTED: gRPC message exceeds maximum size``` indicates that the gRPC message size is larger than the default limit of 4MB. To resolve this issue, we need to increase the maximum gRPC message size in Spinnaker.

