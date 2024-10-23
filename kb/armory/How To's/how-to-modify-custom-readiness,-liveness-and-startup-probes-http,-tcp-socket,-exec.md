---
title: How to Modify Custom Readiness, Liveness and Startup Probes (HTTP, TCP socket, Exec)
---

## Introduction
As a best practice, customers should be looking to set up various probes to detect service failures.  
* The ```kubelet``` uses ***liveness probes*** to know when to restart a container.  For example, liveness probes could catch a deadlock, where an application is running but unable to make progress.  Restarting a container in such a state can help to make the application more available despite bugs.* The ```kubelet``` uses ***readiness probes*** to know when a container is ready to start accepting traffic.  A Pod is considered ready when all of its containers are ready.  One use of this signal is to control which Pods are used as backends for Services.  When a Pod is not ready, it is removed from Service load balancers.* The ```kubelet``` uses ***startup probes*** to know when a container application has started.  If such a probe is configured, it disables liveness and readiness checks until it succeeds, ensuring those probes don't interfere with the application startup.  The setting can be used to adopt liveness checks on slow starting containers, avoiding them getting killed by the kubelet before they are up and running.
 

## Prerequisites
* Kubenetes cluster (EKS,AKS,GKE etc..)* Spinnaker manifest access
 

## Instructions
Below is an example of how to modify readiness, liveness, and startup probes and how Clouddriver will interact with a kubernetes cluster.  Administrators should feel welcome to adjust the values of the probes to suit their needs.  
apiVersion: spinnaker.armory.io/v1alpha2
```
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    service-settings:
      clouddriver:
        kubernetes:
          livenessProbe:
            httpGet:
              port: 7002
              path: /health
              scheme: http
            initialDelaySeconds: 60
            periodSeconds: 10
            timeoutSeconds: 1
            successThreshold: 1
            failureThreshold: 3
          readinessProbe:
            tcpSocket:
              port: 7002
            initialDelaySeconds: 60
            periodSeconds: 10
            timeoutSeconds: 1
            successThreshold: 1
            failureThreshold: 3 
          startupProbe:
            exec:
              command:
                - wget
                - --no-check-certificate
                - --spider
                - -q
                - http://localhost:7002/health
            initialDelaySeconds: 60
            periodSeconds: 10
            timeoutSeconds: 1
            successThreshold: 1
            failureThreshold: 3
      echo: {}
      fiat: {}
      front50: {}
      gate: {}
      igor: {}
      kayenta: {}
      orca: {}
      rosco: {}
```
