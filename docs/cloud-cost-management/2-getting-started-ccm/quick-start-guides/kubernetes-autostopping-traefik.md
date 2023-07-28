---
title: Kubernetes Autostopping for Traefik
description: This article provides instructions to create AutoStopping rules for Kubernetes with the Traefik ingress controller.
sidebar_position: 30
---

This article provides instructions to create AutoStopping rules for Kubernetes with the Traefik ingress controller.

### Prerequisites

Make sure to meet the following prerequisites before you create an AutoStopping rule for Traefik.

* Make sure you are running at the least version 1.0.5 of `autostopping-controller` in your Kubernetes cluster.

* Traefik `ingressRoute` is configured and is routing traffic to the service as expected.

* Routing to external names is allowed in Traefik by setting the following flag: 
`--providers.kubernetescrd.allowexternalnameservices=true`

* You should have access to edit the Traefik ingressRoute.


:::important Note
Allowing traffic to external names by setting the flag `--providers.kubernetescrd.allowexternalnameservices=true` is required because the autostopping-router is an external name service for all other services.
:::


### Set up your cluster
Create an AutoStopping rule in your cluster, either through the Harness UI or by applying YAML directly on the cluster of the form:


```
apiVersion: ccm.harness.io/v1
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
    traefik:
        ingressRoute: httpbin
    idleTimeMins: 5
    hideProgressPage: false
```

After applying the YAML, an AutoStopping Rule is created in your cluster for service echo which is running on port 8080.

 

### Create Traefik Middleware to pass the extra-header


```
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: test-rule-header
spec:
  headers:
    customRequestHeaders:
      AutoStoppingRule: default-test-rule
```


This header sends the AutoStoppingRule header to all the associated ingress routes.

### Changes in IngressRoute
After Traefik ingressRoute is added as a first class entity to AutoStopping, these changes are automated.

After creating the AutoStopping Rule, make the following changes in your Traefik IngressRoute:

#### Change the destination

_From_


```
services:                           
- kind: Service
  name: echo
  port: 8080    
```
                

_To_


```
services:
- kind: Service
  name: autostopping-router
  port: 80
```


#### Add Header Middleware
Under the spec for the ingressroute, add the middleware that was created earlier.


```
....
middlewares:
  - name: test-rule-header
.....
```


After configuration, your ingressRoute looks like the following:


```
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  annotations:
    helm.sh/hook: post-install,post-upgrade
  name: echo-traefik
  labels:
    app: echo
    traefik_version: 10.20.1
spec:
  routes:
  - kind: Rule
    match: Host(`someip.nip.io`)
    services:
    - kind: Service
      name: autostopping-router
      port: 80
    middlewares:
      - name: test-rule-header
```


Now your traffic flows through the autostopping-router and the AutoStopping rule takes actions based on activity and inactivity.