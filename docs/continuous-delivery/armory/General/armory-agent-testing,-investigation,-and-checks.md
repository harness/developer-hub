---
title: Armory Agent Testing, Investigation, and Checks
---

## Introduction
When having issues connecting Armory Agent with CloudDriver, there are some checks and tests that should be run in order to get some general information about where the issues may reside.These checks are useful to perform before opening a ticket so that we can ensure a quicker resolution to the issue.  Please also consult our [docs on setting up Armory Agent](https://docs.armory.io/docs/armory-agent/) which include a quick start guide and many settings that may be applicable to the environment

## Prerequisites
```grpcurl``` should be installed ([https://github.com/fullstorydev/grpcurl](https://github.com/fullstorydev/grpcurl))**Please note:** ```http/2``` traffic must be available between the Agent(s) and CloudDriver.  This may require adjustments on the firewall or security to allow for the traffic to be made available 

## Instructions
Below are some common considerations to think about when investigating communication issues, and offer a starting point before opening a ticket with Support. 
### Ensuring the Correct CloudDriver Pod is being Checked for Error Messages
Within all CloudDriver pods, the repeating log entry ```Assigning accounts to Kubesvc enabled Clouddriver``` is a normally occurrence happening once every 30s to check if caching assignments need to be changed from one CloudDriver Pod to another (basically acting like a heartbeat).All CloudDriver pods should have this same message within their logs, regardless if they are connected or not as the primary pod that the Agents are interacting with.The logs that contain relevant information about the connection status may exist on another pod, and should also be checked for additional messages not in the originating pod.  As an example, this is the output in a pod which has a healthy connection.
```
21-01-26 03:42:14.876  INFO 1 --- [ecutionAction-6] a.k.s.r.c.c.MNKubesvcAccountLoadBalancer : Account assignment done
2021-01-26 03:42:16.874  INFO 1 --- [ecutionAction-8] c.k.c.a.KubernetesV2OnDemandCachingAgent : spinnaker/KubernetesCoreCachingAgent[1/1]: agent is starting
2021-01-26 03:42:16.874  INFO 1 --- [ecutionAction-5] c.k.c.a.KubernetesV2OnDemandCachingAgent : spinnaker/KubernetesUnregisteredCustomResourceCachingAgent[1/1]: agent is starting
2021-01-26 03:42:18.513  INFO 1 --- [ecutionAction-5] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesUnregisteredCustomResourceCachingAgent[1/1]: grouping Addon.k3s.cattle.io has 12 entries and 0 relationships
2021-01-26 03:42:18.513  INFO 1 --- [ecutionAction-5] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesUnregisteredCustomResourceCachingAgent[1/1]: grouping HelmChart.helm.cattle.io has 1 entries and 0 relations
hips
2021-01-26 03:42:18.513  INFO 1 --- [ecutionAction-5] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesUnregisteredCustomResourceCachingAgent[1/1]: grouping SpinnakerService.spinnaker.armory.io has 1 entries and
 0 relationships
2021-01-26 03:42:19.429  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping role has 7 entries and 0 relationships
2021-01-26 03:42:19.429  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping pod has 23 entries and 24 relationships
2021-01-26 03:42:19.429  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping roleBinding has 8 entries and 0 relationships
2021-01-26 03:42:19.429  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping secret has 75 entries and 29 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping daemonSet has 4 entries and 20 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping artifact has 1 entries and 0 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping storageClass has 1 entries and 0 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping persistentVolume has 2 entries and 0 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping customResourceDefinition has 5 entries and 0 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping event has 271 entries and 0 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping clusters has 42 entries and 118 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping deployment has 15 entries and 103 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping clusterRole has 66 entries and 0 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping apiService has 38 entries and 0 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping serviceAccount has 40 entries and 0 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping replicaSet has 35 entries and 125 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping validatingWebhookConfiguration has 1 entries and 0 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping statefulSet has 2 entries and 10 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping service has 20 entries and 59 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping configMap has 13 entries and 1 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping namespace has 6 entries and 0 relationships
2021-01-26 03:42:19.430  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping controllerRevision has 6 entries and 6 relationships
2021-01-26 03:42:19.431  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping clusterRoleBinding has 49 entries and 0 relationships
2021-01-26 03:42:19.431  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping persistentVolumeClaim has 2 entries and 0 relationships
2021-01-26 03:42:19.431  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping job has 1 entries and 1 relationships
2021-01-26 03:42:19.431  INFO 1 --- [ecutionAction-8] n.s.c.k.c.a.KubernetesCacheDataConverter : spinnaker/KubernetesCoreCachingAgent[1/1]: grouping applications has 13 entries and 118 relationships
```
### Check to Ensure CloudDriver Pods Were Able to Register with the Agents
After finishing the creation of the plugin and installing agent, attempt to run the following command, replacing  with the namespace with the correct namespace that CloudDriver resides in
```kubectl -n  logs deploy/spin-clouddriver | grep Registering```
The output should contain several references to the registration of the agent, e.g.
```
ubuntu@ip-192-168-88-133:~/agent-k8s-training$ kubectl -n spinnaker logs deploy/spin-clouddriver | grep Registering      
2021-01-26 03:35:55.033  INFO 1 --- [           main] i.a.k.s.r.c.KubesvcAccountProvider       : Registering Kubernetes v2 account account01
2021-01-26 03:35:55.111  INFO 1 --- [           main] i.a.k.s.r.c.KubesvcAccountProvider       : Registering Kubernetes v2 account account17
2021-01-26 03:36:46.124  INFO 1 --- [ault-executor-0] i.a.k.s.r.kubesvc.KubesvcRegistry        : Registering Kubesvc instance 9fa5f8a8-b617-4ba4-af89-cedfb728
d59b
2021-01-26 03:37:14.888  INFO 1 --- [ault-executor-1] i.a.k.s.r.kubesvc.KubesvcRegistry        : Registering Kubesvc instance 72f2b5c2-2110-4982-b198-206a97d3
b026
```
### Check to Ensure CloudDriver Pods Were Able to Connect with the Agents
Attempt to run the following command, replacing `````` with the namespace with the correct namespace that CloudDriver resides in
```kubectl -n  logs deploy/spin-kubesvc | grep connect```

The output should appear references like the below example, showing the connection to the agent:
```
time="2021-01-26T03:42:19Z" level=info msg="connecting to 3.21.240.197:9091..."
time="2021-01-26T03:42:19Z" level=info msg="connected to 3.21.240.197:9091"
time="2021-01-26T03:42:19Z" level=info msg="connecting to Spinnaker: a420f5f3-1de2-4c49-a354-d2c687c874e5"
```

### Check Service Account(s) Were Created in the Correct Namespace
Please also check that the service account was created in the correct namespace and provide that output by running 
```kubectl get serviceaccounts -n ```
Please also provide the YAML output of the service account 
```kubectl get serviceaccounts/ -o yaml -n  ```

### Perform a gRPCurl to Confirm Communication
Finally, it is a good idea to check that a ```grpcurl``` to attain the output from where the agent is installed to the IP address of the load balancer for the CloudDriver pod.There is a list of commands and what can be done to enable verbose output located in the [troubleshooting section of our Agent Docs](https://docs.armory.io/docs/armory-agent/agent-troubleshooting/#testing-grpc-endpoints)

