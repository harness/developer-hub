---
title: Reducing AWS EKS get-token Calls Made by Kubectl
---

## Introduction
This should be applied when there is a need to optimize the latency of ```kubectl``` calls to AWS EKS.

## Prerequisites
AWS EKS deployment targetKubeconfig file configured to run ```aws eks get-token```

## Instructions
### Create script
Create a script named ```aws-get-token.sh``` with the following content
```
#!/bin/bash -e
awsCluster=$1
region=$2
# 840 sec = 14 min
maxFileAge=840

if [[ -f /tmp/$awsCluster.token ]]; then
    # file age in seconds = current_time - file_modification_time.
    fileage=$(($(date +%s) - $(stat -c '%Y' "/tmp/$awsCluster.token")))
    if [[ $fileage > $maxFileAge ]]; then
        #echo "Getting token again ..."
        TOKEN=$(aws eks get-token --cluster-name $awsCluster --region $region)
        echo $TOKEN > /tmp/$awsCluster.token
    else
    	TOKEN=$( /tmp/$awsCluster.token
fi
echo -n $TOKEN
```

### Create configMap in Spinnaker Namespace for Script aws-get-token.sh
Run the following command:
```kubectl -n $SPINNAKER_NAMESPACE create configmap aws-get-token --from-file aws-get-token.sh```

### Alter kubeconfig File
Alter ```kubeconfig``` file to make use of the ```aws-get-token.sh``` script created above. The kubeconfig file should look something like the following. Take note of the args and the command portion of this file.
```
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0txxxx=
    server: https://B39xxxxx.yl4.${region}.eks.amazonaws.com
  name: arn:aws:eks:${region}:xxxxx:cluster/${awsCluster}
contexts:
- context:
    cluster: arn:aws:eks:${region}:xxxxx:cluster/${awsCluster}
    user: arn:aws:eks:${region}:xxxxx:cluster/${awsCluster}
  name: arn:aws:eks:${region}:xxxxx:cluster/${awsCluster}
current-context: arn:aws:eks:${region}:xxxxx:cluster/${awsCluster}
kind: Config
preferences: {}
users:
- name: arn:aws:eks:${region}:xxxxx:cluster/${awsCluster}
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1alpha1
      args:
      - ${awsCluster}
      - ${region}
      command: /home/spinnaker/bin/aws-get-token.sh
```
### Configure Spinnaker to Mount the Script
Configure Spinnaker to mount the script ```aws-get-token.sh``` as a ```configMap```.
### Using Halyard
In the ```service-settings/clouddriver.yml``` file add the following content:
```
kubernetes:
  securityContext:
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000
  volumes:
  - id: aws-bin-dir
    type: emptyDir
    mountPath: /home/spinnaker/bin
  - id: aws-get-token
    type: configMap
    mountPath: /aws-scripts-ro
```
### Using Operator
Create a YAML file with the following content. Make sure to change `````` to match your CRD version
```
apiVersion: 
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    service-settings:
      clouddriver:
        kubernetes:
          securityContext:
            runAsUser: 1000
            runAsGroup: 1000
            fsGroup: 1000
          volumes:
          - id: aws-bin-dir
            type: emptyDir
            mountPath: /home/spinnaker/bin
          - id: aws-get-token
            type: configMap
            mountPath: /aws-scripts-ro
```

## Configure initContainer for Clouddriver
Configure an ```initContainer``` for Clouddriver which will copy the script ```aws-get-token.sh``` from the read-only location to ```/home/spinnaker/bin``` and make it executable.

### Halyard
In the ```~/.hal/config``` file find the ```initContainers``` section and add the following:
```
    initContainers:
      spin-clouddriver:
      - name: init-clouddriver
        image: busybox:latest
        command:
        - sh
        - -c
        - cp /aws-scripts-ro/aws-get-token.sh /home/spinnaker/bin && chown -R 1000:1000 /home/spinnaker/bin/* && chmod 755 /home/spinnaker/bin/aws-get-token.sh
        volumeMounts:
        - mountPath: /home/spinnaker/bin
          name: aws-bin-dir
        - mountPath: /aws-scripts-ro
          name: aws-get-token
```

### Operator
Create a YAML file with the following content. Make sure to change `````` to match your CRD version
```
apiVersion: 
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      deploymentEnvironment:
        initContainers:
          spin-clouddriver:
          - name: init-clouddriver
            image: busybox:latest
            command:
            - sh
            - -c
            - cp /aws-scripts-ro/aws-get-token.sh /home/spinnaker/bin && chown -R 1000:1000 /home/spinnaker/bin/* && chmod 755 /home/spinnaker/bin/aws-get-token.sh
            volumeMounts:
            - mountPath: /home/spinnaker/bin
              name: aws-bin-dir
            - mountPath: /aws-scripts-ro
              name: aws-get-token
```
## Redeploy Spinnaker
Redeploy Spinnaker with the changed configuration and new kubeconfig file

