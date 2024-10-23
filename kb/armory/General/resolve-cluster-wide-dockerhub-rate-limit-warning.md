---
title: Resolve cluster-wide DockerHub Rate Limit Warning
---

## Issue

During Spinnaker deployment, some or all the component pods are in an ```ImagePullBackOff``` status. This can be confirmed by checking the full warning message by describing one of the affected pods:
 

```kubectl -n  describe pod ```
 

In the Events block of the affected pod the following message similar to the following should be found:
 

 Warning  Failed            14m (x4 over 15m)   kubelet             \
     Failed to pull image "docker.io/armory/echo:2.26.10": \
     rpc error: code = Unknown desc = Error response from daemon: \
     toomanyrequests: You have reached your pull rate limit. You may \
     increase the limit by authenticating and upgrading: \
     https://www.docker.com/increase-rate-limit
 
This is likely to happen where multiple users are working with a single Kubernetes Cluster, or if a cluster grows extremely large and has many changes/redeployments. 





## Cause

This is because DockerHub rate limits anonymous container pulls from their service to a maximum of 100 every 6 hours while free authenticated DockerHub users are limited to 200 container image pulls every 6 hours .
 
In order to get around this limit, users will need to create a DockerHub account and configure registry credentials within the namespace that Spinnaker is being deployed. Therefore, pulling container images as an authenticated user gives 100 more image pull requests before hitting the limit.


