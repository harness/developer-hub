---
title: Operator is throwing error message about modified object
---

## Issue
Administrators may be seeing an error similar to the one below in their Operator pods:
```Reconciler error","controller":"spinnakerservice-controller","request":"spinnaker/spinnaker","error":"Operation cannot be fulfilled on spinnakerservices.spinnaker.armory.io \"spinnaker\": the object has been modified; please apply your changes to the latest version and try again```

## Cause
This is a transient error that frequently occurs when an object is modified mid-reconcile loop. Users are only allowed to modify and commit one change before returning it back to Kubernetes and try again another time. 

