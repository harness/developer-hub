---
title: Increase timeouts on Agent Plugin and Agent to avoid network latency issues
---

## Introduction
Depending on the location of the Agents relative to Clouddriver, there might be a need to increase the timeout defined to ensure that both Agent and Clouddriver can complete their push operations. The necessity of the change may arise if the network latency between the Agent and the Clouddriver instances are high.

## Prerequisites
Armory Enterprise Spinnaker with Armory Agent for Kubernetes enabled

## Instructions
#### **Increase timeouts on Agent Plugin**
To increase the timeouts on Agent Plugin, add the below configuration to the Agent Plugin configuration in the following situations
Specify how long to wait for a response after a ```keepalive``` before closing the gRPC connection with the Armory Agent 
```
        kubesvc:
          grpc.server.security.KeepAliveTimeOutSeconds:  180 
```

Specify how often should ```keepalive``` send gRPC pings to the client via the Agent plugin.
```
    kubesvc
      grpc.server.security.keepAliveHeartbeatSeconds: 60​
```
#### **Increase timeouts on Armory Agent**
To increase the timeouts on Agents, add the below configuration to the Agent configuration in the following situations
Specify how often the gPRC keepalive message is sent from Agent to Clouddriver. The default value is ```60 sec```. Note that setting the value to 0 will set it so that keepalive messages will not be sent to Armory Enterprise Clouddriver
```
clouddriver:
  grpc: spin-clouddriver-grpc:9091
  insecure: true
  keepAliveHeartbeatSeconds: 180 
Timeout before closing the gRPC connection. The Agent would wait for the time specified before closing the gRPC connection with Armory Enterprise.
clouddriver:
  grpc: spin-clouddriver-grpc:9091
  insecure: true
  keepAliveTimeOutSeconds:​ 180​
```
If customers wish to set the Agent to wait for a certain period before reconnecting to Armory Enterprise, they can set the ```reconnectTimeoutMs```.  Customers should seek to balance this setting as setting the number too low may lead to aggressive recaching of the data, leading to performance issues
```
kubernetes:
  reconnectTimeoutMs: 60
  accounts: 
  - kubeconfigFile: encryptedFile:secrets-manager!r:us-east-2!s:kubeconfig-secret
    name: Account-1
    metrics: false
    kinds: []
    omitKinds: []
    permissions:
     READ:
      - role-1
     WRITE:
      - role-1​
```
The complete list of configurations for Agent and Agent Plugin can be found in the below links
Agent Plugin: [https://docs.armory.io/armory-enterprise/armory-agent/advanced-config/agent-plugin-options/](https://docs.armory.io/armory-enterprise/armory-agent/advanced-config/agent-plugin-options/)Agent:  [https://docs.armory.io/armory-enterprise/armory-agent/advanced-config/agent-options/#configuration-options](https://docs.armory.io/armory-enterprise/armory-agent/advanced-config/agent-options/#configuration-options)

