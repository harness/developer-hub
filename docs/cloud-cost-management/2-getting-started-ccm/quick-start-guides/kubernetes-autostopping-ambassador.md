---
title: Kubernetes Autostopping for Ambassadaor
description: This article provides instructions to create AutoStopping rules for Kubernetes with the Traefik ingress controller.
sidebar_position: 40
---

This article provides instructions to create AutoStopping rules for Kubernetes with the Ambassador ingress controller.


### Prerequisites

Make sure to meet the following prerequisites before you create an AutoStopping rule for Ambassador.

* Make sure you are running at the least version 1.0.5 of `autostopping-controller` in your Kubernetes cluster.
* Ambassador mapping is configured and is routing traffic to the service as expected.
* You should have access to edit the Ambassador mapping.

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
    ambassador:
        mapping: httpbin
    idleTimeMins: 5
    hideProgressPage: false
```


After applying the YAML, an AutoStopping Rule is created in your cluster for service echo which is running on port 8080.

### Changes in Ambassador Mapping
After Ambassador Mapping is added as a first class entity to AutoStopping, these changes will be automated.

After creating the AutoStopping Rule, make the following changes in your Ambassador Mapping: 

Change the destination and add an extra request header: 

_From_

```
spec:
  prefix: /test
  service: echo
```

_To_

```
spec:
  prefix: /test
  add_request_headers:
    AutoStoppingRule: default-echo-ambassador
  service: autostopping-router
```


After configuration, your ingressRoute looks like the following:


```
apiVersion: getambassador.io/v2
kind: Mapping
metadata:
  name: echo-mapping
spec:
  prefix: /test
  add_request_headers:
    AutoStoppingRule: default-echo-ambassador
  service: autostopping-router
```

Now your traffic flows through the autostopping-router and the AutoStopping rule takes actions based on activity and inactivity.