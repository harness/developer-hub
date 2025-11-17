---
title: Upgrade Your Kustomize Version
---

## Introduction
It may become necessary to update the Kustomize binary in Rosco to a newer version.  Below are steps for how to go through the upgrade process

## Prerequisites
N/A

## Instructions
To change the Kustomize binary used by Rosco, mount a volume and use an ```initContainer``` to replace the original binary.Perform the following steps:
* Create the file following file if it does not already exist: ```~/.hal/default/service-settings/rosco.yml```Add the following volume information to the file:
 kubernetes:
   volumes:
   - id: shared-volume
     type: emptyDir
     mountPath: /packer/kustomize​


``````



* This example uses an ```_emptyDir_``` type for the volume type.* The ```mounthPath``` is the directory where the existing Kustomize binary is located.
In the ```~/.hal/config``` file, add an ```initContainer```:

````````````
initContainers:
       rosco:
       - name: kustomize-binary
         image: tutum/curl:latest
         command: ["/bin/sh", "-c"]
         args: ["curl -s -L https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv3.5.4/kustomize_v3.5.4_linux_amd64.tar.gz | tar xvz -C /tmp"]
         volumeMounts:
         - name: shared-volume
           mountPath: /tmp
````````````

``````
* Replace the URL in the **args** attribute with the URL for the Kustomize version that you want to use. In the example, the URL points to version ```3.5.4```.* Set the ```name``` for the ```volumeMounts``` to the same value as the volume’s ID in the ```rosco.yml``` file from step 2.
* Apply the changes: ```hal deploy apply```* Enter into the Rosco pod: ```kubectl exec -it  bash```.* ``````Go to the Kustomize directory: ```cd /packer/kustomize```. If you enter the ```ls``` command, you should see the new binary.Check the Kustomize version: ```./kustomize version```.The command returns information similar to the following:
```{Version:kustomize/v3.5.4 GitCommit:3af514fa9f85430f0c1557c4a0291e62112ab026 BuildDate:2020-01-11T03:12:59Z GoOs:linux GoArch:amd64}```


