---
title: nodeSelector/toleration settings do not get propagated while using Operator
---

## Issue
Customers may find that that in a single-manifest deployment of Armory while utilizing Operator, when attempting to move the Armory pods to specific nodes with nodeSelectors and tolerations, the settings do not get propagated to the Deployment or Pods.
The configuration is added for nodeSelector/toleration under ```spec.spinnakerConfig.service-settings```, however the change is not reflected in the Deployment or Pods.

## Cause
This may be due to a prior bug in the [Spinnaker documentation](https://spinnaker.io/docs/reference/halyard/custom/#nodeselectors) (which specifies nodeSelector**s**, not nodeSelector).
The Spinnaker docs had a typo due to which ```nodeSelector``` did not propagate. ```nodeSelector:``` is the  field that was supported by Kubernetes.
 

