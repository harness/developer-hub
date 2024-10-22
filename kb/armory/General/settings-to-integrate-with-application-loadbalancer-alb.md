---
title: Settings to integrate with Application LoadBalancer (ALB)
---

## Introduction
In order to integrate an Application LoadBalancer with Spinnaker there are a couple of service-settings changes that are needed.
* For all microservices deployed except deck change the service-settings ```kubernetes.useExecHealthCheck``` to ```false```.* For **Deck** and **Gate** change ```kubernetes.serviceType``` to ```NodePort```
Applies to:AWS ALB Ingress ControllerApplication Load Balancers

## Prerequisites
Using an Application LoadBalancer for Spinnaker ingress.

## Instructions
## If using Halyard
In the Halyard ```service-settings``` folder, create a file for each microservice if it doesn't already exist. The name of the file should be ```.yml```.For ```service-settings/deck.yml``` add the following content:
kubernetes:
  serviceType: NodePort
For ```service-settings/gate.yml``` add the following content:
```
kubernetes:
  serviceType: NodePort
  useExecHealthCheck: false
```
For all other microservices add the following content to their ```service-settings/.yml``` file:
```
kubernetes:
  useExecHealthCheck: false
```
## If using Operator
For all microservices deployed **except Deck** change the service-settings ```kubernetes.useExecHealthCheck``` to ```false```. And for Deck and Gate set ```kubernetes.serviceType``` to ```NodePort```.
```
spec:
  spinnakerConfig:   
    service-settings:
      clouddriver:
        kubernetes:
          useExecHealthCheck: false
      deck:
        kubernetes:
          serviceType: NodePort
      echo:
        kubernetes:
          useExecHealthCheck: false
      fiat:
        kubernetes:
          useExecHealthCheck: false
      front50:
        kubernetes:
          useExecHealthCheck: false
      gate:
        kubernetes:
          serviceType: NodePort
          useExecHealthCheck: false
      igor:
        kubernetes:
          useExecHealthCheck: false
      orca:
        kubernetes:
          useExecHealthCheck: false
      rosco:
        kubernetes:
          useExecHealthCheck: false
      kayenta:
        kubernetes:
          useExecHealthCheck: false
      dinghy:
        kubernetes:
          useExecHealthCheck: false
      terraformer:
        kubernetes:
          useExecHealthCheck: false
```

