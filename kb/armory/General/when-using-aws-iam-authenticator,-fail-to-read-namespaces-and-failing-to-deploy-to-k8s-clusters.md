---
title: When using aws-iam-authenticator, fail to read namespaces and failing to deploy to k8s clusters
---

## Issue
For Kubernetes installations that use ```aws-iam-authenticator``` for authenticating to the Kubernetes cluster, it has been noticed that upgrading Spinnaker version from **v2.21.4** to **v2.23.5 (or later)** results in Spinnaker unable to deploy across namespaces. Exceptions similar to below are seen on the Clouddriver logs.

```
2021-03-26 13:37:17.325 ERROR 1 --- [      Thread-95] c.n.s.c.k.s.KubernetesCredentials        : Could not list namespaces for account XXXXXX: Failed to read [namespace] from : error: You must be logged in to the server (Unauthorized)
2021-03-26 13:37:17.455 ERROR 1 --- [      Thread-96] c.n.s.c.k.s.KubernetesCredentials        : Could not list namespaces for account XXXXXX Failed to read [namespace] from : error: You must be logged in to the server (Unauthorized)
2021-03-26 13:37:20.010 ERROR 1 --- [      Thread-97] c.n.s.c.k.s.KubernetesCredentials        : Could not list namespaces for account XXXXXXXXXX: Failed to read [namespace] from : Error from server (Forbidden): namespaces is forbidden: User "system:node:XXXXXXXX" cannot list resource "namespaces" in API group "" at the cluster scope
2021-03-26 13:37:55.067 ERROR 1 --- [      Thread-98] c.n.s.c.k.s.KubernetesCredentials        : Could not list namespaces for account XXXXXXXX: Failed to read [namespace] from : Error from server (Forbidden): namespaces is forbidden: User "system:node:XXXXXXXX" cannot list resource "namespaces" in API group "" at the cluster scope
```

## Cause
It has been identified that the Clouddriver version **2.21.4** has been using a higher version of ```aws-iam-authenticator``` (0.5.0+) when compared to the version 2.23.5. The version of ```aws-iam-authenticator``` has been downgraded from 0.5.0 to 0.4.0 to overcome the latency issues that Clouddriver has when invoking a call to the Kubernetes cluster.   The complete release notes has can be found at: [https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-23-0/#armory-clouddriver---2221122324](https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-23-0/#armory-clouddriver---2221122324)


