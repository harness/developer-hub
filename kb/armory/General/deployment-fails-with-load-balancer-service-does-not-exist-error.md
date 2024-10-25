---
title: Deployment fails with "Load balancer service <service-name> does not exist" error
---

## Issue
An organization deploying to Kubernetes using Kustomize may run into an issue where the bake stage of a deployment is successful and can see the service section in the baked manifest as needed. However the pipeline fails with the error,
“Load balancer service  does not exist"

Unique variables for this bug include having the Deployment Strategy set to Red/Black (Blue/Green) 

## Cause
This is a known bug of Kubernetes, Kustomize, and even Helm. There is another Knowledge Article that goes over some of the issues and workarounds. 
[https://kb.armory.io/s/article/Load-balancer-service-svc-spinnaker-demo-does-not-exist](https://kb.armory.io/s/article/Load-balancer-service-svc-spinnaker-demo-does-not-exist)
Additionally, there is a very similar issue on Github.
[https://github.com/spinnaker/spinnaker/issues/5040](https://github.com/spinnaker/spinnaker/issues/5040)

Kubernetes has trouble viewing manifests when deployment strategies are used, thus causing errors. 


