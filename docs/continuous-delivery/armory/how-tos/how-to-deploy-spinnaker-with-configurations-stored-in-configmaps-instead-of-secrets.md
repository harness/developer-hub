---
title: How To deploy Spinnaker with Configurations stored in Configmaps instead of Secrets
---

## Introduction
Up until now, Spinnaker configuration is stored by default as Kubernetes Secrets. 
In order to help some customers with compliance and to ensure that configurations are stored in the expected location, Armory has adjusted code to provide the option to store the configuration in Kubernetes ConfigMaps instead, for those deploying using  Armory Operator.
This article shows how to deploy Spinnaker with this option enabled.

## Prerequisites
This feature is available starting in ```armory-operator: 1.8.0```

## Instructions
Below are the steps to enable the function
* Ensure your operator deployment is using the correct image  **armory-operator: 1.8.0** or greater ([https://hub.docker.com/r/armory/armory-operator/tags](https://hub.docker.com/r/armory/armory-operator/tags))Within the the halyard configmap named ```halyard-config-map```, set ```halyard.configSourceType``` to ```configMap``` instead of the default ```secret```.
data:
  halyard.yml: |
    halyard:
      halconfig:
        directory: /Users/spinnaker/.hal
      configSourceType: configMap
    spinnaker:
      config:
        input:
          bucket: halconfig
          region: us-west-2
    secrets:
      vault:
        enabled: false
        url: https://vault.url
        path: example
        role: example
        authMethod: KUBERNETES
 
Ensure that the configmap is mounted on the halyard pod
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      name: spinnaker-operator
  template:
    metadata:
      creationTimestamp: null
      labels:
        name: spinnaker-operator
    spec:
      volumes:
        - name: halyard-config-map
          configMap:
            name: halyard-config-map
            defaultMode: 420
      containers:
      - name: halyard
          image: armory/halyard-armory:1.12.0-76b471c-operator
          ports:
            - containerPort: 8064
              protocol: TCP
          resources: {}
          volumeMounts:
            - name: halyard-config-map
              mountPath: /opt/spinnaker/config
#......manifest file is truncated for brevity

If the Spinnaker environment is already deployed, it will need to be redeploy for the changes to take effect on the pods

