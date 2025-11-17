---
title: Hitting annotation hard limit when deploying a Configmap/Secret (Too long)
---

## Issue
When users and administrators are deploying a Configmap/Secret, they may end up hitting the following error:
``` 
Error occurred when Deploy secret/ in : (500: error creating resource-name in :
 Secret "" is invalid: metadata.annotations: 
Too long: must have at most 262144 bytes: metadata.annotations:
 Too long: must have at most 262144 bytes)
```

## Cause
This error occurs during the ```kubectl apply``` phase for the ConfigMap/Secrets resources deployment.  Spinnaker uses ```kubectl apply``` to perform deployments.  One of the downsides of using ```kubectl apply``` is that it stores the entire ```spec``` as an annotation in the object, which is used to understand how to handle defaulted vs. deleted fields. 
What’s happening is that the data fields in the ConfigMap/Secrets are ```exceeding 262144 characters``` max limit enforced by the Kubernetes API server.  As a result, Spinnaker cannot fit in the ```last-applied-configuration``` kubectl annotation.

