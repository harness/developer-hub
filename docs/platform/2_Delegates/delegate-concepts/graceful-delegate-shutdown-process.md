---
title: Graceful delegate shutdown
description: Read about the process of graceful delegate shutdown.
sidebar_position: 5
---

Harness Delegate is designed to shut down gracefully. The process of graceful delegate shutdown is as follows:

- The delegate receives an instruction to quit.
- A grace period begins during which the delegate:
  + Stops accepting new tasks.
  + Works to complete running tasks.
- The grace period ends.
- Delegates that have not quit are force-terminated.
- Incomplete tasks are discarded.

## Grace period

The length of the grace period is configurable. 

| **Delegate type** | **Grace period** | **Default interval** |
| :-- | :--: | :--: |
| Immutable image | Yes | Configurable (details below)  |
| Legacy image | No | 30 seconds |

### Kubernetes deployment default interval configuration

Open the delegate manifest file and locate the container `spec` (`spec.containers`). Change the `terminationGracePeriodSeconds` as shown in the following YAML. In the example below, `terminationGracePeriodSeconds` is set to 10 minutes.

```yaml
 spec:  
     terminationGracePeriodSeconds: 600  
     restartPolicy: Always  
     containers:  
     - image: example/org:custom-delegate  
       imagePullPolicy: Always  
       name: delegate  
       securityContext:  
         allowPrivilegeEscalation: false  
         runAsUser: 0   
```

### ECS deployment default interval configuration

Open the delegate manifest file and locate the container `containerDefinitions`. Change the `stopTimeout` as shown in the following YAML. In the example below, `stopTimeout` is set to 10 minutes.

```yaml
ipcMode:  
executionRoleArn: <ecsInstanceRole Role ARN>  
containerDefinitions:  
- dnsSearchDomains:  
 environmentFiles:  
 entryPoint:  
 portMappings:  
 - hostPort: 80  
   protocol: tcp  
   containerPort: 80  
 command:  
 linuxParameters:  
 cpu: 0  
 environment: []  
 resourceRequirements:  
 ulimits:  
 dnsServers:  
 mountPoints: []  
 workingDirectory:  
 secrets:  
 dockerSecurityOptions:  
 memory:  
 memoryReservation: 128  
 volumesFrom: []  
 stopTimeout: 600 
 image: <+artifact.image>  
 startTimeout:  
 firelensConfiguration:  
 dependsOn:  
 disableNetworking:  
 interactive:  
 healthCheck:  
 essential: true  
 links:  
 hostname:  
 extraHosts:  
 pseudoTerminal:  
 user:  
 readonlyRootFilesystem:  
 dockerLabels:  
 systemControls:  
 privileged:  
 name: nginx  
placementConstraints: []  
memory: '512'  
taskRoleArn: <ecsInstanceRole Role ARN>  
family: fargate-task-definition  
pidMode:  
requiresCompatibilities:  
- FARGATE  
networkMode: awsvpc  
runtimePlatform:  
cpu: '256'  
inferenceAccelerators:  
proxyConfiguration:  
volumes: []
```

## Graceful shutdown events

The event that initiates the graceful shutdown depends on delegate type.

| **Delegate environment** | **Trigger** 
| :-- | :--: 
| Kubernetes | Pod termination, eviction, or user-initiated scaling 
| Docker | `docker kill` command 
| Shell | `./stop.sh` instruction 
