---
title: Debugging Deployment Errors
---

## Issue
When deploying to a new Kubernetes cluster for the first time, you might receive this error: 
```deployKubernetesManifest.deployKubernetesManifst.deployment.Error reading kind [deployment].```

## Cause
Typically this is caused by one of the following issues:
* Your kubeconfig for the cluster is not properly configured.* The namespace used in the deployment manifest does not match the namespaces allowed as defined in your .hal/config. 

