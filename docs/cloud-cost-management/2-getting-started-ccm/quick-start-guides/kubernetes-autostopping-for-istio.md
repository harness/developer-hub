---
title: Kubernetes AutoStopping for Istio
description: This article provides instructions to create AutoStopping rules for Kubernetes with the Istio ingress controller.
sidebar_position: 20
helpdocs_topic_id: xp8orapo9t
helpdocs_category_id: biypfy9p1i
helpdocs_is_private: false
helpdocs_is_published: true
---

This article provides instructions to create AutoStopping rules for Kubernetes with the Istio ingress controller.

### Prerequisites

Make sure to meet the following prerequisites before you create an AutoStopping rule for Istio.

* Make sure you are running at least version 1.0.8 of `autostopping-controller` in your Kubernetes cluster​.
* Istio gateway and virtual service are configured and are routing traffic to the service as expected​.
* The latest cost optimization connector YAML applied in the cluster with the read-write permissions to `networking.istio.io object virtualservices`

### Set up your cluster

Create an AutoStopping rule in your cluster, either through the Harness UI or by applying YAML directly on the cluster of the form:​


```
apiVersion: ccm.harness.io/v1​  
kind: AutoStoppingRule  
metadata:  
    name: test-rule  
    namespace: default  
    annotations:  
        harness.io/cloud-connector-id: CloudAccountID  
spec:  
    service:  
        name: echo  
        port: 8080  
    istio:  
        virtualServices:   
          - httpbin  
    idleTimeMins: 5  
    hideProgressPage: false
```
After applying the YAML, an AutoStopping Rule is created in your cluster for service echo which is running on port 8080.

Now, your traffic flows through autostopping-router, and the AutoStopping takes actions based on activity and inactivity​.

### Multiple VirtualServices Pointing to the same Service

If you have a setup where multiple virtual services are pointing to the same Kubernetes service, you can configure AutoStopping for those services as given in the following example.

Assume `httpbin1` and `httpbin2` are your Istio virtualservices and echo is your Kubernetes service.​


```
apiVersion: ccm.harness.io/v1​  
kind: AutoStoppingRule  
metadata:  
    name: test-rule  
    namespace: default  
    annotations:  
        harness.io/cloud-connector-id: CloudAccountID  
spec:  
    service:  
        name: echo  
        port: 8080  
    istio:  
        virtualServices:   
          - httpbin1  
          - httpbin2  
    idleTimeMins: 5  
    hideProgressPage: false
```
After applying this rule, both of the virtualservices are reconfigured for AutoStopping orchestration​.

### VirtualServices Pointing to the Service in different Namespace

If you have a setup where a virtualservice is pointing to a Kubernetes service in a different namespace with its FQDN, you can configure AutoStopping for those services as given in the following example.​

Assume `httpbin1` is your Istio virtualservice in default namesapce and echo is your Kubernetes service in namespace development.​


```
apiVersion: ccm.harness.io/v1​  
kind: AutoStoppingRule  
metadata:  
    name: test-rule  
    namespace: development  
    annotations:  
        harness.io/cloud-connector-id: CloudAccountID  
spec:  
    service:  
        name: echo  
        port: 8080  
    istio:  
        virtualServices:  
          - default.httpbin1  
    idleTimeMins: 5  
    hideProgressPage: false
```
Here, you are creating the rule in the same namespace as that of the Kubernetes service (development) and referring to the virtualservice in the default namespace. After applying this rule, the virtualservice is reconfigured for AutoStopping orchestration.​

