---
title: Configure persistent storage to capture heapdumps for Spinnaker Services
---

## Introduction
There might be a need to capture ```heapdump``` of Java-based Spinnaker Services to troubleshoot items such as memory issues.
Pods and containers are stateless and the storage on the containers are generally ephemeral which means the ***dump generated is lost when the service goes down***. 
This article explains the steps involved to configure heapdump and non-ephemeral storage on Spinnaker Services to retain these dumps. Clouddriver is taken as a reference. However, the same can be applied to other Java-based Spinnaker Services such as Orca, Gate, Front50 etc. 

## Prerequisites
N/A

## Instructions
There are couple steps involved to configure the heapdump to be stored on a non-ephemeral storage.
### Create a storage and mount them on the container for which heapdumps are required   
Volumes can be mounted on to the container in two ways as explained below
Generate a Kustomize patch and have the volumes and volume mounts created for the container. This involves adding the patch to the deployment of the required Spinnaker Service as shown below

```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  kustomize:
    clouddriver:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                spec:
                  containers:
                    - name: clouddriver
                      volumeMounts:
                        - name: spinnaker-home
                          mountPath: /path/to/heapdump
                  volumes:
                    - name: spinnaker-home
                      emptyDir: {}​
```
Configure the volumes under the Kubernetes section of ```spec.spinnakerConfig.service-settings``` of the Spinnaker Service that the volume needs to be mounted in:
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    service-settings:
      clouddriver: 
       kubernetes:
          volumes:
           - id: heap-dump
             type: emptyDir
             mountPath: /path/to/heapdump​
```
* After applying one of the above mentioned configurations, the volume can be found mounted in the Clouddriver pod(s).

### **Configure JAVA_OPS parameters to generate Heapdump when JVM runs out of memory**
To generate the heapdump for the Spinnaker Service when it runs out of memory, add the below ```JAVA_OPTS``` parameters for the intended service under ```spec.spinnakerConfig.service-settings``` of Spinnaker manifest. 
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    service-settings:
      clouddriver: 
       env:
          JAVA_OPTS: -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/path/to/heapdump
```
This shall generate the heapdump under ```/path/to/heapdump``` when Clouddriver runs out of memory.

